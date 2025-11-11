import type { DiceRoll, Player } from '../types';

interface RollHistoryProps {
  rollHistory: DiceRoll[];
  players: Player[];
}

export const RollHistory = ({ rollHistory, players }: RollHistoryProps) => {
  const getPlayerColor = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    return player?.color || '#888';
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  if (rollHistory.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 animate-fadeIn">
        <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
          <span>📜</span> Roll History
        </h3>
        <div className="text-center text-gray-400 py-12 animate-pulse">
          <div className="text-5xl mb-3">🎲</div>
          <p className="text-lg font-semibold">No rolls yet</p>
          <p className="text-sm mt-2">Start rolling the dice!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 animate-fadeIn">
      <h3 className="text-2xl font-black text-gray-800 mb-5 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span>📜</span> Roll History
        </span>
        <span className="text-base bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-bold">
          {rollHistory.length} Roll{rollHistory.length !== 1 ? 's' : ''}
        </span>
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {rollHistory.map((roll, index) => (
          <div
            key={roll.id}
            className="stagger-item player-card p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-l-4 hover-lift transform hover:scale-102 transition-all"
            style={{
              borderLeftColor: getPlayerColor(roll.playerId),
              animationDelay: `${index * 0.05}s`
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full shadow-md ring-2 ring-white"
                  style={{ backgroundColor: getPlayerColor(roll.playerId) }}
                />
                <span className="font-black text-gray-900">
                  {roll.playerName}
                </span>
              </div>
              <div className="text-xs text-gray-500 font-semibold bg-gray-200 px-3 py-1 rounded-full">
                ⏰ {formatTime(roll.timestamp)}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-white border-3 border-gray-400 rounded-lg flex items-center justify-center font-black text-gray-900 shadow-md transform hover:scale-110 transition-transform">
                  {roll.dice1}
                </div>
                <div className="w-10 h-10 bg-white border-3 border-gray-400 rounded-lg flex items-center justify-center font-black text-gray-900 shadow-md transform hover:scale-110 transition-transform">
                  {roll.dice2}
                </div>
              </div>

              <span className="text-gray-700 font-black text-lg">
                = {roll.total}
              </span>

              {roll.isDoubles && (
                <span className="ml-auto px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 rounded-lg text-xs font-black shadow-md animate-pulse">
                  🎯 DOUBLES!
                </span>
              )}
            </div>

            <div className="text-xs text-gray-600 font-semibold bg-white px-3 py-1 rounded-lg inline-block">
              📍 Space {roll.position}/40
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
