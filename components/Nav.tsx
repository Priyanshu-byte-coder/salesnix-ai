"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`${scrolled ? "scrolled" : ""}${menuOpen ? " nav-open" : ""}`}>
      <div style={{ width: "100%", padding: "0 4%", maxWidth: "1920px", margin: "0 auto" }}>
        <div className="nav-inner">
          <div className="nav-logo">
            <Logo scale={1} />
          </div>
          <ul className={`nav-links${menuOpen ? " nav-links--open" : ""}`}>
            <li><a href="#flow" onClick={() => setMenuOpen(false)}>How it Works</a></li>
            <li><a href="#capabilities" onClick={() => setMenuOpen(false)}>Features</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Pricing</a></li>
          </ul>
          <div className="nav-right" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <button className="btn btn-teal" style={{ padding: "0.62rem 1.3rem", fontSize: "0.875rem" }}>
              Book a Demo
            </button>
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-line${menuOpen ? " open" : ""}`} />
              <span className={`hamburger-line${menuOpen ? " open" : ""}`} />
              <span className={`hamburger-line${menuOpen ? " open" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
