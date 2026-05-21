import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, CalendarCheck, User } from 'lucide-react';

const navItems = [
  { icon: Home,          label: '홈',     path: '/home'     },
  { icon: Compass,       label: '탐색',   path: '/explore'  },
  { icon: CalendarCheck, label: '내 일정', path: '/schedule' },
  { icon: User,          label: '프로필', path: '/profile'  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="하단 네비게이션"
      style={{
        position: 'fixed', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '100%', maxWidth: 430,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        zIndex: 100,
      }}
    >
      {navItems.map(({ icon: Icon, label, path }) => {
        const active = pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            aria-label={label}
            style={{
              flex: 1, padding: '10px 0 14px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer',
              color: active ? '#E8521A' : '#ADB5BD',
              transition: 'color 0.15s',
            }}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            <span style={{
              fontSize: 10, fontWeight: active ? 700 : 500,
              fontFamily: "'Noto Sans KR', sans-serif",
            }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
