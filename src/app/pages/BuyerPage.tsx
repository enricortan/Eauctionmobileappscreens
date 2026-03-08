import React from 'react';
import { useNavigate } from 'react-router';
import CreateAuctionFlow from '../components/buyer/CreateAuctionFlow';
import MonitorAuctionScreen from '../components/buyer/MonitorAuctionScreen';
import { SupplierRankingScreen, ItemComparisonScreen, AuctionControlsScreen } from '../components/buyer/BuyerGalleryScreens';

const C = {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '48px 0', gap: 0 }}>
      <div style={{ width: 2, height: 36, background: C.border }} />
      <div style={{ background: C.border, color: C.textSoft, fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', padding: '4px 14px', borderRadius: 20, margin: '6px 0' }}>{label}</div>
      <div style={{ width: 2, height: 36, background: C.border }} />
    </div>
  );
}

export default function BuyerPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, "Helvetica Neue", sans-serif', background: '#ECEEF2', minHeight: '100vh' }}>

      {/* Nav */}
      <style>{`
        .buyer-nav-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; min-height: 56px; gap: 12px; flex-wrap: wrap; padding: 8px 0; }
        .buyer-nav-title { display: flex; align-items: center; gap: 10px; }
        .buyer-nav-title .sub { font-size: 12px; color: #9BA3AF; }
        .buyer-nav-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .buyer-hero { padding: 48px 24px 44px; text-align: center; }
        .buyer-hero h1 { font-size: 36px; }
        .buyer-hero p { font-size: 15px; }
        .buyer-footer { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; padding: 24px; }
        .buyer-footer button { flex: 0 0 auto; }
        @media (max-width: 640px) {
          .buyer-nav-inner { gap: 0; padding: 10px 0; row-gap: 8px; }
          .buyer-nav-row1 { display: flex; align-items: center; gap: 10px; width: 100%; }
          .buyer-nav-actions { margin-left: 0; width: 100%; justify-content: stretch; }
          .buyer-nav-actions button { flex: 1; text-align: center; }
          .buyer-nav-sep { display: none; }
          .buyer-nav-title .sub { display: none; }
          .buyer-hero { padding: 32px 20px 28px; }
          .buyer-hero h1 { font-size: 24px; }
          .buyer-hero p { font-size: 13px; }
          .buyer-footer { flex-direction: column; align-items: stretch; padding: 16px 20px; }
          .buyer-footer button { width: 100%; margin-left: 0 !important; }
        }
      `}</style>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', borderBottom: `1px solid ${C.border}`, backdropFilter: 'blur(12px)', padding: '0 24px' }}>
        <div className="buyer-nav-inner">
          <div className="buyer-nav-row1" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.textMid, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, padding: 0, whiteSpace: 'nowrap', flexShrink: 0 }}>
              ← Overview
            </button>
            <div className="buyer-nav-sep" style={{ width: 1, height: 20, background: C.border, flexShrink: 0 }} />
            <div className="buyer-nav-title" style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, overflow: 'hidden' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>💼</div>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text, whiteSpace: 'nowrap' }}>Buyer Journey</span>
              <span className="sub">— Mr. Buyer</span>
            </div>
          </div>
          <div className="buyer-nav-actions">
            <button onClick={() => navigate('/buyer/demo')} style={{ background: C.accent, border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 12, color: 'white', fontFamily: 'inherit', fontWeight: 600, padding: '8px 14px' }}>
              📱 Demo
            </button>
            <button onClick={() => navigate('/buyer/screens')} style={{ background: C.accentSoft, border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 12, color: C.accent, fontFamily: 'inherit', fontWeight: 600, padding: '8px 14px' }}>
              All Screens →
            </button>
            <button onClick={() => navigate('/supplier')} style={{ background: C.accentSoft, border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 12, color: C.accent, fontFamily: 'inherit', fontWeight: 600, padding: '8px 14px' }}>
              Supplier →
            </button>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="buyer-hero" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 12 }}>
          eAuction Mobile App · Buyer Experience
        </div>
        <h1 style={{ color: 'white', letterSpacing: '-0.5px', marginBottom: 10 }}>
          Buyer Journey — Mr. Buyer
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto' }}>
          Create an auction, monitor live bids, manage suppliers, and award the winning bid — all from a mobile phone.
        </p>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 24px' }}>

        {/* Section 1: Interactive */}
        <SectionHeader
          eyebrow="Section 1 · Interactive Flow"
          title="Create Auction"
          sub="Click through the 4-step process that Mr. Buyer uses to set up the IT Equipment Procurement auction — from details and items to inviting suppliers and launching."
        />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CreateAuctionFlow />
        </div>

        <SectionDivider label="AUCTION GOES LIVE" />

        {/* Section 2: Gallery */}
        <SectionHeader
          eyebrow="Section 2 · Screen Gallery"
          title="Monitor & Control"
          sub="After launch, Mr. Buyer monitors in real-time. All screen states from the live dashboard to rankings, item-level comparison, and auction controls."
        />

        <style>{`
          .buyer-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
          @media (max-width: 600px) { .buyer-grid { grid-template-columns: 1fr; gap: 16px; } }
        `}</style>
        <div className="buyer-grid">
          <MonitorAuctionScreen fluid />
          <SupplierRankingScreen fluid />
          <ItemComparisonScreen fluid />
          <AuctionControlsScreen fluid />
        </div>

      </div>

      {/* Footer nav */}
      <div className="buyer-footer" style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => navigate('/supplier')} style={{ background: '#0C9E6A', color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '12px 28px', fontFamily: 'inherit' }}>
          View Supplier Journey →
        </button>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: '12px 20px', fontFamily: 'inherit', color: C.textMid }}>
          ← Back to Overview
        </button>
      </div>
    </div>
  );
}