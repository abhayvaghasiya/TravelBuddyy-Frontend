import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DestinationListPage from './pages/DestinationListPage'
import DestinationDetailPage from './pages/DestinationDetailPage'
import TripPlannerPage from './pages/TripPlannerPage'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationListPage />} />
          <Route path="/destinations/:id" element={<DestinationDetailPage />} />
          <Route path="/plan" element={<TripPlannerPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App 