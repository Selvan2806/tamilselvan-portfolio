import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const sampleQuestions = [
  "What are your main skills?",
  "Tell me about your experience",
  "What projects have you worked on?",
  "What's your tech stack?",
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

const ChatbotSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Hi there! I'm an AI assistant trained to answer questions about **TAMILSELVAN P**. I can tell you about his skills, projects, experience, and more. What would you like to know?`,
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

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
    <section id="chatbot" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">AI Assistant</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Ask{' '}
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powered by RAG technology, this AI assistant can answer questions about my skills, 
            projects, and experience. Try asking something!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Chat Container */}
          <div className="glass-card overflow-hidden">
            {/* Chat Header */}
            <div className="bg-secondary/50 px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Personal AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything about TAMILSELVAN</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'user'
                        ? 'bg-primary'
                        : 'bg-gradient-to-br from-primary to-accent'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary text-secondary-foreground rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-secondary p-4 rounded-2xl rounded-bl-md">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sample Questions */}
            <div className="px-6 py-3 border-t border-border bg-secondary/30">
              <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSampleQuestion(question)}
                    className="text-xs px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about TAMILSELVAN..."
                  className="flex-1 bg-secondary border-0 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button type="submit" variant="hero" size="icon" className="shrink-0 h-12 w-12 rounded-xl">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Info Note */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            This chatbot uses RAG (Retrieval-Augmented Generation) to provide accurate answers about TAMILSELVAN P.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
