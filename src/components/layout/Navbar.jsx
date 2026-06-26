import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         50,
          padding:        '0 2rem',
          height:         '70px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          transition:     'background 0.3s ease, border-color 0.3s ease',
          background:     scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom:   scrolled ? '1px solid #1E1E2E' : '1px solid transparent',
        }}
      >
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            fontSize:       '1.25rem',
            fontWeight:     700,
            color:          '#F8FAFC',
            textDecoration: 'none',
            fontFamily:     'Inter, sans-serif',
            letterSpacing:  '-0.02em',
          }}
        >
          Tejas Sabbani<span style={{ color: '#2563EB' }}>.</span>
        </motion.a>

        <ul
          className="hidden-mobile"
          style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  color:          active === link.href.replace('#', '') ? '#2563EB' : '#94A3B8',
                  textDecoration: 'none',
                  fontSize:       '0.9rem',
                  fontWeight:     500,
                  fontFamily:     'Inter, sans-serif',
                  transition:     'color 0.2s ease',
                }}
                onMouseEnter={e => (e.target.style.color = '#F8FAFC')}
                onMouseLeave={e => (e.target.style.color = active === link.href.replace('#', '') ? '#2563EB' : '#94A3B8')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden-mobile"
          style={{
            padding:        '0.5rem 1.25rem',
            borderRadius:   '8px',
            border:         '1px solid #2563EB',
            color:          '#2563EB',
            fontSize:       '0.875rem',
            fontWeight:     500,
            fontFamily:     'Inter, sans-serif',
            textDecoration: 'none',
            transition:     'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#2563EB'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#2563EB'
          }}
        >
          Resume
        </motion.a>

        <button
          onClick={() => setMenuOpen(o => !o)}
          className="show-mobile"
          aria-label="Toggle menu"
          style={{
            background:    'none',
            border:        'none',
            cursor:        'pointer',
            display:       'flex',
            flexDirection: 'column',
            gap:           '5px',
            padding:       '4px',
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={{
                rotate:  menuOpen && i !== 1 ? (i === 0 ? 45 : -45) : 0,
                y:       menuOpen && i !== 1 ? (i === 0 ? 7 : -7) : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              style={{
                display:         'block',
                width:           '22px',
                height:          '2px',
                background:      '#F8FAFC',
                borderRadius:    '2px',
                transformOrigin: 'center',
              }}
            />
          ))}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="show-mobile"
            style={{
              position:       'fixed',
              top:            '70px',
              left:           0,
              right:          0,
              zIndex:         49,
              background:     'rgba(10,10,15,0.97)',
              backdropFilter: 'blur(12px)',
              borderBottom:   '1px solid #1E1E2E',
              padding:        '1.5rem 2rem',
              display:        'flex',
              flexDirection:  'column',
              gap:            '1.25rem',
            }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color:          '#94A3B8',
                  textDecoration: 'none',
                  fontSize:       '1rem',
                  fontWeight:     500,
                  fontFamily:     'Inter, sans-serif',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding:        '0.6rem 1.25rem',
                borderRadius:   '8px',
                border:         '1px solid #2563EB',
                color:          '#2563EB',
                fontSize:       '0.9rem',
                fontWeight:     500,
                fontFamily:     'Inter, sans-serif',
                textDecoration: 'none',
                textAlign:      'center',
                marginTop:      '0.5rem',
              }}
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile   { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
