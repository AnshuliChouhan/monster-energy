import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const progressBarRef = useRef(null)
  const progressNumRef = useRef(null)
  const mLetterRef = useRef(null)
  const clawsRef = useRef(null)
  const taglineRef = useRef(null)
  const panelsRef = useRef([])
  const dividerRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()

    // Phase 1 — M letter slams in
    tl.fromTo(mLetterRef.current,
      { scale: 8, opacity: 0, rotate: -15 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.7, ease: 'expo.out' }
    )

    // Phase 2 — Claw marks slash across
    .fromTo(clawsRef.current.querySelectorAll('.claw'),
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power4.out' },
      '-=0.2'
    )

    // Phase 3 — Tagline appears
    .fromTo(taglineRef.current,
      { y: 20, opacity: 0, letterSpacing: '20px' },
      { y: 0, opacity: 1, letterSpacing: '6px', duration: 0.6, ease: 'power3.out' },
      '-=0.1'
    )

    // Phase 4 — Progress bar fills
    .to(progressBarRef.current, {
      width: '100%',
      duration: 2.2,
      ease: 'power1.inOut',
    }, '-=0.2')

    // Count up number
    .to({ val: 0 }, {
      val: 100,
      duration: 2.2,
      ease: 'power1.inOut',
      onUpdate: function () {
        if (progressNumRef.current) {
          progressNumRef.current.textContent = Math.round(this.targets()[0].val) + '%'
        }
      }
    }, '<')

    // Phase 5 — Flash
    .to(mLetterRef.current, {
      textShadow: '0 0 100px #39FF14, 0 0 200px #39FF14',
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    })

    // Fade out divider line before panels slide
    .to(dividerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    })

    // Phase 6 — Panels slide out (split reveal)
    .to(panelsRef.current[0], {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    })
    .to(panelsRef.current[1], {
      yPercent: 100,
      duration: 0.8,
      ease: 'power4.inOut',
    }, '<')

    // Phase 7 — Done
    .call(() => {
      if (onComplete) onComplete()
    })

    return () => tl.kill()
  }, [])

  return (
    <div ref={loaderRef} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      pointerEvents: 'none',
    }}>
      {/* Top panel */}
      <div ref={el => panelsRef.current[0] = el} style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '50%',
        background: '#000',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '2rem',
        borderBottom: '1px solid rgba(57,255,20,0.2)',
      }}>
        {/* M Letter */}
        <div ref={mLetterRef} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 15vw, 14rem)',
          color: 'var(--neon)',
          lineHeight: 1,
          textShadow: '0 0 40px rgba(57,255,20,0.6), 0 0 80px rgba(57,255,20,0.3)',
          letterSpacing: '-5px',
          position: 'relative',
        }}>
          M

          {/* Claw marks over M */}
          <div ref={clawsRef} style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            {[
              { rotate: '-12deg', left: '18%' },
              { rotate: '-6deg', left: '32%' },
              { rotate: '0deg', left: '46%' },
              { rotate: '6deg', left: '60%' },
            ].map((style, i) => (
              <div key={i} className="claw" style={{
                position: 'absolute',
                left: style.left,
                top: '-10%',
                width: '6px',
                height: '120%',
                background: `linear-gradient(180deg, transparent 0%, #000 20%, #000 80%, transparent 100%)`,
                transform: `rotate(${style.rotate})`,
                transformOrigin: 'top center',
                opacity: 0,
                mixBlendMode: 'overlay',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom panel */}
      <div ref={el => panelsRef.current[1] = el} style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '50%',
        background: '#000',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '2rem',
        gap: '2.5rem',
      }}>
        {/* Tagline */}
        <p ref={taglineRef} style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
          letterSpacing: '6px',
          color: 'var(--grey)',
          opacity: 0,
        }}>UNLEASH THE BEAST</p>

        {/* Progress section */}
        <div style={{
          width: 'min(500px, 80vw)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
        }}>
          {/* Track */}
          <div style={{
            width: '100%',
            height: '2px',
            background: 'rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div ref={progressBarRef} style={{
              position: 'absolute',
              top: 0, left: 0,
              height: '100%',
              width: '0%',
              background: 'var(--neon)',
              boxShadow: '0 0 12px var(--neon), 0 0 30px rgba(57,255,20,0.4)',
            }} />
          </div>

          {/* Number + label */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '4px',
              color: 'var(--grey)',
            }}>LOADING BEAST MODE</span>
            <span ref={progressNumRef} style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              color: 'var(--neon)',
              textShadow: '0 0 10px var(--neon)',
            }}>0%</span>
          </div>
        </div>

        {/* Noise scanlines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          pointerEvents: 'none',
          opacity: 0.4,
        }} />
      </div>

      {/* Center divider glow line */}
      <div ref={dividerRef} style={{
        position: 'absolute',
        top: '50%',
        left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, var(--neon), transparent)',
        boxShadow: '0 0 20px var(--neon)',
        zIndex: 3,
        transform: 'translateY(-50%)',
      }} />
    </div>
  )
}