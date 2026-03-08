import React, { useState } from 'react';
import { C, avColors, avBgs, fmt } from '../auction/colors';
import { PhoneFrame, PhoneSection, PhoneBody, PhoneFooter, Divider, Card, Btn } from '../auction/PhoneFrame';

interface Item {
  id: number; name: string; spec: string; qty: number; unit: string; budget: number;
}
interface Supplier {
  id: number; name: string; email: string;
}

const defaultItems: Item[] = [
  { id: 1, name: 'Laptops', spec: '4GB RAM, 1TB HDD', qty: 100, unit: 'units', budget: 55000 },
  { id: 2, name: 'Laptop Bags', spec: 'Standard carry bag', qty: 100, unit: 'units', budget: 4000 },
  { id: 3, name: 'Desktops', spec: '8GB RAM, 1TB HDD, 15" LCD', qty: 2000, unit: 'units', budget: 620000 },
  { id: 4, name: 'Desktop Warranty', spec: '3-Year coverage', qty: 2000, unit: 'years', budget: 120000 },
];
const defaultSuppliers: Supplier[] = [
  { id: 1, name: 'Supplier X', email: 'supplierx@company.com' },
  { id: 2, name: 'Supplier Y', email: 'suppliery@company.com' },
  { id: 3, name: 'Supplier Z', email: 'supplierz@company.com' },
];
const STEP_LABELS = ['Details', 'Items', 'Suppliers', 'Review'];
const SUGGESTIONS = ['Supplier X', 'Supplier Y', 'Supplier Z', 'Vendor A'];

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
    <div onClick={onToggle} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
      borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{label}</div>
        <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{
        width: 44, height: 26, borderRadius: 13, position: 'relative', flexShrink: 0,
        background: on ? C.accent : C.border, transition: 'background 0.2s',
      }}>
        <div style={{
          position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s',
          left: on ? 21 : 3,
        }} />
      </div>
    </div>
  );
}

function DurPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '9px 0', borderRadius: 10, fontSize: 12, fontWeight: 600,
      cursor: 'pointer', fontFamily: 'inherit',
      border: `1.5px solid ${active ? C.accent : C.border}`,
      background: active ? C.accentSoft : C.bg,
      color: active ? C.accent : C.textMid,
    }}>
      {label}
    </button>
  );
}

// Step 0: Details
function StepDetails({ title, setTitle, refId, setRefId, duration, setDuration, rules, setRules }: any) {
  return (
    <PhoneBody>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Auction Details</div>
      <div style={{ fontSize: 13, color: C.textMid, marginBottom: 20 }}>Set the basic information for this auction</div>
      <Card>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>Auction Title</div>
          <input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>Reference ID</div>
          <input value={refId} onChange={e => setRefId(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>Description (optional)</div>
          <textarea placeholder="Context for suppliers…" style={{ ...inputStyle, height: 68, resize: 'none' }} />
        </div>
      </Card>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 14 }}>Schedule</div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>Duration</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['1 hr', '2 hrs', '4 hrs', 'Custom'].map(d => (
              <DurPill key={d} label={d} active={duration === d} onClick={() => setDuration(d)} />
            ))}
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>End Date & Time</div>
        <input type="datetime-local" defaultValue="2024-12-20T14:00" style={inputStyle} />
      </Card>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 12 }}>Auction Rules</div>
        <Toggle on={rules.ranking} onToggle={() => setRules((r: any) => ({ ...r, ranking: !r.ranking }))} label="Show live ranking to suppliers" sub="Suppliers can see their rank" />
        <Toggle on={rules.bestBid} onToggle={() => setRules((r: any) => ({ ...r, bestBid: !r.bestBid }))} label="Show best bid amount" sub="Suppliers can see the leading bid" />
        <div onClick={() => setRules((r: any) => ({ ...r, autoExtend: !r.autoExtend }))} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', cursor: 'pointer',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>Auto-extend on last-minute bids</div>
            <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>5-min extension if bid in final 2 min</div>
          </div>
          <div style={{
            width: 44, height: 26, borderRadius: 13, position: 'relative', flexShrink: 0,
            background: rules.autoExtend ? C.accent : C.border, transition: 'background 0.2s',
          }}>
            <div style={{
              position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s',
              left: rules.autoExtend ? 21 : 3,
            }} />
          </div>
        </div>
      </Card>
    </PhoneBody>
  );
}

// Step 1: Items
function StepItems({ items, setItems }: { items: Item[]; setItems: (fn: (i: Item[]) => Item[]) => void }) {
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
        <div key={item.id} style={{
          background: C.surface, borderRadius: 14, border: `1.5px solid ${C.border}`,
          padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8,
        }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: avBgs[i % 4], color: avColors[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div>
            {item.spec && <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{item.spec}</div>}
            <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.border, color: C.textMid }}>{item.qty} {item.unit}</span>
              {item.budget > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.accentSoft, color: C.accent }}>Budget: {fmt(item.budget)}</span>}
            </div>
          </div>
          <button onClick={() => setItems(prev => prev.filter(x => x.id !== item.id))} style={{ background: 'none', border: 'none', color: C.textSoft, cursor: 'pointer', fontSize: 18, padding: 0 }}>×</button>
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
            <div style={lblStyle}>Target Budget (optional)</div>
            <input type="number" value={newBudget} onChange={e => setNewBudget(e.target.value)} placeholder="50000" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={addItem} style={{ flex: 1, background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 12, fontFamily: 'inherit' }}>Add Item</button>
            <button onClick={() => setShowForm(false)} style={{ background: C.bg, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: '11px 16px', fontFamily: 'inherit' }}>Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={{ width: '100%', background: 'transparent', border: `1.5px dashed ${C.borderStrong}`, color: C.accent, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 12, fontFamily: 'inherit', marginBottom: 20 }}>+ Add Item</button>
      )}
    </PhoneBody>
  );
}

// Step 2: Suppliers
function StepSuppliers({ suppliers, setSuppliers }: { suppliers: Supplier[]; setSuppliers: (fn: (s: Supplier[]) => Supplier[]) => void }) {
  const [input, setInput] = useState('');
  const addNamed = (name: string) => {
    if (suppliers.find(s => s.name === name)) return;
    setSuppliers(prev => [...prev, { id: Date.now(), name, email: name.toLowerCase().replace(/ /g, '') + '@company.com' }]);
  };
  const addFromInput = () => {
    if (!input.trim()) return;
    setSuppliers(prev => [...prev, { id: Date.now(), name: input.trim(), email: input.trim() }]);
    setInput('');
  };
  const remaining = SUGGESTIONS.filter(s => !suppliers.find(x => x.name === s));

  return (
    <PhoneBody>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Invite Suppliers</div>
      <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>Add suppliers who will participate</div>
      <Card style={{ marginBottom: 10 }}>
        <div style={lblStyle}>Supplier Name or Email</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addFromInput()}
            placeholder="name@supplier.com"
            style={{ ...inputStyle, flex: 1 }}
          />
          <button onClick={addFromInput} style={{ background: C.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: '10px 16px', fontFamily: 'inherit' }}>Add</button>
        </div>
        {remaining.length > 0 && (
          <>
            <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 8 }}>Quick add</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {remaining.map(s => (
                <button key={s} onClick={() => addNamed(s)} style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${C.border}`, background: C.bg, fontSize: 12, color: C.textMid, cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit' }}>+ {s}</button>
              ))}
            </div>
          </>
        )}
      </Card>
      {suppliers.map((s, i) => (
        <div key={s.id} style={{ background: C.surface, borderRadius: 12, border: `1.5px solid ${C.border}`, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: avBgs[i % 4], color: avColors[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{s.name[0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.name}</div>
            <div style={{ fontSize: 11, color: C.textSoft }}>{s.email}</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: C.greenSoft, color: C.green }}>Invited</span>
          <button onClick={() => setSuppliers(prev => prev.filter(x => x.id !== s.id))} style={{ background: 'none', border: 'none', color: C.textSoft, cursor: 'pointer', fontSize: 18, padding: 0 }}>×</button>
        </div>
      ))}
    </PhoneBody>
  );
}

// Step 3: Review
function StepReview({ title, refId, duration, rules, items, suppliers }: any) {
  const total = items.reduce((a: number, i: Item) => a + (i.budget || 0), 0);
  return (
    <PhoneBody>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Review & Launch</div>
      <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>Confirm everything before going live</div>
      <Card>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          <span>📋</span><span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Auction Details</span>
        </div>
        <div style={{ borderBottom: `1px solid ${C.border}`, ...kvRow }}><span style={{ color: C.textMid, fontSize: 12 }}>Title</span><span style={{ fontWeight: 600, color: C.text, fontSize: 12 }}>{title}</span></div>
        <div style={{ borderBottom: `1px solid ${C.border}`, ...kvRow }}><span style={{ color: C.textMid, fontSize: 12 }}>Reference</span><span style={{ fontWeight: 600, color: C.text, fontSize: 12 }}>{refId}</span></div>
        <div style={{ borderBottom: `1px solid ${C.border}`, ...kvRow }}><span style={{ color: C.textMid, fontSize: 12 }}>Duration</span><span style={{ fontWeight: 600, color: C.text, fontSize: 12 }}>{duration}</span></div>
        <div style={{ ...kvRow }}><span style={{ color: C.textMid, fontSize: 12 }}>Ends</span><span style={{ fontWeight: 600, color: C.text, fontSize: 12 }}>Dec 20, 2024 2:00 PM</span></div>
      </Card>
      <Card>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          <span>📦</span><span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Items ({items.length})</span>
        </div>
        {items.map((item: Item) => (
          <div key={item.id} style={{ borderBottom: `1px solid ${C.border}`, padding: '7px 0' }}>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{item.name}</div>
            <div style={{ fontSize: 11, color: C.textSoft }}>{item.qty} {item.unit}{item.spec ? ' · ' + item.spec : ''}</div>
          </div>
        ))}
      </Card>
      <Card>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          <span>👥</span><span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Suppliers ({suppliers.length})</span>
        </div>
        {suppliers.map((s: Supplier, i: number) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i < suppliers.length - 1 ? `1px solid ${C.border}` : 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: avBgs[i % 4], color: avColors[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{s.name[0]}</div>
            <div>
              <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: C.textSoft }}>{s.email}</div>
            </div>
          </div>
        ))}
      </Card>
      {total > 0 && (
        <div style={{ background: C.accentSoft, borderRadius: 14, padding: '12px 16px', border: `1px solid rgba(124,58,237,0.2)`, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>Total Target Budget</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: C.accent }}>{fmt(total)}</span>
        </div>
      )}
      <div style={{ background: C.amberSoft, borderRadius: 14, padding: '12px 14px', border: `1px solid rgba(217,119,6,0.25)`, marginBottom: 10, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span>⚠️</span>
        <div style={{ fontSize: 12, color: C.amber }}>Suppliers will be notified immediately. Details cannot be changed after launch.</div>
      </div>
    </PhoneBody>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: 10,
  border: `1.5px solid ${C.borderStrong}`, background: C.surface,
  color: C.text, fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none',
};
const lblStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: C.textSoft, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' };
const kvRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0' };

export default function CreateAuctionFlow() {
  const [step, setStep] = useState(0);
  const [items, setItems] = useState<Item[]>(defaultItems);
  const [suppliers, setSuppliers] = useState<Supplier[]>(defaultSuppliers);
  const [title, setTitle] = useState('IT Equipment Procurement');
  const [refId, setRefId] = useState('AUC-2024-0892');
  const [duration, setDuration] = useState('2 hrs');
  const [rules, setRules] = useState({ ranking: true, bestBid: true, autoExtend: false });

  const goNext = () => setStep(s => Math.min(s + 1, 4));
  const goBack = () => setStep(s => Math.max(s - 1, 0));

  const launched = step === 4;

  return (
    <PhoneFrame label="💼 Buyer — Create Auction" sublabel="Steps: Details → Items → Suppliers → Review & Launch">
      {/* Header */}
      <PhoneSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📋</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>New Auction</div>
            <div style={{ fontSize: 11, color: C.textSoft }}>{launched ? 'Launched!' : `Step ${step + 1} of ${STEP_LABELS.length}`}</div>
          </div>
        </div>
        {!launched && (
          <>
            <Divider />
            <StepBar step={step} />
            <Divider />
          </>
        )}
      </PhoneSection>

      {/* Content */}
      {launched ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 16, background: C.bg }}>
          <div style={{ width: 72, height: 72, borderRadius: 24, background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🚀</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text, textAlign: 'center' }}>Auction Launched!</div>
          <div style={{ fontSize: 13, color: C.textMid, textAlign: 'center', lineHeight: 1.5 }}>Suppliers have been notified.<br />Auction is now live.</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: 4, background: C.accent, animation: `dotAnim 1.2s ${i * 0.2}s infinite` }} />
            ))}
          </div>
          <button onClick={() => { setStep(0); setItems(defaultItems); setSuppliers(defaultSuppliers); }} style={{ marginTop: 16, background: C.accentSoft, color: C.accent, border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '10px 20px', fontFamily: 'inherit' }}>
            ↺ Reset Demo
          </button>
          <style>{`@keyframes dotAnim{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}`}</style>
        </div>
      ) : (
        <>
          {step === 0 && <StepDetails title={title} setTitle={setTitle} refId={refId} setRefId={setRefId} duration={duration} setDuration={setDuration} rules={rules} setRules={setRules} />}
          {step === 1 && <StepItems items={items} setItems={setItems} />}
          {step === 2 && <StepSuppliers suppliers={suppliers} setSuppliers={setSuppliers} />}
          {step === 3 && <StepReview title={title} refId={refId} duration={duration} rules={rules} items={items} suppliers={suppliers} />}

          <PhoneFooter>
            {step === 0 && (
              <Btn variant="primary" onClick={goNext}>Continue to Items →</Btn>
            )}
            {step > 0 && step < 3 && (
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="ghost" onClick={goBack} style={{ flex: '0 0 88px' }}>Back</Btn>
                <Btn variant="primary" onClick={goNext}>{step === 1 ? 'Continue to Suppliers →' : 'Review & Launch →'}</Btn>
              </div>
            )}
            {step === 3 && (
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="ghost" onClick={goBack} style={{ flex: '0 0 88px' }}>Back</Btn>
                <Btn variant="green" onClick={goNext}>🚀 Launch Auction</Btn>
              </div>
            )}
          </PhoneFooter>
        </>
      )}
    </PhoneFrame>
  );
}