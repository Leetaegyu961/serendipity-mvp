import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, Bell, BellOff, ChevronLeft } from 'lucide-react';
import { mockCrewMembers } from '../constants/mockUsers';
import { useUser } from '../context/UserContext';

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = (hovered || value) >= star;
        return (
          <button
            key={star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`${star}점`}
            style={{ background: 'none', border: 'none', padding: 3, cursor: 'pointer' }}
          >
            <Star
              size={22}
              fill={active ? '#F5A623' : 'none'}
              color={active ? '#F5A623' : 'var(--color-border)'}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function ReviewPage() {
  const navigate = useNavigate();
  const { notificationEnabled, setNotificationEnabled } = useUser();
  const [ratings, setRatings] = useState({});
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const others = mockCrewMembers.filter((m) => !m.isMe);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          minHeight: '100vh', background: '#FFFFFF',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 24px', textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          style={{ fontSize: 56, marginBottom: 28 }}
        >
          🎉
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 10, lineHeight: 1.4 }}>
            고마워요!<br />동명동이 더<br />재밌어지고 있어요
          </h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 40 }}>
            다음 번개 알림을 기다려 주세요 🔔
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate('/home')}
          >
            홈으로 돌아가기
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', flexDirection: 'column', paddingBottom: 40 }}
    >
      {/* 헤더 */}
      <div style={{ padding: '52px 20px 20px', borderBottom: '1px solid var(--color-border)' }}>
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로"
          style={{ background: 'none', border: 'none', padding: '0 0 12px 0', cursor: 'pointer', color: 'var(--color-text-primary)', display: 'flex' }}
        >
          <ChevronLeft size={22} />
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 }}>
          오늘 크루 어떠셨나요?
        </h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
          솔직한 후기가 더 좋은 매칭을 만들어요
        </p>
      </div>

      <div style={{ flex: 1, padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* 크루원 별점 */}
        <div className="card" style={{ background: 'var(--color-bg)', boxShadow: 'none' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 16 }}>
            크루원 별점
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {others.map((member) => (
              <div key={member.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#FFFFFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  }}>
                    {['🦊', '🐻', '🦉'][member.id % 3]}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {member.nickname}
                  </span>
                </div>
                <StarRating
                  value={ratings[member.id] || 0}
                  onChange={(v) => setRatings((r) => ({ ...r, [member.id]: v }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 한 줄 후기 */}
        <div className="card" style={{ background: 'var(--color-bg)', boxShadow: 'none' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 12 }}>
            한 줄 후기
          </p>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value.slice(0, 100))}
            placeholder="오늘 대화 중 기억에 남는 것 하나만 적어주세요"
            rows={3}
            style={{
              width: '100%', padding: '12px 14px',
              border: '1.5px solid var(--color-border)',
              borderRadius: 10,
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 14, color: 'var(--color-text-primary)',
              background: '#FFFFFF', resize: 'none', outline: 'none',
              lineHeight: 1.6, transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#E8521A'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; }}
          />
          <div style={{
            textAlign: 'right', marginTop: 6,
            fontSize: 12, color: 'var(--color-text-tertiary)',
          }}>
            {review.length}/100
          </div>
        </div>

        {/* 알림 토글 */}
        <div
          className="card"
          style={{
            background: 'var(--color-bg)', boxShadow: 'none',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setNotificationEnabled(!notificationEnabled)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: notificationEnabled ? '#FFF1EC' : '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {notificationEnabled
                ? <Bell size={18} color="#E8521A" />
                : <BellOff size={18} color="var(--color-text-tertiary)" />
              }
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 2 }}>
                다음 주 평일 번개도 알림 받기
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                매주 월요일 오전 알림
              </p>
            </div>
          </div>
          <div style={{
            width: 44, height: 24, borderRadius: 12, flexShrink: 0,
            background: notificationEnabled ? '#E8521A' : '#D0D6DC',
            position: 'relative', transition: 'background 0.25s',
          }}>
            <div style={{
              position: 'absolute', top: 3,
              left: notificationEnabled ? 22 : 3,
              width: 18, height: 18, borderRadius: '50%',
              background: '#FFFFFF',
              transition: 'left 0.25s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
            }} />
          </div>
        </div>
      </div>

      {/* 제출 버튼 */}
      <div style={{ padding: '0 20px' }}>
        <button className="btn-primary" onClick={() => setSubmitted(true)}>
          후기 완료
        </button>
      </div>
    </motion.div>
  );
}
