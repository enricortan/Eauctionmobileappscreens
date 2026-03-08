import React from 'react';
import { C, fmt, fmtFull } from '../auction/colors';
import { PhoneFrame, PhoneSection, Divider, Card, Chip } from '../auction/PhoneFrame';

export function RebidSuggestionScreen({ fluid = false }: { fluid?: boolean }) {
  return (
    <PhoneFrame label="Smart Rebid" sublabel="Quick rebid suggestions to help close the gap" minHeight={620} fluid={fluid}>
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 14px' }}>
          <div style={{ fontSize: 18, color: C.textMid, cursor: 'pointer' }}>←</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1 }}>SMART REBID</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Quick Strategy</div>
          </div>
          <div style={{ background: C.amberSoft, border: `1.5px solid ${C.amber}`, borderRadius: 14, padding: '7px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', color: C.amber }}>LEFT</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.amber }}>38:41</div>
          </div>
        </div>
        <Divider />
      </PhoneSection>

      <div style={{ flex: 1, overflowY: 'auto', background: C.bg, padding: '20px 16px', scrollbarWidth: 'none' }}>
        {/* Gap alert */}
        <div style={{ background: C.redSoft, border: `1.5px solid ${C.red}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.red, marginBottom: 4 }}>📉 You are behind the leader</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: C.red }}>+₱28,300</div>
          <div style={{ fontSize: 12, color: C.red, marginTop: 4 }}>Your bid: ₱654,000 · Leader: ₱649,700</div>
        </div>

        {/* Rank */}
        <div style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: '14px 16px', marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' }}>Your Current Position</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: C.accentSoft, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800 }}>#2</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Rank #2 of 3</div>
              <div style={{ fontSize: 12, color: C.textMid, marginTop: 2 }}>Beat the leader to win</div>
            </div>
          </div>
        </div>

        {/* Suggestion header */}
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Suggested Strategies</div>

        {/* Option 1: Match best */}
        <div style={{ background: C.surface, borderRadius: 14, border: `1.5px solid ${C.border}`, padding: '14px 16px', marginBottom: 8, cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Match Best Bid</div>
              <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>Tie with current leader</div>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: C.accent }}>₱649,700</span>
          </div>
          <button style={{ width: '100%', background: C.accentSoft, color: C.accent, border: `1.5px solid ${C.accent}`, borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: '9px 0', fontFamily: 'inherit' }}>
            Match Best →
          </button>
        </div>

        {/* Option 2: Beat by 1% */}
        <div style={{ background: C.greenSoft, borderRadius: 14, border: `1.5px solid ${C.green}`, padding: '14px 16px', marginBottom: 8, cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.green }}>⭐ Beat by 1%</div>
              <div style={{ fontSize: 11, color: C.green, marginTop: 2 }}>Recommended, takes the lead</div>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: C.green }}>₱643,203</span>
          </div>
          <button style={{ width: '100%', background: C.green, color: 'white', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: '9px 0', fontFamily: 'inherit' }}>
            Apply This Strategy →
          </button>
        </div>

        {/* Option 3: Custom */}
        <div style={{ background: C.surface, borderRadius: 14, border: `1.5px solid ${C.border}`, padding: '14px 16px', marginBottom: 8, cursor: 'pointer' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>Custom Bid</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.textSoft, fontSize: 13 }}>₱</span>
              <input type="number" placeholder="Enter amount" style={{ width: '100%', padding: '9px 10px 9px 22px', borderRadius: 9, border: `1.5px solid ${C.borderStrong}`, background: C.surface, color: C.text, fontSize: 14, fontWeight: 700, outline: 'none', fontFamily: 'inherit' }} />
            </div>
            <button style={{ background: C.accent, color: 'white', border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', padding: '9px 14px', fontFamily: 'inherit' }}>Apply</button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function AlertsScreen({ fluid = false }: { fluid?: boolean }) {
  const alerts = [
    { type: 'rank', icon: '📉', title: 'You dropped from Rank #1 → #2', sub: 'Supplier Y submitted a new bid', time: '2 min ago', col: C.red, bg: C.redSoft },
    { type: 'bid', icon: '🔔', title: 'New best bid placed', sub: 'Current best: ₱649,700', time: '2 min ago', col: C.amber, bg: C.amberSoft },
    { type: 'ext', icon: '⏰', title: 'Auction extended by 5 minutes', sub: 'New end time: 2:05 PM', time: '15 min ago', col: C.accent, bg: C.accentSoft },
    { type: 'msg', icon: '💬', title: 'Message from Buyer', sub: '"Please ensure bids cover full scope…"', time: '22 min ago', col: C.purple, bg: C.purpleSoft },
    { type: 'bid2', icon: '📊', title: 'Supplier Z updated bid', sub: 'Current best still: ₱649,700', time: '28 min ago', col: C.textMid, bg: C.border },
  ];

  return (
    <PhoneFrame label="Supplier Alerts" sublabel="Real-time notifications & rank changes" minHeight={620} fluid={fluid}>
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 14px' }}>
          <div style={{ fontSize: 18, color: C.textMid, cursor: 'pointer' }}>←</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1 }}>NOTIFICATIONS</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Alerts & Updates</div>
          </div>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.red, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>5</div>
        </div>
        <Divider />
      </PhoneSection>

      <div style={{ flex: 1, overflowY: 'auto', background: C.bg, padding: '12px 12px', scrollbarWidth: 'none' }}>
        {alerts.map((alert, i) => (
          <div key={alert.type} style={{ background: C.surface, borderRadius: 14, border: `1.5px solid ${C.border}`, padding: '12px 14px', marginBottom: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: alert.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{alert.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{alert.title}</div>
              <div style={{ fontSize: 12, color: C.textMid, marginTop: 3 }}>{alert.sub}</div>
              <div style={{ fontSize: 10, color: C.textSoft, marginTop: 4 }}>{alert.time}</div>
            </div>
            {i === 0 && <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.red, flexShrink: 0, marginTop: 4 }} />}
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

export function BidHistoryScreen({ fluid = false }: { fluid?: boolean }) {
  const bids = [
    { label: 'Bid 4 (latest)', total: 638200, time: '12:34 PM', items: [48000, 3100, 489000, 98100], isLatest: true },
    { label: 'Bid 3', total: 654000, time: '12:28 PM', items: [49800, 3400, 535000, 102000], isLatest: false },
    { label: 'Bid 2', total: 672000, time: '12:18 PM', items: [51000, 3600, 545000, 118400], isLatest: false },
    { label: 'Bid 1', total: 695000, time: '12:03 PM', items: [52500, 3800, 555000, 139500], isLatest: false },
  ];

  return (
    <PhoneFrame label="Bid History" sublabel="All submitted bids and progress over time" minHeight={620} fluid={fluid}>
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 12px' }}>
          <div style={{ fontSize: 18, color: C.textMid, cursor: 'pointer' }}>←</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1 }}>SUPPLIER X</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>My Bid History</div>
          </div>
          <Chip bg={C.greenSoft} color={C.green}>4 bids</Chip>
        </div>
        <Divider />
        <div style={{ display: 'flex', padding: '10px 20px' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.green }}>₱638K</div>
            <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, letterSpacing: '0.5px' }}>BEST BID</div>
          </div>
          <div style={{ width: 1, background: C.border }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.accent }}>8.2%</div>
            <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, letterSpacing: '0.5px' }}>REDUCTION</div>
          </div>
          <div style={{ width: 1, background: C.border }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.green }}>#1</div>
            <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, letterSpacing: '0.5px' }}>CURRENT RANK</div>
          </div>
        </div>
        <Divider />
      </PhoneSection>

      <div style={{ flex: 1, overflowY: 'auto', background: C.bg, padding: '12px 12px', scrollbarWidth: 'none' }}>
        {bids.map((bid, i) => (
          <div key={bid.label} style={{ background: bid.isLatest ? C.greenSoft : C.surface, borderRadius: 14, border: `1.5px solid ${bid.isLatest ? C.green : C.border}`, padding: '12px 14px', marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: bid.isLatest ? C.green : C.text }}>{bid.label}</div>
                <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{bid.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: bid.isLatest ? C.green : C.text }}>{fmtFull(bid.total)}</div>
                {i > 0 && <div style={{ fontSize: 10, color: C.green, marginTop: 2 }}>↓ {fmt(bids[i - 1].total - bid.total)} lower</div>}
              </div>
            </div>
            {bid.isLatest && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Laptops: ₱48K', 'Bags: ₱3.1K', 'Desktops: ₱489K', 'Warranty: ₱98K'].map(t => (
                  <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: 'rgba(12,158,106,0.15)', color: C.green }}>{t}</span>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Progress bar */}
        <Card style={{ marginTop: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Bidding Progress</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
            {bids.slice().reverse().map((bid, i) => {
              const maxBid = 695000;
              const h = ((maxBid - bid.total) / (maxBid - 638000)) * 70 + 10;
              return (
                <div key={bid.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 9, color: C.textSoft }}>{fmt(bid.total)}</div>
                  <div style={{ width: '100%', height: `${Math.max(h, 10)}px`, background: bid.isLatest ? C.green : C.accentSoft, borderRadius: '4px 4px 0 0', border: `1px solid ${bid.isLatest ? C.green : C.accent}` }} />
                  <div style={{ fontSize: 9, color: C.textSoft, whiteSpace: 'nowrap' }}>B{4 - i}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </PhoneFrame>
  );
}