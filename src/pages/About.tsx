import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

function About() {
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#00303f] mb-4">📚 Acerca de PHITECA</h1>
          <p className="text-xl text-[#00303f]">
            Una plataforma de juegos educativos desarrollada con las mejores tecnologías
          </p>
        </div>

        <div className="bg-white/95 rounded-xl p-8 shadow-lg border-2 border-[#7a9e96]">
          <h2 className="text-2xl font-bold text-[#00303f] mb-6">¿Qué es PHITECA?</h2>
          <p className="text-[#00303f] mb-6 leading-relaxed">
            PHITECA es una colección de juegos educativos desarrollados con React, TypeScript y Tailwind CSS. 
            Nuestro objetivo es proporcionar una experiencia de aprendizaje divertida e interactiva a través 
            de juegos que estimulan el pensamiento lógico, la creatividad y el aprendizaje.
          </p>
          
          <h3 className="text-xl font-semibold text-[#00303f] mb-4">Tecnologías utilizadas:</h3>
          <ul className="list-disc list-inside text-[#00303f] mb-6 space-y-2">
            <li><strong>React 19</strong> - Biblioteca de JavaScript para interfaces de usuario</li>
            <li><strong>TypeScript</strong> - Superset tipado de JavaScript</li>
            <li><strong>Tailwind CSS 3.4</strong> - Framework de CSS utility-first</li>
            <li><strong>Vite</strong> - Herramienta de construcción rápida</li>
            <li><strong>React Router DOM</strong> - Enrutamiento para aplicaciones React</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#00303f] mb-4">Juegos disponibles:</h3>
          <ul className="list-disc list-inside text-[#00303f] mb-6 space-y-2">
            <li><strong>🧠 Mastermind</strong> - Juego de lógica y deducción</li>
            <li><strong>📝 Crucigrama</strong> - Juego de palabras y conocimiento</li>
            <li><strong>🎯 Ahorcado</strong> - Juego de adivinanza de palabras</li>
          </ul>

          <div className="text-center">
            <Link 
              to="/games" 
              className="bg-[#ffb41e] hover:bg-[#bd7e00] text-[#00303f] font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
            >
              Explorar Juegos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
