'use client'

import React from 'react'

interface PageDecorationsProps {
  theme?: 'default' | 'technology' | 'analytics' | 'security' | 'global' | 'ai'
  variant?: 'full' | 'subtle'
}

export function PageDecorations({ theme = 'default', variant = 'full' }: PageDecorationsProps) {
  const getThemeColors = () => {
    switch (theme) {
      case 'technology':
        return {
          primary: 'from-cyan-500/20 to-blue-500/20',
          secondary: 'from-violet-500/15 to-purple-500/15',
          accent: 'rgba(6, 182, 212, 0.3)',
          glow: 'rgba(6, 182, 212, 0.1)'
        }
      case 'analytics':
        return {
          primary: 'from-emerald-500/20 to-green-500/20',
          secondary: 'from-amber-500/15 to-orange-500/15',
          accent: 'rgba(16, 185, 129, 0.3)',
          glow: 'rgba(16, 185, 129, 0.1)'
        }
      case 'security':
        return {
          primary: 'from-rose-500/20 to-red-500/20',
          secondary: 'from-amber-500/15 to-yellow-500/15',
          accent: 'rgba(244, 63, 94, 0.3)',
          glow: 'rgba(244, 63, 94, 0.1)'
        }
      case 'global':
        return {
          primary: 'from-blue-500/20 to-indigo-500/20',
          secondary: 'from-cyan-500/15 to-teal-500/15',
          accent: 'rgba(59, 130, 246, 0.3)',
          glow: 'rgba(59, 130, 246, 0.1)'
        }
      case 'ai':
        return {
          primary: 'from-violet-500/20 to-purple-500/20',
          secondary: 'from-fuchsia-500/15 to-pink-500/15',
          accent: 'rgba(139, 92, 246, 0.3)',
          glow: 'rgba(139, 92, 246, 0.1)'
        }
      default:
        return {
          primary: 'from-primary/20 to-emerald-500/20',
          secondary: 'from-cyan-500/15 to-blue-500/15',
          accent: 'rgba(5, 150, 105, 0.3)',
          glow: 'rgba(5, 150, 105, 0.1)'
        }
    }
  }

  const colors = getThemeColors()

  if (variant === 'subtle') {
    return (
      <>
        {/* Subtle corner accents */}
        <div className="fixed top-0 left-0 w-64 h-64 opacity-30 pointer-events-none z-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.primary} rounded-full blur-3xl`} />
        </div>
        <div className="fixed bottom-0 right-0 w-96 h-96 opacity-30 pointer-events-none z-0">
          <div className={`absolute inset-0 bg-gradient-to-tl ${colors.secondary} rounded-full blur-3xl`} />
        </div>
      </>
    )
  }

  return (
    <>
      {/* Left Side Decoration - Global Network Visualization */}
      <div className="fixed left-0 top-0 w-[400px] h-full pointer-events-none z-0 hidden xl:block overflow-hidden">
        <svg 
          viewBox="0 0 400 800" 
          className="absolute inset-0 w-full h-full opacity-[0.07] dark:opacity-[0.05]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.accent} />
              <stop offset="100%" stopColor={colors.glow} />
            </linearGradient>
            <filter id="glowLeft">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Global network nodes */}
          {[
            { cx: 80, cy: 120, r: 8 },
            { cx: 150, cy: 200, r: 12 },
            { cx: 60, cy: 280, r: 6 },
            { cx: 180, cy: 350, r: 10 },
            { cx: 100, cy: 450, r: 14 },
            { cx: 200, cy: 520, r: 8 },
            { cx: 70, cy: 600, r: 11 },
            { cx: 160, cy: 700, r: 9 },
          ].map((node, i) => (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="url(#leftGradient)"
              filter="url(#glowLeft)"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
          
          {/* Connection lines */}
          {[
            { x1: 80, y1: 120, x2: 150, y2: 200 },
            { x1: 150, y1: 200, x2: 60, y2: 280 },
            { x1: 150, y1: 200, x2: 180, y2: 350 },
            { x1: 60, y1: 280, x2: 100, y2: 450 },
            { x1: 180, y1: 350, x2: 200, y2: 520 },
            { x1: 100, y1: 450, x2: 70, y2: 600 },
            { x1: 200, y1: 520, x2: 160, y2: 700 },
            { x1: 70, y1: 600, x2: 160, y2: 700 },
          ].map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={colors.accent}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          ))}
          
          {/* Orbital rings */}
          <circle cx="120" cy="300" r="100" fill="none" stroke={colors.glow} strokeWidth="0.5" strokeDasharray="4 4">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 120 300"
              to="360 120 300"
              dur="60s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="140" cy="550" r="130" fill="none" stroke={colors.glow} strokeWidth="0.5" strokeDasharray="2 6">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="360 140 550"
              to="0 140 550"
              dur="45s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Floating gradient orbs */}
        <div className={`absolute top-20 left-10 w-48 h-48 bg-gradient-to-br ${colors.primary} rounded-full blur-3xl animate-float`} />
        <div className={`absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-tr ${colors.secondary} rounded-full blur-3xl animate-float`} style={{ animationDelay: '3s' }} />
        
        {/* Abstract geometric shapes */}
        <div className="absolute top-1/3 left-8 w-32 h-32 border border-primary/10 rounded-lg rotate-45 animate-pulse" />
        <div className="absolute bottom-1/4 left-16 w-24 h-24 border border-cyan-500/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Right Side Decoration - Data Flow Visualization */}
      <div className="fixed right-0 top-0 w-[400px] h-full pointer-events-none z-0 hidden xl:block overflow-hidden">
        <svg 
          viewBox="0 0 400 800" 
          className="absolute inset-0 w-full h-full opacity-[0.07] dark:opacity-[0.05]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rightGradient" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.accent} />
              <stop offset="100%" stopColor={colors.glow} />
            </linearGradient>
            <filter id="glowRight">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="dataFlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.accent} stopOpacity="0" />
              <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6" />
              <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Data flow streams */}
          {[280, 320, 360].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1="0"
              x2={x}
              y2="800"
              stroke="url(#dataFlow)"
              strokeWidth="2"
              opacity="0.3"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0 100;100 0"
                dur={`${3 + i}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
          
          {/* Right side nodes - representing data points */}
          {[
            { cx: 320, cy: 100, r: 10 },
            { cx: 280, cy: 180, r: 7 },
            { cx: 360, cy: 260, r: 13 },
            { cx: 300, cy: 380, r: 9 },
            { cx: 340, cy: 480, r: 11 },
            { cx: 290, cy: 580, r: 8 },
            { cx: 350, cy: 680, r: 14 },
            { cx: 310, cy: 750, r: 6 },
          ].map((node, i) => (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="url(#rightGradient)"
              filter="url(#glowRight)"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          ))}
          
          {/* Hexagonal grid pattern */}
          <g opacity="0.3">
            {[
              { x: 250, y: 150 }, { x: 330, y: 150 },
              { x: 210, y: 240 }, { x: 290, y: 240 }, { x: 370, y: 240 },
              { x: 250, y: 330 }, { x: 330, y: 330 },
              { x: 210, y: 420 }, { x: 290, y: 420 }, { x: 370, y: 420 },
              { x: 250, y: 510 }, { x: 330, y: 510 },
              { x: 210, y: 600 }, { x: 290, y: 600 }, { x: 370, y: 600 },
            ].map((pos, i) => (
              <polygon
                key={i}
                points={`${pos.x},${pos.y-15} ${pos.x+13},${pos.y-7} ${pos.x+13},${pos.y+7} ${pos.x},${pos.y+15} ${pos.x-13},${pos.y+7} ${pos.x-13},${pos.y-7}`}
                fill="none"
                stroke={colors.glow}
                strokeWidth="0.5"
              />
            ))}
          </g>
          
          {/* Circular data visualization */}
          <circle cx="320" cy="400" r="80" fill="none" stroke={colors.glow} strokeWidth="1">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 320 400"
              to="-360 320 400"
              dur="40s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="320" cy="400" r="60" fill="none" stroke={colors.accent} strokeWidth="0.5" strokeDasharray="10 5">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="360 320 400"
              to="0 320 400"
              dur="25s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Floating gradient orbs on right */}
        <div className={`absolute top-32 right-10 w-56 h-56 bg-gradient-to-l ${colors.secondary} rounded-full blur-3xl animate-float`} style={{ animationDelay: '1.5s' }} />
        <div className={`absolute bottom-32 right-16 w-72 h-72 bg-gradient-to-tl ${colors.primary} rounded-full blur-3xl animate-float`} style={{ animationDelay: '4s' }} />
        
        {/* Abstract shapes on right */}
        <div className="absolute top-1/2 right-12 w-28 h-28 border border-violet-500/10 rounded-lg rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-8 w-20 h-20 border border-primary/10 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Top ambient gradient */}
      <div className="fixed top-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${colors.primary} opacity-20 dark:opacity-10`} />
      </div>

      {/* Bottom ambient gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className={`absolute inset-0 bg-gradient-to-t ${colors.secondary} opacity-20 dark:opacity-10`} />
      </div>
    </>
  )
}

// Hero-specific decorations for landing pages
export function HeroDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Large floating orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-primary/10 to-emerald-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-gradient-to-l from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      
      {/* SVG Network visualization for hero */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGrid)" />
        
        {/* Connection nodes scattered across hero */}
        {Array.from({ length: 20 }).map((_, i) => (
          <circle
            key={i}
            cx={`${10 + Math.random() * 80}%`}
            cy={`${10 + Math.random() * 80}%`}
            r={2 + Math.random() * 3}
            fill="currentColor"
            className="animate-pulse"
            style={{ animationDelay: `${Math.random() * 5}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

// Dashboard-specific decorations with data visualization theme
export function DashboardDecorations() {
  return (
    <>
      <div className="fixed left-0 top-0 w-64 h-full pointer-events-none z-0 hidden 2xl:block">
        <svg viewBox="0 0 256 800" className="w-full h-full opacity-[0.06]">
          {/* Mini chart lines */}
          <polyline
            points="20,700 50,650 80,670 110,600 140,620 170,550 200,570 230,500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline
            points="20,500 50,480 80,520 110,450 140,490 170,420 200,450 230,380"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.6"
          />
          
          {/* Bar chart representation */}
          {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
            <rect
              key={i}
              x={30 + i * 30}
              y={300 - h}
              width="20"
              height={h}
              fill="currentColor"
              opacity="0.4"
              rx="2"
            />
          ))}
          
          {/* Gauge/meter arcs */}
          {['100,250 150,250', '120,200 180,200'].map((d, i) => (
            <path
              key={i}
              d={`M ${d} A 50 50 0 0 1 ${i === 0 ? '180,200' : '120,200'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            />
          ))}
        </svg>
      </div>
      
      <div className="fixed right-0 top-0 w-64 h-full pointer-events-none z-0 hidden 2xl:block">
        <svg viewBox="0 0 256 800" className="w-full h-full opacity-[0.06]">
          {/* Pie chart segments */}
          <g transform="translate(128, 200)">
            {[
              { start: 0, end: 90, color: 'currentColor' },
              { start: 90, end: 180, color: 'currentColor', opacity: 0.7 },
              { start: 180, end: 270, color: 'currentColor', opacity: 0.5 },
              { start: 270, end: 360, color: 'currentColor', opacity: 0.3 },
            ].map((seg, i) => (
              <path
                key={i}
                d={`M 0 0 L ${60 * Math.cos((seg.start * Math.PI) / 180)} ${60 * Math.sin((seg.start * Math.PI) / 180)} A 60 60 0 ${seg.end - seg.start > 180 ? 1 : 0} 1 ${60 * Math.cos((seg.end * Math.PI) / 180)} ${60 * Math.sin((seg.end * Math.PI) / 180)} Z`}
                fill={seg.color}
                opacity={seg.opacity || 1}
              />
            ))}
          </g>
          
          {/* Scatter plot dots */}
          {Array.from({ length: 15 }).map((_, i) => (
            <circle
              key={i}
              cx={30 + Math.random() * 196}
              cy={400 + Math.random() * 150}
              r={2 + Math.random() * 4}
              fill="currentColor"
              opacity={0.3 + Math.random() * 0.5}
            />
          ))}
          
          {/* Trend line */}
          <polyline
            points="30,650 70,630 110,640 150,600 190,610 230,570"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </>
  )
}
