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
    <div className="min-h-screen gradient-monopoly animate-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl w-full animate-scaleIn hover-lift">
        {/* Header */}
        <div className="text-center mb-10 animate-slideDown">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-3 animate-gradient">
            MONOPOLY
          </h1>
          <div className="flex items-center justify-center gap-2 animate-bounce">
            <span className="text-3xl">🎲</span>
            <p className="text-2xl text-gray-700 font-bold">Dice Tracker</p>
            <span className="text-3xl">🎲</span>
          </div>
        </div>

        {/* Add Player Section */}
        <div className="mb-8 animate-slideUp">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">👥</span> Add Players
          </h2>

          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter player name"
              className="flex-1 px-5 py-4 border-3 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 text-lg transition-all hover:border-gray-400"
              maxLength={20}
            />
            <button
              onClick={handleAddPlayer}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl btn-ripple"
            >
              ➕ Add
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg animate-shake">
              <p className="font-semibold">⚠️ {error}</p>
            </div>
          )}
        </div>

        {/* Players List */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span>🎮</span> Players
            </span>
            <span className="text-lg bg-blue-100 text-blue-700 px-4 py-1 rounded-full">
              {players.length} Player{players.length !== 1 ? 's' : ''}
            </span>
          </h3>

          {players.length === 0 ? (
            <div className="text-center py-12 text-gray-400 animate-pulse">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-xl font-semibold">No players added yet</p>
              <p className="text-base mt-2">Add at least 2 players to start the game</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="stagger-item player-card flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 hover:border-gray-400 hover-lift transform transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full font-bold text-lg shadow-md animate-pulse">
                      #{index + 1}
                    </div>
                    <div
                      className="w-12 h-12 rounded-full shadow-lg ring-4 ring-white transform hover:scale-110 transition-transform"
                      style={{ backgroundColor: player.color }}
                    />
                    <div className="font-bold text-gray-900 text-xl">
                      {player.name}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemovePlayer(player.id)}
                    className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                  >
                    🗑️ Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Start Game Button */}
        <button
          onClick={handleStartGame}
          disabled={players.length < 2}
          className={`w-full py-5 rounded-2xl font-black text-2xl transition-all transform shadow-2xl ${
            players.length < 2
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 hover:scale-105 active:scale-95 animate-gradient btn-ripple hover-glow'
          }`}
        >
          {players.length < 2 ? (
            '⚠️ Add at least 2 players'
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-bounce">🚀</span>
              Start Game
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎲</span>
            </span>
          )}
        </button>

        <p className="text-center text-gray-600 text-sm mt-5 animate-fadeIn">
          💡 Turn order will follow the order players are added
        </p>
      </div>
    </div>
  );
};
