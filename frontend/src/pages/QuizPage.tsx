import { useEffect } from 'react';
import type { Settings } from '../types';
import { useQuiz } from '../hooks/useQuiz';
import QuizCard from '../components/QuizCard';
import StreakBadge from '../components/StreakBadge';

interface Props {
  settings: Settings;
}

export default function QuizPage({ settings }: Props) {
  const { current, state, streak, sessionCount, loadNext, reveal, rate } = useQuiz(settings);

  useEffect(() => {
    loadNext();
  }, [loadNext]);

  // Only show spinner on initial load (no card yet) — not between cards
  if (state === 'loading' && !current) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="text-5xl animate-spin">🌸</div>
        <p className="text-slate-300">Lade nächstes Wort…</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-slate-300 mb-4">Server nicht erreichbar.</p>
        <button
          onClick={loadNext}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors"
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  if (state === 'empty') {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Alles gelernt!</h2>
        <p className="text-slate-300 mb-6">
          Keine Vokabeln zur Wiederholung fällig.{' '}
          {settings.selectedCategory ? 'Probiere eine andere Kategorie oder ' : ''}
          Schau später wieder vorbei!
        </p>
        <button
          onClick={loadNext}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors"
        >
          Nochmal prüfen
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StreakBadge streak={streak} sessionCount={sessionCount} />
      {current && (
        <QuizCard
          vocab={current}
          state={state}
          settings={settings}
          onReveal={reveal}
          onRate={rate}
        />
      )}
    </div>
  );
}
