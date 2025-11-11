import { PlayerSetup } from './components/PlayerSetup';
import { GameScreen } from './components/GameScreen';
import { useGameState } from './hooks/useGameState';
import './App.css';

function App() {
  const {
    gameState,
    addPlayer,
    removePlayer,
    startGame,
    rollDice,
    undoLastRoll,
    togglePause,
    newGame,
  } = useGameState();

  if (!gameState.isGameStarted) {
    return (
      <PlayerSetup
        players={gameState.players}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
        onStartGame={startGame}
      />
    );
  }

  return (
    <GameScreen
      players={gameState.players}
      currentPlayerIndex={gameState.currentPlayerIndex}
      rollHistory={gameState.rollHistory}
      isPaused={gameState.isPaused}
      doublesCount={gameState.doublesCount}
      onRollDice={rollDice}
      onUndoRoll={undoLastRoll}
      onTogglePause={togglePause}
      onNewGame={newGame}
      onAddPlayer={addPlayer}
      onRemovePlayer={removePlayer}
    />
  );
}

export default App;
