import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import TagPill from '../components/TagPill';
import { useUser } from '../context/UserContext';
import { interestKeywords, topicOptions } from '../constants/mockCards';
import { autoNicknames } from '../constants/mockUsers';

const stepVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { nickname, setNickname, selectedTags, toggleTag, selectedTopic, setSelectedTopic } = useUser();

  const reroll = () => {
    const others = autoNicknames.filter((n) => n !== nickname);
    setNickname(others[Math.floor(Math.random() * others.length)]);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/home');
  };

  const canNext = (step === 1 && nickname.trim().length > 0) || (step === 2 && selectedTags.length > 0) || (step === 3 && !!selectedTopic);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}
    >
      {/* 헤더 */}
      <div style={{ padding: '52px 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            aria-label="이전"
            style={{ background: 'none', border: 'none', padding: '4px 2px', cursor: 'pointer', color: 'var(--color-text-primary)', flexShrink: 0 }}
          >
            <ChevronLeft size={22} />
          </button>
        )}
        <div style={{ flex: 1 }}>
          <ProgressBar current={step} total={3} />
        </div>
        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', flexShrink: 0 }}>
          {step}/3
        </span>
      </div>

      {/* 스텝 콘텐츠 */}
      <div style={{ flex: 1, padding: '32px 24px 0', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.22 }}>
              <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>내 익명 닉네임</p>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.35, marginBottom: 32 }}>
                이 이름으로<br />시작할게요
              </h2>
              <div style={{
                background: 'var(--color-bg)', borderRadius: 16,
                padding: '28px 20px', display: 'flex',
                flexDirection: 'column', alignItems: 'center', gap: 16,
              }}>
                <div style={{ fontSize: 44 }}>😺</div>

                {/* 닉네임 직접 입력 */}
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value.slice(0, 12))}
                  maxLength={12}
                  placeholder="닉네임 입력"
                  style={{
                    width: '100%', textAlign: 'center',
                    fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)',
                    background: 'transparent', border: 'none',
                    borderBottom: '2px solid var(--color-border)',
                    padding: '4px 8px', outline: 'none',
                    fontFamily: "'Noto Sans KR', sans-serif",
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => { e.target.style.borderBottomColor = '#E8521A'; }}
                  onBlur={(e) => { e.target.style.borderBottomColor = 'var(--color-border)'; }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={reroll}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: '#FFFFFF', border: '1px solid var(--color-border)',
                      borderRadius: 20, padding: '8px 16px', cursor: 'pointer',
                      fontSize: 13, color: 'var(--color-text-secondary)',
                      fontFamily: "'Noto Sans KR', sans-serif",
                    }}
                  >
                    <RefreshCw size={13} />
                    랜덤 닉네임
                  </button>
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                    {nickname.length}/12
                  </span>
                </div>
              </div>
              <p style={{ marginTop: 14, fontSize: 12, color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
                크루에게만 공개돼요
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.22 }}>
              <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>취향 키워드</p>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.35, marginBottom: 8 }}>
                어떤 걸 좋아하세요?
              </h2>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
                최대 3개 · <span style={{ color: '#E8521A', fontWeight: 700 }}>{selectedTags.length}</span>/3 선택됨
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {interestKeywords.map((tag) => (
                  <TagPill
                    key={tag}
                    label={tag}
                    selected={selectedTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                    disabled={selectedTags.length >= 3}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.22 }}>
              <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>대화 주제</p>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.35, marginBottom: 24 }}>
                오늘 어떤 이야기가<br />하고 싶어요?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {topicOptions.map((opt) => {
                  const sel = selectedTopic === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedTopic(opt.id)}
                      style={{
                        padding: '16px 18px',
                        borderRadius: 12,
                        border: sel ? '1.5px solid #E8521A' : '1.5px solid var(--color-border)',
                        background: sel ? 'var(--color-primary-light)' : '#FFFFFF',
                        display: 'flex', alignItems: 'center', gap: 12,
                        cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{opt.emoji}</span>
                      <span style={{
                        fontSize: 15, fontWeight: sel ? 700 : 400,
                        color: sel ? '#E8521A' : 'var(--color-text-primary)',
                        fontFamily: "'Noto Sans KR', sans-serif",
                      }}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 하단 버튼 */}
      <div style={{ padding: '24px 24px 40px' }}>
        <button
          className="btn-primary"
          onClick={handleNext}
          disabled={!canNext}
        >
          {step === 3 ? '프로필 완성!' : '다음'}
        </button>
      </div>
    </motion.div>
  );
}
