import { useState, useEffect } from "react";

// ─── REAL DUBLIN DATA ────────────────────────────────────────────────────────
const SHOPS = [
  {
    id: "fireplace",
    name: "The Fireplace Barbershop",
    address: "27 South William Street, Dublin 2, D02 RP86",
    phone: "+353 1 679 8322",
    website: "thefireplacebarbershop.com",
    calendarSystem: "calendly",
    lat: 53.3418,
    lng: -6.2628,
    rating: 4.9,
    reviews: 412,
    priceRange: "€€",
    tags: ["Hot Towel Shave", "Beard Work", "Classic Cuts"],
    hours: "Tue–Wed 10:30–19:30 · Thu–Fri 10:30–21:00 · Sat 9:00–18:00 · Sun 12:00–18:00 · Mon Closed",
    color: "#C8A97E",
    initials: "FB",
    about: "Tucked away on South William Street, The Fireplace is Dublin's most atmospheric barbershop. Complimentary coffee or craft beer on arrival. Real men's barbering since 2015.",
    barbers: [
      { id: "luke", name: "Luke Delaney", role: "Co-founder & Master Barber", specialty: "Classic Cuts & Hot Towel Shave", experience: "10+ years", rating: 5.0, reviews: 189, priceFrom: 35, avatar: "LD", color: "#C8A97E",
        services: [
          { id: 1, name: "Classic Cut", duration: 30, price: 35 },
          { id: 2, name: "Skin Fade", duration: 45, price: 40 },
          { id: 3, name: "Hot Towel Shave", duration: 40, price: 38 },
          { id: 4, name: "Cut & Beard", duration: 60, price: 55 },
          { id: 5, name: "Restyle", duration: 60, price: 45 },
        ],
        slots: { "2026-05-21": ["10:30","11:30","13:00","14:30","16:00","18:00"], "2026-05-22": ["10:30","12:00","14:00","15:30","17:00","19:00"], "2026-05-23": ["11:00","13:00","14:30","16:00","18:30"], "2026-05-24": ["09:00","10:00","11:30","14:00","16:00"] }
      },
      { id: "fabian", name: "Fabian Posca", role: "Co-founder & Barber", specialty: "Fades & Beard Sculpting", experience: "10+ years", rating: 4.9, reviews: 156, priceFrom: 35, avatar: "FP", color: "#A07850",
        services: [
          { id: 1, name: "Classic Cut", duration: 30, price: 35 },
          { id: 2, name: "Skin Fade", duration: 45, price: 40 },
          { id: 3, name: "Beard Trim", duration: 20, price: 22 },
          { id: 4, name: "Cut & Beard", duration: 60, price: 55 },
        ],
        slots: { "2026-05-21": ["11:00","12:30","14:00","16:30","18:30"], "2026-05-22": ["10:30","13:00","15:00","17:30","19:00"], "2026-05-23": ["10:30","12:00","14:00","16:00","18:00"], "2026-05-24": ["09:30","11:00","13:00","15:30"] }
      },
      { id: "dylan", name: "Dylan", role: "Senior Barber", specialty: "Contemporary Styles", experience: "5+ years", rating: 4.9, reviews: 98, priceFrom: 32, avatar: "DY", color: "#8B6840",
        services: [
          { id: 1, name: "Classic Cut", duration: 30, price: 32 },
          { id: 2, name: "Skin Fade", duration: 45, price: 38 },
          { id: 3, name: "Beard Trim", duration: 20, price: 20 },
          { id: 4, name: "Kids Cut", duration: 20, price: 22 },
        ],
        slots: { "2026-05-20": ["11:00","12:00","14:30","16:00","18:00"], "2026-05-21": ["10:30","12:00","14:00","16:00","18:30"], "2026-05-22": ["11:00","13:30","15:00","17:00"], "2026-05-23": ["10:30","12:00","14:30","16:30","18:00"] }
      },
      { id: "jack", name: "Jack", role: "Master Barber", specialty: "Beard Mastery", experience: "8+ years", rating: 5.0, reviews: 203, priceFrom: 35, avatar: "JK", color: "#C8A97E",
        services: [
          { id: 1, name: "Classic Cut", duration: 30, price: 35 },
          { id: 2, name: "Hot Towel Shave", duration: 40, price: 38 },
          { id: 3, name: "Beard Design", duration: 30, price: 28 },
          { id: 4, name: "Full Groom", duration: 75, price: 65 },
        ],
        slots: { "2026-05-20": ["10:30","12:00","14:00","16:00","18:00"], "2026-05-21": ["11:30","13:00","15:30","17:00"], "2026-05-22": ["10:30","12:30","14:00","16:30","18:30"], "2026-05-23": ["11:00","13:00","15:00","17:30"] }
      },
    ]
  },
  {
    id: "grafton",
    name: "The Grafton Barber",
    address: "51 Grafton Street, Dublin 2, D02 K635",
    phone: "+353 1 679 6984",
    website: "graftonbarbers.com",
    lat: 53.3404,
    lng: -6.2591,
    rating: 4.8,
    reviews: 36,
    priceRange: "€€€",
    tags: ["Open Razor Shave", "Colouring", "Walk-ins Welcome"],
    hours: "Mon–Wed 9:00–18:00 · Thu 9:00–19:30 · Fri 9:00–18:00 · Sat 9:00–18:00 · Sun 11:00–17:00",
    color: "#2C5F8A",
    initials: "GB",
    about: "Ireland's most iconic barbershop chain, established 1961. The flagship Grafton Street store offers premier service with complimentary tea, coffee or ice-cold beer. Celebrity clientele includes Conor McGregor and Johnny Depp.",
    barbers: [
      { id: "johnny", name: "Johnny", role: "Flagship Manager", specialty: "Razor Shaving & Colouring", experience: "12+ years", rating: 4.9, reviews: 142, priceFrom: 30, avatar: "JO", color: "#2C5F8A",
        services: [
          { id: 1, name: "Classic Cut", duration: 30, price: 30 },
          { id: 2, name: "Skin Fade", duration: 30, price: 32 },
          { id: 3, name: "Open Razor Shave", duration: 45, price: 37 },
          { id: 4, name: "Cut & Shave", duration: 60, price: 60 },
          { id: 5, name: "Colour & Cut", duration: 75, price: 75 },
        ],
        slots: { "2026-05-20": ["09:00","10:00","11:30","13:00","14:30","16:00"], "2026-05-21": ["09:00","10:30","12:00","14:00","15:30","17:00"], "2026-05-22": ["09:00","11:00","13:00","14:30","16:00"], "2026-05-23": ["09:30","11:00","13:30","15:00","17:00"] }
      },
      { id: "sean", name: "Seán", role: "Senior Barber", specialty: "Fades & Modern Styles", experience: "7+ years", rating: 4.8, reviews: 89, priceFrom: 30, avatar: "SN", color: "#1A4A6E",
        services: [
          { id: 1, name: "Classic Cut", duration: 30, price: 30 },
          { id: 2, name: "Skin Fade", duration: 30, price: 32 },
          { id: 3, name: "Beard Trim", duration: 15, price: 15 },
          { id: 4, name: "Student Cut", duration: 30, price: 16 },
        ],
        slots: { "2026-05-20": ["09:00","10:30","12:00","13:30","15:00","17:00"], "2026-05-21": ["09:30","11:00","13:00","14:30","16:00"], "2026-05-22": ["09:00","10:30","12:30","14:00","16:30"], "2026-05-23": ["09:00","10:30","13:00","15:30","17:00"] }
      },
    ]
  },
  {
    id: "area9",
    name: "Area9 Barbers",
    address: "9 Store Street, Dublin 1, D01 C9X2",
    phone: "+353 85 777 2977",
    website: "area9.ie",
    calendarSystem: "google",
    lat: 53.3497,
    lng: -6.2513,
    rating: 4.6,
    reviews: 99,
    priceRange: "€€",
    tags: ["Traditional Barbering", "Contemporary Styles", "Own Products"],
    hours: "Mon–Sat 9:00–19:00 · Sun Closed",
    color: "#2E7D4F",
    initials: "A9",
    about: "Run by Ciaran Foley and Paddy Corrigan, Area9 blends traditional barbering with contemporary hairdressing. Two minutes from Connolly Station. Known for friendly staff and their own line of male grooming products.",
    barbers: [
      { id: "ciaran", name: "Ciarán Foley", role: "Co-owner & Barber", specialty: "Traditional & Contemporary", experience: "15+ years", rating: 4.7, reviews: 167, priceFrom: 25, avatar: "CF", color: "#2E7D4F",
        services: [
          { id: 1, name: "Classic Cut", duration: 30, price: 25 },
          { id: 2, name: "Skin Fade", duration: 40, price: 30 },
          { id: 3, name: "Beard Trim", duration: 20, price: 18 },
          { id: 4, name: "Cut & Beard", duration: 50, price: 40 },
          { id: 5, name: "Kids Cut", duration: 20, price: 18 },
        ],
        slots: { "2026-05-20": ["09:00","10:30","12:00","14:00","16:00","18:00"], "2026-05-21": ["09:30","11:00","13:00","15:00","17:00"], "2026-05-22": ["09:00","10:30","12:30","14:00","16:30","18:30"], "2026-05-23": ["09:00","11:00","13:30","16:00"] }
      },
      { id: "paddy", name: "Paddy Corrigan", role: "Co-owner & Barber", specialty: "Modern Fades & Textures", experience: "15+ years", rating: 4.8, reviews: 143, priceFrom: 25, avatar: "PC", color: "#1B5E38",
        services: [
          { id: 1, name: "Classic Cut", duration: 30, price: 25 },
          { id: 2, name: "Skin Fade", duration: 40, price: 30 },
          { id: 3, name: "Hot Towel Shave", duration: 35, price: 28 },
          { id: 4, name: "Full Groom", duration: 65, price: 50 },
        ],
        slots: { "2026-05-20": ["09:00","11:00","13:00","15:30","17:30"], "2026-05-21": ["09:30","11:30","13:30","16:00","18:00"], "2026-05-22": ["09:00","11:00","14:00","16:00","18:30"], "2026-05-23": ["09:30","12:00","14:30","17:00"] }
      },
    ]
  },
  {
    id: "blackbeard",
    name: "Blackbeard Barbershop",
    address: "Unit 9 James Joyce Street, Dublin 1, D01 K7N1",
    phone: "+353 83 088 2425",
    website: "blackbearddublin.ie",
    calendarSystem: "resurva",
    resurvaUrl: "https://app.resurva.com/book/blackbeard-dublin",
    lat: 53.3512,
    lng: -6.2560,
    rating: 4.9,
    reviews: 1583,
    priceRange: "€€",
    tags: ["Highly Rated", "Fades", "Beard Trim"],
    hours: "Mon–Sat 9:00–20:00 · Sun 11:00–17:00",
    color: "#1A1A2E",
    initials: "BB",
    about: "One of Dublin's highest-rated barbershops with over 1,500 five-star reviews. Known for precision fades and immaculate beard work. A firm favourite in the north inner city.",
    barbers: [
      { id: "bb-luan", name: "Luan", role: "Head Barber", specialty: "Precision Fades", experience: "8+ years", rating: 5.0, reviews: 341, priceFrom: 28, avatar: "LN", color: "#4A4A6E",
        services: [
          { id: 1, name: "Classic Cut", duration: 30, price: 28 },
          { id: 2, name: "Skin Fade", duration: 40, price: 33 },
          { id: 3, name: "Beard Trim", duration: 20, price: 20 },
          { id: 4, name: "Cut & Beard", duration: 55, price: 45 },
          { id: 5, name: "Head Shave", duration: 30, price: 25 },
        ],
        slots: {}
      },
      { id: "bb-rob", name: "Rob", role: "Senior Barber", specialty: "Texture & Style", experience: "6+ years", rating: 4.9, reviews: 189, priceFrom: 26, avatar: "RB", color: "#2A2A4E",
        services: [
          { id: 1, name: "Classic Cut", duration: 30, price: 26 },
          { id: 2, name: "Skin Fade", duration: 40, price: 30 },
          { id: 3, name: "Beard Trim", duration: 20, price: 18 },
          { id: 4, name: "Hot Towel Shave", duration: 35, price: 28 },
        ],
        slots: {}
      },
    ]
  },
];

const P = {
  bg: "#0A0A0A", surface: "#141414", card: "#1C1C1C",
  border: "#2A2A2A", gold: "#C8A97E", goldLight: "#E2C9A0",
  text: "#F0EDE8", muted: "#777", accent: "#C8A97E",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${P.bg};color:${P.text};font-family:'DM Sans',sans-serif;min-height:100vh;}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:${P.surface};}::-webkit-scrollbar-thumb{background:${P.border};border-radius:2px;}
  input,select,textarea{background:${P.card};border:1px solid ${P.border};color:${P.text};border-radius:8px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:14px;width:100%;outline:none;transition:border-color 0.2s;}
  input:focus,select:focus,textarea:focus{border-color:${P.gold};}
  input::placeholder,textarea::placeholder{color:${P.muted};}
  button{cursor:pointer;font-family:'DM Sans',sans-serif;}
  .gold-btn{background:${P.gold};color:#0A0A0A;border:none;border-radius:8px;padding:12px 24px;font-weight:500;font-size:14px;transition:all 0.2s;}
  .gold-btn:hover{background:${P.goldLight};transform:translateY(-1px);}
  .gold-btn:disabled{opacity:0.4;cursor:not-allowed;transform:none;}
  .ghost-btn{background:transparent;color:${P.gold};border:1px solid ${P.gold};border-radius:8px;padding:10px 20px;font-size:14px;transition:all 0.2s;}
  .ghost-btn:hover{background:rgba(200,169,126,0.1);}
  .card{background:${P.card};border:1px solid ${P.border};border-radius:16px;padding:24px;}
  .nav-link{color:${P.muted};background:none;border:none;font-size:13px;padding:8px 16px;border-radius:20px;transition:all 0.2s;}
  .nav-link:hover,.nav-link.active{color:${P.text};background:${P.card};}
  .tag{display:inline-block;background:rgba(200,169,126,0.12);color:${P.gold};border-radius:4px;padding:2px 8px;font-size:11px;font-weight:500;}
  .star{color:${P.gold};font-size:13px;}
  .chip{background:${P.surface};border:1px solid ${P.border};color:${P.muted};border-radius:20px;padding:6px 16px;font-size:13px;cursor:pointer;transition:all 0.2s;}
  .chip.selected{border-color:${P.gold};color:${P.gold};background:rgba(200,169,126,0.08);}
  .slot-btn{background:${P.surface};border:1px solid ${P.border};color:${P.text};border-radius:8px;padding:8px 14px;font-size:13px;transition:all 0.2s;cursor:pointer;}
  .slot-btn:hover{border-color:${P.gold};color:${P.gold};}
  .slot-btn.selected{background:${P.gold};color:#0A0A0A;border-color:${P.gold};font-weight:500;}
  .cal-day{background:${P.surface};border:1px solid ${P.border};border-radius:8px;padding:10px 8px;text-align:center;cursor:pointer;transition:all 0.2s;min-width:42px;}
  .cal-day:hover{border-color:${P.gold};}
  .cal-day.selected{background:${P.gold};border-color:${P.gold};color:#0A0A0A;}
  .cal-day.today{border-color:rgba(200,169,126,0.5);}
  .cal-day.empty{background:transparent;border-color:transparent;cursor:default;}
  .cal-day.disabled{opacity:0.25;cursor:not-allowed;}
  .svc-card{background:${P.surface};border:1px solid ${P.border};border-radius:12px;padding:16px;cursor:pointer;transition:all 0.2s;}
  .svc-card:hover{border-color:${P.gold};}
  .svc-card.selected{border-color:${P.gold};background:rgba(200,169,126,0.06);}
  .shop-card{background:${P.card};border:1px solid ${P.border};border-radius:16px;overflow:hidden;cursor:pointer;transition:all 0.25s;}
  .shop-card:hover{border-color:${P.gold};transform:translateY(-2px);box-shadow:0 8px 32px rgba(200,169,126,0.08);}
  .shop-card.selected{border-color:${P.gold};box-shadow:0 0 0 1px ${P.gold};}
  .barber-card{background:${P.surface};border:1px solid ${P.border};border-radius:12px;cursor:pointer;transition:all 0.25s;padding:16px;}
  .barber-card:hover{border-color:${P.gold};}
  .barber-card.selected{border-color:${P.gold};background:rgba(200,169,126,0.04);}
  .progress-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;flex-shrink:0;transition:all 0.3s;}
  .progress-dot.done{background:${P.gold};color:#0A0A0A;}
  .progress-dot.active{background:rgba(200,169,126,0.2);color:${P.gold};border:1px solid ${P.gold};}
  .progress-dot.pending{background:${P.surface};color:${P.muted};border:1px solid ${P.border};}
  .progress-line{width:24px;height:1px;background:${P.border};flex-shrink:0;}
  .progress-line.done{background:${P.gold};}
  @keyframes fadeIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
  .fade-in{animation:fadeIn 0.3s ease forwards;}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
  .pulse{animation:pulse 2s infinite;}
  .section-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:600;margin-bottom:4px;}
  .section-sub{font-size:13px;color:${P.muted};margin-bottom:24px;}
  .input-group{margin-bottom:16px;}
  .input-group label{display:block;font-size:12px;color:${P.muted};margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em;}
  .notification{position:fixed;top:76px;right:24px;background:${P.card};border:1px solid ${P.gold};border-radius:12px;padding:14px 20px;font-size:13px;z-index:999;display:flex;align-items:center;gap:10px;animation:fadeIn 0.3s ease;box-shadow:0 8px 32px rgba(0,0,0,0.4);}
  .back-btn{background:none;border:1px solid ${P.border};color:${P.muted};border-radius:8px;padding:7px 14px;font-size:13px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:6px;}
  .back-btn:hover{border-color:${P.gold};color:${P.gold};}
  .map-frame{border-radius:16px;overflow:hidden;border:1px solid ${P.border};}
  .avatar{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;flex-shrink:0;}
  .breadcrumb{display:flex;align-items:center;gap:8px;font-size:12px;color:${P.muted};margin-bottom:20px;flex-wrap:wrap;}
  .breadcrumb span{color:${P.text};}
  .breadcrumb .sep{color:${P.border};}
  .check-circle{width:80px;height:80px;border-radius:50%;background:rgba(200,169,126,0.15);border:2px solid ${P.gold};display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:32px;}
`;

function Stars({ rating, small }) {
  return <span>{[1,2,3,4,5].map(i=><span key={i} className="star" style={small?{fontSize:11}:{}}>{i<=Math.round(rating)?"★":"☆"}</span>)}</span>;
}

function Av({ initials, color, size=44 }) {
  return <div className="avatar" style={{width:size,height:size,background:color+"22",color,fontSize:size*0.3}}>{initials}</div>;
}

function Notification({ msg, onClose }) {
  useEffect(()=>{const t=setTimeout(onClose,3500);return()=>clearTimeout(t);},[]);
  return <div className="notification"><span style={{color:P.gold,fontSize:18}}>✓</span><span>{msg}</span></div>;
}

function MapEmbed({ shop }) {
  const query = encodeURIComponent(shop ? shop.address : "Dublin City Centre, Ireland");
  return (
    <div className="map-frame" style={{height:300}}>
      <iframe
        title={shop ? shop.name : "Dublin map"}
        width="100%" height="300" style={{border:0,display:"block"}}
        loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${query}&zoom=15&maptype=roadmap`}
      />
    </div>
  );
}

function CalWidget({ barber, selectedDate, onSelectDate }) {
  const days = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const [vm, setVm] = useState({year:2026,month:4});
  const {year,month} = vm;
  const firstDay = new Date(year,month,1).getDay();
  const daysInMonth = new Date(year,month+1,0).getDate();
  const monthName = new Date(year,month,1).toLocaleString("default",{month:"long"});
  const hasSlots = d => barber?.slots?.[`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`]?.length>0;
  const toKey = d => `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const today = new Date(2026,4,19);
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <button onClick={()=>{const d=new Date(year,month-1,1);setVm({year:d.getFullYear(),month:d.getMonth()});}} style={{background:"none",border:`1px solid ${P.border}`,color:P.muted,borderRadius:6,width:30,height:30,cursor:"pointer",fontSize:14}}>‹</button>
        <span style={{fontSize:14,fontWeight:500}}>{monthName} {year}</span>
        <button onClick={()=>{const d=new Date(year,month+1,1);setVm({year:d.getFullYear(),month:d.getMonth()});}} style={{background:"none",border:`1px solid ${P.border}`,color:P.muted,borderRadius:6,width:30,height:30,cursor:"pointer",fontSize:14}}>›</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:6}}>
        {days.map(d=><div key={d} style={{textAlign:"center",fontSize:11,color:P.muted,padding:"4px 0"}}>{d}</div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
        {Array(firstDay).fill(null).map((_,i)=><div key={`e${i}`} className="cal-day empty"/>)}
        {Array(daysInMonth).fill(null).map((_,i)=>{
          const day=i+1; const key=toKey(day);
          const isSelected=selectedDate===key;
          const isPast=new Date(year,month,day)<today;
          const has=hasSlots(day);
          return (
            <div key={day} className={`cal-day${isSelected?" selected":""}${isPast||!has?" disabled":""}`}
              onClick={()=>{ if(!isPast&&has) onSelectDate(key); }}>
              <div style={{fontSize:13}}>{day}</div>
              {has&&!isSelected&&<div style={{width:4,height:4,background:P.gold,borderRadius:"50%",margin:"2px auto 0"}}/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── FIND PAGE ────────────────────────────────────────────────────────────────
function FindPage({ onSelectShop, onSelectBarber }) {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("shops"); // "shops" | "barbers"
  const [filter, setFilter] = useState("All");

  const allBarbers = SHOPS.flatMap(s => s.barbers.map(b => ({...b, shop: s})));

  const filteredShops = SHOPS.filter(s => {
    if (!search) return true;
    return s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
  });

  const filteredBarbers = allBarbers.filter(b => {
    if (!search) return true;
    return b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.specialty.toLowerCase().includes(search.toLowerCase()) ||
      b.shop.name.toLowerCase().includes(search.toLowerCase());
  }).filter(b => {
    if (filter === "Top Rated") return b.rating >= 4.9;
    if (filter === "Budget") return b.priceFrom <= 26;
    return true;
  });

  return (
    <div className="fade-in">
      <div className="section-title">Find a Barber</div>
      <div className="section-sub">Real barbershops across Dublin — search by shop or barber</div>

      <div style={{position:"relative",marginBottom:12}}>
        <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:P.muted,fontSize:16}}>⌕</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search shops, barbers, or styles..." style={{paddingLeft:36}}/>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{display:"flex",background:P.surface,borderRadius:20,border:`1px solid ${P.border}`,padding:3,gap:2}}>
          {["shops","barbers"].map(m=>(
            <button key={m} onClick={()=>{setMode(m);setFilter("All");}}
              style={{background:mode===m?P.card:"transparent",border:"none",color:mode===m?P.text:P.muted,borderRadius:16,padding:"6px 16px",fontSize:13,cursor:"pointer",transition:"all 0.2s",textTransform:"capitalize"}}>
              {m==="shops"?"🏪 Shops":"✂ Barbers"}
            </button>
          ))}
        </div>
        {mode==="barbers" && ["All","Top Rated","Budget"].map(f=>(
          <button key={f} className={`chip${filter===f?" selected":""}`} onClick={()=>setFilter(f)}>{f}</button>
        ))}
      </div>

      {mode==="shops" && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {filteredShops.map(shop=>(
            <div key={shop.id} className="shop-card" onClick={()=>onSelectShop(shop)} style={{padding:20}}>
              <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                <Av initials={shop.initials} color={shop.color} size={52}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                    <span style={{fontWeight:500,fontSize:15}}>{shop.name}</span>
                    <span style={{fontSize:12,color:P.muted}}>{shop.priceRange}</span>
                  </div>
                  <div style={{fontSize:12,color:P.muted,marginBottom:8}}>{shop.address}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <Stars rating={shop.rating} small/>
                    <span style={{fontSize:11,color:P.muted}}>{shop.rating} ({shop.reviews} reviews)</span>
                    <span style={{fontSize:11,color:P.muted}}>·</span>
                    <span style={{fontSize:11,color:P.muted}}>{shop.barbers.length} barbers</span>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:10}}>
                    {shop.tags.map(t=><span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{color:P.gold,fontWeight:500,fontSize:13}}>from €{Math.min(...shop.barbers.map(b=>b.priceFrom))}</div>
                  <div style={{fontSize:11,color:P.muted,marginBottom:8}}>per cut</div>
                  <button className="gold-btn" style={{padding:"8px 14px",fontSize:12}} onClick={e=>{e.stopPropagation();onSelectShop(shop);}}>View Shop →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {mode==="barbers" && (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filteredBarbers.map(b=>(
            <div key={b.id+b.shop.id} className="barber-card" onClick={()=>onSelectBarber(b, b.shop)}>
              <div style={{display:"flex",gap:14,alignItems:"center"}}>
                <Av initials={b.avatar} color={b.color} size={46}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:500,fontSize:14,marginBottom:2}}>{b.name}</div>
                  <div style={{fontSize:12,color:P.gold,marginBottom:4}}>{b.shop.name}</div>
                  <div style={{fontSize:12,color:P.muted}}>{b.specialty} · {b.experience}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}}>
                    <Stars rating={b.rating} small/>
                    <span style={{fontSize:11,color:P.muted}}>{b.rating} ({b.reviews})</span>
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{color:P.gold,fontWeight:600,fontSize:18}}>€{b.priceFrom}</div>
                  <div style={{fontSize:11,color:P.muted,marginBottom:8}}>from</div>
                  <button className="gold-btn" style={{padding:"7px 14px",fontSize:12}} onClick={e=>{e.stopPropagation();onSelectBarber(b,b.shop);}}>Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SHOP PAGE ────────────────────────────────────────────────────────────────
function ShopPage({ shop, onBack, onSelectBarber }) {
  const [tab, setTab] = useState("barbers");
  return (
    <div className="fade-in">
      <div className="breadcrumb">
        <button className="back-btn" onClick={onBack}>← Find</button>
        <span className="sep">›</span>
        <span>{shop.name}</span>
      </div>

      {/* Shop header */}
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:"flex",gap:16,alignItems:"flex-start",marginBottom:16}}>
          <Av initials={shop.initials} color={shop.color} size={64}/>
          <div style={{flex:1}}>
            <div style={{fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:600,marginBottom:4}}>{shop.name}</div>
            <div style={{fontSize:13,color:P.muted,marginBottom:6}}>📍 {shop.address}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <Stars rating={shop.rating}/>
              <span style={{fontSize:12,color:P.muted}}>{shop.rating} · {shop.reviews} reviews</span>
              <span className="tag">{shop.priceRange}</span>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {shop.tags.map(t=><span key={t} className="tag">{t}</span>)}
              {shop.calendarSystem==="resurva"&&<span style={{display:"inline-block",background:"rgba(90,120,200,0.12)",color:"#7A9FE0",borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:500}}>✂ Books via Resurva</span>}
              {shop.calendarSystem==="calendly"&&<span style={{display:"inline-block",background:"rgba(0,180,120,0.1)",color:"#00C896",borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:500}}>📅 Live availability</span>}
              {shop.calendarSystem==="google"&&<span style={{display:"inline-block",background:"rgba(66,133,244,0.1)",color:"#4285F4",borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:500}}>🗓 Google Calendar</span>}
            </div>
          </div>
        </div>
        <p style={{fontSize:13,color:P.muted,lineHeight:1.7,marginBottom:14}}>{shop.about}</p>
        <div style={{fontSize:12,color:P.muted}}>🕐 {shop.hours}</div>
        <div style={{fontSize:12,color:P.muted,marginTop:4}}>📞 {shop.phone}</div>
      </div>

      {/* Map */}
      <div style={{marginBottom:16}}>
        <MapEmbed shop={shop}/>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",background:P.surface,borderRadius:12,border:`1px solid ${P.border}`,padding:4,gap:4,marginBottom:20}}>
        {["barbers","info"].map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{flex:1,background:tab===t?P.card:"transparent",border:"none",color:tab===t?P.text:P.muted,borderRadius:8,padding:"9px 0",fontSize:13,cursor:"pointer",transition:"all 0.2s",textTransform:"capitalize"}}>
            {t==="barbers"?`✂ Our ${shop.barbers.length} Barbers`:"ℹ Info & Hours"}
          </button>
        ))}
      </div>

      {tab==="barbers" && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{fontSize:13,color:P.muted,marginBottom:4}}>Select a barber to see availability and book</div>
          {shop.barbers.map(b=>(
            <div key={b.id} className="barber-card" onClick={()=>onSelectBarber(b, shop)}>
              <div style={{display:"flex",gap:14,alignItems:"center"}}>
                <div style={{position:"relative"}}>
                  <Av initials={b.avatar} color={b.color} size={52}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:500,fontSize:15,marginBottom:2}}>{b.name}</div>
                  <div style={{fontSize:12,color:P.gold,marginBottom:4}}>{b.role}</div>
                  <div style={{fontSize:12,color:P.muted,marginBottom:6}}>{b.specialty} · {b.experience}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <Stars rating={b.rating} small/>
                    <span style={{fontSize:11,color:P.muted}}>{b.rating} ({b.reviews} reviews)</span>
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{color:P.gold,fontWeight:600,fontSize:18}}>€{b.priceFrom}</div>
                  <div style={{fontSize:11,color:P.muted,marginBottom:10}}>from</div>
                  <button className="gold-btn" style={{padding:"8px 16px",fontSize:13}} onClick={e=>{e.stopPropagation();onSelectBarber(b,shop);}}>Book →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="info" && (
        <div className="card">
          <div style={{fontSize:12,color:P.gold,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500,marginBottom:16}}>Opening Hours</div>
          <div style={{fontSize:13,color:P.muted,lineHeight:2}}>{shop.hours.split("·").map((h,i)=><div key={i}>{h.trim()}</div>)}</div>
          <hr style={{border:"none",borderTop:`1px solid ${P.border}`,margin:"16px 0"}}/>
          <div style={{fontSize:12,color:P.gold,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500,marginBottom:12}}>Contact</div>
          <div style={{fontSize:13,color:P.muted,marginBottom:6}}>📞 {shop.phone}</div>
          <div style={{fontSize:13,color:P.muted}}>🌐 {shop.website}</div>
        </div>
      )}
    </div>
  );
}

// ─── BARBER PAGE ──────────────────────────────────────────────────────────────
function BarberPage({ barber, shop, onBack, onConfirm }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [notes, setNotes] = useState("");
  const steps = ["Service","Date & Time","Review"];
  const slots = barber.slots?.[date] || [];
  const isResurva = shop.calendarSystem === "resurva";

  // ── Resurva shops: send to their booking page ──────────────────────────────
  if (isResurva) return (
    <div className="fade-in">
      <div className="breadcrumb">
        <button className="back-btn" onClick={()=>onBack("shop")}>← {shop.name}</button>
        <span className="sep">›</span>
        <span>{barber.name}</span>
      </div>
      <div style={{display:"flex",gap:14,alignItems:"center",padding:"14px 18px",background:P.surface,borderRadius:14,border:`1px solid ${P.border}`,marginBottom:24}}>
        <Av initials={barber.avatar} color={barber.color} size={52}/>
        <div style={{flex:1}}>
          <div style={{fontWeight:500,fontSize:15}}>{barber.name}</div>
          <div style={{fontSize:12,color:P.gold}}>{barber.role} · {shop.name}</div>
          <div style={{fontSize:12,color:P.muted,marginTop:2}}>{barber.specialty}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <Stars rating={barber.rating} small/>
          <div style={{fontSize:11,color:P.muted}}>{barber.reviews} reviews</div>
          <div style={{color:P.gold,fontWeight:600,marginTop:4}}>from €{barber.priceFrom}</div>
        </div>
      </div>
      <div className="card" style={{textAlign:"center",padding:"32px 24px"}}>
        <div style={{fontSize:32,marginBottom:16}}>✂</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:600,marginBottom:8}}>Book with {barber.name}</div>
        <div style={{fontSize:13,color:P.muted,lineHeight:1.7,marginBottom:6,maxWidth:380,margin:"0 auto 16px"}}>
          {shop.name} manages bookings through <strong style={{color:P.text}}>Resurva</strong>. Tapping below opens their booking page where you can select your service, date, and time directly.
        </div>
        <div style={{background:P.surface,borderRadius:10,padding:14,marginBottom:20,border:`1px solid ${P.border}`}}>
          <div style={{fontSize:12,color:P.muted,marginBottom:8}}>Services available from €{barber.priceFrom}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>
            {barber.services.map(s=>(
              <span key={s.id} style={{fontSize:12,background:P.card,border:`1px solid ${P.border}`,borderRadius:6,padding:"4px 10px",color:P.muted}}>{s.name} · €{s.price}</span>
            ))}
          </div>
        </div>
        <a href={shop.resurvaUrl || `https://app.resurva.com/book/${shop.id}`} target="_blank" rel="noopener noreferrer"
          style={{display:"inline-block",background:P.gold,color:"#0A0A0A",border:"none",borderRadius:8,padding:"13px 32px",fontWeight:500,fontSize:15,textDecoration:"none",cursor:"pointer",transition:"all 0.2s"}}>
          Book on Resurva →
        </a>
        <div style={{fontSize:11,color:P.muted,marginTop:14}}>
          Opens in a new tab · You'll complete your booking on {shop.name}'s Resurva page
        </div>
      </div>
      <div style={{background:"rgba(200,169,126,0.06)",border:`1px solid rgba(200,169,126,0.15)`,borderRadius:10,padding:14,marginTop:16,fontSize:12,color:P.muted,lineHeight:1.6}}>
        <span style={{color:P.gold,fontWeight:500}}>Note: </span>
        Resurva doesn't yet have a public API. Once they release it, booking {shop.name} will work fully in-app without leaving BarberBook.
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="breadcrumb">
        <button className="back-btn" onClick={()=>onBack("shop")}>← {shop.name}</button>
        <span className="sep">›</span>
        <span>{barber.name}</span>
      </div>

      {/* Barber header */}
      <div style={{display:"flex",gap:14,alignItems:"center",padding:"14px 18px",background:P.surface,borderRadius:14,border:`1px solid ${P.border}`,marginBottom:24}}>
        <Av initials={barber.avatar} color={barber.color} size={52}/>
        <div style={{flex:1}}>
          <div style={{fontWeight:500,fontSize:15}}>{barber.name}</div>
          <div style={{fontSize:12,color:P.gold}}>{barber.role} · {shop.name}</div>
          <div style={{fontSize:12,color:P.muted,marginTop:2}}>{barber.specialty}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <Stars rating={barber.rating} small/>
          <div style={{fontSize:11,color:P.muted}}>{barber.reviews} reviews</div>
          <div style={{color:P.gold,fontWeight:600,marginTop:4}}>from €{barber.priceFrom}</div>
        </div>
      </div>

      {/* Progress */}
      <div style={{display:"flex",alignItems:"center",marginBottom:28}}>
        {steps.map((s,i)=>(
          <div key={s} style={{display:"flex",alignItems:"center"}}>
            <div className={`progress-dot ${i<step?"done":i===step?"active":"pending"}`}>{i<step?"✓":i+1}</div>
            <span style={{fontSize:12,color:i===step?P.text:P.muted,marginLeft:6,marginRight:6}}>{s}</span>
            {i<steps.length-1&&<div className={`progress-line${i<step?" done":""}`}/>}
          </div>
        ))}
      </div>

      {/* Step 0: Service */}
      {step===0&&(
        <div className="fade-in">
          <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>Choose a Service</div>
          <div style={{fontSize:12,color:P.muted,marginBottom:16}}>All services by {barber.name}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
            {barber.services.map(s=>(
              <div key={s.id} className={`svc-card${service?.id===s.id?" selected":""}`} onClick={()=>setService(s)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontWeight:500,fontSize:14}}>{s.name}</div>
                    <div style={{fontSize:12,color:P.muted,marginTop:2}}>{s.duration} min</div>
                  </div>
                  <div style={{color:P.gold,fontWeight:600,fontSize:18}}>€{s.price}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="gold-btn" style={{width:"100%"}} disabled={!service} onClick={()=>setStep(1)}>Continue →</button>
        </div>
      )}

      {/* Step 1: Date & Time */}
      {step===1&&(
        <div className="fade-in">
          <div className="card" style={{marginBottom:16}}>
            <div style={{fontSize:12,color:P.gold,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500,marginBottom:16}}>Pick a Date</div>
            <CalWidget barber={barber} selectedDate={date} onSelectDate={d=>{setDate(d);setSlot("");}}/>
          </div>
          {date&&(
            <div className="card fade-in" style={{marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontSize:12,color:P.gold,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500}}>Available Times</div>
                <div style={{fontSize:11,color:P.muted}}>{slots.length} slots open</div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {slots.map(t=><button key={t} className={`slot-btn${slot===t?" selected":""}`} onClick={()=>setSlot(t)}>{t}</button>)}
              </div>
            </div>
          )}
          <div style={{display:"flex",gap:10}}>
            <button className="ghost-btn" onClick={()=>setStep(0)}>← Back</button>
            <button className="gold-btn" style={{flex:1}} disabled={!date||!slot} onClick={()=>setStep(2)}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 2: Review */}
      {step===2&&(
        <div className="fade-in">
          <div className="card" style={{marginBottom:16}}>
            <div style={{fontSize:12,color:P.gold,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500,marginBottom:16}}>Booking Summary</div>
            {[
              {label:"Shop",value:shop.name},
              {label:"Barber",value:barber.name},
              {label:"Address",value:shop.address},
              {label:"Service",value:service?.name},
              {label:"Duration",value:`${service?.duration} min`},
              {label:"Date",value:new Date(date).toLocaleDateString("en-IE",{weekday:"long",day:"numeric",month:"long"})},
              {label:"Time",value:slot},
            ].map(({label,value})=>(
              <div key={label} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${P.border}`}}>
                <span style={{fontSize:13,color:P.muted}}>{label}</span>
                <span style={{fontSize:13,fontWeight:500}}>{value}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 0"}}>
              <span style={{fontWeight:500}}>Total</span>
              <span style={{color:P.gold,fontWeight:600,fontSize:20}}>€{service?.price}</span>
            </div>
          </div>
          <div className="card" style={{marginBottom:16}}>
            <div style={{fontSize:12,color:P.gold,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500,marginBottom:10}}>Notes for {barber.name}</div>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Reference photo link, hair concerns, anything useful..." rows={3} style={{resize:"none"}}/>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button className="ghost-btn" onClick={()=>setStep(1)}>← Back</button>
            <button className="gold-btn" style={{flex:1}} onClick={()=>onConfirm({shop,barber,service,date,slot,notes,totalPrice:service?.price})}>
              Proceed to Payment →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAYMENT PAGE ─────────────────────────────────────────────────────────────
function PaymentPage({ booking, onSuccess, onBack }) {
  const [form, setForm] = useState({cardNumber:"",expiry:"",cvv:"",name:""});
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const update = (k,v)=>setForm(f=>({...f,[k]:v}));
  const formatCard = v=>v.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim().slice(0,19);
  const formatExpiry = v=>v.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").slice(0,5);

  if(!booking) return (
    <div style={{textAlign:"center",padding:"60px 0",color:P.muted}}>
      <div style={{fontSize:40,marginBottom:12}}>💳</div>
      <div>No booking in progress</div>
      <div style={{fontSize:12,marginTop:8}}>Use the Find tab to browse and book a barber first</div>
    </div>
  );

  const handlePay = async()=>{
    setProcessing(true);
    await new Promise(r=>setTimeout(r,2200));
    setProcessing(false);
    onSuccess();
  };

  return (
    <div className="fade-in" style={{maxWidth:480,margin:"0 auto"}}>
      <div className="breadcrumb">
        <button className="back-btn" onClick={onBack}>← Review</button>
        <span className="sep">›</span>
        <span>Payment</span>
      </div>
      <div className="section-title" style={{marginBottom:4}}>Secure Payment</div>
      <div className="section-sub">Powered by Stripe · SSL encrypted</div>

      <div className="card" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontWeight:500}}>{booking.service?.name}</div>
            <div style={{fontSize:12,color:P.muted}}>{booking.barber?.name} at {booking.shop?.name}</div>
            <div style={{fontSize:12,color:P.muted}}>{booking.slot} · {new Date(booking.date).toLocaleDateString("en-IE",{weekday:"short",day:"numeric",month:"short"})}</div>
          </div>
          <div style={{color:P.gold,fontWeight:600,fontSize:22}}>€{booking.totalPrice}</div>
        </div>
      </div>

      <div className="card" style={{marginBottom:16}}>
        <div style={{fontSize:12,color:P.gold,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500,marginBottom:12}}>Payment Method</div>
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {[{id:"card",label:"💳 Card"},{id:"apple",label:"🍎 Apple Pay"},{id:"google",label:"G Pay"}].map(m=>(
            <button key={m.id} className={`chip${method===m.id?" selected":""}`} style={{flex:1,textAlign:"center"}} onClick={()=>setMethod(m.id)}>{m.label}</button>
          ))}
        </div>
        {method==="card"&&(
          <div>
            <div className="input-group"><label>Cardholder Name</label><input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Name on card"/></div>
            <div className="input-group"><label>Card Number</label><input value={form.cardNumber} onChange={e=>update("cardNumber",formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="input-group" style={{marginBottom:0}}><label>Expiry</label><input value={form.expiry} onChange={e=>update("expiry",formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5}/></div>
              <div className="input-group" style={{marginBottom:0}}><label>CVV</label><input type="password" value={form.cvv} onChange={e=>update("cvv",e.target.value.replace(/\D/g,"").slice(0,3))} placeholder="•••" maxLength={3}/></div>
            </div>
          </div>
        )}
        {method!=="card"&&<div style={{textAlign:"center",padding:"20px 0",color:P.muted,fontSize:13}}>Tap to authenticate with {method==="apple"?"Apple Pay":"Google Pay"}</div>}
      </div>

      <button className="gold-btn" style={{width:"100%",padding:14,fontSize:15,opacity:processing?0.7:1}}
        onClick={handlePay} disabled={processing||(method==="card"&&(!form.cardNumber||!form.expiry||!form.cvv||!form.name))}>
        {processing?<span className="pulse">Processing…</span>:`Pay €${booking.totalPrice} · Confirm Booking`}
      </button>
      <div style={{textAlign:"center",marginTop:12,fontSize:11,color:P.muted}}>🔒 Payments secured by Stripe. Free cancellation up to 2 hours before.</div>
    </div>
  );
}

// ─── CONFIRMED PAGE ───────────────────────────────────────────────────────────
function ConfirmedPage({ booking, onDone }) {
  return (
    <div className="fade-in" style={{textAlign:"center",padding:"40px 0"}}>
      <div className="check-circle">✓</div>
      <div className="section-title" style={{marginBottom:8}}>Booking Confirmed!</div>
      <div style={{color:P.muted,fontSize:13,marginBottom:28}}>Confirmation sent to your email</div>
      <div className="card" style={{textAlign:"left",maxWidth:420,margin:"0 auto 24px"}}>
        {[
          {icon:"✂",label:booking.barber?.name,sub:booking.barber?.role},
          {icon:"🏪",label:booking.shop?.name,sub:booking.shop?.address},
          {icon:"📅",label:new Date(booking.date).toLocaleDateString("en-IE",{weekday:"long",day:"numeric",month:"long",year:"numeric"})},
          {icon:"🕐",label:booking.slot},
          {icon:"💇",label:booking.service?.name,sub:`${booking.service?.duration} min`},
          {icon:"💰",label:`€${booking.totalPrice} paid`},
        ].map(({icon,label,sub})=>(
          <div key={label} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:`1px solid ${P.border}`}}>
            <span style={{width:20,flexShrink:0}}>{icon}</span>
            <div><div style={{fontSize:14,fontWeight:500}}>{label}</div>{sub&&<div style={{fontSize:12,color:P.muted}}>{sub}</div>}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <button className="ghost-btn" onClick={onDone}>Book Another</button>
        <button className="gold-btn" onClick={onDone}>Done</button>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage({ profile, setProfile, onSave }) {
  const [form, setForm] = useState(profile);
  const update = (k,v)=>setForm(f=>({...f,[k]:v}));
  const letters = (form.name||"U").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  return (
    <div className="fade-in" style={{maxWidth:600,margin:"0 auto",paddingBottom:40}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{width:88,height:88,borderRadius:"50%",background:`${P.gold}22`,border:`2px solid ${P.gold}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28,fontWeight:600,color:P.gold}}>{letters}</div>
        <div className="section-title">{form.name||"Your Profile"}</div>
        <div style={{fontSize:12,color:P.muted,marginTop:4}}>{form.email}</div>
      </div>
      <div className="card" style={{marginBottom:14}}>
        <div style={{fontSize:12,color:P.gold,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500,marginBottom:16}}>Personal Details</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div className="input-group"><label>First Name</label><input value={form.firstName||""} onChange={e=>update("firstName",e.target.value)} placeholder="First name"/></div>
          <div className="input-group"><label>Last Name</label><input value={form.lastName||""} onChange={e=>update("lastName",e.target.value)} placeholder="Last name"/></div>
        </div>
        <div className="input-group"><label>Email</label><input type="email" value={form.email||""} onChange={e=>update("email",e.target.value)} placeholder="you@email.com"/></div>
        <div className="input-group" style={{marginBottom:0}}><label>Phone</label><input type="tel" value={form.phone||""} onChange={e=>update("phone",e.target.value)} placeholder="+353 87 000 0000"/></div>
      </div>
      <div className="card" style={{marginBottom:14}}>
        <div style={{fontSize:12,color:P.gold,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500,marginBottom:14}}>Style Preferences</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {["Fade","Classic","Textured","Undercut","Buzz","Long Hair","Beard"].map(s=>(
            <button key={s} className={`chip${form.styles?.includes(s)?" selected":""}`}
              onClick={()=>update("styles",form.styles?.includes(s)?form.styles.filter(x=>x!==s):[...(form.styles||[]),s])}>{s}</button>
          ))}
        </div>
      </div>
      <div className="card" style={{marginBottom:24}}>
        <div style={{fontSize:12,color:P.gold,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500,marginBottom:14}}>Recent Bookings</div>
        {[
          {barber:"Luke Delaney",shop:"The Fireplace Barbershop",date:"May 5, 2026",service:"Hot Towel Shave",price:38},
          {barber:"Ciarán Foley",shop:"Area9 Barbers",date:"Apr 18, 2026",service:"Cut & Beard",price:40},
        ].map((b,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:i<1?`1px solid ${P.border}`:"none"}}>
            <div>
              <div style={{fontWeight:500,fontSize:14}}>{b.barber}</div>
              <div style={{fontSize:12,color:P.muted}}>{b.shop} · {b.date}</div>
              <div style={{fontSize:12,color:P.muted}}>{b.service}</div>
            </div>
            <div style={{color:P.gold,fontWeight:500}}>€{b.price}</div>
          </div>
        ))}
      </div>
      <button className="gold-btn" style={{width:"100%"}} onClick={()=>{setProfile(form);onSave();}}>Save Profile</button>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [nav, setNav] = useState("find");
  const [viewShop, setViewShop] = useState(null);
  const [viewBarber, setViewBarber] = useState(null);
  const [booking, setBooking] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [profile, setProfile] = useState({name:"John Doe",firstName:"John",lastName:"Doe",email:"john@email.com",phone:"+353 87 123 4567",styles:["Fade"]});
  const [notification, setNotification] = useState(null);
  const notify = msg=>setNotification(msg);

  const handleSelectShop = (shop) => { setViewShop(shop); setViewBarber(null); setNav("find"); };
  const handleSelectBarber = (barber, shop) => { setViewBarber({barber,shop}); setViewShop(null); setNav("book"); };
  const handleConfirmBooking = (b) => { setBooking(b); setNav("pay"); };
  const handlePaySuccess = () => { setConfirmed(true); };
  const handleDone = () => { setConfirmed(false); setBooking(null); setViewBarber(null); setViewShop(null); setNav("find"); };

  const navItems = [
    {id:"find",icon:"⌕",label:"Find"},
    {id:"book",icon:"✂",label:"Book"},
    {id:"pay",icon:"💳",label:"Payment"},
    {id:"profile",icon:"◉",label:"Profile"},
  ];

  const renderMain = () => {
    if (nav==="find" && viewShop) return <ShopPage shop={viewShop} onBack={()=>setViewShop(null)} onSelectBarber={handleSelectBarber}/>;
    if (nav==="find") return <FindPage onSelectShop={handleSelectShop} onSelectBarber={handleSelectBarber}/>;
    if (nav==="book" && viewBarber) return <BarberPage barber={viewBarber.barber} shop={viewBarber.shop} onBack={(to)=>{if(to==="shop"){setViewShop(viewBarber.shop);setViewBarber(null);setNav("find");}else{setViewBarber(null);setNav("find");}}} onConfirm={handleConfirmBooking}/>;
    if (nav==="book") return <div style={{textAlign:"center",padding:"60px 0",color:P.muted}}><div style={{fontSize:40,marginBottom:12}}>✂</div><div>Select a barber from the Find tab to book</div></div>;
    if (nav==="pay" && confirmed) return <ConfirmedPage booking={booking} onDone={handleDone}/>;
    if (nav==="pay") return <PaymentPage booking={booking} onSuccess={handlePaySuccess} onBack={()=>{setNav("book");}}/>;
    if (nav==="profile") return <ProfilePage profile={profile} setProfile={setProfile} onSave={()=>notify("Profile saved!")}/>;
  };

  return (
    <>
      <style>{css}</style>
      <div style={{minHeight:"100vh",background:P.bg}}>
        <header style={{borderBottom:`1px solid ${P.border}`,padding:"0 24px",position:"sticky",top:0,zIndex:100,background:`${P.bg}EE`,backdropFilter:"blur(12px)"}}>
          <div style={{maxWidth:820,margin:"0 auto",display:"flex",alignItems:"center",height:60}}>
            <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
              <span style={{color:P.gold,fontSize:22}}>✂</span>
              <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:20,letterSpacing:"-0.02em"}}>Barber<span style={{color:P.gold}}>Book</span></span>
              <span style={{fontSize:11,color:P.muted,marginLeft:4}}>Dublin</span>
            </div>
            <nav style={{display:"flex",gap:4}}>
              {navItems.map(n=>(
                <button key={n.id} className={`nav-link${nav===n.id?" active":""}`} onClick={()=>{setNav(n.id);if(n.id==="find"){setViewShop(null);setViewBarber(null);}}}>
                  <span style={{marginRight:4}}>{n.icon}</span>{n.label}
                </button>
              ))}
            </nav>
            <div style={{flex:1,display:"flex",justifyContent:"flex-end"}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:`${P.gold}22`,border:`1px solid ${P.gold}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:P.gold,fontWeight:600,cursor:"pointer"}} onClick={()=>setNav("profile")}>
                {profile.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
              </div>
            </div>
          </div>
        </header>

        <div style={{background:`${P.gold}11`,borderBottom:`1px solid ${P.gold}22`,padding:"6px 24px"}}>
          <div style={{maxWidth:820,margin:"0 auto",display:"flex",alignItems:"center",gap:8,fontSize:11,color:P.gold}}>
            <span className="pulse">●</span>
            {SHOPS.length} verified Dublin barbershops · {SHOPS.reduce((a,s)=>a+s.barbers.length,0)} barbers · Live availability · Instant booking
          </div>
        </div>

        <main style={{maxWidth:820,margin:"0 auto",padding:"28px 24px"}}>
          {renderMain()}
        </main>

        {notification&&<Notification msg={notification} onClose={()=>setNotification(null)}/>}

        <footer style={{borderTop:`1px solid ${P.border}`,padding:"20px 24px",marginTop:40}}>
          <div style={{maxWidth:820,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,color:P.muted,flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{color:P.gold}}>✂</span>
              <span style={{fontFamily:"Playfair Display,serif",color:P.text}}>BarberBook</span>
              <span>· Dublin, Ireland</span>
            </div>
            <div style={{display:"flex",gap:20}}>
              {["About","For Barbers","Privacy","Terms","Help"].map(l=><a key={l} href="#" style={{color:P.muted,textDecoration:"none"}}>{l}</a>)}
            </div>
            <div>© 2026 BarberBook Ireland</div>
          </div>
        </footer>
      </div>
    </>
  );
}
