import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

const fadeInUp   = { hidden: { opacity: 0, y: 50  }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const fadeInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger    = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const EXPERIENCE = [{
  role: 'Intern Java Developer', company: 'Digital Crown IT System LLP', client: 'Mahindra & Mahindra',
  period: 'Aug 2025 – Feb 2026', duration: '6 Months · On-Site', type: 'Internship', color: '#F97316',
  points: [
    'Worked on a live project for Mahindra & Mahindra, contributing to real-time software development aligned with IT standards.',
    'Gained hands-on experience in Java backend development, microservices, and production-grade code under senior mentorship.',
    'Demonstrated strong problem-solving and initiative — appreciated by both client-side and internal teams.',
    'Developed understanding of real-world software processes, client communication, and cross-team collaboration.',
  ],
  supervisor: 'Mr. Prashant Bhangare', mentor: 'Ms. Nidhi Singh',
}]

const EDUCATION = [{ degree: 'Bachelor of Engineering', field: 'Artificial Intelligence & Data Science', institution: 'Datta Meghe College of Engineering,Airoli', period: 'May 2022 – 2026', grade: '6.26 CGPA', icon: '🎓', color: '#2563EB' }]

const CERTIFICATIONS = [
  { name: 'Machine Learning A–Z',         issuer: 'Udemy',               icon: '🤖', color: '#8B5CF6' },
  { name: 'Data Analysis with Python',    issuer: 'IBM / Coursera',      icon: '📊', color: '#2563EB' },
  { name: 'Java Programming Masterclass', issuer: 'Udemy',               icon: '☕', color: '#F97316' },
  { name: 'SQL for Data Science',         issuer: 'UC Davis / Coursera', icon: '🗃️', color: '#0EA5E9' },
]

export default function Experience() {
  const isMobile = useIsMobile()
  const expRef = useRef(null); const eduRef = useRef(null); const certRef = useRef(null)
  const expInView  = useInView(expRef,  { once: true, margin: '-80px' })
  const eduInView  = useInView(eduRef,  { once: true, margin: '-80px' })
  const certInView = useInView(certRef, { once: true, margin: '-80px' })

  return (
    <section id="experience" style={{ padding: isMobile ? '5rem 1.25rem' : '7rem 2rem', backgroundColor: '#0A0A0F', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div ref={expRef} initial={{ opacity: 0, y: 50 }} animate={expInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px', border: '1px solid rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.06)', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em', marginBottom: '1rem' }}>JOURNEY</span>
          <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.5rem)' : 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, fontFamily: 'Inter, sans-serif', color: '#F8FAFC', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>Where I've Been & Learned</h2>
          <p style={{ fontSize: '1rem', color: '#475569', fontFamily: 'Inter, sans-serif', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>Real industry exposure, solid education, and certifications that back it up.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isMobile ? '3rem' : '4rem' }}>
          {/* Experience */}
          <div>
            <motion.p initial={{ opacity: 0 }} animate={expInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: '#475569', fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Professional Experience</motion.p>
            <motion.div variants={stagger} initial="hidden" animate={expInView ? 'visible' : 'hidden'}>
              {EXPERIENCE.map((e) => (
                <motion.div key={e.role} variants={fadeInLeft} style={{ position: 'relative', paddingLeft: '1.75rem', marginBottom: '2rem' }}>
                  <div style={{ position: 'absolute', left: 0, top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: e.color, boxShadow: `0 0 10px ${e.color}60` }} />
                  <motion.div whileHover={{ borderColor: e.color }}
                    style={{ background: 'rgba(22,22,31,0.6)', border: '1px solid #1E1E2E', borderRadius: '16px', padding: isMobile ? '1.1rem' : '1.5rem', backdropFilter: 'blur(8px)', transition: 'border-color 0.3s ease', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${e.color}60, transparent)` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', fontWeight: 700, color: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>{e.role}</div>
                        <div style={{ fontSize: '0.85rem', color: '#60A5FA', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{e.company}</div>
                      </div>
                      <span style={{ display: 'inline-block', padding: '0.2rem 0.7rem', borderRadius: '6px', background: `${e.color}15`, border: `1px solid ${e.color}30`, color: e.color, fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>{e.type}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>{e.period}</span>
                      <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#475569' }} />
                      <span style={{ fontSize: '0.75rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>{e.duration}</span>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.8rem', borderRadius: '8px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: '0.85rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>Client:</span>
                      <span style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{e.client}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.85rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {e.points.map((p, pi) => (
                        <li key={pi} style={{ display: 'flex', gap: '0.5rem', fontSize: isMobile ? '0.78rem' : '0.82rem', color: '#475569', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
                          <span style={{ color: '#F97316', flexShrink: 0, marginTop: '2px' }}>→</span>{p}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #1E1E2E' }}>
                      <span style={{ fontSize: '0.7rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>👤 Supervisor: <span style={{ color: '#94A3B8' }}>{e.supervisor}</span></span>
                      <span style={{ fontSize: '0.7rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>· Mentor: <span style={{ color: '#94A3B8' }}>{e.mentor}</span></span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education + Certs */}
          <div>
            <div ref={eduRef} style={{ marginBottom: '3rem' }}>
              <motion.p initial={{ opacity: 0 }} animate={eduInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: '#475569', fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Education</motion.p>
              <motion.div variants={stagger} initial="hidden" animate={eduInView ? 'visible' : 'hidden'}>
                {EDUCATION.map(ed => (
                  <motion.div key={ed.degree} variants={fadeInUp} whileHover={{ borderColor: ed.color }}
                    style={{ background: 'rgba(22,22,31,0.6)', border: '1px solid #1E1E2E', borderRadius: '16px', padding: isMobile ? '1.1rem' : '1.25rem', backdropFilter: 'blur(8px)', transition: 'border-color 0.3s ease', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${ed.color}50, transparent)` }} />
                    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '1.75rem' }}>{ed.icon}</div>
                      <div>
                        <div style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 700, color: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>{ed.degree}</div>
                        <div style={{ fontSize: '0.82rem', color: '#2563EB', fontFamily: 'Inter, sans-serif', fontWeight: 500, marginBottom: '0.25rem' }}>{ed.field}</div>
                        <div style={{ fontSize: '0.78rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>{ed.institution}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.7rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>{ed.period}</span>
                          <span style={{ padding: '0.15rem 0.6rem', borderRadius: '6px', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', color: '#60A5FA', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{ed.grade}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div ref={certRef}>
              <motion.p initial={{ opacity: 0 }} animate={certInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: '#475569', fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Certifications</motion.p>
              <motion.div variants={stagger} initial="hidden" animate={certInView ? 'visible' : 'hidden'} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {CERTIFICATIONS.map(c => (
                  <motion.div key={c.name} variants={fadeInUp} whileHover={{ borderColor: c.color }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1rem', background: 'rgba(22,22,31,0.6)', border: '1px solid #1E1E2E', borderRadius: '12px', backdropFilter: 'blur(8px)', transition: 'border-color 0.3s ease' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${c.color}15`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', flexShrink: 0 }}>{c.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: isMobile ? '0.8rem' : '0.85rem', fontWeight: 600, color: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>{c.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>{c.issuer}</div>
                    </div>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.color, opacity: 0.6, flexShrink: 0 }} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
