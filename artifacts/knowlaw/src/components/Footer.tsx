import { useAppContext } from "@/context/AppContext";

export function Footer() {
  const { language } = useAppContext();
  
  const currentYear = new Date().getFullYear();
  
  const content = {
    en: {
      about: "About",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      disclaimer: "KnowLaw is a legal information tool. It does not provide legal advice and does not create an attorney-client relationship.",
      rights: "All rights reserved."
    },
    ar: {
      about: "عن المنصة",
      privacy: "الخصوصية",
      terms: "الشروط",
      contact: "اتصل بنا",
      disclaimer: "منصة KnowLaw هي أداة للمعلومات القانونية. ولا تقدم استشارات قانونية ولا تنشئ علاقة محامي وموكل.",
      rights: "جميع الحقوق محفوظة."
    }
  };

  return (
    <footer className="bg-white border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-xl font-bold text-secondary">
            <span>⚖️</span>
            <span>KnowLaw</span>
          </div>
          
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">{content[language].about}</a>
            <a href="#" className="hover:text-primary transition-colors">{content[language].privacy}</a>
            <a href="#" className="hover:text-primary transition-colors">{content[language].terms}</a>
            <a href="#" className="hover:text-primary transition-colors">{content[language].contact}</a>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6 flex flex-col items-center text-center">
          <p className="text-sm text-muted-foreground bg-amber-50 text-amber-800 p-3 rounded-md w-full max-w-3xl mb-4 font-medium">
            {content[language].disclaimer}
          </p>
          <p className="text-xs text-gray-400">
            © {currentYear} KnowLaw. {content[language].rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
