import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: 160, suffix: 'mg', label: 'Caffeine' },
  { num: 40, suffix: '+', label: 'Flavors' },
  { num: 175, suffix: '+', label: 'Countries' },
  { num: 1, suffix: 'B+', label: 'Cans Yearly' },
]

export default function StatsBar() {
  const barRef = useRef(null)

  useEffect(() => {
    const items = barRef.current.querySelectorAll('.stat-item')
    gsap.fromTo(items,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: barRef.current, start: 'top 85%' }
      }
    )

    items.forEach((item) => {
      const numEl = item.querySelector('.stat-num')
      const target = parseFloat(numEl.dataset.target)
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo({ val: 0 }, { val: target, duration: 2, ease: 'power2.out',
            onUpdate: function() { numEl.textContent = Math.round(this.targets()[0].val) }
          })
        }
      })
    })
  }, [])

  return (
    <div ref={barRef} style={{
      background: 'var(--mid)',
      borderTop: '1px solid rgba(57,255,20,0.2)',
      borderBottom: '1px solid rgba(57,255,20,0.2)',
      padding: '3rem 6rem',
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2rem',
    }}>
      {stats.map((s, i) => (
        <div key={i} className="stat-item" style={{
          textAlign: 'center', opacity: 0,
          borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            color: 'var(--neon)',
            textShadow: '0 0 20px var(--neon-glow)',
            lineHeight: 1,
          }}>
            <span className="stat-num" data-target={s.num}>0</span>
            <span>{s.suffix}</span>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)', letterSpacing: '4px',
            fontSize: '0.8rem', color: 'var(--grey)',
            marginTop: '0.5rem', textTransform: 'uppercase',
          }}>{s.label}</p>
        </div>
      ))}
    </div>
  )
}