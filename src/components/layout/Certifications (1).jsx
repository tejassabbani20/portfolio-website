import { motion } from 'framer-motion'

const certifications = [
  {
    title:    'Business Intelligence using Power BI',
    issuer:   'Skill Nation',
    desc:     'Data visualisation, dashboards, business analytics',
  },
  {
    title:    'Python using AI',
    issuer:   'AI for Techies',
    desc:     'Python applications in Artificial Intelligence and automation',
  },
  {
    title:    'Python Basic Level-I Certification',
    issuer:   'University of Mumbai',
    desc:     'Core Python programming and problem-solving',
  },
  {
    title:    'Web Development Workshop Series',
    issuer:   'SHAIDS, Datta Meghe College of Engineering',
    desc:     'Frontend & backend fundamentals',
  },
  {
    title:    'AI Tools Workshop',
    issuer:   'Skill Nation',
    desc:     'Modern AI tools and productivity applications',
  },
]

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      style={{
        padding:         '6rem 2rem',
        backgroundColor: '#0A0A0F',
        minHeight:       '100vh',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{
            fontSize:     '0.8rem',
            fontWeight:   600,
            letterSpacing:'0.15em',
            color:        '#2563EB',
            fontFamily:   'Inter, sans-serif',
            textTransform:'uppercase',
            marginBottom: '0.5rem',
          }}>
            Credentials
          </p>
          <h2 style={{
            fontSize:   'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color:      '#F8FAFC',
            fontFamily: 'Inter, sans-serif',
            margin:     0,
          }}>
            Certifications & Training
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap:                 '1.25rem',
          }}
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                background:   '#0F0F1A',
                border:       '1px solid #1E1E2E',
                borderRadius: '12px',
                padding:      '1.5rem',
                cursor:       'default',
                transition:   'border-color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#2563EB')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#1E1E2E')}
            >
              {/* Icon */}
              <div style={{
                width:        '40px',
                height:       '40px',
                borderRadius: '8px',
                background:   'rgba(37,99,235,0.12)',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15l-4 4 1-5-4-3 5-1 2-5 2 5 5 1-4 3 1 5-4-4z" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize:     '1rem',
                fontWeight:   600,
                color:        '#F8FAFC',
                fontFamily:   'Inter, sans-serif',
                margin:       '0 0 0.4rem 0',
                lineHeight:   1.4,
              }}>
                {cert.title}
              </h3>

              {/* Issuer */}
              <p style={{
                fontSize:     '0.8rem',
                fontWeight:   500,
                color:        '#2563EB',
                fontFamily:   'Inter, sans-serif',
                margin:       '0 0 0.5rem 0',
              }}>
                {cert.issuer}
              </p>

              {/* Description */}
              <p style={{
                fontSize:   '0.8rem',
                color:      '#64748B',
                fontFamily: 'Inter, sans-serif',
                margin:     0,
                lineHeight: 1.5,
              }}>
                {cert.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
