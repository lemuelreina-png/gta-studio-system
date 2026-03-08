const priceTicks = ['80,000', '78,000', '76,000', '74,000', '72,000', '70,000', '68,000', '66,000', '64,000', '62,000', '60,000'];
const timeTicks = ['Jan 14', 'Jan 21', 'Jan 28', 'Feb 4', 'Feb 11', 'Feb 18', 'Feb 25'];
const rangeButtons = ['1D', '1W', '1M', 'YTD', '1Y', '5Y', 'All'];

export default function TradingZonesPage() {
  return (
    <main className="workspace">
      <div className="screen">
        <div className="topbar">
          <div className="ticker-badge">BTC ⚙</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="price-display">
              $68,290.00 <span className="price-change">▲ $8,053 (0.02%)</span>
            </span>
            <span style={{ color: '#6b7280', fontSize: 10 }}>O 67992 L 67519 H 67518 V 1132</span>
          </div>
          <div className="market-status">●● Market Closed ●</div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, color: '#8fb3d9', fontSize: 18 }}>⬆ ⭐ ⚙ ✕</div>
        </div>

        <div className="drawtoolsbar">
          <span className="draw-btn">✏</span>
          <span className="draw-sep" />
          <span className="draw-btn">◻</span>
          <span className="draw-btn">⟺</span>
          <span className="draw-btn">○</span>
          <span className="draw-sep" />
          <span className="draw-btn">🔗</span>
          <span className="draw-btn">📌</span>
          <span className="draw-sep" />
          <span className="draw-btn">↩</span>
          <span className="draw-btn">🗑</span>
        </div>

        <div className="toolbar">
          {['↗', '✏', '➖', '◻', '≡', '↔', '⚙', '📐', '🔲', 'Σ', '◀▶', '☆', '📊'].map((item, index) => (
            <div key={item + index} className="tool-btn" style={index === 5 || index === 10 ? { marginTop: 8 } : undefined}>
              {item}
            </div>
          ))}
        </div>

        <div className="chart-area">
          <div className="grid-h" style={{ top: '20%' }} />
          <div className="grid-h" style={{ top: '40%' }} />
          <div className="grid-h" style={{ top: '60%' }} />
          <div className="grid-h" style={{ top: '80%' }} />
          <svg width="100%" height="100%" viewBox="0 0 1160 450" role="img" aria-label="Trading chart">
            <line x1="0" y1="60" x2="1160" y2="60" stroke="#4ade80" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.6" />
            <text x="5" y="56" fill="#4ade80" fontSize="9">1.618 — 77249</text>
            <line x1="0" y1="140" x2="1160" y2="140" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.6" />
            <text x="5" y="136" fill="#22d3ee" fontSize="9">1.000 — 70522</text>
            <line x1="0" y1="220" x2="1160" y2="220" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.6" />
            <text x="5" y="216" fill="#f59e0b" fontSize="9">0.618 — 65166</text>
            <line x1="0" y1="290" x2="1160" y2="290" stroke="#ec4899" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.6" />
            <text x="5" y="286" fill="#ec4899" fontSize="9">0.382 — 62582</text>
            <line x1="0" y1="380" x2="1160" y2="380" stroke="#8b5cf6" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.6" />
            <text x="5" y="376" fill="#8b5cf6" fontSize="9">0.000 — 60023</text>

            <g opacity="0.9">
              <rect x="130" y="30" width="18" height="140" fill="#ef4444" rx="1" />
              <line x1="139" y1="20" x2="139" y2="170" stroke="#ef4444" strokeWidth="1.5" />
              <rect x="155" y="50" width="18" height="130" fill="#ef4444" rx="1" />
              <line x1="164" y1="40" x2="164" y2="185" stroke="#ef4444" strokeWidth="1.5" />
              <rect x="180" y="90" width="18" height="160" fill="#ef4444" rx="1" />
              <line x1="189" y1="75" x2="189" y2="255" stroke="#ef4444" strokeWidth="1.5" />
              {[205, 230, 255, 366, 432, 498, 564, 640, 700, 760, 820, 880, 940, 1000, 1060, 1120].map((x, i) => (
                <rect key={`r-${x}`} x={x} y={[140, 200, 240, 260, 240, 220, 200, 188, 178, 168, 162, 156, 150, 144, 138, 132][i]} width={i < 3 ? 18 : 16} height={[150, 120, 100, 45, 45, 30, 28, 28, 22, 20, 20, 18, 16, 14, 12, 10][i]} fill="#ef4444" rx="1" />
              ))}
              {[300, 322, 344, 388, 410, 454, 476, 520, 542, 600, 620, 660, 680, 720, 740, 780, 800, 840, 860, 900, 920, 960, 980, 1020, 1040, 1080, 1100, 1140].map((x, i) => (
                <rect key={`g-${x}`} x={x} y={[300, 290, 270, 255, 245, 235, 225, 215, 208, 195, 192, 184, 180, 174, 170, 166, 164, 160, 158, 154, 152, 148, 146, 142, 140, 136, 134, 130][i]} width={16} height={[60, 50, 55, 50, 40, 35, 38, 35, 32, 30, 25, 26, 25, 24, 22, 22, 18, 18, 16, 16, 14, 14, 12, 12, 14, 10, 12, 12][i]} fill="#22c55e" rx="1" />
              ))}
            </g>

            <g opacity="0.5">
              {[130, 155, 180, 205, 230, 255, 366].map((x, i) => (
                <rect key={`v-r-${x}`} x={x} y={[400, 395, 388, 410, 405, 412, 418][i]} width={i < 6 ? 18 : 16} height={[30, 35, 42, 20, 25, 18, 12][i]} fill="#ef4444" rx="1" />
              ))}
              {[300, 322, 344, 388, 410].map((x, i) => (
                <rect key={`v-g-${x}`} x={x} y={[415, 410, 412, 415, 417][i]} width={16} height={[15, 20, 18, 15, 13][i]} fill="#22c55e" rx="1" />
              ))}
            </g>

            <line x1="0" y1="200" x2="1160" y2="200" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" opacity="0.8" />
            <line x1="250" y1="380" x2="1160" y2="120" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.5" />
          </svg>
        </div>

        <div className="price-scale">
          {priceTicks.slice(0, 7).map((price) => (
            <div key={price} className="price-tick">{price}</div>
          ))}
          <div className="price-tick current">68,290</div>
          {priceTicks.slice(7).map((price) => (
            <div key={price} className="price-tick">{price}</div>
          ))}
        </div>

        <div className="time-axis">
          {timeTicks.map((tick) => (
            <span key={tick} className="time-tick">{tick}</span>
          ))}
        </div>

        <div className="time-quick">
          {rangeButtons.map((btn) => (
            <span key={btn} className={`tq-btn ${btn === '1M' ? 'active' : ''}`}>{btn}</span>
          ))}
          <span style={{ color: '#6b7280', fontSize: 12, marginLeft: 10 }}>✕6 +</span>
          <span style={{ marginLeft: 'auto', color: '#6b7280', fontSize: 11 }}>🔒 Auto-scale</span>
        </div>

        <div className="interval-bar">
          <span style={{ color: '#22c55e', fontSize: 14 }}>●</span>
          <select className="interval-select" defaultValue="Interval: 4H ▼">
            <option>Interval: 4H ▼</option>
          </select>
          <span style={{ color: '#6b7280', fontSize: 11 }}>📊 2.3</span>
          <span style={{ color: '#6b7280', fontSize: 11 }}>💲</span>
          <span style={{ marginLeft: 'auto', color: '#6b7280', fontSize: 11 }}>🔒 Auto-scale</span>
        </div>

        <div className="indicator-pane">
          <div className="indicator-label">MACD 2, 36, 9</div>
          <svg width="100%" height="100%" viewBox="0 0 1160 60" preserveAspectRatio="none">
            <polyline points="0,35 100,32 200,28 300,25 400,22 500,20 600,22 700,25 800,28 900,30 1000,27 1100,24 1160,22" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.8" />
            <polyline points="0,38 100,35 200,32 300,30 400,28 500,26 600,28 700,30 800,32 900,34 1000,31 1100,28 1160,26" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6" />
          </svg>
        </div>
      </div>
    </main>
  );
}
