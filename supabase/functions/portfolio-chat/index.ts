import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: track requests per IP
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

// Input validation constants
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const VALID_ROLES = ["user", "assistant", "system"];

interface ChatMessage {
  role: string;
  content: string;
}

function validateMessages(messages: unknown): { valid: boolean; error?: string; messages?: ChatMessage[] } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "Messages array cannot be empty" };
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Maximum ${MAX_MESSAGES} messages allowed` };
  }

  const validatedMessages: ChatMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    
    if (!msg || typeof msg !== "object") {
      return { valid: false, error: `Message at index ${i} is invalid` };
    }

    const { role, content } = msg as { role?: unknown; content?: unknown };

    if (typeof role !== "string" || !VALID_ROLES.includes(role)) {
      return { valid: false, error: `Invalid role at index ${i}` };
    }

    if (typeof content !== "string") {
      return { valid: false, error: `Content at index ${i} must be a string` };
    }

    if (content.length === 0) {
      return { valid: false, error: `Content at index ${i} cannot be empty` };
    }

    if (content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Content at index ${i} exceeds ${MAX_MESSAGE_LENGTH} characters` };
    }

    validatedMessages.push({ role, content: content.trim() });
  }

  return { valid: true, messages: validatedMessages };
}

function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimits.get(clientIP);

  // Clean up expired entries periodically
  if (rateLimits.size > 10000) {
    for (const [ip, data] of rateLimits.entries()) {
      if (data.resetAt < now) {
        rateLimits.delete(ip);
      }
    }
  }

  if (!record || record.resetAt < now) {
    // New window
    rateLimits.set(clientIP, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

const PORTFOLIO_KNOWLEDGE = `
I am Selvan's AI Assistant, what kind of help do you need!. You ONLY answer questions about TAMILSELVAN P and information from this website. If asked about anything else, politely redirect the conversation back to TAMILSELVAN P.

## QUICK ANSWERS (Give ONLY the direct answer when asked)
- Name: TAMILSELVAN P
- Phone/Number/Mobile: +91 7806860579
- Email: Selvanaptamil@gmail.com
- Location: India
- Role/Title: Full-Stack Developer & AI Enthusiast
- Projects count: 5+
- Technologies count: 10+
- College: Annai Mira College of Engineering and Technology
- Degree: Bachelor of Engineering in Computer Science
- Year: 3rd year (2023 - Present)
- GitHub: https://github.com/Selvan2806
- LinkedIn: https://www.linkedin.com/in/tamilselvan-p-56134130a/
- Twitter: https://x.com/SELVANTAMIL2006
- Availability: Available for opportunities
- Father name: PALANI S
- Mother name: MANONMANI P
- Brother name: PORSEZHIYAN P
- Dob/Date of birth: 28 Jan 2006

## CONTACT INFORMATION
- Email: Selvanaptamil@gmail.com
- Phone: +91 7806860579
- Location: India
- GitHub: https://github.com/Selvan2806
- LinkedIn: https://www.linkedin.com/in/tamilselvan-p-56134130a/
- Twitter/X: https://x.com/SELVANTAMIL2006

## EDUCATION
- Bachelor of Engineering in Computer Science
- Institution: Annai Mira College of Engineering and Technology
- Period: 2023 - Present (Currently in third year)
- Key skills: Python, React, Linux, AI Integration

## TECHNICAL SKILLS
- Languages: Python, JavaScript, Java, SQL
- Frontend: React, Tailwind CSS
- Backend: Node.js, MongoDB
- AI/ML: LangChain
- Tools: Git, Linux

IMPORTANT SKILL RULES:
1. NEVER mention skills not listed above (do not say "etc", "and others", or "various").
2. NEVER use percentages (e.g., "90%"). Use terms like "Expert", "Proficient", or "Advanced".
3. If asked about a skill he doesn't have, politely say he doesn't have that specific skill listed but is always learning.

## FEATURED PROJECTS

1. Viva Preparation Assistant

2. Logo Maker

3. Mental Health Assistant

## RESUME
Available at /resume.pdf

RESPONSE RULES:
1. BE CONCISE - Give only what's asked. If someone asks "phone number?", just say "+91 7806860579"
2. If asked for a specific piece of info (number, email, name), give ONLY that info
3. Only answer about TAMILSELVAN P - redirect other topics politely
4. When asked about projects, ONLY list the project titles. Do NOT provide descriptions, summaries, or links.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("x-real-ip") || 
                   "unknown";

  // Check rate limit
  const rateLimitCheck = checkRateLimit(clientIP);
  if (!rateLimitCheck.allowed) {
    console.log(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(rateLimitCheck.retryAfter || 60)
        },
      }
    );
  }

  try {
    let requestBody: unknown;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate input
    const { messages: rawMessages } = requestBody as { messages?: unknown };
    const validation = validateMessages(rawMessages);
    
    if (!validation.valid) {
      console.log(`Validation failed: ${validation.error}`);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const messages = validation.messages!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Processing chat request with ${messages.length} messages from IP: ${clientIP}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: PORTFOLIO_KNOWLEDGE },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable, please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
