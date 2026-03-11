import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: '01', name: 'MONSTER\nORIGINAL', subtitle: 'THE CLASSIC',
    ml: '500ml', caffeine: '160mg', calories: '190kcal',
    color: '#39FF14', bg: 'linear-gradient(135deg, #0a1a04 0%, #000 100%)', tag: 'BEST SELLER',
  },
  {
    id: '02', name: 'MONSTER\nULTRA WHITE', subtitle: 'ZERO SUGAR',
    ml: '500ml', caffeine: '150mg', calories: '10kcal',
    color: '#e8e8e8', bg: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)', tag: 'ZERO SUGAR',
  },
  {
    id: '03', name: 'MONSTER\nJAVA', subtitle: 'COFFEE + ENERGY',
    ml: '444ml', caffeine: '188mg', calories: '220kcal',
    color: '#c8860a', bg: 'linear-gradient(135deg, #1a0f00 0%, #000 100%)', tag: 'NEW TASTE',
  },
  {
    id: '04', name: 'PIPELINE\nPUNCH', subtitle: 'TROPICAL BLAST',
    ml: '500ml', caffeine: '160mg', calories: '230kcal',
    color: '#ff6b2b', bg: 'linear-gradient(135deg, #1a0800 0%, #000 100%)', tag: 'FAN FAVORITE',
  },
  {
    id: '05', name: 'MANGO\nLOCO', subtitle: 'JUICED SERIES',
    ml: '500ml', caffeine: '160mg', calories: '210kcal',
    color: '#ffb800', bg: 'linear-gradient(135deg, #1a1000 0%, #000 100%)', tag: 'JUICED',
  },
  {
    id: '06', name: 'ULTRA\nFIESTA', subtitle: 'MANGO MADNESS',
    ml: '500ml', caffeine: '150mg', calories: '15kcal',
    color: '#ff3d6e', bg: 'linear-gradient(135deg, #1a0010 0%, #000 100%)', tag: 'LIMITED',
  },
]

export default function HorizontalShowcase() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    // Make all cards visible immediately
    gsap.set(track.querySelectorAll('.card-inner'), { opacity: 1, y: 0 })

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount()) + 200}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`
            }
          },
        }
      })

      tl.to(track, {
        x: getScrollAmount,
        ease: 'none',
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: '#000',
      overflow: 'hidden',
      position: 'relative',
      height: '100vh',
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: '2.5rem', left: '6rem',
        zIndex: 10,
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.75rem',
          letterSpacing: '6px', color: 'var(--neon)', marginBottom: '0.3rem',
        }}>SCROLL TO EXPLORE</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          color: 'var(--white)', lineHeight: 0.95,
        }}>THE FULL <span style={{
          color: 'transparent',
          WebkitTextStroke: '2px var(--neon)',
        }}>ARSENAL</span></h2>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: '2.5rem',
        left: '6rem', right: '6rem', zIndex: 10,
        display: 'flex', alignItems: 'center', gap: '1.5rem',
      }}>
        <div style={{
          flex: 1, height: '1px',
          background: 'rgba(255,255,255,0.1)', position: 'relative',
        }}>
          <div ref={progressRef} style={{
            position: 'absolute', top: 0, left: 0,
            height: '100%', width: '0%',
            background: 'var(--neon)',
            boxShadow: '0 0 10px var(--neon)',
          }} />
        </div>
        <span style={{
          fontFamily: 'var(--font-heading)', fontSize: '0.75rem',
          letterSpacing: '3px', color: 'var(--grey)',
        }}>SCROLL ↓</span>
      </div>

      {/* Cards Track */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: '6rem',
        paddingTop: '8rem',
        paddingBottom: '5rem',
      }}>
        <div ref={trackRef} style={{
          display: 'flex',
          gap: '1.5rem',
          paddingRight: '6rem',
          willChange: 'transform',
        }}>
          {products.map((p, i) => (
            <div key={i} style={{ minWidth: '340px', flexShrink: 0 }}>
              <div className="card-inner" style={{
                background: p.bg,
                border: `1px solid ${p.color}33`,
                height: '480px',
                position: 'relative',
                overflow: 'hidden',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'none',
                transition: 'border-color 0.3s, box-shadow 0.4s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${p.color}88`
                e.currentTarget.style.boxShadow = `0 0 60px ${p.color}22`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${p.color}33`
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                {/* Big background number */}
                <div style={{
                  position: 'absolute', right: '-1rem', bottom: '-2rem',
                  fontFamily: 'var(--font-display)', fontSize: '11rem',
                  color: `${p.color}08`, lineHeight: 1,
                  userSelect: 'none', pointerEvents: 'none',
                }}>{p.id}</div>

                {/* Corner gradient */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '100px', height: '100px',
                  background: `linear-gradient(135deg, transparent 50%, ${p.color}15 50%)`,
                }} />

                {/* Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontSize: '0.65rem',
                    letterSpacing: '3px', color: p.color,
                    background: `${p.color}15`,
                    border: `1px solid ${p.color}44`,
                    padding: '0.25rem 0.7rem',
                  }}>{p.tag}</span>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.9rem',
                    color: `${p.color}55`,
                  }}>{p.id}</span>
                </div>

                {/* Can visual */}
                <div style={{
                  display: 'flex', justifyContent: 'center',
                  alignItems: 'center', flex: 1, position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute',
                    width: '160px', height: '160px', borderRadius: '50%',
                    background: `radial-gradient(circle, ${p.color}33 0%, transparent 70%)`,
                    filter: 'blur(20px)',
                  }} />
                  <div style={{
                    width: '90px', height: '165px',
                    background: 'linear-gradient(180deg, #2a2a2a 0%, #111 40%, #1a1a1a 100%)',
                    borderRadius: '10px 10px 7px 7px',
                    border: `1px solid ${p.color}55`,
                    position: 'relative',
                    boxShadow: `0 0 40px ${p.color}33`,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', top: 0, left: '15%',
                      width: '20%', height: '100%',
                      background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)',
                    }} />
                    <div style={{
                      position: 'absolute', top: '14%', left: 0, right: 0,
                      height: '3px', background: p.color,
                      boxShadow: `0 0 8px ${p.color}`,
                    }} />
                    <div style={{
                      position: 'absolute', bottom: '14%', left: 0, right: 0,
                      height: '3px', background: p.color,
                      boxShadow: `0 0 8px ${p.color}`,
                    }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontSize: '2.2rem',
                      color: p.color, textShadow: `0 0 20px ${p.color}`,
                    }}>M</div>
                  </div>
                </div>

                {/* Name + stats */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                    letterSpacing: '4px', color: 'var(--grey)', marginBottom: '0.3rem',
                  }}>{p.subtitle}</p>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.6rem',
                    lineHeight: 1.0, color: 'var(--white)',
                    marginBottom: '1.2rem', whiteSpace: 'pre-line',
                  }}>{p.name}</h3>

                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    borderTop: `1px solid ${p.color}22`, paddingTop: '0.8rem',
                  }}>
                    {[
                      { label: 'SIZE', val: p.ml },
                      { label: 'CAFFEINE', val: p.caffeine },
                      { label: 'ENERGY', val: p.calories },
                    ].map((stat, si) => (
                      <div key={si} style={{ textAlign: 'center' }}>
                        <div style={{
                          fontFamily: 'var(--font-heading)', fontSize: '0.95rem',
                          color: p.color, letterSpacing: '1px',
                        }}>{stat.val}</div>
                        <div style={{
                          fontFamily: 'var(--font-body)', fontSize: '0.55rem',
                          letterSpacing: '2px', color: 'var(--grey)', marginTop: '0.15rem',
                        }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}