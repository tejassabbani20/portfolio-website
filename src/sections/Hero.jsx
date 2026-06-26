import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

function useTypingEffect(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const current = words[wordIndex]
    let timeout
    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => setCharIndex(i => i + 1), speed)
      setDisplay(current.slice(0, charIndex))
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => setCharIndex(i => i - 1), speed / 2)
      setDisplay(current.slice(0, charIndex))
    } else {
      setDeleting(false)
      setWordIndex(i => (i + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause])
  return display
}

function ParticleField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const count = window.innerWidth < 768 ? 40 : 80
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3, dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4, o: Math.random() * 0.5 + 0.1,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(37,99,235,${p.o})`; ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(37,99,235,${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
}

function MouseGlow() {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 60, damping: 20 })
  const sy = useSpring(y, { stiffness: 60, damping: 20 })
  useEffect(() => {
    const move = e => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])
  return (
    <motion.div style={{
      position: 'fixed', top: 0, left: 0,
      x: useTransform(sx, v => v - 200), y: useTransform(sy, v => v - 200),
      width: '400px', height: '400px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)',
      pointerEvents: 'none', zIndex: 0,
    }} />
  )
}

function AnimatedName({ name }) {
  return (
    <span>
      {name.split('').map((char, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', transformOrigin: 'bottom' }}
        >{char === ' ' ? '\u00A0' : char}</motion.span>
      ))}
    </span>
  )
}

const socialLinks = [
  { icon: FiGithub,   href: 'https://github.com/',  label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { icon: FiMail,     href: 'mailto:you@email.com',  label: 'Email'    },
]
const roles = ['Data Analyst', 'ML Engineer', 'BI Developer', 'Python Developer', 'Data Scientist']

export default function Hero() {
  const role = useTypingEffect(roles, 75, 2000)
  const isMobile = useIsMobile()

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: isMobile ? '100px 1.25rem 2rem' : '80px 2rem 0',
      backgroundColor: '#0A0A0F',
    }}>
      <ParticleField />
      {!isMobile && <MouseGlow />}

      {/* Orbs */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: isMobile ? '320px' : '700px', height: isMobile ? '320px' : '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px', pointerEvents: 'none', zIndex: 0,
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '800px' }}>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          style={{ marginBottom: '1.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: '999px',
            border: '1px solid rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.06)',
            color: '#60A5FA', fontSize: isMobile ? '0.7rem' : '0.8rem',
            fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: '0.05em',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB', display: 'inline-block', boxShadow: '0 0 8px #2563EB' }} />
            Open to Work · Fresher
          </span>
        </motion.div>

        {/* Name */}
        <h1 style={{
          fontSize: isMobile ? 'clamp(2.4rem, 11vw, 3.5rem)' : 'clamp(3rem, 8vw, 6.5rem)',
          fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em',
          fontFamily: 'Inter, sans-serif', color: '#F8FAFC',
          marginBottom: '1rem', perspective: '800px',
        }}>
          <AnimatedName name="Tejas Sabbani" />
        </h1>

        {/* Typing */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            fontSize: isMobile ? '1rem' : 'clamp(1.1rem, 2.5vw, 1.6rem)',
            fontWeight: 600, fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem',
            height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}>
          <span style={{ color: '#475569' }}>I am a </span>
          <span style={{
            background: 'linear-gradient(90deg, #2563EB, #818CF8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            minWidth: isMobile ? '160px' : '220px', textAlign: 'left',
          }}>
            {role}
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
              style={{ display: 'inline-block', width: '2px', height: '1.2em', background: '#2563EB', marginLeft: '2px', verticalAlign: 'middle', WebkitTextFillColor: '#2563EB' }} />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: isMobile ? '0.9rem' : 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: '#475569', lineHeight: 1.9,
            maxWidth: isMobile ? '100%' : '580px',
            margin: '0 auto 2rem', fontFamily: 'Inter, sans-serif',
            padding: isMobile ? '0 0.5rem' : '0',
          }}>
          Passionate about turning raw data into{' '}
          <span style={{ color: '#94A3B8', fontWeight: 500 }}>meaningful insights</span>.
          I build ML models, dashboards, and analytics pipelines that{' '}
          <span style={{ color: '#94A3B8', fontWeight: 500 }}>drive real decisions</span>.
        </motion.p>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { value: '10+', label: 'Projects Built' },
            { value: '5+',  label: 'Tech Stacks'    },
            { value: '3+',  label: 'Certifications' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: isMobile ? '0.75rem 1.25rem' : '0.75rem 2rem',
              borderRight: i < 2 ? '1px solid #1E1E2E' : 'none', textAlign: 'center',
            }}>
              <div style={{
                fontSize: isMobile ? '1.4rem' : '1.8rem', fontWeight: 800,
                fontFamily: 'Inter, sans-serif',
                background: 'linear-gradient(90deg, #2563EB, #60A5FA)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1, marginBottom: '0.3rem',
              }}>{stat.value}</div>
              <div style={{ fontSize: '0.7rem', color: '#475569', fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.6 }}
          style={{
            display: 'flex', gap: '0.75rem', justifyContent: 'center',
            flexWrap: 'wrap', marginBottom: '2rem',
            padding: isMobile ? '0 0.5rem' : '0',
          }}>
          <motion.a href="#projects" whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(37,99,235,0.5)' }} whileTap={{ scale: 0.97 }}
            style={{
              padding: isMobile ? '0.75rem 1.5rem' : '0.9rem 2.2rem',
              borderRadius: '12px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              color: '#fff', fontFamily: 'Inter, sans-serif',
              fontSize: isMobile ? '0.85rem' : '0.95rem', fontWeight: 600, textDecoration: 'none',
              boxShadow: '0 0 20px rgba(37,99,235,0.3)', border: '1px solid rgba(255,255,255,0.1)',
            }}>
            View My Work →
          </motion.a>

          <motion.a href="/resume.pdf" target="_blank" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: isMobile ? '0.75rem 1.5rem' : '0.9rem 2.2rem',
              borderRadius: '12px', background: 'rgba(255,255,255,0.03)',
              border: '1px solid #1E1E2E', color: '#94A3B8',
              fontFamily: 'Inter, sans-serif', fontSize: isMobile ? '0.85rem' : '0.95rem',
              fontWeight: 500, textDecoration: 'none',
              backdropFilter: 'blur(8px)', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.color = '#F8FAFC' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E2E'; e.currentTarget.style.color = '#94A3B8' }}>
            Download Resume
          </motion.a>

          <motion.a href="#experience" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: isMobile ? '0.75rem 1.5rem' : '0.9rem 2.2rem',
              borderRadius: '12px', background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.3)', color: '#FB923C',
              fontFamily: 'Inter, sans-serif', fontSize: isMobile ? '0.85rem' : '0.95rem',
              fontWeight: 500, textDecoration: 'none',
              backdropFilter: 'blur(8px)', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#F97316'; e.currentTarget.style.background = 'rgba(249,115,22,0.15)'; e.currentTarget.style.color = '#FDBA74' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'; e.currentTarget.style.background = 'rgba(249,115,22,0.08)'; e.currentTarget.style.color = '#FB923C' }}>
            My Experience ↓
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0, duration: 0.6 }}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: isMobile ? '2.5rem' : '4rem' }}>
          {socialLinks.map(({ icon: Icon, href, label }, i) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.0 + i * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.2, y: -4, boxShadow: '0 0 20px rgba(37,99,235,0.3)' }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: isMobile ? '42px' : '46px', height: isMobile ? '42px' : '46px',
                borderRadius: '12px', border: '1px solid #1E1E2E',
                background: 'rgba(255,255,255,0.02)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: '#475569', textDecoration: 'none',
                backdropFilter: 'blur(8px)', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.color = '#2563EB'; e.currentTarget.style.background = 'rgba(37,99,235,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E2E'; e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}>
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#1E293B' }}>
          <span style={{ fontSize: '0.65rem', fontFamily: 'Inter, sans-serif', letterSpacing: '0.2em', fontWeight: 600 }}>SCROLL DOWN</span>
          <motion.div animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <FiArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
