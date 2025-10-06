import { Link } from 'react-router-dom'
import CrosswordGame from '../games/crossword/CrosswordGame'
import Logo from '../components/Logo'

function Crossword() {
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

      {/* Game Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#00303f] mb-4">📝 Crucigrama</h1>
          <p className="text-xl text-[#00303f]">
            Completa las palabras según las pistas proporcionadas
          </p>
        </div>

        {/* Game Component */}
        <CrosswordGame />
      </div>
    </div>
  )
}

export default Crossword
