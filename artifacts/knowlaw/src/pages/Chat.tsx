import { useState, useRef, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Plus, BookOpen } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  citation?: string;
  timestamp: Date;
}

const mockResponses = [
  {
    en: "Under Egyptian Labor Law No. 12 of 2003, Article 120, an employer must provide written notice of termination. The minimum notice period for employees with less than 10 years of service is 2 months. For employees with 10+ years, the period extends to 3 months. Unjustified termination entitles the employee to compensation equivalent to 3 months' wages for each year of service.",
    ar: "بموجب قانون العمل المصري رقم 12 لسنة 2003، المادة 120، يجب على صاحب العمل تقديم إشعار خطي بالإنهاء. تبلغ مدة الإشعار الدنيا للموظفين الذين تقل مدة خدمتهم عن 10 سنوات شهرين. وللموظفين الذين تزيد مدة خدمتهم على 10 سنوات، تمتد المدة إلى 3 أشهر.",
    en_cite: "📖 Source: Labor Law No. 12 of 2003, Article 120 & 122",
    ar_cite: "📖 المصدر: قانون العمل رقم 12 لسنة 2003، المادتان 120 و122",
  },
  {
    en: "According to the Egyptian Civil Code (Law No. 131 of 1948), Article 561, a landlord cannot unilaterally increase rent during the agreed lease term. Any rent increase requires mutual written consent of both parties. Unilateral modifications to a fixed-term lease are considered legally void under Article 147 of the Civil Code.",
    ar: "وفقاً للقانون المدني المصري (القانون رقم 131 لسنة 1948)، المادة 561، لا يحق لصاحب العمل زيادة الإيجار من جانب واحد خلال مدة الإيجار المتفق عليها. أي زيادة في الإيجار تستلزم موافقة خطية متبادلة من الطرفين.",
    en_cite: "📖 Source: Civil Code (Law 131/1948), Articles 561 & 147",
    ar_cite: "📖 المصدر: القانون المدني (رقم 131/1948)، المادتان 561 و147",
  },
  {
    en: "Under Egyptian Commercial Law No. 17 of 1999, a valid Non-Disclosure Agreement (NDA) must identify the parties clearly, define what constitutes confidential information, specify the duration of confidentiality obligations (typically 2–5 years), and outline remedies for breach. NDAs are enforceable under Article 147 of the Civil Code which upholds binding contractual obligations.",
    ar: "بموجب قانون التجارة المصري رقم 17 لسنة 1999، يجب أن تحدد اتفاقية السرية الصحيحة الأطراف بوضوح، وتعرّف ما يشكل معلومات سرية، وتحدد مدة التزامات السرية (عادةً من 2 إلى 5 سنوات)، وتضع آليات التعويض عن الخرق.",
    en_cite: "📖 Source: Commercial Law No. 17 of 1999 & Civil Code Article 147",
    ar_cite: "📖 المصدر: قانون التجارة رقم 17 لسنة 1999 والمادة 147 من القانون المدني",
  },
  {
    en: "Egyptian Investment Law No. 72 of 2017 offers foreign investors several guarantees including: equal treatment with Egyptian investors, protection against nationalization and expropriation without compensation, freedom to repatriate profits and capital in foreign currency, and access to Investment Disputes Settlement Committees. The law also provides tax incentives for projects in development zones.",
    ar: "يمنح قانون الاستثمار المصري رقم 72 لسنة 2017 المستثمرين الأجانب عدة ضمانات، منها: المعاملة المتساوية مع المستثمرين المصريين، والحماية من التأميم والمصادرة دون تعويض، وحرية تحويل الأرباح ورأس المال بالعملة الأجنبية.",
    en_cite: "📖 Source: Investment Law No. 72 of 2017, Articles 4, 9 & 15",
    ar_cite: "📖 المصدر: قانون الاستثمار رقم 72 لسنة 2017، المواد 4 و9 و15",
  },
];

const initMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    content: "Hello! I am KnowLaw, your AI legal assistant specialized in Egyptian law. I can help you with questions about the Civil Code, Labor Law, Commercial Law, Investment regulations, and more. Ask me anything — and I will provide you with accurate information cited from official Egyptian legal sources.\n\nHow can I assist you today?",
    citation: "📖 Powered by 22 Egyptian Legal Datasets",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: 2,
    role: "user",
    content: "What are my rights if my employer terminates me without notice?",
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: 3,
    role: "ai",
    content: mockResponses[0].en,
    citation: mockResponses[0].en_cite,
    timestamp: new Date(Date.now() - 25000),
  },
];

const chatHistoryList = [
  { id: 1, title: "Employment Termination Rights" },
  { id: 2, title: "Landlord Rent Increase Rules" },
  { id: 3, title: "NDA Requirements Egypt" },
];

export default function Chat() {
  const { language } = useAppContext();
  const [messages, setMessages] = useState<Message[]>(() =>
    initMessages.map(m => ({
      ...m,
      content: language === 'ar' && m.role === 'ai' && m.id === 1 ? "مرحباً! أنا KnowLaw، مساعدك القانوني الذكي المتخصص في القانون المصري. كيف يمكنني مساعدتك اليوم؟" : m.content,
      citation: language === 'ar' && m.id === 1 ? "📖 مدعوم بـ 22 مجموعة بيانات قانونية مصرية" : m.citation,
    }))
  );
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [responseIdx, setResponseIdx] = useState(1);
  const [activeChat, setActiveChat] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim() || typing) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    const resp = mockResponses[responseIdx % mockResponses.length];
    setResponseIdx(i => i + 1);
    setTimeout(() => {
      setTyping(false);
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: language === 'ar' ? resp.ar : resp.en,
        citation: language === 'ar' ? resp.ar_cite : resp.en_cite,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  const tx = {
    en: { disclaimer: "KnowLaw provides legal information only, not legal advice. Always consult a licensed attorney for binding decisions.", newChat: "New Chat", placeholder: "Ask about Egyptian law...", typing: "KnowLaw is typing..." },
    ar: { disclaimer: "تقدم KnowLaw معلومات قانونية فقط، وليست استشارات قانونية. استشر دائماً محامياً مرخصاً للقرارات الملزمة.", newChat: "محادثة جديدة", placeholder: "اسأل عن القانون المصري...", typing: "KnowLaw يكتب..." },
  }[language];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 64px - 1px)' }}>

        {/* Sidebar */}
        <aside className="hidden md:flex w-64 bg-secondary flex-col border-e border-secondary/20">
          <div className="p-4 border-b border-white/10">
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 justify-start"
              onClick={() => { setMessages(initMessages); setActiveChat(0); }}
              data-testid="button-new-chat"
            >
              <Plus className="h-4 w-4" /> {tx.newChat}
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {chatHistoryList.map(ch => (
              <button
                key={ch.id}
                onClick={() => setActiveChat(ch.id)}
                className={`w-full text-start text-sm px-3 py-2.5 rounded-lg transition-colors ${activeChat === ch.id ? 'bg-white/15 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                data-testid={`chat-history-item-${ch.id}`}
              >
                {ch.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background min-w-0">
          {/* Disclaimer */}
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
            <p className="text-amber-800 text-xs text-center font-medium">{tx.disclaimer}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`} data-testid={`message-${msg.id}`}>
                <div className={`max-w-[85%] md:max-w-[70%]`}>
                  {msg.role === 'ai' && (
                    <div className="flex items-center gap-2 mb-1.5 text-xs text-muted-foreground">
                      <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">⚖️</div>
                      <span>KnowLaw</span>
                    </div>
                  )}
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-se-sm' : 'bg-card border border-border text-foreground rounded-ss-sm'}`}>
                    {msg.content}
                  </div>
                  {msg.citation && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/5 border border-secondary/15 rounded-lg px-3 py-1.5">
                      <BookOpen className="h-3 w-3 text-secondary shrink-0" />
                      <span>{msg.citation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-ss-sm px-4 py-3 flex items-center gap-1.5" data-testid="typing-indicator">
                  <span className="text-xs text-muted-foreground me-1">{tx.typing}</span>
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex items-center gap-2 max-w-3xl mx-auto">
              <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0" data-testid="button-attach">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={tx.placeholder}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                data-testid="button-send-message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
