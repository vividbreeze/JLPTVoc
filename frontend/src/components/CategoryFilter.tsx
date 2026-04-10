import type { Category } from '../types';

interface Props {
  categories: Category[];
  selected: string | null;
  onChange: (cat: string | null) => void;
}

const CATEGORY_EMOJI: Record<string, string> = {
  'Begrüßung':  '👋',
  'Zahlen':     '🔢',
  'Zeit':       '⏰',
  'Essen':      '🍱',
  'Getränke':   '🍵',
  'Familie':    '👨‍👩‍👧',
  'Körper':     '🫀',
  'Orte':       '🗺️',
  'Verkehr':    '🚂',
  'Natur':      '🌸',
  'Tiere':      '🐾',
  'Adjektive':  '✨',
  'Verben':     '🏃',
  'Grundwörter':'💬',
  'Schule':     '📚',
  'Kleidung':   '👗',
};

export default function CategoryFilter({ categories, selected, onChange }: Props) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onChange(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
            ${selected === null
              ? 'bg-pink-500 text-white shadow-md scale-105'
              : 'bg-white text-gray-600 hover:bg-pink-50 border border-pink-200'}`}
        >
          🌸 Alle ({categories.reduce((s, c) => s + c.count, 0)})
        </button>
        {categories.map(cat => (
          <button
            key={cat.category}
            onClick={() => onChange(cat.category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all font-japanese
              ${selected === cat.category
                ? 'bg-pink-500 text-white shadow-md scale-105'
                : 'bg-white text-gray-600 hover:bg-pink-50 border border-pink-200'}`}
          >
            {CATEGORY_EMOJI[cat.category] ?? '📖'} {cat.category} ({cat.count})
          </button>
        ))}
      </div>
    </div>
  );
}
