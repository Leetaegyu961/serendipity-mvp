import TagPill from './TagPill';

export default function CrewCard({ member, highlight, accentColor = '#E8521A' }) {
  const emojis = ['😺', '🦊', '🐻', '🦉', '🐧'];
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 14,
      padding: '14px',
      border: highlight ? `1.5px solid ${accentColor}` : '1px solid var(--color-border)',
      position: 'relative',
    }}>
      {highlight && (
        <span style={{
          position: 'absolute', top: 8, right: 10,
          fontSize: 10, fontWeight: 700, color: accentColor,
        }}>나</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          backgroundColor: highlight ? '#FFF1EC' : 'var(--color-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 17, flexShrink: 0,
        }}>
          {emojis[member.id % emojis.length]}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
            {member.nickname}
          </div>
          <span style={{
            fontSize: 11, color: 'var(--color-text-tertiary)',
          }}>
            {member.type}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: member.topic ? 8 : 0 }}>
        {member.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
      {member.topic && (
        <div style={{
          fontSize: 11, color: 'var(--color-text-tertiary)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          💬 {member.topic}
        </div>
      )}
    </div>
  );
}
