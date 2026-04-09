import type { Settings, QuizMode, DisplayMode } from '../types';

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
}

export default function SettingsPanel({ settings, onChange }: Props) {
  const set = <K extends keyof Settings>(key: K, val: Settings[K]) =>
    onChange({ ...settings, [key]: val });

  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-4">
      <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Einstellungen</h3>

      {/* Quiz direction */}
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Abfragerichtung</label>
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
                  ? 'bg-pink-500 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50'}`}
              title={label}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Japanese display */}
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Japanisch anzeigen als</label>
        <div className="flex gap-2">
          {([
            ['hiragana', 'Kana', 'ひらがな / カタカナ'],
            ['romaji',   'Romaji', 'Lateinschrift'],
            ['both',     'Beides', 'Kanji + Kana + Romaji'],
          ] as [DisplayMode, string, string][]).map(([val, label, title]) => (
            <button
              key={val}
              onClick={() => set('displayMode', val)}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-medium transition-all
                ${settings.displayMode === val
                  ? 'bg-pink-500 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50'}`}
              title={title}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
