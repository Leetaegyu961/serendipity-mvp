import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, AlertTriangle, ExternalLink, ChevronLeft } from 'lucide-react';
import CrewCard from '../components/CrewCard';
import { mockCrewMembers } from '../constants/mockUsers';
import { mockMeetings } from '../constants/mockMeetings';
import { useUser } from '../context/UserContext';

const topicLabels = {
  career:   '취업·이직 고민',
  food:     '맛집 추천',
  leisure:  '공강·여가 이야기',
  interest: '요즘 관심사',
  free:     '아무 주제나 OK',
};

export default function MatchPage() {
  const navigate = useNavigate();
  const { selectedMeeting, selectedTopic } = useUser();
  const meeting = selectedMeeting || mockMeetings[0];
  const { restaurant } = meeting;

  const crewWithMyTopic = mockCrewMembers.map((m) =>
    m.isMe && selectedTopic ? { ...m, topic: topicLabels[selectedTopic] } : m
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', paddingBottom: 40 }}
    >
      {/* 성공 헤더 */}
      <div style={{ background: '#FFFFFF', padding: '52px 20px 24px', textAlign: 'center', position: 'relative' }}>
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로"
          style={{ position: 'absolute', top: 52, left: 20, background: 'none', border: 'none', padding: '4px 2px', cursor: 'pointer', color: 'var(--color-text-primary)' }}
        >
          <ChevronLeft size={22} />
        </button>
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.15 }}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: meeting.bgColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px', fontSize: 28,
          }}
        >
          {meeting.emoji}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <span style={{
            background: meeting.bgColor, color: meeting.accentColor,
            fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 8,
            display: 'inline-block', marginBottom: 10,
          }}>
            {meeting.theme} · 매칭 완료
          </span>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)' }}>
            오늘의 크루를 소개합니다
          </h1>
        </motion.div>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* 크루 카드 2×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {crewWithMyTopic.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <CrewCard member={member} highlight={member.isMe} accentColor={meeting.accentColor} />
            </motion.div>
          ))}
        </div>

        {/* 장소 카드 */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 14 }}>
            확정 정보
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <MapPin size={15} color={meeting.accentColor} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {restaurant.name}
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 2 }}>
                  {restaurant.address}
                </p>
                <a
                  href={restaurant.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    fontSize: 12, color: meeting.accentColor, marginTop: 4, textDecoration: 'none',
                  }}
                >
                  지도 보기 <ExternalLink size={11} />
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Clock size={15} color={meeting.accentColor} />
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                오늘 {meeting.time}
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              background: '#FFF4F0', borderRadius: 8, padding: '10px 12px',
            }}>
              <AlertTriangle size={14} color="#E8521A" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12, color: '#C84410' }}>
                {restaurant.caution}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <button
            className="btn-primary"
            style={{ background: meeting.accentColor }}
            onClick={() => navigate('/session')}
          >
            QR 체크인 준비하기
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
