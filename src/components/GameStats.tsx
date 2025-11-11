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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Game Statistics</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{stats.totalRolls}</div>
          <div className="text-sm text-gray-600">Total Rolls</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.doublesRolled}</div>
          <div className="text-sm text-gray-600">Doubles</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{stats.averageRoll}</div>
          <div className="text-sm text-gray-600">Avg Roll</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{stats.highestRoll}</div>
          <div className="text-sm text-gray-600">Highest</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-600">{stats.lowestRoll}</div>
          <div className="text-sm text-gray-600">Lowest</div>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <div className="text-2xl font-bold text-indigo-600">{players.length}</div>
          <div className="text-sm text-gray-600">Players</div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Player Stats</h4>
        <div className="space-y-2">
          {playerStats.map(({ player, rolls, totalMoved, doubles }) => (
            <div
              key={player.id}
              className="p-3 bg-gray-50 rounded-lg border-l-4"
              style={{ borderLeftColor: player.color }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: player.color }}
                  />
                  <span className="font-semibold text-gray-800">{player.name}</span>
                </div>
                <span className="text-sm text-gray-600">Space {player.position}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Rolls: </span>
                  <span className="font-semibold">{rolls}</span>
                </div>
                <div>
                  <span className="text-gray-600">Moved: </span>
                  <span className="font-semibold">{totalMoved}</span>
                </div>
                <div>
                  <span className="text-gray-600">Doubles: </span>
                  <span className="font-semibold">{doubles}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
