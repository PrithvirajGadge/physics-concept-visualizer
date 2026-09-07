import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import ProjectileGame from './pages/ProjectileGame.jsx'
import PulleyGame from './pages/PulleyGame.jsx'
import WaveGame from './pages/WaveGame.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/projectile" element={<ProjectileGame />} />
      <Route path="/pulley" element={<PulleyGame />} />
      <Route path="/wave" element={<WaveGame />} />
    </Routes>
  )
}
