import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Activity {
  id: string
  timestamp: Date
  legion: string
  legionColor: string
  action: string
  target: string
  status: 'success' | 'pending' | 'failed'
}

interface ActivityFeedProps {
  activities: Activity[]
  maxItems?: number
}

const statusColors = {
  success: 'bg-green-500',
  pending: 'bg-yellow-500',
  failed: 'bg-red-500'
}

export function ActivityFeed({ activities, maxItems = 20 }: ActivityFeedProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [activities])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="glass-panel p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display text-white/80 uppercase tracking-wider">
          Live Activity
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 status-dot" />
          <span className="text-[10px] font-mono text-white/50">REAL-TIME</span>
        </div>
      </div>
      
      <ScrollArea className="h-[280px]" ref={scrollRef}>
        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {activities.slice(0, maxItems).map((activity, index) => (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ 
                  delay: index * 0.02,
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="activity-row"
              >
                {/* Status indicator */}
                <div className={`w-2 h-2 rounded-full ${statusColors[activity.status]} status-dot flex-shrink-0`} />
                
                {/* Timestamp */}
                <span className="text-[10px] font-mono text-white/40">
                  {formatTime(activity.timestamp)}
                </span>
                
                {/* Legion */}
                <span 
                  className="text-[11px] font-mono truncate"
                  style={{ color: activity.legionColor }}
                >
                  {activity.legion.toUpperCase()}
                </span>
                
                {/* Action */}
                <span className="text-[11px] text-white/70 truncate">
                  {activity.action}
                </span>
                
                {/* Target */}
                <span className="text-[11px] text-white/40 truncate text-right">
                  {activity.target}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  )
}

export default ActivityFeed
