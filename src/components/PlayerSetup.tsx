import { useState } from 'react';
import type { Player } from '../types';

interface PlayerSetupProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  onStartGame: () => void;
}

export const PlayerSetup = ({
  players,
  onAddPlayer,
  onRemovePlayer,
  onStartGame,
}: PlayerSetupProps) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) {
      setError('Please enter a player name');
      return;
    }

    if (players.some(p => p.name.toLowerCase() === newPlayerName.toLowerCase())) {
      setError('Player name already exists');
      return;
    }

    onAddPlayer(newPlayerName.trim());
    setNewPlayerName('');
    setError('');
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      setError('At least 2 players are required');
      return;
    }
    onStartGame();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-green-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">MONOPOLY</h1>
          <p className="text-xl text-gray-600">Dice Tracker</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Players</h2>

          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter player name"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              maxLength={20}
            />
            <button
              onClick={handleAddPlayer}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Add Player
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-1">{error}</p>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Players ({players.length})
          </h3>

          {players.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No players added yet</p>
              <p className="text-sm">Add at least 2 players to start</p>
            </div>
          ) : (
            <div className="space-y-2">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-semibold text-gray-500">
                      #{index + 1}
                    </div>
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: player.color }}
                    />
                    <div className="font-semibold text-gray-800 text-lg">
                      {player.name}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemovePlayer(player.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleStartGame}
          disabled={players.length < 2}
          className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {players.length < 2 ? 'Add at least 2 players' : 'Start Game'}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Turn order will follow the order players are added
        </p>
      </div>
    </div>
  );
};
