import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SerendipityLogo from '../components/SerendipityLogo';

export default function SplashPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px 48px',
        gap: 40,
      }}
    >
      {/* 로고 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <SerendipityLogo size={180} />
      </motion.div>

      {/* 문구 + 버튼 묶음 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}
      >
        <h1 style={{
          fontSize: 26, fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.4, textAlign: 'center',
          fontFamily: "'Noto Sans KR', sans-serif",
          letterSpacing: '-0.5px',
        }}>
          우연이 만든 오늘의 인연
        </h1>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button
            className="btn-primary"
            onClick={() => navigate('/onboarding')}
            aria-label="서비스 시작하기"
          >
            시작하기
          </button>
          <p style={{
            textAlign: 'center',
            fontSize: 13, color: 'var(--color-text-tertiary)',
            fontFamily: "'Noto Sans KR', sans-serif",
          }}>
            오늘도 동명동 골목은 열려있어요
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
