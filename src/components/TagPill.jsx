export default function TagPill({ label, selected, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled && !selected}
      aria-pressed={selected}
      style={{
        padding: '6px 14px',
        borderRadius: 8,
        border: 'none',
        backgroundColor: selected ? '#FFF1EC' : 'var(--color-bg)',
        color: selected ? '#E8521A' : 'var(--color-text-secondary)',
        fontFamily: "'Noto Sans KR', sans-serif",
        fontSize: 13,
        fontWeight: selected ? 700 : 500,
        cursor: (disabled && !selected) ? 'not-allowed' : onClick ? 'pointer' : 'default',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
        opacity: (disabled && !selected) ? 0.4 : 1,
      }}
    >
      {label}
    </button>
  );
}
