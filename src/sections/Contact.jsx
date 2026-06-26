import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

const fadeInLeft  = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const fadeInRight = { hidden: { opacity: 0, x:  50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const fadeInUp    = { hidden: { opacity: 0, y:  50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger     = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const SOCIALS = [
  { icon: FiGithub,   label: 'GitHub',   href: 'https://github.com',   color: '#94A3B8' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: '#2563EB' },
  { icon: FiMail,     label: 'Email',    href: 'mailto:tejassabbani@gmail.com', color: '#EF4444' },
]

function FloatInput({ label, type = 'text', isTextarea = false, value, onChange, name }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  const base = { width: '100%', background: 'rgba(22,22,31,0.8)', border: `1px solid ${focused ? '#2563EB' : '#1E1E2E'}`, borderRadius: '12px', color: '#F8FAFC', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'border-color 0.2s ease', boxSizing: 'border-box', padding: '1.5rem 1rem 0.5rem' }
  return (
    <div style={{ position: 'relative' }}>
      {isTextarea ? <textarea name={name} rows={4} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ ...base, resize: 'none' }} />
        : <input name={name} type={type} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ ...base, height: '56px' }} />}
      <label style={{ position: 'absolute', left: '1rem', pointerEvents: 'none', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', color: active ? '#2563EB' : '#475569', top: active ? '0.45rem' : isTextarea ? '1rem' : '50%', transform: active ? 'none' : isTextarea ? 'none' : 'translateY(-50%)', fontSize: active ? '0.65rem' : '0.9rem', fontWeight: active ? 700 : 400, letterSpacing: active ? '0.08em' : 'normal', textTransform: active ? 'uppercase' : 'none' }}>{label}</label>
    </div>
  )
}

export default function Contact() {
  const isMobile = useIsMobile()
  const leftRef = useRef(null); const rightRef = useRef(null)
  const leftInView  = useInView(leftRef,  { once: true, margin: '-80px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); setForm({ name: '', email: '', subject: '', message: '' }) }

  return (
    <section id="contact" style={{ padding: isMobile ? '5rem 1.25rem' : '7rem 2rem', backgroundColor: '#0A0A0F', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div ref={leftRef} initial={{ opacity: 0, y: 50 }} animate={leftInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px', border: '1px solid rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.06)', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em', marginBottom: '1rem' }}>GET IN TOUCH</span>
          <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.5rem)' : 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, fontFamily: 'Inter, sans-serif', color: '#F8FAFC', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>Let's Build Something Great</h2>
          <p style={{ fontSize: '1rem', color: '#475569', fontFamily: 'Inter, sans-serif', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>Open to full-time roles, freelance, and collaborations. I respond fast.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isMobile ? '2.5rem' : '4rem', alignItems: 'start' }}>
          {/* Info */}
          <motion.div variants={stagger} initial="hidden" animate={leftInView ? 'visible' : 'hidden'}>
            <motion.div variants={fadeInLeft} style={{ marginBottom: '2rem' }}>
              {[{ label: 'Email', value: 'tejassabbani@gmail.com', href: 'mailto:tejassabbani@gmail.com' }, { label: 'Location', value: 'India · Remote OK' }, { label: 'Status', value: 'Open to Work 🟢' }].map(({ label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem', padding: '0.9rem 1rem', background: 'rgba(22,22,31,0.6)', border: '1px solid #1E1E2E', borderRadius: '12px', backdropFilter: 'blur(8px)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#2563EB', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', minWidth: '65px' }}>{label}</span>
                  <span style={{ width: '1px', height: '14px', background: '#1E1E2E', flexShrink: 0 }} />
                  {href ? <a href={href} style={{ fontSize: '0.82rem', color: '#94A3B8', fontFamily: 'Inter, sans-serif', textDecoration: 'none', wordBreak: 'break-all' }} onMouseEnter={e => e.currentTarget.style.color='#60A5FA'} onMouseLeave={e => e.currentTarget.style.color='#94A3B8'}>{value}</a>
                    : <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontFamily: 'Inter, sans-serif' }}>{value}</span>}
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInLeft}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: '#475569', fontFamily: 'Inter, sans-serif', marginBottom: '1rem', textTransform: 'uppercase' }}>Find me on</p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ width: '44px', height: '44px', borderRadius: '12px', border: '1px solid #1E1E2E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', textDecoration: 'none', transition: 'all 0.2s ease', background: 'rgba(22,22,31,0.6)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = `${color}50` }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#1E1E2E' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.form ref={rightRef} variants={fadeInRight} initial="hidden" animate={rightInView ? 'visible' : 'hidden'} onSubmit={onSubmit}
            style={{ background: 'rgba(22,22,31,0.6)', border: '1px solid #1E1E2E', borderRadius: '20px', padding: isMobile ? '1.5rem' : '2rem', backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <FloatInput label="Your Name"     name="name"  value={form.name}  onChange={onChange} />
              <FloatInput label="Email Address" name="email" type="email" value={form.email} onChange={onChange} />
            </div>
            <div style={{ marginBottom: '1rem' }}><FloatInput label="Subject" name="subject" value={form.subject} onChange={onChange} /></div>
            <div style={{ marginBottom: '1.5rem' }}><FloatInput label="Your Message" name="message" isTextarea value={form.message} onChange={onChange} /></div>
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', background: 'linear-gradient(135deg, #2563EB, #6366F1)', border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {sent ? '✅ Message Sent!' : <><FiSend size={15} /> Send Message</>}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
