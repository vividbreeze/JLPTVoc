import type { Category } from '../types';

interface Props {
  categories: Category[];
  selected: string | null;
  onChange: (cat: string | null) => void;
}

const CATEGORY_EMOJI: Record<string, string> = {
  'Wegbeschreibung': '🗺️',
  'Restaurant':      '🍜',
  'Einkaufen':       '🛍️',
  'Kennenlernen':    '👋',
  'Museum':          '🏛️',
  'Hotel':           '🏨',
  'Flughafen':       '✈️',
  'Bahnhof':         '🚉',
  'Kleidung':        '👗',
  'Arzt':            '🏥',
  'Smalltalk':       '💬',
  'Zahlen':          '🔢',
  'Uhrzeit':         '🕐',
  'Datum':           '📅',
  'Wochentage':      '📆',
  'Zeitdauer':       '⏱️',
  'Familie':         '👨‍👩‍👧',
  'Gefühle':         '😊',
  'Wetter':          '🌤️',
  'Schule':          '🏫',
  'Zuhause':         '🏠',
  'Natur':           '🌿',
  'Sonstiges':       '📦',
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
              ? 'bg-indigo-600 text-white shadow scale-105'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'}`}
        >
          🌸 Alle ({total})
        </button>
        {categories.map(cat => (
          <button
            key={cat.category}
            onClick={() => onChange(cat.category)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all
              ${selected === cat.category
                ? 'bg-indigo-600 text-white shadow scale-105'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'}`}
          >
            {CATEGORY_EMOJI[cat.category] ?? '📖'} {cat.category} ({cat.count})
          </button>
        ))}
      </div>
    </div>
  );
}
