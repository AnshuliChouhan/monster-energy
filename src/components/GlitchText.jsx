import { useEffect, useRef } from 'react'

export default function GlitchText({
  text,
  tag = 'h2',
  style = {},
  glitchColor1 = '#39FF14',
  glitchColor2 = '#ff003c',
  intensity = 1,
}) {
  const elRef = useRef(null)

  useEffect(() => {
    const el = elRef.current
    let intervalId
    let timeoutId
    const chars = 'X@#$%!&*M?/\\<>[]{}|^~'

    const scramble = () => {
      let iterations = 0
      const original = text
      const maxIterations = original.length * (3 * intensity)

      clearInterval(intervalId)
      intervalId = setInterval(() => {
        el.setAttribute('data-text',
          original.split('').map((char, i) => {
            if (char === ' ' || char === '\n') return char
            if (i < iterations / (3 * intensity)) return original[i]
            return chars[Math.floor(Math.random() * chars.length)]
          }).join('')
        )
        el.textContent = original.split('').map((char, i) => {
          if (char === ' ' || char === '\n') return char
          if (i < iterations / (3 * intensity)) return original[i]
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')

        iterations++
        if (iterations >= maxIterations) {
          clearInterval(intervalId)
          el.textContent = original
          el.setAttribute('data-text', original)
        }
      }, 40)
    }

    // Auto glitch randomly
    const autoGlitch = () => {
      scramble()
      timeoutId = setTimeout(autoGlitch, 4000 + Math.random() * 6000)
    }

    timeoutId = setTimeout(autoGlitch, 1500 + Math.random() * 3000)

    // Also glitch on hover
    el.addEventListener('mouseenter', scramble)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
      el.removeEventListener('mouseenter', scramble)
    }
  }, [text, intensity])

  const Tag = tag

  return (
    <Tag
      ref={elRef}
      data-text={text}
      style={{
        position: 'relative',
        ...style,
      }}
    >
      {text}
      <style>{`
        [data-text]::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          color: ${glitchColor1};
          opacity: 0;
          animation: glitch-before 3s infinite;
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
        }
        [data-text]::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          color: ${glitchColor2};
          opacity: 0;
          animation: glitch-after 3s infinite 0.1s;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
        }
        @keyframes glitch-before {
          0%, 90%, 100% { opacity: 0; transform: translate(0); }
          91% { opacity: 0.8; transform: translate(-3px, 1px); }
          93% { opacity: 0.8; transform: translate(3px, -1px); }
          95% { opacity: 0.8; transform: translate(-2px, 2px); }
          97% { opacity: 0; }
        }
        @keyframes glitch-after {
          0%, 88%, 100% { opacity: 0; transform: translate(0); }
          89% { opacity: 0.8; transform: translate(3px, -1px); }
          91% { opacity: 0.8; transform: translate(-3px, 1px); }
          94% { opacity: 0.8; transform: translate(2px, -2px); }
          96% { opacity: 0; }
        }
      `}</style>
    </Tag>
  )
}