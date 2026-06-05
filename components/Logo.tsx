export default function Logo({ scale = 1 }: { scale?: number }) {
  const width = 300 * scale;
  const height = 80 * scale;

  return (
    <svg width={width} height={height} viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="#17A899" fontFamily="Montserrat, Inter, system-ui, sans-serif">
        {/* Main SALESNIX text */}
        <text x="2" y="45" fontWeight="800" fontSize="42" letterSpacing="-1">S</text>
        <text x="36" y="45" fontWeight="800" fontSize="42" letterSpacing="0">ALESNIX</text>
        
        {/* Subtitle */}
        <text x="2" y="65" fontWeight="500" fontSize="11" letterSpacing="0.5" fill="#6b7280">AI POWERED CONVERSATIONS &amp; SALES</text>
      </g>

      {/* Signal Waves on the 'S' */}
      <g stroke="#17A899" strokeWidth="3.5" strokeLinecap="round" fill="none">
        {/* Inner Wave */}
        <path d="M 27 22 Q 33 16 30 10" />
        {/* Middle Wave */}
        <path d="M 33 26 Q 42 16 37 6" />
        {/* Outer Wave */}
        <path d="M 39 30 Q 52 16 44 2" />
      </g>
    </svg>
  );
}
