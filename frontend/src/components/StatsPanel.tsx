import { useEffect, useState } from 'react';
import type { Stats } from '../types';
import { fetchStats } from '../api/client';

const SCORE_LABELS: Record<number, { label: string; color: string; emoji: string }> = {
  0: { label: 'Neu',          color: 'bg-slate-500',    emoji: '🆕' },
  1: { label: 'Keine Ahnung', color: 'bg-red-600',      emoji: '😵' },
  2: { label: 'Kaum',         color: 'bg-orange-600',   emoji: '😟' },
  3: { label: 'Fast',         color: 'bg-yellow-600',   emoji: '🤔' },
  4: { label: 'Gut',          color: 'bg-green-600',    emoji: '😊' },
  5: { label: 'Gemeistert',   color: 'bg-emerald-500',  emoji: '🎯' },
};

export default function StatsPanel() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) {
    return <div className="text-center text-slate-400 py-8">Lade Statistiken…</div>;
  }

  const masteredPct = Math.round((stats.masteredCount / stats.total) * 100);

  return (
    <div className="space-y-4">
      {/* Overview */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Gesamt',     value: stats.total,        emoji: '📚' },
          { label: 'Fällig',     value: stats.dueCount,     emoji: '⏰' },
          { label: 'Gemeistert', value: stats.masteredCount, emoji: '🏆' },
        ].map(({ label, value, emoji }) => (
          <div key={label} className="bg-slate-800 border border-slate-600 rounded-2xl p-3 text-center shadow-sm">
            <div className="text-2xl">{emoji}</div>
            <div className="text-2xl font-bold text-slate-100">{value}</div>
            <div className="text-xs text-slate-300">{label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-slate-800 border border-slate-600 rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between text-sm text-slate-300 mb-2">
          <span>Gesamtfortschritt</span>
          <span className="font-semibold text-slate-100">{masteredPct}%</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${masteredPct}%` }}
          />
        </div>
      </div>

      {/* Score distribution */}
      <div className="bg-slate-800 border border-slate-600 rounded-2xl p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-200 mb-3">Verteilung nach Bewertung</h4>
        <div className="space-y-2">
          {[0, 1, 2, 3, 4, 5].map(score => {
            const entry = stats.byScore.find(b => b.score === score);
            const count = entry?.count ?? 0;
            const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
            const info = SCORE_LABELS[score];
            return (
              <div key={score} className="flex items-center gap-2">
                <div className="w-5 text-center text-sm">{info.emoji}</div>
                <div className="w-20 text-xs text-slate-300">{info.label}</div>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${info.color} rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="w-8 text-xs text-right text-slate-300">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="bg-slate-800 border border-slate-600 rounded-2xl p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-200 mb-3">Nach Kategorie</h4>
        <div className="space-y-2">
          {stats.byCategory.map(cat => {
            const pct = cat.total > 0 ? Math.round((cat.mastered / cat.total) * 100) : 0;
            return (
              <div key={cat.category} className="flex items-center gap-2">
                <div className="w-16 text-xs font-japanese text-slate-300 truncate">{cat.category}</div>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 w-14 text-right">
                  {cat.mastered}/{cat.total}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
