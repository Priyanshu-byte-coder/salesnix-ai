"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <div className="nav-inner">
          <Logo scale={1} />
          <ul className="nav-links">
            <li><a href="#flow">How it Works</a></li>
            <li><a href="#capabilities">Features</a></li>
            <li><a href="#contact">Pricing</a></li>
          </ul>
          <div className="nav-right" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <button className="btn btn-teal" style={{ padding: "0.62rem 1.3rem", fontSize: "0.875rem" }}>
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
