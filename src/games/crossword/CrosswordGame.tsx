import React from 'react'

interface CrosswordGameProps {
  // Add your game props here
}

const CrosswordGame: React.FC<CrosswordGameProps> = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          📝 Crossword Game
        </h2>
        <p className="text-gray-600 mb-6">
          Tu componente del juego Crucigrama irá aquí.
        </p>
        <div className="bg-green-50 rounded-lg p-6 border-2 border-dashed border-green-200">
          <p className="text-green-600 font-medium">
            Área reservada para el juego Crucigrama
          </p>
          <p className="text-sm text-green-500 mt-2">
            Reemplaza este componente con tu implementación del juego
          </p>
        </div>
      </div>
    </div>
  )
}

export default CrosswordGame
