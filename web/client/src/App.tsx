import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Host from './pages/Host.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/host" element={<Host />} />
    </Routes>
  )
}

export default App
