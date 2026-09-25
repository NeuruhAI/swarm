import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface DataPoint {
  time: string
  value: number
  secondary?: number
}

interface PerformanceChartProps {
  data: DataPoint[]
  title: string
  color?: string
  showSecondary?: boolean
  secondaryColor?: string
}

export function PerformanceChart({
  data,
  title,
  color = '#00d4ff',
  showSecondary = false,
  secondaryColor = '#a855f7'
}: PerformanceChartProps) {
  // Calculate max value for scaling
  useMemo(() => {
    return Math.max(...data.map(d => Math.max(d.value, d.secondary || 0)))
  }, [data])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="text-[10px] font-mono text-white/50 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p 
              key={index}
              className="text-xs font-mono"
              style={{ color: entry.color }}
            >
              {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="glass-panel p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display text-white/80 uppercase tracking-wider">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          />
          {showSecondary && (
            <div 
              className="w-2 h-2 rounded-full"
              style={{ background: secondaryColor, boxShadow: `0 0 8px ${secondaryColor}` }}
            />
          )}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
            {showSecondary && (
              <linearGradient id={`gradient-${secondaryColor}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={secondaryColor} stopOpacity={0}/>
              </linearGradient>
            )}
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.05)" 
            vertical={false}
          />
          
          <XAxis 
            dataKey="time" 
            stroke="rgba(255,255,255,0.2)" 
            fontSize={10}
            fontFamily="JetBrains Mono"
            tickLine={false}
            axisLine={false}
          />
          
          <YAxis 
            stroke="rgba(255,255,255,0.2)" 
            fontSize={10}
            fontFamily="JetBrains Mono"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
              return value
            }}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
            className="chart-glow"
          />
          
          {showSecondary && (
            <Area
              type="monotone"
              dataKey="secondary"
              stroke={secondaryColor}
              strokeWidth={2}
              fill={`url(#gradient-${secondaryColor})`}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PerformanceChart
