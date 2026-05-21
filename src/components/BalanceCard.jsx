import { motion } from 'framer-motion';

export default function BalanceCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        width: '100%',
        background: '#191F28',
        borderRadius: 20,
        padding: '28px 24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      }}
    >
      <div style={{
        fontSize: 11, fontWeight: 700, color: '#E8521A',
        fontFamily: "'Noto Sans KR', sans-serif",
        letterSpacing: '0.12em', marginBottom: 16,
      }}>
        밸런스 게임
      </div>
      <div style={{
        fontSize: 17, fontWeight: 700, color: '#FFFFFF',
        fontFamily: "'Noto Sans KR', sans-serif",
        lineHeight: 1.6, marginBottom: 24,
      }}>
        {card.description}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{
          flex: 1, padding: '14px 8px',
          background: 'rgba(232,82,26,0.12)',
          border: '1px solid rgba(232,82,26,0.3)',
          borderRadius: 12, textAlign: 'center',
          color: '#FF8A65', fontSize: 14, fontWeight: 600,
          fontFamily: "'Noto Sans KR', sans-serif",
          lineHeight: 1.3,
        }}>
          A<br />{card.optionA}
        </div>
        <div style={{
          flex: 1, padding: '14px 8px',
          background: 'rgba(13,192,142,0.1)',
          border: '1px solid rgba(13,192,142,0.3)',
          borderRadius: 12, textAlign: 'center',
          color: '#0DC08E', fontSize: 14, fontWeight: 600,
          fontFamily: "'Noto Sans KR', sans-serif",
          lineHeight: 1.3,
        }}>
          B<br />{card.optionB}
        </div>
      </div>
    </motion.div>
  );
}
