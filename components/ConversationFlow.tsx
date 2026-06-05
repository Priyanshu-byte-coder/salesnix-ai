"use client";

import { useEffect, useState } from 'react';

export default function ConversationFlow() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
      
      {/* Human Node */}
      <div style={{ 
        alignSelf: 'flex-end', 
        background: activeNode === 0 || activeNode === 2 ? 'var(--brand)' : 'rgba(255,255,255,0.05)',
        color: activeNode === 0 || activeNode === 2 ? '#fff' : 'var(--text-muted)',
        padding: '1rem 1.5rem', 
        borderRadius: '20px 20px 0 20px',
        maxWidth: '80%',
        transition: 'all 0.5s ease',
        transform: activeNode === 0 || activeNode === 2 ? 'scale(1.02)' : 'scale(1)',
        boxShadow: activeNode === 0 || activeNode === 2 ? '0 10px 25px rgba(23,168,153,0.4)' : 'none',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '4px' }}>Human</div>
        <div style={{ fontWeight: 500 }}>
          {activeNode < 2 ? "I need 50 units of the new product, how much?" : "Great, send me the payment link."}
        </div>
      </div>

      {/* Connection Line */}
      <div style={{ 
        position: 'absolute', 
        left: '20%', 
        top: '25%', 
        bottom: '25%', 
        width: '2px', 
        background: 'linear-gradient(to bottom, var(--brand), transparent)',
        opacity: activeNode === 1 || activeNode === 3 ? 0.5 : 0.1,
        transition: 'opacity 0.5s ease'
      }} />

      {/* AI Processing Element */}
      <div style={{
        alignSelf: 'center',
        display: 'flex',
        gap: '4px',
        opacity: (activeNode === 0 || activeNode === 2) ? 0 : 1,
        transition: 'opacity 0.3s ease'
      }}>
        <div className="badge-pulse" style={{ width: '6px', height: '6px', background: 'var(--brand)' }}></div>
        <div className="badge-pulse" style={{ width: '6px', height: '6px', background: 'var(--brand)', animationDelay: '0.2s' }}></div>
        <div className="badge-pulse" style={{ width: '6px', height: '6px', background: 'var(--brand)', animationDelay: '0.4s' }}></div>
      </div>

      {/* AI Node */}
      <div style={{ 
        alignSelf: 'flex-start', 
        background: activeNode === 1 || activeNode === 3 ? 'var(--bg-panel)' : 'rgba(255,255,255,0.05)',
        color: activeNode === 1 || activeNode === 3 ? 'var(--text-main)' : 'var(--text-muted)',
        padding: '1rem 1.5rem', 
        borderRadius: '20px 20px 20px 0',
        maxWidth: '80%',
        transition: 'all 0.5s ease',
        transform: activeNode === 1 || activeNode === 3 ? 'scale(1.02)' : 'scale(1)',
        boxShadow: activeNode === 1 || activeNode === 3 ? '0 10px 25px rgba(0,0,0,0.5)' : 'none',
        border: activeNode === 1 || activeNode === 3 ? '1px solid var(--border-brand)' : '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--brand)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          AI Agent
        </div>
        <div style={{ fontWeight: 500 }}>
          {activeNode < 2 ? "That would be $4,500 total. We have them in stock and can ship tomorrow." : "Generating your secure link now... Here it is: pay.salesnix.com/link"}
        </div>
      </div>

    </div>
  );
}
