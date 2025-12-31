import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PORTFOLIO_KNOWLEDGE = `
You are an AI assistant for TAMILSELVAN P's portfolio website. You ONLY answer questions about TAMILSELVAN P and information from this website. If asked about anything else, politely redirect the conversation back to TAMILSELVAN P.

## QUICK ANSWERS (Give ONLY the direct answer when asked)
- Name: TAMILSELVAN P
- Phone/Number/Mobile: +91 7806860579
- Email: Selvanaptamil@gmail.com
- Location: India
- Role/Title: Full-Stack Developer & AI Enthusiast
- Experience: 3+ years
- Projects count: 15+
- Technologies count: 10+
- College: Annai Mira College of Engineering and Technology
- Degree: Bachelor of Engineering in Computer Science
- Year: 3rd year (2023 - Present)
- GitHub: https://github.com/Selvan2806
- LinkedIn: https://www.linkedin.com/in/tamilselvan-p-56134130a/
- Twitter: https://x.com/SELVANTAMIL2006
- Availability: Available for opportunities

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
Languages: Python (90%), JavaScript (92%), TypeScript (88%), Java (80%), SQL (85%)
Frontend: React (90%), Next.js (85%), Tailwind CSS (92%)
Backend: Node.js (88%), Express.js (85%), FastAPI (82%), PostgreSQL (85%), MongoDB (80%)
AI/ML: TensorFlow (75%), PyTorch (78%), LangChain (80%)
Tools: Docker (82%), Git (90%), AWS (75%), Linux (80%)

## FEATURED PROJECTS

1. Viva Preparation Assistant
   - URL: https://viva-preparation-site.lovable.app
   - Description: AI-powered platform for oral exam practice with intelligent feedback
   - Technologies: React, TypeScript, AI/ML, Tailwind CSS, Supabase

2. Logo Maker
   - URL: https://preview--dzp68o7yc4kb.trickle.host
   - Description: AI design engine using RAG models for professional logo generation
   - Technologies: React, TypeScript, RAG Models, AI Image Generation, Tailwind CSS

3. Mental Health Assistant
   - URL: https://hug-mind-guide.lovable.app
   - Description: AI companion for 24/7 mental wellness support
   - Technologies: React, TypeScript, AI/NLP, Supabase, Tailwind CSS

## PERSONALITY TRAITS
- Clean Code, Problem Solver, Fast Learner, Team Player

## RESUME
Available at /resume.pdf

RESPONSE RULES:
1. BE CONCISE - Give only what's asked. If someone asks "phone number?", just say "+91 7806860579"
2. If asked for a specific piece of info (number, email, name), give ONLY that info
3. Only elaborate when the question requires explanation
4. Only answer about TAMILSELVAN P - redirect other topics politely
5. Include project URLs when discussing projects
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

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
