import React from 'react';
import { useNavigate } from 'react-router';

const C = {
  accent: '#7C3AED',
  accentSoft: '#F5F3FF',
  green: '#0C9E6A',
  greenSoft: '#EDFAF4',
  amber: '#D97706',
  amberSoft: '#FFFBEB',
  text: '#0D1117',
  textMid: '#5C6472',
  textSoft: '#9BA3AF',
  border: '#EAEDF2',
  surface: '#FFFFFF',
  bg: '#F7F8FA',
};

const ITEMS = [
  { num: 'a', name: 'Laptops', spec: '100 units · 4GB RAM, 1TB HDD', icon: '💻', col: C.accent, bg: C.accentSoft },
  { num: 'b', name: 'Laptop Bags', spec: '100 units · Standard carry', icon: '👜', col: C.green, bg: C.greenSoft },
  { num: 'c', name: 'Desktops', spec: '2,000 units · 8GB RAM, 1TB HDD, 15" LCD Monitor', icon: '🖥️', col: C.amber, bg: C.amberSoft },
  { num: 'd', name: '3-Year Warranty', spec: 'For Desktops only · 2,000 units', icon: '🛡️', col: '#7C3AED', bg: '#F5F3FF' },
];

const DESIGN_NOTES = [
  { icon: '🏆', title: 'Smart Rebid Suggestions', desc: 'Beat best by 1%, match best, or use a custom amount. Suppliers can act fast without needing to calculate.' },
  { icon: '🛡️', title: 'Anti-Sniping Protection', desc: 'Bids placed in the last 2 minutes auto-extend the auction by 5 minutes.' },
  { icon: '📊', title: 'Real-Time Bid Trends', desc: 'Buyer sees price momentum, supplier activity, and competition aggressiveness at a glance.' },
  { icon: '🔔', title: 'Live Alerts System', desc: 'Rank changes, new best bids, and auction extensions notify suppliers instantly.' },
  { icon: '📱', title: 'Mobile-First Design', desc: 'Designed for iOS and Android. The buyer monitors the auction from a phone while suppliers bid from anywhere.' },
  { icon: '📈', title: 'Scalable to 20+ Suppliers', desc: 'Sortable leaderboard, activity feed, and search that handles any number of participants.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: 'Inter, -apple-system, "Helvetica Neue", sans-serif', background: C.bg, minHeight: '100vh' }}>

      {/* Sticky Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', borderBottom: `1px solid ${C.border}`, backdropFilter: 'blur(12px)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', height: 56, gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#A100FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
            <span style={{ fontSize: 16, fontWeight: 800, color: C.text }}>eAuction</span>
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: C.textSoft, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Case Study</span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0F0A1A 0%, #2D0057 50%, #7C3AED 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: 'white', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
            eAuction Case Study
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 12, lineHeight: 1.6 }}>
            Company ABC · IT Equipment Procurement
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>
            Buyer: Mr. Buyer · Suppliers: X, Y & Z · 4 Line Items · 2-Hour Live Auction
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/buyer')} style={{
              background: 'white', color: C.accent, border: 'none', borderRadius: 14,
              fontSize: 15, fontWeight: 700, cursor: 'pointer', padding: '14px 28px',
              fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              💼 Buyer Journey →
            </button>
            <button onClick={() => navigate('/supplier')} style={{
              background: 'rgba(255,255,255,0.12)', color: 'white', border: '1.5px solid rgba(255,255,255,0.25)',
              borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', padding: '14px 28px',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              🏢 Supplier Journey →
            </button>
          </div>
        </div>
      </div>

      {/* Business Scenario */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>Business Context</div>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: C.text, letterSpacing: '-0.5px', marginBottom: 12 }}>About This Case Study</h2>
          <p style={{ fontSize: 15, color: C.textMid, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Company ABC is procuring IT hardware and invites 3 suppliers to compete in a live reverse eAuction. The buyer creates and monitors the auction; suppliers bid to win the contract.
          </p>
        </div>

        {/* Items grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}>
          {ITEMS.map(item => (
            <div key={item.num} style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{item.spec}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Suppliers */}
        <div style={{ background: C.surface, borderRadius: 20, border: `1.5px solid ${C.border}`, padding: '24px 28px', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Invited Suppliers</div>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <div style={{ fontSize: 12, color: C.textSoft }}>3 participants</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[['X', C.accent, C.accentSoft, 'Supplier X', 'supplierx@company.com'], ['Y', C.green, C.greenSoft, 'Supplier Y', 'suppliery@company.com'], ['Z', C.amber, C.amberSoft, 'Supplier Z', 'supplierz@company.com']].map(([init, col, bg, name, email]) => (
              <div key={init} style={{ flex: 1, minWidth: 200, background: bg as string, borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', border: `1.5px solid ${col}22` }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: col as string, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{init}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{name as string}</div>
                  <div style={{ fontSize: 11, color: C.textMid }}>{email as string}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Cards */}
      <div style={{ background: 'linear-gradient(180deg, #F7F8FA 0%, #F5F3FF 100%)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>Interactive Prototypes</div>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: C.text, letterSpacing: '-0.5px', marginBottom: 12 }}>Two Journeys, One Platform</h2>
            <p style={{ fontSize: 15, color: C.textMid, maxWidth: 540, margin: '0 auto' }}>
              Explore both sides of the auction experience: the buyer who controls it and the supplier who competes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
            {/* Buyer card */}
            <div style={{ background: C.surface, borderRadius: 24, border: `1.5px solid ${C.border}`, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', padding: '32px 32px 28px' }}>
                <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 16 }}>💼</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>Buyer Journey</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 6 }}>Mr. Buyer</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>Monitor, control & award the auction</div>
              </div>
              <div style={{ padding: '28px 32px' }}>
                <div style={{ marginBottom: 24 }}>
                  {['Create auction with items, rules & invited suppliers', 'Monitor live bids, rankings & trends in real-time', 'Extend, message suppliers, and award the winner'].map((feat, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.accentSoft, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</div>
                      <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.5 }}>{feat}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                  {['5 Screens', 'Interactive', 'Live Timer', 'Modals'].map(tag => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: C.accentSoft, color: C.accent }}>{tag}</span>
                  ))}
                </div>
                <button onClick={() => navigate('/buyer')} style={{ width: '100%', background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', padding: '14px 0', fontFamily: 'inherit' }}>
                  Open Buyer Screens →
                </button>
              </div>
            </div>

            {/* Supplier card */}
            <div style={{ background: C.surface, borderRadius: 24, border: `1.5px solid ${C.border}`, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ background: 'linear-gradient(135deg, #0C9E6A 0%, #059669 100%)', padding: '32px 32px 28px' }}>
                <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 16 }}>🏢</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>Supplier Journey</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 6 }}>Supplier X</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>Receive invite, bid & compete to win</div>
              </div>
              <div style={{ padding: '28px 32px' }}>
                <div style={{ marginBottom: 24 }}>
                  {['Receive email invite and review auction details', 'Submit live bids per item with real-time rank feedback', 'Track bid history, alerts, and improve bids to win'].map((feat, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                      <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: C.greenSoft, color: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</div>
                      <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.5 }}>{feat}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                  {['4 Screens', 'Full Flow', 'Live Timer', 'Smart Rebid'].map(tag => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: C.greenSoft, color: C.green }}>{tag}</span>
                  ))}
                </div>
                <button onClick={() => navigate('/supplier')} style={{ width: '100%', background: C.green, color: 'white', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', padding: '14px 0', fontFamily: 'inherit' }}>
                  Open Supplier Screens →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Design Notes */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>Design Decisions</div>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: C.text, letterSpacing: '-0.5px' }}>Key UX Features</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {DESIGN_NOTES.map(note => (
            <div key={note.title} style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: '20px 22px', display: 'flex', gap: 14 }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{note.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 6 }}>{note.title}</div>
                <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{note.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#0F0A1A', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#A100FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>eAuction</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>· Case Study Presentation</span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
            UX Design Challenge · Company ABC IT Equipment Procurement · 2026
          </div>
        </div>
      </div>

    </div>
  );
}