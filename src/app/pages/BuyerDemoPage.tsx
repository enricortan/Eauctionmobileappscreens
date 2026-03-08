import React, { useState, useEffect } from 'react';
import { C, avColors, avBgs, rankColors, fmt, fmtFull } from '../components/auction/colors';
import { PhoneSection, PhoneBody, PhoneFooter, Divider, Card, Btn, ModalOverlay, TimerBox, LiveDot, Chip } from '../components/auction/PhoneFrame';

// ─────────────────────────────────────────────
// Shared atoms
// ─────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: 10,
  border: `1.5px solid ${C.borderStrong}`, background: C.surface,
  color: C.text, fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none',
};
const lblStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: C.textSoft,
  letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' as const,
};

const STEP_LABELS = ['Details', 'Items', 'Suppliers', 'Review'];

interface Item { id: number; name: string; spec: string; qty: number; unit: string; budget: number; }
interface Supplier { id: number; name: string; email: string; }

const defaultItems: Item[] = [
  { id: 1, name: 'Laptops', spec: '4GB RAM, 1TB HDD', qty: 100, unit: 'units', budget: 55000 },
  { id: 2, name: 'Laptop Bags', spec: 'Standard carry bag', qty: 100, unit: 'units', budget: 4000 },
  { id: 3, name: 'Desktops', spec: '8GB RAM, 1TB HDD, 15" LCD', qty: 2000, unit: 'units', budget: 620000 },
  { id: 4, name: 'Desktop Warranty', spec: '3-Year coverage', qty: 2000, unit: 'units', budget: 120000 },
];
const defaultSuppliers: Supplier[] = [
  { id: 1, name: 'Supplier X', email: 'supplierx@company.com' },
  { id: 2, name: 'Supplier Y', email: 'suppliery@company.com' },
  { id: 3, name: 'Supplier Z', email: 'supplierz@company.com' },
];

// ─────────────────────────────────────────────
// Step bar
// ─────────────────────────────────────────────
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

function Toggle({ on, onToggle, label, sub }: { on: boolean; onToggle: () => void; label: string; sub: string }) {
  return (
    <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{label}</div>
        <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ width: 44, height: 26, borderRadius: 13, position: 'relative', flexShrink: 0, background: on ? C.accent : C.border, transition: 'background 0.2s' }}>
        <div style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s', left: on ? 21 : 3 }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CREATE AUCTION STEPS
// ─────────────────────────────────────────────
function StepDetails({ title, setTitle, refId, setRefId, duration, setDuration, rules, setRules }: any) {
  return (
    <PhoneBody>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Auction Details</div>
      <div style={{ fontSize: 13, color: C.textMid, marginBottom: 20 }}>Set the basic information for this auction</div>
      <Card>
        <div style={{ marginBottom: 14 }}>
          <div style={lblStyle}>Auction Title</div>
          <input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={lblStyle}>Reference ID</div>
          <input value={refId} onChange={e => setRefId(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <div style={lblStyle}>Description (optional)</div>
          <textarea placeholder="Context for suppliers…" style={{ ...inputStyle, height: 68, resize: 'none' }} />
        </div>
      </Card>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 14 }}>Schedule</div>
        <div style={{ marginBottom: 14 }}>
          <div style={lblStyle}>Duration</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['1 hr', '2 hrs', '4 hrs', 'Custom'].map(d => (
              <button key={d} onClick={() => setDuration(d)} style={{ flex: 1, padding: '9px 0', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: `1.5px solid ${duration === d ? C.accent : C.border}`, background: duration === d ? C.accentSoft : C.bg, color: duration === d ? C.accent : C.textMid }}>{d}</button>
            ))}
          </div>
        </div>
        <div style={lblStyle}>End Date & Time</div>
        <input type="datetime-local" defaultValue="2024-12-20T14:00" style={inputStyle} />
      </Card>
      <Card style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 12 }}>Auction Rules</div>
        <Toggle on={rules.ranking} onToggle={() => setRules((r: any) => ({ ...r, ranking: !r.ranking }))} label="Show live ranking to suppliers" sub="Suppliers can see their rank" />
        <Toggle on={rules.bestBid} onToggle={() => setRules((r: any) => ({ ...r, bestBid: !r.bestBid }))} label="Show best bid amount" sub="Suppliers can see the leading bid" />
        <Toggle on={rules.autoExtend} onToggle={() => setRules((r: any) => ({ ...r, autoExtend: !r.autoExtend }))} label="Auto-extend on last-minute bids" sub="5-min extension if bid in final 2 min" />
      </Card>
    </PhoneBody>
  );
}

function StepItems({ items, setItems }: { items: Item[]; setItems: React.Dispatch<React.SetStateAction<Item[]>> }) {
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSpec, setNewSpec] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newUnit, setNewUnit] = useState('units');
  const [newBudget, setNewBudget] = useState('');
  const total = items.reduce((a, i) => a + (i.budget || 0), 0);

  const addItem = () => {
    if (!newName || !newQty) return;
    setItems(prev => [...prev, { id: Date.now(), name: newName, spec: newSpec, qty: parseInt(newQty) || 0, unit: newUnit, budget: parseInt(newBudget) || 0 }]);
    setNewName(''); setNewSpec(''); setNewQty(''); setNewBudget('');
    setShowForm(false);
  };

  return (
    <PhoneBody>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Auction Items</div>
      <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>Add the items suppliers will bid on</div>
      {items.map((item, i) => (
        <div key={item.id} style={{ background: C.surface, borderRadius: 14, border: `1.5px solid ${C.border}`, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: avBgs[i % 4], color: avColors[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div>
            {item.spec && <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{item.spec}</div>}
            <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.border, color: C.textMid }}>{item.qty} {item.unit}</span>
              {item.budget > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.accentSoft, color: C.accent }}>Budget: {fmt(item.budget)}</span>}
            </div>
          </div>
          <button onClick={() => setItems(prev => prev.filter(x => x.id !== item.id))} style={{ background: 'none', border: 'none', color: C.textSoft, cursor: 'pointer', fontSize: 20, padding: 0, lineHeight: 1 }}>×</button>
        </div>
      ))}
      {total > 0 && (
        <div style={{ background: C.greenSoft, borderRadius: 12, padding: '10px 14px', border: `1px solid rgba(12,158,106,0.2)`, display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Total Budget</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{fmt(total)}</span>
        </div>
      )}
      {showForm ? (
        <div style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.accent}`, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 14 }}>New Item</div>
          <div style={{ marginBottom: 10 }}>
            <div style={lblStyle}>Item Name</div>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Monitors" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={lblStyle}>Specifications</div>
            <input value={newSpec} onChange={e => setNewSpec(e.target.value)} placeholder={'e.g. 24" 4K'} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={lblStyle}>Quantity</div>
              <input type="number" value={newQty} onChange={e => setNewQty(e.target.value)} placeholder="100" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={lblStyle}>Unit</div>
              <select value={newUnit} onChange={e => setNewUnit(e.target.value)} style={inputStyle}>
                <option>units</option><option>pcs</option><option>sets</option><option>licenses</option><option>years</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={lblStyle}>Budget per unit (₱)</div>
            <input type="number" value={newBudget} onChange={e => setNewBudget(e.target.value)} placeholder="e.g. 55000" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="ghost" onClick={() => setShowForm(false)} style={{ flex: 1 }}>Cancel</Btn>
            <Btn variant="primary" onClick={addItem} style={{ flex: 1 }}>Add Item</Btn>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={{ width: '100%', background: 'transparent', border: `1.5px dashed ${C.borderStrong}`, color: C.accent, borderRadius: 12, fontSize: 13, fontWeight: 700, padding: 12, fontFamily: 'inherit', marginBottom: 24, cursor: 'pointer' }}>
          + Add Item
        </button>
      )}
    </PhoneBody>
  );
}

function StepSuppliers({ suppliers, setSuppliers }: { suppliers: Supplier[]; setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>> }) {
  const [email, setEmail] = useState('');
  const SUGGESTIONS = ['Supplier X', 'Supplier Y', 'Supplier Z', 'Vendor A'];

  const addSupplier = (name?: string) => {
    const val = name || email;
    if (!val) return;
    setSuppliers(prev => [...prev, { id: Date.now(), name: val, email: val.toLowerCase().replace(/\s+/, '') + '@company.com' }]);
    setEmail('');
  };

  return (
    <PhoneBody>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Invite Suppliers</div>
      <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>Add suppliers who will participate in the auction</div>
      <Card style={{ marginBottom: 12 }}>
        <div style={lblStyle}>Supplier Name or Email</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="name@supplier.com" onKeyDown={e => e.key === 'Enter' && addSupplier()} style={{ ...inputStyle, flex: 1 }} />
          <button onClick={() => addSupplier()} style={{ background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, padding: '10px 16px', fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap' }}>Add</button>
        </div>
        <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 8 }}>Quick add</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SUGGESTIONS.filter(s => !suppliers.find(x => x.name === s)).map(s => (
            <button key={s} onClick={() => addSupplier(s)} style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${C.border}`, background: C.bg, fontSize: 12, color: C.textMid, fontFamily: 'inherit', fontWeight: 500, cursor: 'pointer' }}>+ {s}</button>
          ))}
        </div>
      </Card>
      {suppliers.map((s, i) => (
        <div key={s.id} style={{ background: C.surface, borderRadius: 12, border: `1.5px solid ${C.border}`, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: avBgs[i % 4], color: avColors[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{s.name[0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.name}</div>
            <div style={{ fontSize: 11, color: C.textSoft }}>{s.email}</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.greenSoft, color: C.green, marginRight: 4 }}>Invited</span>
          <button onClick={() => setSuppliers(prev => prev.filter(x => x.id !== s.id))} style={{ background: 'none', border: 'none', color: C.textSoft, cursor: 'pointer', fontSize: 20, padding: 0, lineHeight: 1 }}>×</button>
        </div>
      ))}
      <div style={{ height: 24 }} />
    </PhoneBody>
  );
}

function StepReview({ title, refId, duration, rules, items, suppliers }: any) {
  const total = items.reduce((a: number, i: Item) => a + i.budget, 0);
  return (
    <PhoneBody>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Review & Launch</div>
      <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>Confirm everything before going live</div>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>📋 Details</div>
        {[['Title', title], ['Reference', refId], ['Duration', duration]].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
            <span style={{ color: C.textMid }}>{k}</span><span style={{ fontWeight: 600, color: C.text }}>{v}</span>
          </div>
        ))}
        <div style={{ fontSize: 12, color: C.textSoft, marginTop: 10 }}>
          Rules: {[rules.ranking && 'Live ranking', rules.bestBid && 'Best bid shown', rules.autoExtend && 'Auto-extend'].filter(Boolean).join(' · ') || 'Standard'}
        </div>
      </Card>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>📦 Items ({items.length})</div>
        {items.map((item: Item, i: number) => (
          <div key={item.id} style={{ borderBottom: `1px solid ${C.border}`, padding: '8px 0' }}>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{item.name}</div>
            <div style={{ fontSize: 11, color: C.textSoft }}>{item.qty} {item.unit} · {item.spec}</div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: `2px solid ${C.border}`, marginTop: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Total Budget</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: C.accent }}>{fmt(total)}</span>
        </div>
      </Card>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>👥 Suppliers ({suppliers.length})</div>
        {suppliers.map((s: Supplier, i: number) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < suppliers.length - 1 ? `1px solid ${C.border}` : 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: avBgs[i % 4], color: avColors[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{s.name[0]}</div>
            <div>
              <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: C.textSoft }}>{s.email}</div>
            </div>
          </div>
        ))}
      </Card>
      <div style={{ background: C.amberSoft, borderRadius: 14, padding: '12px 14px', border: `1px solid rgba(217,119,6,0.25)`, marginBottom: 24, display: 'flex', gap: 10 }}>
        <span>⚠️</span>
        <div style={{ fontSize: 12, color: C.amber }}>Suppliers will be notified immediately. Details cannot be changed after launch.</div>
      </div>
    </PhoneBody>
  );
}

// ─────────────────────────────────────────────
// MONITOR AUCTION
// ─────────────────────────────────────────────
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

function RankCard({ sup, isOpen, onToggle, onMsg, onAward }: any) {
  const latest = sup.bids[sup.bids.length - 1];
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
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' as const }}>Bid History</div>
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

type TabType = 'rankings' | 'items';
type ModalType = 'extend' | 'notify' | 'award' | 'msg' | null;

function MonitorView({ onReset }: { onReset: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('rankings');
  const [expandedRank, setExpandedRank] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalType>(null);
  const [timeLeft, setTimeLeft] = useState(47 * 60 + 23);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const bestBid = LIVE.suppliers[0].bids[LIVE.suppliers[0].bids.length - 1];
  const savings = ((LIVE.budget - bestBid) / LIVE.budget * 100).toFixed(1);
  const savingsAmt = LIVE.budget - bestBid;

  const ghostBtn: React.CSSProperties = {
    flex: 1, background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12,
    fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 12, fontFamily: 'Inter, sans-serif',
  };
  const actionBtn: React.CSSProperties = {
    width: '100%', padding: '13px 16px', marginBottom: 8, borderRadius: 14, border: `1.5px solid ${C.border}`,
    background: C.bg, color: C.text, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const,
  };

  return (
    <>
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
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' as const }}>Best Total Bid</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.green }}>{fmt(bestBid)}</div>
            <div style={{ fontSize: 11, color: C.textMid, marginTop: 3 }}>Supplier Y · leading</div>
          </div>
          <div style={{ width: 1, background: C.border }} />
          <div style={{ flex: 1, paddingLeft: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' as const }}>Savings vs Budget</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.accent }}>{savings}%</div>
            <div style={{ fontSize: 11, color: C.textMid, marginTop: 3 }}>{fmt(savingsAmt)} saved</div>
          </div>
        </div>
        <Divider />
        <div style={{ display: 'flex' }}>
          {(['rankings', 'items'] as TabType[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '12px 0', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', fontWeight: activeTab === tab ? 600 : 400, color: activeTab === tab ? C.text : C.textSoft, borderBottom: `2px solid ${activeTab === tab ? C.text : 'transparent'}` }}>
              {tab === 'rankings' ? 'Rankings' : 'By Item'}
            </button>
          ))}
        </div>
      </PhoneSection>

      <div style={{ flex: 1, overflowY: 'auto', background: C.bg, scrollbarWidth: 'none' as const }}>
        {activeTab === 'rankings' && (
          <>
            <div style={{ margin: '12px 12px 0', background: C.accentSoft, borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: C.accent, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: C.accent }}>Supplier Y submitted a new bid, now <strong>₱4,300 ahead</strong></div>
            </div>
            <div style={{ padding: '12px 12px 0' }}>
              {LIVE.suppliers.map(sup => (
                <RankCard key={sup.id} sup={sup} isOpen={expandedRank === sup.id} onToggle={() => setExpandedRank(expandedRank === sup.id ? null : sup.id)} onMsg={() => setModal('msg')} onAward={() => setModal('award')} />
              ))}
            </div>
          </>
        )}
        {activeTab === 'items' && (
          <div style={{ padding: '12px 12px 20px' }}>
            {LIVE.items.map(item => <ItemMonitor key={item.id} item={item} suppliers={LIVE.suppliers} />)}
          </div>
        )}
      </div>

      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: '12px 20px 32px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button onClick={() => setModal('extend')} style={ghostBtn}>⏳ Extend</button>
          <button onClick={() => setModal('notify')} style={ghostBtn}>📣 Notify</button>
        </div>
        <button onClick={() => setModal('award')} style={{ ...ghostBtn, width: '100%', background: C.green, color: 'white', border: 'none', fontWeight: 700, fontSize: 14, flex: 'none' }}>Award Bid</button>
      </div>

      {modal && (
        <ModalOverlay onClose={() => setModal(null)}>
          {modal === 'extend' && (
            <>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Extend Auction</div>
              <div style={{ fontSize: 13, color: C.textMid, marginBottom: 18 }}>Add time to the current window</div>
              {['+ 5 Minutes', '+ 10 Minutes', '+ 15 Minutes', '+ 30 Minutes'].map(o => (
                <button key={o} onClick={() => { setTimeLeft(t => t + parseInt(o.replace(/\D/g, '')) * 60); setModal(null); }} style={{ width: '100%', padding: '13px 16px', marginBottom: 8, borderRadius: 14, border: `1.5px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const }}>{o}</button>
              ))}
            </>
          )}
          {modal === 'notify' && (
            <>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Notify Stakeholders</div>
              <div style={{ fontSize: 13, color: C.textMid, marginBottom: 18 }}>Share current auction summary</div>
              {['Email Summary Report', 'Share Best Bid', 'Invite to View Live'].map(o => (
                <button key={o} onClick={() => setModal(null)} style={{ width: '100%', padding: '13px 16px', marginBottom: 8, borderRadius: 14, border: `1.5px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const }}>{o}</button>
              ))}
            </>
          )}
          {modal === 'award' && (
            <>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Award Bid</div>
              <div style={{ fontSize: 13, color: C.textMid, marginBottom: 18 }}>Confirm award to leading supplier</div>
              <div style={{ background: C.greenSoft, borderRadius: 12, padding: 14, marginBottom: 16, border: `1px solid rgba(12,158,106,0.2)` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 4 }}>Supplier Y: Leading Bid</div>
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
      <style>{`@keyframes blink{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
    </>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function BuyerDemoPage() {
  const [mode, setMode] = useState<'create' | 'monitor'>('create');
  const [step, setStep] = useState(0);
  const [launched, setLaunched] = useState(false);

  const [title, setTitle] = useState('IT Equipment Procurement');
  const [refId, setRefId] = useState('AUC-2024-0892');
  const [duration, setDuration] = useState('2 hrs');
  const [rules, setRules] = useState({ ranking: true, bestBid: true, autoExtend: false });
  const [items, setItems] = useState<Item[]>(defaultItems);
  const [suppliers, setSuppliers] = useState<Supplier[]>(defaultSuppliers);

  const reset = () => { setMode('create'); setStep(0); setLaunched(false); setItems(defaultItems); setSuppliers(defaultSuppliers); };

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
      {mode === 'monitor' ? (
        <MonitorView onReset={reset} />
      ) : launched ? (
        /* Launched state */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: 24, background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🚀</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: C.text, textAlign: 'center' }}>Auction Launched!</div>
          <div style={{ fontSize: 15, color: C.textMid, textAlign: 'center', lineHeight: 1.6 }}>Suppliers have been notified.<br />Auction is now live.</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            {[0, 1, 2].map(i => (<div key={i} style={{ width: 8, height: 8, borderRadius: 4, background: C.green, animation: `dotAnim 1.2s ${i * 0.2}s infinite` }} />))}
          </div>
          <div style={{ background: C.greenSoft, borderRadius: 16, padding: '14px 18px', border: `1.5px solid rgba(12,158,106,0.2)`, width: '100%', maxWidth: 340, marginTop: 8 }}>
            {[['Auction', title], ['Reference', refId], ['Duration', duration], ['Suppliers', `${suppliers.length} notified`], ['Items', `${items.length} line items`]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid rgba(12,158,106,0.15)`, fontSize: 13 }}>
                <span style={{ color: C.green }}>{k}</span>
                <span style={{ fontWeight: 600, color: C.green }}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setMode('monitor')} style={{ marginTop: 12, background: C.accent, color: 'white', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, padding: '14px 28px', fontFamily: 'inherit', cursor: 'pointer', width: '100%', maxWidth: 340 }}>
            Monitor Live Auction →
          </button>
          <button onClick={reset} style={{ background: 'transparent', border: 'none', color: C.textSoft, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>↺ Reset Demo</button>
          <style>{`@keyframes dotAnim{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}`}</style>
        </div>
      ) : (
        /* Create Auction */
        <>
          <PhoneSection>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📋</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>New Auction</div>
                <div style={{ fontSize: 11, color: C.textSoft }}>Step {step + 1} of 4</div>
              </div>
            </div>
            <Divider />
            <StepBar step={step} />
            <Divider />
          </PhoneSection>

          {step === 0 && <StepDetails title={title} setTitle={setTitle} refId={refId} setRefId={setRefId} duration={duration} setDuration={setDuration} rules={rules} setRules={setRules} />}
          {step === 1 && <StepItems items={items} setItems={setItems} />}
          {step === 2 && <StepSuppliers suppliers={suppliers} setSuppliers={setSuppliers} />}
          {step === 3 && <StepReview title={title} refId={refId} duration={duration} rules={rules} items={items} suppliers={suppliers} />}

          <PhoneFooter>
            {step === 0 && <Btn variant="primary" onClick={() => setStep(1)}>Continue to Items →</Btn>}
            {step === 1 && (
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="ghost" onClick={() => setStep(0)} style={{ flex: '0 0 88px' }}>Back</Btn>
                <Btn variant="primary" onClick={() => setStep(2)}>Continue to Suppliers →</Btn>
              </div>
            )}
            {step === 2 && (
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="ghost" onClick={() => setStep(1)} style={{ flex: '0 0 88px' }}>Back</Btn>
                <Btn variant="primary" onClick={() => setStep(3)}>Review & Launch →</Btn>
              </div>
            )}
            {step === 3 && (
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="ghost" onClick={() => setStep(2)} style={{ flex: '0 0 88px' }}>Back</Btn>
                <Btn variant="green" onClick={() => setLaunched(true)}>🚀 Launch Auction</Btn>
              </div>
            )}
          </PhoneFooter>
        </>
      )}
    </div>
  );
}