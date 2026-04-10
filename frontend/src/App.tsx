import { useState, useEffect } from 'react';
import type { Settings, Category } from './types';
import { fetchCategories } from './api/client';
import CategoryFilter from './components/CategoryFilter';
import SettingsPanel from './components/SettingsPanel';
import StatsPanel from './components/StatsPanel';
import QuizPage from './pages/QuizPage';

type Tab = 'quiz' | 'stats';

const DEFAULT_SETTINGS: Settings = {
  quizMode: 'jp-to-de',
  displayMode: 'both',
  selectedCategory: null,
};

export default function App() {
  const [tab, setTab] = useState<Tab>('quiz');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const saved = localStorage.getItem('jlptvoc-settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch { return DEFAULT_SETTINGS; }
  });

  useEffect(() => { fetchCategories().then(setCategories).catch(console.error); }, []);
  useEffect(() => { localStorage.setItem('jlptvoc-settings', JSON.stringify(settings)); }, [settings]);

  const isQuiz = tab === 'quiz';

  function goToStats() {
    setTab('stats');
    setShowSettings(false);
  }

  function goToQuiz() {
    setTab('quiz');
    setShowSettings(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 font-japanese">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur border-b border-slate-800 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <div>
              <h1 className="text-base font-bold text-slate-100 leading-none">JLPT N5</h1>
              <p className="text-xs text-indigo-400 leading-none">Vokabeltrainer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isQuiz && (
              <button
                onClick={goToQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-200
                           bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors"
              >
                ← Quiz
              </button>
            )}
            {isQuiz && (
              <button
                onClick={() => setShowSettings(s => !s)}
                className={`p-1.5 rounded-lg text-lg transition-colors ${
                  showSettings
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                title="Einstellungen"
              >⚙️</button>
            )}
          </div>
        </div>
      </header>

      {/* Settings overlay — floats over the quiz card, closes on backdrop click */}
      {isQuiz && showSettings && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          />
          {/* Overlay panel — anchored below the header */}
          <div className="fixed top-[52px] left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4">
            <SettingsPanel
              settings={settings}
              onChange={setSettings}
              categories={categories}
              onGoToStats={goToStats}
              onClose={() => setShowSettings(false)}
            />
          </div>
        </>
      )}

      <main className="max-w-xl mx-auto px-4 py-3 space-y-3">
        {/* Stats view */}
        {!isQuiz && (
          <>
            <CategoryFilter
              categories={categories}
              selected={settings.selectedCategory}
              onChange={cat => setSettings(s => ({ ...s, selectedCategory: cat }))}
            />
            <StatsPanel />
          </>
        )}

        {/* Quiz */}
        {isQuiz && <QuizPage settings={settings} />}
      </main>

      <footer className="text-center text-xs text-slate-700 py-4">
        🌸 JLPT N5 Vokabeltrainer · がんばって！
      </footer>
    </div>
  );
}
