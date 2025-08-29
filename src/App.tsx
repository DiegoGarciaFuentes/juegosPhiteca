import { useState } from 'react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600">JuegosPhiteca</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-indigo-600 transition-colors">Inicio</a>
              <a href="#games" className="text-gray-700 hover:text-indigo-600 transition-colors">Juegos</a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors">Acerca de</a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors">Contacto</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Inicio</a>
                <a href="#games" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Juegos</a>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Acerca de</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Contacto</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenido a <span className="text-indigo-600">JuegosPhiteca</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descubre una colección increíble de juegos desarrollados con React, TypeScript y Tailwind CSS. 
            ¡Diviértete explorando nuestros proyectos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Explorar Juegos
            </button>
            <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Ver Código
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="games" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Juegos</h2>
            <p className="text-xl text-gray-600">Una selección de juegos desarrollados con las mejores tecnologías</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Game Card 1 */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold mb-2">Juego de Memoria</h3>
              <p className="text-purple-100 mb-4">Pon a prueba tu memoria con este divertido juego de cartas</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Jugar
              </button>
            </div>

            {/* Game Card 2 */}
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🧩</div>
              <h3 className="text-xl font-semibold mb-2">Puzzle Slider</h3>
              <p className="text-green-100 mb-4">Resuelve el puzzle deslizando las piezas hasta completar la imagen</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Jugar
              </button>
            </div>

            {/* Game Card 3 */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Snake Game</h3>
              <p className="text-orange-100 mb-4">El clásico juego de la serpiente con un diseño moderno</p>
              <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                Jugar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Acerca del Proyecto</h2>
              <p className="text-lg text-gray-600 mb-6">
                JuegosPhiteca es una colección de juegos desarrollados con las tecnologías más modernas del desarrollo web.
                Cada juego está construido con React, TypeScript y Tailwind CSS para ofrecer la mejor experiencia de usuario.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">React 19 con TypeScript</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Tailwind CSS 3.4</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Vite como bundler</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tecnologías Utilizadas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-semibold">React</div>
                  <div className="text-sm text-gray-600">UI Library</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-semibold">TypeScript</div>
                  <div className="text-sm text-gray-600">Type Safety</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-semibold">Tailwind</div>
                  <div className="text-sm text-gray-600">CSS Framework</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-semibold">Vite</div>
                  <div className="text-sm text-gray-600">Build Tool</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Tienes alguna pregunta?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Estamos aquí para ayudarte. ¡No dudes en contactarnos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Contactar
            </button>
            <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Ver GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">JuegosPhiteca</h3>
            <p className="text-gray-400 mb-6">
              Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
