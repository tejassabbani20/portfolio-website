import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

const PROJECTS = [
  { emoji: '🛡️', title: 'Credit Card Fraud Detection', tagline: 'Catching fraud before it costs a cent.', desc: 'Real-time ML model to detect fraudulent transactions using XGBoost and ensemble methods with SMOTE oversampling.', problem: 'Financial institutions lose billions annually to undetected fraud.', solution: 'XGBoost + SMOTE achieved 97.3% recall on minority class.', impact: 'Flags 97%+ of fraudulent transactions in <200ms.', tech: ['Python', 'XGBoost', 'Pandas', 'Scikit-Learn', 'SMOTE'], color: '#EF4444', github: '#', demo: '#' },
  { emoji: '📡', title: 'Arduino-Based Radar System', tagline: 'Hardware meets machine intelligence.', desc: 'Object detection radar using Arduino UNO + HC-SR04 ultrasonic sensor with optimized scanning algorithm.', problem: 'Affordable obstacle detection for robotics and automation.', solution: 'Arduino + Processing IDE visualized live sweep with <5° angular resolution.', impact: 'Functional detection system under $15 total hardware cost.', tech: ['Arduino', 'C++', 'Processing IDE', 'HC-SR04', 'Servo Motor'], color: '#0EA5E9', github: '#', demo: '#' },
  { emoji: '🎯', title: 'Cross-Domain Recommendation System', tagline: 'Personalization at scale.', desc: 'Advanced recommendation engine combining collaborative and content-based filtering with TF-IDF similarity.', problem: 'Generic recommendations fail users with cross-domain interests.', solution: 'Hybrid CF + CBF pipeline with cosine distance scoring.', impact: '40% increase in simulated click-through rates vs. baseline.', tech: ['Python', 'TF-IDF', 'Pandas', 'NumPy', 'Scikit-Learn'], color: '#8B5CF6', github: '#', demo: '#' },
  { emoji: '🤖', title: 'AI-Powered Code Review Assistant', tagline: 'Like having a senior dev in your IDE.', desc: 'LLM-powered assistant that analyzes code for syntax quality, maintainability, and logic errors.', problem: 'Code reviews are bottlenecks in fast-moving teams.', solution: 'Fine-tuned prompt pipeline with context-aware analysis.', impact: 'Reduced manual review time by ~60% in test scenarios.', tech: ['Python', 'LLM', 'NLP', 'Prompt Engineering', 'Pandas'], color: '#10B981', github: '#', demo: '#' },
]

function ProjectCard({ project, index, isMobile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 25 }); const sy = useSpring(y, { stiffness: 200, damping: 25 })
  const rotX = useTransform(sy, [-0.5, 0.5], [5, -5]); const rotY = useTransform(sx, [-0.5, 0.5], [-5, 5])
  const onMove = (e) => { if (isMobile) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5) }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: isMobile ? 0 : rotX, rotateY: isMobile ? 0 : rotY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove} onMouseLeave={onLeave} whileHover={{ borderColor: project.color }}>
      <div style={{ background: 'rgba(22,22,31,0.6)', border: '1px solid #1E1E2E', borderRadius: '20px', padding: isMobile ? '1.25rem' : '1.75rem', backdropFilter: 'blur(8px)', cursor: 'default', transition: 'border-color 0.3s ease', position: 'relative', overflow: 'hidden', height: '100%' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)` }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${project.color}15`, border: `1px solid ${project.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{project.emoji}</div>
            <div>
              <div style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 700, color: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>{project.title}</div>
              <div style={{ fontSize: '0.75rem', color: project.color, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{project.tagline}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
            {[{ icon: FiGithub, href: project.github,}, { icon: FiExternalLink, href: "https://codesage-nexus-1.onrender.com/"}].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid #1E1E2E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#F8FAFC'} onMouseLeave={e => e.currentTarget.style.color='#475569'}><Icon size={13} /></a>
            ))}
          </div>
        </div>
        <p style={{ fontSize: isMobile ? '0.8rem' : '0.85rem', color: '#64748B', fontFamily: 'Inter, sans-serif', lineHeight: 1.7, marginBottom: '1rem' }}>{project.desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
          {[{ l: 'Problem', v: project.problem, c: '#EF4444' }, { l: 'Solution', v: project.solution, c: '#0EA5E9' }, { l: 'Impact', v: project.impact, c: '#10B981' }].map(({ l, v, c }) => (
            <div key={l} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.75rem' }}>
              <span style={{ color: c, fontWeight: 700, fontFamily: 'Inter, sans-serif', minWidth: '52px', flexShrink: 0 }}>{l}</span>
              <span style={{ color: '#475569', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tech.map(t => (
            <span key={t} style={{ padding: '0.2rem 0.55rem', borderRadius: '6px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)', color: '#60A5FA', fontSize: '0.65rem', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: '-80px' })
  const isMobile = useIsMobile()
  return (
    <section id="projects" style={{ padding: isMobile ? '5rem 1.25rem' : '7rem 2rem', backgroundColor: '#0A0A0F', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px', border: '1px solid rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.06)', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em', marginBottom: '1rem' }}>PROJECTS</span>
          <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.5rem)' : 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, fontFamily: 'Inter, sans-serif', color: '#F8FAFC', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>Things I've Actually Built</h2>
          <p style={{ fontSize: '1rem', color: '#475569', fontFamily: 'Inter, sans-serif', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>Real problems. Real data. Real impact.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.25rem' }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} isMobile={isMobile} />)}
        </div>
      </div>
    </section>
  )
}
