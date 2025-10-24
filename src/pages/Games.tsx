import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

function Games() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#cae4db]">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b-2 border-[#7a9e96]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                  <Logo variant="primary" size="md" />
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-[#00303f] hover:text-[#ffb41e] transition-colors font-medium">
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
            <h1 className="text-4xl font-bold text-[#00303f] mb-4">🎮 Nuestros Juegos</h1>
            <p className="text-xl text-[#00303f]">
              Una selección de juegos educativos desarrollados con las mejores tecnologías
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Game Card 1 - Mastermind */}
            <div className="bg-gradient-to-br from-[#ffb41e] to-[#bd7e00] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">Mastermind</h3>
              <p className="text-white/90 mb-4">Adivina la combinación de colores usando la lógica y el razonamiento</p>
              <Link 
                to="/games/mastermind" 
                className="bg-white text-[#00303f] px-4 py-2 rounded-lg font-semibold hover:bg-[#cae4db] transition-colors inline-block"
              >
                Jugar
              </Link>
            </div>

            {/* Game Card 2 - Crucigrama */}
            <div className="bg-gradient-to-br from-[#7a9e96] to-[#00303f] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Crucigrama</h3>
              <p className="text-white/90 mb-4">Completa las palabras según las pistas proporcionadas</p>
              <Link 
                to="/games/crossword" 
                className="bg-white text-[#00303f] px-4 py-2 rounded-lg font-semibold hover:bg-[#cae4db] transition-colors inline-block"
              >
                Jugar
              </Link>
            </div>

            {/* Game Card 3 - Crucigrama */}
            <div className="bg-gradient-to-br from-[#ff6b6b] to-[#ee5a52] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🧩</div>
              <h3 className="text-xl font-semibold mb-2">Crucigrama</h3>
              <p className="text-white/90 mb-4">Crucigrama con funcionalidades avanzadas</p>
              <Link 
                to="/games/crossword2" 
                className="bg-white text-[#00303f] px-4 py-2 rounded-lg font-semibold hover:bg-[#cae4db] transition-colors inline-block"
              >
                Jugar
              </Link>
            </div>

            {/* Game Card 4 - Ahorcado */}
            <div className="bg-gradient-to-br from-[#cae4db] to-[#7a9e96] rounded-xl p-6 text-[#00303f] shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Ahorcado</h3>
              <p className="text-[#00303f]/80 mb-4">Adivina la palabra antes de que se complete el ahorcado</p>
              <Link 
                to="/games/hangman" 
                className="bg-[#00303f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#ffb41e] hover:text-[#00303f] transition-colors inline-block"
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
