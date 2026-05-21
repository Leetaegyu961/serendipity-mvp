import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import TagPill from '../components/TagPill';
import { useUser } from '../context/UserContext';
import { topicOptions } from '../constants/mockCards';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { nickname, selectedTags, selectedTopic, notificationEnabled, setNotificationEnabled } = useUser();

  const topicLabel = topicOptions.find((t) => t.id === selectedTopic);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: 80 }}
    >
      {/* 헤더 */}
      <div style={{ background: '#FFFFFF', padding: '52px 20px 24px' }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>내 프로필</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#FFF1EC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, flexShrink: 0,
          }}>
            😺
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 2 }}>
              {nickname || '닉네임 없음'}
            </h1>
            <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>익명 프로필</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* 취향 키워드 */}
        <div className="card">
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 12 }}>
            취향 키워드
          </p>
          {selectedTags.length > 0 ? (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {selectedTags.map((t) => <TagPill key={t} label={t} selected />)}
            </div>
          ) : (
            <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>아직 선택하지 않았어요</p>
          )}
        </div>

        {/* 대화 주제 */}
        <div className="card">
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 12 }}>
            선호 대화 주제
          </p>
          {topicLabel ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{topicLabel.emoji}</span>
              <span style={{ fontSize: 14, color: 'var(--color-text-primary)', fontWeight: 600 }}>
                {topicLabel.label}
              </span>
            </div>
          ) : (
            <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>아직 선택하지 않았어요</p>
          )}
        </div>

        {/* 알림 설정 */}
        <div
          className="card"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setNotificationEnabled(!notificationEnabled)}
        >
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 2 }}>
              평일 번개 알림
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
              매주 월요일 오전 알림
            </p>
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
              background: '#FFFFFF', transition: 'left 0.25s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
            }} />
          </div>
        </div>

        {/* 프로필 재설정 */}
        <button
          onClick={() => navigate('/onboarding')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', height: 48,
            background: 'none', border: '1px solid var(--color-border)',
            borderRadius: 12, cursor: 'pointer',
            fontSize: 14, fontWeight: 600, color: 'var(--color-text-secondary)',
            fontFamily: "'Noto Sans KR', sans-serif",
          }}
        >
          <RefreshCw size={15} />
          프로필 다시 설정하기
        </button>
      </div>

      <BottomNav />
    </motion.div>
  );
}
