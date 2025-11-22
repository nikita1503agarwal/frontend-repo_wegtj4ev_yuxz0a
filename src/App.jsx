import { useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import CarGrid from './components/CarGrid'
import Footer from './components/Footer'

function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero onBrowse={() => {
        const el = document.getElementById('browse');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />
      <CarGrid />
      <Features />
      <Footer />
    </div>
  )
}

export default App