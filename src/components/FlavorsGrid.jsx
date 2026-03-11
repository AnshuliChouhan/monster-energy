import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const flavors = [
  { name: 'ORIGINAL', color: '#39FF14' },
  { name: 'ULTRA WHITE', color: '#e8e8e8' },
  { name: 'PIPELINE PUNCH', color: '#ff6b2b' },
  { name: 'MANGO LOCO', color: '#ffb800' },
  { name: 'ULTRA FIESTA', color: '#ff3d6e' },
  { name: 'PACIFIC PUNCH', color: '#c03aff' },
  { name: 'ULTRA GOLD', color: '#f5d020' },
  { name: 'ULTRA ROSA', color: '#ff7eb3' },
]

export default function FlavorsGrid() {
  const ref = useRef(null)

  useEffect(() => {
    const items = ref.current.querySelectorAll('.flavor-item')
    gsap.fromTo(items,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    )
  }, [])

  return (
    <section ref={ref} style={{ padding: '8rem 6rem', background: '#000' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', letterSpacing: '6px', color: 'var(--neon)', fontSize: '0.8rem', marginBottom: '1rem' }}>EVERY TASTE. EVERY BEAST.</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 6rem)', color: 'var(--white)' }}>
          40+ FLAVORS
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
      }}>
        {flavors.map((f, i) => (
          <div key={i} className="flavor-item" style={{
            background: `${f.color}08`,
            border: `1px solid ${f.color}33`,
            padding: '2rem 1.5rem',
            textAlign: 'center', cursor: 'none',
            transition: 'all 0.3s',
            opacity: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${f.color}18`
            e.currentTarget.style.borderColor = `${f.color}88`
            e.currentTarget.style.transform = 'scale(1.03)'
            e.currentTarget.style.boxShadow = `0 0 30px ${f.color}33`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${f.color}08`
            e.currentTarget.style.borderColor = `${f.color}33`
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            <div style={{
              width: '50px', height: '80px', margin: '0 auto 1rem',
              background: `linear-gradient(180deg, ${f.color}33 0%, ${f.color}11 100%)`,
              border: `1px solid ${f.color}55`,
              borderRadius: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: '1rem',
              color: f.color,
            }}>M</div>
            <p style={{
              fontFamily: 'var(--font-heading)', fontSize: '0.85rem',
              letterSpacing: '1px', color: f.color,
            }}>{f.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}