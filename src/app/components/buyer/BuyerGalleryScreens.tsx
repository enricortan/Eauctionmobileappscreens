import React from 'react';
import { C, rankColors, fmt } from '../auction/colors';
import { PhoneFrame, PhoneSection, Divider, Chip, Card } from '../auction/PhoneFrame';

const SUPPLIERS = [
  { id: 'Y', name: 'Supplier Y', rank: 1, bids: [710000, 683000, 649700], savings: 18.7 },
  { id: 'X', name: 'Supplier X', rank: 2, bids: [695000, 672000, 654000], savings: 18.1 },
  { id: 'Z', name: 'Supplier Z', rank: 3, bids: [720000, 698000, 661000], savings: 17.3 },
];

const ITEMS = [
  {
    name: 'Laptops (100)', bids: [
      { name: 'Supplier Y', val: 48500, best: true },
      { name: 'Supplier X', val: 49800, best: false },
      { name: 'Supplier Z', val: 51000, best: false },
    ]
  },
  {
    name: 'Laptop Bags (100)', bids: [
      { name: 'Supplier Y', val: 3200, best: true },
      { name: 'Supplier X', val: 3400, best: false },
      { name: 'Supplier Z', val: 3600, best: false },
    ]
  },
  {
    name: 'Desktops (2,000)', bids: [
      { name: 'Supplier Y', val: 520000, best: true },
      { name: 'Supplier X', val: 535000, best: false },
      { name: 'Supplier Z', val: 545000, best: false },
    ]
  },
  {
    name: 'Desktop Warranty (2,000)', bids: [
      { name: 'Supplier Y', val: 98000, best: true },
      { name: 'Supplier X', val: 102000, best: false },
      { name: 'Supplier Z', val: 105000, best: false },
    ]
  },
];

export function SupplierRankingScreen({ fluid = false }: { fluid?: boolean }) {
  return (
    <PhoneFrame label="Supplier Ranking" sublabel="Full leaderboard with bid history" minHeight={700} fluid={fluid}>
      <PhoneSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 14px' }}>
          <div>
            <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1 }}>LIVE AUCTION</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Supplier Ranking</div>
          </div>
          <div style={{ background: C.amberSoft, border: `1.5px solid ${C.amber}`, borderRadius: 14, padding: '7px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', color: C.amber }}>LEFT</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.amber }}>38:41</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, padding: '0 20px 14px' }}>
          <Chip bg={C.accentSoft} color={C.accent}>3 Suppliers</Chip>
          <Chip bg={C.greenSoft} color={C.green}>21 Bids Total</Chip>
        </div>
        <Divider />
      </PhoneSection>

      <div style={{ flex: 1, overflowY: 'auto', background: C.bg, padding: '12px 12px 0', scrollbarWidth: 'none' }}>
        {/* Leader card */}
        <div style={{ background: C.greenSoft, borderRadius: 16, border: `1.5px solid ${C.green}`, padding: '14px 16px', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.green, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800 }}>#1</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Supplier Y</div>
              <div style={{ fontSize: 11, color: C.textSoft }}>3 bids · Last: 2 min ago</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.green }}>₱649,700</div>
              <div style={{ fontSize: 11, color: C.green }}>↓18.7% vs budget</div>
            </div>
          </div>
        </div>

        {SUPPLIERS.slice(1).map((sup) => {
          const latest = sup.bids[sup.bids.length - 1];
          const gap = latest - 649700;
          const col = rankColors[sup.rank - 1];
          return (
            <div key={sup.id} style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: '14px 16px', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: col + '22', color: col, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800 }}>#{sup.rank}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{sup.name}</div>
                  <div style={{ fontSize: 11, color: C.textSoft }}>{sup.bids.length} bids</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>{fmt(latest)}</div>
                  <div style={{ fontSize: 11, color: C.amber }}>+{fmt(gap)} vs #1</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bid trend chart (simplified) */}
        <Card style={{ marginBottom: 12, marginTop: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Bid Trend</div>
          <div style={{ position: 'relative', height: 100 }}>
            {/* Y axis */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {['₱720K', '₱690K', '₱660K', '₱630K'].map(l => (
                <div key={l} style={{ fontSize: 9, color: C.textSoft, width: 36 }}>{l}</div>
              ))}
            </div>
            <div style={{ marginLeft: 38, height: '100%', position: 'relative' }}>
              {/* Grid lines */}
              {[0, 33, 66, 100].map(pct => (
                <div key={pct} style={{ position: 'absolute', left: 0, right: 0, top: `${pct}%`, height: 1, background: C.border }} />
              ))}
              {/* Lines for each supplier */}
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                {/* Supplier Y line */}
                <polyline points="0,35 50,28 100,18" fill="none" stroke={C.green} strokeWidth="2" />
                {/* Supplier X line */}
                <polyline points="0,32 50,27 100,22" fill="none" stroke={C.accent} strokeWidth="2" strokeDasharray="4,2" />
                {/* Supplier Z line */}
                <polyline points="0,40 50,30 100,25" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="2,3" />
              </svg>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 10, justifyContent: 'center' }}>
            {[['Supplier Y', C.green], ['Supplier X', C.accent], ['Supplier Z', C.amber]].map(([name, color]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 12, height: 3, background: color as string, borderRadius: 2 }} />
                <span style={{ fontSize: 10, color: C.textMid }}>{name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button style={smallBtn}>⏳ +10 min</button>
          <button style={{ ...smallBtn, background: C.green, color: 'white', border: 'none' }}>Award Bid</button>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function ItemComparisonScreen({ fluid = false }: { fluid?: boolean }) {
  return (
    <PhoneFrame label="Item Bid Comparison" sublabel="Best price per line item across suppliers" minHeight={700} fluid={fluid}>
      <PhoneSection>
        <div style={{ padding: '16px 20px 12px' }}>
          <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1, marginBottom: 4 }}>LIVE AUCTION</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Item Comparison</div>
        </div>
        <Divider />
        <div style={{ display: 'flex', padding: '10px 20px' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>4</div>
            <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, letterSpacing: '0.5px' }}>ITEMS</div>
          </div>
          <div style={{ width: 1, background: C.border }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.green }}>₱131K</div>
            <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, letterSpacing: '0.5px' }}>TOTAL SAVINGS</div>
          </div>
          <div style={{ width: 1, background: C.border }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.accent }}>16.8%</div>
            <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, letterSpacing: '0.5px' }}>BELOW BUDGET</div>
          </div>
        </div>
        <Divider />
      </PhoneSection>

      <div style={{ flex: 1, overflowY: 'auto', background: C.bg, padding: '12px 12px 20px', scrollbarWidth: 'none' }}>
        {ITEMS.map((item, idx) => (
          <Card key={item.name}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: [C.accentSoft, C.greenSoft, C.amberSoft, C.purpleSoft][idx], color: [C.accent, C.green, C.amber, C.purple][idx], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{idx + 1}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{item.name}</div>
            </div>
            {item.bids.map((b, i) => (
              <div key={b.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < item.bids.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: b.best ? C.greenSoft : C.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: b.best ? C.green : C.textSoft }}>
                    {b.best ? '★' : i + 1}
                  </div>
                  <span style={{ fontSize: 12, color: C.textMid }}>{b.name}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: b.best ? 700 : 400, color: b.best ? C.green : C.text }}>{fmt(b.val)}</span>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </PhoneFrame>
  );
}

export function AuctionControlsScreen({ fluid = false }: { fluid?: boolean }) {
  return (
    <PhoneFrame label="Auction Control Panel" sublabel="Extend, pause, notify stakeholders, award" minHeight={600} fluid={fluid}>
      <PhoneSection>
        <div style={{ padding: '16px 20px 14px' }}>
          <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1, marginBottom: 4 }}>AUCTION CONTROLS</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>IT Equipment Procurement</div>
        </div>
        <Divider />
      </PhoneSection>

      <div style={{ flex: 1, overflowY: 'auto', background: C.bg, padding: '16px', scrollbarWidth: 'none' }}>
        {/* Timer */}
        <div style={{ background: C.redSoft, border: `1.5px solid ${C.red}`, borderRadius: 16, padding: '16px', marginBottom: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: 2, marginBottom: 6 }}>⚡ TIME REMAINING</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: C.red, fontVariantNumeric: 'tabular-nums' }}>00:12:15</div>
          <div style={{ fontSize: 12, color: C.red, marginTop: 6 }}>Anti-snipe protection active</div>
        </div>

        {/* Anti-sniping info */}
        <div style={{ background: C.accentSoft, borderRadius: 14, padding: '12px 14px', border: `1.5px solid rgba(124,58,237,0.15)`, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 1, marginBottom: 6 }}>🛡 ANTI-SNIPE RULE</div>
          <div style={{ fontSize: 12, color: C.accent, lineHeight: 1.6 }}>
            If a bid is placed in the final 2 minutes, the auction auto-extends by <strong>5 minutes</strong>. Prevents last-second manipulation.
          </div>
        </div>

        {/* Extend options */}
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Extend Auction</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {['+ 5 min', '+10 min', '+15 min'].map(opt => (
              <button key={opt} style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: `1.5px solid ${C.accent}`, background: C.accentSoft, color: C.accent }}>{opt}</button>
            ))}
          </div>
        </Card>

        {/* Notify */}
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Notify Stakeholders</div>
          {['📧 Email Summary Report', '🔗 Share Live Link', '📊 Export Bid Data'].map(opt => (
            <div key={opt} style={{ padding: '10px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13, color: C.text, cursor: 'pointer' }}>{opt}</div>
          ))}
        </Card>

        {/* Award */}
        <div style={{ background: C.greenSoft, borderRadius: 14, border: `1.5px solid ${C.green}`, padding: '14px 16px', marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 12, color: C.green, fontWeight: 700 }}>🏆 Current Leader</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Supplier Y</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.green }}>₱649K</div>
              <div style={{ fontSize: 11, color: C.green }}>↓18.7% below budget</div>
            </div>
          </div>
          <button style={{ width: '100%', background: C.green, color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: 12, fontFamily: 'inherit' }}>
            ✓ Close & Award Auction
          </button>
        </div>

        <button style={{ width: '100%', background: 'transparent', border: `1.5px solid ${C.red}`, color: C.red, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 12, fontFamily: 'inherit' }}>
          ■ Pause Auction
        </button>
      </div>
    </PhoneFrame>
  );
}

const smallBtn: React.CSSProperties = {
  flex: 1, background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12,
  fontSize: 12, fontWeight: 700, cursor: 'pointer', padding: '10px 0', fontFamily: 'inherit',
};