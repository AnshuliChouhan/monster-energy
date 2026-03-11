export default function Footer() {
  return (
    <footer style={{
      background: 'var(--mid)',
      borderTop: '1px solid rgba(57,255,20,0.15)',
      padding: '4rem 6rem',
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: '3rem',
    }}>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--neon)', textShadow: '0 0 20px var(--neon)', marginBottom: '1rem' }}>M⚡</div>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--grey)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Unleashing the beast since 2002.<br />Energy for those who dare.
        </p>
      </div>
      {[
        { title: 'Products', links: ['Original', 'Ultra', 'Java', 'Hydro', 'Rehab'] },
        { title: 'Company', links: ['About', 'Athletes', 'Events', 'Careers'] },
        { title: 'Legal', links: ['Privacy', 'Terms', 'Accessibility'] },
      ].map((col, i) => (
        <div key={i}>
          <h4 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '3px', color: 'var(--white)', marginBottom: '1.2rem', fontSize: '0.9rem' }}>{col.title}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {col.links.map(l => (
              <li key={l}>
                <a href="#" style={{
                  fontFamily: 'var(--font-body)', color: 'var(--grey)',
                  textDecoration: 'none', fontSize: '0.9rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--neon)'}
                onMouseLeave={e => e.target.style.color = 'var(--grey)'}
                >{l}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div style={{ gridColumn: '1/-1', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--grey)', fontSize: '0.8rem', letterSpacing: '2px' }}>© 2024 MONSTER ENERGY COMPANY. ALL RIGHTS RESERVED.</p>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--grey)', fontSize: '0.8rem', letterSpacing: '1px' }}>DRINK RESPONSIBLY. 18+</p>
      </div>
    </footer>
  )
}