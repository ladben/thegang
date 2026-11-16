import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { translations } from '../assets/translations';
import { cards } from '../assets/cards';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'use-lang';
const DEFAULT_LANG = 'hu-HU';

// Walks nested objects using dot notation: getNestedValue(obj, 'buttons.defeat')
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

export function LanguageProvider({ children }) {
  // Lazy initializer reads localStorage only once on initial mount
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;

    localStorage.setItem(STORAGE_KEY, DEFAULT_LANG);
    return DEFAULT_LANG;
  });

  // Wrapper keeps React state and localStorage in sync together
  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        setLangState(event.newValue || DEFAULT_LANG);
      } else if (event.key === null) {
        setLangState(DEFAULT_LANG);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Translation helper with fallback and simple {{variable}} replacement
  const translate = useCallback(
    (key, vars = {}) => {
      const dict = translations[lang] || translations[DEFAULT_LANG];
      let text =
        getNestedValue(dict, key) ??
        getNestedValue(translations[DEFAULT_LANG], key) ??
        key;

      if (typeof text !== 'string') return key;

      Object.entries(vars).forEach(([varKey, value]) => {
        text = text.replaceAll(`{{${varKey}}}`, String(value));
      });

      return text;
    },
    [lang],
  );

  // Cards helper with fallback and simple {{variable}} replacement
  const card = useCallback(
    (key, vars = {}) => {
      const dict = cards[lang] || cards[DEFAULT_LANG];
      let text =
        getNestedValue(dict, key) ??
        getNestedValue(cards[DEFAULT_LANG], key) ??
        key;

      if (typeof text !== 'string') return key;

      Object.entries(vars).forEach(([varKey, value]) => {
        text = text.replaceAll(`{{${varKey}}}`, String(value));
      });

      return text;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, translate, card }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for easy reading/writing from any component
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }
  return context;
}
