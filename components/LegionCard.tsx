import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, ChevronDown, ChevronUp, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LegionIcon3D } from './LegionIcon3D'

interface Agent {
  id: string
  name: string
  role: string
  status: 'active' | 'idle' | 'busy'
  lastActivity: string
  performance: number
}

interface LegionCardProps {
  id: string
  name: string
  count: number
  active: number
  color: string
  description: string
  capabilities: string[]
  agents: Agent[]
  onSpawn: (count: number) => void
  delay?: number
}

const statusColors = {
  active: 'bg-green-500',
  idle: 'bg-gray-500',
  busy: 'bg-yellow-500'
}

export function LegionCard({
  id,
  name,
  count,
  active,
  color,
  description,
  capabilities,
  agents,
  onSpawn,
  delay = 0
}: LegionCardProps) {
  const [showAgents, setShowAgents] = useState(false)
  const activityPercent = (active / count) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="legion-card"
      style={{ '--legion-color': color } as React.CSSProperties}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* 3D Icon */}
          <div className="flex-shrink-0">
            <LegionIcon3D legionId={id} color={color} size={70} />
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-display truncate" style={{ color }}>
                {name}
              </h3>
              <div 
                className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase"
                style={{ background: `${color}20`, color }}
              >
                Active
              </div>
            </div>
            <p className="text-xs text-white/50 mb-3">{description}</p>
            
            {/* Stats */}
            <div className="flex items-center gap-6 mb-3">
              <div>
                <div className="text-[10px] font-mono text-white/40 uppercase">Total</div>
                <div className="text-xl font-display" style={{ color }}>
                  {count.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/40 uppercase">Active</div>
                <div className="text-xl font-display text-white">
                  {active.toLocaleString()}
                </div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mb-4">
              <Progress 
                value={activityPercent} 
                className="h-1.5"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] font-mono text-white/40">
                  {activityPercent.toFixed(1)}% Active
                </span>
              </div>
            </div>
            
            {/* Capabilities */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {capabilities.map((cap, i) => (
                <span 
                  key={i}
                  className="text-[9px] px-2 py-1 rounded-full bg-white/5 font-mono text-white/60"
                >
                  {cap.toUpperCase()}
                </span>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 text-xs font-mono btn-shine"
                onClick={() => onSpawn(10)}
              >
                <Plus className="w-3 h-3 mr-1" />
                SPAWN 10
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 text-xs font-mono btn-shine"
                onClick={() => onSpawn(50)}
              >
                <Plus className="w-3 h-3 mr-1" />
                SPAWN 50
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Agent List Toggle */}
      <div 
        className="px-5 py-3 border-t border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setShowAgents(!showAgents)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" style={{ color }} />
            <span className="text-xs font-mono text-white/60">
              {agents.length} Agents Online
            </span>
          </div>
          {showAgents ? (
            <ChevronUp className="w-4 h-4 text-white/40" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/40" />
          )}
        </div>
      </div>
      
      {/* Agent List */}
      {showAgents && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-white/5"
        >
          <ScrollArea className="h-[180px]">
            <div className="p-3 space-y-1">
              {agents.map((agent) => (
                <div 
                  key={agent.id}
                  className="agent-item"
                >
                  <div className={`w-2 h-2 rounded-full ${statusColors[agent.status]} status-dot`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-white truncate">{agent.name}</span>
                      <span className="text-[10px] font-mono text-white/40">{agent.lastActivity}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[10px] text-white/50">{agent.role}</span>
                      <span 
                        className="text-[10px] font-mono"
                        style={{ color: agent.performance > 80 ? '#22c55e' : '#f59e0b' }}
                      >
                        {agent.performance}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </motion.div>
  )
}

export default LegionCard
