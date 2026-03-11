import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const athletes = [
  {
    name: 'NYJAH HUSTON',
    sport: 'SKATEBOARDING',
    quote: 'No limits. No excuses.',
    number: '01',
    color: '#39FF14',
    align: 'left',
  },
  {
    name: 'VALENTINO ROSSI',
    sport: 'MOTO GP',
    quote: 'Speed is everything.',
    number: '02',
    color: '#ff3d00',
    align: 'right',
  },
  {
    name: 'TRAVIS PASTRANA',
    sport: 'MOTORSPORTS',
    quote: 'Push beyond the edge.',
    number: '03',
    color: '#00cfff',
    align: 'left',
  },
  {
    name: 'LETICIA BUFONI',
    sport: 'SKATEBOARDING',
    quote: 'Break every barrier.',
    number: '04',
    color: '#ff006e',
    align: 'right',
  },
]

function AthleteCard({ athlete, index }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const img = imgRef.current
    const text = textRef.current
    const line = lineRef.current

    // Parallax on image
    gsap.fromTo(img,
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    )

    // Slide in text
    gsap.fromTo(text,
      {
        x: athlete.align === 'left' ? -80 : 80,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
        }
      }
    )

    // Line expand
    gsap.fromTo(line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
        }
      }
    )
  }, [])

  const isRight = athlete.align === 'right'

  return (
    <div ref={cardRef} style={{
      display: 'grid',
      gridTemplateColumns: isRight ? '1fr 1fr' : '1fr 1fr',
      gap: '0',
      minHeight: '90vh',
      position: 'relative',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      direction: isRight ? 'rtl' : 'ltr',
    }}>
      {/* Image side */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        direction: 'ltr',
      }}>
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: isRight
            ? `linear-gradient(to left, #000 0%, transparent 60%)`
            : `linear-gradient(to right, #000 0%, transparent 60%)`,
        }} />

        {/* Color overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `${athlete.color}11`,
          mixBlendMode: 'screen',
        }} />

        {/* Fake athlete image — colored placeholder with silhouette feel */}
        <div ref={imgRef} style={{
          width: '100%',
          height: '110%',
          marginTop: '-5%',
          background: `
            radial-gradient(ellipse at 50% 30%, ${athlete.color}22 0%, transparent 60%),
            linear-gradient(180deg, ${athlete.color}08 0%, #000 100%)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Big sport icon / number as visual */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(12rem, 20vw, 22rem)',
            color: `${athlete.color}15`,
            lineHeight: 1,
            userSelect: 'none',
            position: 'absolute',
          }}>{athlete.number}</div>

          {/* Athlete silhouette placeholder */}
          <div style={{
            width: '280px', height: '420px',
            background: `linear-gradient(180deg, ${athlete.color}33 0%, ${athlete.color}08 100%)`,
            clipPath: 'polygon(30% 0%, 70% 0%, 90% 15%, 95% 40%, 80% 60%, 85% 80%, 70% 100%, 30% 100%, 15% 80%, 20% 60%, 5% 40%, 10% 15%)',
            boxShadow: `0 0 80px ${athlete.color}33`,
            position: 'relative', zIndex: 1,
          }} />
        </div>
      </div>

      {/* Text side */}
      <div ref={textRef} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isRight ? '4rem 6rem 4rem 3rem' : '4rem 3rem 4rem 6rem',
        direction: 'ltr',
        opacity: 0,
      }}>
        {/* Sport tag */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          letterSpacing: '6px',
          color: athlete.color,
          marginBottom: '1.5rem',
        }}>{athlete.sport}</p>

        {/* Expanding line */}
        <div ref={lineRef} style={{
          height: '2px',
          width: '100%',
          background: `linear-gradient(to right, ${athlete.color}, transparent)`,
          marginBottom: '2rem',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
        }} />

        {/* Name */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
          lineHeight: 0.95,
          color: 'var(--white)',
          marginBottom: '1.5rem',
          letterSpacing: '-1px',
        }}>
          {athlete.name.split(' ').map((word, i) => (
            <span key={i} style={{ display: 'block' }}>{word}</span>
          ))}
        </h2>

        {/* Quote */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.3rem',
          fontWeight: 300,
          color: 'var(--grey)',
          fontStyle: 'italic',
          marginBottom: '3rem',
          borderLeft: `3px solid ${athlete.color}`,
          paddingLeft: '1.2rem',
        }}>"{athlete.quote}"</p>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            letterSpacing: '3px',
            padding: '0.8rem 2.5rem',
            background: 'transparent',
            border: `1px solid ${athlete.color}`,
            color: athlete.color,
            cursor: 'none',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = athlete.color
            e.currentTarget.style.color = '#000'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = athlete.color
          }}
          >VIEW PROFILE</button>

          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '4rem',
            color: `${athlete.color}20`,
            lineHeight: 1,
          }}>{athlete.number}</span>
        </div>
      </div>

      {/* Vertical number on edge */}
      <div style={{
        position: 'absolute',
        [isRight ? 'left' : 'right']: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.7rem',
        letterSpacing: '6px',
        color: 'rgba(255,255,255,0.1)',
      }}>MONSTER ATHLETE — {athlete.number}</div>
    </div>
  )
}

export default function AthletesSection() {
  const headerRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    // Header parallax
    gsap.fromTo(headerRef.current,
      { yPercent: -30 },
      {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    )

    // Infinite marquee
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 18,
      ease: 'none',
    })
  }, [])

  return (
    <section style={{ background: '#000', position: 'relative' }}>

      {/* Header */}
      <div style={{
        padding: '8rem 6rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(57,255,20,0.1)',
      }}>
        <div ref={headerRef}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            letterSpacing: '6px',
            color: 'var(--neon)',
            marginBottom: '1.5rem',
          }}>THE TEAM</p>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 9vw, 10rem)',
              lineHeight: 0.9,
              color: 'var(--white)',
            }}>
              MONSTER<br />
              <span style={{
                color: 'transparent',
                WebkitTextStroke: '2px var(--neon)',
                textShadow: 'none',
              }}>ATHLETES</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--grey)',
              maxWidth: '300px',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              marginBottom: '1rem',
            }}>
              The world's most elite athletes. Fueled by Monster. Defined by greatness.
            </p>
          </div>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(57,255,20,0.15)',
        borderBottom: '1px solid rgba(57,255,20,0.15)',
        padding: '0.8rem 0',
        background: 'var(--mid)',
      }}>
        <div ref={marqueeRef} style={{
          display: 'flex',
          gap: '3rem',
          width: 'max-content',
          whiteSpace: 'nowrap',
        }}>
          {[...Array(2)].map((_, rep) => (
            <span key={rep} style={{ display: 'flex', gap: '3rem' }}>
              {['SKATE', 'MOTO', 'BMX', 'SURF', 'RALLY', 'MMA', 'GAMING', 'SNOWBOARD', 'DRIFT', 'FREERIDE'].map((sport, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  letterSpacing: '4px',
                  color: i % 3 === 0 ? 'var(--neon)' : 'var(--grey)',
                }}>
                  {sport} <span style={{ color: 'var(--neon)', margin: '0 0.5rem' }}>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Athlete Cards */}
      {athletes.map((athlete, i) => (
        <AthleteCard key={i} athlete={athlete} index={i} />
      ))}

      {/* Bottom CTA */}
      <div style={{
        padding: '6rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(57,255,20,0.1)',
        background: 'linear-gradient(180deg, #000 0%, #050f02 100%)',
      }}>
        <p style={{ fontFamily: 'var(--font-body)', letterSpacing: '6px', color: 'var(--grey)', fontSize: '0.8rem', marginBottom: '2rem' }}>
          200+ ATHLETES WORLDWIDE
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          color: 'var(--white)',
          marginBottom: '2.5rem',
        }}>JOIN THE <span style={{ color: 'var(--neon)', textShadow: '0 0 30px rgba(57,255,20,0.5)' }}>BEAST</span> FAMILY</h3>
        <button style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1rem',
          letterSpacing: '4px',
          padding: '1.2rem 4rem',
          background: 'var(--neon)',
          border: 'none',
          color: '#000',
          cursor: 'none',
          fontWeight: 700,
          boxShadow: '0 0 40px rgba(57,255,20,0.4)',
          transition: 'all 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 80px rgba(57,255,20,0.6)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(57,255,20,0.4)' }}
        >MEET ALL ATHLETES</button>
      </div>
    </section>
  )
}