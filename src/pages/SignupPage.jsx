import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { mockMeetings } from '../constants/mockMeetings';

export default function SignupPage() {
  const navigate = useNavigate();
  const { selectedMeeting } = useUser();
  const meeting = selectedMeeting || mockMeetings[0];

  const [phase, setPhase] = useState('payment');
  const [dots, setDots] = useState(1);

  useEffect(() => {
    if (phase !== 'waiting') return;
    const iv = setInterval(() => setDots((d) => (d % 3) + 1), 500);
    const t = setTimeout(() => navigate('/match'), 3000);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [phase, navigate]);

  if (phase === 'waiting') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          minHeight: '100vh', background: '#FFFFFF',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '0 24px',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 52, height: 52, borderRadius: '50%',
            border: '3px solid var(--color-bg)',
            borderTopColor: meeting.accentColor,
            marginBottom: 28,
          }}
        />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 10, textAlign: 'center' }}>
          신청 확인 중{'.'.repeat(dots)}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'center', lineHeight: 1.6 }}>
          잠시 후 크루를 소개해 드릴게요
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}
    >
      {/* 헤더 */}
      <div style={{ padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로"
          style={{ background: 'none', border: 'none', padding: '4px 2px', cursor: 'pointer', color: 'var(--color-text-primary)' }}
        >
          <ChevronLeft size={22} />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>참가 신청</h1>
      </div>

      <div style={{ flex: 1, padding: '8px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* 선택한 모임 */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 18px',
          background: meeting.bgColor,
          borderRadius: 14,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, flexShrink: 0,
          }}>
            {meeting.emoji}
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: meeting.accentColor, marginBottom: 2 }}>
              {meeting.theme}
            </p>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 1 }}>
              {meeting.title}
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              {meeting.restaurant.name} · {meeting.time}
            </p>
          </div>
        </div>

        {/* 금액 */}
        <div style={{ padding: '24px 4px', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>참가비</p>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 52, color: 'var(--color-text-primary)', lineHeight: 1,
          }}>
            12,000
          </div>
          <div style={{ fontSize: 18, color: 'var(--color-text-secondary)', marginTop: 2 }}>원</div>
        </div>

        {/* 포함 내역 */}
        <div className="card" style={{ background: 'var(--color-bg)', boxShadow: 'none' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 12 }}>포함 내역</p>
          {['점심 식사 또는 음료', '아이스브레이킹 키트', `${meeting.theme} 테마 대화 카드`].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'var(--color-success)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Check size={12} color="white" strokeWidth={3} />
              </div>
              <span style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* 환불 정책 */}
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', textAlign: 'center', lineHeight: 1.7 }}>
          매칭 전 취소 시 전액 환불<br />
          매칭 후 취소 / 노쇼 시 환불 불가
        </p>
      </div>

      <div style={{ padding: '0 20px 40px' }}>
        <button
          className="btn-primary"
          style={{ background: meeting.accentColor }}
          onClick={() => setPhase('waiting')}
        >
          12,000원 결제하고 신청하기
        </button>
      </div>
    </motion.div>
  );
}
