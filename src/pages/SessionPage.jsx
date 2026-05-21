import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { QrCode, ChevronRight, ChevronLeft } from 'lucide-react';
import BalanceCard from '../components/BalanceCard';
import { balanceCardsByTopic } from '../constants/mockCards';
import { useUser } from '../context/UserContext';

export default function SessionPage() {
  const navigate = useNavigate();
  const { setIsCheckedIn, selectedTopic } = useUser();
  const balanceCards = balanceCardsByTopic[selectedTopic] || balanceCardsByTopic.free;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toast, setToast] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  const isLast = currentIndex >= balanceCards.length - 1;
  const currentCard = balanceCards[currentIndex];

  const handleNext = () => {
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  const handleCheckIn = () => {
    if (checkedIn) return;
    setCheckedIn(true);
    setIsCheckedIn(true);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="page"
    >
      {/* 토스트 */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{
              position: 'fixed', top: 24, left: '50%',
              transform: 'translateX(-50%)',
              background: '#191F28', color: 'white',
              padding: '12px 20px', borderRadius: 10,
              fontSize: 14, fontWeight: 600,
              fontFamily: "'Noto Sans KR', sans-serif",
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              zIndex: 999, whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <span style={{ color: '#0DC08E' }}>✓</span> 체크인 완료!
          </motion.div>
        )}
      </AnimatePresence>

      {/* 헤더 */}
      <div className="page-header">
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로"
          style={{ background: 'none', border: 'none', padding: '0 0 10px 0', cursor: 'pointer', color: 'var(--color-text-primary)', display: 'flex' }}
        >
          <ChevronLeft size={22} />
        </button>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
          밸런스 게임
        </p>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 16 }}>
          오늘의 대화 주제
        </h1>

        {/* QR 체크인 */}
        <button
          onClick={handleCheckIn}
          disabled={checkedIn}
          aria-label="QR 체크인"
          style={{
            width: '100%', height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: checkedIn ? '#F2F3F5' : '#191F28',
            color: checkedIn ? 'var(--color-success)' : '#FFFFFF',
            border: 'none', borderRadius: 10, cursor: checkedIn ? 'default' : 'pointer',
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 14, fontWeight: 700,
            transition: 'all 0.25s',
          }}
        >
          <QrCode size={16} />
          {checkedIn ? '체크인 완료 ✓' : '매장 도착 시 QR 체크인'}
        </button>
      </div>

      {/* 카드 영역 */}
      <div style={{ flex: 1, padding: '20px 20px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* 진행 표시 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, display: 'flex', gap: 4 }}>
            {balanceCards.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i <= currentIndex ? '#E8521A' : 'var(--color-border)',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
          <span style={{
            fontSize: 13, fontWeight: 700, color: '#E8521A',
            fontFamily: "'Noto Sans KR', sans-serif",
            flexShrink: 0,
          }}>
            {currentIndex + 1}/{balanceCards.length}
          </span>
        </div>

        {/* 카드 */}
        <AnimatePresence mode="wait">
          <BalanceCard key={currentIndex} card={currentCard} />
        </AnimatePresence>

        {/* 이전/다음 질문 버튼 */}
        <div style={{ display: 'flex', gap: 8 }}>
          {currentIndex > 0 && (
            <button
              className="btn-secondary"
              onClick={() => setCurrentIndex((i) => i - 1)}
              aria-label="이전 질문"
              style={{ flex: 1 }}
            >
              <ChevronLeft size={18} style={{ marginRight: 4 }} />
              이전
            </button>
          )}
          {!isLast && (
            <button
              className="btn-secondary"
              onClick={handleNext}
              aria-label="다음 질문"
              style={{ flex: 1 }}
            >
              다음 질문
              <ChevronRight size={18} style={{ marginLeft: 4 }} />
            </button>
          )}
        </div>

        {/* 후기 작성 버튼 (항상 노출) */}
        <button
          className="btn-primary"
          onClick={() => navigate('/review')}
          aria-label="후기 작성하기"
        >
          후기 작성하기
        </button>

        {/* 안내 텍스트 */}
        <p style={{
          textAlign: 'center', fontSize: 12,
          color: 'var(--color-text-tertiary)',
          fontFamily: "'Noto Sans KR', sans-serif",
        }}>
          각 질문에 자유롭게 이야기해보세요
        </p>
      </div>
    </motion.div>
  );
}
