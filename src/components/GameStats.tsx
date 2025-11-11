import type { DiceRoll, Player } from '../types';

interface GameStatsProps {
  rollHistory: DiceRoll[];
  players: Player[];
}

export const GameStats = ({ rollHistory, players }: GameStatsProps) => {
  const stats = {
    totalRolls: rollHistory.length,
    doublesRolled: rollHistory.filter(r => r.isDoubles).length,
    averageRoll: rollHistory.length > 0
      ? (rollHistory.reduce((sum, r) => sum + r.total, 0) / rollHistory.length).toFixed(2)
      : '0',
    highestRoll: rollHistory.length > 0
      ? Math.max(...rollHistory.map(r => r.total))
      : 0,
    lowestRoll: rollHistory.length > 0
      ? Math.min(...rollHistory.map(r => r.total))
      : 0,
  };

  const playerStats = players.map(player => {
    const playerRolls = rollHistory.filter(r => r.playerId === player.id);
    return {
      player,
      rolls: playerRolls.length,
      totalMoved: playerRolls.reduce((sum, r) => sum + r.total, 0),
      doubles: playerRolls.filter(r => r.isDoubles).length,
    };
  });

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 animate-fadeIn">
      <h3 className="text-2xl font-black text-gray-800 mb-5 flex items-center gap-2">
        <span>📊</span> Game Statistics
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <div className="stagger-item bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200 hover-lift transform hover:scale-105 transition-all">
          <div className="text-3xl font-black text-blue-600">{stats.totalRolls}</div>
          <div className="text-xs font-semibold text-gray-600">🎲 Total Rolls</div>
        </div>

        <div className="stagger-item bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border-2 border-yellow-200 hover-lift transform hover:scale-105 transition-all">
          <div className="text-3xl font-black text-yellow-600">{stats.doublesRolled}</div>
          <div className="text-xs font-semibold text-gray-600">🎯 Doubles</div>
        </div>

        <div className="stagger-item bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200 hover-lift transform hover:scale-105 transition-all">
          <div className="text-3xl font-black text-green-600">{stats.averageRoll}</div>
          <div className="text-xs font-semibold text-gray-600">📈 Avg Roll</div>
        </div>

        <div className="stagger-item bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200 hover-lift transform hover:scale-105 transition-all">
          <div className="text-3xl font-black text-purple-600">{stats.highestRoll}</div>
          <div className="text-xs font-semibold text-gray-600">🔥 Highest</div>
        </div>

        <div className="stagger-item bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border-2 border-red-200 hover-lift transform hover:scale-105 transition-all">
          <div className="text-3xl font-black text-red-600">{stats.lowestRoll}</div>
          <div className="text-xs font-semibold text-gray-600">❄️ Lowest</div>
        </div>

        <div className="stagger-item bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border-2 border-indigo-200 hover-lift transform hover:scale-105 transition-all">
          <div className="text-3xl font-black text-indigo-600">{players.length}</div>
          <div className="text-xs font-semibold text-gray-600">👥 Players</div>
        </div>
      </div>

      <div>
        <h4 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span>🏆</span> Player Stats
        </h4>
        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
          {playerStats.map(({ player, rolls, totalMoved, doubles }) => (
            <div
              key={player.id}
              className="stagger-item player-card p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-l-4 hover-lift transform hover:scale-102 transition-all"
              style={{ borderLeftColor: player.color }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full shadow-md ring-2 ring-white"
                    style={{ backgroundColor: player.color }}
                  />
                  <span className="font-black text-gray-900 text-base">{player.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
                  Space {player.position}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center bg-white rounded-lg p-2 shadow-sm">
                  <div className="text-xl font-black text-blue-600">{rolls}</div>
                  <div className="text-xs text-gray-600 font-semibold">Rolls</div>
                </div>
                <div className="text-center bg-white rounded-lg p-2 shadow-sm">
                  <div className="text-xl font-black text-green-600">{totalMoved}</div>
                  <div className="text-xs text-gray-600 font-semibold">Moved</div>
                </div>
                <div className="text-center bg-white rounded-lg p-2 shadow-sm">
                  <div className="text-xl font-black text-yellow-600">{doubles}</div>
                  <div className="text-xs text-gray-600 font-semibold">Doubles</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
