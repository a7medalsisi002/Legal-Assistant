import { useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, Download, Save, ArrowLeftRight } from "lucide-react";

type DocStep = "idle" | "loading" | "done";

const mockOriginal = `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into as of January 1, 2025, between Al-Nile Technology Solutions LLC ("Company") and Ahmed Hassan ("Employee"). The parties agree to the following terms and conditions governing the employment relationship.

Article 1 – Position: The Employee is hired as Senior Software Engineer and shall report to the Technical Director.

Article 2 – Duration: This agreement is valid for one (1) year, renewable upon mutual consent.`;

const mockTranslated = `عقد عمل

أُبرم هذا العقد بتاريخ 1 يناير 2025 بين شركة حلول النيل التكنولوجية م.م.م ("الشركة") وأحمد حسن ("الموظف"). يتفق الطرفان على الشروط والأحكام التالية المنظِّمة لعلاقة العمل.

المادة الأولى – المسمى الوظيفي: يُعيَّن الموظف بوظيفة مهندس برمجيات أول ويرفع تقاريره إلى المدير التقني.

المادة الثانية – المدة: هذا العقد صالح لمدة سنة (1) واحدة، قابل للتجديد بموافقة الطرفين.`;

const mockOriginalAr = `عقد إيجار سكني

يُبرم هذا العقد بين المؤجر: محمود السيد، والمستأجر: أحمد حسن، بشأن الوحدة السكنية الكائنة في 15 شارع النيل، الدقي، الجيزة.

المادة الأولى – مدة الإيجار: تبدأ مدة الإيجار من 1 فبراير 2025 وتنتهي في 31 يناير 2026.

المادة الثانية – الأجرة: يلتزم المستأجر بسداد مبلغ 8000 جنيه مصري شهرياً.`;

const mockTranslatedEn = `RESIDENTIAL LEASE AGREEMENT

This agreement is concluded between Landlord: Mahmoud El-Sayed, and Tenant: Ahmed Hassan, regarding the residential unit located at 15 Nile Street, El-Dokki, Giza.

Article 1 – Lease Term: The lease period commences February 1, 2025 and ends January 31, 2026.

Article 2 – Rent: The tenant undertakes to pay 8,000 Egyptian Pounds per month.`;

export default function Translate() {
  const { language } = useAppContext();
  const [direction, setDirection] = useState<"ar-en" | "en-ar">("en-ar");
  const [docStep, setDocStep] = useState<DocStep>("idle");
  const [docProgress, setDocProgress] = useState(0);
  const [docFileName, setDocFileName] = useState("");
  const [docSaved, setDocSaved] = useState(false);
  const [quickText, setQuickText] = useState("");
  const [quickResult, setQuickResult] = useState("");
  const [quickLoading, setQuickLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const tx = {
    en: {
      title: "Document Translation Engine",
      sub: "Accurate legal document translation powered by neural machine translation",
      dir_label: "Translation Direction",
      ar_en: "Arabic → English",
      en_ar: "English → Arabic",
      drop: "Drop your PDF or DOCX here",
      or: "or click to browse",
      translating: "Translating with Neural Machine Translation model…",
      original: "Original Text",
      translated: "Translated Text",
      download: "Download Translated PDF",
      save: "Save to Vault",
      saved: "Saved!",
      quick_title: "Quick Text Translator",
      quick_sub: "Instantly translate legal text snippets",
      quick_source: "Source Text",
      quick_target: "Translation",
      quick_ph: "Paste legal text here...",
      translate_btn: "Translate",
      translating_quick: "Translating...",
    },
    ar: {
      title: "محرك ترجمة المستندات",
      sub: "ترجمة دقيقة للمستندات القانونية مدعومة بالترجمة الآلية العصبية",
      dir_label: "اتجاه الترجمة",
      ar_en: "عربي → إنجليزي",
      en_ar: "إنجليزي → عربي",
      drop: "اسحب ملف PDF أو DOCX هنا",
      or: "أو انقر للتصفح",
      translating: "جارٍ الترجمة باستخدام نموذج الترجمة الآلية العصبية…",
      original: "النص الأصلي",
      translated: "النص المترجم",
      download: "تحميل PDF المترجم",
      save: "حفظ في الخزنة",
      saved: "تم الحفظ!",
      quick_title: "المترجم السريع للنصوص",
      quick_sub: "ترجمة فورية للمقاطع القانونية",
      quick_source: "النص المصدر",
      quick_target: "الترجمة",
      quick_ph: "الصق النص القانوني هنا...",
      translate_btn: "ترجمة",
      translating_quick: "جارٍ الترجمة...",
    }
  }[language];

  const handleFile = (file?: File) => {
    if (!file) return;
    setDocFileName(file.name);
    setDocStep("loading");
    setDocProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 14;
      setDocProgress(Math.min(p, 100));
      if (p >= 100) { clearInterval(interval); setTimeout(() => setDocStep("done"), 300); }
    }, 400);
  };

  const translateQuick = () => {
    if (!quickText.trim()) return;
    setQuickLoading(true);
    setQuickResult("");
    setTimeout(() => {
      setQuickLoading(false);
      if (direction === "en-ar") {
        setQuickResult("وفقاً للمادة 148 من القانون المدني المصري (القانون رقم 131 لسنة 1948)، يجب تنفيذ العقد طبقاً لما اشتمل عليه، وبطريقة تتفق مع ما يوجبه حسن النية.");
      } else {
        setQuickResult("According to Article 148 of the Egyptian Civil Code (Law No. 131 of 1948), the contract must be performed in accordance with its contents, and in a manner consistent with what is required by good faith.");
      }
    }, 1000);
  };

  const origText = direction === "en-ar" ? mockOriginal : mockOriginalAr;
  const transText = direction === "en-ar" ? mockTranslated : mockTranslatedEn;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-5xl space-y-10">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">{tx.title}</h1>
            <p className="text-muted-foreground">{tx.sub}</p>
          </div>

          {/* Direction Selector */}
          <div className="bg-card border border-border rounded-xl p-5">
            <Label className="block mb-3 font-medium">{tx.dir_label}</Label>
            <div className="flex flex-col sm:flex-row gap-3">
              {([["ar-en", tx.ar_en], ["en-ar", tx.en_ar]] as const).map(([v, l]) => (
                <button key={v} onClick={() => { setDirection(v); setDocStep("idle"); setDocSaved(false); setQuickResult(""); }}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-all ${direction === v ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}
                  data-testid={`button-direction-${v}`}>
                  {l}
                  <ArrowLeftRight className="h-4 w-4 opacity-50" />
                </button>
              ))}
            </div>
          </div>

          {/* Document Upload */}
          <div>
            {docStep === "idle" && (
              <div
                className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                onClick={() => fileRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                data-testid="translate-drop-zone"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-7 w-7 text-secondary" />
                </div>
                <p className="text-lg font-semibold text-foreground mb-1">{tx.drop}</p>
                <p className="text-sm text-muted-foreground mb-4">{tx.or}</p>
                <div className="flex justify-center gap-2">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">PDF</span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">DOCX</span>
                </div>
                <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden" onChange={e => handleFile(e.target.files?.[0])} data-testid="input-translate-file" />
              </div>
            )}

            {docStep === "loading" && (
              <div className="bg-card border border-border rounded-2xl p-10 text-center">
                <p className="font-medium text-foreground mb-4">{tx.translating}</p>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden mb-2">
                  <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: `${docProgress}%` }} />
                </div>
                <p className="text-sm text-muted-foreground">{docProgress}% — {docFileName}</p>
              </div>
            )}

            {docStep === "done" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="bg-muted px-4 py-2.5 border-b border-border">
                      <p className="text-sm font-medium text-foreground flex items-center gap-2">{tx.original}</p>
                    </div>
                    <div className="p-4 text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed max-h-64 overflow-y-auto" dir={direction === "ar-en" ? "rtl" : "ltr"}>
                      {origText}
                    </div>
                  </div>
                  <div className="bg-card border border-primary/20 rounded-xl overflow-hidden">
                    <div className="bg-primary/5 px-4 py-2.5 border-b border-primary/15">
                      <p className="text-sm font-medium text-primary flex items-center gap-2"><ArrowRight className="h-3.5 w-3.5" />{tx.translated}</p>
                    </div>
                    <div className="p-4 text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed max-h-64 overflow-y-auto" dir={direction === "en-ar" ? "rtl" : "ltr"}>
                      {transText}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => alert(language === 'en' ? 'PDF download simulated.' : 'تم محاكاة تحميل PDF.')} data-testid="button-download-translation">
                    <Download className="h-4 w-4" />{tx.download}
                  </Button>
                  <Button className={`flex-1 gap-2 ${docSaved ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`} onClick={() => setDocSaved(true)} data-testid="button-save-translation">
                    <Save className="h-4 w-4" />{docSaved ? tx.saved : tx.save}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Text Translator */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="font-semibold text-foreground">{tx.quick_title}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{tx.quick_sub}</p>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block mb-2 text-sm">{tx.quick_source}</Label>
                <textarea
                  value={quickText}
                  onChange={e => setQuickText(e.target.value)}
                  placeholder={tx.quick_ph}
                  rows={6}
                  dir={direction === "ar-en" ? "rtl" : "ltr"}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring"
                  data-testid="input-quick-text"
                />
              </div>
              <div>
                <Label className="block mb-2 text-sm">{tx.quick_target}</Label>
                <textarea
                  value={quickLoading ? "..." : quickResult}
                  readOnly
                  rows={6}
                  dir={direction === "en-ar" ? "rtl" : "ltr"}
                  className="w-full rounded-md border border-input bg-muted px-3 py-2 text-sm resize-none focus:outline-none text-muted-foreground"
                  data-testid="text-quick-result"
                />
              </div>
            </div>
            <div className="px-5 pb-5">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2" onClick={translateQuick} disabled={!quickText.trim() || quickLoading} data-testid="button-quick-translate">
                <ArrowRight className="h-4 w-4" />{quickLoading ? tx.translating_quick : tx.translate_btn}
              </Button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
