import { Link } from 'react-router-dom'
import MastermindGame from '../games/mastermind/MastermindGame'

function Mastermind() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-bold text-indigo-600">JuegosPhiteca</Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
                ← Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Game Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🧠 Mastermind</h1>
          <p className="text-xl text-gray-600">
            Adivina la combinación de colores usando la lógica y el razonamiento
          </p>
        </div>

        {/* Game Component */}
        <MastermindGame />
      </div>
    </div>
  )
}

export default Mastermind
