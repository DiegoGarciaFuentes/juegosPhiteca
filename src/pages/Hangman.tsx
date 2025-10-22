import HangmanGame from '../games/hangman/HangmanGame'
import Navigation from '../components/Navigation'

function Hangman() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-phiteca-secondary">
      {/* Navigation */}
      <Navigation variant="light" />

      {/* Game Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-phiteca-primary mb-4">🎯 Ahorcado</h1>
          <p className="text-xl text-phiteca-primary">
            Adivina la palabra antes de que se complete el ahorcado
          </p>
        </div>

        {/* Game Component */}
        <HangmanGame />
      </div>
    </div>
  )
}

export default Hangman

