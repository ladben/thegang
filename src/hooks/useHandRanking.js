import { useLanguage } from '../context/LanguageContext';
import ENENHandRanking from '../assets/graphics/hand_rankings/en-EN.svg?react';
import HUHUHandRanking from '../assets/graphics/hand_rankings/hu-HU.svg?react';

const HAND_RANKING_SVGS = {
  'en-EN': ENENHandRanking,
  'hu-HU': HUHUHandRanking,
};

export function useHandRanking() {
  const { lang } = useLanguage();

  return HAND_RANKING_SVGS[lang] || HAND_RANKING_SVGS['en-EN'];
}
