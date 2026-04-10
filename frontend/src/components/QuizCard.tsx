import { useEffect } from 'react';
import type { Vocabulary, Settings } from '../types';
import type { QuizState } from '../hooks/useQuiz';

interface Props {
  vocab: Vocabulary;
  state: QuizState;
  settings: Settings;
  onReveal: () => void;
  onRate: (score: number) => void;
}

const SCORE_BUTTONS = [
  { score: 1, label: 'Gar nicht', emoji: '😵', color: 'bg-red-500 hover:bg-red-600' },
  { score: 2, label: 'Kaum',      emoji: '😟', color: 'bg-orange-500 hover:bg-orange-600' },
  { score: 3, label: 'Fast',      emoji: '🤔', color: 'bg-yellow-500 hover:bg-yellow-600' },
  { score: 4, label: 'Gut',       emoji: '😊', color: 'bg-green-500 hover:bg-green-600' },
  { score: 5, label: 'Perfekt',   emoji: '🎯', color: 'bg-emerald-600 hover:bg-emerald-700' },
];

function JapaneseDisplay({ vocab, settings }: { vocab: Vocabulary; settings: Settings }) {
  if (settings.displayMode === 'romaji') {
    return <div className="text-3xl font-bold text-gray-800 font-japanese">{vocab.romaji}</div>;
  }
  if (settings.displayMode === 'hiragana') {
    return <div className="text-4xl font-bold text-gray-800 font-japanese">{vocab.hiragana}</div>;
  }
  return (
    <div className="space-y-0.5 text-center">
      <div className="text-4xl font-bold text-gray-800 font-japanese">{vocab.japanese}</div>
      <div className="text-base text-pink-400 font-japanese">{vocab.hiragana}</div>
      <div className="text-xs text-gray-400 tracking-wide">{vocab.romaji}</div>
    </div>
  );
}

export default function QuizCard({ vocab, state, settings, onReveal, onRate }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (state === 'question' && e.code === 'Space') { e.preventDefault(); onReveal(); }
      if (state === 'answer') {
        const map: Record<string, number> = { Digit1: 1, Digit2: 2, Digit3: 3, Digit4: 4, Digit5: 5 };
        if (map[e.code]) onRate(map[e.code]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state, onReveal, onRate]);

  const isDE = settings.quizMode === 'de-to-jp';

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Category + score badge */}
      <div className="flex justify-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
          {vocab.category}
        </span>
        {(vocab.score ?? 0) > 0 && (
          <span className="px-2.5 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">
            {'⭐'.repeat(Math.min(vocab.score ?? 0, 5))}
          </span>
        )}
      </div>

      {/* Card — two fixed-height sections, no layout shift */}
      <div
        className="relative bg-white rounded-2xl shadow-lg border-2 border-pink-100
                   hover:border-pink-300 transition-colors select-none overflow-hidden"
        onClick={state === 'question' ? onReveal : undefined}
        style={{ cursor: state === 'question' ? 'pointer' : 'default' }}
      >
        <div className="absolute top-2 left-3 text-base opacity-20 pointer-events-none">🌸</div>
        <div className="absolute top-2 right-3 text-base opacity-20 pointer-events-none">🌸</div>

        {/* ── Section 1: word to guess (fixed height) */}
        <div className="px-6 pt-5 pb-3">
          {isDE && (
            <div className="text-xs text-gray-400 uppercase tracking-widest text-center mb-1.5">
              Wie heißt das auf Japanisch?
            </div>
          )}
          <div className="h-[68px] flex items-center justify-center">
            {isDE
              ? <div className="text-3xl font-semibold text-gray-800 text-center">{vocab.german}</div>
              : <JapaneseDisplay vocab={vocab} settings={settings} />}
          </div>
        </div>

        {/* ── Divider */}
        <div className="border-t border-pink-100 mx-5" />

        {/* ── Section 2: answer / hint — always same height */}
        <div className="px-6 py-3 h-[76px] flex flex-col items-center justify-center">
          {state === 'question' ? (
            <p className="text-gray-400 text-xs text-center animate-pulse">
              Klicken oder{' '}
              <kbd className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">Leertaste</kbd>{' '}
              zum Aufdecken
            </p>
          ) : (
            <div className="text-center animate-fade-up">
              {isDE
                ? <JapaneseDisplay vocab={vocab} settings={settings} />
                : <div className="text-2xl font-semibold text-gray-800">{vocab.german}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Score buttons — always rendered (opacity-0 in question state) to prevent layout shift */}
      <div className={`mt-3 transition-opacity duration-200 ${
        state === 'answer' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <p className="text-center text-xs text-gray-400 mb-2">Wie gut konntest du das Wort?</p>
        <div className="grid grid-cols-5 gap-1.5">
          {SCORE_BUTTONS.map(({ score, label, emoji, color }) => (
            <button
              key={score}
              onClick={() => onRate(score)}
              className={`${color} text-white rounded-xl py-2 px-1 text-center
                         transition-all transform hover:scale-105 active:scale-95 shadow`}
            >
              <div className="text-lg">{emoji}</div>
              <div className="text-xs mt-0.5 font-medium leading-tight">{label}</div>
              <div className="text-xs opacity-60">[{score}]</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
