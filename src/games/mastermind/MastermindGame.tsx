import React from 'react'

interface MastermindGameProps {
  // Add your game props here
}

const MastermindGame: React.FC<MastermindGameProps> = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          🧠 Mastermind Game
        </h2>
        <p className="text-gray-600 mb-6">
          Tu componente del juego Mastermind irá aquí.
        </p>
        <div className="bg-purple-50 rounded-lg p-6 border-2 border-dashed border-purple-200">
          <p className="text-purple-600 font-medium">
            Área reservada para el juego Mastermind
          </p>
          <p className="text-sm text-purple-500 mt-2">
            Reemplaza este componente con tu implementación del juego
          </p>
        </div>
      </div>
    </div>
  )
}

export default MastermindGame
