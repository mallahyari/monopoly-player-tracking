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
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Roll History</h3>
        <div className="text-center text-gray-400 py-8">
          No rolls yet. Start rolling the dice!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Roll History ({rollHistory.length})
      </h3>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {rollHistory.map((roll) => (
          <div
            key={roll.id}
            className="p-3 bg-gray-50 rounded-lg border-l-4 hover:bg-gray-100 transition-colors"
            style={{ borderLeftColor: getPlayerColor(roll.playerId) }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getPlayerColor(roll.playerId) }}
                />
                <span className="font-semibold text-gray-800">
                  {roll.playerName}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {formatTime(roll.timestamp)}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded flex items-center justify-center font-bold text-gray-800">
                  {roll.dice1}
                </div>
                <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded flex items-center justify-center font-bold text-gray-800">
                  {roll.dice2}
                </div>
              </div>

              <span className="text-gray-600 font-semibold">
                = {roll.total}
              </span>

              {roll.isDoubles && (
                <span className="ml-2 px-2 py-1 bg-yellow-400 text-yellow-900 rounded text-xs font-bold">
                  DOUBLES!
                </span>
              )}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Position: Space {roll.position}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
