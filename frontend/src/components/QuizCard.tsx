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
  { score: 1, label: 'Keine Ahnung',  emoji: '😵', color: 'bg-red-500 hover:bg-red-600' },
  { score: 2, label: 'Kaum',          emoji: '😟', color: 'bg-orange-500 hover:bg-orange-600' },
  { score: 3, label: 'Fast',          emoji: '🤔', color: 'bg-yellow-500 hover:bg-yellow-600' },
  { score: 4, label: 'Gut',           emoji: '😊', color: 'bg-green-500 hover:bg-green-600' },
  { score: 5, label: 'Perfekt!',      emoji: '🎯', color: 'bg-emerald-600 hover:bg-emerald-700' },
];

function JapaneseDisplay({ vocab, settings }: { vocab: Vocabulary; settings: Settings }) {
  if (settings.displayMode === 'romaji') {
    return <div className="text-4xl font-bold text-gray-800 font-japanese">{vocab.romaji}</div>;
  }
  if (settings.displayMode === 'hiragana') {
    return <div className="text-5xl font-bold text-gray-800 font-japanese">{vocab.hiragana}</div>;
  }
  // both
  return (
    <div className="space-y-1">
      <div className="text-5xl font-bold text-gray-800 font-japanese">{vocab.japanese}</div>
      <div className="text-xl text-pink-400 font-japanese">{vocab.hiragana}</div>
      <div className="text-sm text-gray-500 tracking-wide">{vocab.romaji}</div>
    </div>
  );
}

export default function QuizCard({ vocab, state, settings, onReveal, onRate }: Props) {
  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (state === 'question' && e.code === 'Space') {
        e.preventDefault();
        onReveal();
      }
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
      {/* Category badge */}
      <div className="flex justify-center mb-4">
        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium font-japanese">
          {vocab.category}
        </span>
        {(vocab.score ?? 0) > 0 && (
          <span className="ml-2 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
            {'⭐'.repeat(vocab.score ?? 0)}
          </span>
        )}
      </div>

      {/* Question card */}
      <div
        className="relative bg-white rounded-3xl shadow-xl p-10 text-center cursor-pointer
                   border-2 border-pink-100 hover:border-pink-300 transition-all
                   animate-fade-up select-none"
        onClick={state === 'question' ? onReveal : undefined}
      >
        {/* Decorative cherry blossoms */}
        <div className="absolute top-3 left-4 text-2xl opacity-20 pointer-events-none">🌸</div>
        <div className="absolute top-3 right-4 text-2xl opacity-20 pointer-events-none">🌸</div>

        {isDE && (
          <div className="mb-2 text-xs text-gray-400 uppercase tracking-widest">
            Wie heißt das auf Japanisch?
          </div>
        )}

        {/* Prompt */}
        <div className="min-h-[80px] flex items-center justify-center">
          {isDE ? (
            <div className="text-4xl font-semibold text-gray-800">{vocab.german}</div>
          ) : (
            <JapaneseDisplay vocab={vocab} settings={settings} />
          )}
        </div>

        {/* Answer reveal */}
        {state === 'question' && (
          <div className="mt-8 text-gray-400 text-sm animate-pulse">
            Klicken oder <kbd className="bg-gray-100 px-2 py-0.5 rounded text-xs">Leertaste</kbd> zum Aufdecken
          </div>
        )}

        {state === 'answer' && (
          <div className="mt-6 border-t border-pink-100 pt-6 animate-flip-in">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Antwort</div>
            {isDE ? (
              <JapaneseDisplay vocab={vocab} settings={settings} />
            ) : (
              <div className="text-3xl font-semibold text-gray-800">{vocab.german}</div>
            )}
          </div>
        )}
      </div>

      {/* Score buttons */}
      {state === 'answer' && (
        <div className="mt-6 animate-fade-up">
          <div className="text-center text-sm text-gray-500 mb-3">
            Wie gut konntest du das Wort?
          </div>
          <div className="grid grid-cols-5 gap-2">
            {SCORE_BUTTONS.map(({ score, label, emoji, color }) => (
              <button
                key={score}
                onClick={() => onRate(score)}
                className={`${color} text-white rounded-2xl py-3 px-1 text-center
                           transition-all transform hover:scale-105 active:scale-95 shadow-md`}
                title={`${score} – ${label}`}
              >
                <div className="text-2xl">{emoji}</div>
                <div className="text-xs mt-1 font-medium leading-tight">{label}</div>
                <div className="text-xs opacity-70 mt-0.5">[{score}]</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
