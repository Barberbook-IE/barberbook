// BarberOnboard.jsx — Full barber signup & admin review flow
import { useState } from "react";

const P = {
  bg: "#0A0A0A", surface: "#141414", card: "#1C1C1C",
  border: "#2A2A2A", gold: "#C8A97E", goldLight: "#E2C9A0",
  text: "#F0EDE8", muted: "#777", green: "#4CAF50", red: "#EF5350",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${P.bg};color:${P.text};font-family:'DM Sans',sans-serif;min-height:100vh;}
  input,select,textarea{background:${P.card};border:1px solid ${P.border};color:${P.text};border-radius:8px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:14px;width:100%;outline:none;transition:border-color 0.2s;}
  input:focus,select:focus,textarea:focus{border-color:${P.gold};}
  input::placeholder,textarea::placeholder{color:${P.muted};}
  select option{background:${P.card};}
  button{cursor:pointer;font-family:'DM Sans',sans-serif;}
  .gold-btn{background:${P.gold};color:#0A0A0A;border:none;border-radius:8px;padding:12px 24px;font-weight:500;font-size:14px;transition:all 0.2s;}
  .gold-btn:hover{background:${P.goldLight};}
  .gold-btn:disabled{opacity:0.4;cursor:not-allowed;}
  .ghost-btn{background:transparent;color:${P.gold};border:1px solid ${P.gold};border-radius:8px;padding:10px 20px;font-size:14px;transition:all 0.2s;}
  .ghost-btn:hover{background:rgba(200,169,126,0.1);}
  .card{background:${P.card};border:1px solid ${P.border};border-radius:16px;padding:24px;}
  .input-group{margin-bottom:16px;}
  .input-group label{display:block;font-size:12px;color:${P.muted};margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em;}
  .input-group .hint{font-size:11px;color:${P.muted};margin-top:4px;}
  .tag{display:inline-block;background:rgba(200,169,126,0.12);color:${P.gold};border-radius:4px;padding:2px 8px;font-size:11px;font-weight:500;}
  .chip{background:${P.surface};border:1px solid ${P.border};color:${P.muted};border-radius:20px;padding:6px 14px;font-size:13px;cursor:pointer;transition:all 0.2s;}
  .chip.selected{border-color:${P.gold};color:${P.gold};background:rgba(200,169,126,0.08);}
  .step-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;flex-shrink:0;}
  .step-dot.done{background:${P.gold};color:#0A0A0A;}
  .step-dot.active{background:rgba(200,169,126,0.15);color:${P.gold};border:1px solid ${P.gold};}
  .step-dot.pending{background:${P.surface};color:${P.muted};border:1px solid ${P.border};}
  .step-line{flex:1;height:1px;background:${P.border};}
  .step-line.done{background:${P.gold};}
  @keyframes fadeIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
  .fade-in{animation:fadeIn 0.3s ease forwards;}
  .error{font-size:12px;color:${P.red};margin-top:4px;}
  .svc-row{display:grid;grid-template-columns:1fr 80px 80px 36px;gap:8px;align-items:center;margin-bottom:8px;}
  .remove-btn{background:none;border:1px solid ${P.border};color:${P.muted};border-radius:6px;width:32px;height:32px;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
  .remove-btn:hover{border-color:${P.red};color:${P.red};}
  .add-btn{background:none;border:1px dashed ${P.border};color:${P.muted};border-radius:8px;padding:8px 16px;font-size:13px;width:100%;transition:all 0.2s;margin-top:4px;}
  .add-btn:hover{border-color:${P.gold};color:${P.gold};}
  .status-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:500;}
  .status-pending{background:rgba(255,193,7,0.12);color:#FFC107;}
  .status-approved{background:rgba(76,175,80,0.12);color:#4CAF50;}
  .status-rejected{background:rgba(239,83,80,0.12);color:#EF5350;}
  .admin-card{background:${P.card};border:1px solid ${P.border};border-radius:12px;padding:18px;margin-bottom:10px;transition:all 0.2s;}
  .admin-card:hover{border-color:${P.border};}
  .section-label{font-size:12px;color:${P.gold};text-transform:uppercase;letter-spacing:0.08em;font-weight:500;margin-bottom:14px;}
`;

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const CALENDAR_SYSTEMS = [
  { id: "calendly", label: "Calendly", desc: "Connect your Calendly account" },
  { id: "google", label: "Google Calendar", desc: "Sync with Google Calendar" },
  { id: "manual", label: "Manual slots", desc: "We'll set up your availability manually" },
];

const SPECIALTIES = ["Classic Cuts","Skin Fades","Beard Work","Hot Towel Shave","Colouring","Kids Cuts","Open Razor Shave","Restyling","Hair Design"];

// Mock submitted applications for admin view
const MOCK_APPLICATIONS = [
  {
    id: "app_001", status: "pending", submittedAt: "2026-05-19 14:32",
    shopName: "The Lads Barbershop", ownerName: "Conor Brady",
    email: "conor@theladsbarbershop.ie", phone: "+353 87 234 5678",
    address: "44 Camden Street Lower, Dublin 2", area: "Dublin 2",
    barbers: [{name:"Conor Brady",specialty:"Fades & Tapers"},{name:"Rory Dunne",specialty:"Classic Cuts"}],
    services: [{name:"Classic Cut",duration:30,price:28},{name:"Skin Fade",duration:45,price:33}],
    calendarSystem: "calendly", calendlyUrl: "calendly.com/theladsbarbershop",
    openingHours: "Mon–Fri 9:00–19:00, Sat 9:00–17:00",
    experience: "15 years combined experience. Specialising in modern fades and classic cuts.",
  },
  {
    id: "app_002", status: "pending", submittedAt: "2026-05-18 09:15",
    shopName: "Temple Cut", ownerName: "Ahmed Hassan",
    email: "ahmed@templecut.ie", phone: "+353 83 456 7890",
    address: "12 Temple Bar, Dublin 2", area: "Dublin 2",
    barbers: [{name:"Ahmed Hassan",specialty:"Beard Sculpting"},{name:"Dara Murphy",specialty:"Hot Towel Shave"}],
    services: [{name:"Classic Cut",duration:30,price:30},{name:"Beard Trim",duration:20,price:22},{name:"Hot Towel Shave",duration:40,price:35}],
    calendarSystem: "google", calendlyUrl: "",
    openingHours: "Mon–Sun 10:00–20:00",
    experience: "Award-winning beard work. Featured in Dublin Barber Magazine 2025.",
  },
  {
    id: "app_003", status: "approved", submittedAt: "2026-05-15 11:00",
    shopName: "The Grafton Barber", ownerName: "Johnny",
    email: "grafton@graftonbarbers.com", phone: "+353 1 679 6984",
    address: "51 Grafton Street, Dublin 2", area: "Dublin 2",
    barbers: [{name:"Johnny",specialty:"Razor Shaving"},{name:"Seán",specialty:"Fades"}],
    services: [{name:"Classic Cut",duration:30,price:30},{name:"Skin Fade",duration:30,price:32}],
    calendarSystem: "calendly", calendlyUrl: "calendly.com/graftonbarber",
    openingHours: "Mon–Sat 9:00–18:00, Thu 9:00–19:30, Sun 11:00–17:00",
    experience: "Established 1961. Ireland's largest barbershop chain.",
  },
];

// ─── STEP INDICATOR ──────────────────────────────────────────────────────────
function StepBar({ current, steps }) {
  return (
    <div style={{display:"flex",alignItems:"center",marginBottom:32}}>
      {steps.map((s,i)=>(
        <div key={s} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:"none"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div className={`step-dot ${i<current?"done":i===current?"active":"pending"}`}>
              {i<current?"✓":i+1}
            </div>
            <span style={{fontSize:10,color:i===current?P.gold:P.muted,whiteSpace:"nowrap"}}>{s}</span>
          </div>
          {i<steps.length-1&&<div className={`step-line${i<current?" done":""}`} style={{margin:"0 8px",marginBottom:14}}/>}
        </div>
      ))}
    </div>
  );
}

// ─── ONBOARDING FORM ─────────────────────────────────────────────────────────
function OnboardForm({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    // Step 0 — Shop info
    shopName: "", ownerName: "", email: "", phone: "", website: "",
    address: "", area: "Dublin 1",
    openingHours: "",
    about: "",
    // Step 1 — Barbers
    barbers: [{ name: "", specialty: [], experience: "" }],
    // Step 2 — Services
    services: [{ name: "", duration: 30, price: 0 }],
    // Step 3 — Availability
    calendarSystem: "",
    calendlyUrl: "",
    openDays: [],
    openFrom: "09:00",
    openTo: "18:00",
    // Step 4 — Confirmation
    agreeTerms: false,
    agreeComms: false,
  });

  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const STEPS = ["Shop Info", "Your Barbers", "Services", "Availability", "Submit"];

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.shopName.trim()) e.shopName = "Shop name is required";
      if (!form.ownerName.trim()) e.ownerName = "Owner name is required";
      if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required";
      if (!form.phone.trim()) e.phone = "Phone number required";
      if (!form.address.trim()) e.address = "Address required";
    }
    if (step === 1) {
      if (form.barbers.some(b => !b.name.trim())) e.barbers = "All barbers need a name";
    }
    if (step === 2) {
      if (form.services.some(s => !s.name.trim())) e.services = "All services need a name";
      if (form.services.some(s => s.price <= 0)) e.servicePrice = "All services need a price";
    }
    if (step === 3) {
      if (!form.calendarSystem) e.calendarSystem = "Please select a calendar option";
    }
    if (step === 4) {
      if (!form.agreeTerms) e.agreeTerms = "You must agree to the terms";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => { setStep(s => s - 1); setErrors({}); };

  // Barber helpers
  const addBarber = () => u("barbers", [...form.barbers, { name: "", specialty: [], experience: "" }]);
  const updateBarber = (i, k, v) => u("barbers", form.barbers.map((b, idx) => idx === i ? { ...b, [k]: v } : b));
  const removeBarber = i => u("barbers", form.barbers.filter((_, idx) => idx !== i));
  const toggleSpecialty = (i, s) => {
    const current = form.barbers[i].specialty;
    updateBarber(i, "specialty", current.includes(s) ? current.filter(x => x !== s) : [...current, s]);
  };

  // Service helpers
  const addService = () => u("services", [...form.services, { name: "", duration: 30, price: 0 }]);
  const updateService = (i, k, v) => u("services", form.services.map((s, idx) => idx === i ? { ...s, [k]: v } : s));
  const removeService = i => u("services", form.services.filter((_, idx) => idx !== i));

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <StepBar current={step} steps={STEPS} />

      {/* Step 0: Shop Info */}
      {step === 0 && (
        <div className="fade-in">
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Tell us about your shop</div>
            <div style={{ fontSize: 13, color: P.muted }}>This is what customers will see on your BarberBook listing</div>
          </div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-label">Shop Details</div>
            <div className="input-group">
              <label>Shop Name *</label>
              <input value={form.shopName} onChange={e => u("shopName", e.target.value)} placeholder="e.g. The Dublin Blade"/>
              {errors.shopName && <div className="error">{errors.shopName}</div>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="input-group">
                <label>Owner Name *</label>
                <input value={form.ownerName} onChange={e => u("ownerName", e.target.value)} placeholder="Your full name"/>
                {errors.ownerName && <div className="error">{errors.ownerName}</div>}
              </div>
              <div className="input-group">
                <label>Area</label>
                <select value={form.area} onChange={e => u("area", e.target.value)}>
                  {["Dublin 1","Dublin 2","Dublin 3","Dublin 4","Dublin 6","Dublin 7","Dublin 8","Dublin 9","Dublin 12","Dublin 15","South Dublin"].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="input-group">
              <label>Full Address *</label>
              <input value={form.address} onChange={e => u("address", e.target.value)} placeholder="e.g. 12 Camden Street Lower, Dublin 2"/>
              {errors.address && <div className="error">{errors.address}</div>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="input-group">
                <label>Email *</label>
                <input type="email" value={form.email} onChange={e => u("email", e.target.value)} placeholder="shop@email.ie"/>
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="input-group">
                <label>Phone *</label>
                <input type="tel" value={form.phone} onChange={e => u("phone", e.target.value)} placeholder="+353 1 000 0000"/>
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>
            </div>
            <div className="input-group">
              <label>Website (optional)</label>
              <input value={form.website} onChange={e => u("website", e.target.value)} placeholder="yourshop.ie"/>
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>About your shop</label>
              <textarea value={form.about} onChange={e => u("about", e.target.value)} rows={3} style={{ resize: "none" }} placeholder="Tell customers what makes your shop special — atmosphere, specialties, experience..."/>
              <div className="hint">This appears on your shop profile. Make it count.</div>
            </div>
          </div>
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="section-label">Opening Hours</div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Hours Summary</label>
              <input value={form.openingHours} onChange={e => u("openingHours", e.target.value)} placeholder="e.g. Mon–Fri 9:00–19:00 · Sat 9:00–17:00 · Sun Closed"/>
              <div className="hint">Write it how you'd put it on a sign. We'll format it for your listing.</div>
            </div>
          </div>
          <button className="gold-btn" style={{ width: "100%" }} onClick={next}>Continue → Your Barbers</button>
        </div>
      )}

      {/* Step 1: Barbers */}
      {step === 1 && (
        <div className="fade-in">
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Who works in your shop?</div>
            <div style={{ fontSize: 13, color: P.muted }}>Customers book individual barbers — add everyone who takes appointments</div>
          </div>
          {form.barbers.map((b, i) => (
            <div className="card" key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div className="section-label" style={{ marginBottom: 0 }}>Barber {i + 1}</div>
                {form.barbers.length > 1 && (
                  <button className="remove-btn" onClick={() => removeBarber(i)}>×</button>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="input-group">
                  <label>Full Name *</label>
                  <input value={b.name} onChange={e => updateBarber(i, "name", e.target.value)} placeholder="Barber's name"/>
                </div>
                <div className="input-group">
                  <label>Years Experience</label>
                  <select value={b.experience} onChange={e => updateBarber(i, "experience", e.target.value)}>
                    <option value="">Select...</option>
                    {["1–2 years","3–5 years","5–8 years","8–12 years","12+ years"].map(x=><option key={x}>{x}</option>)}
                  </select>
                </div>
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Specialties</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                  {SPECIALTIES.map(s => (
                    <button key={s} className={`chip${b.specialty.includes(s) ? " selected" : ""}`} onClick={() => toggleSpecialty(i, s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {errors.barbers && <div className="error" style={{ marginBottom: 12 }}>{errors.barbers}</div>}
          <button className="add-btn" onClick={addBarber}>+ Add another barber</button>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button className="ghost-btn" onClick={back}>← Back</button>
            <button className="gold-btn" style={{ flex: 1 }} onClick={next}>Continue → Services</button>
          </div>
        </div>
      )}

      {/* Step 2: Services */}
      {step === 2 && (
        <div className="fade-in">
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, marginBottom: 4 }}>What services do you offer?</div>
            <div style={{ fontSize: 13, color: P.muted }}>Add all bookable services with duration and price</div>
          </div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 36px", gap: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: P.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Service Name</div>
              <div style={{ fontSize: 11, color: P.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Mins</div>
              <div style={{ fontSize: 11, color: P.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Price €</div>
              <div/>
            </div>
            {form.services.map((s, i) => (
              <div key={i} className="svc-row">
                <input value={s.name} onChange={e => updateService(i, "name", e.target.value)} placeholder="e.g. Skin Fade"/>
                <input type="number" value={s.duration} onChange={e => updateService(i, "duration", parseInt(e.target.value)||30)} min={10} max={120} style={{ textAlign: "center" }}/>
                <input type="number" value={s.price} onChange={e => updateService(i, "price", parseInt(e.target.value)||0)} min={0} placeholder="€" style={{ textAlign: "center" }}/>
                <button className="remove-btn" onClick={() => removeService(i)} disabled={form.services.length===1}>×</button>
              </div>
            ))}
            {errors.services && <div className="error">{errors.services}</div>}
            {errors.servicePrice && <div className="error">{errors.servicePrice}</div>}
            <button className="add-btn" onClick={addService}>+ Add another service</button>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="ghost-btn" onClick={back}>← Back</button>
            <button className="gold-btn" style={{ flex: 1 }} onClick={next}>Continue → Availability</button>
          </div>
        </div>
      )}

      {/* Step 3: Availability */}
      {step === 3 && (
        <div className="fade-in">
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, marginBottom: 4 }}>How do you manage bookings?</div>
            <div style={{ fontSize: 13, color: P.muted }}>We sync with your existing calendar so bookings stay in one place</div>
          </div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-label">Calendar System</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {CALENDAR_SYSTEMS.map(c => (
                <div key={c.id} onClick={() => u("calendarSystem", c.id)}
                  style={{ border: `1px solid ${form.calendarSystem===c.id?P.gold:P.border}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", background: form.calendarSystem===c.id?"rgba(200,169,126,0.06)":P.surface, transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${form.calendarSystem===c.id?P.gold:P.border}`, background: form.calendarSystem===c.id?P.gold:"transparent", flexShrink: 0 }}/>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{c.label}</div>
                      <div style={{ fontSize: 12, color: P.muted }}>{c.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.calendarSystem && <div className="error">{errors.calendarSystem}</div>}
            {form.calendarSystem === "calendly" && (
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Your Calendly URL</label>
                <input value={form.calendlyUrl} onChange={e => u("calendlyUrl", e.target.value)} placeholder="calendly.com/yourshop"/>
                <div className="hint">We'll pull your live availability directly from Calendly. New bookings appear in both places automatically.</div>
              </div>
            )}
            {form.calendarSystem === "google" && (
              <div style={{ background: P.surface, borderRadius: 10, padding: 16, fontSize: 13, color: P.muted, border: `1px solid ${P.border}` }}>
                After submission, we'll send you a link to connect your Google Calendar via OAuth. Takes about 2 minutes.
              </div>
            )}
            {form.calendarSystem === "manual" && (
              <div>
                <div className="section-label" style={{ marginTop: 16 }}>Open Days</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {DAYS.map(d => (
                    <button key={d} className={`chip${form.openDays.includes(d)?" selected":""}`}
                      onClick={() => u("openDays", form.openDays.includes(d)?form.openDays.filter(x=>x!==d):[...form.openDays,d])}>{d.slice(0,3)}</button>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="input-group" style={{ marginBottom: 0 }}>
                    <label>Opens At</label>
                    <input type="time" value={form.openFrom} onChange={e => u("openFrom", e.target.value)}/>
                  </div>
                  <div className="input-group" style={{ marginBottom: 0 }}>
                    <label>Closes At</label>
                    <input type="time" value={form.openTo} onChange={e => u("openTo", e.target.value)}/>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="ghost-btn" onClick={back}>← Back</button>
            <button className="gold-btn" style={{ flex: 1 }} onClick={next}>Continue → Review & Submit</button>
          </div>
        </div>
      )}

      {/* Step 4: Submit */}
      {step === 4 && (
        <div className="fade-in">
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Almost there — review your listing</div>
            <div style={{ fontSize: 13, color: P.muted }}>We'll review your application within 24 hours and email you when you're live</div>
          </div>
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="section-label">Shop</div>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{form.shopName}</div>
            <div style={{ fontSize: 13, color: P.muted }}>{form.address}</div>
            <div style={{ fontSize: 13, color: P.muted }}>{form.email} · {form.phone}</div>
          </div>
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="section-label">Barbers ({form.barbers.length})</div>
            {form.barbers.map((b,i)=>(
              <div key={i} style={{ fontSize: 13, padding: "6px 0", borderBottom: i<form.barbers.length-1?`1px solid ${P.border}`:"none" }}>
                <span style={{ fontWeight: 500 }}>{b.name}</span>
                {b.specialty.length>0 && <span style={{ color: P.muted }}> · {b.specialty.join(", ")}</span>}
              </div>
            ))}
          </div>
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="section-label">Services ({form.services.length})</div>
            {form.services.map((s,i)=>(
              <div key={i} style={{ display:"flex",justifyContent:"space-between",fontSize:13,padding:"6px 0",borderBottom:i<form.services.length-1?`1px solid ${P.border}`:"none" }}>
                <span>{s.name} <span style={{color:P.muted}}>({s.duration} min)</span></span>
                <span style={{ color: P.gold, fontWeight: 500 }}>€{s.price}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="section-label">Calendar</div>
            <div style={{ fontSize: 13, color: P.muted }}>{CALENDAR_SYSTEMS.find(c=>c.id===form.calendarSystem)?.label || "—"}{form.calendlyUrl?` · ${form.calendlyUrl}`:""}</div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 12 }}>
              <input type="checkbox" checked={form.agreeTerms} onChange={e=>u("agreeTerms",e.target.checked)} style={{ width:"auto",marginTop:2 }}/>
              <span style={{ fontSize: 13, color: P.muted }}>I agree to BarberBook's <span style={{ color: P.gold }}>Terms of Service</span> and <span style={{ color: P.gold }}>Partner Agreement</span>. I confirm all information is accurate.</span>
            </label>
            {errors.agreeTerms && <div className="error">{errors.agreeTerms}</div>}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={form.agreeComms} onChange={e=>u("agreeComms",e.target.checked)} style={{ width:"auto",marginTop:2 }}/>
              <span style={{ fontSize: 13, color: P.muted }}>I'd like to receive updates about new features and promotions from BarberBook</span>
            </label>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="ghost-btn" onClick={back}>← Back</button>
            <button className="gold-btn" style={{ flex: 1 }} onClick={() => { if(validate()) onSubmit(form); }}>
              Submit Application →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SUCCESS PAGE ─────────────────────────────────────────────────────────────
function SuccessPage({ shopName }) {
  return (
    <div className="fade-in" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto", padding: "40px 0" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(200,169,126,0.15)", border: `2px solid ${P.gold}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 32 }}>✓</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 600, marginBottom: 10 }}>Application Submitted!</div>
      <div style={{ fontSize: 14, color: P.muted, marginBottom: 28, lineHeight: 1.7 }}>
        Thanks for applying to BarberBook. We'll review <strong style={{ color: P.text }}>{shopName}</strong>'s listing within 24 hours and send a confirmation to your email when you're live.
      </div>
      <div className="card" style={{ textAlign: "left", marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: P.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 14 }}>What happens next</div>
        {[
          { icon: "📧", text: "You'll receive a confirmation email within the hour" },
          { icon: "👀", text: "Our team reviews your listing within 24 hours" },
          { icon: "✅", text: "Once approved, your shop goes live on BarberBook" },
          { icon: "📅", text: "We'll help you connect your calendar if needed" },
          { icon: "💰", text: "You'll be charged nothing until your first booking" },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
            <span>{icon}</span>
            <span style={{ fontSize: 13, color: P.muted }}>{text}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: P.muted }}>Questions? Email us at <span style={{ color: P.gold }}>barbers@barberbook.ie</span></div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel() {
  const [apps, setApps] = useState(MOCK_APPLICATIONS);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  if (!authed) return (
    <div style={{ maxWidth: 360, margin: "60px auto", textAlign: "center" }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Admin Access</div>
      <div style={{ fontSize: 13, color: P.muted, marginBottom: 24 }}>BarberBook team only</div>
      <div className="input-group">
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" onKeyDown={e => { if(e.key==="Enter"&&password==="barberbook2026") setAuthed(true); }}/>
      </div>
      <button className="gold-btn" style={{ width: "100%" }} onClick={() => { if(password==="barberbook2026") setAuthed(true); }}>Login →</button>
      <div style={{ fontSize: 11, color: P.muted, marginTop: 12 }}>Demo password: barberbook2026</div>
    </div>
  );

  const update = (id, status) => {
    setApps(a => a.map(app => app.id === id ? { ...app, status } : app));
    if (selected?.id === id) setSelected(s => ({ ...s, status }));
  };

  const filtered = apps.filter(a => filter === "all" || a.status === filter);

  return (
    <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: 20 }}>
      {/* List */}
      <div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Applications</div>
        <div style={{ fontSize: 13, color: P.muted, marginBottom: 16 }}>{apps.filter(a=>a.status==="pending").length} pending review</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {["all","pending","approved","rejected"].map(f=>(
            <button key={f} style={{ background:filter===f?P.card:P.surface, border:`1px solid ${filter===f?P.gold:P.border}`, color:filter===f?P.gold:P.muted, borderRadius:20, padding:"5px 14px", fontSize:12, cursor:"pointer", textTransform:"capitalize" }} onClick={()=>setFilter(f)}>
              {f} ({apps.filter(a=>f==="all"||a.status===f).length})
            </button>
          ))}
        </div>
        {filtered.map(app => (
          <div key={app.id} className="admin-card" onClick={() => setSelected(app)} style={{ cursor: "pointer", borderColor: selected?.id===app.id?P.gold:P.border }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{app.shopName}</div>
                <div style={{ fontSize: 12, color: P.muted }}>{app.ownerName} · {app.area}</div>
              </div>
              <span className={`status-badge status-${app.status}`}>● {app.status}</span>
            </div>
            <div style={{ fontSize: 12, color: P.muted }}>{app.barbers.length} barbers · {app.services.length} services · {app.calendarSystem}</div>
            <div style={{ fontSize: 11, color: P.muted, marginTop: 4 }}>Submitted {app.submittedAt}</div>
          </div>
        ))}
      </div>

      {/* Detail */}
      {selected && (
        <div className="fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 500, fontSize: 16 }}>{selected.shopName}</div>
            <button onClick={() => setSelected(null)} style={{ background: "none", border: `1px solid ${P.border}`, color: P.muted, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}>✕ Close</button>
          </div>
          <div className="card" style={{ marginBottom: 10 }}>
            <div className="section-label">Contact</div>
            <div style={{ fontSize: 13, color: P.muted, lineHeight: 1.9 }}>
              <div>{selected.ownerName}</div>
              <div>{selected.email}</div>
              <div>{selected.phone}</div>
              <div>{selected.address}</div>
            </div>
          </div>
          <div className="card" style={{ marginBottom: 10 }}>
            <div className="section-label">Barbers</div>
            {selected.barbers.map((b,i)=>(
              <div key={i} style={{ fontSize: 13, padding: "5px 0", borderBottom: i<selected.barbers.length-1?`1px solid ${P.border}`:"none" }}>
                <span style={{ fontWeight: 500 }}>{b.name}</span> · <span style={{ color: P.muted }}>{b.specialty}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginBottom: 10 }}>
            <div className="section-label">Services</div>
            {selected.services.map((s,i)=>(
              <div key={i} style={{ display:"flex",justifyContent:"space-between",fontSize:13,padding:"5px 0",borderBottom:i<selected.services.length-1?`1px solid ${P.border}`:"none" }}>
                <span>{s.name} <span style={{ color: P.muted }}>({s.duration}min)</span></span>
                <span style={{ color: P.gold }}>€{s.price}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-label">Calendar & Hours</div>
            <div style={{ fontSize: 13, color: P.muted }}>{selected.calendarSystem}{selected.calendlyUrl?` · ${selected.calendlyUrl}`:""}</div>
            <div style={{ fontSize: 13, color: P.muted, marginTop: 4 }}>{selected.openingHours}</div>
            {selected.experience && <div style={{ fontSize: 13, color: P.muted, marginTop: 8, fontStyle: "italic" }}>"{selected.experience}"</div>}
          </div>
          {selected.status === "pending" && (
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => update(selected.id, "rejected")}
                style={{ flex: 1, background: "rgba(239,83,80,0.1)", border: "1px solid #EF5350", color: "#EF5350", borderRadius: 8, padding: "12px 0", fontSize: 14, cursor: "pointer" }}>
                ✕ Reject
              </button>
              <button onClick={() => update(selected.id, "approved")}
                style={{ flex: 2, background: P.gold, border: "none", color: "#0A0A0A", borderRadius: 8, padding: "12px 0", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                ✓ Approve & Go Live
              </button>
            </div>
          )}
          {selected.status === "approved" && (
            <div style={{ background: "rgba(76,175,80,0.08)", border: "1px solid #4CAF50", borderRadius: 10, padding: 16, fontSize: 13, color: "#4CAF50", textAlign: "center" }}>
              ✓ This shop is live on BarberBook
            </div>
          )}
          {selected.status === "rejected" && (
            <button onClick={() => update(selected.id, "pending")}
              style={{ width: "100%", background: "none", border: `1px solid ${P.border}`, color: P.muted, borderRadius: 8, padding: "10px 0", fontSize: 13, cursor: "pointer" }}>
              Reconsider Application
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function BarberOnboard() {
  const [view, setView] = useState("join"); // "join" | "success" | "admin"
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = (form) => {
    setSubmittedName(form.shopName);
    setView("success");
    // TODO: POST to Supabase → await supabase.from('applications').insert(form)
    console.log("Application submitted:", form);
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: P.bg }}>
        {/* Header */}
        <header style={{ borderBottom: `1px solid ${P.border}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100, background: `${P.bg}EE`, backdropFilter: "blur(12px)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", height: 60 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <span style={{ color: P.gold, fontSize: 22 }}>✂</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 20 }}>Barber<span style={{ color: P.gold }}>Book</span></span>
              <span style={{ fontSize: 11, color: P.muted, marginLeft: 4 }}>· Partner Portal</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setView("join")} style={{ background: view==="join"?P.card:"none", border: `1px solid ${view==="join"?P.gold:P.border}`, color: view==="join"?P.gold:P.muted, borderRadius: 20, padding: "6px 16px", fontSize: 13, cursor: "pointer" }}>
                Join as Barber
              </button>
              <button onClick={() => setView("admin")} style={{ background: view==="admin"?P.card:"none", border: `1px solid ${view==="admin"?P.gold:P.border}`, color: view==="admin"?P.gold:P.muted, borderRadius: 20, padding: "6px 16px", fontSize: 13, cursor: "pointer" }}>
                Admin
              </button>
            </div>
          </div>
        </header>

        {/* Hero — only on join page */}
        {view === "join" && (
          <div style={{ background: `linear-gradient(180deg, ${P.surface} 0%, ${P.bg} 100%)`, borderBottom: `1px solid ${P.border}`, padding: "48px 24px 40px", textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: P.gold, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500, marginBottom: 12 }}>For Barbershops</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, marginBottom: 10, lineHeight: 1.2 }}>
              Grow your bookings.<br/>Zero upfront cost.
            </div>
            <div style={{ fontSize: 14, color: P.muted, maxWidth: 460, margin: "0 auto 24px", lineHeight: 1.7 }}>
              Join Dublin's fastest-growing barbershop platform. Real-time calendar sync, instant payments, and customers who book before they walk in the door.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
              {["Free to list","Live calendar sync","Instant payouts","No monthly fee"].map(f => (
                <div key={f} style={{ fontSize: 13, color: P.muted }}><span style={{ color: P.gold }}>✓</span> {f}</div>
              ))}
            </div>
          </div>
        )}

        {/* Main */}
        <main style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px 60px" }}>
          {view === "join" && <OnboardForm onSubmit={handleSubmit} />}
          {view === "success" && <SuccessPage shopName={submittedName} />}
          {view === "admin" && <AdminPanel />}
        </main>
      </div>
    </>
  );
}
