import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAntiSpam } from '@/hooks/use-anti-spam';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const sampleQuestions = [
  "What are your skills?",
  "Tell me about your projects",
  "Download resume",
  "How can I contact you?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-chat`;

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Hi! I'm an Selvan's AI assistant. What can I do for you?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Show welcome tooltip on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('chatbot-visited');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowWelcomeTooltip(true);
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  // Hide tooltip when chatbot is opened and mark as visited
  useEffect(() => {
    if (isOpen && showWelcomeTooltip) {
      setShowWelcomeTooltip(false);
      localStorage.setItem('chatbot-visited', 'true');
    }
  }, [isOpen, showWelcomeTooltip]);

  // Auto-hide tooltip after 8 seconds
  useEffect(() => {
    if (showWelcomeTooltip) {
      const timer = setTimeout(() => {
        setShowWelcomeTooltip(false);
        localStorage.setItem('chatbot-visited', 'true');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeTooltip]);
  
  // Anti-spam protection (simpler for chatbot)
  const { validateChatSubmission } = useAntiSpam(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenChatbot);
    return () => window.removeEventListener('open-chatbot', handleOpenChatbot);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleResumeDownload = (content: string) => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('resume') || lowerContent.includes('cv') || lowerContent.includes('download')) {
      window.open('/resume.pdf', '_blank');
    }
  };

  const streamChat = async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `I am Selvan's AI Assistant, what kind of help do you need!. You ONLY answer questions about TAMILSELVAN P and information from this website. If asked about anything else, politely redirect the conversation back to TAMILSELVAN P.

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

RESPONSE RULES:
1. BE CONCISE - Give only what's asked.
2. Only answer about TAMILSELVAN P.
3. When asked about projects, ONLY list the project titles. Do NOT provide descriptions, summaries, or links.`
          },
          ...userMessages.map(m => ({ role: m.role, content: m.content }))
        ]
      }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      if (resp.status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.");
      }
      if (resp.status === 402) {
        throw new Error("Service temporarily unavailable. Please try again later.");
      }
      throw new Error(errorData.error || "Failed to get response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && last.id !== "1") {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { id: Date.now().toString(), role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    return assistantContent;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    // Anti-spam validation
    const spamCheck = validateChatSubmission();
    if (!spamCheck.valid) {
      toast.error(spamCheck.error || 'Please wait a moment before sending.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    // Check for resume download
    handleResumeDownload(userMessage.content);

    const allMessages = [...messages.filter(m => m.id !== "1"), userMessage];
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      await streamChat(allMessages);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to get response");
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again in a moment.",
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Welcome Tooltip */}
      {showWelcomeTooltip && !isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 animate-fade-in"
          style={{ animation: 'bounce-slow 3s ease-in-out infinite' }}
        >
          <div className="relative bg-primary text-primary-foreground px-4 py-2.5 rounded-xl shadow-lg max-w-[160px]">
            <p className="text-sm font-medium">👋 Hi! Need help?</p>
            {/* Arrow pointing down */}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary" />
          </div>
        </div>
      )}

      {/* Floating Button - Animated Bot Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground shadow-xl hover:shadow-[0_0_40px_hsla(174,72%,56%,0.6)] transition-all duration-300 flex items-center justify-center group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 animate-bounce-slow'
          }`}
        style={{
          animation: isOpen ? 'none' : 'bounce-slow 3s ease-in-out infinite',
        }}
      >
        {/* Bot Face */}
        <div className="relative w-10 h-10 bg-background/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          {/* Eyes */}
          <div className="absolute top-2.5 left-2 w-2 h-2.5 bg-primary-foreground rounded-full animate-blink" />
          <div className="absolute top-2.5 right-2 w-2 h-2.5 bg-primary-foreground rounded-full animate-blink" />
          {/* Smile */}
          <div className="absolute bottom-2.5 w-4 h-2 border-b-2 border-primary-foreground rounded-b-full" />
        </div>
        {/* Glow Ring */}
        <span className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-30" />
        {/* Online indicator */}
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-background flex items-center justify-center">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
        </span>
      </button>

      {/* Chat Window */}
      <div
        ref={chatContainerRef}
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-300 ${isOpen
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
      >
        <div className="glass-card overflow-hidden shadow-2xl border border-border">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Ask About Me</h3>
                <p className="text-xs text-muted-foreground">AI-powered assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-background/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${message.role === 'user'
                    ? 'bg-primary'
                    : 'bg-gradient-to-br from-primary to-accent'
                    }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-3.5 h-3.5 text-primary-foreground" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm ${message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-secondary text-secondary-foreground rounded-bl-md'
                    }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <div className="bg-secondary p-3 rounded-2xl rounded-bl-md">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sample Questions */}
          <div className="px-4 py-2 border-t border-border bg-secondary/30">
            <div className="flex flex-wrap gap-1.5">
              {sampleQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSampleQuestion(question)}
                  className="text-xs px-2.5 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-background/80">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isTyping}
                className="flex-1 bg-secondary border-0 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              />
              <Button type="submit" variant="hero" size="icon" className="shrink-0 h-10 w-10 rounded-xl" disabled={isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FloatingChatbot;
