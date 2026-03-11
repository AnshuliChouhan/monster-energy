import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import CanScene from './CanScene'
import ParticleField from './ParticleField'
import GlitchText from './GlitchText'

export default function Hero() {
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(overlayRef.current,
      { opacity: 1 },
      { opacity: 0, duration: 0.8, ease: 'power2.inOut' }
    )
    .fromTo('.hero-eyebrow',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2'
    )
    .fromTo(headlineRef.current.querySelectorAll('.word'),
      { y: 120, opacity: 0, skewY: 8 },
      { y: 0, opacity: 1, skewY: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, '-=0.3'
    )
    .fromTo(subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4'
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3'
    )
  }, [])

  return (
    <section style={{
      height: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center',
      background: 'radial-gradient(ellipse at 60% 50%, #0a1a04 0%, #000 70%)',
      overflow: 'hidden',
    }}>
      {/* Intro flash overlay */}
      <div ref={overlayRef} style={{
        position: 'absolute', inset: 0, background: '#000', zIndex: 50, pointerEvents: 'none'
      }} />

      {/* Particle bg */}
      <ParticleField />

      {/* 3D Can — right side */}
      <div style={{
        position: 'absolute', right: '5%', top: '50%',
        transform: 'translateY(-50%)',
        width: '45vw', height: '80vh',
      }}>
        <CanScene />
      </div>

      {/* Diagonal accent line */}
      <div style={{
        position: 'absolute', left: '42%', top: 0, bottom: 0,
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, var(--neon), transparent)',
        opacity: 0.3,
        transform: 'skewX(-8deg)',
      }} />

      {/* Text content */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 6rem', maxWidth: '55%' }}>
        <p className="hero-eyebrow" style={{
          fontFamily: 'var(--font-body)', fontSize: '0.85rem',
          letterSpacing: '6px', color: 'var(--neon)',
          marginBottom: '1.5rem', opacity: 0,
        }}>EST. 2002 — THE ORIGINAL</p>

        {/* Headline with glitch */}
        <div ref={headlineRef} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 9vw, 9rem)',
          lineHeight: 0.9,
          letterSpacing: '-2px',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}>
          <GlitchText
            text="UNLEASH"
            tag="div"
            glitchColor1="#39FF14"
            glitchColor2="#ff003c"
            intensity={0.8}
            style={{
              display: 'block',
              color: 'var(--white)',
              fontFamily: 'var(--font-display)',
              fontSize: 'inherit',
              lineHeight: 'inherit',
            }}
            className="word"
          />
          <GlitchText
            text="THE"
            tag="div"
            glitchColor1="#39FF14"
            glitchColor2="#ff003c"
            intensity={0.6}
            style={{
              display: 'block',
              color: 'var(--white)',
              fontFamily: 'var(--font-display)',
              fontSize: 'inherit',
              lineHeight: 'inherit',
            }}
            className="word"
          />
          <GlitchText
            text="BEAST"
            tag="div"
            glitchColor1="#39FF14"
            glitchColor2="#ff003c"
            intensity={1.5}
            style={{
              display: 'block',
              color: 'var(--neon)',
              fontFamily: 'var(--font-display)',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              textShadow: '0 0 40px rgba(57,255,20,0.5)',
            }}
            className="word"
          />
        </div>

        <p ref={subRef} style={{
          fontFamily: 'var(--font-body)', fontWeight: 300,
          fontSize: '1.1rem', lineHeight: 1.7,
          color: 'var(--grey)', maxWidth: '420px',
          letterSpacing: '1px', marginBottom: '2.5rem',
          opacity: 0,
        }}>
          160mg of caffeine. Zero limits. One mission —<br />
          push harder, go further, never stop.
        </p>

        <div ref={ctaRef} style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', opacity: 0 }}>
          <button style={{
            fontFamily: 'var(--font-heading)', fontSize: '1rem', letterSpacing: '4px',
            padding: '1rem 3rem',
            background: 'var(--neon)', color: '#000', border: 'none',
            cursor: 'none', fontWeight: 700,
            boxShadow: '0 0 30px var(--neon-glow)',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 60px var(--neon-glow)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 30px var(--neon-glow)' }}
          >SHOP NOW</button>

          <button style={{
            fontFamily: 'var(--font-heading)', fontSize: '1rem', letterSpacing: '4px',
            padding: '1rem 2.5rem', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'var(--grey)', cursor: 'none',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon)'; e.currentTarget.style.color = 'var(--neon)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--grey)' }}
          >OUR STORY</button>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '4px', color: 'var(--grey)' }}>SCROLL</span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, var(--neon), transparent)',
          animation: 'pulse-line 2s infinite',
        }} />
      </div>

      <style>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.3; transform: scaleY(0.7); }
        }
      `}</style>
    </section>
  )
}