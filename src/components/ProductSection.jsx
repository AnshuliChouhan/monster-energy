import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { name: 'MONSTER ORIGINAL', tagline: 'The one that started it all', color: '#39FF14', bg: '#0a1a04' },
  { name: 'MONSTER ULTRA', tagline: 'Zero sugar. Full power.', color: '#e0e0e0', bg: '#1a1a1a' },
  { name: 'MONSTER JAVA', tagline: 'Coffee meets monster', color: '#c8860a', bg: '#1a0f00' },
]

export default function ProductSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.product-card')
    gsap.fromTo(cards,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      }
    )
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: '8rem 6rem',
      background: 'linear-gradient(180deg, #000 0%, #050f02 50%, #000 100%)',
    }}>
      <div style={{ marginBottom: '4rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', letterSpacing: '6px', color: 'var(--neon)', fontSize: '0.8rem', marginBottom: '1rem' }}>THE LINEUP</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 6vw, 6rem)',
          lineHeight: 1, color: 'var(--white)',
        }}>CHOOSE YOUR<br /><span style={{ color: 'var(--neon)', textShadow: '0 0 10px var(--neon), 0 0 30px rgba(57,255,20,0.35)' }}>WEAPON</span></h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {products.map((p, i) => (
          <div key={i} className="product-card" style={{
            background: p.bg,
            border: `1px solid ${p.color}22`,
            padding: '3rem 2rem',
            position: 'relative', overflow: 'hidden',
            cursor: 'none',
            transition: 'transform 0.4s, border-color 0.3s, box-shadow 0.4s',
            opacity: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)'
            e.currentTarget.style.borderColor = p.color + '88'
            e.currentTarget.style.boxShadow = `0 20px 60px ${p.color}22`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.borderColor = p.color + '22'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: '80px', height: '80px',
              background: `linear-gradient(135deg, transparent 50%, ${p.color}22 50%)`,
            }} />

            <div style={{
              width: '80px', height: '140px', margin: '0 auto 2rem',
              background: `linear-gradient(180deg, #222 0%, #111 100%)`,
              borderRadius: '8px',
              border: `2px solid ${p.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 30px ${p.color}33`,
              fontFamily: 'var(--font-display)', fontSize: '1.5rem',
              color: p.color,
            }}>M</div>

            <h3 style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.4rem',
              letterSpacing: '2px', color: 'var(--white)', marginBottom: '0.5rem',
            }}>{p.name}</h3>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--grey)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{p.tagline}</p>

            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '0.9rem',
              letterSpacing: '2px', color: p.color,
            }}>EXPLORE →</div>
          </div>
        ))}
      </div>
    </section>
  )
}