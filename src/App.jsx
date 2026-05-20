import { useState, useEffect, useRef } from "react";

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
const STRIPE_PUBLIC_KEY = "YOUR_STRIPE_PUBLIC_KEY";

const BARBERS = [
  {
    id: 1,
    name: "Marcus Webb",
    shop: "Webb's Classic Cuts",
    lat: 53.3498,
    lng: -6.2603,
    address: "14 Dame Street, Dublin 2",
    rating: 4.9,
    reviews: 312,
    specialty: "Fades & Tapers",
    price: 28,
    avatar: "MW",
    color: "#C8A97E",
    available: true,
    slots: {
      "2026-05-20": ["09:00","09:30","10:00","11:00","14:00","15:30","16:00"],
      "2026-05-21": ["09:00","10:30","11:00","13:00","14:00","16:30"],
      "2026-05-22": ["09:30","10:00","11:30","14:00","15:00","16:00","17:00"],
      "2026-05-23": ["09:00","10:00","11:00","14:30","15:00","16:00"],
      "2026-05-24": ["09:00","10:00","11:00"],
    }
  },
  {
    id: 2,
    name: "James O'Connor",
    shop: "The Dublin Blade",
    lat: 53.3456,
    lng: -6.2672,
    address: "88 Grafton St, Dublin 2",
    rating: 4.7,
    reviews: 198,
    specialty: "Hot Towel Shave",
    price: 35,
    avatar: "JO",
    color: "#7E9CC8",
    available: true,
    slots: {
      "2026-05-20": ["09:00","10:00","12:00","14:00","15:00","17:00"],
      "2026-05-21": ["09:30","11:00","13:00","15:30","16:00"],
      "2026-05-22": ["09:00","10:30","11:00","14:00","16:00"],
      "2026-05-23": ["09:00","10:00","13:00","14:00","15:30","17:00"],
      "2026-05-24": ["09:00","11:00","14:00","16:00"],
    }
  },
  {
    id: 3,
    name: "Aiden Murphy",
    shop: "Murph's Barbershop",
    lat: 53.3512,
    lng: -6.2485,
    address: "3 Wicklow St, Dublin 2",
    rating: 4.8,
    reviews: 445,
    specialty: "Beard Sculpting",
    price: 22,
    avatar: "AM",
    color: "#7EC8A4",
    available: false,
    slots: {
      "2026-05-21": ["10:00","11:00","13:00","14:30","16:00"],
      "2026-05-22": ["09:00","10:30","12:00","14:00","15:30"],
      "2026-05-23": ["09:30","11:00","13:30","15:00","17:00"],
      "2026-05-24": ["09:00","10:00","11:30","14:00","16:00"],
    }
  },
];

const SERVICES = [
  { id: 1, name: "Classic Cut", duration: 30, price: 0 },
  { id: 2, name: "Fade & Taper", duration: 45, price: 5 },
  { id: 3, name: "Hot Towel Shave", duration: 30, price: 8 },
  { id: 4, name: "Beard Trim", duration: 20, price: 6 },
  { id: 5, name: "Cut + Beard", duration: 60, price: 12 },
  { id: 6, name: "Kids Cut", duration: 20, price: -6 },
];

const PALETTE = {
  bg: "#0A0A0A",
  surface: "#141414",
  card: "#1C1C1C",
  border: "#2A2A2A",
  gold: "#C8A97E",
  goldLight: "#E2C9A0",
  text: "#F0EDE8",
  muted: "#888",
  accent: "#C8A97E",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${PALETTE.bg}; color: ${PALETTE.text}; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
  ::-webkit-scrollbar { width: 4px; } 
  ::-webkit-scrollbar-track { background: ${PALETTE.surface}; }
  ::-webkit-scrollbar-thumb { background: ${PALETTE.border}; border-radius: 2px; }
  input, select, textarea { background: ${PALETTE.card}; border: 1px solid ${PALETTE.border}; color: ${PALETTE.text}; border-radius: 8px; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; width: 100%; outline: none; transition: border-color 0.2s; }
  input:focus, select:focus, textarea:focus { border-color: ${PALETTE.gold}; }
  input::placeholder, textarea::placeholder { color: ${PALETTE.muted}; }
  select option { background: ${PALETTE.card}; }
  button { cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .gold-btn { background: ${PALETTE.gold}; color: #0A0A0A; border: none; border-radius: 8px; padding: 12px 24px; font-weight: 500; font-size: 14px; transition: all 0.2s; }
  .gold-btn:hover { background: ${PALETTE.goldLight}; transform: translateY(-1px); }
  .ghost-btn { background: transparent; color: ${PALETTE.gold}; border: 1px solid ${PALETTE.gold}; border-radius: 8px; padding: 10px 20px; font-size: 14px; transition: all 0.2s; }
  .ghost-btn:hover { background: rgba(200,169,126,0.1); }
  .card { background: ${PALETTE.card}; border: 1px solid ${PALETTE.border}; border-radius: 16px; padding: 24px; }
  .nav-link { color: ${PALETTE.muted}; background: none; border: none; font-size: 13px; padding: 8px 16px; border-radius: 20px; transition: all 0.2s; }
  .nav-link:hover, .nav-link.active { color: ${PALETTE.text}; background: ${PALETTE.card}; }
  .tag { display: inline-block; background: rgba(200,169,126,0.12); color: ${PALETTE.gold}; border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 500; }
  .star { color: ${PALETTE.gold}; font-size: 13px; }
  .slot-btn { background: ${PALETTE.surface}; border: 1px solid ${PALETTE.border}; color: ${PALETTE.text}; border-radius: 8px; padding: 8px 14px; font-size: 13px; transition: all 0.2s; cursor: pointer; }
  .slot-btn:hover { border-color: ${PALETTE.gold}; color: ${PALETTE.gold}; }
  .slot-btn.selected { background: ${PALETTE.gold}; color: #0A0A0A; border-color: ${PALETTE.gold}; font-weight: 500; }
  .cal-day { background: ${PALETTE.surface}; border: 1px solid ${PALETTE.border}; border-radius: 8px; padding: 10px 8px; text-align: center; cursor: pointer; transition: all 0.2s; min-width: 42px; }
  .cal-day:hover { border-color: ${PALETTE.gold}; }
  .cal-day.selected { background: ${PALETTE.gold}; border-color: ${PALETTE.gold}; color: #0A0A0A; }
  .cal-day.today { border-color: rgba(200,169,126,0.5); }
  .cal-day.empty { background: transparent; border-color: transparent; cursor: default; }
  .input-group { margin-bottom: 16px; }
  .input-group label { display: block; font-size: 12px; color: ${PALETTE.muted}; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.06em; }
  .chip { background: ${PALETTE.surface}; border: 1px solid ${PALETTE.border}; color: ${PALETTE.muted}; border-radius: 20px; padding: 6px 16px; font-size: 13px; cursor: pointer; transition: all 0.2s; }
  .chip.selected { border-color: ${PALETTE.gold}; color: ${PALETTE.gold}; background: rgba(200,169,126,0.08); }
  .svc-card { background: ${PALETTE.surface}; border: 1px solid ${PALETTE.border}; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s; }
  .svc-card:hover { border-color: ${PALETTE.gold}; }
  .svc-card.selected { border-color: ${PALETTE.gold}; background: rgba(200,169,126,0.06); }
  .map-placeholder { background: linear-gradient(135deg, #141414 0%, #1a1a1a 100%); border: 1px solid ${PALETTE.border}; border-radius: 16px; overflow: hidden; position: relative; }
  .map-pin { position: absolute; transform: translate(-50%, -100%); cursor: pointer; transition: all 0.2s; }
  .map-pin:hover { transform: translate(-50%, -100%) scale(1.15); z-index: 10; }
  .progress-step { display: flex; align-items: center; gap: 8px; }
  .progress-dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; flex-shrink: 0; transition: all 0.3s; }
  .progress-dot.done { background: ${PALETTE.gold}; color: #0A0A0A; }
  .progress-dot.active { background: rgba(200,169,126,0.2); color: ${PALETTE.gold}; border: 1px solid ${PALETTE.gold}; }
  .progress-dot.pending { background: ${PALETTE.surface}; color: ${PALETTE.muted}; border: 1px solid ${PALETTE.border}; }
  .progress-line { width: 32px; height: 1px; background: ${PALETTE.border}; flex-shrink: 0; }
  .progress-line.done { background: ${PALETTE.gold}; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.35s ease forwards; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  .pulse { animation: pulse 2s infinite; }
  .barber-card { background: ${PALETTE.card}; border: 1px solid ${PALETTE.border}; border-radius: 16px; overflow: hidden; cursor: pointer; transition: all 0.25s; }
  .barber-card:hover { border-color: ${PALETTE.gold}; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,169,126,0.08); }
  .barber-card.selected { border-color: ${PALETTE.gold}; box-shadow: 0 0 0 1px ${PALETTE.gold}; }
  .avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 15px; flex-shrink: 0; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 600; margin-bottom: 4px; }
  .section-sub { font-size: 13px; color: ${PALETTE.muted}; margin-bottom: 24px; }
  .divider { border: none; border-top: 1px solid ${PALETTE.border}; margin: 20px 0; }
  .notification { position: fixed; top: 80px; right: 24px; background: ${PALETTE.card}; border: 1px solid ${PALETTE.gold}; border-radius: 12px; padding: 14px 20px; font-size: 13px; z-index: 999; display: flex; align-items: center; gap: 10px; animation: fadeIn 0.3s ease; box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
  .payment-card-input { background: ${PALETTE.card}; border: 1px solid ${PALETTE.border}; border-radius: 8px; padding: 12px 14px; font-size: 15px; color: ${PALETTE.text}; font-family: 'DM Mono', monospace; letter-spacing: 0.08em; }
  .booking-confirmed { text-align: center; padding: 40px 0; }
  .check-circle { width: 80px; height: 80px; border-radius: 50%; background: rgba(200,169,126,0.15); border: 2px solid ${PALETTE.gold}; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px; }
`;

function Notification({ msg, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="notification">
      <span style={{color: PALETTE.gold, fontSize: 18}}>✓</span>
      <span>{msg}</span>
    </div>
  );
}

function Stars({ rating }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} className="star">{i <= Math.round(rating) ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

function Avatar({ initials, color, size = 48 }) {
  return (
    <div className="avatar" style={{ width: size, height: size, background: color + "22", color, fontSize: size * 0.3 }}>
      {initials}
    </div>
  );
}

function MapView({ barbers, selected, onSelect }) {
  const pins = [
    { id: 1, x: "42%", y: "38%" },
    { id: 2, x: "28%", y: "58%" },
    { id: 3, x: "62%", y: "32%" },
  ];
  return (
    <div className="map-placeholder" style={{ height: 340, width: "100%" }}>
      {/* Simulated dark map grid */}
      <svg width="100%" height="100%" style={{position:"absolute",inset:0}}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#222" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Roads */}
        <line x1="0" y1="170" x2="100%" y2="170" stroke="#2A2A2A" strokeWidth="6"/>
        <line x1="0" y1="230" x2="100%" y2="230" stroke="#252525" strokeWidth="4"/>
        <line x1="280" y1="0" x2="280" y2="100%" stroke="#2A2A2A" strokeWidth="5"/>
        <line x1="480" y1="0" x2="480" y2="100%" stroke="#252525" strokeWidth="3"/>
        <line x1="160" y1="0" x2="160" y2="100%" stroke="#222" strokeWidth="2"/>
        <line x1="0" y1="100" x2="100%" y2="100" stroke="#222" strokeWidth="2"/>
        <line x1="0" y1="280" x2="100%" y2="280" stroke="#222" strokeWidth="2"/>
        {/* Blocks */}
        <rect x="50" y="50" width="90" height="35" fill="#181818" rx="2"/>
        <rect x="160" y="50" width="110" height="35" fill="#181818" rx="2"/>
        <rect x="50" y="120" width="200" height="40" fill="#1A1A1A" rx="2"/>
        <rect x="300" y="50" width="160" height="110" fill="#181818" rx="2"/>
        <rect x="50" y="185" width="210" height="35" fill="#181818" rx="2"/>
        <rect x="300" y="185" width="170" height="35" fill="#1A1A1A" rx="2"/>
        <rect x="50" y="245" width="90" height="55" fill="#181818" rx="2"/>
        <rect x="160" y="245" width="120" height="55" fill="#1A1A1A" rx="2"/>
        <rect x="300" y="245" width="170" height="55" fill="#181818" rx="2"/>
        <rect x="510" y="50" width="130" height="90" fill="#181818" rx="2"/>
        <rect x="510" y="185" width="130" height="55" fill="#181818" rx="2"/>
        <rect x="510" y="245" width="130" height="55" fill="#1A1A1A" rx="2"/>
        <text x="50%" y="50%" textAnchor="middle" fill="#333" fontSize="11" fontFamily="DM Sans" dy="4">Dublin City Centre</text>
      </svg>
      {/* Pins */}
      {pins.map((pin) => {
        const barber = barbers.find(b => b.id === pin.id);
        const isSelected = selected?.id === barber?.id;
        return (
          <div
            key={pin.id}
            className="map-pin"
            style={{ left: pin.x, top: pin.y, zIndex: isSelected ? 10 : 1 }}
            onClick={() => onSelect(barber)}
          >
            <div style={{
              background: isSelected ? PALETTE.gold : PALETTE.card,
              border: `2px solid ${isSelected ? PALETTE.gold : PALETTE.border}`,
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: 500,
              color: isSelected ? "#0A0A0A" : PALETTE.text,
              whiteSpace: "nowrap",
              boxShadow: isSelected ? "0 4px 20px rgba(200,169,126,0.3)" : "0 2px 8px rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}>
              <span>✂</span> {barber?.name}
            </div>
            <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `8px solid ${isSelected ? PALETTE.gold : PALETTE.border}`, margin: "0 auto" }} />
          </div>
        );
      })}
      {/* Map controls mockup */}
      <div style={{ position: "absolute", right: 12, top: 12, display: "flex", flexDirection: "column", gap: 4 }}>
        {["+","−"].map(c => (
          <div key={c} style={{ width: 32, height: 32, background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: PALETTE.muted, cursor: "pointer" }}>{c}</div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 10, left: 12, fontSize: 10, color: PALETTE.border }}>© BarberBook Maps • Dublin 2</div>
    </div>
  );
}

function CalendarWidget({ barber, selectedDate, onSelectDate }) {
  const days = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const today = new Date(2026, 4, 19); // May 19 2026
  const [viewMonth, setViewMonth] = useState({ year: 2026, month: 4 });
  const { year, month } = viewMonth;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long" });
  const hasSlots = (day) => {
    const d = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return barber?.slots?.[d]?.length > 0;
  };
  const toKey = (day) => `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button onClick={() => {
          const d = new Date(year, month - 1, 1);
          setViewMonth({ year: d.getFullYear(), month: d.getMonth() });
        }} style={{ background: "none", border: `1px solid ${PALETTE.border}`, color: PALETTE.muted, borderRadius: 6, width: 30, height: 30, fontSize: 14, cursor: "pointer" }}>‹</button>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{monthName} {year}</span>
        <button onClick={() => {
          const d = new Date(year, month + 1, 1);
          setViewMonth({ year: d.getFullYear(), month: d.getMonth() });
        }} style={{ background: "none", border: `1px solid ${PALETTE.border}`, color: PALETTE.muted, borderRadius: 6, width: 30, height: 30, fontSize: 14, cursor: "pointer" }}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
        {days.map(d => <div key={d} style={{ textAlign: "center", fontSize: 11, color: PALETTE.muted, padding: "4px 0" }}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} className="cal-day empty" />)}
        {Array(daysInMonth).fill(null).map((_, i) => {
          const day = i + 1;
          const key = toKey(day);
          const isSelected = selectedDate === key;
          const isToday = day === 19 && month === 4 && year === 2026;
          const isPast = new Date(year, month, day) < today;
          const has = hasSlots(day);
          return (
            <div
              key={day}
              className={`cal-day${isSelected ? " selected" : ""}${isToday ? " today" : ""}`}
              style={{ opacity: isPast || !has ? 0.3 : 1, cursor: isPast || !has ? "not-allowed" : "pointer" }}
              onClick={() => { if (!isPast && has) onSelectDate(key); }}
            >
              <div style={{ fontSize: 13, fontWeight: isToday ? 600 : 400 }}>{day}</div>
              {has && !isSelected && <div style={{ width: 4, height: 4, background: PALETTE.gold, borderRadius: "50%", margin: "2px auto 0" }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfilePage({ profile, setProfile, onSave }) {
  const [form, setForm] = useState(profile);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const avatarLetters = (form.name || "U").split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);
  return (
    <div className="fade-in" style={{ maxWidth: 600, margin: "0 auto", padding: "0 0 40px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: `${PALETTE.gold}22`, border: `2px solid ${PALETTE.gold}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28, fontWeight: 600, color: PALETTE.gold }}>
          {avatarLetters}
        </div>
        <div className="section-title">{form.name || "Your Profile"}</div>
        <div style={{ fontSize: 12, color: PALETTE.muted, marginTop: 4 }}>{form.email}</div>
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 16 }}>Personal Details</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="input-group">
            <label>First Name</label>
            <input value={form.name?.split(" ")[0] || ""} onChange={e => update("name", e.target.value + " " + (form.name?.split(" ")[1] || ""))} placeholder="First name" />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input value={form.name?.split(" ")[1] || ""} onChange={e => update("name", (form.name?.split(" ")[0] || "") + " " + e.target.value)} placeholder="Last name" />
          </div>
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="your@email.com" />
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+353 87 000 0000" />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label>Location</label>
          <input value={form.location} onChange={e => update("location", e.target.value)} placeholder="Dublin City" />
        </div>
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 16 }}>Preferences</div>
        <div className="input-group">
          <label>Preferred Style</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            {["Fade","Classic","Textured","Undercut","Buzz","Long Hair"].map(s => (
              <button key={s} className={`chip${form.styles?.includes(s) ? " selected" : ""}`} onClick={() => update("styles", form.styles?.includes(s) ? form.styles.filter(x => x !== s) : [...(form.styles||[]), s])}>{s}</button>
            ))}
          </div>
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label>Notes for barber</label>
          <textarea value={form.notes || ""} onChange={e => update("notes", e.target.value)} placeholder="Any special requests or hair concerns..." rows={3} style={{ resize: "none" }} />
        </div>
      </div>
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 16 }}>Booking History</div>
        {[
          { barber: "Marcus Webb", date: "May 5, 2026", service: "Fade & Taper", price: 33 },
          { barber: "Aiden Murphy", date: "Apr 18, 2026", service: "Cut + Beard", price: 34 },
        ].map((b, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 1 ? `1px solid ${PALETTE.border}` : "none" }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{b.barber}</div>
              <div style={{ fontSize: 12, color: PALETTE.muted }}>{b.date} · {b.service}</div>
            </div>
            <div style={{ color: PALETTE.gold, fontWeight: 500 }}>€{b.price}</div>
          </div>
        ))}
      </div>
      <button className="gold-btn" style={{ width: "100%" }} onClick={() => { setProfile(form); onSave(); }}>
        Save Profile
      </button>
    </div>
  );
}

function FindPage({ onBook }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("list");
  const filters = ["All","Available","Top Rated","Nearest"];
  const filtered = BARBERS.filter(b => {
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.shop.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "Available" && !b.available) return false;
    if (filter === "Top Rated" && b.rating < 4.8) return false;
    return true;
  });
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <div className="section-title">Find a Barber</div>
        <div className="section-sub">Real-time availability in Dublin City Centre</div>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: PALETTE.muted, fontSize: 16 }}>⌕</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search barbers or shops..." style={{ paddingLeft: 36 }} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {filters.map(f => (
            <button key={f} className={`chip${filter === f ? " selected" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
            {["list","map"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{ background: view === v ? PALETTE.card : "transparent", border: `1px solid ${view === v ? PALETTE.gold : PALETTE.border}`, color: view === v ? PALETTE.gold : PALETTE.muted, borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer" }}>{v === "list" ? "☰ List" : "⊞ Map"}</button>
            ))}
          </div>
        </div>
      </div>
      {view === "map" && (
        <div style={{ marginBottom: 20 }}>
          <MapView barbers={BARBERS} selected={selected} onSelect={setSelected} />
          {selected && (
            <div className="card fade-in" style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 16 }}>
              <Avatar initials={selected.avatar} color={selected.color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{selected.name}</div>
                <div style={{ fontSize: 12, color: PALETTE.muted }}>{selected.shop}</div>
                <div style={{ fontSize: 12, color: PALETTE.muted, marginTop: 2 }}>{selected.address}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <Stars rating={selected.rating} />
                <div style={{ fontSize: 12, color: PALETTE.muted }}>{selected.reviews} reviews</div>
              </div>
              <button className="gold-btn" onClick={() => onBook(selected)} style={{ padding: "10px 18px", fontSize: 13 }}>Book</button>
            </div>
          )}
        </div>
      )}
      {view === "list" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(b => (
            <div key={b.id} className={`barber-card${selected?.id === b.id ? " selected" : ""}`} onClick={() => setSelected(b)} style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ position: "relative" }}>
                  <Avatar initials={b.avatar} color={b.color} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: b.available ? "#4CAF50" : PALETTE.muted, border: `2px solid ${PALETTE.card}`, position: "absolute", bottom: 0, right: 0 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 500, fontSize: 15 }}>{b.name}</span>
                    {b.available && <span className="tag">● Available</span>}
                  </div>
                  <div style={{ fontSize: 12, color: PALETTE.muted }}>{b.shop} · {b.address}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <Stars rating={b.rating} />
                    <span style={{ fontSize: 11, color: PALETTE.muted }}>{b.rating} ({b.reviews})</span>
                    <span style={{ fontSize: 11, color: PALETTE.muted }}>·</span>
                    <span className="tag">{b.specialty}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: PALETTE.gold, fontWeight: 600, fontSize: 18 }}>€{b.price}</div>
                  <div style={{ fontSize: 11, color: PALETTE.muted }}>from</div>
                  <button className="gold-btn" style={{ marginTop: 8, padding: "8px 16px", fontSize: 12 }} onClick={e => { e.stopPropagation(); onBook(b); }}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: PALETTE.muted }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>✂</div>
              <div>No barbers found matching your search</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BookingPage({ barber, onBack, onConfirm }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [notes, setNotes] = useState("");
  if (!barber) return (
    <div style={{ textAlign: "center", padding: "60px 0", color: PALETTE.muted }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>✂</div>
      <div>Select a barber from the Find tab to book</div>
      <div style={{ fontSize: 12, marginTop: 8 }}>Use the Find page to browse available barbers</div>
    </div>
  );
  const slots = barber.slots?.[date] || [];
  const totalPrice = barber.price + (service?.price || 0);
  const steps = ["Service", "Date & Time", "Review"];
  return (
    <div className="fade-in" style={{ maxWidth: 540, margin: "0 auto" }}>
      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center" }}>
            <div className={`progress-dot ${i < step ? "done" : i === step ? "active" : "pending"}`}>
              {i < step ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 12, color: i === step ? PALETTE.text : PALETTE.muted, marginLeft: 6 }}>{s}</span>
            {i < steps.length - 1 && <div className={`progress-line${i < step ? " done" : ""}`} style={{ marginLeft: 6 }} />}
          </div>
        ))}
      </div>
      {/* Barber strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: PALETTE.surface, borderRadius: 12, marginBottom: 24, border: `1px solid ${PALETTE.border}` }}>
        <Avatar initials={barber.avatar} color={barber.color} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500, fontSize: 14 }}>{barber.name}</div>
          <div style={{ fontSize: 12, color: PALETTE.muted }}>{barber.shop}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: PALETTE.gold, fontSize: 12 }}>★ {barber.rating}</span>
          <button onClick={onBack} style={{ background: "none", border: `1px solid ${PALETTE.border}`, color: PALETTE.muted, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}>Change</button>
        </div>
      </div>
      {/* Step 0: Service */}
      {step === 0 && (
        <div className="fade-in">
          <div style={{ marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Choose a Service</div>
          <div style={{ fontSize: 12, color: PALETTE.muted, marginBottom: 16 }}>Prices shown are add-ons to base price</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {SERVICES.map(s => (
              <div key={s.id} className={`svc-card${service?.id === s.id ? " selected" : ""}`} onClick={() => setService(s)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: PALETTE.muted, marginTop: 2 }}>{s.duration} min</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: PALETTE.gold, fontWeight: 500 }}>€{barber.price + s.price}</div>
                    {s.price !== 0 && <div style={{ fontSize: 11, color: PALETTE.muted }}>{s.price > 0 ? "+" : ""}€{s.price}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="gold-btn" style={{ width: "100%" }} disabled={!service} onClick={() => setStep(1)}>Continue →</button>
        </div>
      )}
      {/* Step 1: Date & Time */}
      {step === 1 && (
        <div className="fade-in">
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 16 }}>Pick a Date</div>
            <CalendarWidget barber={barber} selectedDate={date} onSelectDate={setDate} />
          </div>
          {date && (
            <div className="card fade-in" style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>Available Times</div>
                <div style={{ fontSize: 11, color: PALETTE.muted }}>{slots.length} slots open</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {slots.map(t => (
                  <button key={t} className={`slot-btn${slot === t ? " selected" : ""}`} onClick={() => setSlot(t)}>{t}</button>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="ghost-btn" onClick={() => setStep(0)} style={{ flex: "0 0 auto" }}>← Back</button>
            <button className="gold-btn" style={{ flex: 1 }} disabled={!date || !slot} onClick={() => setStep(2)}>Continue →</button>
          </div>
        </div>
      )}
      {/* Step 2: Review */}
      {step === 2 && (
        <div className="fade-in">
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 16 }}>Booking Summary</div>
            {[
              { label: "Barber", value: barber.name },
              { label: "Shop", value: barber.shop },
              { label: "Address", value: barber.address },
              { label: "Service", value: service?.name },
              { label: "Duration", value: `${service?.duration} min` },
              { label: "Date", value: new Date(date).toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long" }) },
              { label: "Time", value: slot },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${PALETTE.border}` }}>
                <span style={{ fontSize: 13, color: PALETTE.muted }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0" }}>
              <span style={{ fontWeight: 500 }}>Total</span>
              <span style={{ color: PALETTE.gold, fontWeight: 600, fontSize: 18 }}>€{totalPrice}</span>
            </div>
          </div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 12 }}>Additional Notes</div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Anything the barber should know..." rows={3} style={{ resize: "none" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="ghost-btn" onClick={() => setStep(1)} style={{ flex: "0 0 auto" }}>← Back</button>
            <button className="gold-btn" style={{ flex: 1 }} onClick={() => onConfirm({ barber, service, date, slot, totalPrice })}>
              Proceed to Payment →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PaymentPage({ booking, onSuccess }) {
  const [form, setForm] = useState({ cardNumber: "", expiry: "", cvv: "", name: "" });
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const formatCard = v => v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  const formatExpiry = v => v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);
  if (!booking) return (
    <div style={{ textAlign: "center", padding: "60px 0", color: PALETTE.muted }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>💳</div>
      <div>No booking to pay for yet</div>
      <div style={{ fontSize: 12, marginTop: 8 }}>Complete a booking first from the Find or Book tab</div>
    </div>
  );
  const handlePay = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2200));
    setProcessing(false);
    onSuccess();
  };
  return (
    <div className="fade-in" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div className="section-title" style={{ marginBottom: 4 }}>Secure Payment</div>
      <div className="section-sub">Powered by Stripe · 256-bit SSL encryption</div>
      {/* Order summary */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 500 }}>{booking.service?.name}</div>
            <div style={{ fontSize: 12, color: PALETTE.muted }}>{booking.barber?.name} · {booking.slot} on {new Date(booking.date).toLocaleDateString("en-IE", { day: "numeric", month: "short" })}</div>
          </div>
          <div style={{ color: PALETTE.gold, fontWeight: 600, fontSize: 20 }}>€{booking.totalPrice}</div>
        </div>
      </div>
      {/* Payment method */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 12 }}>Payment Method</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[
            { id: "card", label: "💳 Card" },
            { id: "apple", label: "  Apple Pay" },
            { id: "google", label: "G Google Pay" },
          ].map(m => (
            <button key={m.id} className={`chip${method === m.id ? " selected" : ""}`} style={{ flex: 1, textAlign: "center" }} onClick={() => setMethod(m.id)}>{m.label}</button>
          ))}
        </div>
        {method === "card" && (
          <div>
            <div className="input-group">
              <label>Cardholder Name</label>
              <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Name on card" />
            </div>
            <div className="input-group">
              <label>Card Number</label>
              <input value={form.cardNumber} onChange={e => update("cardNumber", formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} style={{ letterSpacing: "0.05em" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Expiry</label>
                <input value={form.expiry} onChange={e => update("expiry", formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>CVV</label>
                <input type="password" value={form.cvv} onChange={e => update("cvv", e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="•••" maxLength={3} />
              </div>
            </div>
          </div>
        )}
        {method !== "card" && (
          <div style={{ textAlign: "center", padding: "20px 0", color: PALETTE.muted, fontSize: 13 }}>
            {method === "apple" ? "📱 Tap to pay with Apple Pay" : "📱 Tap to pay with Google Pay"}
          </div>
        )}
      </div>
      {/* Breakdown */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 12 }}>Order Breakdown</div>
        {[
          { label: "Service", value: `€${booking.barber?.price}` },
          { label: booking.service?.name + " add-on", value: `€${booking.service?.price || 0}` },
          { label: "Booking fee", value: "€0" },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${PALETTE.border}` }}>
            <span style={{ fontSize: 13, color: PALETTE.muted }}>{label}</span>
            <span style={{ fontSize: 13 }}>{value}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12 }}>
          <span style={{ fontWeight: 500 }}>Total Due</span>
          <span style={{ color: PALETTE.gold, fontWeight: 600, fontSize: 18 }}>€{booking.totalPrice}</span>
        </div>
      </div>
      <button className="gold-btn" style={{ width: "100%", padding: 14, fontSize: 15, position: "relative", opacity: processing ? 0.7 : 1 }} onClick={handlePay} disabled={processing || (method === "card" && (!form.cardNumber || !form.expiry || !form.cvv || !form.name))}>
        {processing ? (
          <span className="pulse">Processing payment…</span>
        ) : (
          `Pay €${booking.totalPrice} · Book Appointment`
        )}
      </button>
      <div style={{ textAlign: "center", marginTop: 12, fontSize: 11, color: PALETTE.muted }}>
        🔒 Payments secured by Stripe. Cancel free up to 2 hours before.
      </div>
    </div>
  );
}

function ConfirmedPage({ booking, onDone }) {
  return (
    <div className="fade-in booking-confirmed">
      <div className="check-circle">✓</div>
      <div className="section-title" style={{ marginBottom: 8 }}>Booking Confirmed!</div>
      <div style={{ color: PALETTE.muted, fontSize: 13, marginBottom: 28 }}>A confirmation has been sent to your email</div>
      <div className="card" style={{ textAlign: "left", maxWidth: 400, margin: "0 auto 24px" }}>
        <div style={{ fontSize: 12, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 16 }}>Your Appointment</div>
        {[
          { icon: "✂", label: booking.barber?.name, sub: booking.barber?.shop },
          { icon: "📍", label: booking.barber?.address },
          { icon: "📅", label: new Date(booking.date).toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
          { icon: "🕐", label: booking.slot },
          { icon: "💰", label: `€${booking.totalPrice} · ${booking.service?.name}` },
        ].map(({ icon, label, sub }) => (
          <div key={label} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${PALETTE.border}` }}>
            <span style={{ width: 20, flexShrink: 0 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
              {sub && <div style={{ fontSize: 12, color: PALETTE.muted }}>{sub}</div>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="ghost-btn" onClick={onDone}>Book Another →</button>
        <button className="gold-btn" onClick={onDone}>Done</button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("find");
  const [profile, setProfile] = useState({ name: "John Doe", email: "john@email.com", phone: "+353 87 123 4567", location: "Dublin 2", styles: ["Fade"], notes: "" });
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [booking, setBooking] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [notification, setNotification] = useState(null);
  const notify = msg => setNotification(msg);

  const handleBook = (barber) => {
    setSelectedBarber(barber);
    setPage("book");
  };
  const handleConfirmBooking = (b) => {
    setBooking(b);
    setPage("pay");
  };
  const handlePaymentSuccess = () => {
    setConfirmed(true);
    setPage("pay");
  };
  const handleDone = () => {
    setConfirmed(false);
    setBooking(null);
    setSelectedBarber(null);
    setPage("find");
  };

  const navItems = [
    { id: "find", label: "Find", icon: "⌕" },
    { id: "book", label: "Book", icon: "✂" },
    { id: "pay", label: "Payment", icon: "💳" },
    { id: "profile", label: "Profile", icon: "◉" },
  ];

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: PALETTE.bg }}>
        {/* Header */}
        <header style={{ borderBottom: `1px solid ${PALETTE.border}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100, background: `${PALETTE.bg}EE`, backdropFilter: "blur(12px)" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", alignItems: "center", height: 60 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <span style={{ color: PALETTE.gold, fontSize: 22 }}>✂</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em" }}>Barber<span style={{ color: PALETTE.gold }}>Book</span></span>
            </div>
            <nav style={{ display: "flex", gap: 4 }}>
              {navItems.map(n => (
                <button key={n.id} className={`nav-link${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
                  <span style={{ marginRight: 4 }}>{n.icon}</span>{n.label}
                </button>
              ))}
            </nav>
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${PALETTE.gold}22`, border: `1px solid ${PALETTE.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: PALETTE.gold, fontWeight: 600, cursor: "pointer" }} onClick={() => setPage("profile")}>
                {profile.name.split(" ").map(w => w[0]).join("").slice(0,2)}
              </div>
            </div>
          </div>
        </header>
        {/* Sync bar */}
        <div style={{ background: `${PALETTE.gold}11`, borderBottom: `1px solid ${PALETTE.gold}22`, padding: "6px 24px" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: PALETTE.gold }}>
            <span className="pulse">●</span> Live calendar sync active · {BARBERS.filter(b => b.available).length} barbers available now in Dublin
          </div>
        </div>
        {/* Main */}
        <main style={{ maxWidth: 780, margin: "0 auto", padding: "28px 24px" }}>
          {page === "find" && <FindPage onBook={handleBook} />}
          {page === "book" && <BookingPage barber={selectedBarber} onBack={() => setPage("find")} onConfirm={handleConfirmBooking} />}
          {page === "pay" && !confirmed && <PaymentPage booking={booking} onSuccess={handlePaymentSuccess} />}
          {page === "pay" && confirmed && <ConfirmedPage booking={booking} onDone={handleDone} />}
          {page === "profile" && <ProfilePage profile={profile} setProfile={setProfile} onSave={() => notify("Profile saved successfully")} />}
        </main>
        {/* Notification */}
        {notification && <Notification msg={notification} onClose={() => setNotification(null)} />}
        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${PALETTE.border}`, padding: "20px 24px", marginTop: 40 }}>
          <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: PALETTE.muted }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: PALETTE.gold }}>✂</span>
              <span style={{ fontFamily: "Playfair Display, serif", color: PALETTE.text }}>BarberBook</span>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              {["About","Privacy","Terms","Help"].map(l => <a key={l} href="#" style={{ color: PALETTE.muted, textDecoration: "none" }}>{l}</a>)}
            </div>
            <div>© 2026 BarberBook Ireland</div>
          </div>
        </footer>
      </div>
    </>
  );
}
