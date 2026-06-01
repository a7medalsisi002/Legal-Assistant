import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { MessageSquare, Search, FileText, Languages, Download, ArrowRight } from "lucide-react";

const recentCases = [
  { id: 1, title: "Employment Dispute – Al-Nile Corp", arTitle: "نزاع عمالي – شركة النيل", date: "2025-05-28", status: "Open" },
  { id: 2, title: "Residential Lease Review", arTitle: "مراجعة عقد إيجار سكني", date: "2025-05-20", status: "Resolved" },
  { id: 3, title: "NDA for Software Partnership", arTitle: "اتفاقية سرية لشراكة برمجية", date: "2025-05-15", status: "Open" },
  { id: 4, title: "Property Sale Dispute – Cairo", arTitle: "نزاع بيع عقارات – القاهرة", date: "2025-05-10", status: "Resolved" },
];

const vaultDocs = [
  { id: 1, name: "Employment_Contract_Final.pdf", arName: "عقد_العمل_النهائي.pdf", type: "Contract", date: "2025-05-28" },
  { id: 2, name: "Lease_Agreement_Giza.pdf", arName: "عقد_إيجار_الجيزة.pdf", type: "Contract", date: "2025-05-20" },
  { id: 3, name: "NDA_Analysis_Report.pdf", arName: "تقرير_تحليل_اتفاقية_السرية.pdf", type: "Analysis", date: "2025-05-15" },
  { id: 4, name: "Translated_Labor_Law.pdf", arName: "قانون_العمل_المترجم.pdf", type: "Translation", date: "2025-05-10" },
];

const chatHistory = [
  { id: 1, preview: "What are the notice periods required under Egyptian Labor Law Article 69?", arPreview: "ما هي مدد الإشعار المطلوبة بموجب المادة 69 من قانون العمل المصري؟" },
  { id: 2, preview: "Can a landlord increase rent mid-contract under Egyptian Civil Code?", arPreview: "هل يمكن لصاحب العمل رفع الإيجار خلال فترة العقد وفق القانون المدني؟" },
  { id: 3, preview: "What constitutes a valid NDA under Egyptian commercial law?", arPreview: "ما الذي يشكل اتفاقية سرية صحيحة بموجب القانون التجاري المصري؟" },
];

export default function Dashboard() {
  const { language, currentUser } = useAppContext();
  const [, setLocation] = useLocation();

  const tx = {
    en: {
      welcome: "Welcome back,",
      badge_citizen: "Egyptian Citizen",
      badge_foreign: "Foreign Resident",
      quick_actions: "Quick Actions",
      chat_title: "AI Legal Chat",
      chat_desc: "Ask any Egyptian law question",
      analyze_title: "Analyze Document",
      analyze_desc: "OCR + risk assessment",
      contracts_title: "Generate Contract",
      contracts_desc: "From ready-made templates",
      translate_title: "Translate Document",
      translate_desc: "Arabic ↔ English",
      recent_cases: "Recent Cases",
      case_title: "Case Title",
      date: "Date",
      status: "Status",
      open: "Open",
      resolved: "Resolved",
      my_vault: "My Legal Vault",
      download: "Download",
      chat_history: "Recent Conversations",
      continue: "Continue",
    },
    ar: {
      welcome: "مرحباً بعودتك،",
      badge_citizen: "مواطن مصري",
      badge_foreign: "مقيم أجنبي",
      quick_actions: "إجراءات سريعة",
      chat_title: "المحادثة القانونية",
      chat_desc: "اسأل أي سؤال قانوني مصري",
      analyze_title: "تحليل مستند",
      analyze_desc: "OCR + تقييم المخاطر",
      contracts_title: "إنشاء عقد",
      contracts_desc: "من قوالب جاهزة",
      translate_title: "ترجمة مستند",
      translate_desc: "عربي ↔ إنجليزي",
      recent_cases: "القضايا الأخيرة",
      case_title: "عنوان القضية",
      date: "التاريخ",
      status: "الحالة",
      open: "مفتوحة",
      resolved: "محلولة",
      my_vault: "خزنتي القانونية",
      download: "تحميل",
      chat_history: "المحادثات الأخيرة",
      continue: "متابعة",
    }
  }[language];

  const typeBadge = (type: string) => {
    const map: Record<string, string> = { Contract: "bg-blue-100 text-blue-800", Analysis: "bg-red-100 text-red-800", Translation: "bg-green-100 text-green-800" };
    return map[type] || "bg-gray-100 text-gray-800";
  };

  const arTypeBadge = (type: string) => ({ Contract: "عقد", Analysis: "تحليل", Translation: "ترجمة" }[type] || type);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl space-y-8">

          {/* Welcome Banner */}
          <div className="bg-secondary rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-gray-300 text-sm mb-1">{tx.welcome}</p>
              <h1 className="text-2xl font-bold text-white">{currentUser?.name}</h1>
              <span className="inline-flex items-center gap-1.5 mt-2 bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1 text-xs font-medium">
                {currentUser?.residency?.includes("Egyptian") ? "🇪🇬" : "🌍"} {currentUser?.residency?.includes("Egyptian") ? tx.badge_citizen : tx.badge_foreign}
              </span>
            </div>
            <div className="text-sm text-gray-300">{new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">{tx.quick_actions}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: MessageSquare, title: tx.chat_title, desc: tx.chat_desc, href: "/chat", color: "bg-blue-500" },
                { icon: Search, title: tx.analyze_title, desc: tx.analyze_desc, href: "/analyze", color: "bg-purple-500" },
                { icon: FileText, title: tx.contracts_title, desc: tx.contracts_desc, href: "/contracts", color: "bg-green-600" },
                { icon: Languages, title: tx.translate_title, desc: tx.translate_desc, href: "/translate", color: "bg-orange-500" },
              ].map((a, i) => (
                <button
                  key={i}
                  onClick={() => setLocation(a.href)}
                  className="bg-card border border-border rounded-xl p-5 text-left hover:shadow-md hover:border-primary/30 transition-all group"
                  data-testid={`quick-action-${i}`}
                >
                  <div className={`w-10 h-10 ${a.color} rounded-lg flex items-center justify-center mb-3`}>
                    <a.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-semibold text-foreground text-sm mb-1">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{language === 'en' ? 'Open' : 'فتح'}</span><ArrowRight className="h-3 w-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Cases */}
            <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border flex justify-between items-center">
                <h2 className="font-semibold text-foreground">{tx.recent_cases}</h2>
                <Button variant="ghost" size="sm" onClick={() => setLocation("/vault")} className="text-primary text-xs">{language === 'en' ? 'View all' : 'عرض الكل'}</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-start p-4 font-medium text-muted-foreground">{tx.case_title}</th>
                      <th className="text-start p-4 font-medium text-muted-foreground">{tx.date}</th>
                      <th className="text-start p-4 font-medium text-muted-foreground">{tx.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCases.map(c => (
                      <tr key={c.id} className="border-t border-border hover:bg-muted/30 transition-colors" data-testid={`case-row-${c.id}`}>
                        <td className="p-4 font-medium text-foreground">{language === 'en' ? c.title : c.arTitle}</td>
                        <td className="p-4 text-muted-foreground">{c.date}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${c.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                            {c.status === 'Open' ? tx.open : tx.resolved}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chat History */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border flex justify-between items-center">
                <h2 className="font-semibold text-foreground">{tx.chat_history}</h2>
                <Button variant="ghost" size="sm" onClick={() => setLocation("/chat")} className="text-primary text-xs">{language === 'en' ? 'New chat' : 'محادثة جديدة'}</Button>
              </div>
              <div className="divide-y divide-border">
                {chatHistory.map(ch => (
                  <div key={ch.id} className="p-4 hover:bg-muted/30 transition-colors" data-testid={`chat-history-${ch.id}`}>
                    <p className="text-sm text-foreground line-clamp-2 mb-3">{language === 'en' ? ch.preview : ch.arPreview}</p>
                    <Button size="sm" variant="outline" className="text-xs h-7 border-primary/30 text-primary hover:bg-primary/5" onClick={() => setLocation("/chat")}>
                      {tx.continue}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Vault */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="font-semibold text-foreground">{tx.my_vault}</h2>
              <Button variant="ghost" size="sm" onClick={() => setLocation("/vault")} className="text-primary text-xs">{language === 'en' ? 'View all' : 'عرض الكل'}</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
              {vaultDocs.map(doc => (
                <div key={doc.id} className="border border-border rounded-lg p-4 hover:border-primary/30 hover:shadow-sm transition-all" data-testid={`vault-doc-${doc.id}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeBadge(doc.type)}`}>
                      {language === 'en' ? doc.type : arTypeBadge(doc.type)}
                    </span>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground truncate mb-1">{language === 'en' ? doc.name : doc.arName}</p>
                  <p className="text-xs text-muted-foreground mb-3">{doc.date}</p>
                  <Button size="sm" variant="outline" className="w-full text-xs h-7" data-testid={`button-download-${doc.id}`}>
                    <Download className="h-3 w-3 mr-1" /> {tx.download}
                  </Button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
