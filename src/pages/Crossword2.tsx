import Crossword2Game from '../games/crossword2/Crossword2Game'
import Navigation from '../components/Navigation'

function Crossword2() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-phiteca-secondary">
      {/* Navigation */}
      <Navigation variant="light" />

      {/* Game Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Game Component */}
        <Crossword2Game />
      </div>
    </div>
  )
}

export default Crossword2

