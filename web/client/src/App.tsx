import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Host from './pages/Host.tsx'
import GameRoom from './pages/GameRoom.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/host" element={<Host />} />
      <Route path="/game" element={<GameRoom />}/>
    </Routes>
  )
}

export default App
