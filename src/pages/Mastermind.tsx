import MastermindGame from '../games/mastermind/MastermindGame'
import Navigation from '../components/Navigation'

function Mastermind() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-phiteca-secondary">
      {/* Navigation */}
      <Navigation variant="light" />

      {/* Game Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-phiteca-primary mb-4">🧠 Mastermind</h1>
          <p className="text-xl text-phiteca-primary">
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
