import { useState, useEffect, useRef } from "react";

/* ─── BRAND ─── */
const C = {
  navy: "#08111E",
  dark: "#0A1628",
  mid: "#0D1B2A",
  card: "#0F1F35",
  blue: "#2B6EF5",
  bright: "#4A8AFF",
  cyan: "#4DD9F0",
  clight: "#7DE8F5",
  white: "#FFFFFF",
  muted: "rgba(255,255,255,0.42)",
  border: "rgba(43,110,245,0.2)",
};

const SERVICES = [
  {
    id: "01",
    title: "UI/UX Design",
    sub: "Human-centered interfaces",
    icon: "◈",
    color: C.cyan,
    bg: "rgba(77,217,240,0.08)",
  },
  {
    id: "02",
    title: "Graphic Design",
    sub: "Visual identity & branding",
    icon: "✦",
    color: C.bright,
    bg: "rgba(74,138,255,0.08)",
  },
  {
    id: "03",
    title: "Web Development",
    sub: "Fast, scalable web apps",
    icon: "⬡",
    color: C.cyan,
    bg: "rgba(77,217,240,0.08)",
  },
  {
    id: "04",
    title: "App Development",
    sub: "iOS & Android apps",
    icon: "◉",
    color: C.blue,
    bg: "rgba(43,110,245,0.08)",
  },
  {
    id: "05",
    title: "Digital Marketing",
    sub: "Data-driven growth",
    icon: "⬢",
    color: C.clight,
    bg: "rgba(125,232,245,0.08)",
  },
];

const WORKS = [
  {
    n: "01",
    title: "FinTrack",
    type: "UI/UX",
    year: "2025",
    color: C.cyan,
    desc: "Financial dashboard with real-time analytics",
  },
  {
    n: "02",
    title: "NovaBrand",
    type: "Branding",
    year: "2025",
    color: C.bright,
    desc: "Complete brand identity for a tech startup",
  },
  {
    n: "03",
    title: "MedSync",
    type: "Mobile App",
    year: "2024",
    color: C.clight,
    desc: "Healthcare management cross-platform app",
  },
  {
    n: "04",
    title: "PulseAds",
    type: "Marketing",
    year: "2024",
    color: C.blue,
    desc: "Performance marketing campaign suite",
  },
  {
    n: "05",
    title: "NexaShop",
    type: "Web Dev",
    year: "2025",
    color: C.cyan,
    desc: "High-conversion e-commerce platform",
  },
  {
    n: "06",
    title: "AeroMove",
    type: "Branding",
    year: "2025",
    color: C.bright,
    desc: "Logistics brand redesign & web presence",
  },
];

const STATS = [
  { n: "2+", l: "Years Active" },
  { n: "50+", l: "Projects Done" },
  { n: "98%", l: "Satisfaction" },
  { n: "30+", l: "Global Clients" },
];

/* ─── SCRAMBLE HOOK ─── */
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
function useScramble(target, trigger) {
  const [text, setText] = useState(target);
  const raf = useRef(null);
  useEffect(() => {
    if (!trigger) return;
    let iter = 0;
    cancelAnimationFrame(raf.current);
    const run = () => {
      setText(
        target
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iter) return target[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );
      if (iter < target.length + 1) {
        iter += 0.4;
        raf.current = requestAnimationFrame(run);
      } else setText(target);
    };
    run();
    return () => cancelAnimationFrame(raf.current);
  }, [trigger, target]);
  return text;
}

/* ─── TILT CARD ─── */
function TiltCard({ children, style, intensity = 12 }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(8px)`;
    el.style.transition = "transform 0.08s ease";
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    el.style.transition = "transform 0.55s cubic-bezier(0.23,1,0.32,1)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── MAGNETIC BUTTON ─── */
function MagneticBtn({ children, style, onClick, type }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.35;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px,${y}px) scale(1.04)`;
    el.style.transition = "transform 0.18s ease";
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0) scale(1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
  };
  return (
    <button
      ref={ref}
      type={type || "button"}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        border: "none",
        background: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ─── COUNTER ─── */
function Counter({ target, run }) {
  const num = parseInt(target);
  const suf = target.replace(/[0-9]/g, "");
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(num / 60));
    const t = setInterval(() => {
      cur += step;
      if (cur >= num) {
        setV(num);
        clearInterval(t);
      } else setV(cur);
    }, 28);
    return () => clearInterval(t);
  }, [run, num]);
  return (
    <>
      {v}
      {suf}
    </>
  );
}

/* ─── USE IN VIEW ─── */
function useInView(th = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setV(true);
      },
      { threshold: th },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [th]);
  return [ref, v];
}

/* ─── PARTICLE CANVAS ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W,
      H,
      particles = [],
      mouse = { x: -999, y: -999 };
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const onMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.8 + 0.3;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? "43,110,245" : "77,217,240";
      }
      update() {
        const dx = mouse.x - this.x,
          dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.vx -= (dx / dist) * 0.6;
          this.vy -= (dy / dist) * 0.6;
        }
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
      }
    }
    for (let i = 0; i < 120; i++) particles.push(new Particle());
    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      for (let i = 0; i < particles.length; i++)
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x,
            dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(43,110,245,${(1 - d / 90) * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

/* ─── LOGO ─── */
function Logo({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <polygon points="12,12 62,12 62,48 48,48 48,32 12,32" fill={C.bright} />
      <rect x="54" y="8" width="34" height="34" rx="3" fill={C.cyan} />
      <rect
        x="54"
        y="56"
        width="34"
        height="32"
        rx="3"
        fill={C.clight}
        opacity="0.9"
      />
      <polygon
        points="12,48 48,48 48,64 62,64 62,84 12,84"
        fill={C.blue}
        opacity="0.85"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════ MAIN ═══════════════════════════════════════ */
export default function Codigo() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovSvc, setHovSvc] = useState(null);
  const [hovWork, setHovWork] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const [heroRef, heroVis] = useInView(0.05);
  const [statsRef, statsVis] = useInView(0.1);
  const [svcRef, svcVis] = useInView(0.05);
  const [workRef, workVis] = useInView(0.05);
  const [aboutRef, aboutVis] = useInView(0.05);
  const [ctaRef, ctaVis] = useInView(0.1);
  const [contactRef, contactVis] = useInView(0.05);
  const [faqRef, faqVis] = useInView(0.05);
  const [processRef, processVis] = useInView(0.05);

  const heroTitle1 = useScramble("We craft", heroVis);
  const heroTitle2 = useScramble("digital", heroVis);
  const heroTitle3 = useScramble("futures.", heroVis);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", service: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const fa = (vis, delay = 0, dir = "up") => ({
    opacity: vis ? 1 : 0,
    transform: vis
      ? "none"
      : dir === "up"
        ? "translateY(48px)"
        : dir === "left"
          ? "translateX(-48px)"
          : "translateX(48px)",
    transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  const NAV = ["Services", "Work", "Process", "About", "Contact"];
  const filters = [
    "All",
    "UI/UX",
    "Branding",
    "Web Dev",
    "Mobile App",
    "Marketing",
  ];
  const filteredWorks =
    activeFilter === "All"
      ? WORKS
      : WORKS.filter(
          (w) =>
            w.type === activeFilter ||
            (activeFilter === "Branding" && w.type === "Branding"),
        );

  const PROCESS = [
    {
      n: "01",
      title: "Discovery",
      desc: "We deep-dive into your goals, users, and market to build a solid strategic foundation.",
      icon: "◎",
    },
    {
      n: "02",
      title: "Strategy",
      desc: "Data meets creativity. We map the full journey before a single pixel is designed.",
      icon: "⬟",
    },
    {
      n: "03",
      title: "Design",
      desc: "High-fidelity prototypes with pixel-perfect attention. Design that converts.",
      icon: "◈",
    },
    {
      n: "04",
      title: "Build",
      desc: "Clean, scalable code. Performance-first engineering across every platform.",
      icon: "⬡",
    },
    {
      n: "05",
      title: "Launch",
      desc: "Rigorous QA, smooth deployment, and a launch strategy that drives impact.",
      icon: "✦",
    },
    {
      n: "06",
      title: "Grow",
      desc: "Post-launch support, analytics, and iteration cycles to keep you ahead.",
      icon: "◉",
    },
  ];

  const FAQS = [
    {
      q: "How long does a typical project take?",
      a: "Timelines vary by scope: UI/UX projects run 2–4 weeks, web builds 4–8 weeks, full brand identities 2–3 weeks. We always share a detailed timeline upfront.",
    },
    {
      q: "Do you work with early-stage startups?",
      a: "Absolutely. We love working with founders from day one — from naming and branding through to building and launching their product.",
    },
    {
      q: "What's your pricing model?",
      a: "We offer both project-based fixed pricing and retainer engagements. After a free consultation, we provide a detailed, transparent quote — no hidden fees.",
    },
    {
      q: "Can you handle the full digital stack?",
      a: "Yes. Código is a full-cycle studio. We cover strategy, design, development, and marketing — meaning you get one cohesive team across everything.",
    },
    {
      q: "Do you offer post-launch support?",
      a: "Always. We offer maintenance plans, growth retainers, and dedicated support packages so your digital product keeps evolving after launch.",
    },
  ];

  const TESTIMONIALS = [
    {
      name: "Arjun Mehta",
      role: "CEO, FinTrack",
      text: "Código transformed our dashboard from functional to exceptional. The team's attention to detail and speed of delivery was unlike anything we'd experienced.",
      avatar: "A",
    },
    {
      name: "Sofia Chen",
      role: "Founder, NovaBrand",
      text: "They didn't just design a logo — they built our entire visual identity and gave us a brand we're genuinely proud of. Truly a partner, not just a vendor.",
      avatar: "S",
    },
    {
      name: "Marcus Williams",
      role: "CTO, MedSync",
      text: "The app they built handles complex medical workflows with elegant simplicity. Their engineering quality is top-tier and the code is maintainable.",
      avatar: "M",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Cabinet Grotesk',sans-serif",
        background: C.navy,
        color: C.white,
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <ParticleCanvas />

      <style>{`
       @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&f[]=satoshi@300,400,500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .section-p {
    padding: 120px 28px !important;
  }

  @media (min-width: 1400px) {
    .section-p {
      padding: 120px 40px !important;
    }
  }

  /* Remove default margins */
  nav, section, footer {
    width: 100%;
  }
        ::selection{background:rgba(43,110,245,0.4);color:#fff}
        button,a{cursor:pointer;border:none;background:none;font-family:inherit}
        input,textarea,select{font-family:inherit}
        input:focus,textarea:focus,select:focus{outline:none;border-color:${C.cyan}!important;box-shadow:0 0 0 3px rgba(77,217,240,0.12)!important}
        @keyframes floatY{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(3deg)}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes spinR{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
        @keyframes pulse{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes borderFlow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.08);opacity:1}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .nav-lnk:hover{color:${C.cyan}!important}
        .svc-row:hover{background:rgba(43,110,245,0.06)!important}
        .svc-row:hover .svc-num{color:${C.cyan}!important}
        .svc-row:hover .svc-arrow{opacity:1!important;transform:translate(6px,-6px)!important}
        .svc-row:hover .svc-line{width:100%!important}
        .work-item:hover .work-overlay{opacity:1!important}
        .work-item:hover .work-title-main{color:${C.cyan}!important}
        .work-item:hover .work-arrow{transform:translate(8px,-8px)!important;opacity:1!important}
        .stat-card:hover{border-color:${C.cyan}!important;transform:translateY(-6px) scale(1.02)!important}
        .stat-card:hover .stat-n{background:linear-gradient(135deg,${C.cyan},${C.bright});-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .filter-btn:hover{border-color:rgba(77,217,240,0.5)!important;color:${C.white}!important}
        .testimonial-card:hover{border-color:rgba(77,217,240,0.3)!important;transform:translateY(-4px)!important}
        .process-card:hover{border-color:${C.cyan}44!important;transform:translateY(-8px)!important}
        .process-card:hover .process-icon{color:${C.cyan}!important;transform:scale(1.2) rotate(15deg)!important}
        .faq-item:hover{border-color:rgba(77,217,240,0.25)!important}
        .social-chip:hover{border-color:${C.cyan}!important;color:${C.cyan}!important}
        .contact-icon:hover{background:rgba(77,217,240,0.15)!important;border-color:${C.cyan}!important}
        @media(max-width:900px){.two-col{grid-template-columns:1fr!important}.hide-mob{display:none!important}.process-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:600px){.section-p{padding:80px 20px!important}.works-grid{grid-template-columns:1fr!important}.process-grid{grid-template-columns:1fr!important}}
      `}</style>

      {/* ══ NAV ══ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          background: scrollY > 60 ? "rgba(8,17,30,0.94)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(28px) saturate(1.4)" : "none",
          borderBottom: scrollY > 60 ? `1px solid ${C.border}` : "none",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
          }}
        >
          <button
            onClick={() => scrollTo("hero")}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <Logo size={32} />
            <span
              style={{
                fontFamily: "'Cabinet Grotesk',sans-serif",
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: C.white,
              }}
            >
              c<span style={{ color: C.cyan }}>ó</span>digo
            </span>
          </button>
          <div
            className="hide-mob"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            {NAV.map((l) => (
              <button
                key={l}
                className="nav-lnk"
                onClick={() => scrollTo(l.toLowerCase())}
                style={{
                  position: "relative",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 18,
                  fontWeight: 500,
                  padding: "8px 16px",
                  letterSpacing: "0.03em",
                  transition: "color 0.2s",
                }}
              >
                {l}
              </button>
            ))}
            <MagneticBtn
              onClick={() => scrollTo("contact")}
              style={{
                marginLeft: 8,
                background: `linear-gradient(135deg,${C.blue},${C.cyan})`,
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                padding: "11px 26px",
                borderRadius: 100,
                boxShadow: `0 4px 24px rgba(43,110,245,0.4)`,
                letterSpacing: "0.02em",
              }}
            >
              Start Project →
            </MagneticBtn>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hide-desk"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 8,
              background: "none",
              border: "none",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 22,
                  height: 2,
                  background: menuOpen && i === 1 ? "transparent" : C.white,
                  borderRadius: 2,
                  display: "block",
                  transition: "all 0.3s",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px,5px)"
                      : i === 2
                        ? "rotate(-45deg) translate(5px,-5px)"
                        : "none"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>
        {menuOpen && (
          <div
            style={{
              background: "rgba(8,17,30,0.97)",
              borderTop: `1px solid ${C.border}`,
              padding: "16px 28px 28px",
            }}
          >
            {NAV.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  color: C.white,
                  fontSize: 22,
                  fontWeight: 600,
                  padding: "14px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              style={{
                marginTop: 18,
                width: "100%",
                background: `linear-gradient(135deg,${C.blue},${C.cyan})`,
                color: "#fff",
                fontSize: 18,
                fontWeight: 700,
                padding: "15px",
                borderRadius: 12,
              }}
            >
              Start Project →
            </button>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section
        id="hero"
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 68,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: `1px solid rgba(43,110,245,${0.12 - i * 0.03})`,
              width: 300 + i * 220,
              height: 300 + i * 220,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              animation: `spin ${18 + i * 8}s linear infinite${i % 2 ? " reverse" : ""}`,
              pointerEvents: "none",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "8%",
            width: 500,
            height: 500,
            background: `radial-gradient(circle,rgba(43,110,245,0.18) 0%,transparent 65%)`,
            borderRadius: "50%",
            animation: "floatY 9s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            right: "6%",
            width: 420,
            height: 420,
            background: `radial-gradient(circle,rgba(77,217,240,0.14) 0%,transparent 65%)`,
            borderRadius: "50%",
            animation: "floatY 11s ease-in-out infinite 3s",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(43,110,245,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(43,110,245,0.06) 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 960,
            margin: "0 auto",
            padding: "0 28px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              ...fa(heroVis, 0.05),
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: `1px solid rgba(77,217,240,0.3)`,
              borderRadius: 100,
              padding: "9px 20px",
              marginBottom: 36,
              background: "rgba(77,217,240,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.cyan,
                animation: "pulse 2s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
              }}
            >
              Est. 2024 — IT Solutions Provider
            </span>
          </div>

          <div
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                ...fa(heroVis, 0.12),
                fontSize: "clamp(58px,9vw,115px)",
                color: C.white,
              }}
            >
              {heroTitle1}
            </div>
            <div
              style={{
                ...fa(heroVis, 0.2),
                fontSize: "clamp(58px,9vw,115px)",
                background: `linear-gradient(90deg,${C.blue},${C.cyan},${C.bright})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200%",
                animation: "borderFlow 4s ease infinite",
              }}
            >
              {heroTitle2}
            </div>
            <div
              style={{
                ...fa(heroVis, 0.28),
                fontSize: "clamp(58px,9vw,115px)",
                color: C.white,
              }}
            >
              {heroTitle3}
            </div>
          </div>

          <p
            style={{
              ...fa(heroVis, 0.38),
              fontSize: "clamp(15px,1.8vw,18px)",
              lineHeight: 1.78,
              color: "rgba(255,255,255,0.45)",
              marginBottom: 48,
              fontWeight: 300,
              maxWidth: 560,
              margin: "0 auto 48px",
            }}
          >
            Design · Development · Marketing.
            <br />
            Full-cycle digital services built for brands that dare to stand out.
          </p>

          <div
            style={{
              ...fa(heroVis, 0.48),
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <MagneticBtn
              onClick={() => scrollTo("services")}
              style={{
                background: `linear-gradient(135deg,${C.blue},${C.cyan})`,
                color: "#fff",
                fontSize: 20,
                fontWeight: 700,
                padding: "18px 42px",
                borderRadius: 100,
                boxShadow: `0 8px 40px rgba(43,110,245,0.45)`,
                letterSpacing: "0.01em",
              }}
            >
              Explore Services →
            </MagneticBtn>
            <MagneticBtn
              onClick={() => scrollTo("work")}
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.75)",
                fontSize: 20,
                fontWeight: 500,
                padding: "18px 42px",
                borderRadius: 100,
                border: `1px solid rgba(255,255,255,0.15)`,
              }}
            >
              View Our Work
            </MagneticBtn>
          </div>

          <div
            style={{
              ...fa(heroVis, 0.58),
              display: "flex",
              justifyContent: "center",
              gap: 40,
              marginTop: 72,
              flexWrap: "wrap",
            }}
          >
            {[
              ["50+", "Projects"],
              ["2+", "Years"],
              ["30+", "Clients"],
              ["5★", "Rating"],
            ].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontSize: 28,
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: C.white,
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 16,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              ...fa(heroVis, 0.65),
              marginTop: 60,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 1,
                height: 56,
                background: `linear-gradient(to bottom,${C.cyan},transparent)`,
                opacity: 0.7,
              }}
            />
            <span
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 14,
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.28)",
                textTransform: "uppercase",
              }}
            >
              scroll
            </span>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div
        style={{
          background: C.mid,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: "18px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            animation: "marquee 18s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...Array(2)].map((_, ri) => (
            <div key={ri} style={{ display: "flex", gap: 0 }}>
              {[
                "UI/UX Design",
                "Graphic Design",
                "Web Development",
                "App Development",
                "Digital Marketing",
                "Branding",
                "SEO",
                "Motion Design",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0 32px",
                  }}
                >
                  {t}{" "}
                  <span style={{ color: C.cyan, margin: "0 0 0 32px" }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ padding: "72px 28px", background: C.dark }}>
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 16,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="stat-card"
              style={{
                ...fa(statsVis, i * 0.1),
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: "32px 24px",
                textAlign: "center",
                background: C.card,
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div
                className="stat-n"
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontSize: "clamp(40px,5vw,58px)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  color: C.white,
                  marginBottom: 8,
                  transition: "all 0.3s",
                }}
              >
                {statsVis ? <Counter target={s.n} run={statsVis} /> : "0"}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section
        id="services"
        ref={svcRef}
        className="section-p"
        style={{ padding: "120px 28px", background: C.navy }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 72 }}>
            <div
              style={{
                ...fa(svcVis, 0),
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                color: C.cyan,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              What We Do
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <h2
                style={{
                  ...fa(svcVis, 0.1),
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontSize: "clamp(36px,5vw,64px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  maxWidth: 500,
                }}
              >
                Five disciplines.
                <br />
                <span
                  style={{
                    background: `linear-gradient(90deg,${C.blue},${C.cyan})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  One studio.
                </span>
              </h2>
              <p
                style={{
                  ...fa(svcVis, 0.2),
                  maxWidth: 340,
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 300,
                }}
              >
                From concept to launch, Código handles your entire digital
                journey with precision.
              </p>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {SERVICES.map((svc, i) => (
              <div
                key={svc.id}
                className="svc-row"
                onMouseEnter={() => setHovSvc(i)}
                onMouseLeave={() => setHovSvc(null)}
                style={{
                  ...fa(svcVis, i * 0.08),
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  padding: "28px 20px",
                  borderBottom: `1px solid ${C.border}`,
                  borderRadius: 16,
                  background: "transparent",
                  transition: "background 0.3s",
                  overflow: "hidden",
                }}
              >
                <div
                  className="svc-line"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: 1,
                    width: 0,
                    background: `linear-gradient(90deg,${svc.color},transparent)`,
                    transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
                <div
                  className="svc-num"
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.15)",
                    minWidth: 28,
                    transition: "color 0.3s",
                    letterSpacing: "0.05em",
                  }}
                >
                  {svc.id}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    color: hovSvc === i ? svc.color : "rgba(255,255,255,0.2)",
                    transition: "color 0.3s, transform 0.3s",
                    transform:
                      hovSvc === i ? "scale(1.3) rotate(15deg)" : "scale(1)",
                    minWidth: 36,
                    textAlign: "center",
                  }}
                >
                  {svc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Cabinet Grotesk',sans-serif",
                      fontSize: "clamp(20px,2.5vw,30px)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: hovSvc === i ? C.white : "rgba(255,255,255,0.8)",
                      transition: "color 0.3s",
                    }}
                  >
                    {svc.title}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.3)",
                      marginTop: 3,
                      fontWeight: 300,
                      opacity: hovSvc === i ? 1 : 0.6,
                      transition: "opacity 0.3s",
                    }}
                  >
                    {svc.sub}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: svc.color,
                    border: `1px solid ${svc.color}55`,
                    padding: "6px 14px",
                    borderRadius: 100,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    opacity: hovSvc === i ? 1 : 0,
                    transition: "opacity 0.3s",
                    fontFamily: "'Space Mono',monospace",
                  }}
                >
                  explore
                </div>
                <div
                  className="svc-arrow"
                  style={{
                    fontSize: 22,
                    color: svc.color,
                    opacity: 0,
                    transform: "translate(0px,0px)",
                    transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WORK ══ */}
      <section
        id="work"
        ref={workRef}
        className="section-p"
        style={{ padding: "120px 28px", background: C.mid }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              ...fa(workVis, 0),
              fontFamily: "'Space Mono',monospace",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: C.cyan,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 36,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <h2
              style={{
                ...fa(workVis, 0.1),
                fontFamily: "'Cabinet Grotesk',sans-serif",
                fontSize: "clamp(36px,5vw,64px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Selected
              <br />
              <span
                style={{
                  background: `linear-gradient(90deg,${C.blue},${C.cyan})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                work.
              </span>
            </h2>
            <MagneticBtn
              onClick={() => scrollTo("contact")}
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: 100,
                border: `1px solid ${C.border}`,
                transition: "all 0.3s",
              }}
            >
              Start your project →
            </MagneticBtn>
          </div>

          {/* Filter Bar */}
          <div
            style={{
              ...fa(workVis, 0.15),
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 40,
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                className="filter-btn"
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "8px 18px",
                  borderRadius: 100,
                  border: `1px solid ${activeFilter === f ? C.cyan : C.border}`,
                  color: activeFilter === f ? C.cyan : "rgba(255,255,255,0.4)",
                  background:
                    activeFilter === f
                      ? "rgba(77,217,240,0.08)"
                      : "transparent",
                  transition: "all 0.25s",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div
            className="works-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
              gap: 16,
            }}
          >
            {filteredWorks.map((w, i) => (
              <TiltCard
                key={w.n}
                intensity={10}
                style={{
                  ...fa(workVis, i * 0.07),
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  className="work-item"
                  onMouseEnter={() => setHovWork(i)}
                  onMouseLeave={() => setHovWork(null)}
                >
                  <div
                    style={{
                      height: 3,
                      background: `linear-gradient(90deg,${w.color},transparent)`,
                    }}
                  />
                  <div style={{ padding: "28px 28px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Space Mono',monospace",
                          fontSize: 11,
                          color: "rgba(255,255,255,0.2)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {w.n}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Space Mono',monospace",
                          fontSize: 10,
                          color: w.color,
                          border: `1px solid ${w.color}44`,
                          padding: "5px 12px",
                          borderRadius: 100,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {w.type}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="work-title-main"
                        style={{
                          fontFamily: "'Cabinet Grotesk',sans-serif",
                          fontSize: "clamp(26px,3vw,34px)",
                          fontWeight: 900,
                          letterSpacing: "-0.04em",
                          color: C.white,
                          transition: "color 0.3s",
                        }}
                      >
                        {w.title}
                      </div>
                      <div
                        className="work-arrow"
                        style={{
                          fontSize: 22,
                          color: w.color,
                          opacity: 0,
                          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                          transform: "translate(0,0)",
                        }}
                      >
                        ↗
                      </div>
                    </div>
                    <p
                      style={{
                        marginTop: 10,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.35)",
                        lineHeight: 1.6,
                      }}
                    >
                      {w.desc}
                    </p>
                    <div
                      style={{
                        marginTop: 16,
                        fontFamily: "'Space Mono',monospace",
                        fontSize: 10,
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {w.year}
                    </div>
                  </div>
                  <div
                    className="work-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(circle at 30% 30%,${w.color}10 0%,transparent 60%)`,
                      opacity: 0,
                      transition: "opacity 0.4s",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section
        id="process"
        ref={processRef}
        className="section-p"
        style={{ padding: "120px 28px", background: C.navy }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              ...fa(processVis, 0),
              fontFamily: "'Space Mono',monospace",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: C.cyan,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            How We Work
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 64,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <h2
              style={{
                ...fa(processVis, 0.1),
                fontFamily: "'Cabinet Grotesk',sans-serif",
                fontSize: "clamp(36px,5vw,64px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Our process.
              <br />
              <span
                style={{
                  background: `linear-gradient(90deg,${C.blue},${C.cyan})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Refined.
              </span>
            </h2>
            <p
              style={{
                ...fa(processVis, 0.2),
                maxWidth: 320,
                fontSize: 15,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.4)",
                fontWeight: 300,
              }}
            >
              Six clear stages. Zero guesswork. Total transparency from kickoff
              to launch.
            </p>
          </div>
          <div
            className="process-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
            }}
          >
            {PROCESS.map((p, i) => (
              <div
                key={p.n}
                className="process-card"
                style={{
                  ...fa(processVis, i * 0.08),
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 20,
                  padding: "32px 28px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 24,
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.08)",
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                  }}
                >
                  {p.n}
                </div>
                <div
                  className="process-icon"
                  style={{
                    fontSize: 28,
                    color: "rgba(255,255,255,0.2)",
                    marginBottom: 20,
                    display: "block",
                    transition: "color 0.3s, transform 0.3s",
                  }}
                >
                  {p.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  {p.title}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.7,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg,${C.blue},${C.cyan})`,
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  className="process-bar"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section
        id="about"
        ref={aboutRef}
        className="section-p"
        style={{ padding: "120px 28px", background: C.mid }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div style={fa(aboutVis, 0, "left")}>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: C.cyan,
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Who We Are
              </div>
              <h2
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontSize: "clamp(32px,4.5vw,56px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.08,
                  marginBottom: 28,
                }}
              >
                Passion-built.
                <br />
                <span
                  style={{
                    background: `linear-gradient(90deg,${C.blue},${C.cyan})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Results-driven.
                </span>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 300,
                  marginBottom: 14,
                }}
              >
                Founded in 2024, Código was born from a belief that great design
                and powerful technology belong together. We're a
                multidisciplinary team of designers, engineers and marketers
                operating globally from Sri Lanka.
              </p>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 300,
                  marginBottom: 40,
                }}
              >
                Every pixel is intentional. Every line of code is crafted. Every
                campaign is data-driven. We don't just build products — we shape
                the brands of tomorrow.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  "Design-First",
                  "Agile Workflow",
                  "24/7 Support",
                  "Transparent Process",
                  "Scalable Output",
                ].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 10,
                      color: C.cyan,
                      border: `1px solid rgba(77,217,240,0.28)`,
                      padding: "9px 16px",
                      borderRadius: 100,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <TiltCard intensity={8} style={fa(aboutVis, 0.2, "right")}>
              <div
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 28,
                  padding: 48,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 60% 20%,rgba(43,110,245,0.12) 0%,transparent 55%)`,
                    animation: "breathe 6s ease-in-out infinite",
                  }}
                />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <Logo size={56} />
                  <div
                    style={{
                      fontFamily: "'Cabinet Grotesk',sans-serif",
                      fontSize: 76,
                      fontWeight: 900,
                      color: "rgba(43,110,245,0.1)",
                      lineHeight: 1,
                      letterSpacing: "-0.06em",
                      margin: "12px 0 6px",
                    }}
                  >
                    2024
                  </div>
                  <div
                    style={{
                      width: 48,
                      height: 3,
                      background: `linear-gradient(90deg,${C.blue},${C.cyan})`,
                      borderRadius: 2,
                      marginBottom: 20,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: 32,
                    }}
                  >
                    Coding the Future
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                  >
                    {[
                      ["Sri Lanka", "🌏 HQ"],
                      ["Global", "🤝 Reach"],
                      ["Full-Stack", "⚡ Skills"],
                      ["2+ Years", "📅 Experience"],
                    ].map(([v, l]) => (
                      <div
                        key={l}
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${C.border}`,
                          borderRadius: 14,
                          padding: "16px 18px",
                          transition: "border-color 0.3s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderColor = C.cyan + "88")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor = C.border)
                        }
                      >
                        <div
                          style={{
                            fontFamily: "'Cabinet Grotesk',sans-serif",
                            fontSize: 16,
                            fontWeight: 800,
                            color: C.white,
                            marginBottom: 2,
                          }}
                        >
                          {v}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Space Mono',monospace",
                            fontSize: 9,
                            color: "rgba(255,255,255,0.3)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          {l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    right: -14,
                    background: `linear-gradient(135deg,${C.blue},${C.cyan})`,
                    borderRadius: 16,
                    padding: "14px 18px",
                    boxShadow: `0 8px 32px rgba(43,110,245,0.5)`,
                    animation: "floatY 5s ease-in-out infinite",
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cabinet Grotesk',sans-serif",
                      fontSize: 20,
                      fontWeight: 900,
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    ★ 5.0
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 9,
                      color: "rgba(255,255,255,0.75)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Rating
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section style={{ padding: "120px 28px", background: C.navy }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: C.cyan,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Client Love
          </div>
          <h2
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: 60,
            }}
          >
            What they
            <br />
            <span
              style={{
                background: `linear-gradient(90deg,${C.blue},${C.cyan})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              say.
            </span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 20,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <TiltCard
                key={i}
                intensity={6}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 20,
                  padding: 32,
                  transition: "all 0.35s",
                  cursor: "default",
                }}
              >
                <div className="testimonial-card" style={{ height: "100%" }}>
                  <div
                    style={{
                      fontSize: 32,
                      color: C.cyan,
                      marginBottom: 20,
                      opacity: 0.6,
                    }}
                  >
                    "
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 300,
                      marginBottom: 28,
                      fontStyle: "italic",
                    }}
                  >
                    {t.text}
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg,${C.blue},${C.cyan})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Cabinet Grotesk',sans-serif",
                        fontWeight: 800,
                        fontSize: 18,
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Cabinet Grotesk',sans-serif",
                          fontSize: 15,
                          fontWeight: 700,
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Space Mono',monospace",
                          fontSize: 10,
                          color: "rgba(255,255,255,0.3)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          marginTop: 2,
                        }}
                      >
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section
        ref={faqRef}
        style={{ padding: "120px 28px", background: C.mid }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                color: C.cyan,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              FAQ
            </div>
            <h2
              style={{
                ...fa(faqVis, 0.1),
                fontFamily: "'Cabinet Grotesk',sans-serif",
                fontSize: "clamp(32px,4vw,52px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              Common
              <br />
              <span
                style={{
                  background: `linear-gradient(90deg,${C.blue},${C.cyan})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                questions.
              </span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f, i) => (
              <div
                key={i}
                className="faq-item"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                style={{
                  ...fa(faqVis, i * 0.08),
                  background: C.card,
                  border: `1px solid ${faqOpen === i ? C.cyan + "44" : C.border}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "22px 28px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cabinet Grotesk',sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {f.q}
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      color: C.cyan,
                      transition: "transform 0.3s",
                      transform: faqOpen === i ? "rotate(45deg)" : "rotate(0)",
                      flexShrink: 0,
                      marginLeft: 16,
                    }}
                  >
                    +
                  </span>
                </div>
                {faqOpen === i && (
                  <div
                    style={{
                      padding: "0 28px 22px",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.8,
                      borderTop: `1px solid ${C.border}`,
                      paddingTop: 20,
                      fontWeight: 300,
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ══ */}
      <section
        ref={ctaRef}
        style={{ padding: "0 28px 120px", background: C.navy }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              ...fa(ctaVis, 0),
              position: "relative",
              overflow: "hidden",
              borderRadius: 28,
              padding: "80px 60px",
              textAlign: "center",
              background: `linear-gradient(130deg,${C.mid} 0%,rgba(43,110,245,0.18) 50%,${C.mid} 100%)`,
              border: `1px solid rgba(43,110,245,0.28)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -1,
                borderRadius: 29,
                background: `linear-gradient(90deg,${C.blue},${C.cyan},${C.blue})`,
                backgroundSize: "200%",
                animation: "borderFlow 4s linear infinite",
                opacity: 0.25,
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 1,
                borderRadius: 27,
                background: `linear-gradient(130deg,${C.mid},rgba(43,110,245,0.12),${C.mid})`,
                zIndex: 1,
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h2
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontSize: "clamp(30px,5vw,58px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  marginBottom: 18,
                }}
              >
                Ready to build something
                <br />
                <span
                  style={{
                    background: `linear-gradient(90deg,${C.blue},${C.cyan})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  extraordinary?
                </span>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.42)",
                  marginBottom: 40,
                  fontWeight: 300,
                }}
              >
                Free consultation. No strings attached. Let's talk about your
                vision.
              </p>
              <MagneticBtn
                onClick={() => scrollTo("contact")}
                style={{
                  background: `linear-gradient(135deg,${C.blue},${C.cyan})`,
                  color: "#fff",
                  fontSize: 17,
                  fontWeight: 700,
                  padding: "20px 52px",
                  borderRadius: 100,
                  boxShadow: `0 10px 48px rgba(43,110,245,0.5)`,
                  letterSpacing: "0.01em",
                }}
              >
                Get Free Consultation →
              </MagneticBtn>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section
        id="contact"
        ref={contactRef}
        className="section-p"
        style={{ padding: "120px 28px", background: C.mid }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            <div style={fa(contactVis, 0, "left")}>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: C.cyan,
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Contact
              </div>
              <h2
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontSize: "clamp(34px,5vw,58px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  marginBottom: 24,
                }}
              >
                Let's build
                <br />
                <span
                  style={{
                    background: `linear-gradient(90deg,${C.blue},${C.cyan})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  together.
                </span>
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.42)",
                  fontWeight: 300,
                  marginBottom: 44,
                }}
              >
                Drop us a message. Our team responds within 24 hours — always.
              </p>
              {[
                { icon: "✉", v: "hello@codigo.io" },
                { icon: "⊕", v: "www.codigo.io" },
                { icon: "◎", v: "Est. 2024 · Sri Lanka · Global" },
              ].map(({ icon, v }) => (
                <div
                  key={v}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 18,
                  }}
                >
                  <div
                    className="contact-icon"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: `rgba(43,110,245,0.12)`,
                      border: `1px solid ${C.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: C.cyan,
                      fontSize: 17,
                      transition: "all 0.3s",
                    }}
                  >
                    {icon}
                  </div>
                  <span
                    style={{ fontSize: 14, color: "rgba(255,255,255,0.48)" }}
                  >
                    {v}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 36,
                  flexWrap: "wrap",
                }}
              >
                {["LinkedIn", "Twitter", "Behance", "Dribbble"].map((s) => (
                  <div
                    key={s}
                    className="social-chip"
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      background: `rgba(255,255,255,0.03)`,
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                      padding: "10px 16px",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.38)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      transition: "all 0.25s",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div style={fa(contactVis, 0.2, "right")}>
              {sent ? (
                <div
                  style={{
                    background: "rgba(77,217,240,0.06)",
                    border: `1px solid rgba(77,217,240,0.3)`,
                    borderRadius: 24,
                    padding: "72px 40px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
                  <div
                    style={{
                      fontFamily: "'Cabinet Grotesk',sans-serif",
                      fontSize: 24,
                      fontWeight: 800,
                      color: C.white,
                      marginBottom: 8,
                    }}
                  >
                    Message Sent!
                  </div>
                  <div
                    style={{ fontSize: 15, color: "rgba(255,255,255,0.42)" }}
                  >
                    We'll get back to you within 24 hours.
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {[
                    { k: "name", ph: "Your Full Name", t: "text" },
                    { k: "email", ph: "Email Address", t: "email" },
                  ].map(({ k, ph, t }) => (
                    <input
                      key={k}
                      type={t}
                      placeholder={ph}
                      required
                      value={form[k]}
                      onChange={(e) =>
                        setForm({ ...form, [k]: e.target.value })
                      }
                      style={{
                        background: C.card,
                        border: `1px solid ${C.border}`,
                        borderRadius: 14,
                        padding: "18px 22px",
                        color: C.white,
                        fontSize: 15,
                        transition: "all 0.25s",
                        width: "100%",
                      }}
                    />
                  ))}
                  <select
                    value={form.service}
                    onChange={(e) =>
                      setForm({ ...form, service: e.target.value })
                    }
                    style={{
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 14,
                      padding: "18px 22px",
                      color: form.service ? C.white : "rgba(255,255,255,0.3)",
                      fontSize: 15,
                      transition: "all 0.25s",
                      width: "100%",
                      appearance: "none",
                    }}
                  >
                    <option value="" disabled>
                      Select a Service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Tell us about your project..."
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    style={{
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 14,
                      padding: "18px 22px",
                      color: C.white,
                      fontSize: 15,
                      transition: "all 0.25s",
                      resize: "vertical",
                      width: "100%",
                    }}
                  />
                  <MagneticBtn
                    type="submit"
                    style={{
                      background: `linear-gradient(135deg,${C.blue},${C.cyan})`,
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: 700,
                      padding: "20px 32px",
                      borderRadius: 100,
                      boxShadow: `0 8px 32px rgba(43,110,245,0.4)`,
                      marginTop: 6,
                    }}
                  >
                    Send Message →
                  </MagneticBtn>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer
        style={{
          background: C.dark,
          borderTop: `1px solid ${C.border}`,
          padding: "48px 28px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 40,
              marginBottom: 48,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <Logo size={28} />
                <span
                  style={{
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                  }}
                >
                  c<span style={{ color: C.cyan }}>ó</span>digo
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.3)",
                  maxWidth: 260,
                  lineHeight: 1.7,
                }}
              >
                Full-cycle digital services. Design, development & marketing —
                all under one roof.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Services
              </div>
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo("services")}
                  className="nav-lnk"
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 13,
                    padding: "5px 0",
                    transition: "color 0.2s",
                  }}
                >
                  {s.title}
                </button>
              ))}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Company
              </div>
              {["Work", "Process", "About", "Contact"].map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l.toLowerCase())}
                  className="nav-lnk"
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 13,
                    padding: "5px 0",
                    transition: "color 0.2s",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Connect
              </div>
              {["LinkedIn", "Twitter / X", "Behance", "Dribbble"].map((s) => (
                <div
                  key={s}
                  className="nav-lnk"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 13,
                    padding: "5px 0",
                    transition: "color 0.2s",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.06em",
              }}
            >
              © 2024–2026 CÓDIGO IT SOLUTIONS. ALL RIGHTS RESERVED.
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["Privacy", "Terms"].map((l) => (
                <button
                  key={l}
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: 12,
                    padding: "4px 12px",
                    letterSpacing: "0.06em",
                  }}
                  className="nav-lnk"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
