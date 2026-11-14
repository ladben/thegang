import { useLanguage } from '../../../../context/LanguageContext';
import Flag from './Flag/Flag';
import './LanguagePicker.css';

const LanguagePicker = () => {
  const { lang, setLang } = useLanguage();
  const flagLanguages = [
    { lang: 'en-EN', text: 'English' },
    { lang: 'hu-HU', text: 'Magyar' },
  ];
  return (
    <div className='homepage-language-picker'>
      <p className='lang-title'>Select language / Válassz Nyelvet</p>
      <div className='lang-flags'>
        {flagLanguages.map((flagLang, index) => (
          <div
            className='picker'
            onClick={() => setLang(flagLang.lang)}
            key={`flag-lang-${index}`}
          >
            <Flag
              lang={flagLang.lang}
              text={flagLang.text}
              highlighted={flagLang.lang === lang}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagePicker;
