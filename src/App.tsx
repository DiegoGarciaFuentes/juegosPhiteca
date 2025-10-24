import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Games from './pages/Games'
import About from './pages/About'
import Contact from './pages/Contact'
import Mastermind from './pages/Mastermind'
import Crossword from './pages/Crossword'
import Crossword2 from './pages/Crossword2'
import Hangman from './pages/Hangman'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/games/mastermind" element={<Mastermind />} />
        <Route path="/games/crossword" element={<Crossword />} />
        <Route path="/games/crossword2" element={<Crossword2 />} />
        <Route path="/games/hangman" element={<Hangman />} />
      </Routes>
    </Router>
  )
}

export default App
