interface Props {
  streak: number;
  sessionCount: number;
}

export default function StreakBadge({ streak, sessionCount }: Props) {
  if (sessionCount === 0) return null;

  return (
    <div className="flex items-center gap-3 justify-center">
      {streak >= 3 && (
        <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium animate-bounce-in">
          🔥 {streak} in Folge!
        </div>
      )}
      <div className="text-sm text-gray-400">
        {sessionCount} Wörter heute
      </div>
    </div>
  );
}
