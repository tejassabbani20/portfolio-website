import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

const fadeInUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger  = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }

const SKILLS = [
  { cat: 'Languages',  name: 'Python',       icon: '🐍', level: 'Expert',       color: '#F59E0B' },
  { cat: 'Languages',  name: 'SQL',           icon: '🗃️', level: 'Advanced',     color: '#2563EB' },
  { cat: 'Languages',  name: 'Java',          icon: '☕', level: 'Intermediate', color: '#EF4444' },
  { cat: 'Languages',  name: 'C / C++',       icon: '⚙️', level: 'Intermediate', color: '#6366F1' },
  { cat: 'ML & AI',    name: 'Scikit-Learn',  icon: '🤖', level: 'Advanced',     color: '#8B5CF6' },
  { cat: 'ML & AI',    name: 'TensorFlow',    icon: '🧠', level: 'Intermediate', color: '#F97316' },
  { cat: 'ML & AI',    name: 'Pandas',        icon: '🐼', level: 'Expert',       color: '#0EA5E9' },
  { cat: 'ML & AI',    name: 'NumPy',         icon: '📐', level: 'Expert',       color: '#6366F1' },
  { cat: 'Analytics',  name: 'Power BI',      icon: '📊', level: 'Advanced',     color: '#F59E0B' },
  { cat: 'Analytics',  name: 'Tableau',       icon: '📈', level: 'Advanced',     color: '#2563EB' },
  { cat: 'Analytics',  name: 'Excel',         icon: '📗', level: 'Expert',       color: '#16A34A' },
  { cat: 'Analytics',  name: 'Matplotlib',    icon: '🎨', level: 'Advanced',     color: '#EC4899' },
  { cat: 'Databases',  name: 'MySQL',         icon: '🗄️', level: 'Advanced',     color: '#2563EB' },
  { cat: 'Databases',  name: 'PostgreSQL',    icon: '🐘', level: 'Intermediate', color: '#6366F1' },
  { cat: 'Databases',  name: 'MongoDB',       icon: '🍃', level: 'Intermediate', color: '#16A34A' },
  { cat: 'Tools',      name: 'Git & GitHub',  icon: '🐙', level: 'Advanced',     color: '#94A3B8' },
  { cat: 'Tools',      name: 'Jupyter',       icon: '📓', level: 'Expert',       color: '#F97316' },
  { cat: 'Tools',      name: 'VS Code',       icon: '💻', level: 'Expert',       color: '#2563EB' },
  { cat: 'Tools',      name: 'Azure ML',      icon: '☁️', level: 'Intermediate', color: '#0EA5E9' },
  { cat: 'Tools',      name: 'SDLC',          icon: '🔄', level: 'Intermediate', color: '#8B5CF6' },
]
const CATS = ['All', 'Languages', 'ML & AI', 'Analytics', 'Databases', 'Tools']
const LEVEL_COLOR = { Expert: '#16A34A', Advanced: '#2563EB', Intermediate: '#8B5CF6' }

export default function Skills() {
  const [active, setActive] = useState('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isMobile = useIsMobile()
  const filtered = active === 'All' ? SKILLS : SKILLS.filter(s => s.cat === active)

  return (
    <section id="skills" style={{ padding: isMobile ? '5rem 1.25rem' : '7rem 2rem', backgroundColor: '#0A0A0F', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px', border: '1px solid rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.06)', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em', marginBottom: '1rem' }}>SKILLS & TOOLS</span>
          <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.5rem)' : 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, fontFamily: 'Inter, sans-serif', color: '#F8FAFC', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>The Stack I Build With</h2>
          <p style={{ fontSize: '1rem', color: '#475569', fontFamily: 'Inter, sans-serif', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>Every tool I reach for has a reason.</p>
          {/* Filter tabs — scrollable on mobile */}
          <div style={{ display: 'flex', flexWrap: isMobile ? 'nowrap' : 'wrap', gap: '0.5rem', justifyContent: isMobile ? 'flex-start' : 'center', overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? '0.5rem' : 0 }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)} style={{ padding: '0.4rem 1rem', borderRadius: '999px', border: `1px solid ${active === c ? '#2563EB' : '#1E1E2E'}`, background: active === c ? 'rgba(37,99,235,0.15)' : 'rgba(22,22,31,0.6)', color: active === c ? '#60A5FA' : '#475569', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap', flexShrink: 0 }}>{c}</button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.85rem' }}>
          {filtered.map(({ name, icon, level, color }) => (
            <motion.div key={name} variants={fadeInUp} whileHover={{ y: -6, borderColor: color }}
              style={{ background: 'rgba(22,22,31,0.6)', border: '1px solid #1E1E2E', borderRadius: '16px', padding: isMobile ? '1rem' : '1.25rem', backdropFilter: 'blur(8px)', cursor: 'default', transition: 'border-color 0.3s ease', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }} />
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', marginBottom: '0.65rem' }}>{icon}</div>
              <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', fontWeight: 600, color: '#F8FAFC', fontFamily: 'Inter, sans-serif', marginBottom: '0.4rem' }}>{name}</div>
              <span style={{ display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '6px', background: `${LEVEL_COLOR[level]}15`, border: `1px solid ${LEVEL_COLOR[level]}30`, color: LEVEL_COLOR[level], fontSize: '0.6rem', fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em' }}>{level.toUpperCase()}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
