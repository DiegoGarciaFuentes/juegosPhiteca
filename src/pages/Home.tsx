import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00303f] to-[#001a23]">
      {/* Navigation */}
      <nav className="bg-[#cae4db] shadow-lg border-b-2 border-[#7a9e96]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                  <Logo variant="primary" size="md" />
                </Link>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-[#00303f] hover:text-[#ffb41e] transition-colors font-medium">Inicio</Link>
              <Link to="/games" className="text-[#00303f] hover:text-[#ffb41e] transition-colors font-medium">Juegos</Link>
              <Link to="/about" className="text-[#00303f] hover:text-[#ffb41e] transition-colors font-medium">Acerca de</Link>
              <Link to="/contact" className="text-[#00303f] hover:text-[#ffb41e] transition-colors font-medium">Contacto</Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#00303f] hover:text-[#ffb41e] focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-[#cae4db] border-t border-[#7a9e96]">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/" className="block px-3 py-2 text-[#00303f] hover:text-[#ffb41e] hover:bg-[#7a9e96] hover:bg-opacity-20 rounded-md transition-colors">Inicio</Link>
                <Link to="/games" className="block px-3 py-2 text-[#00303f] hover:text-[#ffb41e] hover:bg-[#7a9e96] hover:bg-opacity-20 rounded-md transition-colors">Juegos</Link>
                <Link to="/about" className="block px-3 py-2 text-[#00303f] hover:text-[#ffb41e] hover:bg-[#7a9e96] hover:bg-opacity-20 rounded-md transition-colors">Acerca de</Link>
                <Link to="/contact" className="block px-3 py-2 text-[#00303f] hover:text-[#ffb41e] hover:bg-[#7a9e96] hover:bg-opacity-20 rounded-md transition-colors">Contacto</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#cae4db] mb-6">
            Bienvenido a <span className="text-[#ffb41e]">PHITECA</span>
          </h1>
          <p className="text-xl text-[#cae4db] mb-8 max-w-3xl mx-auto">
            Descubre una colección increíble de juegos educativos desarrollados con React, TypeScript y Tailwind CSS. 
            ¡Diviértete aprendiendo con nuestros juegos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/games" 
              className="bg-[#ffb41e] hover:bg-[#bd7e00] text-[#00303f] font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explorar Juegos
            </Link>
            <a 
              href="https://github.com/DiegoGarciaFuentes/juegosPhiteca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-[#7a9e96] text-[#cae4db] hover:bg-[#7a9e96] hover:text-[#00303f] font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver Código
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#cae4db]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#00303f] mb-4">Nuestros Juegos</h2>
            <p className="text-xl text-[#00303f]">Una selección de juegos educativos desarrollados con las mejores tecnologías</p>
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

      {/* About Section */}
      <section className="py-20 bg-[#7a9e96]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#cae4db] mb-6">Acerca del Proyecto</h2>
              <p className="text-lg text-[#cae4db] mb-6">
                PHITECA es una plataforma educativa que combina diversión y aprendizaje. 
                Cada juego está diseñado para desarrollar habilidades cognitivas específicas 
                mientras los estudiantes se divierten.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#ffb41e] rounded-full mr-3"></div>
                  <span className="text-[#cae4db]">React 19 con TypeScript</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#ffb41e] rounded-full mr-3"></div>
                  <span className="text-[#cae4db]">Tailwind CSS 3.4</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#ffb41e] rounded-full mr-3"></div>
                  <span className="text-[#cae4db]">Vite como bundler</span>
                </div>
              </div>
            </div>
            <div className="bg-[#cae4db] rounded-xl p-8 shadow-lg border-2 border-[#00303f]">
              <h3 className="text-2xl font-semibold text-[#00303f] mb-4">Tecnologías Utilizadas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#00303f] p-4 rounded-lg">
                  <div className="text-[#ffb41e] font-semibold">React</div>
                  <div className="text-sm text-[#cae4db]">UI Library</div>
                </div>
                <div className="bg-[#00303f] p-4 rounded-lg">
                  <div className="text-[#ffb41e] font-semibold">TypeScript</div>
                  <div className="text-sm text-[#cae4db]">Type Safety</div>
                </div>
                <div className="bg-[#00303f] p-4 rounded-lg">
                  <div className="text-[#ffb41e] font-semibold">Tailwind</div>
                  <div className="text-sm text-[#cae4db]">CSS Framework</div>
                </div>
                <div className="bg-[#00303f] p-4 rounded-lg">
                  <div className="text-[#ffb41e] font-semibold">Vite</div>
                  <div className="text-sm text-[#cae4db]">Build Tool</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#cae4db]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#00303f] mb-6">¿Tienes alguna pregunta?</h2>
          <p className="text-xl text-[#00303f] mb-8">
            Estamos aquí para ayudarte. ¡No dudes en contactarnos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-[#ffb41e] hover:bg-[#bd7e00] text-[#00303f] font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contactar
            </Link>
            <a 
              href="https://github.com/DiegoGarciaFuentes/juegosPhiteca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-[#7a9e96] text-[#00303f] hover:bg-[#7a9e96] hover:text-[#cae4db] font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00303f] text-[#cae4db] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <Logo variant="white" size="lg" />
            </div>
            <p className="text-[#cae4db] mb-6">
              Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/DiegoGarciaFuentes/juegosPhiteca" className="text-[#cae4db] hover:text-[#ffb41e] transition-colors">
                GitHub
              </a>
              <a href="#" className="text-[#cae4db] hover:text-[#ffb41e] transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-[#cae4db] hover:text-[#ffb41e] transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
