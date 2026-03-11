import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function VideoSection() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { clipPath: 'inset(40% 10% 40% 10%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5, ease: 'power4.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }
      }
    )
  }, [])

  return (
    <section style={{ padding: '6rem', background: '#000' }}>
      <div ref={ref} style={{
        position: 'relative',
        aspectRatio: '16/7',
        background: 'linear-gradient(135deg, #0a1a04, #000)',
        border: '1px solid rgba(57,255,20,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(57,255,20,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Play button */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            border: '2px solid var(--neon)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem',
            boxShadow: '0 0 40px var(--neon-glow)',
            cursor: 'none',
            animation: 'pulse-ring 2s infinite',
          }}>
            <div style={{
              width: 0, height: 0,
              borderTop: '15px solid transparent',
              borderBottom: '15px solid transparent',
              borderLeft: '25px solid var(--neon)',
              marginLeft: '5px',
            }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--white)' }}>
            WATCH THE BEAST<br /><span className="neon-text">IN ACTION</span>
          </h3>
        </div>

        <style>{`
          @keyframes pulse-ring {
            0%, 100% { box-shadow: 0 0 20px var(--neon-glow); transform: scale(1); }
            50% { box-shadow: 0 0 60px var(--neon-glow), 0 0 100px rgba(57,255,20,0.2); transform: scale(1.05); }
          }
        `}</style>
      </div>
    </section>
  )
}