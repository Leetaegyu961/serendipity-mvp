import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Clock, ChevronRight, Sparkles } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { mockMeetings, statusLabel } from '../constants/mockMeetings';
import { useUser } from '../context/UserContext';

function MeetingCard({ meeting, onJoin, recommended }) {
  const { seats, status } = meeting;
  const filled = seats.total - seats.remaining;
  const isFull = status === 'matched';

  const statusStyle = {
    recruiting: { bg: '#E8F5E9', color: '#2C5F2E' },
    closing:    { bg: '#FFF1EC', color: '#C84410' },
    matched:    { bg: 'var(--color-bg)', color: 'var(--color-text-tertiary)' },
  }[status];

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ height: 4, background: isFull ? '#E5E8EB' : meeting.accentColor }} />
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: isFull ? 'var(--color-bg)' : meeting.bgColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>
              {meeting.emoji}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: isFull ? 'var(--color-text-tertiary)' : meeting.accentColor }}>
                  {meeting.theme}
                </span>
                <span style={{
                  padding: '2px 7px', borderRadius: 5,
                  background: statusStyle.bg, color: statusStyle.color,
                  fontSize: 10, fontWeight: 700,
                }}>
                  {statusLabel[status]}
                </span>
              </div>
              <p style={{
                fontSize: 15, fontWeight: 700,
                color: isFull ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
              }}>
                {meeting.title}
              </p>
            </div>
          </div>
        </div>

        {/* 추천 이유 */}
        {recommended && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: meeting.bgColor, borderRadius: 8,
            padding: '8px 12px', marginBottom: 12,
          }}>
            <Sparkles size={12} color={meeting.accentColor} />
            <span style={{ fontSize: 12, color: meeting.accentColor, fontWeight: 600 }}>
              {recommended} 취향과 잘 맞아요
            </span>
          </div>
        )}

        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
          {meeting.description}
        </p>

        {/* 자리 현황 */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
          {Array.from({ length: seats.total }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 5, borderRadius: 3,
              background: i < filled ? (isFull ? '#ADB5BD' : meeting.accentColor) : 'var(--color-bg)',
            }} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
              <Users size={12} /> {isFull ? '마감' : `${seats.remaining}자리 남음`}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
              <Clock size={12} /> {meeting.time}
            </span>
          </div>
          {!isFull && (
            <button
              onClick={() => onJoin(meeting)}
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
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { nickname, selectedTags, selectedTopic, setSelectedMeeting } = useUser();

  const handleJoin = (meeting) => {
    setSelectedMeeting(meeting);
    navigate('/signup');
  };

  // 태그 또는 주제가 매칭되면 추천, 둘 다 매칭되면 우선순위↑
  const getMatchReason = (meeting) => {
    const tagMatch = selectedTags.find((tag) => meeting.tags.includes(tag));
    const topicMatch = selectedTopic && meeting.relatedTopics?.includes(selectedTopic);
    if (tagMatch && topicMatch) return { reason: `${tagMatch} · 관심 주제`, score: 2 };
    if (tagMatch) return { reason: tagMatch, score: 1 };
    if (topicMatch) return { reason: '관심 주제', score: 1 };
    return null;
  };

  const available = mockMeetings.filter((m) => m.status !== 'matched');
  const recommended = available
    .filter((m) => getMatchReason(m))
    .sort((a, b) => (getMatchReason(b)?.score || 0) - (getMatchReason(a)?.score || 0));
  const others = available.filter((m) => !getMatchReason(m));

  const hasOnboarded = selectedTags.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: 80 }}
    >
      {/* 헤더 */}
      <div style={{ background: '#FFFFFF', padding: '52px 20px 20px' }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>
          {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
        </p>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 2 }}>
          {hasOnboarded ? `${nickname}님을 위한 추천` : '오늘의 모임'}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
          {hasOnboarded
            ? '취향을 분석해서 골라봤어요'
            : '프로필을 설정하면 맞춤 추천을 드려요'}
        </p>

        {/* 취향 태그 */}
        {hasOnboarded && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            {selectedTags.map((t) => (
              <span key={t} style={{
                padding: '4px 10px', borderRadius: 6,
                background: '#FFF1EC', color: '#E8521A',
                fontSize: 12, fontWeight: 700,
              }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* 온보딩 미완료 */}
        {!hasOnboarded && (
          <div style={{
            background: '#FFF1EC', borderRadius: 14,
            padding: '16px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#E8521A', marginBottom: 2 }}>취향 설정하고 추천받기</p>
              <p style={{ fontSize: 12, color: '#C84410' }}>딱 맞는 모임을 찾아드릴게요</p>
            </div>
            <button
              onClick={() => navigate('/onboarding')}
              style={{
                background: '#E8521A', color: '#FFFFFF',
                border: 'none', borderRadius: 8, padding: '8px 14px',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              설정하기
            </button>
          </div>
        )}

        {/* 추천 모임 */}
        {hasOnboarded && recommended.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={13} color="#E8521A" />
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-tertiary)', letterSpacing: '0.05em' }}>
                추천 모임 · {recommended.length}개
              </p>
            </div>
            {recommended.map((meeting, i) => (
              <motion.div key={meeting.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <MeetingCard meeting={meeting} onJoin={handleJoin} recommended={getMatchReason(meeting)?.reason} />
              </motion.div>
            ))}
          </>
        )}

        {/* 다른 모임 */}
        {others.length > 0 && (
          <>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-tertiary)', letterSpacing: '0.05em', marginTop: 4 }}>
              {hasOnboarded ? '다른 모임' : '모집 중'} · {others.length}개
            </p>
            {others.map((meeting, i) => (
              <motion.div key={meeting.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <MeetingCard meeting={meeting} onJoin={handleJoin} />
              </motion.div>
            ))}
          </>
        )}

        {/* 추천은 있는데 다른 모임 없을 때 */}
        {hasOnboarded && recommended.length > 0 && others.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-text-tertiary)', padding: '4px 0' }}>
            모든 모임이 취향과 맞아요 🎉
          </p>
        )}

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-text-tertiary)', padding: '8px 0' }}>
          매일 오전 11시 모집 시작 · 선착순 마감
        </p>
      </div>

      <BottomNav />
    </motion.div>
  );
}
