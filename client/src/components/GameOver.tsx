interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-md w-full mx-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Game Over</h2>
        <p className="text-2xl font-semibold text-gray-900 mb-4">
          Final Score: {score}
        </p>
        <p className="text-gray-600 mb-8">
          No valid combination available for this cell.
        </p>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}

