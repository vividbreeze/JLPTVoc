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
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem('jlptvoc-settings', JSON.stringify(settings));
  }, [settings]);

  const handleCategoryChange = (cat: string | null) =>
    setSettings(s => ({ ...s, selectedCategory: cat }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 font-japanese">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-rose-100 rounded-full opacity-30 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-pink-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <div>
              <h1 className="text-lg font-bold text-gray-800 leading-none">JLPT N5</h1>
              <p className="text-xs text-pink-400 leading-none">Vokabeltrainer</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(s => !s)}
            className={`p-2 rounded-xl transition-colors ${showSettings ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Einstellungen"
          >
            ⚙️
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 relative space-y-5">
        {/* Settings panel (collapsible) */}
        {showSettings && (
          <div className="animate-fade-up">
            <SettingsPanel settings={settings} onChange={setSettings} />
          </div>
        )}

        {/* Category filter */}
        <CategoryFilter
          categories={categories}
          selected={settings.selectedCategory}
          onChange={handleCategoryChange}
        />

        {/* Tab nav */}
        <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-pink-100">
          {([['quiz', '📝 Quiz'], ['stats', '📊 Statistik']] as [Tab, string][]).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all
                ${tab === t ? 'bg-pink-500 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Page content */}
        {tab === 'quiz' && <QuizPage settings={settings} />}
        {tab === 'stats' && <StatsPanel />}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-300 py-6">
        🌸 JLPT N5 Vokabeltrainer · がんばって！
      </footer>
    </div>
  );
}
