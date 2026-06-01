import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserRole = 'Regular User' | 'Legal Professional (Lawyer)' | 'Admin';

interface User {
  name: string;
  email: string;
  role: UserRole;
  residency: string;
}

interface AppContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>({
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    role: 'Regular User',
    residency: 'Egyptian Citizen 🇪🇬'
  });

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      isLoggedIn,
      setIsLoggedIn,
      currentUser,
      setCurrentUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
