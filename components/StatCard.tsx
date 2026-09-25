import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  change?: number
  changeLabel?: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  gradientFrom?: string
  gradientTo?: string
  delay?: number
}

export function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  changeLabel = 'vs last period',
  icon: Icon,
  iconColor,
  gradientFrom = '#00d4ff',
  gradientTo = '#a855f7',
  delay = 0
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    const duration = 1500
    const steps = 40
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
    if (num >= 1000) return num.toLocaleString()
    return num.toString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-panel p-5 relative overflow-hidden card-lift"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
              {title}
            </p>
          </div>
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${iconColor}20, ${iconColor}10)`,
              boxShadow: `0 0 20px ${iconColor}30`,
              color: iconColor
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>
        
        <div className="mb-3">
          <span 
            className="text-3xl font-display tracking-tight"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {prefix}{formatNumber(displayValue)}{suffix}
          </span>
        </div>
        
        {change !== undefined && (
          <div className="flex items-center gap-2">
            {change >= 0 ? (
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
            )}
            <span className={`text-xs font-mono ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span className="text-[10px] font-mono text-white/40">{changeLabel}</span>
          </div>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${gradientFrom}, ${gradientTo}, transparent)`
        }}
      />
    </motion.div>
  )
}

export default StatCard
