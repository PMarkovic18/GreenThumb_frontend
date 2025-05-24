import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import PlantsPage from './pages/PlantsPage'
import PlantPage from './pages/PlantPage'
import PlantEditPage from './pages/PlantEditPage'
import PlantNewPage from './pages/PlantNewPage'
import PlantNewGrowthLogPage from './pages/PlantNewGrowthLogPage'
import PlantEditGrowthLogPage from './pages/PlantEditGrowthLogPage'
import NavBar from './components/NavBar'
import GrowthLogsPage from './pages/GrowthLogsPage'

function Home() {
  const navigate = useNavigate()
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-400 flex flex-col items-center justify-center">
      <div className="bg-white/80 rounded-xl shadow-lg p-10 flex flex-col items-center max-w-xl">
        <h1 className="text-5xl font-extrabold mb-6 text-green-700 drop-shadow">GreenThumb</h1>
        <p className="max-w-lg text-center mb-8 text-gray-700 text-lg">
          Welcome to GreenThumb, your personal plant management assistant! <br /><br />
          Organize your plant collection and keep growth logs for each plant.
        </p>
        <button
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold shadow"
          onClick={() => navigate('/plants')}
        >
          Open Plant Manager
        </button>
      </div>
    </div>
  )
}

// Layout with NavBar
function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<PlantsPage />} />
          <Route path="/growthlogs" element={<GrowthLogsPage />} />
          <Route path="/plants/new" element={<PlantNewPage />} />
          <Route path="/plants/:plantId" element={<PlantPage />} />
          <Route path="/plants/:plantId/edit" element={<PlantEditPage />} />
          <Route path="/plants/:plantId/growthlogs/new" element={<PlantNewGrowthLogPage />} />
          <Route path="/plants/:plantId/growthlogs/:logId/edit" element={<PlantEditGrowthLogPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
