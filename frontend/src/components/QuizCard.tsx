import { useEffect, useState } from 'react';
import type { Vocabulary, Settings } from '../types';
import type { QuizState } from '../hooks/useQuiz';
import { fetchSentence } from '../api/client';

interface Props {
  vocab: Vocabulary;
  state: QuizState;
  settings: Settings;
  onReveal: () => void;
  onRate: (score: number) => void;
}

const SCORE_BUTTONS = [
  { score: 1, label: 'Gar nicht', emoji: '😵', color: 'bg-red-700 hover:bg-red-600' },
  { score: 2, label: 'Kaum',      emoji: '😟', color: 'bg-orange-700 hover:bg-orange-600' },
  { score: 3, label: 'Fast',      emoji: '🤔', color: 'bg-yellow-600 hover:bg-yellow-500' },
  { score: 4, label: 'Gut',       emoji: '😊', color: 'bg-green-700 hover:bg-green-600' },
  { score: 5, label: 'Perfekt',   emoji: '🎯', color: 'bg-emerald-600 hover:bg-emerald-500' },
];

function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'ja-JP';
  window.speechSynthesis.speak(utt);
}

function SpeakButton({ text }: { text: string }) {
  return (
    <button
      onClick={e => { e.stopPropagation(); speak(text); }}
      className="ml-2 text-slate-400 hover:text-sky-300 transition-colors align-middle"
      title="Vorlesen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"/>
      </svg>
    </button>
  );
}

function JapaneseDisplay({ vocab, settings }: { vocab: Vocabulary; settings: Settings }) {
  if (settings.displayMode === 'romaji') {
    return (
      <div className="text-2xl font-bold text-white font-japanese text-center leading-snug">
        {vocab.romaji}
      </div>
    );
  }
  if (settings.displayMode === 'hiragana') {
    return (
      <div className="text-3xl font-bold text-white font-japanese text-center leading-snug">
        {vocab.hiragana}<SpeakButton text={vocab.japanese} />
      </div>
    );
  }
  return (
    <div className="space-y-1.5 text-center">
      <div className="text-3xl font-bold text-white font-japanese leading-snug">
        {vocab.japanese}<SpeakButton text={vocab.japanese} />
      </div>
      <div className="text-lg text-sky-200 font-japanese leading-snug">{vocab.hiragana}</div>
      <div className="text-sm text-slate-300 tracking-wide">{vocab.romaji}</div>
    </div>
  );
}

export default function QuizCard({ vocab, state, settings, onReveal, onRate }: Props) {
  const [sentence, setSentence] = useState<{ jp: string; de: string; romaji: string } | null>(null);
  const [sentenceLoading, setSentenceLoading] = useState(false);

  // Fetch sentence as soon as vocab is loaded
  useEffect(() => {
    // Use cached values from vocab if fully available (including romaji)
    if (vocab.example_jp && vocab.example_de && vocab.example_romaji) {
      setSentence({ jp: vocab.example_jp, de: vocab.example_de, romaji: vocab.example_romaji });
      return;
    }
    setSentenceLoading(true);
    setSentence(null);
    fetchSentence(vocab.id)
      .then(s => setSentence(s))
      .catch(() => setSentence(null))
      .finally(() => setSentenceLoading(false));
  }, [vocab.id, vocab.example_jp, vocab.example_de, vocab.example_romaji]);

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
      <div className="flex justify-center gap-2 mb-3">
        <span className="px-3 py-1 bg-slate-700 text-sky-200 rounded-full text-xs font-medium border border-slate-500">
          {vocab.category}
        </span>
        {(vocab.score ?? 0) > 0 && (
          <span className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-xs border border-slate-500">
            {'⭐'.repeat(Math.min(vocab.score ?? 0, 5))}
          </span>
        )}
      </div>

      {/* Card */}
      <div
        className="relative bg-slate-800 rounded-2xl shadow-xl border border-slate-500
                   hover:border-indigo-400 transition-colors select-none overflow-hidden"
        onClick={state === 'question' ? onReveal : undefined}
        style={{ cursor: state === 'question' ? 'pointer' : 'default' }}
      >
        {/* ── Section 1: word to guess — flexible height */}
        <div className="px-8 pt-7 pb-4">
          {isDE && (
            <div className="text-xs text-slate-400 uppercase tracking-widest text-center mb-3">
              Wie heißt das auf Japanisch?
            </div>
          )}
          <div className="flex items-center justify-center min-h-[72px]">
            {isDE
              ? <div className="text-3xl font-semibold text-white text-center leading-snug">{vocab.german}</div>
              : <JapaneseDisplay vocab={vocab} settings={settings} />}
          </div>
        </div>

        {/* ── Divider */}
        <div className="border-t border-slate-600 mx-6" />

        {/* ── Section 2: example sentence (question) / answer + translation (answer) */}
        <div className="px-8 py-5 flex flex-col items-center justify-center min-h-[80px]">
          {state === 'question' ? (
            <div className="w-full text-center">
              {/* Example sentence shown on question card */}
              {sentenceLoading ? (
                <p className="text-xs text-slate-400 animate-pulse">Beispielsatz wird geladen…</p>
              ) : sentence ? (
                isDE ? (
                  /* DE→JP: Frageseite zeigt deutschen Satz */
                  <p className="text-sm text-slate-300 italic">{sentence.de}</p>
                ) : (
                  /* JP→DE: Frageseite zeigt japanischen Satz */
                  <div className="space-y-1">
                    <p className="text-sm font-japanese text-sky-200">
                      {sentence.jp}<SpeakButton text={sentence.jp} />
                    </p>
                    <p className="text-xs text-slate-400">{sentence.romaji}</p>
                  </div>
                )
              ) : null}
            </div>
          ) : (
            <div className="text-center animate-fade-up w-full">
              {isDE
                ? <JapaneseDisplay vocab={vocab} settings={settings} />
                : <div className="text-3xl font-semibold text-white leading-snug">{vocab.german}</div>}

              {/* Example sentence with translation shown after reveal */}
              {sentence && (
                <div className="mt-4 pt-3 border-t border-slate-600 w-full space-y-1">
                  <p className="text-sm font-japanese text-sky-200">
                    {sentence.jp}<SpeakButton text={sentence.jp} />
                  </p>
                  <p className="text-xs text-slate-400">{sentence.romaji}</p>
                  <p className="text-xs text-slate-400 italic">{sentence.de}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Score buttons — always rendered (opacity-0 in question state) */}
      <div className={`mt-4 transition-opacity duration-200 ${
        state === 'answer' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <p className="text-center text-sm text-slate-300 mb-2">Wie gut konntest du das Wort?</p>
        <div className="grid grid-cols-5 gap-2">
          {SCORE_BUTTONS.map(({ score, label, emoji, color }) => (
            <button
              key={score}
              onClick={() => onRate(score)}
              className={`${color} text-white rounded-xl py-2.5 px-1 text-center
                         transition-all transform hover:scale-105 active:scale-95 shadow`}
            >
              <div className="text-xl">{emoji}</div>
              <div className="text-xs mt-0.5 font-medium leading-tight">{label}</div>
              <div className="text-xs opacity-70 mt-0.5">[{score}]</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
