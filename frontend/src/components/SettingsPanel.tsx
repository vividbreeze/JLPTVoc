import type { Settings, QuizMode, DisplayMode, Category } from '../types';

import CategoryFilter from './CategoryFilter';

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
  categories?: Category[];
  onClose?: () => void;
}

export default function SettingsPanel({ settings, onChange, categories = [], onClose }: Props) {
  const set = <K extends keyof Settings>(key: K, val: Settings[K]) =>
    onChange({ ...settings, [key]: val });

  return (
    <div className="bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-200 text-sm uppercase tracking-wider">Einstellungen</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-xl leading-none transition-colors"
            title="Schließen"
          >✕</button>
        )}
      </div>

      {/* Quiz direction */}
      <div>
        <label className="text-xs text-slate-300 mb-1 block">Abfragerichtung</label>
        <div className="flex gap-2">
          {([
            ['de-to-jp', '🇩🇪 → 🇯🇵', 'Deutsch → Japanisch'],
            ['jp-to-de', '🇯🇵 → 🇩🇪', 'Japanisch → Deutsch'],
          ] as [QuizMode, string, string][]).map(([val, icon, label]) => (
            <button
              key={val}
              onClick={() => set('quizMode', val)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all
                ${settings.quizMode === val
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
              title={label}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Japanese display */}
      <div>
        <label className="text-xs text-slate-300 mb-1 block">Japanisch anzeigen als</label>
        <div className="flex gap-2">
          {([
            ['hiragana', 'Kana',   'ひらがな / カタカナ'],
            ['romaji',   'Romaji', 'Lateinschrift'],
            ['both',     'Beides', 'Kanji + Kana + Romaji'],
          ] as [DisplayMode, string, string][]).map(([val, label, title]) => (
            <button
              key={val}
              onClick={() => set('displayMode', val)}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-medium transition-all
                ${settings.displayMode === val
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
              title={title}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div>
          <label className="text-xs text-slate-300 mb-2 block">Kategorie</label>
          <CategoryFilter
            categories={categories}
            selected={settings.selectedCategory}
            onChange={cat => set('selectedCategory', cat)}
          />
        </div>
      )}

    </div>
  );
}
