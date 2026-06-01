import { useAppContext } from "@/context/AppContext";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { language, setLanguage, isLoggedIn, currentUser, setIsLoggedIn } = useAppContext();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    en: {
      login: "Login",
      register: "Register",
      home: "Home",
      dashboard: "Dashboard",
      chat: "AI Chat",
      analyze: "Analyze",
      contracts: "Contracts",
      translate: "Translate",
      lawyers: "Lawyers",
      vault: "Vault",
      admin: "Admin",
      profile: "Profile",
      logout: "Logout",
    },
    ar: {
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      home: "الرئيسية",
      dashboard: "لوحة التحكم",
      chat: "المحادثة الذكية",
      analyze: "تحليل المستندات",
      contracts: "العقود",
      translate: "الترجمة",
      lawyers: "المحامين",
      vault: "الخزنة",
      admin: "الإدارة",
      profile: "الملف الشخصي",
      logout: "تسجيل الخروج",
    }
  };

  const navLinks = isLoggedIn ? [
    { href: "/dashboard", label: t[language].dashboard },
    { href: "/chat", label: t[language].chat },
    { href: "/analyze", label: t[language].analyze },
    { href: "/contracts", label: t[language].contracts },
    { href: "/translate", label: t[language].translate },
    { href: "/lawyers", label: t[language].lawyers },
    { href: "/vault", label: t[language].vault },
    { href: "/admin", label: t[language].admin },
  ] : [
    { href: "/", label: t[language].home },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLocation("/");
  };

  return (
    <nav className="bg-secondary text-secondary-foreground sticky top-0 z-50 w-full border-b border-secondary-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white hover:text-primary transition-colors">
          <span className="text-2xl">⚖️</span>
          <span>KnowLaw</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium hover:text-primary transition-colors ${location === link.href ? 'text-primary' : 'text-gray-300'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-gray-600 pl-4 ml-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-gray-300 hover:text-white"
            >
              {language === 'en' ? '🇪🇬 AR' : '🇬🇧 EN'}
            </Button>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline-block">{currentUser?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{currentUser?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setLocation("/dashboard")}>
                    {t[language].dashboard}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {t[language].profile}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:bg-destructive/10" onClick={handleLogout}>
                    {t[language].logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setLocation("/login")} className="text-gray-300 hover:text-white">
                  {t[language].login}
                </Button>
                <Button onClick={() => setLocation("/register")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {t[language].register}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          >
            {language === 'en' ? '🇪🇬' : '🇬🇧'}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-700 bg-secondary px-4 py-4 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-base font-medium py-2 ${location === link.href ? 'text-primary' : 'text-gray-300'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="pt-4 border-t border-gray-700">
            {isLoggedIn ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2 py-3 bg-secondary-accent rounded-md">
                  <div className="bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center font-bold">
                    {currentUser?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{currentUser?.name}</p>
                    <p className="text-sm text-gray-400">{currentUser?.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full justify-start text-destructive" onClick={handleLogout}>
                  {t[language].logout}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => { setLocation("/login"); setMobileMenuOpen(false); }} className="w-full">
                  {t[language].login}
                </Button>
                <Button onClick={() => { setLocation("/register"); setMobileMenuOpen(false); }} className="w-full bg-primary text-primary-foreground">
                  {t[language].register}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
