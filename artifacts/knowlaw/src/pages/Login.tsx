import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";

export default function Login() {
  const { language, setIsLoggedIn } = useAppContext();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tx = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to your KnowLaw account",
      email: "Email Address",
      password: "Password",
      forgot: "Forgot Password?",
      submit: "Sign In",
      noAccount: "Don't have an account?",
      register: "Create one here",
      loggingIn: "Signing in...",
    },
    ar: {
      title: "مرحباً بعودتك",
      subtitle: "سجّل الدخول إلى حسابك في KnowLaw",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      forgot: "نسيت كلمة المرور؟",
      submit: "تسجيل الدخول",
      noAccount: "ليس لديك حساب؟",
      register: "أنشئ حساباً هنا",
      loggingIn: "جارٍ تسجيل الدخول...",
    }
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError(language === 'en' ? 'Please fill in all fields.' : 'يرجى ملء جميع الحقول.'); return; }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoggedIn(true);
      setLocation("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="text-3xl mb-3">⚖️</div>
              <h1 className="text-2xl font-bold text-foreground">{tx.title}</h1>
              <p className="text-muted-foreground mt-1">{tx.subtitle}</p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email">{tx.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1"
                  data-testid="input-email"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="password">{tx.password}</Label>
                  <a href="#" className="text-xs text-primary hover:underline" data-testid="link-forgot-password">{tx.forgot}</a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-testid="input-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-5"
                disabled={loading}
                data-testid="button-submit-login"
              >
                {loading ? tx.loggingIn : tx.submit}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {tx.noAccount}{" "}
              <button onClick={() => setLocation("/register")} className="text-primary hover:underline font-medium" data-testid="link-to-register">
                {tx.register}
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
