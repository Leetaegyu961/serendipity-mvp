const styles = {
  recruiting: { bg: '#E8F5E9', color: '#2C5F2E', dot: '#0DC08E' },
  closing:    { bg: '#FFF1EC', color: '#C84410', dot: '#E8521A' },
  matched:    { bg: 'var(--color-bg)', color: 'var(--color-text-secondary)', dot: '#ADB5BD' },
};

const labels = { recruiting: '모집중', closing: '마감임박', matched: '매칭완료' };

export default function StatusBadge({ status = 'recruiting', label }) {
  const s = styles[status] || styles.recruiting;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 6,
      backgroundColor: s.bg, color: s.color,
      fontSize: 12, fontWeight: 700,
      fontFamily: "'Noto Sans KR', sans-serif",
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: '50%',
        backgroundColor: s.dot,
        animation: status === 'recruiting' ? 'dot-pulse 1.5s infinite' : 'none',
      }} />
      {label || labels[status]}
      <style>{`
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </span>
  );
}
