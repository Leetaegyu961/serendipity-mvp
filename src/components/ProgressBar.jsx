export default function ProgressBar({ current, total }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            backgroundColor: i < current ? '#E8521A' : '#E8E5E0',
            transition: 'background-color 0.3s',
          }}
        />
      ))}
    </div>
  );
}
