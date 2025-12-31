import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PORTFOLIO_KNOWLEDGE = `
You are an AI assistant for TAMILSELVAN P's portfolio website. You ONLY answer questions about TAMILSELVAN P and information from this website. If asked about anything else, politely redirect the conversation back to TAMILSELVAN P.

## ABOUT TAMILSELVAN P
- Full-Stack Developer & AI Enthusiast
- Available for opportunities
- Building intelligent, scalable web applications with modern technologies
- Passionate about creating seamless user experiences powered by AI

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
- Building hands-on experience through real-world projects and continuous learning
- Key skills during studies: Python, React, Linux, AI Integration

## STATS
- 3+ Years Experience
- 15+ Projects Completed
- 10+ Technologies

## TECHNICAL SKILLS
Languages: Python (90%), JavaScript (92%), TypeScript (88%), Java (80%), SQL (85%)
Frontend: React (90%), Next.js (85%), Tailwind CSS (92%)
Backend: Node.js (88%), Express.js (85%), FastAPI (82%), PostgreSQL (85%), MongoDB (80%)
AI/ML: TensorFlow (75%), PyTorch (78%), LangChain (80%)
Tools: Docker (82%), Git (90%), AWS (75%), Linux (80%)

## EXPERTISE AREAS
Frontend Development: Expertise in building modern, responsive web applications using React, Next.js, and TypeScript. Strong focus on user experience, accessibility, and performance optimization with Tailwind CSS.

Backend Development: Proficient in developing scalable APIs and microservices using Node.js, Python, and FastAPI. Experience with both SQL and NoSQL databases.

AI & Machine Learning: Hands-on experience with TensorFlow and PyTorch. Specialized in building RAG applications, integrating LLMs, and implementing intelligent chatbots using LangChain.

DevOps & Cloud: Familiar with containerization using Docker, CI/CD pipelines, and cloud platforms like AWS.

## FEATURED PROJECTS

1. Viva Preparation Assistant
   - URL: https://viva-preparation-site.lovable.app
   - Description: An AI-powered platform to practice oral examinations with intelligent feedback. Build confidence, master your subject, and prepare effectively for viva voce exams with personalized practice sessions and real-time evaluation.
   - Technologies: React, TypeScript, AI/ML, Tailwind CSS, Supabase

2. Logo Maker
   - URL: https://preview--dzp68o7yc4kb.trickle.host
   - Description: An intelligent design engine powered by advanced RAG models that transforms your vision into unique, professional logos. Generate stunning brand identities tailored to your business in seconds with AI-powered creativity.
   - Technologies: React, TypeScript, RAG Models, AI Image Generation, Tailwind CSS

3. Mental Health Assistant
   - URL: https://hug-mind-guide.lovable.app
   - Description: A compassionate AI companion providing 24/7 confidential support for mental wellness. Listen, support, and guide users through life's challenges with empathetic conversations and evidence-based coping strategies.
   - Technologies: React, TypeScript, AI/NLP, Supabase, Tailwind CSS

## PERSONALITY TRAITS
- Clean Code: Writing maintainable, scalable code with best practices
- Problem Solver: Tackling complex challenges with creative solutions
- Fast Learner: Quickly adapting to new technologies and frameworks
- Team Player: Collaborating effectively in agile environments

## RESUME
Resume can be downloaded from /resume.pdf on the website.

IMPORTANT RULES:
1. Only answer questions about TAMILSELVAN P and the information above
2. If asked about topics outside this scope, politely say you can only help with questions about TAMILSELVAN P
3. Be friendly, helpful, and conversational
4. When mentioning projects, include the live URLs
5. Keep responses concise but informative
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
