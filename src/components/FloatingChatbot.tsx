import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Sparkles, Loader2, X, MessageCircle, Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
  
  // Voice state
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

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

  // Cleanup voice connection on unmount
  useEffect(() => {
    return () => {
      disconnectVoice();
    };
  }, []);

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

  // Voice Functions
  const connectVoice = useCallback(async () => {
    setIsConnecting(true);
    
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Get ephemeral token from edge function
      const { data, error } = await supabase.functions.invoke("realtime-token");
      
      if (error) {
        console.error("Error getting token:", error);
        throw new Error("Failed to get voice session token");
      }
      
      if (!data?.client_secret?.value) {
        console.error("Invalid token response:", data);
        throw new Error("Invalid token received");
      }

      const EPHEMERAL_KEY = data.client_secret.value;
      console.log("Got ephemeral token, connecting...");

      // Create peer connection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Create audio element for remote audio
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioElRef.current = audioEl;

      // Set up remote audio
      pc.ontrack = (e) => {
        console.log("Received remote track");
        audioEl.srcObject = e.streams[0];
      };

      // Add local audio track
      const ms = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      pc.addTrack(ms.getTracks()[0]);

      // Set up data channel for events
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.addEventListener("open", () => {
        console.log("Data channel opened");
        setIsVoiceMode(true);
        setIsConnecting(false);
        toast.success("Voice mode activated! Start speaking.");
      });

      dc.addEventListener("message", (e) => {
        try {
          const event = JSON.parse(e.data);
          console.log("Received event:", event.type);
          
          // Handle different event types
          if (event.type === 'response.audio.delta') {
            setIsSpeaking(true);
          } else if (event.type === 'response.audio.done') {
            setIsSpeaking(false);
          } else if (event.type === 'conversation.item.input_audio_transcription.completed') {
            // User speech transcription
            const transcript = event.transcript;
            if (transcript) {
              setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'user',
                content: transcript
              }]);
            }
          } else if (event.type === 'response.audio_transcript.done') {
            // Assistant response transcription
            const transcript = event.transcript;
            if (transcript) {
              setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: transcript
              }]);
            }
          }
        } catch (err) {
          console.error("Error parsing event:", err);
        }
      });

      dc.addEventListener("close", () => {
        console.log("Data channel closed");
        setIsVoiceMode(false);
        setIsSpeaking(false);
      });

      // Create and set local description
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Connect to OpenAI's Realtime API
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        throw new Error("Failed to connect to OpenAI Realtime API");
      }

      const answer = {
        type: "answer" as RTCSdpType,
        sdp: await sdpResponse.text(),
      };
      
      await pc.setRemoteDescription(answer);
      console.log("WebRTC connection established");

    } catch (error) {
      console.error("Error connecting voice:", error);
      toast.error(error instanceof Error ? error.message : "Failed to connect voice");
      setIsConnecting(false);
      disconnectVoice();
    }
  }, []);

  const disconnectVoice = useCallback(() => {
    if (dcRef.current) {
      dcRef.current.close();
      dcRef.current = null;
    }
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (audioElRef.current) {
      audioElRef.current.srcObject = null;
      audioElRef.current = null;
    }
    setIsVoiceMode(false);
    setIsSpeaking(false);
    setIsConnecting(false);
  }, []);

  const toggleVoice = useCallback(() => {
    if (isVoiceMode) {
      disconnectVoice();
      toast.info("Voice mode deactivated");
    } else {
      connectVoice();
    }
  }, [isVoiceMode, connectVoice, disconnectVoice]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-[hsl(190_80%_45%)] text-primary-foreground shadow-lg hover:shadow-[0_0_30px_hsla(174,72%,56%,0.5)] transition-all duration-300 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5" />
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-300 ${isOpen
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
      >
        <div className="glass-card overflow-hidden shadow-2xl border border-border">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ${isSpeaking ? 'animate-pulse' : ''}`}>
                {isSpeaking ? (
                  <Volume2 className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Ask About Me</h3>
                <p className="text-xs text-muted-foreground">
                  {isVoiceMode ? 'Voice mode active' : 'AI-powered assistant'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleVoice}
                disabled={isConnecting}
                className={`p-1.5 rounded-lg transition-colors ${
                  isVoiceMode 
                    ? 'bg-primary/20 text-primary' 
                    : 'hover:bg-secondary/50 text-muted-foreground'
                }`}
                title={isVoiceMode ? 'Disable voice mode' : 'Enable voice mode'}
              >
                {isConnecting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isVoiceMode ? (
                  <Mic className="w-4 h-4" />
                ) : (
                  <MicOff className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => {
                  disconnectVoice();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Voice Mode Indicator */}
          {isVoiceMode && (
            <div className="px-4 py-2 bg-primary/10 border-b border-border flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-accent animate-pulse' : 'bg-primary'}`} />
              <span className="text-xs text-primary">
                {isSpeaking ? 'AI is speaking...' : 'Listening... speak now'}
              </span>
            </div>
          )}

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
          {!isVoiceMode && (
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
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-background/80">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isVoiceMode ? "Voice mode active - speak or type..." : "Ask me anything..."}
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
