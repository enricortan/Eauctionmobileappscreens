import React from 'react';
import { useNavigate } from 'react-router';
import { C, avBgs, avColors, fmt, fmtFull } from '../components/auction/colors';
import { PhoneFrame, PhoneSection, PhoneBody, PhoneFooter, Divider, Card, Chip } from '../components/auction/PhoneFrame';
import { RebidSuggestionScreen, AlertsScreen, BidHistoryScreen } from '../components/supplier/SupplierGalleryScreens';

const LIVE_ITEMS = [
  { id: 1, name: 'Laptops', spec: '4GB RAM, 1TB HDD × 100 units', budget: 55000, bestBid: 48500 },
  { id: 2, name: 'Laptop Bags', spec: '× 100 units', budget: 4000, bestBid: 3200 },
  { id: 3, name: 'Desktops', spec: '8GB RAM, 1TB HDD, 15" LCD × 2000', budget: 620000, bestBid: 520000 },
  { id: 4, name: 'Desktop Warranty', spec: '3-Year coverage × 2000 units', budget: 120000, bestBid: 98000 },
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: 10,
  border: `1.5px solid ${C.borderStrong}`, background: C.surface,
  color: C.text, fontSize: 13, fontFamily: 'Inter, sans-serif',
};

// ─── Screen 1: Email Invitation ───
function EmailInvitationScreen() {
  return (
    <PhoneFrame label="Screen 1" sublabel="Email Invitation" minHeight={780}>
      {/* Email app bar */}
      <div style={{ background: '#2D3748', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{ fontSize: 18, color: 'white' }}>←</div>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'white' }}>Inbox</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>1 of 24</div>
      </div>

      {/* Email meta */}
      <div style={{ background: 'white', padding: '14px 20px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8 }}>
          You've been invited to bid — IT Equipment Procurement
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: C.accent, flexShrink: 0 }}>A</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>eAuction Platform <span style={{ color: C.textSoft, fontWeight: 400 }}>&lt;noreply@eauction.com&gt;</span></div>
            <div style={{ fontSize: 11, color: C.textSoft }}>To: supplierx@company.com · Dec 18, 2024, 9:04 AM</div>
          </div>
        </div>
      </div>

      {/* Email body */}
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
            <button style={{ display: 'block', width: '100%', background: C.accent, color: 'white', textAlign: 'center', padding: 14, borderRadius: 12, fontWeight: 700, fontSize: 14, border: 'none', fontFamily: 'inherit', marginBottom: 12 }}>
              View Auction & Register →
            </button>
            <button style={{ display: 'block', width: '100%', background: C.bg, color: C.textMid, textAlign: 'center', padding: 12, borderRadius: 12, fontWeight: 600, fontSize: 13, border: `1.5px solid ${C.border}`, fontFamily: 'inherit' }}>
              Decline Invitation
            </button>
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>
    </PhoneFrame>
  );
}

// ─── Screen 2: Review & Accept ───
function ReviewAcceptScreen() {
  return (
    <PhoneFrame label="Screen 2" sublabel="Review & Accept Invitation" minHeight={780}>
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 12px' }}>
          <div style={{ fontSize: 18, color: C.textMid }}>←</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1 }}>AUCTION INVITE</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>IT Equipment Procurement</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.amberSoft, color: C.amber }}>Pending</span>
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
            <div key={lbl} style={{ flex: 1, padding: '12px 14px', textAlign: 'center', borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
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
              <div>
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
          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>Please submit your most competitive prices for all 4 line items. Bids must cover the full scope.</div>
        </Card>
      </PhoneBody>

      <PhoneFooter>
        <button style={{ width: '100%', background: C.green, color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, padding: 12, fontFamily: 'inherit', marginBottom: 8 }}>✓ Accept & Participate</button>
        <button style={{ width: '100%', background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 13, fontWeight: 700, padding: 12, fontFamily: 'inherit' }}>Decline Invitation</button>
      </PhoneFooter>
    </PhoneFrame>
  );
}

// ─── Screen 3: Live Bidding ───
const BID_AMOUNTS = [49800, 3400, 535000, 102000];

function LiveBiddingScreen() {
  const total = BID_AMOUNTS.reduce((a, b) => a + b, 0);
  const baseline = 654000;
  const gap = total - 649700;

  return (
    <PhoneFrame label="Screen 3" sublabel="Live Bidding — Submit Bid" minHeight={820}>
      <PhoneSection>
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 18, color: C.textMid }}>←</div>
                <div>
                  <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1, marginBottom: 4 }}>LIVE AUCTION · SUPPLIER X</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>IT Equipment Procurement</div>
                  <div style={{ fontSize: 12, color: C.textMid, marginTop: 3 }}>AUC-2024-0892</div>
                </div>
              </div>
            </div>
            <div style={{ background: C.amberSoft, border: `1.5px solid ${C.amber}`, borderRadius: 14, padding: '7px 12px', textAlign: 'center', minWidth: 62, flexShrink: 0 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', marginBottom: 1, color: C.amber }}>LEFT</div>
              <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1, color: C.amber }}>38:41</div>
            </div>
          </div>
          <div style={{ marginTop: 14, marginBottom: 14, background: C.bg, borderRadius: 14, padding: '12px 14px', border: `1.5px solid ${C.border}` }}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, textAlign: 'center', paddingRight: 14, borderRight: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6 }}>MY RANK</div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: C.accent, margin: '0 auto 4px' }}>#2</div>
                <div style={{ fontSize: 10, color: C.textSoft }}>of 3</div>
              </div>
              <div style={{ flex: 2, paddingLeft: 14, paddingRight: 14, borderRight: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6 }}>MY LATEST BID</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{fmt(baseline)}</div>
                <div style={{ fontSize: 11, color: C.textSoft, marginTop: 3 }}>3 bids placed</div>
              </div>
              <div style={{ flex: 1.2, paddingLeft: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6 }}>VS LEADER</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.red }}>+{fmt(gap)}</div>
                <div style={{ fontSize: 10, color: C.textSoft, marginTop: 3 }}>behind</div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div style={{ padding: '10px 20px 0', fontSize: 13, fontWeight: 600, color: C.textMid }}>Submit New Bid</div>
      </PhoneSection>

      <PhoneBody>
        <div style={{ padding: '8px 0 0' }}>
          {LIVE_ITEMS.map((item, idx) => {
            const isBest = BID_AMOUNTS[idx] <= item.bestBid;
            return (
              <div key={item.id} style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${isBest ? C.green : C.border}`, padding: '12px 14px', marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: C.textSoft }}>{item.spec}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: C.textSoft }}>Best bid</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.green }}>{fmtFull(item.bestBid)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button style={{ width: 36, height: 36, borderRadius: 9, border: `1.5px solid ${C.border}`, background: C.bg, fontSize: 18, color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'inherit' }}>−</button>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.textSoft, fontSize: 13 }}>₱</span>
                    <input readOnly type="text" value={BID_AMOUNTS[idx].toLocaleString()} style={{
                      width: '100%', padding: '9px 10px 9px 22px', borderRadius: 9,
                      border: `1.5px solid ${isBest ? C.green : C.borderStrong}`,
                      background: isBest ? C.greenSoft : C.surface,
                      color: C.text, fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
                    }} />
                  </div>
                  <button style={{ width: 36, height: 36, borderRadius: 9, border: `1.5px solid ${C.border}`, background: C.bg, fontSize: 18, color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'inherit' }}>+</button>
                </div>
                {isBest && <div style={{ fontSize: 10, color: C.green, marginTop: 5, fontWeight: 600 }}>✓ Competitive on this item</div>}
              </div>
            );
          })}
        </div>

        <Card style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: C.textSoft, marginBottom: 2 }}>New Total Bid</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: C.text }}>{fmtFull(total)}</div>
            </div>
            <div style={{ borderRadius: 10, padding: '5px 10px', fontSize: 12, fontWeight: 700, background: C.amberSoft, color: C.amber, border: `1px solid ${C.amber}` }}>
              ↑ {fmt(total - 649700)} vs leader
            </div>
          </div>
          <button style={{ width: '100%', background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, padding: 12, fontFamily: 'inherit' }}>
            Submit Bid
          </button>
        </Card>
      </PhoneBody>

      <PhoneFooter>
        <button style={{ width: '100%', background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 13, fontWeight: 700, padding: 12, fontFamily: 'inherit' }}>Message Buyer</button>
      </PhoneFooter>
    </PhoneFrame>
  );
}

// ─── Screen 3b: Bid Confirm Modal (overlaid state) ───
function BidConfirmModalScreen() {
  return (
    <PhoneFrame label="Screen 3b" sublabel="Live Bidding — Confirm Modal" minHeight={820}>
      <PhoneSection>
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1, marginBottom: 4 }}>LIVE AUCTION · SUPPLIER X</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>IT Equipment Procurement</div>
            </div>
            <div style={{ background: C.amberSoft, border: `1.5px solid ${C.amber}`, borderRadius: 14, padding: '7px 12px', textAlign: 'center', minWidth: 62 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.amber }}>LEFT</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.amber }}>38:41</div>
            </div>
          </div>
        </div>
        <Divider />
      </PhoneSection>

      {/* Blurred background content */}
      <div style={{ flex: 1, background: C.bg, padding: '12px', filter: 'blur(1px)', opacity: 0.4, position: 'relative' }}>
        {LIVE_ITEMS.map((item, idx) => (
          <div key={item.id} style={{ background: C.surface, borderRadius: 12, border: `1.5px solid ${C.border}`, padding: '10px 12px', marginBottom: 6, height: 74 }} />
        ))}
      </div>

      {/* Modal overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'flex-end', zIndex: 50 }}>
        <div style={{ width: '100%', background: C.surface, borderRadius: '28px 28px 0 0', padding: '20px 20px 40px' }}>
          <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: '0 auto 20px' }} />
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Confirm Submission</div>
          <div style={{ fontSize: 13, color: C.textMid, marginBottom: 18 }}>Your bid will be visible to the buyer immediately.</div>
          <div style={{ background: C.bg, borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.textMid }}>Total bid</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{fmtFull(690200)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: C.textMid }}>vs last bid</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.red }}>↑ {fmt(36200)} higher</span>
            </div>
          </div>
          <button style={{ width: '100%', background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, padding: 13, fontFamily: 'inherit', marginBottom: 8 }}>Confirm & Submit</button>
          <button style={{ width: '100%', background: 'transparent', border: 'none', color: C.textMid, fontSize: 13, fontWeight: 600, padding: 10, fontFamily: 'inherit' }}>Cancel</button>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── Screen 4: Bid Confirmed ───
const CONFIRMED_BREAKDOWN = [48500, 3200, 488500, 98000];
const CONFIRMED_TOTAL = CONFIRMED_BREAKDOWN.reduce((a, b) => a + b, 0);

function BidConfirmedScreen() {
  return (
    <PhoneFrame label="Screen 4" sublabel="Bid Confirmed — #1 Rank" minHeight={780}>
      <PhoneSection>
        <div style={{ padding: '18px 20px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1, marginBottom: 4 }}>LIVE AUCTION · SUPPLIER X</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>IT Equipment Procurement</div>
              <div style={{ fontSize: 12, color: C.textMid, marginTop: 3 }}>AUC-2024-0892</div>
            </div>
            <div style={{ background: C.amberSoft, border: `1.5px solid ${C.amber}`, borderRadius: 14, padding: '7px 12px', textAlign: 'center', minWidth: 62, flexShrink: 0 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.amber }}>LEFT</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.amber }}>43:12</div>
            </div>
          </div>
        </div>
      </PhoneSection>

      <PhoneBody>
        <div style={{ background: C.green, borderRadius: 16, padding: '16px 18px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>✓</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>Bid submitted successfully</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 3 }}>Your bid is now live · Dec 20, 2024 · 12:34 PM</div>
          </div>
        </div>

        <div style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.green}`, padding: 16, marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, letterSpacing: 1, marginBottom: 10 }}>YOUR STANDING</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: C.green }}>#1</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{fmtFull(CONFIRMED_TOTAL)}</div>
              <div style={{ fontSize: 12, color: C.green, marginTop: 3 }}>↓ {fmt(654000 - CONFIRMED_TOTAL)} lower than last bid</div>
              <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>Now leading — ₱11.5K ahead of #2</div>
            </div>
          </div>
        </div>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Submitted Bid Breakdown</div>
          {LIVE_ITEMS.map((item, idx) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
              <span style={{ color: C.textMid }}>{item.name}</span>
              <span style={{ fontWeight: 600, color: C.green }}>{fmtFull(CONFIRMED_BREAKDOWN[idx])}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: `2px solid ${C.border}`, marginTop: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: C.green }}>{fmtFull(CONFIRMED_TOTAL)}</span>
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>My Bid History</div>
          {[['Bid 1', 695000, '12:03 PM', false], ['Bid 2', 672000, '12:18 PM', false], ['Bid 3', 654000, '12:28 PM', false], ['Bid 4 (latest)', CONFIRMED_TOTAL, '12:34 PM', true]].map(([label, val, time, isCurrent]) => (
            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
              <div>
                <div style={{ color: C.textMid }}>{label as string}</div>
                <div style={{ fontSize: 10, color: C.textSoft }}>{time as string}</div>
              </div>
              <span style={{ fontWeight: isCurrent ? 700 : 400, color: (isCurrent as boolean) ? C.green : C.textSoft }}>{fmtFull(val as number)}</span>
            </div>
          ))}
        </Card>

        <div style={{ background: C.amberSoft, borderRadius: 14, padding: 14, border: `1.5px solid rgba(217,119,6,0.2)`, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 6 }}>⏳ Auction closes in ~43 minutes</div>
          <div style={{ fontSize: 12, color: C.amber, lineHeight: 1.6 }}>You can submit additional bids at any time before the auction closes.</div>
        </div>
      </PhoneBody>

      <PhoneFooter>
        <button style={{ width: '100%', background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, padding: 12, fontFamily: 'inherit', marginBottom: 8 }}>Improve My Bid</button>
        <button style={{ width: '100%', background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 13, fontWeight: 700, padding: 12, fontFamily: 'inherit' }}>Message Buyer</button>
      </PhoneFooter>
    </PhoneFrame>
  );
}

// ─── Section heading ───
function SectionHeading({ number, title, sub, color = C.green }: { number: string; title: string; sub: string; color?: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: color + '18', color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, flexShrink: 0 }}>{number}</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: '-0.3px' }}>{title}</div>
          <div style={{ fontSize: 14, color: C.textMid, marginTop: 2 }}>{sub}</div>
        </div>
      </div>
      <div style={{ height: 2, background: `linear-gradient(90deg, ${color}40, transparent)`, borderRadius: 2 }} />
    </div>
  );
}

export default function SupplierScreensPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, "Helvetica Neue", sans-serif', background: '#ECEEF2', minHeight: '100vh' }}>

      {/* Nav */}
      <style>{`
        .sscr-nav-inner { max-width: 1600px; margin: 0 auto; display: flex; align-items: center; min-height: 56px; gap: 12px; flex-wrap: wrap; padding: 8px 0; }
        .sscr-badge { font-size: 11px; font-weight: 600; color: #9BA3AF; letter-spacing: 1.5px; text-transform: uppercase; white-space: nowrap; }
        .sscr-hero { padding: 44px 24px 40px; text-align: center; }
        .sscr-hero h1 { font-size: 34px; }
        .sscr-hero p { font-size: 15px; }
        .sscr-footer { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; padding: 24px; }
        .sscr-footer button { flex: 0 0 auto; }
        @media (max-width: 640px) {
          .sscr-nav-inner { gap: 0; padding: 10px 0; row-gap: 8px; }
          .sscr-nav-row1 { width: 100%; display: flex; align-items: center; gap: 10px; }
          .sscr-nav-sep { display: none; }
          .sscr-badge { display: none; }
          .sscr-hero { padding: 28px 20px 24px; }
          .sscr-hero h1 { font-size: 22px; }
          .sscr-hero p { font-size: 13px; }
          .sscr-footer { flex-direction: column; align-items: stretch; padding: 16px 20px; }
          .sscr-footer button { width: 100%; margin-left: 0 !important; }
        }
      `}</style>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.97)', borderBottom: `1px solid ${C.border}`, backdropFilter: 'blur(12px)', padding: '0 24px' }}>
        <div className="sscr-nav-inner">
          <div className="sscr-nav-row1" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
            <button onClick={() => navigate('/supplier')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.textMid, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, padding: 0, whiteSpace: 'nowrap', flexShrink: 0 }}>
              ← Supplier Journey
            </button>
            <div className="sscr-nav-sep" style={{ width: 1, height: 20, background: C.border, flexShrink: 0 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>🏢</div>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.text, whiteSpace: 'nowrap' }}>Supplier — All Screens</span>
            </div>
          </div>
          <span className="sscr-badge">7 Screens · Static Layout</span>
        </div>
      </nav>

      {/* Header */}
      <div className="sscr-hero" style={{ background: 'linear-gradient(135deg, #0C9E6A 0%, #059669 100%)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12 }}>Supplier Journey · Screen Reference</div>
        <h1 style={{ color: 'white', letterSpacing: '-0.5px', marginBottom: 10 }}>All Supplier Screens</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto' }}>
          Complete static layout of every screen in the supplier flow — from receiving the email invite to submitting winning bids and tracking history.
        </p>
      </div>

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '56px 32px' }}>

        <style>{`
          .supplier-screens-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
          @media (max-width: 600px) { .supplier-screens-grid { grid-template-columns: 1fr; gap: 16px; } }
        `}</style>

        {/* Section A: Invite → Bid Flow */}
        <SectionHeading
          number="A"
          title="Invite to Bid Flow"
          sub="5 screens — Email Invite → Review & Accept → Live Bidding → Confirm Modal → Bid Confirmed"
          color={C.green}
        />

        <div className="supplier-screens-grid" style={{ marginBottom: 64 }}>
          <EmailInvitationScreen />
          <ReviewAcceptScreen />
          <LiveBiddingScreen />
          <BidConfirmModalScreen />
          <BidConfirmedScreen />
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 56 }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.accentSoft, border: `1.5px solid rgba(124,58,237,0.2)`, borderRadius: 20, padding: '6px 16px' }}>
            <span style={{ fontSize: 14 }}>📊</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Additional Screens</span>
          </div>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

        {/* Section B: Additional Screens */}
        <SectionHeading
          number="B"
          title="Strategy & Monitoring"
          sub="3 screens — Smart Rebid Suggestions, Live Alerts & Notifications, Full Bid History"
          color={C.accent}
        />

        <div className="supplier-screens-grid" style={{ marginBottom: 48 }}>
          <RebidSuggestionScreen fluid />
          <AlertsScreen fluid />
          <BidHistoryScreen fluid />
        </div>

      </div>

      {/* Footer */}
      <div className="sscr-footer" style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => navigate('/supplier')} style={{ background: C.green, color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '12px 28px', fontFamily: 'inherit' }}>
          ← Back to Interactive Flow
        </button>
        <button onClick={() => navigate('/buyer/screens')} style={{ background: C.accentSoft, border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '12px 24px', fontFamily: 'inherit', color: C.accent }}>
          Buyer Screens →
        </button>
      </div>
    </div>
  );
}