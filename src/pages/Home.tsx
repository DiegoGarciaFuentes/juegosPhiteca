import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Button from '../components/Button'
import Card from '../components/Card'
import Logo from '../components/Logo'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-phiteca-primary">
      {/* Navigation */}
      <Navigation variant="light" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-phiteca-secondary mb-6">
            Bienvenido a <span className="text-phiteca-accent">PHITECA</span>
          </h1>
          <p className="text-xl text-phiteca-secondary mb-8 max-w-3xl mx-auto">
            Descubre una colección increíble de juegos educativos diseñados para aprender mientras te diviertes. 
            ¡Desarrolla tus habilidades cognitivas con nuestros juegos interactivos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/games" variant="primary">
              🎮 Explorar Juegos
            </Button>
            <Button 
              href="https://phiteca.es" 
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎓 Academia Online
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-phiteca-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-phiteca-primary mb-4">Nuestros Juegos</h2>
            <p className="text-xl text-phiteca-primary">Una selección de juegos educativos diseñados para desarrollar habilidades cognitivas y divertir</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Game Card 1 - Mastermind */}
            <Card variant="gradient" hover>
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">Mastermind</h3>
              <p className="text-purple-100 mb-4">Adivina la combinación de colores usando la lógica y el razonamiento</p>
              <Button to="/games/mastermind" variant="secondary" size="sm">
                Jugar
              </Button>
            </Card>

            {/* Game Card 2 - Crucigrama */}
            <Card variant="gradient" hover className="bg-gradient-to-br from-green-500 to-teal-500">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Crucigrama</h3>
              <p className="text-green-100 mb-4">Completa las palabras según las pistas proporcionadas</p>
              <Button to="/games/crossword" variant="secondary" size="sm">
                Jugar
              </Button>
            </Card>

            {/* Game Card 3 - Ahorcado */}
            <Card variant="gradient" hover className="bg-gradient-to-br from-orange-500 to-red-500">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Ahorcado</h3>
              <p className="text-orange-100 mb-4">Adivina la palabra antes de que se complete el ahorcado</p>
              <Button to="/games/hangman" variant="secondary" size="sm">
                Jugar
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-phiteca-complement">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-phiteca-secondary mb-6">Acerca de PHITECA</h2>
              <p className="text-lg text-phiteca-secondary mb-6">
                PHITECA es una plataforma educativa que combina diversión y aprendizaje. 
                Cada juego está diseñado para desarrollar habilidades cognitivas específicas 
                mientras los estudiantes se divierten y aprenden de manera interactiva.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-phiteca-accent rounded-full mr-3"></div>
                  <span className="text-phiteca-secondary">Juegos educativos interactivos</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-phiteca-accent rounded-full mr-3"></div>
                  <span className="text-phiteca-secondary">Desarrollo de habilidades cognitivas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-phiteca-accent rounded-full mr-3"></div>
                  <span className="text-phiteca-secondary">Aprendizaje divertido y efectivo</span>
                </div>
              </div>
            </div>
            <Card variant="outline" size="lg">
              <h3 className="text-2xl font-semibold text-phiteca-primary mb-4">¿Por qué elegir PHITECA?</h3>
              <div className="space-y-4">
                <div className="bg-phiteca-primary p-4 rounded-lg">
                  <div className="text-phiteca-accent font-semibold mb-2">🎯 Enfoque Educativo</div>
                  <div className="text-sm text-phiteca-secondary">Cada juego está diseñado con objetivos pedagógicos específicos</div>
                </div>
                <div className="bg-phiteca-primary p-4 rounded-lg">
                  <div className="text-phiteca-accent font-semibold mb-2">🧠 Desarrollo Cognitivo</div>
                  <div className="text-sm text-phiteca-secondary">Mejora la memoria, lógica y habilidades de resolución de problemas</div>
                </div>
                <div className="bg-phiteca-primary p-4 rounded-lg">
                  <div className="text-phiteca-accent font-semibold mb-2">🎮 Diversión Garantizada</div>
                  <div className="text-sm text-phiteca-secondary">Aprende jugando con interfaces atractivas y desafíos emocionantes</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-phiteca-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-phiteca-primary mb-6">¿Tienes alguna pregunta?</h2>
          <p className="text-xl text-phiteca-primary mb-8">
            Estamos aquí para ayudarte. ¡No dudes en contactarnos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" variant="primary">
              📧 Contactar
            </Button>
            <Button 
              href="https://phiteca.es" 
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎓 Visitar Academia
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-phiteca-primary text-phiteca-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <Logo variant="white" size="lg" />
            </div>
            <p className="text-phiteca-secondary mb-6">
              Plataforma educativa de PHITECA - Aprende jugando
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://phiteca.es" target="_blank" rel="noopener noreferrer" className="text-phiteca-secondary hover:text-phiteca-accent transition-colors">
                🎓 Academia Online
              </a>
              <Link to="/about" className="text-phiteca-secondary hover:text-phiteca-accent transition-colors">
                ℹ️ Acerca de
              </Link>
              <Link to="/contact" className="text-phiteca-secondary hover:text-phiteca-accent transition-colors">
                📧 Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
