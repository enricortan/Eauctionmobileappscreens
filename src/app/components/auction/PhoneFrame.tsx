import React from 'react';
import { C } from './colors';

interface PhoneFrameProps {
  children: React.ReactNode;
  label?: string;
  sublabel?: string;
  minHeight?: number;
  fluid?: boolean;
}

export function PhoneFrame({ children, label, sublabel, minHeight = 812, fluid = false }: PhoneFrameProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      flexShrink: fluid ? 1 : 0,
      width: fluid ? '100%' : 'auto',
    }}>
      {label && (
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', color: C.textSoft, textTransform: 'uppercase' }}>
          {label}
        </div>
      )}
      {sublabel && (
        <div style={{ fontSize: 12, color: C.textMid, marginTop: -8 }}>{sublabel}</div>
      )}
      <div style={{
        width: fluid ? '100%' : 375,
        maxWidth: '100%',
        background: C.bg,
        overflow: 'hidden',
        boxShadow: fluid
          ? '0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)'
          : '0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.08)',
        minHeight,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: 'Inter, -apple-system, "Helvetica Neue", sans-serif',
      }}>
        {children}
      </div>
    </div>
  );
}

export function PhoneSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: C.surface, flexShrink: 0, ...style }}>
      {children}
    </div>
  );
}

export function PhoneBody({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      background: C.bg,
      padding: '20px 20px 0',
      scrollbarWidth: 'none' as const,
      ...style,
    }}>
      {children}
    </div>
  );
}

export function PhoneFooter({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: '12px 20px', flexShrink: 0 }}>
      {children}
    </div>
  );
}

export function Divider() {
  return <div style={{ height: 1, background: C.border, flexShrink: 0 }} />;
}

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: C.surface,
      borderRadius: 16,
      border: `1.5px solid ${C.border}`,
      padding: '14px 16px',
      marginBottom: 10,
      ...style,
    }}>
      {children}
    </div>
  );
}

export function Btn({
  children, onClick, variant = 'primary', style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'green' | 'danger' | 'plain';
  style?: React.CSSProperties;
}) {
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: C.accent, color: 'white' },
    ghost: { background: C.bg, color: C.text, border: `1.5px solid ${C.border}` },
    green: { background: C.green, color: 'white' },
    danger: { background: C.red, color: 'white' },
    plain: { background: 'transparent', color: C.textMid },
  };
  return (
    <button
      onClick={onClick}
      style={{
        border: 'none',
        borderRadius: 12,
        fontFamily: 'Inter, -apple-system, "Helvetica Neue", sans-serif',
        fontSize: 13,
        fontWeight: 700,
        cursor: 'pointer',
        padding: 12,
        width: '100%',
        textAlign: 'center',
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function TimerBox({ seconds }: { seconds: number }) {
  const urgent = seconds < 600;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return (
    <div style={{
      background: urgent ? C.redSoft : C.amberSoft,
      border: `1.5px solid ${urgent ? C.red : C.amber}`,
      borderRadius: 14,
      padding: '7px 12px',
      textAlign: 'center',
      minWidth: 62,
      flexShrink: 0,
    }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', marginBottom: 1, color: urgent ? C.red : C.amber }}>LEFT</div>
      <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1, color: urgent ? C.red : C.amber, fontVariantNumeric: 'tabular-nums' }}>{str}</div>
    </div>
  );
}

export function LiveDot() {
  return (
    <span style={{
      display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
      background: C.red, marginRight: 5,
      animation: 'blink 1.4s infinite',
    }} />
  );
}

export function Chip({ children, bg, color }: { children: React.ReactNode; bg: string; color: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: 11, fontWeight: 600, padding: '3px 9px',
      borderRadius: 20, background: bg, color,
    }}>
      {children}
    </span>
  );
}

export function KvRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '7px 0', borderBottom: `1px solid ${C.border}`,
      fontSize: 12,
    }}>
      <span style={{ color: C.textMid }}>{label}</span>
      <span style={{ fontWeight: 600, color: valueColor || C.text, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  );
}

export function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'flex-end', zIndex: 50,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', background: C.surface, borderRadius: '28px 28px 0 0',
          padding: '20px 20px 40px',
        }}
      >
        <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: '0 auto 20px' }} />
        {children}
      </div>
    </div>
  );
}