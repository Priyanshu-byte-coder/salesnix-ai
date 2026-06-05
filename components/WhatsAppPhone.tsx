"use client";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: number;
  side: "user" | "ai";
  kind: "text" | "voice";
  text?: string;
  dur?: string;
  bars?: number[];
  time: string;
}

const MSGS: Message[] = [
  { id: 1, side: "user", kind: "voice", dur: "0:06", bars: [4,7,5,9,6,8,5,7,4,8,6,5,9,7], time: "9:41 AM" },
  { id: 2, side: "ai",   kind: "text",  text: "Hey Rajan! 👋 Based on your last order:\n\n• 50× Bisleri — ₹8,000\n• 24× Lay's — ₹4,200\n\nTotal ₹12,200. Confirm?", time: "9:41 AM" },
  { id: 3, side: "user", kind: "text",  text: "Yes. Add 10 Pepsi cases too", time: "9:42 AM" },
  { id: 4, side: "ai",   kind: "text",  text: "Updated ₹18,450 ✅\nPlacing your order now...", time: "9:42 AM" },
  { id: 5, side: "ai",   kind: "text",  text: "Order #SN-4821 confirmed 🎯\nDelivery: Thursday, 10 AM", time: "9:42 AM" },
];

function VoiceBubble({ bars, dur }: { bars: number[]; dur: string }) {
  return (
    <div className="wa-voice">
      <div className="voice-play">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><path d="M0 0 L10 6 L0 12 Z"/></svg>
      </div>
      <div className="voice-bars">
        {bars.map((h, i) => <div key={i} className="vbar" style={{ height: `${h * 2 + 4}px` }}/>)}
      </div>
      <span className="voice-dur">{dur}</span>
    </div>
  );
}

export default function WhatsAppPhone() {
  const [shown, setShown] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const ids = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    function clear() {
      ids.current.forEach(clearTimeout);
      ids.current = [];
    }

    function t(fn: () => void, ms: number) {
      ids.current.push(setTimeout(fn, ms));
    }

    function cycle() {
      clear();
      setShown([]);
      setTyping(false);
      let d = 700;
      for (const m of MSGS) {
        if (m.side === "ai") {
          const ms = d;
          t(() => setTyping(true), ms);
          d += 1500;
        } else {
          d += 500;
        }
        const ms = d;
        const mid = m.id;
        t(() => { setTyping(false); setShown(p => [...p, mid]); }, ms);
        d += m.side === "user" ? 800 : 1100;
      }
      t(cycle, d + 3500);
    }

    t(cycle, 400);
    return clear;
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [shown, typing]);

  return (
    <div className="phone-scene">
      <div className="phone-glow"/>
      <div className="phone">
        <div className="phone-notch"/>
        <div className="wa-header">
          <div className="wa-avatar">S</div>
          <div>
            <div className="wa-name">Salesnix AI</div>
            <div className="wa-status">● online</div>
          </div>
          <div className="wa-actions">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e9edef" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.19 12.91"/>
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e9edef" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
        </div>
        <div className="wa-chat" ref={chatRef}>
          <div className="wa-date-sep">Today</div>
          {MSGS.filter(m => shown.includes(m.id)).map(m => (
            <div key={m.id} className={`wa-bubble ${m.side}`}>
              {m.kind === "voice"
                ? <VoiceBubble bars={m.bars!} dur={m.dur!}/>
                : m.text
              }
              <div className="bubble-meta">
                <span className="bubble-time">{m.time}</span>
                {m.side === "user" && <span className="bubble-tick">✓✓</span>}
              </div>
            </div>
          ))}
          {typing && (
            <div className="wa-typing">
              <div className="tdot"/><div className="tdot"/><div className="tdot"/>
            </div>
          )}
        </div>
        <div className="wa-inputbar">
          <div className="wa-inputfield">Message</div>
          <div className="wa-micbtn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <rect x="9" y="2" width="6" height="12" rx="3"/>
              <path d="M5 10a7 7 0 0 0 14 0"/>
              <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2"/>
              <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
