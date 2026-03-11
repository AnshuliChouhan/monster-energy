import CursorTrail from './components/CursorTrail'
import { useState } from 'react'
import useLenis from './hooks/useLenis'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import HorizontalShowcase from './components/HorizontalShowcase'
import ProductSection from './components/ProductSection'
import AthletesSection from './components/AthletesSection'
import FlavorsGrid from './components/FlavorsGrid'
import VideoSection from './components/VideoSection'
import Footer from './components/Footer'
import { useEffect, useRef } from 'react'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()

  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
    }

    const lerp = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      requestAnimationFrame(lerp)
    }

    window.addEventListener('mousemove', onMove)
    lerp()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <CursorTrail />

      {/* Loader — always mounted, slides away on complete */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Main content fades in after load */}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        <Navbar />
        <main>
          <Hero />
          <StatsBar />
          <HorizontalShowcase />
          <ProductSection />
          <AthletesSection />
          <FlavorsGrid />
          <VideoSection />
        </main>
        <Footer />
      </div>
    </>
  )
}