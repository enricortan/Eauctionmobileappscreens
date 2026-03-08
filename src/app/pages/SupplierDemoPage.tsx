import React, { useState, useEffect } from 'react';
import { C, avBgs, avColors, fmt, fmtFull } from '../components/auction/colors';
import { PhoneSection, PhoneBody, PhoneFooter, Divider, Card, Btn, ModalOverlay, TimerBox } from '../components/auction/PhoneFrame';

const LIVE_ITEMS = [
  { id: 1, name: 'Laptops', spec: '4GB RAM, 1TB HDD × 100 units', budget: 55000, bestBid: 48500 },
  { id: 2, name: 'Laptop Bags', spec: '× 100 units', budget: 4000, bestBid: 3200 },
  { id: 3, name: 'Desktops', spec: '8GB RAM, 1TB HDD, 15" LCD × 2000', budget: 620000, bestBid: 520000 },
  { id: 4, name: 'Desktop Warranty', spec: '3-Year coverage × 2000 units', budget: 120000, bestBid: 98000 },
];
const LEADER_BID = 649700;
const INITIAL_AMOUNTS = [49800, 3400, 535000, 102000];

// ─────────────────────────────────────────────
// Screen 0: Email Invitation
// ─────────────────────────────────────────────
function EmailScreen({ onAccept }: { onAccept: () => void }) {
  return (
    <>
      <div style={{ background: '#2D3748', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{ fontSize: 18, color: 'white' }}>←</div>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'white' }}>Inbox</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>1 of 24</div>
      </div>

      <div style={{ background: 'white', padding: '14px 20px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8 }}>
          You've been invited to bid: IT Equipment Procurement
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: C.accent, flexShrink: 0 }}>A</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>eAuction Platform <span style={{ color: C.textSoft, fontWeight: 400 }}>&lt;noreply@eauction.com&gt;</span></div>
            <div style={{ fontSize: 11, color: C.textSoft }}>To: supplierx@company.com · Dec 18, 2024, 9:04 AM</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', background: '#F7F8FA', scrollbarWidth: 'none' as const }}>
        <div style={{ background: 'white', margin: 16, borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ background: C.accent, padding: 20 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, marginBottom: 6 }}>eAUCTION PLATFORM</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 4 }}>You're invited to bid</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>Company ABC has invited Supplier X to participate in a reverse auction.</div>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16, lineHeight: 1.6 }}>
              Hello <strong style={{ color: C.text }}>Supplier X</strong>,<br /><br />
              Company ABC has invited you to submit competitive bids for the following procurement auction.
            </div>
            <div style={{ background: C.bg, borderRadius: 12, padding: 14, marginBottom: 16, border: `1.5px solid ${C.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, letterSpacing: 1, marginBottom: 10 }}>AUCTION DETAILS</div>
              {[['Auction', 'IT Equipment Procurement'], ['Reference', 'AUC-2024-0892'], ['Hosted by', 'Company ABC'], ['Opens', 'Dec 20, 2024 · 12:00 PM'], ['Duration', '2 hours'], ['Items', '4 line items']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                  <span style={{ color: C.textMid }}>{k}</span>
                  <span style={{ fontWeight: 600, color: C.text }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, letterSpacing: 1, marginBottom: 8 }}>ITEMS TO BID ON</div>
            <div style={{ background: C.bg, borderRadius: 12, padding: 12, marginBottom: 16, border: `1.5px solid ${C.border}` }}>
              {[['Laptops', '4GB RAM, 1TB HDD', '100 units'], ['Laptop Bags', 'Standard carry', '100 units'], ['Desktops', '8GB RAM + 15" LCD', '2,000 units'], ['Desktop Warranty', '3-Year coverage', '2,000 units']].map(([name, spec, qty]) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: `1px solid ${C.border}` }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{name}</div>
                    <div style={{ fontSize: 10, color: C.textSoft }}>{spec}</div>
                  </div>
                  <span style={{ fontSize: 11, color: C.textMid, fontWeight: 500 }}>{qty}</span>
                </div>
              ))}
            </div>
            <div style={{ background: C.accentSoft, borderRadius: 12, padding: '12px 14px', marginBottom: 20, border: `1.5px solid rgba(124,58,237,0.15)` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 1, marginBottom: 8 }}>AUCTION RULES</div>
              <div style={{ fontSize: 12, color: C.accent, lineHeight: 1.7 }}>
                ✓ Live supplier rankings visible<br />✓ Best bid amount shown<br />✗ Auto-extend disabled
              </div>
            </div>
            <button onClick={onAccept} style={{ display: 'block', width: '100%', background: C.accent, color: 'white', textAlign: 'center', padding: 14, borderRadius: 12, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 12 }}>
              View Auction & Register →
            </button>
            <button style={{ display: 'block', width: '100%', background: C.bg, color: C.textMid, textAlign: 'center', padding: 12, borderRadius: 12, fontWeight: 600, fontSize: 13, border: `1.5px solid ${C.border}`, cursor: 'pointer', fontFamily: 'inherit' }}>
              Decline Invitation
            </button>
            <div style={{ fontSize: 11, color: C.textSoft, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
              This invitation expires on Dec 20, 2024 at 12:00 PM.<br />Questions? Contact procurement@companyabc.com
            </div>
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// Screen 1: Review & Accept
// ─────────────────────────────────────────────
function ReviewScreen({ onAccept, onBack }: { onAccept: () => void; onBack: () => void }) {
  return (
    <>
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 12px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: C.textMid, padding: 0, lineHeight: 1 }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1 }}>AUCTION INVITE</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>IT Equipment Procurement</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.amberSoft, color: C.amber }}>Pending</span>
        </div>
      </PhoneSection>

      <PhoneBody>
        <div style={{ background: C.accentSoft, borderRadius: 14, padding: '12px 14px', border: `1.5px solid rgba(124,58,237,0.18)`, marginBottom: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 22 }}>📋</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>Company ABC invited you</div>
            <div style={{ fontSize: 12, color: C.accent, marginTop: 2 }}>Auction starts Dec 20, 2024 · 12:00 PM</div>
          </div>
        </div>

        <div style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.border}`, display: 'flex', marginBottom: 10, overflow: 'hidden' }}>
          {[['4', 'ITEMS'], ['3', 'SUPPLIERS'], ['2h', 'DURATION']].map(([val, lbl], i) => (
            <div key={lbl} style={{ flex: 1, padding: '12px 14px', textAlign: 'center' as const, borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{val}</div>
              <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, letterSpacing: '0.5px' }}>{lbl}</div>
            </div>
          ))}
        </div>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Auction Info</div>
          {[['Reference', 'AUC-2024-0892'], ['Hosted by', 'Company ABC'], ['Opens', 'Dec 20 · 12:00 PM'], ['Closes', 'Dec 20 · 2:00 PM']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
              <span style={{ color: C.textMid }}>{k}</span><span style={{ fontWeight: 600, color: C.text }}>{v}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Items to Bid On</div>
          {LIVE_ITEMS.map((item, i) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < LIVE_ITEMS.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: avBgs[i], color: avColors[i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div>
                <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{item.spec}</div>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Auction Rules</div>
          {[['✓', C.green, C.greenSoft, 'Live rankings visible to you'], ['✓', C.green, C.greenSoft, 'Best bid amount shown'], ['✗', C.red, C.redSoft, 'No auto-extension']].map(([icon, col, bg, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: bg as string, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: col as string }}>{icon}</div>
              <div style={{ fontSize: 13, color: C.text }}>{label}</div>
            </div>
          ))}
        </Card>

        <Card style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 }}>Notes from Buyer</div>
          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>Please submit your most competitive prices for all 4 line items. Bids must cover the full scope. Partial bids will not be accepted.</div>
        </Card>
      </PhoneBody>

      <PhoneFooter>
        <Btn variant="green" onClick={onAccept} style={{ marginBottom: 8, fontSize: 14 }}>✓ Accept & Participate</Btn>
        <Btn variant="ghost">Decline Invitation</Btn>
      </PhoneFooter>
    </>
  );
}

// ─────────────────────────────────────────────
// Screen 2: Live Bidding
// ─────────────────────────────────────────────
function BiddingScreen({ amounts, setAmounts, onSubmit, onBack, timeLeft }: {
  amounts: number[];
  setAmounts: React.Dispatch<React.SetStateAction<number[]>>;
  onSubmit: (total: number, amounts: number[]) => void;
  onBack: () => void;
  timeLeft: number;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const total = amounts.reduce((a, b) => a + b, 0);
  const baseline = 654000;
  const gap = total - LEADER_BID;
  const isLeading = gap <= 0;

  const stepBid = (idx: number, delta: number) => setAmounts(prev => prev.map((v, i) => i === idx ? Math.max(0, v + delta) : v));
  const setBidVal = (idx: number, val: string) => setAmounts(prev => prev.map((v, i) => i === idx ? (parseInt(val) || 0) : v));

  return (
    <>
      <PhoneSection>
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: C.textMid, padding: 0, lineHeight: 1 }}>←</button>
              <div>
                <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1, marginBottom: 4 }}>LIVE AUCTION · SUPPLIER X</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>IT Equipment Procurement</div>
                <div style={{ fontSize: 12, color: C.textMid, marginTop: 3 }}>AUC-2024-0892</div>
              </div>
            </div>
            <TimerBox seconds={timeLeft} />
          </div>
          <div style={{ marginTop: 14, marginBottom: 14, background: C.bg, borderRadius: 14, padding: '12px 14px', border: `1.5px solid ${C.border}` }}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, textAlign: 'center' as const, paddingRight: 14, borderRight: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6 }}>MY RANK</div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: isLeading ? C.greenSoft : C.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: isLeading ? C.green : C.red, margin: '0 auto 4px' }}>{isLeading ? '#1' : '#2'}</div>
                <div style={{ fontSize: 10, color: C.textSoft }}>of 3</div>
              </div>
              <div style={{ flex: 2, paddingLeft: 14, paddingRight: 14, borderRight: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6 }}>MY LATEST BID</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{fmt(baseline)}</div>
                <div style={{ fontSize: 11, color: C.textSoft, marginTop: 3 }}>3 bids placed</div>
              </div>
              <div style={{ flex: 1.2, paddingLeft: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6 }}>VS LEADER</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: isLeading ? C.green : C.red }}>
                  {isLeading ? `−${fmt(Math.abs(gap))}` : `+${fmt(gap)}`}
                </div>
                <div style={{ fontSize: 10, color: C.textSoft, marginTop: 3 }}>{isLeading ? 'leading' : 'behind'}</div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div style={{ padding: '10px 20px 0', fontSize: 13, fontWeight: 600, color: C.textMid }}>Submit New Bid</div>
      </PhoneSection>

      <div style={{ flex: 1, overflowY: 'auto', background: C.bg, scrollbarWidth: 'none' as const }}>
        <div style={{ padding: '8px 12px 0' }}>
          {LIVE_ITEMS.map((item, idx) => {
            const isBest = amounts[idx] <= item.bestBid;
            return (
              <div key={item.id} style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${isBest ? C.green : C.border}`, padding: '12px 14px', marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: C.textSoft }}>{item.spec}</div>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ fontSize: 10, color: C.textSoft }}>Best bid</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.green }}>{fmtFull(item.bestBid)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => stepBid(idx, -500)} style={{ width: 40, height: 40, borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.bg, fontSize: 20, color: C.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'inherit' }}>−</button>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.textSoft, fontSize: 13, pointerEvents: 'none' as const }}>₱</span>
                    <input
                      type="number"
                      value={amounts[idx]}
                      onChange={e => setBidVal(idx, e.target.value)}
                      style={{
                        width: '100%', padding: '10px 10px 10px 22px', borderRadius: 9,
                        border: `1.5px solid ${isBest ? C.green : C.borderStrong}`,
                        background: isBest ? C.greenSoft : C.surface,
                        color: C.text, fontSize: 15, fontWeight: 700, outline: 'none', fontFamily: 'inherit',
                      }}
                    />
                  </div>
                  <button onClick={() => stepBid(idx, 500)} style={{ width: 40, height: 40, borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.bg, fontSize: 20, color: C.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'inherit' }}>+</button>
                </div>
                {isBest && <div style={{ fontSize: 10, color: C.green, marginTop: 5, fontWeight: 600 }}>✓ Competitive on this item</div>}
              </div>
            );
          })}
        </div>
        <div style={{ padding: '12px 12px 24px' }}>
          <Card style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: C.textSoft, marginBottom: 2 }}>New Total Bid</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: total < baseline ? C.green : C.text }}>{fmtFull(total)}</div>
              </div>
              {total !== baseline && (
                <div style={{ borderRadius: 10, padding: '5px 10px', fontSize: 12, fontWeight: 700, background: total < baseline ? C.greenSoft : C.redSoft, color: total < baseline ? C.green : C.red, border: `1px solid ${total < baseline ? C.green : C.red}` }}>
                  {total < baseline ? `↓ ${fmt(baseline - total)} lower` : `↑ ${fmt(total - baseline)} higher`}
                </div>
              )}
            </div>
            <button onClick={() => setShowConfirm(true)} style={{ width: '100%', background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: 12, fontFamily: 'inherit' }}>
              Submit Bid
            </button>
          </Card>
        </div>
      </div>

      <PhoneFooter>
        <button onClick={() => setShowMsg(true)} style={{ width: '100%', background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 12, fontFamily: 'inherit' }}>Message Buyer</button>
      </PhoneFooter>

      {showConfirm && (
        <ModalOverlay onClose={() => setShowConfirm(false)}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Confirm Submission</div>
          <div style={{ fontSize: 13, color: C.textMid, marginBottom: 18 }}>Your bid will be visible to the buyer immediately.</div>
          <div style={{ background: C.bg, borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.textMid }}>Total bid</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{fmtFull(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: C.textMid }}>vs last bid</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: total < baseline ? C.green : C.red }}>
                {total < baseline ? `↓ ${fmt(baseline - total)} lower` : `↑ ${fmt(total - baseline)} higher`}
              </span>
            </div>
          </div>
          <Btn variant="primary" onClick={() => { setShowConfirm(false); onSubmit(total, amounts); }} style={{ marginBottom: 8, fontSize: 14 }}>Confirm & Submit</Btn>
          <Btn variant="plain" onClick={() => setShowConfirm(false)}>Cancel</Btn>
        </ModalOverlay>
      )}

      {showMsg && (
        <ModalOverlay onClose={() => setShowMsg(false)}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Message Buyer</div>
          <textarea placeholder="Type your message…" style={{ width: '100%', height: 80, padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${C.borderStrong}`, background: C.surface, color: C.text, fontSize: 13, fontFamily: 'inherit', resize: 'none', outline: 'none', marginBottom: 10 }} />
          <Btn variant="primary" onClick={() => setShowMsg(false)} style={{ marginBottom: 8, fontSize: 14 }}>Send</Btn>
          <Btn variant="plain" onClick={() => setShowMsg(false)}>Cancel</Btn>
        </ModalOverlay>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
// Screen 3: Bid Confirmed
// ────────────────────────────────────────────
function BidConfirmedScreen({ submittedTotal, submittedAmounts, timeLeft, onImprove }: {
  submittedTotal: number;
  submittedAmounts: number[];
  timeLeft: number;
  onImprove: () => void;
}) {
  const [showMsg, setShowMsg] = useState(false);

  // In a reverse auction, lower total wins.
  const isLeading = submittedTotal <= LEADER_BID;
  const prevBid = 654000;
  const gapVsLeader = submittedTotal - LEADER_BID; // negative = ahead, positive = behind
  const rank = isLeading ? '#1' : submittedTotal <= 670000 ? '#2' : '#3';
  const rankColor = isLeading ? C.green : C.red;
  const rankBg = isLeading ? C.greenSoft : C.redSoft;
  const bannerBg = isLeading ? C.green : C.red;
  const borderColor = isLeading ? C.green : C.red;
  const bidLowerThanPrev = submittedTotal < prevBid;

  return (
    <>
      <PhoneSection>
        <div style={{ padding: '18px 20px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1, marginBottom: 4 }}>LIVE AUCTION · SUPPLIER X</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>IT Equipment Procurement</div>
              <div style={{ fontSize: 12, color: C.textMid, marginTop: 3 }}>AUC-2024-0892</div>
            </div>
            <TimerBox seconds={timeLeft} />
          </div>
        </div>
      </PhoneSection>

      <div style={{ flex: 1, overflowY: 'auto', background: C.bg, scrollbarWidth: 'none' as const, padding: '16px 16px 0' }}>
        {/* Submission banner */}
        <div style={{ background: bannerBg, borderRadius: 16, padding: '16px 18px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
            {isLeading ? '✓' : '⚠️'}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>
              {isLeading ? 'Bid submitted. You\'re leading!' : 'Bid submitted. You\'re behind.'}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 3 }}>
              {isLeading
                ? `₱${Math.abs(gapVsLeader).toLocaleString()} ahead of the current leader`
                : `₱${gapVsLeader.toLocaleString()} behind the current leader`}
            </div>
          </div>
        </div>

        {/* Standing card */}
        <div style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${borderColor}`, padding: 16, marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, letterSpacing: 1, marginBottom: 10 }}>YOUR STANDING</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: rankBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: rankColor }}>{rank}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{fmtFull(submittedTotal)}</div>
              {isLeading ? (
                <>
                  <div style={{ fontSize: 12, color: C.green, marginTop: 3 }}>
                    ↓ {fmt(Math.abs(gapVsLeader))} below the previous leader
                  </div>
                  <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>Now leading the auction</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 12, color: C.red, marginTop: 3 }}>
                    ↑ {fmt(gapVsLeader)} above the current leader ({fmtFull(LEADER_BID)})
                  </div>
                  <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>Improve your bid to compete</div>
                </>
              )}
            </div>
          </div>

          {/* vs prev bid */}
          {bidLowerThanPrev ? (
            <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 10, background: C.greenSoft, fontSize: 12, color: C.green, fontWeight: 600 }}>
              ↓ {fmt(prevBid - submittedTotal)} lower than your previous bid (₱{prevBid.toLocaleString()})
            </div>
          ) : (
            <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 10, background: C.redSoft, fontSize: 12, color: C.red, fontWeight: 600 }}>
              ↑ {fmt(submittedTotal - prevBid)} higher than your previous bid (₱{prevBid.toLocaleString()}), which weakens your position
            </div>
          )}
        </div>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Submitted Bid Breakdown</div>
          {LIVE_ITEMS.map((item, idx) => {
            const itemIsCompetitive = submittedAmounts[idx] <= item.bestBid;
            return (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                <div>
                  <span style={{ color: C.textMid }}>{item.name}</span>
                  {itemIsCompetitive
                    ? <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 600, color: C.green }}>✓ best</span>
                    : <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 600, color: C.red }}>↑ not best</span>
                  }
                </div>
                <span style={{ fontWeight: 600, color: itemIsCompetitive ? C.green : C.red }}>{fmtFull(submittedAmounts[idx])}</span>
              </div>
            );
          })}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: `2px solid ${C.border}`, marginTop: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: isLeading ? C.green : C.red }}>{fmtFull(submittedTotal)}</span>
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>My Bid History</div>
          {[['Bid 1', 695000, '12:03 PM', false], ['Bid 2', 672000, '12:18 PM', false], ['Bid 3', 654000, '12:28 PM', false], ['Bid 4 (latest)', submittedTotal, '12:34 PM', true]].map(([label, val, time, isCurrent]) => (
            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
              <div>
                <div style={{ color: C.textMid }}>{label as string}</div>
                <div style={{ fontSize: 10, color: C.textSoft }}>{time as string}</div>
              </div>
              <span style={{ fontWeight: isCurrent ? 700 : 400, color: (isCurrent as boolean) ? (isLeading ? C.green : C.red) : C.textSoft }}>{fmtFull(val as number)}</span>
            </div>
          ))}
        </Card>

        {!isLeading && (
          <div style={{ background: C.redSoft, borderRadius: 14, padding: 14, border: `1.5px solid rgba(220,38,38,0.2)`, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.red, marginBottom: 6 }}>⚠️ You are not competitive</div>
            <div style={{ fontSize: 12, color: C.red, lineHeight: 1.6 }}>Your bid of {fmtFull(submittedTotal)} is higher than the leader's {fmtFull(LEADER_BID)}. In a reverse auction, the lowest bid wins. Tap "Improve My Bid" to re-enter.</div>
          </div>
        )}

        <div style={{ background: C.amberSoft, borderRadius: 14, padding: 14, border: `1.5px solid rgba(217,119,6,0.2)`, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 6 }}>⏳ Auction closes in ~43 minutes</div>
          <div style={{ fontSize: 12, color: C.amber, lineHeight: 1.6 }}>You can submit additional bids at any time before the auction closes.</div>
        </div>
      </div>

      <PhoneFooter>
        <Btn variant="primary" onClick={onImprove} style={{ marginBottom: 8, fontSize: 14 }}>Improve My Bid</Btn>
        <Btn variant="ghost" onClick={() => setShowMsg(true)}>Message Buyer</Btn>
      </PhoneFooter>

      {showMsg && (
        <ModalOverlay onClose={() => setShowMsg(false)}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Message Buyer</div>
          <textarea placeholder="Type your message…" style={{ width: '100%', height: 80, padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${C.borderStrong}`, background: C.surface, color: C.text, fontSize: 13, fontFamily: 'inherit', resize: 'none', outline: 'none', marginBottom: 10 }} />
          <Btn variant="primary" onClick={() => setShowMsg(false)} style={{ marginBottom: 8, fontSize: 14 }}>Send</Btn>
          <Btn variant="plain" onClick={() => setShowMsg(false)}>Cancel</Btn>
        </ModalOverlay>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function SupplierDemoPage() {
  const [screen, setScreen] = useState(0);
  const [amounts, setAmounts] = useState([...INITIAL_AMOUNTS]);
  const [submittedTotal, setSubmittedTotal] = useState(0);
  const [submittedAmounts, setSubmittedAmounts] = useState([...INITIAL_AMOUNTS]);
  const [timeLeft, setTimeLeft] = useState(47 * 60 + 23);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      borderRadius: 0,
      display: 'flex', flexDirection: 'column',
      background: C.bg,
      fontFamily: 'Inter, -apple-system, "Helvetica Neue", sans-serif',
      overflow: 'hidden',
    }}>
      <style>{`html,body,#root{border-radius:0!important;margin:0;padding:0;overflow:hidden;}`}</style>
      {screen === 0 && <EmailScreen onAccept={() => setScreen(1)} />}
      {screen === 1 && <ReviewScreen onAccept={() => setScreen(2)} onBack={() => setScreen(0)} />}
      {screen === 2 && (
        <BiddingScreen
          amounts={amounts}
          setAmounts={setAmounts}
          onSubmit={(total, amts) => {
            setSubmittedTotal(total);
            setSubmittedAmounts([...amts]);
            setScreen(3);
          }}
          onBack={() => setScreen(1)}
          timeLeft={timeLeft}
        />
      )}
      {screen === 3 && (
        <BidConfirmedScreen
          submittedTotal={submittedTotal}
          submittedAmounts={submittedAmounts}
          timeLeft={timeLeft}
          onImprove={() => setScreen(2)}
        />
      )}
    </div>
  );
}