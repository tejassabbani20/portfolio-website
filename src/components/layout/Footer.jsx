import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{ padding: '2.5rem 2rem', backgroundColor: '#0A0A0F', borderTop: '1px solid #1E1E2E' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontSize: '0.85rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>
          © {new Date().getFullYear()} <span style={{ color: '#94A3B8', fontWeight: 600 }}>Tejas Sabbani</span> · Built with React + Framer Motion
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', display: 'inline-block', boxShadow: '0 0 6px #16A34A' }} />
          Open to opportunities
        </motion.div>
      </div>
    </footer>
  )
}
