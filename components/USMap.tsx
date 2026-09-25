import { useState, useRef } from 'react'
// Simplified US state paths (lower 48)
const statePaths: Record<string, string> = {
  AL: 'M 620 380 L 625 380 L 630 385 L 635 420 L 630 450 L 620 460 L 610 450 L 605 420 L 610 390 Z',
  AZ: 'M 180 320 L 240 320 L 240 380 L 200 420 L 160 380 L 160 340 Z',
  AR: 'M 520 340 L 560 340 L 565 380 L 560 400 L 520 400 L 515 370 Z',
  CA: 'M 50 180 L 120 180 L 140 240 L 140 320 L 100 380 L 60 360 L 40 280 L 30 220 Z',
  CO: 'M 280 260 L 360 260 L 360 320 L 280 320 Z',
  CT: 'M 840 180 L 860 175 L 865 190 L 855 195 L 840 190 Z',
  DE: 'M 800 260 L 815 255 L 820 270 L 805 275 Z',
  FL: 'M 640 420 L 680 420 L 700 440 L 710 480 L 690 520 L 660 540 L 640 520 L 630 480 L 635 440 Z',
  GA: 'M 640 360 L 680 360 L 690 400 L 680 430 L 640 430 L 630 390 Z',
  ID: 'M 160 100 L 200 100 L 210 160 L 200 200 L 160 180 L 150 140 Z',
  IL: 'M 580 220 L 620 220 L 625 280 L 615 320 L 580 310 L 575 260 Z',
  IN: 'M 620 220 L 650 220 L 655 280 L 645 310 L 620 300 Z',
  IA: 'M 520 200 L 580 200 L 585 240 L 575 260 L 520 250 Z',
  KS: 'M 400 280 L 480 280 L 485 340 L 400 340 Z',
  KY: 'M 620 300 L 680 300 L 685 330 L 670 350 L 620 340 Z',
  LA: 'M 520 420 L 570 420 L 575 450 L 560 470 L 520 460 L 510 440 Z',
  ME: 'M 880 100 L 910 80 L 920 120 L 900 160 L 870 140 Z',
  MD: 'M 780 250 L 810 240 L 815 270 L 790 280 Z',
  MA: 'M 850 160 L 880 150 L 885 180 L 860 190 Z',
  MI: 'M 620 160 L 660 150 L 670 200 L 650 240 L 620 220 Z',
  MN: 'M 480 120 L 560 120 L 570 160 L 560 200 L 480 190 Z',
  MS: 'M 560 380 L 600 380 L 605 420 L 595 450 L 560 440 L 555 400 Z',
  MO: 'M 500 260 L 580 260 L 585 310 L 570 340 L 500 330 Z',
  MT: 'M 220 80 L 340 80 L 350 140 L 330 160 L 220 150 Z',
  NE: 'M 360 220 L 460 220 L 465 260 L 450 280 L 360 270 Z',
  NV: 'M 100 200 L 160 200 L 170 280 L 140 320 L 90 280 Z',
  NH: 'M 860 140 L 880 130 L 885 170 L 865 175 Z',
  NJ: 'M 820 220 L 845 215 L 850 250 L 825 255 Z',
  NM: 'M 240 340 L 320 340 L 320 420 L 240 420 Z',
  NY: 'M 800 160 L 860 140 L 870 200 L 850 230 L 800 220 Z',
  NC: 'M 720 320 L 780 310 L 790 350 L 770 370 L 720 360 Z',
  ND: 'M 360 100 L 460 100 L 465 150 L 450 160 L 360 150 Z',
  OH: 'M 660 240 L 710 230 L 720 280 L 700 300 L 660 290 Z',
  OK: 'M 400 340 L 480 340 L 485 390 L 470 400 L 400 390 Z',
  OR: 'M 80 120 L 160 120 L 170 180 L 140 200 L 70 180 Z',
  PA: 'M 740 220 L 790 210 L 800 260 L 760 270 Z',
  RI: 'M 865 185 L 880 180 L 882 195 L 868 200 Z',
  SC: 'M 700 360 L 750 350 L 760 390 L 740 410 L 700 400 Z',
  SD: 'M 360 150 L 460 150 L 465 200 L 450 220 L 360 210 Z',
  TN: 'M 600 320 L 700 310 L 710 350 L 690 360 L 600 350 Z',
  TX: 'M 320 400 L 480 400 L 500 450 L 480 520 L 400 540 L 340 500 L 320 440 Z',
  UT: 'M 200 240 L 260 240 L 270 300 L 240 320 L 190 300 Z',
  VT: 'M 850 130 L 870 120 L 875 160 L 855 165 Z',
  VA: 'M 740 290 L 790 280 L 800 320 L 770 340 L 740 330 Z',
  WA: 'M 80 60 L 160 60 L 170 120 L 140 130 L 70 110 Z',
  WV: 'M 700 270 L 740 260 L 750 300 L 720 310 Z',
  WI: 'M 540 160 L 590 150 L 600 200 L 580 220 L 540 210 Z',
  WY: 'M 260 160 L 340 160 L 350 220 L 330 240 L 260 230 Z',
}

// City coordinates (approximate for the simplified map)
const cities = [
  { name: 'Seattle', state: 'WA', x: 110, y: 90 },
  { name: 'Portland', state: 'OR', x: 100, y: 150 },
  { name: 'San Francisco', state: 'CA', x: 70, y: 250 },
  { name: 'Los Angeles', state: 'CA', x: 90, y: 310 },
  { name: 'San Diego', state: 'CA', x: 110, y: 340 },
  { name: 'Phoenix', state: 'AZ', x: 200, y: 350 },
  { name: 'Las Vegas', state: 'NV', x: 130, y: 290 },
  { name: 'Salt Lake City', state: 'UT', x: 230, y: 270 },
  { name: 'Denver', state: 'CO', x: 320, y: 290 },
  { name: 'Albuquerque', state: 'NM', x: 260, y: 370 },
  { name: 'Dallas', state: 'TX', x: 440, y: 420 },
  { name: 'Houston', state: 'TX', x: 460, y: 460 },
  { name: 'Austin', state: 'TX', x: 420, y: 450 },
  { name: 'Oklahoma City', state: 'OK', x: 440, y: 360 },
  { name: 'Kansas City', state: 'MO', x: 510, y: 290 },
  { name: 'Minneapolis', state: 'MN', x: 520, y: 160 },
  { name: 'Chicago', state: 'IL', x: 600, y: 240 },
  { name: 'Detroit', state: 'MI', x: 660, y: 220 },
  { name: 'Indianapolis', state: 'IN', x: 640, y: 270 },
  { name: 'Columbus', state: 'OH', x: 690, y: 260 },
  { name: 'Atlanta', state: 'GA', x: 670, y: 370 },
  { name: 'Miami', state: 'FL', x: 720, y: 490 },
  { name: 'Tampa', state: 'FL', x: 690, y: 460 },
  { name: 'Charlotte', state: 'NC', x: 740, y: 350 },
  { name: 'Nashville', state: 'TN', x: 640, y: 330 },
  { name: 'Memphis', state: 'TN', x: 590, y: 340 },
  { name: 'New Orleans', state: 'LA', x: 550, y: 440 },
  { name: 'Boston', state: 'MA', x: 870, y: 170 },
  { name: 'New York', state: 'NY', x: 830, y: 200 },
  { name: 'Philadelphia', state: 'PA', x: 800, y: 240 },
  { name: 'Baltimore', state: 'MD', x: 780, y: 260 },
  { name: 'Washington DC', state: 'MD', x: 790, y: 280 },
  { name: 'Richmond', state: 'VA', x: 760, y: 310 },
  { name: 'Raleigh', state: 'NC', x: 760, y: 340 },
  { name: 'Pittsburgh', state: 'PA', x: 750, y: 250 },
  { name: 'Cleveland', state: 'OH', x: 700, y: 240 },
  { name: 'St Louis', state: 'MO', x: 570, y: 290 },
  { name: 'Milwaukee', state: 'WI', x: 590, y: 210 },
  { name: 'Des Moines', state: 'IA', x: 530, y: 230 },
  { name: 'Omaha', state: 'NE', x: 470, y: 240 },
  { name: 'Boise', state: 'ID', x: 180, y: 150 },
  { name: 'Billings', state: 'MT', x: 280, y: 120 },
  { name: 'Cheyenne', state: 'WY', x: 300, y: 200 },
  { name: 'Fargo', state: 'ND', x: 460, y: 120 },
  { name: 'Sioux Falls', state: 'SD', x: 470, y: 180 },
  { name: 'Little Rock', state: 'AR', x: 540, y: 360 },
  { name: 'Jackson', state: 'MS', x: 580, y: 400 },
  { name: 'Birmingham', state: 'AL', x: 630, y: 390 },
]

interface Agent {
  id: string
  city: string
  state: string
  x: number
  y: number
  legion: string
  color: string
  name: string
}

interface USMapProps {
  agents: Agent[]
  isRunning: boolean
  onAgentClick?: (agent: Agent) => void
}

export function USMap({ agents, isRunning, onAgentClick }: USMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Get agent count per state
  const getAgentCountForState = (stateCode: string) => {
    return agents.filter(a => a.state === stateCode).length
  }

  // Get agents for a specific city
  const getAgentsForCity = (cityName: string) => {
    return agents.filter(a => a.city === cityName)
  }

  return (
    <div className="us-map-container relative">
      <svg 
        ref={svgRef}
        viewBox="0 0 950 600" 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' }}
      >
        <defs>
          {/* Gradient for active states */}
          <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,212,255,0.2)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.2)" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* State paths */}
        {Object.entries(statePaths).map(([code, path]) => {
          const agentCount = getAgentCountForState(code)
          const isHovered = hoveredState === code
          const hasAgents = agentCount > 0
          
          return (
            <path
              key={code}
              d={path}
              className="state-path"
              fill={hasAgents ? 'url(#stateGradient)' : isHovered ? 'rgba(0,212,255,0.1)' : 'rgba(30,35,50,0.6)'}
              stroke={hasAgents ? 'rgba(0,212,255,0.5)' : isHovered ? 'rgba(0,212,255,0.4)' : 'rgba(100,110,140,0.3)'}
              strokeWidth={hasAgents ? 1.5 : 0.5}
              onMouseEnter={() => setHoveredState(code)}
              onMouseLeave={() => setHoveredState(null)}
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          )
        })}

        {/* City markers */}
        {cities.map((city) => {
          const cityAgents = getAgentsForCity(city.name)
          const hasAgents = cityAgents.length > 0
          
          if (!hasAgents) return null
          
          return (
            <g key={city.name}>
              {/* City dot */}
              <circle
                cx={city.x}
                cy={city.y}
                r={Math.min(8, 3 + cityAgents.length * 0.5)}
                fill={cityAgents[0]?.color || '#00d4ff'}
                filter="url(#glow)"
                className="cursor-pointer"
                onClick={() => {
                  const agent = cityAgents[0]
                  if (agent) {
                    onAgentClick?.(agent)
                  }
                }}
              />
              
              {/* Pulse ring */}
              {isRunning && (
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={12}
                  fill="none"
                  stroke={cityAgents[0]?.color || '#00d4ff'}
                  strokeWidth={1}
                  opacity={0.5}
                >
                  <animate
                    attributeName="r"
                    values="12;20;12"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0;0.5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              
              {/* Agent count label */}
              {cityAgents.length > 1 && (
                <text
                  x={city.x}
                  y={city.y - 15}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  fontWeight="600"
                >
                  {cityAgents.length}
                </text>
              )}
            </g>
          )
        })}

        {/* Connection lines between nearby agents */}
        {agents.slice(0, 50).map((agent, i) => {
          const nearbyAgents = agents.slice(i + 1, i + 4)
          return nearbyAgents.map((other, j) => {
            const distance = Math.sqrt(
              Math.pow(agent.x - other.x, 2) + Math.pow(agent.y - other.y, 2)
            )
            if (distance > 150) return null
            
            return (
              <line
                key={`${i}-${j}`}
                x1={agent.x}
                y1={agent.y}
                x2={other.x}
                y2={other.y}
                stroke={agent.color}
                strokeWidth={0.5}
                opacity={0.3 - distance * 0.002}
                className="connection-line"
              />
            )
          })
        })}
      </svg>

      {/* Hover tooltip */}
      {hoveredState && (
        <div 
          className="absolute glass-panel px-3 py-2 text-sm"
          style={{ 
            left: '50%', 
            top: '10px',
            transform: 'translateX(-50%)'
          }}
        >
          <span className="font-mono text-cyan-400">{hoveredState}</span>
          <span className="text-white/60 ml-2">
            {getAgentCountForState(hoveredState)} agents
          </span>
        </div>
      )}

      {/* Stats overlay */}
      <div className="absolute bottom-4 left-4 glass-panel px-4 py-3">
        <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">Active Markets</div>
        <div className="text-2xl font-display text-cyan-400">
          {new Set(agents.map(a => a.city)).size}
        </div>
        <div className="text-xs font-mono text-white/40 mt-1">cities covered</div>
      </div>

      <div className="absolute bottom-4 right-4 glass-panel px-4 py-3">
        <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">Total Agents</div>
        <div className="text-2xl font-display text-purple-400">{agents.length}</div>
        <div className="text-xs font-mono text-white/40 mt-1">on map</div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 glass-panel px-3 py-2">
        <div className="text-[10px] font-mono text-white/50 uppercase mb-2">Legions</div>
        <div className="space-y-1.5">
          {[
            { name: 'Acquisition', color: '#00d4ff' },
            { name: 'Capital', color: '#22c55e' },
            { name: 'Development', color: '#f59e0b' },
            { name: 'Exit', color: '#ec4899' },
            { name: 'Counter-Intel', color: '#ef4444' },
            { name: 'Tokenization', color: '#8b5cf6' },
            { name: 'Meta', color: '#06b6d4' },
          ].map((legion) => (
            <div key={legion.name} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: legion.color, boxShadow: `0 0 6px ${legion.color}` }}
              />
              <span className="text-[10px] font-mono text-white/70">{legion.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
