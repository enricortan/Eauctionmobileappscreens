import React from 'react';
import { useNavigate } from 'react-router';
import SupplierFlow from '../components/supplier/SupplierFlow';
import { RebidSuggestionScreen, AlertsScreen, BidHistoryScreen } from '../components/supplier/SupplierGalleryScreens';

const C = {
  green: '#0C9E6A', greenSoft: '#EDFAF4',
  accent: '#7C3AED', accentSoft: '#F5F3FF',
  text: '#0D1117', textMid: '#5C6472', textSoft: '#9BA3AF',
  border: '#EAEDF2', surface: '#FFFFFF', bg: '#F7F8FA',
};

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>{eyebrow}</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: '-0.5px', marginBottom: 10 }}>{title}</h2>
      <p style={{ fontSize: 14, color: C.textMid, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>{sub}</p>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '48px 0' }}>
      <div style={{ width: 2, height: 36, background: C.border }} />
      <div style={{ background: C.border, color: C.textSoft, fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', padding: '4px 14px', borderRadius: 20, margin: '6px 0' }}>{label}</div>
      <div style={{ width: 2, height: 36, background: C.border }} />
    </div>
  );
}

export default function SupplierPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, "Helvetica Neue", sans-serif', background: '#ECEEF2', minHeight: '100vh' }}>

      {/* Nav */}
      <style>{`
        .sup-nav-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; min-height: 56px; gap: 12px; flex-wrap: wrap; padding: 8px 0; }
        .sup-nav-title .sub { font-size: 12px; color: #9BA3AF; }
        .sup-nav-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .sup-hero { padding: 48px 24px 44px; text-align: center; }
        .sup-hero h1 { font-size: 36px; }
        .sup-hero p { font-size: 15px; }
        .sup-footer { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; padding: 24px; }
        .sup-footer button { flex: 0 0 auto; }
        @media (max-width: 640px) {
          .sup-nav-inner { gap: 0; padding: 10px 0; row-gap: 8px; }
          .sup-nav-row1 { width: 100%; }
          .sup-nav-actions { margin-left: 0; width: 100%; justify-content: stretch; }
          .sup-nav-actions button { flex: 1; text-align: center; }
          .sup-nav-sep { display: none; }
          .sup-nav-title .sub { display: none; }
          .sup-hero { padding: 32px 20px 28px; }
          .sup-hero h1 { font-size: 24px; }
          .sup-hero p { font-size: 13px; }
          .sup-footer { flex-direction: column; align-items: stretch; padding: 16px 20px; }
          .sup-footer button { width: 100%; margin-left: 0 !important; }
        }
      `}</style>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', borderBottom: `1px solid ${C.border}`, backdropFilter: 'blur(12px)', padding: '0 24px' }}>
        <div className="sup-nav-inner">
          <div className="sup-nav-row1" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.textMid, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, padding: 0, whiteSpace: 'nowrap', flexShrink: 0 }}>
              ← Overview
            </button>
            <div className="sup-nav-sep" style={{ width: 1, height: 20, background: C.border, flexShrink: 0 }} />
            <div className="sup-nav-title" style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, overflow: 'hidden' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🏢</div>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text, whiteSpace: 'nowrap' }}>Supplier Journey</span>
              <span className="sub">— Supplier X</span>
            </div>
          </div>
          <div className="sup-nav-actions">
            <button onClick={() => navigate('/supplier/demo')} style={{ background: C.green, border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 12, color: 'white', fontFamily: 'inherit', fontWeight: 600, padding: '8px 14px' }}>
              📱 Demo
            </button>
            <button onClick={() => navigate('/supplier/screens')} style={{ background: C.greenSoft, border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 12, color: C.green, fontFamily: 'inherit', fontWeight: 600, padding: '8px 14px' }}>
              All Screens →
            </button>
            <button onClick={() => navigate('/buyer')} style={{ background: C.greenSoft, border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 12, color: C.green, fontFamily: 'inherit', fontWeight: 600, padding: '8px 14px' }}>
              Buyer →
            </button>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="sup-hero" style={{ background: 'linear-gradient(135deg, #0C9E6A 0%, #059669 100%)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 12 }}>
          eAuction Mobile App · Supplier Experience
        </div>
        <h1 style={{ color: 'white', letterSpacing: '-0.5px', marginBottom: 10 }}>
          Supplier Journey — Supplier X
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto' }}>
          Receive the invitation, review auction details, place competitive bids, track rank — and aim to win the contract.
        </p>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 24px' }}>

        {/* Section 1: Interactive */}
        <SectionHeader
          eyebrow="Section 1 · Interactive Flow"
          title="Invite to Bid Setup"
          sub="Click through the complete supplier journey — from receiving the email invitation and reviewing auction details, to submitting live bids and seeing your rank update in real-time."
        />

        {/* Flow steps indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: C.surface, borderRadius: 14, border: `1.5px solid ${C.border}`, padding: '10px 16px', overflowX: 'auto', maxWidth: '100%' }}>
            {[
              ['📧', 'Receive Invite'],
              ['📋', 'Review Details'],
              ['📊', 'Submit Bid'],
              ['✅', 'Bid Confirmed'],
            ].map(([icon, label], i) => (
              <React.Fragment key={label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.textMid }}>{label}</span>
                </div>
                {i < 3 && <div style={{ width: 20, height: 1, background: C.border, margin: '0 12px', flexShrink: 0 }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SupplierFlow />
        </div>

        <SectionDivider label="BID SUBMITTED · AUCTION AWAITS" />

        {/* Section 2: Gallery */}
        <SectionHeader
          eyebrow="Section 2 · Screen Gallery"
          title="Other Supplier Screens"
          sub="Additional supplier-facing screens — smart rebid strategies, real-time alerts & notifications, and full bid history to track performance."
        />

        <style>{`
          .supplier-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
          @media (max-width: 600px) { .supplier-grid { grid-template-columns: 1fr; gap: 16px; } }
        `}</style>
        <div className="supplier-grid">
          <RebidSuggestionScreen fluid />
          <AlertsScreen fluid />
          <BidHistoryScreen fluid />
        </div>

      </div>

      {/* Footer nav */}
      <div className="sup-footer" style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => navigate('/buyer')} style={{ background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '12px 28px', fontFamily: 'inherit' }}>
          View Buyer Journey →
        </button>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: '12px 20px', fontFamily: 'inherit', color: C.textMid }}>
          ← Back to Overview
        </button>
      </div>
    </div>
  );
}