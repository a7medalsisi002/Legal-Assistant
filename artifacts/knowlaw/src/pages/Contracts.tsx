import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Building, Briefcase, Users, Shield, Check, FileText, Download, Save } from "lucide-react";

const templates = [
  { id: "lease", icon: Home, en: "Residential Lease Agreement", ar: "عقد إيجار سكني" },
  { id: "sale", icon: Building, en: "Property Sale Agreement", ar: "عقد بيع عقار" },
  { id: "freelance", icon: Briefcase, en: "Freelance Service Agreement", ar: "عقد خدمات مستقل" },
  { id: "employment", icon: Users, en: "Employment Contract", ar: "عقد عمل" },
  { id: "nda", icon: Shield, en: "Non-Disclosure Agreement (NDA)", ar: "اتفاقية عدم الإفصاح (NDA)" },
];

export default function Contracts() {
  const { language } = useAppContext();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [form, setForm] = useState({ party1: "", party2: "", date: "", duration: "", amount: "", jurisdiction: "Egypt", outputLang: "bilingual", clauses: "" });
  const [saved, setSaved] = useState(false);

  const tx = {
    en: {
      title: "Smart Contract Generator",
      sub: "Generate legally-sound Egyptian contracts from ready-made templates",
      step1: "Choose Template",
      step2: "Fill in Details",
      step3: "Preview & Generate",
      party1: "Party 1 – Full Name", party2: "Party 2 – Full Name",
      date: "Contract Date", duration: "Duration / Term",
      amount: "Payment Amount (EGP)", jurisdiction: "Jurisdiction",
      outputLang: "Contract Language", arabic: "Arabic", english: "English", bilingual: "Bilingual",
      clauses: "Additional Clauses (optional)",
      clauses_ph: "Describe any special terms or conditions...",
      next: "Next: Fill Details", back: "Back",
      preview: "Preview Contract",
      preview_title: "Contract Preview",
      generate: "Generate PDF",
      save: "Save to Vault",
      saved: "Saved to Vault",
    },
    ar: {
      title: "منشئ العقود الذكي",
      sub: "أنشئ عقوداً مصرية سليمة قانونياً من قوالب جاهزة",
      step1: "اختر القالب",
      step2: "أدخل التفاصيل",
      step3: "معاينة وإنشاء",
      party1: "الطرف الأول – الاسم الكامل", party2: "الطرف الثاني – الاسم الكامل",
      date: "تاريخ العقد", duration: "المدة / الفترة",
      amount: "قيمة الدفع (جنيه مصري)", jurisdiction: "الاختصاص القضائي",
      outputLang: "لغة العقد", arabic: "العربية", english: "الإنجليزية", bilingual: "ثنائية اللغة",
      clauses: "بنود إضافية (اختياري)",
      clauses_ph: "اذكر أي شروط أو أحكام خاصة...",
      next: "التالي: أدخل التفاصيل", back: "رجوع",
      preview: "معاينة العقد",
      preview_title: "معاينة العقد",
      generate: "إنشاء PDF",
      save: "حفظ في الخزنة",
      saved: "تم الحفظ",
    }
  }[language];

  const steps = [{ num: 1, label: tx.step1 }, { num: 2, label: tx.step2 }, { num: 3, label: tx.step3 }];

  const templateName = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">{tx.title}</h1>
            <p className="text-muted-foreground">{tx.sub}</p>
          </div>

          {/* Steps */}
          <div className="flex items-center mb-10">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                  </div>
                  <span className={`hidden sm:block text-sm font-medium ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${step > s.num ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Template */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-5">{tx.step1}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-5 rounded-xl border-2 text-left transition-all hover:shadow-md ${selectedTemplate === t.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40 bg-card'}`}
                    data-testid={`template-${t.id}`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${selectedTemplate === t.id ? 'bg-primary/15' : 'bg-secondary/10'}`}>
                      <t.icon className={`h-5 w-5 ${selectedTemplate === t.id ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <p className="font-semibold text-foreground text-sm">{language === 'en' ? t.en : t.ar}</p>
                    {selectedTemplate === t.id && <div className="mt-2 flex items-center gap-1 text-primary text-xs"><Check className="h-3 w-3" /> Selected</div>}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={!selectedTemplate} onClick={() => setStep(2)} data-testid="button-next-step2">{tx.next}</Button>
              </div>
            </div>
          )}

          {/* Step 2: Form */}
          {step === 2 && (
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">{language === 'en' ? templateName?.en : templateName?.ar}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { key: "party1", label: tx.party1 }, { key: "party2", label: tx.party2 },
                  { key: "date", label: tx.date, type: "date" }, { key: "duration", label: tx.duration },
                  { key: "amount", label: tx.amount }, { key: "jurisdiction", label: tx.jurisdiction },
                ].map(field => (
                  <div key={field.key}>
                    <Label className="mb-1 block">{field.label}</Label>
                    <Input
                      type={field.type || "text"}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      data-testid={`input-contract-${field.key}`}
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <Label className="mb-2 block">{tx.outputLang}</Label>
                  <div className="flex gap-3">
                    {[{ v: "arabic", l: tx.arabic }, { v: "english", l: tx.english }, { v: "bilingual", l: tx.bilingual }].map(o => (
                      <button key={o.v} type="button" onClick={() => setForm(f => ({ ...f, outputLang: o.v }))}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${form.outputLang === o.v ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}
                        data-testid={`button-lang-${o.v}`}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-1 block">{tx.clauses}</Label>
                  <textarea
                    value={form.clauses}
                    onChange={e => setForm(f => ({ ...f, clauses: e.target.value }))}
                    placeholder={tx.clauses_ph}
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring"
                    data-testid="input-contract-clauses"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)} data-testid="button-back-step1">{tx.back}</Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setStep(3)} data-testid="button-next-step3">{tx.preview}</Button>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="bg-secondary text-secondary-foreground p-6 text-center">
                  <p className="text-xs text-gray-300 mb-1">KnowLaw – Smart Contract Generator</p>
                  <h2 className="text-xl font-bold text-white mb-1">{language === 'en' ? templateName?.en : templateName?.ar}</h2>
                  <p className="text-sm text-gray-300">{form.date || new Date().toLocaleDateString()}</p>
                </div>
                <div className="p-8 space-y-5 text-sm">
                  <div className="grid grid-cols-2 gap-4 border border-border rounded-lg p-4">
                    <div><p className="text-xs text-muted-foreground mb-1">{tx.party1}</p><p className="font-semibold">{form.party1 || "—"}</p></div>
                    <div><p className="text-xs text-muted-foreground mb-1">{tx.party2}</p><p className="font-semibold">{form.party2 || "—"}</p></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border border-border rounded-lg p-4">
                    <div><p className="text-xs text-muted-foreground mb-1">{tx.duration}</p><p className="font-semibold">{form.duration || "—"}</p></div>
                    <div><p className="text-xs text-muted-foreground mb-1">{tx.amount}</p><p className="font-semibold">{form.amount ? `${form.amount} EGP` : "—"}</p></div>
                    <div><p className="text-xs text-muted-foreground mb-1">{tx.jurisdiction}</p><p className="font-semibold">{form.jurisdiction}</p></div>
                  </div>
                  <div className="border border-border rounded-lg p-4 bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-2">Standard Terms (Egyptian Law)</p>
                    <p className="text-foreground leading-relaxed">This agreement is governed by Egyptian law and is subject to the jurisdiction of Egyptian courts. All disputes arising from or related to this agreement shall be resolved in accordance with the applicable provisions of the Egyptian Civil Code (Law No. 131 of 1948) and relevant commercial statutes. {form.clauses && `\n\nAdditional Terms: ${form.clauses}`}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" onClick={() => setStep(2)} data-testid="button-back-step2">{tx.back}</Button>
                <Button className="flex-1 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => alert(language === 'en' ? 'PDF generation simulated — in production this would download a real PDF.' : 'تم محاكاة إنشاء PDF — في بيئة الإنتاج سيتم تحميل ملف PDF حقيقي.')} data-testid="button-generate-pdf">
                  <Download className="h-4 w-4" />{tx.generate}
                </Button>
                <Button className={`flex-1 gap-2 ${saved ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`} onClick={() => setSaved(true)} data-testid="button-save-contract">
                  <Save className="h-4 w-4" />{saved ? tx.saved : tx.save}
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
