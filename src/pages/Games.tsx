import { Link } from 'react-router-dom'

function Games() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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

      {/* Games Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🎮 Nuestros Juegos</h1>
            <p className="text-xl text-gray-600">
              Una selección de juegos educativos desarrollados con las mejores tecnologías
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Game Card 1 - Mastermind */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">Mastermind</h3>
              <p className="text-purple-100 mb-4">Adivina la combinación de colores usando la lógica y el razonamiento</p>
              <Link 
                to="/games/mastermind" 
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-block"
              >
                Jugar
              </Link>
            </div>

            {/* Game Card 2 - Crucigrama */}
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Crucigrama</h3>
              <p className="text-green-100 mb-4">Completa las palabras según las pistas proporcionadas</p>
              <Link 
                to="/games/crossword" 
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
              >
                Jugar
              </Link>
            </div>

            {/* Game Card 3 - Ahorcado */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Ahorcado</h3>
              <p className="text-orange-100 mb-4">Adivina la palabra antes de que se complete el ahorcado</p>
              <Link 
                to="/games/hangman" 
                className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-block"
              >
                Jugar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Games
