import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

const fadeInUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger  = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const projects = [
  {
    title: 'Zero Trust Network Access (ZTNA) Security Framework',
    period: '2025 – 2026',
    desc: 'Designed and implemented an enterprise-grade Zero Trust Network Access (ZTNA) framework that enforces continuous identity verification, Multi-Factor Authentication (MFA), device trust validation, and least-privilege access controls to secure enterprise resources against unauthorized access.',
    tech: ['Python', 'Network Security', 'Access Control', 'MFA'],
    color: '#7C3AED',
    icon: '🛡️',
    featured: false,
    highlights: ['Zero Trust Architecture', 'Least-Privilege Access', 'Enterprise Security'],
  },
  {
    title: 'AI Chatbot with Real-Time Response',
    period: '2024 – 2025',
    desc: 'Designed and developed an AI-powered chatbot with a responsive web interface, enabling real-time, multi-turn conversations. Leveraged Natural Language Processing (NLP), intent classification, and Named Entity Recognition (NER) to deliver context-aware, accurate, and intelligent user interactions.',
    tech: ['Python', 'HTML', 'CSS', 'JavaScript', 'NLP Libraries'],
    color: '#8B5CF6',
    icon: '🤖',
    featured: false,
    highlights: ['Intent Classification', 'NER', 'Real-time Multi-turn'],
  },
  {
    title: 'Restaurant Reviwe & Recommendation System',
    period: '2023 – 2024',
    desc: 'Designed and developed a Machine Learning-powered restaurant recommendation system that analyzes customer reviews and dining preferences to generate personalized recommendations. Leveraged Natural Language Processing (NLP) and sentiment analysis to extract meaningful insights from review data, enhancing recommendation accuracy and user experience.',
    tech: ['Python', 'scikit-learn', 'NLTK', 'Pandas', 'NumPy'],
    color: '#A78BFA',
    icon: '🍽️',
    featured: false,
    highlights: ['Sentiment Analysis', 'NLP Pipeline', 'Collaborative Filtering'],
  },
]

export default function Projects() {
  const isMobile = useIsMobile()
  const titleRef = useRef(null)
  const cardsRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' })

  return (
    <section id="projects" style={{ padding: isMobile ? '5rem 1.25rem' : '7rem 2rem', backgroundColor: '#0A0A0F', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <motion.div ref={titleRef} variants={stagger} initial="hidden" animate={titleInView ? 'visible' : 'hidden'} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span variants={fadeInUp} style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px', border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.06)', color: '#A78BFA', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em', marginBottom: '1rem' }}>PROJECTS</motion.span>
          <motion.h2 variants={fadeInUp} style={{ fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.5rem)' : 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, fontFamily: 'Inter, sans-serif', color: '#F8FAFC', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>
            What I've{' '}
            <span style={{ background: 'linear-gradient(90deg, #7C3AED, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Built</span>
          </motion.h2>
          <motion.p variants={fadeInUp} style={{ fontSize: '1rem', color: '#475569', fontFamily: 'Inter, sans-serif', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Engineering intelligent, data-driven, and secure solutions through real-world projects.
          </motion.p>
        </motion.div>

        <motion.div ref={cardsRef} variants={stagger} initial="hidden" animate={cardsInView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {projects.map((proj) => (
            <motion.div key={proj.title} variants={fadeInUp} whileHover={{ y: -8, borderColor: proj.color + '60' }}
              style={{ background: 'rgba(22,22,31,0.8)', border: `1px solid ${proj.featured ? proj.color + '30' : '#1E1E2E'}`, borderRadius: '20px', padding: '1.75rem', backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s ease', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${proj.color}, transparent)` }} />
              {proj.featured && (
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                  <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '999px', background: `${proj.color}20`, border: `1px solid ${proj.color}40`, color: proj.color, fontSize: '0.6rem', fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>FEATURED</span>
                </div>
              )}

              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{proj.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', fontFamily: 'Inter, sans-serif', marginBottom: '0.3rem' }}>{proj.title}</h3>
              <p style={{ fontSize: '0.75rem', color: proj.color, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em' }}>{proj.period}</p>
              <p style={{ fontSize: '0.88rem', color: '#64748B', fontFamily: 'Inter, sans-serif', lineHeight: 1.75, marginBottom: '1.25rem', flex: 1 }}>{proj.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                {proj.highlights.map(h => (
                  <span key={h} style={{ padding: '0.2rem 0.65rem', borderRadius: '999px', background: `${proj.color}12`, border: `1px solid ${proj.color}30`, color: proj.color, fontSize: '0.7rem', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{h}</span>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {proj.tech.map(t => (
                  <span key={t} style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid #1E1E2E', color: '#64748B', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace' }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
