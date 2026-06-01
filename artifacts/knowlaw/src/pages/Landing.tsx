import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { MessageSquare, Search, FileText, Languages, Lock, Users, ChevronRight, Star } from "lucide-react";

const t = {
  en: {
    hero_title: "KnowLaw – Your Smart Legal Assistant for Egyptian Law",
    hero_sub: "Democratizing access to Egyptian law through AI. Get instant legal information, analyze documents, generate contracts, and connect with licensed lawyers — all in one platform.",
    cta_start: "Get Started Free",
    cta_learn: "Learn More",
    features_title: "Everything You Need for Egyptian Legal Research",
    features_sub: "A complete suite of AI-powered tools built for Egyptian law",
    how_title: "How It Works",
    how_sub: "Three simple steps to get legal clarity",
    step1_title: "Ask Your Question",
    step1_desc: "Type your legal question in Arabic or English",
    step2_title: "AI Retrieves from Egyptian Law",
    step2_desc: "Our RAG engine searches 22 Egyptian legal datasets in milliseconds",
    step3_title: "Get a Cited Answer",
    step3_desc: "Receive a precise answer with citations to specific articles and codes",
    testimonials_title: "Trusted by Legal Professionals",
    testimonials_sub: "What our users say about KnowLaw",
  },
  ar: {
    hero_title: "KnowLaw – مساعدك القانوني الذكي للقانون المصري",
    hero_sub: "إمكانية الوصول إلى القانون المصري من خلال الذكاء الاصطناعي. احصل على معلومات قانونية فورية، وحلل المستندات، وأنشئ العقود، وتواصل مع محامين مرخصين — كل ذلك في منصة واحدة.",
    cta_start: "ابدأ مجاناً",
    cta_learn: "اعرف المزيد",
    features_title: "كل ما تحتاجه للبحث القانوني المصري",
    features_sub: "مجموعة كاملة من الأدوات المدعومة بالذكاء الاصطناعي للقانون المصري",
    how_title: "كيف يعمل النظام",
    how_sub: "ثلاث خطوات بسيطة للحصول على وضوح قانوني",
    step1_title: "اطرح سؤالك",
    step1_desc: "اكتب سؤالك القانوني بالعربية أو الإنجليزية",
    step2_title: "الذكاء الاصطناعي يبحث في القانون المصري",
    step2_desc: "يبحث محرك RAG الخاص بنا في 22 مجموعة بيانات قانونية مصرية في ميلي ثانية",
    step3_title: "احصل على إجابة مستشهد بها",
    step3_desc: "تلقي إجابة دقيقة مع استشهادات بمواد وقوانين محددة",
    testimonials_title: "موثوق به من قبل المتخصصين القانونيين",
    testimonials_sub: "ما يقوله مستخدمونا عن KnowLaw",
  }
};

const features = [
  { icon: MessageSquare, enTitle: "AI Legal Chatbot", arTitle: "روبوت المحادثة القانونية", enDesc: "RAG-powered chatbot trained on 22 Egyptian legal datasets. Get cited answers instantly.", arDesc: "روبوت محادثة مدعوم بتقنية RAG ومدرب على 22 مجموعة بيانات قانونية مصرية." },
  { icon: Search, enTitle: "Document Analysis", arTitle: "تحليل المستندات", enDesc: "Upload PDFs and DOCX files. Our OCR engine extracts text and flags legal risks automatically.", arDesc: "ارفع ملفات PDF وDOCX. يستخرج محرك OCR النص ويرصد المخاطر القانونية تلقائياً." },
  { icon: FileText, enTitle: "Contract Generator", arTitle: "منشئ العقود", enDesc: "Generate legally-sound Egyptian contracts from templates in minutes. Bilingual output.", arDesc: "أنشئ عقوداً مصرية سليمة قانونياً من قوالب جاهزة في دقائق. إخراج ثنائي اللغة." },
  { icon: Languages, enTitle: "Document Translation", arTitle: "ترجمة المستندات", enDesc: "Accurate Arabic ↔ English legal document translation using neural machine translation.", arDesc: "ترجمة دقيقة للمستندات القانونية من العربية إلى الإنجليزية والعكس." },
  { icon: Lock, enTitle: "Legal Vault", arTitle: "الخزنة القانونية", enDesc: "Encrypted secure storage for all your legal documents, contracts, and case files.", arDesc: "تخزين آمن ومشفر لجميع مستنداتك ومستنداتك القانونية وملفات القضايا." },
  { icon: Users, enTitle: "Lawyer Directory", arTitle: "دليل المحامين", enDesc: "Find and book verified Egyptian lawyers by specialty and city. Transparent pricing.", arDesc: "ابحث واحجز مع محامين مصريين معتمدين حسب التخصص والمدينة. أسعار شفافة." },
];

const testimonials = [
  { name: "Mahmoud El-Rashidy", role: "Corporate Lawyer, Cairo", arRole: "محامي شركات، القاهرة", rating: 5, text: "KnowLaw has transformed how I research Egyptian commercial law. The RAG citations are incredibly accurate and save me hours every week.", arText: "غيّرت KnowLaw طريقة بحثي في القانون التجاري المصري. الاستشهادات دقيقة للغاية وتوفر لي ساعات كل أسبوع." },
  { name: "Dr. Fatima Al-Zahraa", role: "Legal Consultant, Alexandria", arRole: "مستشارة قانونية، الإسكندرية", rating: 5, text: "The bilingual support is exceptional. I can work seamlessly with both Arabic and English legal documents without switching tools.", arText: "الدعم ثنائي اللغة استثنائي. أعمل بسلاسة مع المستندات القانونية العربية والإنجليزية دون تغيير الأدوات." },
  { name: "Ahmed Kamal", role: "Small Business Owner, Giza", arRole: "صاحب عمل صغير، الجيزة", rating: 5, text: "As a non-lawyer, I finally understand my contracts and legal obligations. The plain-language explanations with citations are a game changer.", arText: "كشخص غير متخصص في القانون، أفهم الآن عقودي والتزاماتي القانونية. الشرح البسيط مع الاستشهادات غيّر قواعد اللعبة." },
];

export default function Landing() {
  const { language } = useAppContext();
  const [, setLocation] = useLocation();
  const tx = t[language];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #C9A84C 0%, transparent 60%), radial-gradient(circle at 80% 20%, #4A6FA5 0%, transparent 50%)" }} />
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {language === 'en' ? 'Powered by Egyptian Legal AI' : 'مدعوم بالذكاء الاصطناعي القانوني المصري'}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {tx.hero_title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {tx.hero_sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 font-semibold"
              onClick={() => setLocation("/register")}
              data-testid="button-hero-start"
            >
              {tx.cta_start}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-400 text-white hover:bg-white/10 text-base px-8 py-6 bg-transparent"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-hero-learn"
            >
              {tx.cta_learn}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-6 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { en: "22 Legal Datasets", ar: "22 مجموعة بيانات قانونية" },
              { en: "5 AI Agents", ar: "5 وكلاء ذكاء اصطناعي" },
              { en: "Bilingual (AR/EN)", ar: "ثنائي اللغة (عربي/إنجليزي)" },
              { en: "GDPR Compliant", ar: "متوافق مع GDPR" },
            ].map((stat, i) => (
              <div key={i} className="text-primary-foreground font-bold text-sm md:text-base" data-testid={`stat-${i}`}>
                {language === 'en' ? stat.en : stat.ar}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{tx.features_title}</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">{tx.features_sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 hover:shadow-md transition-all group" data-testid={`feature-card-${i}`}>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <f.icon className="h-6 w-6 text-secondary group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{language === 'en' ? f.enTitle : f.arTitle}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{language === 'en' ? f.enDesc : f.arDesc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-secondary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{tx.how_title}</h2>
            <p className="text-muted-foreground text-lg">{tx.how_sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: tx.step1_title, desc: tx.step1_desc },
              { num: "02", title: tx.step2_title, desc: tx.step2_desc },
              { num: "03", title: tx.step3_title, desc: tx.step3_desc },
            ].map((step, i) => (
              <div key={i} className="text-center" data-testid={`step-${i}`}>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                {i < 2 && <div className="hidden md:block absolute" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{tx.testimonials_title}</h2>
            <p className="text-muted-foreground text-lg">{tx.testimonials_sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow" data-testid={`testimonial-${i}`}>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  "{language === 'en' ? t.text : t.arText}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{language === 'en' ? t.role : t.arRole}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'en' ? 'Start Your Legal Journey Today' : 'ابدأ رحلتك القانونية اليوم'}
          </h2>
          <p className="text-gray-300 mb-8">
            {language === 'en' ? 'Join thousands of Egyptians who trust KnowLaw for their legal needs.' : 'انضم إلى آلاف المصريين الذين يثقون في KnowLaw لاحتياجاتهم القانونية.'}
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-10 py-6 font-semibold"
            onClick={() => setLocation("/register")}
            data-testid="button-cta-register"
          >
            {language === 'en' ? 'Create Free Account' : 'إنشاء حساب مجاني'}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
