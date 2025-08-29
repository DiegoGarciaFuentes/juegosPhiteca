import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Games from './pages/Games'
import Mastermind from './pages/Mastermind'
import Crossword from './pages/Crossword'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/mastermind" element={<Mastermind />} />
        <Route path="/games/crossword" element={<Crossword />} />
      </Routes>
    </Router>
  )
}

export default App
