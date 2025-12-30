import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const sampleQuestions = [
  "What are your skills?",
  "Tell me about your experience",
  "Download resume",
  "How can I contact you?",
];

// Knowledge base for the RAG chatbot
const knowledgeBase = {
  name: "TAMILSELVAN P",
  email: "Selvanaptamil@gmail.com",
  phone: "7806860579",
  role: "Full-Stack Developer & AI Enthusiast",
  experience: "3+ years of experience in full-stack development with expertise in React, Node.js, Python, and AI/ML technologies.",
  skills: {
    languages: ["Python", "JavaScript", "TypeScript", "Java", "SQL"],
    frontend: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
    backend: ["Node.js", "Express.js", "FastAPI", "Django"],
    databases: ["PostgreSQL", "MongoDB", "Redis"],
    ai: ["TensorFlow", "PyTorch", "LangChain", "OpenAI", "RAG Systems"],
    tools: ["Docker", "Git", "AWS", "Linux", "CI/CD"],
  },
  projects: [
    "AI-Powered Task Manager with OpenAI integration",
    "E-Commerce Platform with Stripe payments",
    "Real-time Chat Application with WebSocket",
    "Machine Learning Dashboard for model analytics",
  ],
  education: "B.Tech in Computer Science with specialization in AI and Software Engineering",
  interests: "Building intelligent web applications, contributing to open-source, exploring AI/ML advancements",
};

// Simple RAG-like response generation
const generateResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('name') || lowerQuery.includes('who')) {
    return `I'm ${knowledgeBase.name}, a ${knowledgeBase.role}. I have ${knowledgeBase.experience}`;
  }
  
  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech stack') || lowerQuery.includes('know')) {
    const allSkills = Object.entries(knowledgeBase.skills)
      .map(([category, skills]) => `**${category.charAt(0).toUpperCase() + category.slice(1)}**: ${skills.join(', ')}`)
      .join('\n');
    return `Here are my technical skills:\n\n${allSkills}`;
  }
  
  if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('built')) {
    return `I've worked on several notable projects:\n\n${knowledgeBase.projects.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nEach project showcases my ability to build full-stack applications with modern technologies.`;
  }
  
  if (lowerQuery.includes('experience') || lowerQuery.includes('background')) {
    return `${knowledgeBase.experience}\n\nMy educational background: ${knowledgeBase.education}\n\nI'm passionate about ${knowledgeBase.interests}.`;
  }
  
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('reach')) {
    return `You can reach me through:\n\n📧 **Email**: ${knowledgeBase.email}\n📱 **Phone**: ${knowledgeBase.phone}\n\nFeel free to get in touch for collaboration opportunities!`;
  }

  if (lowerQuery.includes('resume') || lowerQuery.includes('cv') || lowerQuery.includes('download')) {
    window.open('/resume.pdf', '_blank');
    return `📄 I've opened the resume in a new tab for you! You can download or view TAMILSELVAN P's complete resume there.\n\nThe resume includes detailed information about education, work experience, skills, and achievements.`;
  }
  
  if (lowerQuery.includes('education') || lowerQuery.includes('study') || lowerQuery.includes('degree')) {
    return `I completed my ${knowledgeBase.education}. During my studies, I specialized in algorithms, data structures, machine learning, and web technologies.`;
  }
  
  if (lowerQuery.includes('interest') || lowerQuery.includes('passion') || lowerQuery.includes('hobby')) {
    return `I'm passionate about ${knowledgeBase.interests}. I believe in continuous learning and staying updated with the latest in technology.`;
  }
  
  if (lowerQuery.includes('ai') || lowerQuery.includes('machine learning') || lowerQuery.includes('ml')) {
    return `I have hands-on experience with AI/ML technologies including:\n\n${knowledgeBase.skills.ai.join(', ')}\n\nI specialize in building RAG applications, integrating LLMs, and creating intelligent chatbots like this one!`;
  }
  
  if (lowerQuery.includes('frontend') || lowerQuery.includes('front-end') || lowerQuery.includes('ui')) {
    return `For frontend development, I work with:\n\n${knowledgeBase.skills.frontend.join(', ')}\n\nI focus on creating responsive, accessible, and performant user interfaces.`;
  }
  
  if (lowerQuery.includes('backend') || lowerQuery.includes('back-end') || lowerQuery.includes('server')) {
    return `On the backend, I work with:\n\n${knowledgeBase.skills.backend.join(', ')}\n\nI build scalable APIs and microservices with a focus on security and performance.`;
  }
  
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return `Hello! 👋 I'm an AI assistant here to help you learn more about ${knowledgeBase.name}. Feel free to ask me about his skills, projects, experience, or how to get in touch!`;
  }
  
  return `I'd be happy to tell you more about ${knowledgeBase.name}. You can ask me about:\n\n• Technical skills and technologies\n• Projects and work experience\n• Educational background\n• How to get in contact\n• AI/ML expertise\n\nWhat would you like to know?`;
};

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Hi! I'm an AI assistant. Ask me anything about **TAMILSELVAN P**!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    const response = generateResponse(userMessage.content);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-[hsl(190_80%_45%)] text-primary-foreground shadow-lg hover:shadow-[0_0_30px_hsla(174,72%,56%,0.5)] transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5" />
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-300 ${
          isOpen
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
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'user'
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
                  className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-secondary text-secondary-foreground rounded-bl-md'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
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
                className="flex-1 bg-secondary border-0 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button type="submit" variant="hero" size="icon" className="shrink-0 h-10 w-10 rounded-xl">
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
