import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.2 }
    )
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '1.2rem 3rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(57,255,20,0.15)' : 'none',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      {/* Logo M */}
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--neon)',
        textShadow: '0 0 20px var(--neon)', letterSpacing: '2px' }}>
        M⚡
      </div>

      {/* Nav Links */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {['Products', 'Athletes', 'Events', 'Store'].map(item => (
          <li key={item}>
            <a href="#" style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.1rem',
              color: 'var(--grey)', letterSpacing: '2px', textDecoration: 'none',
              transition: 'color 0.2s, text-shadow 0.2s',
            }}
            onMouseEnter={e => { e.target.style.color = 'var(--neon)'; e.target.style.textShadow = '0 0 10px var(--neon)' }}
            onMouseLeave={e => { e.target.style.color = 'var(--grey)'; e.target.style.textShadow = 'none' }}
            >{item}</a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button style={{
        fontFamily: 'var(--font-heading)', fontSize: '0.95rem', letterSpacing: '3px',
        padding: '0.6rem 1.8rem',
        background: 'transparent',
        border: '1px solid var(--neon)',
        color: 'var(--neon)',
        cursor: 'none',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--neon)'; e.currentTarget.style.color = '#000' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--neon)' }}
      >FIND A STORE</button>
    </nav>
  )
}