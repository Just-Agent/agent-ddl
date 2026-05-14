import { Routes, Route } from 'react-router'
import Competitions from './pages/Competitions'
import CompetitionDetail from './pages/CompetitionDetail'
import About from './pages/About'
import NetworkBar from './components/NetworkBar'

export default function App() {
  return (
    <>
      <NetworkBar />
      <Routes>
        <Route path="/" element={<Competitions />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/competition/:id" element={<CompetitionDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/leaderboards" element={<Competitions />} />
      </Routes>
      <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#080A1A] px-6 py-5 text-center text-xs text-[#64748B]">
        <span>Repository: </span>
        <a
          href="https://github.com/Just-Agent/agent-ddl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00E5FF] transition-colors hover:text-[#33EAFF] hover:underline"
        >
          github.com/Just-Agent/agent-ddl
        </a>
      </footer>
    </>
  )
}
