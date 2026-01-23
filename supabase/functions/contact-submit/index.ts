import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: track submissions per IP
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // Max submissions per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

// Input validation constants
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

function validateSubmission(data: unknown): { valid: boolean; error?: string; submission?: ContactSubmission } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { name, email, subject, message } = data as Record<string, unknown>;

  // Validate name
  if (typeof name !== "string" || name.trim().length === 0) {
    return { valid: false, error: "Name is required" };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { valid: false, error: `Name must be less than ${MAX_NAME_LENGTH} characters` };
  }

  // Validate email
  if (typeof email !== "string" || email.trim().length === 0) {
    return { valid: false, error: "Email is required" };
  }
  if (email.length > MAX_EMAIL_LENGTH) {
    return { valid: false, error: `Email must be less than ${MAX_EMAIL_LENGTH} characters` };
  }
  if (!validateEmail(email.trim())) {
    return { valid: false, error: "Invalid email format" };
  }

  // Validate subject
  if (typeof subject !== "string" || subject.trim().length === 0) {
    return { valid: false, error: "Subject is required" };
  }
  if (subject.length > MAX_SUBJECT_LENGTH) {
    return { valid: false, error: `Subject must be less than ${MAX_SUBJECT_LENGTH} characters` };
  }

  // Validate message
  if (typeof message !== "string" || message.trim().length === 0) {
    return { valid: false, error: "Message is required" };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message must be less than ${MAX_MESSAGE_LENGTH} characters` };
  }

  return {
    valid: true,
    submission: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    },
  };
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

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // Get client IP for rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                   req.headers.get("x-real-ip") ||
                   "unknown";

  // Check rate limit
  const rateLimitCheck = checkRateLimit(clientIP);
  if (!rateLimitCheck.allowed) {
    console.log(`Rate limit exceeded for contact submission from IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Too many submissions. Please try again later." }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": String(rateLimitCheck.retryAfter || 3600),
        },
      }
    );
  }

  try {
    // Parse request body
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
    const validation = validateSubmission(requestBody);
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

    const submission = validation.submission!;

    // Create Supabase client with service role for inserting
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert submission
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name: submission.name,
        email: submission.email,
        subject: submission.subject,
        message: submission.message,
      });

    if (insertError) {
      console.error("Database insert error:", insertError.message);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Contact submission saved from IP: ${clientIP}, email: ${submission.email}`);

    return new Response(
      JSON.stringify({ success: true, message: "Submission received successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("Contact submission error:", e);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
