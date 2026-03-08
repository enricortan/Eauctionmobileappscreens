import React from 'react';
import { useNavigate } from 'react-router';
import { C, avBgs, avColors, fmt } from '../components/auction/colors';
import { PhoneFrame, PhoneSection, PhoneBody, PhoneFooter, Divider, Card, Chip } from '../components/auction/PhoneFrame';
import { SupplierRankingScreen, ItemComparisonScreen, AuctionControlsScreen } from '../components/buyer/BuyerGalleryScreens';
import MonitorAuctionScreen from '../components/buyer/MonitorAuctionScreen';

// ─── Shared styles ───
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: 10,
  border: `1.5px solid ${C.borderStrong}`, background: C.surface,
  color: C.text, fontSize: 13, fontFamily: 'Inter, sans-serif',
};
const lblStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: C.textSoft,
  letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' as const,
};
const STEP_LABELS = ['Details', 'Items', 'Suppliers', 'Review'];

function StepBar({ step }: { step: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', background: C.surface }}>
      {STEP_LABELS.map((label, i) => {
        const state = i < step ? 'done' : i === step ? 'active' : 'todo';
        const col = state === 'active' ? C.accent : state === 'done' ? C.green : C.textSoft;
        return (
          <div key={label} style={{ display: 'contents' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, border: `2px solid ${col}`,
                background: state === 'done' ? C.green : state === 'active' ? C.accent : C.bg,
                color: state === 'todo' ? C.textSoft : 'white',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.5px', whiteSpace: 'nowrap', color: col }}>{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: '0 4px 14px', background: i < step ? C.green : C.border }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Screen 1: Details ───
function DetailsScreen() {
  return (
    <PhoneFrame label="Screen 1" sublabel="Create Auction — Details" minHeight={780}>
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📋</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>New Auction</div>
            <div style={{ fontSize: 11, color: C.textSoft }}>Step 1 of 4</div>
          </div>
        </div>
        <Divider />
        <StepBar step={0} />
        <Divider />
      </PhoneSection>

      <PhoneBody>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Auction Details</div>
        <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>Set the basic information for this auction</div>
        <Card>
          <div style={{ marginBottom: 12 }}>
            <div style={lblStyle}>Auction Title</div>
            <input readOnly value="IT Equipment Procurement" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={lblStyle}>Reference ID</div>
            <input readOnly value="AUC-2024-0892" style={inputStyle} />
          </div>
          <div>
            <div style={lblStyle}>Description (optional)</div>
            <textarea readOnly value="Procurement of IT hardware for Company ABC — 4 line items across 3 suppliers." style={{ ...inputStyle, height: 64, resize: 'none' }} />
          </div>
        </Card>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 12 }}>Schedule</div>
          <div style={{ marginBottom: 12 }}>
            <div style={lblStyle}>Duration</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['1 hr', '2 hrs', '4 hrs', 'Custom'].map(d => (
                <button key={d} style={{
                  flex: 1, padding: '9px 0', borderRadius: 10, fontSize: 12, fontWeight: 600,
                  cursor: 'default', fontFamily: 'inherit',
                  border: `1.5px solid ${d === '2 hrs' ? C.accent : C.border}`,
                  background: d === '2 hrs' ? C.accentSoft : C.bg,
                  color: d === '2 hrs' ? C.accent : C.textMid,
                }}>{d}</button>
              ))}
            </div>
          </div>
          <div style={lblStyle}>End Date & Time</div>
          <input readOnly value="Dec 20, 2024  2:00 PM" style={inputStyle} />
        </Card>
        <Card style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 12 }}>Auction Rules</div>
          {[
            { label: 'Show live ranking to suppliers', sub: 'Suppliers can see their rank', on: true },
            { label: 'Show best bid amount', sub: 'Suppliers can see the leading bid', on: true },
            { label: 'Auto-extend on last-minute bids', sub: '5-min extension if bid in final 2 min', on: false },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{r.label}</div>
                <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{r.sub}</div>
              </div>
              <div style={{ width: 44, height: 26, borderRadius: 13, position: 'relative', flexShrink: 0, background: r.on ? C.accent : C.border }}>
                <div style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', left: r.on ? 21 : 3 }} />
              </div>
            </div>
          ))}
        </Card>
      </PhoneBody>

      <PhoneFooter>
        <button style={{ width: '100%', background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, padding: 12, fontFamily: 'inherit' }}>
          Continue to Items →
        </button>
      </PhoneFooter>
    </PhoneFrame>
  );
}

// ─── Screen 2: Items ───
const ITEMS_DATA = [
  { id: 1, name: 'Laptops', spec: '4GB RAM, 1TB HDD', qty: 100, unit: 'units', budget: 55000 },
  { id: 2, name: 'Laptop Bags', spec: 'Standard carry bag', qty: 100, unit: 'units', budget: 4000 },
  { id: 3, name: 'Desktops', spec: '8GB RAM, 1TB HDD, 15" LCD', qty: 2000, unit: 'units', budget: 620000 },
  { id: 4, name: 'Desktop Warranty', spec: '3-Year coverage', qty: 2000, unit: 'years', budget: 120000 },
];

function ItemsScreen() {
  return (
    <PhoneFrame label="Screen 2" sublabel="Create Auction — Items" minHeight={780}>
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📦</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>New Auction</div>
            <div style={{ fontSize: 11, color: C.textSoft }}>Step 2 of 4</div>
          </div>
        </div>
        <Divider />
        <StepBar step={1} />
        <Divider />
      </PhoneSection>

      <PhoneBody>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Auction Items</div>
        <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>Add the items suppliers will bid on</div>

        {ITEMS_DATA.map((item, i) => (
          <div key={item.id} style={{
            background: C.surface, borderRadius: 14, border: `1.5px solid ${C.border}`,
            padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8,
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: avBgs[i % 4], color: avColors[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div>
              <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{item.spec}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.border, color: C.textMid }}>{item.qty} {item.unit}</span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.accentSoft, color: C.accent }}>Budget: {fmt(item.budget)}</span>
              </div>
            </div>
            <div style={{ fontSize: 18, color: C.textSoft, paddingTop: 2 }}>×</div>
          </div>
        ))}

        <div style={{ background: C.greenSoft, borderRadius: 12, padding: '10px 14px', border: `1px solid rgba(12,158,106,0.2)`, display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Total Budget</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{fmt(799000)}</span>
        </div>

        <button style={{ width: '100%', background: 'transparent', border: `1.5px dashed ${C.borderStrong}`, color: C.accent, borderRadius: 12, fontSize: 13, fontWeight: 700, padding: 12, fontFamily: 'inherit', marginBottom: 20 }}>
          + Add Item
        </button>
      </PhoneBody>

      <PhoneFooter>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: '0 0 88px', padding: 12, background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>Back</button>
          <button style={{ flex: 1, background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, padding: 12, fontFamily: 'inherit' }}>Continue to Suppliers →</button>
        </div>
      </PhoneFooter>
    </PhoneFrame>
  );
}

// ─── Screen 3: Suppliers ───
const SUPPLIERS_DATA = [
  { id: 1, name: 'Supplier X', email: 'supplierx@company.com' },
  { id: 2, name: 'Supplier Y', email: 'suppliery@company.com' },
  { id: 3, name: 'Supplier Z', email: 'supplierz@company.com' },
];

function SuppliersScreen() {
  return (
    <PhoneFrame label="Screen 3" sublabel="Create Auction — Suppliers" minHeight={780}>
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>👥</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>New Auction</div>
            <div style={{ fontSize: 11, color: C.textSoft }}>Step 3 of 4</div>
          </div>
        </div>
        <Divider />
        <StepBar step={2} />
        <Divider />
      </PhoneSection>

      <PhoneBody>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Invite Suppliers</div>
        <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>Add suppliers who will participate</div>

        <Card style={{ marginBottom: 10 }}>
          <div style={lblStyle}>Supplier Name or Email</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input readOnly placeholder="name@supplier.com" style={{ ...inputStyle, flex: 1 }} />
            <button style={{ background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, padding: '10px 16px', fontFamily: 'inherit' }}>Add</button>
          </div>
          <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 8 }}>Quick add</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${C.border}`, background: C.bg, fontSize: 12, color: C.textMid, fontFamily: 'inherit', fontWeight: 500 }}>+ Vendor A</button>
            <button style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${C.border}`, background: C.bg, fontSize: 12, color: C.textMid, fontFamily: 'inherit', fontWeight: 500 }}>+ Vendor B</button>
          </div>
        </Card>

        {SUPPLIERS_DATA.map((s, i) => (
          <div key={s.id} style={{ background: C.surface, borderRadius: 12, border: `1.5px solid ${C.border}`, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: avBgs[i % 4], color: avColors[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{s.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.name}</div>
              <div style={{ fontSize: 11, color: C.textSoft }}>{s.email}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.greenSoft, color: C.green }}>Invited</span>
            <div style={{ fontSize: 18, color: C.textSoft }}>×</div>
          </div>
        ))}
      </PhoneBody>

      <PhoneFooter>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: '0 0 88px', padding: 12, background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>Back</button>
          <button style={{ flex: 1, background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, padding: 12, fontFamily: 'inherit' }}>Review & Launch →</button>
        </div>
      </PhoneFooter>
    </PhoneFrame>
  );
}

// ─── Screen 4: Review ───
function ReviewScreen() {
  return (
    <PhoneFrame label="Screen 4" sublabel="Create Auction — Review & Launch" minHeight={860}>
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚀</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>New Auction</div>
            <div style={{ fontSize: 11, color: C.textSoft }}>Step 4 of 4</div>
          </div>
        </div>
        <Divider />
        <StepBar step={3} />
        <Divider />
      </PhoneSection>

      <PhoneBody>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Review & Launch</div>
        <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>Confirm everything before going live</div>

        <Card>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}><span>📋</span><span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Auction Details</span></div>
          {[['Title', 'IT Equipment Procurement'], ['Reference', 'AUC-2024-0892'], ['Duration', '2 hours'], ['Ends', 'Dec 20, 2024 2:00 PM']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
              <span style={{ color: C.textMid }}>{k}</span><span style={{ fontWeight: 600, color: C.text }}>{v}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}><span>📦</span><span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Items (4)</span></div>
          {ITEMS_DATA.map((item, i) => (
            <div key={item.id} style={{ borderBottom: `1px solid ${C.border}`, padding: '7px 0' }}>
              <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{item.name}</div>
              <div style={{ fontSize: 11, color: C.textSoft }}>{item.qty} {item.unit} · {item.spec}</div>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}><span>👥</span><span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Suppliers (3)</span></div>
          {SUPPLIERS_DATA.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: avBgs[i % 4], color: avColors[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{s.name[0]}</div>
              <div>
                <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: C.textSoft }}>{s.email}</div>
              </div>
            </div>
          ))}
        </Card>

        <div style={{ background: C.accentSoft, borderRadius: 14, padding: '12px 16px', border: `1px solid rgba(26,86,219,0.2)`, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>Total Target Budget</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: C.accent }}>{fmt(799000)}</span>
        </div>

        <div style={{ background: C.amberSoft, borderRadius: 14, padding: '12px 14px', border: `1px solid rgba(217,119,6,0.25)`, marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span>⚠️</span>
          <div style={{ fontSize: 12, color: C.amber }}>Suppliers will be notified immediately. Details cannot be changed after launch.</div>
        </div>
      </PhoneBody>

      <PhoneFooter>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: '0 0 88px', padding: 12, background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>Back</button>
          <button style={{ flex: 1, background: C.green, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, padding: 12, fontFamily: 'inherit' }}>🚀 Launch Auction</button>
        </div>
      </PhoneFooter>
    </PhoneFrame>
  );
}

// ─── Screen 5: Launched ───
function LaunchedScreen() {
  return (
    <PhoneFrame label="Screen 5" sublabel="Auction Launched — Success State" minHeight={600}>
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚀</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>New Auction</div>
            <div style={{ fontSize: 11, color: C.green }}>Launched!</div>
          </div>
        </div>
      </PhoneSection>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 16, background: C.bg }}>
        <div style={{ width: 72, height: 72, borderRadius: 24, background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🚀</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.text, textAlign: 'center' }}>Auction Launched!</div>
        <div style={{ fontSize: 13, color: C.textMid, textAlign: 'center', lineHeight: 1.5 }}>Suppliers have been notified.<br />Auction is now live.</div>

        <div style={{ background: C.greenSoft, borderRadius: 14, padding: '12px 16px', border: `1.5px solid rgba(12,158,106,0.2)`, width: '100%', marginTop: 8 }}>
          {[['Auction ID', 'AUC-2024-0892'], ['Ends at', 'Dec 20, 2024 · 2:00 PM'], ['Suppliers', '3 notified'], ['Items', '4 line items']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid rgba(12,158,106,0.15)`, fontSize: 12 }}>
              <span style={{ color: C.green }}>{k}</span>
              <span style={{ fontWeight: 600, color: C.green }}>{v}</span>
            </div>
          ))}
        </div>

        <button style={{ background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, padding: '12px 24px', fontFamily: 'inherit', width: '100%', marginTop: 8 }}>
          Monitor Live Auction →
        </button>
      </div>
    </PhoneFrame>
  );
}

// ─── Section heading ───
function SectionHeading({ number, title, sub, color = C.accent }: { number: string; title: string; sub: string; color?: string }) {
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

export default function BuyerScreensPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, "Helvetica Neue", sans-serif', background: '#ECEEF2', minHeight: '100vh' }}>

      {/* Nav */}
      <style>{`
        .bscr-nav-inner { max-width: 1600px; margin: 0 auto; display: flex; align-items: center; min-height: 56px; gap: 12px; flex-wrap: wrap; padding: 8px 0; }
        .bscr-badge { font-size: 11px; font-weight: 600; color: #9BA3AF; letter-spacing: 1.5px; text-transform: uppercase; white-space: nowrap; }
        .bscr-hero { padding: 44px 24px 40px; text-align: center; }
        .bscr-hero h1 { font-size: 34px; }
        .bscr-hero p { font-size: 15px; }
        .bscr-footer { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; padding: 24px; }
        .bscr-footer button { flex: 0 0 auto; }
        @media (max-width: 640px) {
          .bscr-nav-inner { gap: 0; padding: 10px 0; row-gap: 8px; }
          .bscr-nav-row1 { width: 100%; display: flex; align-items: center; gap: 10px; flex: 1, minWidth: 0; }
          .bscr-nav-sep { display: none; }
          .bscr-badge { display: none; }
          .bscr-hero { padding: 28px 20px 24px; }
          .bscr-hero h1 { font-size: 22px; }
          .bscr-hero p { font-size: 13px; }
          .bscr-footer { flex-direction: column; align-items: stretch; padding: 16px 20px; }
          .bscr-footer button { width: 100%; margin-left: 0 !important; }
        }
      `}</style>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.97)', borderBottom: `1px solid ${C.border}`, backdropFilter: 'blur(12px)', padding: '0 24px' }}>
        <div className="bscr-nav-inner">
          <div className="bscr-nav-row1" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
            <button onClick={() => navigate('/buyer')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.textMid, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, padding: 0, whiteSpace: 'nowrap', flexShrink: 0 }}>
              ← Buyer Journey
            </button>
            <div className="bscr-nav-sep" style={{ width: 1, height: 20, background: C.border, flexShrink: 0 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>💼</div>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.text, whiteSpace: 'nowrap' }}>Buyer — All Screens</span>
            </div>
          </div>
          <span className="bscr-badge">9 Screens · Static Layout</span>
        </div>
      </nav>

      {/* Header */}
      <div className="bscr-hero" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12 }}>Buyer Journey · Screen Reference</div>
        <h1 style={{ color: 'white', letterSpacing: '-0.5px', marginBottom: 10 }}>All Buyer Screens</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto' }}>
          Complete static layout of every screen in the buyer flow — from creating an auction to monitoring bids and awarding the winner.
        </p>
      </div>

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '56px 32px' }}>

        <style>{`
          .screens-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
          @media (max-width: 600px) { .screens-grid { grid-template-columns: 1fr; gap: 16px; } }
        `}</style>

        {/* Section A: Create Auction */}
        <SectionHeading
          number="A"
          title="Create Auction Flow"
          sub="5 screens — Auction Details → Items → Suppliers → Review → Launched"
          color={C.accent}
        />

        <div className="screens-grid" style={{ marginBottom: 64 }}>
          <DetailsScreen />
          <ItemsScreen />
          <SuppliersScreen />
          <ReviewScreen />
          <LaunchedScreen />
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 56 }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.greenSoft, border: `1.5px solid rgba(12,158,106,0.25)`, borderRadius: 20, padding: '6px 16px' }}>
            <span style={{ fontSize: 14 }}>🟢</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Auction Goes Live</span>
          </div>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

        {/* Section B: Monitor & Control */}
        <SectionHeading
          number="B"
          title="Monitor & Control"
          sub="4 screens — Live Dashboard, Supplier Rankings, Item Comparison, Auction Controls"
          color={C.green}
        />

        <div className="screens-grid" style={{ marginBottom: 48 }}>
          <MonitorAuctionScreen fluid />
          <SupplierRankingScreen fluid />
          <ItemComparisonScreen fluid />
          <AuctionControlsScreen fluid />
        </div>

      </div>

      {/* Footer */}
      <div className="bscr-footer" style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => navigate('/buyer')} style={{ background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '12px 28px', fontFamily: 'inherit' }}>
          ← Back to Interactive Flow
        </button>
        <button onClick={() => navigate('/supplier/screens')} style={{ background: C.greenSoft, border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '12px 24px', fontFamily: 'inherit', color: C.green }}>
          Supplier Screens →
        </button>
      </div>
    </div>
  );
}