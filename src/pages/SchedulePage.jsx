import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useUser } from '../context/UserContext';

export default function SchedulePage() {
  const navigate = useNavigate();
  const { selectedMeeting } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: 80 }}
    >
      {/* 헤더 */}
      <div style={{ background: '#FFFFFF', padding: '52px 20px 20px' }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>내 일정</p>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          신청한 모임
        </h1>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {selectedMeeting ? (
          <>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-tertiary)', letterSpacing: '0.05em' }}>
              예정된 모임 · 1개
            </p>

            {/* 신청한 모임 카드 */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: 4, background: selectedMeeting.accentColor }} />
              <div style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: selectedMeeting.bgColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>
                    {selectedMeeting.emoji}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: selectedMeeting.accentColor, marginBottom: 2 }}>
                      {selectedMeeting.theme}
                    </p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {selectedMeeting.title}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MapPin size={14} color={selectedMeeting.accentColor} />
                    <span style={{ fontSize: 13, color: 'var(--color-text-primary)', fontWeight: 600 }}>
                      {selectedMeeting.restaurant.name}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                      {selectedMeeting.restaurant.distance}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Clock size={14} color={selectedMeeting.accentColor} />
                    <span style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>
                      오늘 {selectedMeeting.time}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/match')}
                  style={{
                    width: '100%', height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                    background: selectedMeeting.bgColor,
                    border: 'none', borderRadius: 10, cursor: 'pointer',
                    fontSize: 14, fontWeight: 700, color: selectedMeeting.accentColor,
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  크루 확인하기 <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* 빈 상태 */
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '60px 0', gap: 16, textAlign: 'center',
          }}>
            <div style={{ fontSize: 52 }}>📅</div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>
                신청한 모임이 없어요
              </p>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                홈에서 마음에 드는 모임을<br />신청해보세요
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => navigate('/home')}
              style={{ width: 'auto', padding: '0 28px' }}
            >
              모임 보러 가기
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </motion.div>
  );
}
