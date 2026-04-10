import type { Category } from '../types';

interface Props {
  categories: Category[];
  selected: string | null;
  onChange: (cat: string | null) => void;
}

const CATEGORY_EMOJI: Record<string, string> = {
  'Begrüßung':   '👋',
  'Zahlen':      '🔢',
  'Zeit':        '⏰',
  'Wochentage':  '📅',
  'Monate':      '🗓️',
  'Essen':       '🍱',
  'Getränke':    '🍵',
  'Familie':     '👨‍👩‍👧',
  'Körper':      '🫀',
  'Orte':        '🗺️',
  'Verkehr':     '🚂',
  'Natur':       '🌸',
  'Tiere':       '🐾',
  'Farben':      '🎨',
  'Wetter':      '🌤️',
  'Wohnung':     '🏠',
  'Adjektive':   '✨',
  'Verben':      '🏃',
  'Grundwörter': '💬',
  'Schule':      '📚',
  'Kleidung':    '👗',
  'Gesundheit':  '🏥',
  'Kanji':       '漢',
};

export default function CategoryFilter({ categories, selected, onChange }: Props) {
  const total = categories.reduce((s, c) => s + c.count, 0);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1.5 justify-center">
        <button
          onClick={() => onChange(null)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all
            ${selected === null
              ? 'bg-pink-500 text-white shadow scale-105'
              : 'bg-white text-gray-600 hover:bg-pink-50 border border-pink-200'}`}
        >
          🌸 Alle ({total})
        </button>
        {categories.map(cat => (
          <button
            key={cat.category}
            onClick={() => onChange(cat.category)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all
              ${selected === cat.category
                ? 'bg-pink-500 text-white shadow scale-105'
                : 'bg-white text-gray-600 hover:bg-pink-50 border border-pink-200'}`}
          >
            {CATEGORY_EMOJI[cat.category] ?? '📖'} {cat.category} ({cat.count})
          </button>
        ))}
      </div>
    </div>
  );
}
