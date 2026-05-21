export default function SerendipityLogo({ size = 160 }) {
  const r = size * 0.28;
  const cy = size * 0.38;
  const cx1 = size * 0.38;
  const cx2 = size * 0.62;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size * 0.72} viewBox={`0 0 ${size} ${size * 0.72}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* dashed outer circle */}
        <circle
          cx={size / 2}
          cy={cy}
          r={size * 0.44}
          stroke="#C8B8A2"
          strokeWidth="1"
          strokeDasharray="4 6"
          fill="none"
        />
        {/* left orange circle */}
        <circle cx={cx1} cy={cy} r={r} fill="#C8521A" />
        {/* right green circle */}
        <circle cx={cx2} cy={cy} r={r} fill="#3A5F2E" />
        {/* overlap — blend with multiply-like overlap */}
        <circle cx={cx1} cy={cy} r={r} fill="#9A4820" opacity="0" />
        {/* asterisk in center */}
        {[0, 30, 60, 90, 120, 150].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const len = size * 0.07;
          const x1 = size / 2 + Math.cos(rad) * len;
          const y1 = cy + Math.sin(rad) * len;
          const x2 = size / 2 - Math.cos(rad) * len;
          const y2 = cy - Math.sin(rad) * len;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          );
        })}
        {/* decorative dots */}
        <circle cx={size * 0.12} cy={cy * 0.65} r={size * 0.022} fill="#D4A090" opacity="0.6" />
        <circle cx={size * 0.1} cy={cy * 1.25} r={size * 0.016} fill="#D4A090" opacity="0.5" />
        <circle cx={size * 0.88} cy={cy * 0.72} r={size * 0.02} fill="#5A7A50" opacity="0.5" />
        <circle cx={size * 0.9} cy={cy * 1.2} r={size * 0.015} fill="#5A7A50" opacity="0.4" />
      </svg>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: size * 0.22, color: '#1A1A18', letterSpacing: '-0.5px', lineHeight: 1 }}>
        serendipity
      </div>
      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: size * 0.075, color: '#6B6B65', letterSpacing: '0.02em', marginTop: 2 }}>
        우연한 만남, 동명동에서
      </div>
      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: size * 0.058, color: '#9B9B95', letterSpacing: '0.15em', marginTop: 2 }}>
        DONGMYEONG · SOCIAL DINING
      </div>
    </div>
  );
}
