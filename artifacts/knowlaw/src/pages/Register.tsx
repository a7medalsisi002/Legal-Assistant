import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";

export default function Register() {
  const { language, setIsLoggedIn } = useAppContext();
  const [, setLocation] = useLocation();
  const [residency, setResidency] = useState<"Egyptian Citizen" | "Foreign Resident">("Egyptian Citizen");
  const [role, setRole] = useState<"Regular User" | "Legal Professional">("Regular User");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const tx = {
    en: {
      title: "Create Your Account",
      sub: "Join thousands using KnowLaw for Egyptian legal research",
      name: "Full Name",
      email: "Email Address",
      password: "Password",
      confirm: "Confirm Password",
      residency_label: "Residency Status",
      egyptian: "Egyptian Citizen",
      foreign: "Foreign Resident",
      role_label: "Account Role",
      regular: "Regular User",
      lawyer: "Legal Professional (Lawyer)",
      syndicate: "Bar Syndicate ID",
      syndicate_ph: "e.g. EBA-2024-XXXXX",
      terms: "I agree to the Terms of Service and Privacy Policy",
      submit: "Create Account",
      hasAccount: "Already have an account?",
      login: "Sign in here",
    },
    ar: {
      title: "إنشاء حسابك",
      sub: "انضم إلى آلاف المستخدمين لـ KnowLaw للبحث القانوني المصري",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirm: "تأكيد كلمة المرور",
      residency_label: "حالة الإقامة",
      egyptian: "مواطن مصري",
      foreign: "مقيم أجنبي",
      role_label: "نوع الحساب",
      regular: "مستخدم عادي",
      lawyer: "متخصص قانوني (محامٍ)",
      syndicate: "رقم نقابة المحامين",
      syndicate_ph: "مثال: EBA-2024-XXXXX",
      terms: "أوافق على شروط الخدمة وسياسة الخصوصية",
      submit: "إنشاء الحساب",
      hasAccount: "هل لديك حساب بالفعل؟",
      login: "سجّل الدخول هنا",
    }
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setLocation("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-12 px-4">
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="text-3xl mb-3">⚖️</div>
              <h1 className="text-2xl font-bold text-foreground">{tx.title}</h1>
              <p className="text-muted-foreground mt-1">{tx.sub}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{tx.name}</Label>
                  <Input id="name" className="mt-1" placeholder="Ahmed Hassan" data-testid="input-name" />
                </div>
                <div>
                  <Label htmlFor="reg-email">{tx.email}</Label>
                  <Input id="reg-email" type="email" className="mt-1" placeholder="you@example.com" data-testid="input-reg-email" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reg-password">{tx.password}</Label>
                  <Input id="reg-password" type="password" className="mt-1" placeholder="••••••••" data-testid="input-reg-password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">{tx.confirm}</Label>
                  <Input id="confirm-password" type="password" className="mt-1" placeholder="••••••••" data-testid="input-confirm-password" />
                </div>
              </div>

              {/* Residency */}
              <div>
                <Label className="block mb-2">{tx.residency_label}</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(["Egyptian Citizen", "Foreign Resident"] as const).map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setResidency(r)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-all ${residency === r ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}
                      data-testid={`radio-residency-${r.replace(/\s+/g,'-').toLowerCase()}`}
                    >
                      <span>{r === "Egyptian Citizen" ? "🇪🇬" : "🌍"}</span>
                      <span>{r === "Egyptian Citizen" ? tx.egyptian : tx.foreign}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Role */}
              <div>
                <Label className="block mb-2">{tx.role_label}</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(["Regular User", "Legal Professional"] as const).map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${role === r ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}
                      data-testid={`radio-role-${r.replace(/\s+/g,'-').toLowerCase()}`}
                    >
                      {r === "Regular User" ? tx.regular : tx.lawyer}
                    </button>
                  ))}
                </div>
              </div>

              {role === "Legal Professional" && (
                <div>
                  <Label htmlFor="syndicate">{tx.syndicate}</Label>
                  <Input id="syndicate" className="mt-1" placeholder={tx.syndicate_ph} data-testid="input-syndicate-id" />
                </div>
              )}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 rounded border-border accent-primary"
                  data-testid="checkbox-terms"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">{tx.terms}</label>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-5"
                disabled={loading || !agreed}
                data-testid="button-submit-register"
              >
                {loading ? (language === 'en' ? 'Creating account...' : 'جارٍ إنشاء الحساب...') : tx.submit}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {tx.hasAccount}{" "}
              <button onClick={() => setLocation("/login")} className="text-primary hover:underline font-medium" data-testid="link-to-login">{tx.login}</button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
