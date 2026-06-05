import Image from "next/image";
import Logo from "@/components/Logo";
import FlowDiagram from "@/components/FlowDiagram";
import IntegrationDiagram from "@/components/IntegrationDiagram";
import ConversationFlow from "@/components/ConversationFlow";
import Nav from "@/components/Nav";
import WhatsAppPhone from "@/components/WhatsAppPhone";
import QuickGuide from "@/components/QuickGuide";
import ResultsMetrics from "@/components/ResultsMetrics";
import RevenueLoss from "@/components/RevenueLoss";
import FlickeringGrid from "@/components/FlickeringGrid";
import Marquee from "@/components/Marquee";
import ShimmerButton from "@/components/ShimmerButton";

const CAPS = [
  {
    label: "Voice & Text",
    desc: "Understand natural language across both voice notes and text messages.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
      </svg>
    ),
  },
  {
    label: "Multi-Language",
    desc: "Communicate fluently in 30+ languages to reach a global audience.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
  },
  {
    label: "CRM Sync",
    desc: "Automatically log all interactions into your existing CRM or ERP.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
  },
  {
    label: "Smart Follow-ups",
    desc: "Never lose a lead with intelligent, context-aware automated follow-ups.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
  },
  {
    label: "24/7 Availability",
    desc: "Your top-performing sales agent, working around the clock without breaks.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
  },
  {
    label: "Payment Links",
    desc: "Generate and send secure payment links directly in the chat.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
      </svg>
    ),
  },
];

const STATS = [
  { val: "3×",  lbl: "Lead Conversion" },
  { val: "<1s", lbl: "Response Time" },
  { val: "24/7", lbl: "Always Active" },
  { val: "30+", lbl: "Languages" },
];

export default function Home() {
  return (
    <>
      <div className="bg-glow-blob" style={{ top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'rgba(23,168,153,0.15)' }} />
      <div className="bg-glow-blob" style={{ bottom: '20%', right: '-10%', width: '40vw', height: '40vw', background: 'rgba(23,168,153,0.1)' }} />
      
      <Nav/>

      {/* HERO */}
      <section className="hero" id="home" style={{ position: "relative" }}>
        <FlickeringGrid />
        <div className="container">
          <div className="hero-inner">
            <div>
              <h1>Automate your sales.<br/>Close on <span className="text-brand-gradient">WhatsApp.</span></h1>
              <p className="hero-sub">
                Salesnix deploys autonomous agents inside WhatsApp. They take voice &amp; text orders, qualify leads, and sync with your CRM—24/7.
              </p>
              <div className="hero-ctas">
                <ShimmerButton>Experience in 3 Clicks!</ShimmerButton>
                <button className="btn btn-ghost">Book Demo</button>
              </div>
            </div>
            <WhatsAppPhone/>
          </div>
        </div>
      </section>

      {/* REVENUE LOSS (Pain Points) */}
      <RevenueLoss />

      {/* FLOW DIAGRAM */}
      <section className="flow-section" id="flow">
        <div className="container">
          <div className="section-title-wrap">
            <span className="eyebrow">The Architecture</span>
            <h2 className="section-title">From voice note to <span className="text-brand-gradient">fulfilled order.</span></h2>
          </div>
          <div className="flow-diagram-container">
            <FlowDiagram/>
          </div>
        </div>
      </section>

      {/* HUMAN VS AI INTERACTION */}
      <section className="interaction-section">
        <div className="container">
          <div className="interaction-grid">
            <div>
              <span className="eyebrow">Natural Interactions</span>
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>Conversations that feel <span className="text-gradient">human.</span></h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
                Our AI doesn&apos;t just parse text; it understands intent, sentiment, and context. It handles interruptions, multi-turn conversations, and switches between voice and text seamlessly.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-muted)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ color: "var(--brand)" }}>✓</span> Voice-to-text accuracy</li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ color: "var(--brand)" }}>✓</span> Real-time latency</li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ color: "var(--brand)" }}>✓</span> Contextual memory</li>
              </ul>
            </div>
            <div className="voice-visualizer">
              <ConversationFlow />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK GUIDE (Setup) */}
      <QuickGuide />

      {/* CAPABILITIES */}
      <section className="caps-section" id="capabilities">
        <div className="container">
          <div className="section-title-wrap">
            <span className="eyebrow">Capabilities</span>
            <h2 className="section-title">Everything you need to <span className="text-brand-gradient">scale.</span></h2>
          </div>
          <div className="caps-grid">
            {CAPS.map((c, i) => (
              <div key={i} className="cap-card">
                <div className="cap-icon">{c.icon}</div>
                <div className="cap-label">{c.label}</div>
                <div className="cap-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION DIAGRAM & MARQUEE */}
      <section className="flow-section" style={{ paddingBottom: "2rem" }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="eyebrow">Seamless Sync</span>
            <h2 className="section-title">Connects with your <span className="text-gradient">entire stack.</span></h2>
          </div>
          <div className="flow-diagram-container" style={{ marginBottom: "4rem" }}>
            <IntegrationDiagram />
          </div>
        </div>

        {/* MARQUEE */}
        <Marquee pauseOnHover>
          <div className="marquee-logos">
            {[
              { src: "/logos/whatsapp.svg",   alt: "WhatsApp"   },
              { src: "/logos/salesforce.svg", alt: "Salesforce" },
              { src: "/logos/hubspot.svg",    alt: "HubSpot"    },
              { src: "/logos/shopify.svg",    alt: "Shopify"    },
              { src: "/logos/zoho.svg",       alt: "Zoho"       },
              { src: "/logos/stripe.svg",     alt: "Stripe"     },
              { src: "/logos/razorpay.svg",   alt: "Razorpay"   },
            ].map((logo) => (
              <div key={logo.alt} className="marquee-logo-item">
                <Image src={logo.src} alt={logo.alt} width={32} height={32} unoptimized />
                <span>{logo.alt}</span>
              </div>
            ))}
          </div>
        </Marquee>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-row">
            {STATS.map((s, i) => (
              <div key={i} className="stat">
                <div className="stat-val">{s.val}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS METRICS (Value Add) */}
      <section className="metrics-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="eyebrow">The ROI</span>
            <h2 className="section-title">Results with <span className="text-brand-gradient">Salesnix</span></h2>
            <p style={{color: "var(--text-muted)", marginTop: "1rem"}}>Outperforming human field force across all KPIs</p>
          </div>
          <ResultsMetrics />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="bg-glow-blob" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'rgba(23,168,153,0.2)' }} />
        <div className="container">
          <div className="cta-wrap">
            <h2>Ready to transform your sales operations?</h2>
            <p>Deploy your dedicated enterprise agent in minutes and start capturing lost revenue.</p>
            <div className="cta-row">
              <input type="email" className="cta-input" placeholder="Enter your work email"/>
              <button className="btn btn-teal">Get Started Free</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <Logo scale={0.9}/>
            <ul className="footer-links">
              <li><a href="#">Platform</a></li>
              <li><a href="#">Solutions</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Docs</a></li>
            </ul>
            <span className="footer-copy">© 2026 Salesnix AI. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
