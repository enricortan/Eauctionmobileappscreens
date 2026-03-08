import React, { useState, useEffect } from 'react';
import { C, avColors, avBgs, rankColors, fmt, fmtFull } from '../auction/colors';
import { PhoneFrame, PhoneSection, PhoneBody, Divider, ModalOverlay, TimerBox, LiveDot, Chip, Btn } from '../auction/PhoneFrame';

const LIVE = {
  budget: 799000,
  suppliers: [
    { id: 'Y', name: 'Supplier Y', rank: 1, bids: [710000, 683000, 649700], itemBids: [48500, 3200, 520000, 98000] },
    { id: 'X', name: 'Supplier X', rank: 2, bids: [695000, 672000, 654000], itemBids: [49800, 3400, 535000, 102000] },
    { id: 'Z', name: 'Supplier Z', rank: 3, bids: [720000, 698000, 661000], itemBids: [51000, 3600, 545000, 105000] },
  ],
  items: [
    { id: 1, name: 'Laptops', spec: '4GB RAM, 1TB HDD × 100', budget: 55000, bestBid: 48500, bestSup: 'Supplier Y' },
    { id: 2, name: 'Laptop Bags', spec: '× 100 units', budget: 4000, bestBid: 3200, bestSup: 'Supplier Y' },
    { id: 3, name: 'Desktops', spec: '8GB RAM, 1TB HDD, 15" LCD × 2000', budget: 620000, bestBid: 520000, bestSup: 'Supplier Y' },
    { id: 4, name: 'Desktop Warranty', spec: '3-Year coverage × 2000 units', budget: 120000, bestBid: 98000, bestSup: 'Supplier Y' },
  ],
};

type TabType = 'rankings' | 'items';
type ModalType = 'extend' | 'notify' | 'award' | 'msg' | null;

function RankCard({ sup, isOpen, onToggle, onMsg, onAward }: any) {
  const latest = sup.bids[sup.bids.length - 1];
  const total = LIVE.items.reduce((a: number, _: any, i: number) => a + sup.itemBids[i], 0);
  const savings = ((LIVE.budget - latest) / LIVE.budget * 100).toFixed(1);
  const col = rankColors[sup.rank - 1];
  return (
    <div style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${isOpen ? C.accent : C.border}`, overflow: 'hidden', cursor: 'pointer', marginBottom: 8 }}>
      <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: col + '22', color: col, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, flexShrink: 0 }}>#{sup.rank}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{sup.name}</div>
          <div style={{ fontSize: 11, color: C.textSoft, marginTop: 1 }}>{sup.bids.length} bids submitted</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: sup.rank === 1 ? C.green : C.text }}>{fmt(latest)}</div>
          <div style={{ fontSize: 11, color: C.green, marginTop: 1 }}>↓{savings}% vs budget</div>
        </div>
        <div style={{ fontSize: 13, color: C.textSoft, marginLeft: 4, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</div>
      </div>
      {isOpen && (
        <>
          <Divider />
          <div style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' }}>Bid History</div>
            {sup.bids.map((b: number, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < sup.bids.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: i === sup.bids.length - 1 ? col : C.border }} />
                  <span style={{ fontSize: 12, color: C.textMid }}>Bid {i + 1}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: i === sup.bids.length - 1 ? 700 : 400, color: i === sup.bids.length - 1 ? C.text : C.textSoft }}>{fmt(b)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, padding: '0 16px 14px' }}>
            <button onClick={onMsg} style={{ flex: 1, background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 12, fontWeight: 700, cursor: 'pointer', padding: 9, fontFamily: 'inherit' }}>Message</button>
            <button onClick={onAward} style={{ flex: 1, background: C.greenSoft, color: C.green, border: `1.5px solid ${C.green}`, borderRadius: 12, fontSize: 12, fontWeight: 700, cursor: 'pointer', padding: 9, fontFamily: 'inherit' }}>Award Bid</button>
          </div>
        </>
      )}
    </div>
  );
}

function ItemMonitor({ item, suppliers }: { item: typeof LIVE.items[0]; suppliers: typeof LIVE.suppliers }) {
  const sorted = [...suppliers].sort((a, b) => a.itemBids[item.id - 1] - b.itemBids[item.id - 1]);
  const best = sorted[0].itemBids[item.id - 1];
  const savings = ((item.budget - best) / item.budget * 100).toFixed(0);
  return (
    <div style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: '14px 16px', marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div>
          <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{item.spec}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.green }}>{fmt(best)}</div>
          <div style={{ fontSize: 10, color: C.green }}>↓{savings}% · {sorted[0].name}</div>
        </div>
      </div>
      {sorted.map(s => {
        const amt = s.itemBids[item.id - 1];
        const w = (best / amt) * 100;
        const win = s.id === sorted[0].id;
        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: C.textMid, width: 72, flexShrink: 0 }}>{s.name}</div>
            <div style={{ flex: 1, height: 6, background: C.border, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${w}%`, height: '100%', background: win ? C.green : C.accent, borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: win ? C.green : C.text, width: 52, textAlign: 'right', flexShrink: 0 }}>{fmt(amt)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function MonitorAuctionScreen({ interactive = true, fluid = false }: { interactive?: boolean; fluid?: boolean }) {
  const [activeTab, setActiveTab] = useState<TabType>('rankings');
  const [expandedRank, setExpandedRank] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalType>(null);
  const [timeLeft, setTimeLeft] = useState(47 * 60 + 23);

  useEffect(() => {
    if (!interactive) return;
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [interactive]);

  const bestBid = LIVE.suppliers[0].bids[LIVE.suppliers[0].bids.length - 1];
  const savings = ((LIVE.budget - bestBid) / LIVE.budget * 100).toFixed(1);
  const savingsAmt = LIVE.budget - bestBid;

  return (
    <PhoneFrame label="💼 Buyer — Monitor Auction" sublabel="Live dashboard · rankings, bids by item, extend, award" fluid={fluid}>
      {/* Header */}
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 12px' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📊</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: C.textSoft, letterSpacing: 1 }}>LIVE AUCTION</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>IT Equipment Procurement</div>
          </div>
          <TimerBox seconds={timeLeft} />
        </div>
        <div style={{ display: 'flex', gap: 6, padding: '0 20px 12px' }}>
          <Chip bg={C.accentSoft} color={C.accent}>3 Suppliers</Chip>
          <Chip bg={C.border} color={C.textMid}>8 Bids</Chip>
          <Chip bg={C.greenSoft} color={C.green}><LiveDot />Active</Chip>
        </div>
        <Divider />
        <div style={{ display: 'flex', padding: '14px 20px' }}>
          <div style={{ flex: 1, paddingRight: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>Best Total Bid</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.green }}>{fmt(bestBid)}</div>
            <div style={{ fontSize: 11, color: C.textMid, marginTop: 3 }}>Supplier Y · leading</div>
          </div>
          <div style={{ width: 1, background: C.border }} />
          <div style={{ flex: 1, paddingLeft: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>Savings vs Budget</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.accent }}>{savings}%</div>
            <div style={{ fontSize: 11, color: C.textMid, marginTop: 3 }}>{fmt(savingsAmt)} saved</div>
          </div>
        </div>
        <Divider />
        <div style={{ display: 'flex' }}>
          {(['rankings', 'items'] as TabType[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '12px 0', border: 'none', background: 'transparent', cursor: 'pointer',
              fontSize: 13, fontFamily: 'inherit', fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? C.text : C.textSoft,
              borderBottom: `2px solid ${activeTab === tab ? C.text : 'transparent'}`,
            }}>
              {tab === 'rankings' ? 'Rankings' : 'By Item'}
            </button>
          ))}
        </div>
      </PhoneSection>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', background: C.bg, scrollbarWidth: 'none' }}>
        {activeTab === 'rankings' && (
          <>
            <div style={{ margin: '12px 12px 0', background: C.accentSoft, borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: C.accent, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: C.accent }}>Supplier Y submitted a new bid — now <strong>₱4,300 ahead</strong></div>
            </div>
            <div style={{ padding: '12px 12px 0' }}>
              {LIVE.suppliers.map(sup => (
                <RankCard
                  key={sup.id} sup={sup}
                  isOpen={expandedRank === sup.id}
                  onToggle={() => setExpandedRank(expandedRank === sup.id ? null : sup.id)}
                  onMsg={() => setModal('msg')}
                  onAward={() => setModal('award')}
                />
              ))}
            </div>
          </>
        )}
        {activeTab === 'items' && (
          <div style={{ padding: '12px 12px 20px' }}>
            {LIVE.items.map(item => (
              <ItemMonitor key={item.id} item={item} suppliers={LIVE.suppliers} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: '12px 20px 32px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button onClick={() => setModal('extend')} style={ghostBtn}>⏳ Extend</button>
          <button onClick={() => setModal('notify')} style={ghostBtn}>📣 Notify</button>
        </div>
        <button onClick={() => setModal('award')} style={{ ...ghostBtn, width: '100%', background: C.green, color: 'white', border: 'none', fontWeight: 700, fontSize: 14 }}>Award Bid</button>
      </div>

      {/* Modals */}
      {modal && (
        <ModalOverlay onClose={() => setModal(null)}>
          {modal === 'extend' && (
            <>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Extend Auction</div>
              <div style={{ fontSize: 13, color: C.textMid, marginBottom: 18 }}>Add time to the current window</div>
              {['+ 5 Minutes', '+ 10 Minutes', '+ 15 Minutes', '+ 30 Minutes'].map(o => (
                <button key={o} onClick={() => { setTimeLeft(t => t + parseInt(o) * 60); setModal(null); }} style={actionBtn}>{o}</button>
              ))}
            </>
          )}
          {modal === 'notify' && (
            <>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Notify Stakeholders</div>
              <div style={{ fontSize: 13, color: C.textMid, marginBottom: 18 }}>Share current auction summary</div>
              {['Email Summary Report', 'Share Best Bid', 'Invite to View Live'].map(o => (
                <button key={o} onClick={() => setModal(null)} style={actionBtn}>{o}</button>
              ))}
            </>
          )}
          {modal === 'award' && (
            <>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Award Bid</div>
              <div style={{ fontSize: 13, color: C.textMid, marginBottom: 18 }}>Confirm award to leading supplier</div>
              <div style={{ background: C.greenSoft, borderRadius: 12, padding: 14, marginBottom: 16, border: `1px solid rgba(12,158,106,0.2)` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 4 }}>Supplier Y — Leading Bid</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{fmt(bestBid)}</div>
                <div style={{ fontSize: 12, color: C.green, marginTop: 4 }}>{savings}% below budget</div>
              </div>
              <Btn variant="green" onClick={() => setModal(null)} style={{ marginBottom: 8, fontSize: 14 }}>✓ Confirm Award</Btn>
              <Btn variant="plain" onClick={() => setModal(null)}>Cancel</Btn>
            </>
          )}
          {modal === 'msg' && (
            <>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Message Supplier</div>
              <textarea placeholder="Type your message…" style={{ width: '100%', height: 88, padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${C.borderStrong}`, background: C.surface, color: C.text, fontSize: 13, fontFamily: 'inherit', resize: 'none', outline: 'none', marginBottom: 10 }} />
              <Btn variant="primary" onClick={() => setModal(null)} style={{ marginBottom: 8, fontSize: 14 }}>Send</Btn>
              <Btn variant="plain" onClick={() => setModal(null)}>Cancel</Btn>
            </>
          )}
        </ModalOverlay>
      )}
    </PhoneFrame>
  );
}

const ghostBtn: React.CSSProperties = {
  flex: 1, background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12,
  fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 12, fontFamily: 'Inter, sans-serif',
};
const actionBtn: React.CSSProperties = {
  width: '100%', padding: '13px 16px', marginBottom: 8, borderRadius: 14, border: `1.5px solid ${C.border}`,
  background: C.bg, color: C.text, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
};