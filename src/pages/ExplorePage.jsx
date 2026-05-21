import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Clock, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { mockMeetings, statusLabel } from '../constants/mockMeetings';
import { useUser } from '../context/UserContext';

const FILTERS = ['전체', '모집중', '마감임박', '마감'];

export default function ExplorePage() {
  const navigate = useNavigate();
  const { setSelectedMeeting } = useUser();
  const [filter, setFilter] = useState('전체');

  const handleJoin = (meeting) => {
    setSelectedMeeting(meeting);
    navigate('/signup');
  };

  const filtered = mockMeetings.filter((m) => {
    if (filter === '전체') return true;
    return statusLabel[m.status] === filter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: 80 }}
    >
      {/* 헤더 */}
      <div style={{ background: '#FFFFFF', padding: '52px 20px 0' }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>탐색</p>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 16 }}>
          모든 테마 모임
        </h1>

        {/* 필터 탭 */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--color-border)' }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                flex: 1, padding: '10px 0',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: filter === f ? 700 : 500,
                color: filter === f ? '#E8521A' : 'var(--color-text-tertiary)',
                fontFamily: "'Noto Sans KR', sans-serif",
                borderBottom: filter === f ? '2px solid #E8521A' : '2px solid transparent',
                marginBottom: -1,
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
          {filtered.length}개의 모임
        </p>

        {filtered.map((meeting, i) => {
          const isFull = meeting.status === 'matched';
          const filled = meeting.seats.total - meeting.seats.remaining;

          return (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div style={{ height: 4, background: isFull ? '#E5E8EB' : meeting.accentColor }} />
              <div style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: isFull ? 'var(--color-bg)' : meeting.bgColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>
                    {meeting.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: isFull ? 'var(--color-text-tertiary)' : meeting.accentColor }}>
                        {meeting.theme}
                      </span>
                      <span style={{
                        padding: '2px 7px', borderRadius: 5, fontSize: 10, fontWeight: 700,
                        background: isFull ? 'var(--color-bg)' : meeting.status === 'closing' ? '#FFF1EC' : '#E8F5E9',
                        color: isFull ? 'var(--color-text-tertiary)' : meeting.status === 'closing' ? '#C84410' : '#2C5F2E',
                      }}>
                        {statusLabel[meeting.status]}
                      </span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: isFull ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)' }}>
                      {meeting.title}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
                  {meeting.description}
                </p>

                <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                  {Array.from({ length: meeting.seats.total }).map((_, i) => (
                    <div key={i} style={{
                      flex: 1, height: 4, borderRadius: 2,
                      background: i < filled ? (isFull ? '#ADB5BD' : meeting.accentColor) : 'var(--color-bg)',
                    }} />
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                      <Users size={12} /> {isFull ? '마감' : `${meeting.seats.remaining}자리 남음`}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                      <Clock size={12} /> {meeting.time}
                    </span>
                  </div>
                  {!isFull && (
                    <button
                      onClick={() => handleJoin(meeting)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 2,
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 13, fontWeight: 700, color: meeting.accentColor,
                        fontFamily: "'Noto Sans KR', sans-serif",
                      }}
                    >
                      참가하기 <ChevronRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-tertiary)' }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>🔍</p>
            <p style={{ fontSize: 14 }}>해당하는 모임이 없어요</p>
          </div>
        )}
      </div>

      <BottomNav />
    </motion.div>
  );
}
