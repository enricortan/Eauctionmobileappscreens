import React, { useState, useEffect, useRef } from 'react';

const PASSWORD = 'accenturesong';
const STORAGE_KEY = 'eauction_auth';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
  });
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!unlocked) setTimeout(() => inputRef.current?.focus(), 100);
  }, [unlocked]);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0A1A 0%, #2D0057 50%, #0F0A1A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, -apple-system, "Helvetica Neue", sans-serif',
      padding: '24px',
    }}>
      <style>{`
        @keyframes gateFadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gateShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-8px); } 40%,80% { transform: translateX(8px); } }
        @keyframes gatePulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        .gate-card { animation: gateFadeIn 0.5s ease forwards; }
        .gate-shake { animation: gateShake 0.5s ease; }
        .gate-input:focus { outline: none; border-color: #7C3AED !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }
        .gate-btn { transition: background 0.15s, transform 0.1s; }
        .gate-btn:hover { background: #6D28D9 !important; }
        .gate-btn:active { transform: scale(0.98); }
        .gate-dot { animation: gatePulse 2s ease-in-out infinite; }
      `}</style>

      {/* Background grid decoration */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(161,0,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(161,0,255,0.07) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(124,58,237,0.12)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(161,0,255,0.1)', filter: 'blur(80px)' }} />
      </div>

      <div className={`gate-card${shake ? ' gate-shake' : ''}`} style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24,
        padding: '48px 40px',
        width: '100%',
        maxWidth: 400,
        backdropFilter: 'blur(20px)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #A100FF, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 16,
            boxShadow: '0 8px 24px rgba(161,0,255,0.4)',
          }}>⚡</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.3px' }}>eAuction</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, letterSpacing: '2px', textTransform: 'uppercase' }}>Case Study · UX Presentation</div>
        </div>

        {/* Status dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 32 }}>
          {[0, 0.4, 0.8].map((delay, i) => (
            <div key={i} className="gate-dot" style={{
              width: 6, height: 6, borderRadius: '50%', background: '#A100FF',
              animationDelay: `${delay}s`,
            }} />
          ))}
        </div>

        <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginBottom: 6 }}>
          Protected Presentation
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginBottom: 28 }}>
          Enter the password to access this case study
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative', marginBottom: 14 }}>
            <input
              ref={inputRef}
              className="gate-input"
              type={show ? 'text' : 'password'}
              value={value}
              onChange={e => { setValue(e.target.value); setError(false); }}
              placeholder="Password"
              autoComplete="current-password"
              style={{
                width: '100%',
                padding: '14px 48px 14px 16px',
                borderRadius: 12,
                border: `1.5px solid ${error ? '#EF4444' : 'rgba(255,255,255,0.12)'}`,
                background: 'rgba(255,255,255,0.06)',
                color: 'white',
                fontSize: 15,
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, opacity: 0.4,
                padding: 0, lineHeight: 1,
              }}
              tabIndex={-1}
            >
              {show ? '🙈' : '👁️'}
            </button>
          </div>

          {error && (
            <div style={{ fontSize: 12, color: '#EF4444', marginBottom: 12, textAlign: 'center', fontWeight: 500 }}>
              Incorrect password. Please try again.
            </div>
          )}

          <button
            type="submit"
            className="gate-btn"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              border: 'none',
              background: '#7C3AED',
              color: 'white',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '0.2px',
            }}
          >
            Access Presentation →
          </button>
        </form>

        {/* Footer note */}
        <div style={{ marginTop: 28, textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px' }}>
          Company ABC · IT Equipment Procurement · eAuction UX
        </div>
      </div>
    </div>
  );
}