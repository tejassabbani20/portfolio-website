import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FiCode, FiDatabase, FiTrendingUp, FiCpu } from 'react-icons/fi'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

const fadeInUp   = { hidden: { opacity: 0, y: 50  }, visible: { opacity: 1, y: 0,  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const fadeInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const fadeInRight= { hidden: { opacity: 0, x:  50 }, visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger    = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const highlights = [
  { icon: FiDatabase,   title: 'Data Analytics',      desc: 'Transforming raw data into actionable business insights using Python, SQL, and BI tools.', color: '#2563EB' },
  { icon: FiCpu,        title: 'Machine Learning',     desc: 'Building predictive models and intelligent systems that learn from data patterns.',         color: '#6366F1' },
  { icon: FiTrendingUp, title: 'Business Intelligence',desc: 'Creating interactive dashboards and reports that make complex data easy to understand.',    color: '#0EA5E9' },
  { icon: FiCode,       title: 'Programming',          desc: 'Writing clean, efficient code in Python, Java, and SQL to solve real-world problems.',      color: '#8B5CF6' },
]

export default function About() {
  const isMobile = useIsMobile()
  const leftRef  = useRef(null); const rightRef = useRef(null); const cardsRef = useRef(null)
  const leftInView  = useInView(leftRef,  { once: true, margin: '-80px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' })

  return (
    <section id="about" style={{ padding: isMobile ? '5rem 1.25rem' : '7rem 2rem', backgroundColor: '#0A0A0F', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Title */}
        <motion.div variants={stagger} initial="hidden" animate={leftInView ? 'visible' : 'hidden'} ref={leftRef} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.span variants={fadeInUp} style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px', border: '1px solid rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.06)', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em', marginBottom: '1rem' }}>ABOUT ME</motion.span>
          <motion.h2 variants={fadeInUp} style={{ fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.5rem)' : 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, fontFamily: 'Inter, sans-serif', color: '#F8FAFC', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>Turning Data into Decisions</motion.h2>
          <motion.p variants={fadeInUp} style={{ fontSize: '1rem', color: '#475569', fontFamily: 'Inter, sans-serif', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>A passionate fresher who loves the intersection of data, technology, and business impact.</motion.p>
        </motion.div>

        {/* Two col */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isMobile ? '2.5rem' : '4rem', alignItems: 'center', marginBottom: '3rem' }}>
          {/* Left */}
          <motion.div variants={fadeInLeft} initial="hidden" animate={leftInView ? 'visible' : 'hidden'}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.4rem 0.9rem', borderRadius: '8px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB', boxShadow: '0 0 8px #2563EB' }} />
              <span style={{ color: '#60A5FA', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Available for opportunities</span>
            </div>
            <h3 style={{ fontSize: isMobile ? '1.4rem' : 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, fontFamily: 'Inter, sans-serif', color: '#F8FAFC', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '1.25rem' }}>
              Hi, I'm Tejas —{' '}
              <span style={{ background: 'linear-gradient(90deg, #2563EB, #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>a data enthusiast</span>{' '}fresh out of college.
            </h3>
            <p style={{ fontSize: '1rem', color: '#64748B', fontFamily: 'Inter, sans-serif', lineHeight: 1.9, marginBottom: '1rem' }}>
              I'm a fresher with a strong foundation in{' '}
              <span style={{ color: '#94A3B8' }}>Data Analytics</span>,{' '}
              <span style={{ color: '#94A3B8' }}>Machine Learning</span>, and{' '}
              <span style={{ color: '#94A3B8' }}>Business Intelligence</span>.
              My journey started with curiosity about how data can tell stories and drive meaningful decisions.
            </p>
            <p style={{ fontSize: '1rem', color: '#64748B', fontFamily: 'Inter, sans-serif', lineHeight: 1.9, marginBottom: '2rem' }}>
              I've worked on projects involving predictive modeling, data visualization, and building end-to-end analytics pipelines.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[{ label: 'Location', value: 'India' }, { label: 'Education', value: 'B.Eng. in Ai&Data Science' }, { label: 'Focus', value: 'Data & ML Engineering' }, { label: 'Status', value: 'Open to Work 🟢' }].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#2563EB', fontWeight: 600, minWidth: '90px', letterSpacing: '0.05em' }}>{label}</span>
                  <span style={{ width: '1px', height: '14px', background: '#1E1E2E', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#94A3B8', fontFamily: 'Inter, sans-serif' }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right card */}
          <motion.div ref={rightRef} variants={fadeInRight} initial="hidden" animate={rightInView ? 'visible' : 'hidden'} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: isMobile ? '100%' : '380px' }}>
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}
                style={{ background: 'rgba(22,22,31,0.8)', border: '1px solid #1E1E2E', borderRadius: '20px', padding: '2rem', backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: '#fff', fontFamily: 'Inter, sans-serif', marginBottom: '1.25rem', boxShadow: '0 0 30px rgba(37,99,235,0.3)' }}>TS</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F8FAFC', fontFamily: 'Inter, sans-serif', marginBottom: '0.25rem' }}>Tejas Sabbani</h4>
                <p style={{ fontSize: '0.85rem', color: '#2563EB', fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem', fontWeight: 500 }}>Data Analyst & ML Engineer</p>
                {[{ skill: 'Java,Python & ML', pct: 95 }, { skill: 'Data Analytics', pct: 80 }, { skill: 'SQL & Databases', pct: 90 }, { skill: 'Data Viz & BI', pct: 80 }].map(({ skill, pct }) => (
                  <div key={skill} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontFamily: 'Inter, sans-serif' }}>{skill}</span>
                      <span style={{ fontSize: '0.8rem', color: '#2563EB', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{pct}%</span>
                    </div>
                    <div style={{ height: '4px', background: '#1E1E2E', borderRadius: '2px', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={rightInView ? { width: `${pct}%` } : { width: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, #2563EB, #818CF8)', borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </motion.div>
              {!isMobile && (
                <>
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', top: '-16px', right: '-16px', background: 'rgba(22,22,31,0.95)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '12px', padding: '0.6rem 1rem', backdropFilter: 'blur(12px)', boxShadow: '0 0 20px rgba(37,99,235,0.15)' }}>
                    <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>🎯</div>
                    <div style={{ fontSize: '0.7rem', color: '#60A5FA', fontFamily: 'Inter, sans-serif', fontWeight: 600, textAlign: 'center' }}>Goal-Oriented</div>
                  </motion.div>
                  <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    style={{ position: 'absolute', bottom: '-16px', left: '-16px', background: 'rgba(22,22,31,0.95)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '12px', padding: '0.6rem 1rem', backdropFilter: 'blur(12px)', boxShadow: '0 0 20px rgba(37,99,235,0.15)' }}>
                    <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>⚡</div>
                    <div style={{ fontSize: '0.7rem', color: '#60A5FA', fontFamily: 'Inter, sans-serif', fontWeight: 600, textAlign: 'center' }}>Fast Learner</div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <motion.div ref={cardsRef} variants={stagger} initial="hidden" animate={cardsInView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {highlights.map(({ icon: Icon, title, desc, color }) => (
            <motion.div key={title} variants={fadeInUp} whileHover={{ y: -6, borderColor: color }}
              style={{ background: 'rgba(22,22,31,0.6)', border: '1px solid #1E1E2E', borderRadius: '16px', padding: isMobile ? '1.1rem' : '1.5rem', backdropFilter: 'blur(8px)', cursor: 'default', transition: 'border-color 0.3s ease', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color }}>
                <Icon size={20} />
              </div>
              <h4 style={{ fontSize: isMobile ? '0.85rem' : '1rem', fontWeight: 600, color: '#F8FAFC', fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem' }}>{title}</h4>
              <p style={{ fontSize: isMobile ? '0.75rem' : '0.85rem', color: '#475569', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
