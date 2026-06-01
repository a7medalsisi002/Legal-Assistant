import { useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Upload, AlertTriangle, CheckCircle, AlertCircle, Save, Languages } from "lucide-react";

type Step = "idle" | "loading" | "done";

export default function Analyze() {
  const { language } = useAppContext();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<Step>("idle");
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const tx = {
    en: {
      title: "Document Analysis (OCR & Risk Assessment)",
      subtitle: "Upload a legal document to extract text and identify risks automatically",
      drop: "Drop your PDF or DOCX here",
      or: "or click to browse",
      formats: "Accepted: PDF, DOCX",
      extracting: "Extracting text with Arabic Nougat OCR…",
      report_title: "Risk Analysis Report",
      extracted: "Extracted Text Preview",
      mock_text: "EMPLOYMENT AGREEMENT\n\nThis Employment Agreement (\"Agreement\") is entered into as of January 1, 2025, between Al-Nile Technology Solutions LLC (\"Company\") and the Employee named herein. The Employee agrees to assume unlimited liability for all company operations under Clause 4.2...",
      risk_summary: "Risk Summary",
      high: "High Risk",
      med: "Medium Risk",
      low: "Low Risk",
      findings: [
        { level: "high", text: "Clause 4.2 — Unlimited liability clause detected. This exposes the employee to excessive personal risk beyond standard practice." },
        { level: "med", text: "Clause 7 — Penalty clause lacks cap amount. Egyptian Civil Code Article 224 requires a maximum cap on penalty clauses." },
        { level: "low", text: "Jurisdiction stated as Egypt — compliant with Egyptian law requirements." },
      ],
      save: "Save to Vault",
      saved: "Saved!",
      translate: "Translate This Document",
    },
    ar: {
      title: "تحليل المستندات (OCR وتقييم المخاطر)",
      subtitle: "ارفع مستنداً قانونياً لاستخراج النص وتحديد المخاطر تلقائياً",
      drop: "اسحب ملف PDF أو DOCX هنا",
      or: "أو انقر للتصفح",
      formats: "المقبول: PDF، DOCX",
      extracting: "جارٍ استخراج النص باستخدام Arabic Nougat OCR…",
      report_title: "تقرير تحليل المخاطر",
      extracted: "معاينة النص المستخرج",
      mock_text: "عقد عمل\n\nأُبرم هذا العقد بتاريخ 1 يناير 2025 بين شركة حلول النيل التكنولوجية م.م.م (\"الشركة\") والموظف المسمى في هذه الوثيقة. يوافق الموظف على تحمل مسؤولية غير محدودة عن جميع عمليات الشركة بموجب البند 4.2...",
      risk_summary: "ملخص المخاطر",
      high: "خطر مرتفع",
      med: "خطر متوسط",
      low: "خطر منخفض",
      findings: [
        { level: "high", text: "البند 4.2 — تم اكتشاف شرط مسؤولية غير محدود. يعرّض هذا الموظف لمخاطر شخصية مفرطة تتجاوز الممارسة المعتادة." },
        { level: "med", text: "البند 7 — شرط الغرامة يفتقر إلى حد أقصى. تشترط المادة 224 من القانون المدني المصري وضع حد أقصى لشروط الغرامة." },
        { level: "low", text: "الاختصاص القضائي محدد بمصر — متوافق مع متطلبات القانون المصري." },
      ],
      save: "حفظ في الخزنة",
      saved: "تم الحفظ!",
      translate: "ترجمة هذا المستند",
    }
  }[language];

  const handleFile = (file?: File) => {
    if (!file) return;
    setFileName(file.name);
    setStep("loading");
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p >= 100) { clearInterval(interval); setTimeout(() => setStep("done"), 300); }
    }, 400);
  };

  const levelIcon = (level: string) => {
    if (level === "high") return <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />;
    if (level === "med") return <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0" />;
    return <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />;
  };

  const levelBadge = (level: string) => {
    if (level === "high") return "bg-red-100 text-red-800";
    if (level === "med") return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const levelLabel = (level: string) => {
    if (level === "high") return tx.high;
    if (level === "med") return tx.med;
    return tx.low;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">{tx.title}</h1>
            <p className="text-muted-foreground">{tx.subtitle}</p>
          </div>

          {step === "idle" && (
            <div
              className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
              data-testid="drop-zone"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-secondary" />
              </div>
              <p className="text-lg font-semibold text-foreground mb-1">{tx.drop}</p>
              <p className="text-sm text-muted-foreground mb-4">{tx.or}</p>
              <span className="inline-flex gap-2">
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">PDF</span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">DOCX</span>
              </span>
              <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden" onChange={e => handleFile(e.target.files?.[0])} data-testid="input-file-upload" />
            </div>
          )}

          {step === "loading" && (
            <div className="bg-card border border-border rounded-2xl p-10 text-center">
              <div className="mb-6">
                <p className="font-medium text-foreground mb-4">{tx.extracting}</p>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} data-testid="progress-bar" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
              </div>
              <p className="text-sm text-muted-foreground">{fileName}</p>
            </div>
          )}

          {step === "done" && (
            <div className="space-y-5">
              <div className="bg-card border border-border rounded-xl p-5">
                <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full" />{tx.report_title}</h2>
                <div className="mb-5">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">{tx.extracted}</h3>
                  <div className="bg-muted rounded-lg p-4 font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed">{tx.mock_text}</div>
                </div>
                <h3 className="text-sm font-medium text-foreground mb-3">{tx.risk_summary}</h3>
                <div className="space-y-3">
                  {tx.findings.map((f, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/40 border border-border" data-testid={`risk-finding-${i}`}>
                      {levelIcon(f.level)}
                      <div className="flex-1 min-w-0">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-1 ${levelBadge(f.level)}`}>
                          {levelLabel(f.level)}
                        </span>
                        <p className="text-sm text-foreground">{f.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className={`flex-1 gap-2 ${saved ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                  onClick={() => setSaved(true)}
                  data-testid="button-save-vault"
                >
                  <Save className="h-4 w-4" />{saved ? tx.saved : tx.save}
                </Button>
                <Button variant="outline" className="flex-1 gap-2 border-primary/30 text-primary hover:bg-primary/5" onClick={() => setLocation("/translate")} data-testid="button-translate-doc">
                  <Languages className="h-4 w-4" />{tx.translate}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
