import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldAlert,
  Languages,
  Shuffle,
  RotateCcw,
  Trash2,
  Sparkles,
  Trophy,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lock,
  Zap,
  Info,
} from 'lucide-react';

import CARDS_DATA from './assets/cards/cards.json';
import CardGraphic from './components/CardGraphic';

export default function App() {
  const STORAGE_KEY = 'THE_GANG_GAME_SESSION_V1';
  const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

  const [lang, setLang] = useState('en-EN');
  const [activeCard, setActiveCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [alarms, setAlarms] = useState(0);
  const [goldBars, setGoldBars] = useState(0);

  const [usedSpecialists, setUsedSpecialists] = useState([]);
  const [usedChallenges, setUsedChallenges] = useState([]);

  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [continuedPastThreeGold, setContinuedPastThreeGold] = useState(false);
  const [gameOutcome, setGameOutcome] = useState(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState(null);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.expiresAt && Date.now() < parsed.expiresAt) {
          setLang(parsed.lang || 'en-EN');
          setActiveCard(parsed.activeCard || null);
          setIsFlipped(parsed.isFlipped || false);
          setAlarms(parsed.alarms || 0);
          setGoldBars(parsed.goldBars || 0);
          setUsedSpecialists(parsed.usedSpecialists || []);
          setUsedChallenges(parsed.usedChallenges || []);
          setContinuedPastThreeGold(parsed.continuedPastThreeGold || false);
          setGameOutcome(parsed.gameOutcome || null);

          const newExp = Date.now() + TWO_HOURS_MS;
          setSessionExpiresAt(newExp);
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ ...parsed, expiresAt: newExp }),
          );
          return;
        }
      }
    } catch (e) {
      console.error('Failed to restore session', e);
    }
    setSessionExpiresAt(Date.now() + TWO_HOURS_MS);
  }, []);

  const saveState = (newState = {}) => {
    const updatedExpiry = Date.now() + TWO_HOURS_MS;
    setSessionExpiresAt(updatedExpiry);
    const dataToStore = {
      lang,
      activeCard,
      isFlipped,
      alarms,
      goldBars,
      usedSpecialists,
      usedChallenges,
      continuedPastThreeGold,
      gameOutcome,
      expiresAt: updatedExpiry,
      ...newState,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  };

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    saveState({ lang: newLang });
  };

  const resetGame = () => {
    setActiveCard(null);
    setIsFlipped(false);
    setAlarms(0);
    setGoldBars(0);
    setUsedSpecialists([]);
    setUsedChallenges([]);
    setShowMilestoneModal(false);
    setContinuedPastThreeGold(false);
    setGameOutcome(null);

    const newExp = Date.now() + TWO_HOURS_MS;
    setSessionExpiresAt(newExp);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getRandomUnusedNumber = (usedList) => {
    const available = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(
      (n) => !usedList.includes(n),
    );
    if (available.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  };

  const handleDrawCard = (cardType) => {
    if (gameOutcome) return;

    const isSpecialist = cardType === 'specialist';
    const usedList = isSpecialist ? usedSpecialists : usedChallenges;

    const cardNum = getRandomUnusedNumber(usedList);
    if (!cardNum) {
      alert(
        lang === 'hu-HU'
          ? 'Nincs több elérhető kártya ebben a pakliban!'
          : 'No more available cards in this deck!',
      );
      return;
    }

    const nextUsed = [...usedList, cardNum];
    if (isSpecialist) {
      setUsedSpecialists(nextUsed);
    } else {
      setUsedChallenges(nextUsed);
    }

    let nextAlarms = alarms;
    let nextGold = goldBars;

    if (isSpecialist) {
      nextAlarms += 1;
      setAlarms(nextAlarms);
    } else {
      nextGold += 1;
      setGoldBars(nextGold);
    }

    const newActiveCard = { type: cardType, number: cardNum };

    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        setActiveCard(newActiveCard);
        setTimeout(() => {
          setIsFlipped(true);
          checkEndConditions(nextAlarms, nextGold);
          saveState({
            activeCard: newActiveCard,
            isFlipped: true,
            alarms: nextAlarms,
            goldBars: nextGold,
            usedSpecialists: isSpecialist ? nextUsed : usedSpecialists,
            usedChallenges: !isSpecialist ? nextUsed : usedChallenges,
          });
        }, 50);
      }, 350);
    } else {
      setActiveCard(newActiveCard);
      setTimeout(() => {
        setIsFlipped(true);
        checkEndConditions(nextAlarms, nextGold);
        saveState({
          activeCard: newActiveCard,
          isFlipped: true,
          alarms: nextAlarms,
          goldBars: nextGold,
          usedSpecialists: isSpecialist ? nextUsed : usedSpecialists,
          usedChallenges: !isSpecialist ? nextUsed : usedChallenges,
        });
      }, 50);
    }
  };

  const handleDiscardAndRedraw = () => {
    if (!activeCard || gameOutcome) return;

    const { type: cardType } = activeCard;
    const isSpecialist = cardType === 'specialist';
    const usedList = isSpecialist ? usedSpecialists : usedChallenges;

    const newCardNum = getRandomUnusedNumber(usedList);
    if (!newCardNum) {
      alert(
        lang === 'hu-HU'
          ? 'Nincs több kártya a cseréhez!'
          : 'No more cards remaining to redraw!',
      );
      return;
    }

    const nextUsed = [...usedList, newCardNum];
    if (isSpecialist) {
      setUsedSpecialists(nextUsed);
    } else {
      setUsedChallenges(nextUsed);
    }

    const newActiveCard = { type: cardType, number: newCardNum };

    setIsFlipped(false);
    setTimeout(() => {
      setActiveCard(newActiveCard);
      setTimeout(() => {
        setIsFlipped(true);
        saveState({
          activeCard: newActiveCard,
          isFlipped: true,
          usedSpecialists: isSpecialist ? nextUsed : usedSpecialists,
          usedChallenges: !isSpecialist ? nextUsed : usedChallenges,
        });
      }, 50);
    }, 350);
  };

  const toggleCardFlip = () => {
    if (!activeCard) return;
    const nextFlip = !isFlipped;
    setIsFlipped(nextFlip);
    saveState({ isFlipped: nextFlip });
  };

  const checkEndConditions = (currentAlarms, currentGold) => {
    if (currentAlarms >= 3) {
      setGameOutcome('FAIL_ALARMS');
      return;
    }
    if (currentGold >= 5) {
      setGameOutcome('VICTORY_5_GOLD');
      return;
    }
    if (currentGold === 3 && !continuedPastThreeGold && currentAlarms < 3) {
      setShowMilestoneModal(true);
    }
  };

  const handleCashOut = () => {
    setShowMilestoneModal(false);
    setGameOutcome('VICTORY_3_GOLD');
    saveState({ gameOutcome: 'VICTORY_3_GOLD' });
  };

  const handleContinueHeist = () => {
    setShowMilestoneModal(false);
    setContinuedPastThreeGold(true);
    saveState({ continuedPastThreeGold: true });
  };

  const activeCardDetails = useMemo(() => {
    if (!activeCard || !CARDS_DATA[lang]) return null;
    const group = CARDS_DATA[lang][activeCard.type];
    if (!group) return null;
    const cardObj = group.cards.find((c) => c.number === activeCard.number);
    return cardObj ? { ...cardObj, groupTitle: group.title } : null;
  }, [activeCard, lang]);

  const dictionary = {
    specialistBtn: CARDS_DATA[lang]?.specialist?.title || 'Specialist Card',
    challengeBtn: CARDS_DATA[lang]?.challenge?.title || 'Challenge Card',
    discardBtn:
      lang === 'hu-HU'
        ? 'Kártya eldobása & Újrahúzás'
        : 'Discard & Redraw Card',
    newGame: lang === 'hu-HU' ? 'Új Játék' : 'New Game',
    alarmsLabel: lang === 'hu-HU' ? 'Riasztások' : 'Alarms',
    goldLabel: lang === 'hu-HU' ? 'Aranyrúd' : 'Gold Bars',
    tapToDraw:
      lang === 'hu-HU'
        ? 'Kattints egy gombra a húzáshoz!'
        : 'Click a button to draw!',
    rulesTitle:
      lang === 'hu-HU' ? 'Játékszabályok & Segítség' : 'Game Rules & Info',
  };

  return (
    <div className='min-h-screen bg-[#0B0C10] text-gray-100 flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-black relative overflow-x-hidden'>
      <div className='fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]' />
      <div className='fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-red-900/10 blur-3xl pointer-events-none rounded-full' />
      <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-amber-600/10 blur-3xl pointer-events-none rounded-full' />

      <header className='relative z-10 w-full max-w-md mx-auto px-4 pt-4 pb-2 flex items-center justify-between border-b border-amber-500/20 bg-[#121216]/80 backdrop-blur-md rounded-b-xl shadow-lg'>
        <div className='flex items-center space-x-2'>
          <div className='p-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 text-black shadow-md'>
            <Trophy className='w-5 h-5 stroke-[2.5]' />
          </div>
          <span className='font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 uppercase text-sm sm:text-base'>
            The Gang
          </span>
        </div>

        <div className='flex items-center space-x-2'>
          <button
            onClick={() => setIsRulesOpen(!isRulesOpen)}
            className='p-2 rounded-lg bg-zinc-800/80 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition'
            title={dictionary.rulesTitle}
          >
            <HelpCircle className='w-4 h-4' />
          </button>

          <div className='flex items-center bg-zinc-900 border border-amber-500/30 rounded-lg p-0.5'>
            <button
              onClick={() => handleLanguageChange('en-EN')}
              className={`px-2 py-1 text-xs font-bold rounded ${
                lang === 'en-EN'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('hu-HU')}
              className={`px-2 py-1 text-xs font-bold rounded ${
                lang === 'hu-HU'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              HU
            </button>
          </div>

          <button
            onClick={resetGame}
            className='p-2 rounded-lg bg-zinc-800/80 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition flex items-center space-x-1'
            title={dictionary.newGame}
          >
            <RotateCcw className='w-4 h-4' />
          </button>
        </div>
      </header>

      <main className='relative z-10 flex-1 w-full max-w-md mx-auto px-4 py-4 flex flex-col justify-between items-center space-y-4'>
        <button
          onClick={() => handleDrawCard('specialist')}
          disabled={!!gameOutcome}
          className='w-full group relative overflow-hidden py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-950 via-red-900 to-zinc-900 border-2 border-red-600/60 shadow-[0_0_20px_rgba(220,20,60,0.3)] hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] active:scale-[0.98] transition-all duration-200 text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
        >
          <div className='flex items-center space-x-3'>
            <div className='p-2 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 group-hover:scale-110 transition-transform'>
              <ShieldAlert className='w-6 h-6' />
            </div>
            <div>
              <div className='text-xs font-semibold text-red-400 tracking-wider uppercase'>
                {lang === 'hu-HU' ? 'Piros Kártya' : 'Red Deck'}
              </div>
              <div className='text-base sm:text-lg font-bold text-red-100 tracking-wide'>
                {dictionary.specialistBtn}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <span className='text-xs font-bold text-red-300 bg-red-900/50 px-2.5 py-1 rounded-full border border-red-700/50'>
              {10 - usedSpecialists.length}/10
            </span>
          </div>
        </button>

        <div className='w-full flex-1 flex flex-col items-center justify-center my-2'>
          <div
            onClick={toggleCardFlip}
            style={{ perspective: '1000px' }}
            className='w-full max-w-[320px] aspect-[2/3] relative my-auto cursor-pointer select-none'
          >
            <div
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              className='w-full h-full relative rounded-3xl transition-transform duration-700'
            >
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                className='absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border-2 border-amber-500/40 p-6 flex flex-col items-center justify-between shadow-2xl'
              >
                <div className='w-full h-full border border-amber-500/20 rounded-2xl flex flex-col items-center justify-between p-6 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]'>
                  <div className='text-xs font-bold tracking-widest text-amber-500/60 uppercase'>
                    THE GANG
                  </div>

                  <div className='relative p-6 rounded-full border-2 border-amber-500/40 bg-zinc-900/90 shadow-[0_0_25px_rgba(212,175,55,0.2)]'>
                    <Lock className='w-16 h-16 text-amber-400 animate-pulse' />
                  </div>

                  <p className='text-center text-xs text-amber-400/80 font-medium px-2'>
                    {dictionary.tapToDraw}
                  </p>
                </div>
              </div>

              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                className={`absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-b ${
                  activeCard?.type === 'specialist'
                    ? 'from-zinc-900 via-red-950/40 to-zinc-950 border-2 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
                    : 'from-zinc-900 via-amber-950/40 to-zinc-950 border-2 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                } p-5 flex flex-col justify-between shadow-2xl`}
              >
                {activeCardDetails ? (
                  <>
                    <div className='flex items-center justify-between border-b border-zinc-800 pb-2'>
                      <span
                        className={`text-xs font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full ${
                          activeCard.type === 'specialist'
                            ? 'bg-red-900/50 text-red-300 border border-red-700/50'
                            : 'bg-amber-900/50 text-amber-300 border border-amber-700/50'
                        }`}
                      >
                        #{activeCardDetails.number} •{' '}
                        {activeCardDetails.groupTitle}
                      </span>
                      <Sparkles
                        className={`w-4 h-4 ${activeCard.type === 'specialist' ? 'text-red-400' : 'text-amber-400'}`}
                      />
                    </div>

                    <div className='my-2 flex items-center justify-center py-2'>
                      <div
                        className={`p-4 rounded-2xl bg-zinc-900/90 border shadow-inner ${
                          activeCard.type === 'specialist'
                            ? 'border-red-500/30'
                            : 'border-amber-500/30'
                        }`}
                      >
                        <CardGraphic
                          type={activeCard.type}
                          number={activeCard.number}
                        />
                      </div>
                    </div>

                    <div className='flex-1 flex flex-col justify-center text-center px-1'>
                      <h3
                        className={`text-xl font-black mb-2 tracking-wide ${
                          activeCard.type === 'specialist'
                            ? 'text-red-100'
                            : 'text-amber-100'
                        }`}
                      >
                        {activeCardDetails.title}
                      </h3>

                      <div
                        className='text-xs sm:text-sm text-zinc-300 leading-relaxed overflow-y-auto max-h-[140px] px-1 scrollbar-thin scrollbar-thumb-zinc-700 space-y-2 text-left'
                        dangerouslySetInnerHTML={{
                          __html: activeCardDetails.description,
                        }}
                      />
                    </div>

                    <div className='pt-2 border-t border-zinc-800 text-center'>
                      <span className='text-[10px] tracking-wider text-zinc-500 uppercase'>
                        THE GANG • {activeCard.type.toUpperCase()}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className='flex flex-col items-center justify-center h-full text-zinc-500'>
                    <p className='text-sm'>No card selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {activeCard && !gameOutcome && (
            <button
              onClick={handleDiscardAndRedraw}
              className='mt-3 py-2 px-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center space-x-2 shadow-md active:scale-95 cursor-pointer'
            >
              <Trash2 className='w-3.5 h-3.5 text-red-400' />
              <span>{dictionary.discardBtn}</span>
            </button>
          )}
        </div>

        <button
          onClick={() => handleDrawCard('challenge')}
          disabled={!!gameOutcome}
          className='w-full group relative overflow-hidden py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-950 via-amber-900 to-zinc-900 border-2 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-[0.98] transition-all duration-200 text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
        >
          <div className='flex items-center space-x-3'>
            <div className='p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 group-hover:scale-110 transition-transform'>
              <Zap className='w-6 h-6' />
            </div>
            <div>
              <div className='text-xs font-semibold text-amber-400 tracking-wider uppercase'>
                {lang === 'hu-HU' ? 'Arany Kártya' : 'Gold Deck'}
              </div>
              <div className='text-base sm:text-lg font-bold text-amber-100 tracking-wide'>
                {dictionary.challengeBtn}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <span className='text-xs font-bold text-amber-300 bg-amber-900/50 px-2.5 py-1 rounded-full border border-amber-700/50'>
              {10 - usedChallenges.length}/10
            </span>
          </div>
        </button>
      </main>

      <footer className='relative z-10 w-full max-w-md mx-auto px-4 pb-4 pt-2'>
        <div className='bg-[#121216]/90 border border-zinc-800 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex items-center justify-between'>
          <div className='flex flex-col space-y-1'>
            <div className='flex items-center space-x-1.5 text-xs font-bold text-red-400 uppercase tracking-wider'>
              <AlertTriangle className='w-3.5 h-3.5' />
              <span>{dictionary.alarmsLabel} (3 Max)</span>
            </div>
            <div className='flex items-center space-x-2 pt-0.5'>
              {[1, 2, 3].map((index) => {
                const isActive = alarms >= index;
                return (
                  <div key={index} className='relative'>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? 'bg-red-600 border-2 border-red-300 shadow-[0_0_15px_#EF4444] animate-pulse'
                          : 'bg-zinc-900 border border-zinc-700 opacity-40'
                      }`}
                    >
                      <ShieldAlert
                        className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-600'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='h-10 w-[1px] bg-zinc-800' />

          <div className='flex flex-col items-end space-y-1'>
            <div className='flex items-center space-x-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider'>
              <Trophy className='w-3.5 h-3.5' />
              <span>{dictionary.goldLabel} (5 Max)</span>
            </div>
            <div className='flex items-center space-x-1 pt-0.5'>
              {[1, 2, 3, 4, 5].map((index) => {
                const isActive = goldBars >= index;
                return (
                  <div key={index} className='relative'>
                    <div
                      className={`w-5 h-7 rounded-md transition-all duration-500 flex items-center justify-center ${
                        isActive
                          ? 'bg-gradient-to-b from-yellow-300 via-amber-500 to-amber-700 border border-yellow-200 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                          : 'bg-zinc-900 border border-zinc-800 opacity-40'
                      }`}
                    >
                      <span
                        className={`text-[9px] font-black ${isActive ? 'text-black' : 'text-zinc-600'}`}
                      >
                        AU
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </footer>

      {showMilestoneModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in'>
          <div className='w-full max-w-sm rounded-3xl bg-zinc-900 border-2 border-amber-500 p-6 shadow-2xl text-center space-y-5'>
            <div className='w-16 h-16 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400'>
              <Trophy className='w-10 h-10' />
            </div>

            <div>
              <h3 className='text-xl font-black text-amber-200 uppercase tracking-wide'>
                {lang === 'hu-HU' ? 'Phase 1 Teljesítve!' : 'Phase 1 Complete!'}
              </h3>
              <p className='text-sm text-zinc-300 mt-2 leading-relaxed'>
                {lang === 'hu-HU'
                  ? 'A Gang megszerzett 3 Aranyrudat! Szeretnétek befejezni a rablást biztonságban, vagy kockáztattok tovább 5 aranyrúdig?'
                  : 'The Gang collected 3 Gold Bars! Do you want to cash out safely, or push forward for maximum loot (up to 5 Gold Bars)?'}
              </p>
            </div>

            <div className='space-y-2'>
              <button
                onClick={handleCashOut}
                className='w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-extrabold text-sm shadow-lg hover:brightness-110 transition cursor-pointer'
              >
                {lang === 'hu-HU'
                  ? 'Befejezés (Kassza Ürítés)'
                  : 'Cash Out & Win (3 Gold)'}
              </button>
              <button
                onClick={handleContinueHeist}
                className='w-full py-3 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-amber-400 font-bold text-sm hover:bg-zinc-700 transition cursor-pointer'
              >
                {lang === 'hu-HU'
                  ? 'Folytatás (Rablás Folytatása)'
                  : 'Push Forward (Up to 5 Gold)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {gameOutcome && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in'>
          <div
            className={`w-full max-w-sm rounded-3xl border-2 p-6 shadow-2xl text-center space-y-5 ${
              gameOutcome === 'FAIL_ALARMS'
                ? 'bg-zinc-950 border-red-600 shadow-[0_0_50px_rgba(220,20,60,0.4)]'
                : 'bg-zinc-950 border-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.4)]'
            }`}
          >
            {gameOutcome === 'FAIL_ALARMS' ? (
              <>
                <div className='w-16 h-16 mx-auto rounded-full bg-red-900/40 border border-red-500 flex items-center justify-center text-red-500'>
                  <XCircle className='w-10 h-10 animate-pulse' />
                </div>
                <div>
                  <h3 className='text-2xl font-black text-red-500 uppercase tracking-wide'>
                    {lang === 'hu-HU' ? 'A Gang Elbukott!' : 'The Gang Busted!'}
                  </h3>
                  <p className='text-sm text-zinc-400 mt-2'>
                    {lang === 'hu-HU'
                      ? 'Elértétek a 3 riasztási szintet. A biztonsági rendszer lezárta a széfet!'
                      : 'Security tripped 3 alarms! The vault system went into lockdown.'}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className='w-16 h-16 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400'>
                  <CheckCircle2 className='w-10 h-10' />
                </div>
                <div>
                  <h3 className='text-2xl font-black text-amber-300 uppercase tracking-wide'>
                    {lang === 'hu-HU' ? 'Sikeres Rablás!' : 'The Gang Escaped!'}
                  </h3>
                  <p className='text-sm text-zinc-300 mt-2'>
                    {gameOutcome === 'VICTORY_5_GOLD'
                      ? lang === 'hu-HU'
                        ? 'Legenda státusz! Megszereztétek mind az 5 aranyrudat!'
                        : 'Legendary score! The Gang secured all 5 Gold Bars!'
                      : lang === 'hu-HU'
                        ? 'Szép munka! Biztonságban megléptetek a 3 aranyrúddal.'
                        : 'Great job! The Gang made a clean getaway with 3 Gold Bars.'}
                  </p>
                </div>
              </>
            )}

            <div className='grid grid-cols-2 gap-2 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 text-xs'>
              <div>
                <span className='text-zinc-500 block'>
                  {dictionary.alarmsLabel}
                </span>
                <span className='font-bold text-red-400'>{alarms} / 3</span>
              </div>
              <div>
                <span className='text-zinc-500 block'>
                  {dictionary.goldLabel}
                </span>
                <span className='font-bold text-amber-400'>{goldBars} / 5</span>
              </div>
            </div>

            <button
              onClick={resetGame}
              className={`w-full py-3.5 px-4 rounded-xl font-black text-sm shadow-lg transition cursor-pointer ${
                gameOutcome === 'FAIL_ALARMS'
                  ? 'bg-red-600 hover:bg-red-500 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:brightness-110'
              }`}
            >
              {lang === 'hu-HU' ? 'Új Rablás Indítása' : 'Start New Heist'}
            </button>
          </div>
        </div>
      )}

      {isRulesOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in'>
          <div className='w-full max-w-sm rounded-3xl bg-zinc-900 border border-amber-500/40 p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto'>
            <div className='flex items-center justify-between border-b border-zinc-800 pb-2'>
              <h3 className='font-bold text-amber-400 text-base'>
                {dictionary.rulesTitle}
              </h3>
              <button
                onClick={() => setIsRulesOpen(false)}
                className='text-zinc-400 hover:text-white cursor-pointer'
              >
                ✕
              </button>
            </div>

            <div className='text-xs text-zinc-300 space-y-3 leading-relaxed'>
              <p>
                <strong>
                  {lang === 'hu-HU'
                    ? 'Piros Specialista Kártya:'
                    : 'Red Specialist Cards:'}
                </strong>{' '}
                {lang === 'hu-HU'
                  ? 'Minden húzás 1 Riasztási pontot ad.'
                  : 'Each draw adds 1 Alarm Light.'}
              </p>
              <p>
                <strong>
                  {lang === 'hu-HU'
                    ? 'Arany Kihívás Kártya:'
                    : 'Gold Challenge Cards:'}
                </strong>{' '}
                {lang === 'hu-HU'
                  ? 'Minden húzás 1 Aranyrudat ad.'
                  : 'Each draw adds 1 Gold Bar.'}
              </p>
              <p>
                <strong>{lang === 'hu-HU' ? 'Eldobás:' : 'Discard:'}</strong>{' '}
                {lang === 'hu-HU'
                  ? 'Ha nem tetszik a lap, eldobhatod és újat húzhatsz ugyanabból a pakliból.'
                  : "If you don't like a card, you can discard it and draw a fresh replacement card."}
              </p>
              <p>
                <strong>{lang === 'hu-HU' ? 'Vereség:' : 'Game Over:'}</strong>{' '}
                {lang === 'hu-HU'
                  ? '3 Riasztás elérése esetén a rablás meghiúsul.'
                  : 'Reaching 3 Alarms ends the heist in failure.'}
              </p>
              <p>
                <strong>{lang === 'hu-HU' ? 'Mentés:' : 'Auto-Save:'}</strong>{' '}
                {lang === 'hu-HU'
                  ? 'A játékállás 2 óráig automatikusan megőrződik.'
                  : 'Progress auto-saves for up to 2 hours between visits.'}
              </p>
            </div>

            <button
              onClick={() => setIsRulesOpen(false)}
              className='w-full py-2.5 rounded-xl bg-zinc-800 text-amber-400 font-bold text-xs cursor-pointer'
            >
              {lang === 'hu-HU' ? 'Bezárás' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
