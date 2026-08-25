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
          primary: '#06b6d4',
          secondary: '#8b5cf6',
          accent: 'rgba(6, 182, 212, 0.4)',
          glow: 'rgba(6, 182, 212, 0.2)',
          orb1: 'from-cyan-400/30 to-blue-500/30',
          orb2: 'from-violet-400/25 to-purple-500/25',
          lineColor: 'rgba(6, 182, 212, 0.5)'
        }
      case 'analytics':
        return {
          primary: '#10b981',
          secondary: '#f59e0b',
          accent: 'rgba(16, 185, 129, 0.4)',
          glow: 'rgba(16, 185, 129, 0.2)',
          orb1: 'from-emerald-400/30 to-green-500/30',
          orb2: 'from-amber-400/25 to-orange-500/25',
          lineColor: 'rgba(16, 185, 129, 0.5)'
        }
      case 'security':
        return {
          primary: '#f43f5e',
          secondary: '#f59e0b',
          accent: 'rgba(244, 63, 94, 0.4)',
          glow: 'rgba(244, 63, 94, 0.2)',
          orb1: 'from-rose-400/30 to-red-500/30',
          orb2: 'from-amber-400/25 to-yellow-500/25',
          lineColor: 'rgba(244, 63, 94, 0.5)'
        }
      case 'global':
        return {
          primary: '#3b82f6',
          secondary: '#06b6d4',
          accent: 'rgba(59, 130, 246, 0.4)',
          glow: 'rgba(59, 130, 246, 0.2)',
          orb1: 'from-blue-400/30 to-indigo-500/30',
          orb2: 'from-cyan-400/25 to-teal-500/25',
          lineColor: 'rgba(59, 130, 246, 0.5)'
        }
      case 'ai':
        return {
          primary: '#8b5cf6',
          secondary: '#ec4899',
          accent: 'rgba(139, 92, 246, 0.4)',
          glow: 'rgba(139, 92, 246, 0.2)',
          orb1: 'from-violet-400/30 to-purple-500/30',
          orb2: 'from-fuchsia-400/25 to-pink-500/25',
          lineColor: 'rgba(139, 92, 246, 0.5)'
        }
      default:
        return {
          primary: '#059669',
          secondary: '#06b6d4',
          accent: 'rgba(5, 150, 105, 0.4)',
          glow: 'rgba(5, 150, 105, 0.2)',
          orb1: 'from-emerald-400/30 to-cyan-500/30',
          orb2: 'from-cyan-400/25 to-blue-500/25',
          lineColor: 'rgba(5, 150, 105, 0.5)'
        }
    }
  }

  const colors = getThemeColors()

  if (variant === 'subtle') {
    return (
      <>
        {/* Subtle corner accents - more visible */}
        <div className="fixed top-0 left-0 w-80 h-80 pointer-events-none z-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.orb1} rounded-full blur-[100px] animate-glow-pulse`} />
        </div>
        <div className="fixed bottom-0 right-0 w-96 h-96 pointer-events-none z-0">
          <div className={`absolute inset-0 bg-gradient-to-tl ${colors.orb2} rounded-full blur-[100px] animate-glow-pulse`} style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Subtle grid pattern */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="subtleGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={colors.primary} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#subtleGrid)" />
          </svg>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Left Side Decoration - Global Network Visualization - MORE VISIBLE */}
      <div className="fixed left-0 top-0 w-[450px] h-full pointer-events-none z-0 hidden xl:block overflow-hidden">
        {/* Large ambient gradient orb - TOP LEFT */}
        <div 
          className={`absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br ${colors.orb1} rounded-full blur-[120px] animate-glow-pulse`}
          style={{ opacity: 0.6 }}
        />
        
        {/* Secondary gradient orb - BOTTOM LEFT */}
        <div 
          className={`absolute bottom-20 -left-10 w-[400px] h-[400px] bg-gradient-to-tr ${colors.orb2} rounded-full blur-[100px] animate-glow-pulse`}
          style={{ animationDelay: '3s', opacity: 0.5 }}
        />

        {/* SVG Network visualization with proper visibility */}
        <svg 
          viewBox="0 0 450 900" 
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.15 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="1" />
              <stop offset="100%" stopColor={colors.secondary} stopOpacity="1" />
            </linearGradient>
            <filter id="glowLeft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="nodeGlow">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
              <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Main network nodes - larger and more visible */}
          {[
            { cx: 100, cy: 120, r: 12 },
            { cx: 180, cy: 200, r: 18 },
            { cx: 70, cy: 300, r: 10 },
            { cx: 220, cy: 350, r: 15 },
            { cx: 120, cy: 480, r: 20 },
            { cx: 250, cy: 550, r: 12 },
            { cx: 90, cy: 650, r: 16 },
            { cx: 200, cy: 750, r: 14 },
            { cx: 140, cy: 850, r: 11 },
          ].map((node, i) => (
            <g key={i}>
              {/* Node glow halo */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 3}
                fill="url(#nodeGlow)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              {/* Node core */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="url(#leftGradient)"
                filter="url(#glowLeft)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            </g>
          ))}
          
          {/* Connection lines - thicker and more visible */}
          {[
            { x1: 100, y1: 120, x2: 180, y2: 200 },
            { x1: 180, y1: 200, x2: 70, y2: 300 },
            { x1: 180, y1: 200, x2: 220, y2: 350 },
            { x1: 70, y1: 300, x2: 120, y2: 480 },
            { x1: 220, y1: 350, x2: 250, y2: 550 },
            { x1: 120, y1: 480, x2: 90, y2: 650 },
            { x1: 250, y1: 550, x2: 200, y2: 750 },
            { x1: 90, y1: 650, x2: 140, y2: 850 },
            { x1: 200, y1: 750, x2: 140, y2: 850 },
          ].map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={colors.lineColor}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
          
          {/* Orbital rings - animated */}
          <g transform="translate(140, 420)">
            <circle r="120" fill="none" stroke={colors.glow} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.5">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0"
                to="360"
                dur="50s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="90" fill="none" stroke={colors.accent} strokeWidth="1" strokeDasharray="4 8" opacity="0.4">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="360"
                to="0"
                dur="35s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Orbiting dot */}
            <circle r="6" fill={colors.primary} filter="url(#glowLeft)" opacity="0.8">
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path="M 0,-120 A 120,120 0 1,1 0.01,-120"
              />
            </circle>
          </g>

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={`particle-${i}`}
              cx={30 + Math.random() * 150}
              cy={Math.random() * 900}
              r={2 + Math.random() * 3}
              fill={colors.primary}
              opacity={0.3 + Math.random() * 0.4}
              className="animate-pulse"
              style={{ animationDelay: `${Math.random() * 5}s` }}
            />
          ))}
        </svg>

        {/* Geometric accent shapes */}
        <div 
          className="absolute top-1/4 left-4 w-40 h-40 border-2 rounded-xl rotate-45 animate-float"
          style={{ borderColor: `${colors.glow}`, opacity: 0.3 }}
        />
        <div 
          className="absolute bottom-1/3 left-8 w-28 h-28 border-2 rounded-full animate-float"
          style={{ borderColor: `${colors.accent}`, opacity: 0.25, animationDelay: '2s' }}
        />
      </div>

      {/* Right Side Decoration - Data Flow Visualization - MORE VISIBLE */}
      <div className="fixed right-0 top-0 w-[450px] h-full pointer-events-none z-0 hidden xl:block overflow-hidden">
        {/* Large ambient gradient orb - TOP RIGHT */}
        <div 
          className={`absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-bl ${colors.orb2} rounded-full blur-[120px] animate-glow-pulse`}
          style={{ animationDelay: '1.5s', opacity: 0.6 }}
        />
        
        {/* Secondary gradient orb - BOTTOM RIGHT */}
        <div 
          className={`absolute bottom-20 -right-10 w-[400px] h-[400px] bg-gradient-to-tl ${colors.orb1} rounded-full blur-[100px] animate-glow-pulse`}
          style={{ animationDelay: '4s', opacity: 0.5 }}
        />

        {/* SVG Data flow visualization */}
        <svg 
          viewBox="0 0 450 900" 
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.15 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rightGradient" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.secondary} stopOpacity="1" />
              <stop offset="100%" stopColor={colors.primary} stopOpacity="1" />
            </linearGradient>
            <filter id="glowRight" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="dataFlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0" />
              <stop offset="30%" stopColor={colors.primary} stopOpacity="0.8" />
              <stop offset="70%" stopColor={colors.secondary} stopOpacity="0.8" />
              <stop offset="100%" stopColor={colors.secondary} stopOpacity="0" />
            </linearGradient>
            <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={colors.primary} />
            </marker>
          </defs>
          
          {/* Animated data flow streams */}
          {[300, 340, 380].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1="-50"
              x2={x}
              y2="950"
              stroke="url(#dataFlowGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0 200;200 0;0 200"
                dur={`${4 + i * 1.5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.2;0.6;0.2"
                dur={`${3 + i}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
          
          {/* Right side data nodes */}
          {[
            { cx: 340, cy: 100, r: 14 },
            { cx: 290, cy: 190, r: 10 },
            { cx: 390, cy: 280, r: 18 },
            { cx: 320, cy: 400, r: 12 },
            { cx: 370, cy: 510, r: 16 },
            { cx: 300, cy: 620, r: 11 },
            { cx: 380, cy: 730, r: 19 },
            { cx: 330, cy: 830, r: 13 },
          ].map((node, i) => (
            <g key={i}>
              {/* Node glow */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 2.5}
                fill={colors.secondary}
                opacity="0.15"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
              {/* Node core */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="url(#rightGradient)"
                filter="url(#glowRight)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </g>
          ))}
          
          {/* Hexagonal grid pattern - more visible */}
          <g opacity="0.4">
            {[
              { x: 260, y: 140 }, { x: 350, y: 140 }, { x: 440, y: 140 },
              { x: 220, y: 230 }, { x: 310, y: 230 }, { x: 400, y: 230 },
              { x: 260, y: 320 }, { x: 350, y: 320 }, { x: 440, y: 320 },
              { x: 220, y: 410 }, { x: 310, y: 410 }, { x: 400, y: 410 },
              { x: 260, y: 500 }, { x: 350, y: 500 }, { x: 440, y: 500 },
              { x: 220, y: 590 }, { x: 310, y: 590 }, { x: 400, y: 590 },
              { x: 260, y: 680 }, { x: 350, y: 680 }, { x: 440, y: 680 },
              { x: 220, y: 770 }, { x: 310, y: 770 }, { x: 400, y: 770 },
            ].map((pos, i) => (
              <polygon
                key={i}
                points={`${pos.x},${pos.y-18} ${pos.x+15.5},${pos.y-9} ${pos.x+15.5},${pos.y+9} ${pos.x},${pos.y+18} ${pos.x-15.5},${pos.y+9} ${pos.x-15.5},${pos.y-9}`}
                fill="none"
                stroke={colors.glow}
                strokeWidth="1"
                opacity="0.5"
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.6;0.2"
                  dur={`${4 + (i % 5)}s`}
                  repeatCount="indefinite"
                />
              </polygon>
            ))}
          </g>
          
          {/* Circular data visualization with rotating elements */}
          <g transform="translate(340, 450)">
            {/* Outer ring */}
            <circle r="100" fill="none" stroke={colors.glow} strokeWidth="2" opacity="0.5">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0"
                to="-360"
                dur="45s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Middle ring with dashes */}
            <circle r="75" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeDasharray="15 8" opacity="0.6">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="360"
                to="0"
                dur="30s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Inner ring */}
            <circle r="50" fill="none" stroke={colors.secondary} strokeWidth="1" opacity="0.4">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0"
                to="360"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Center core */}
            <circle r="25" fill={colors.primary} opacity="0.2" filter="url(#glowRight)">
              <animate
                attributeName="r"
                values="23;27;23"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Orbiting data points */}
            {[0, 90, 180, 270].map((angle, i) => (
              <circle
                key={i}
                r="6"
                fill={i % 2 === 0 ? colors.primary : colors.secondary}
                filter="url(#glowRight)"
                opacity="0.8"
              >
                <animateMotion
                  dur={`${8 + i * 2}s`}
                  repeatCount="indefinite"
                  path={`M ${85 * Math.cos((angle * Math.PI) / 180)},${85 * Math.sin((angle * Math.PI) / 180)} A 85,85 0 1,1 ${85 * Math.cos(((angle + 359) * Math.PI) / 180)},${85 * Math.sin(((angle + 359) * Math.PI) / 180)}`}
                />
              </circle>
            ))}
          </g>

          {/* Additional floating particles on right */}
          {[...Array(10)].map((_, i) => (
            <circle
              key={`rparticle-${i}`}
              cx={260 + Math.random() * 150}
              cy={Math.random() * 900}
              r={2 + Math.random() * 4}
              fill={colors.secondary}
              opacity={0.3 + Math.random() * 0.4}
              className="animate-pulse"
              style={{ animationDelay: `${Math.random() * 5}s` }}
            />
          ))}
        </svg>

        {/* Geometric accent shapes on right */}
        <div 
          className="absolute top-1/3 right-4 w-36 h-36 border-2 rounded-lg rotate-12 animate-float"
          style={{ borderColor: `${colors.secondary}40`, opacity: 0.3, animationDelay: '1s' }}
        />
        <div 
          className="absolute bottom-1/4 right-8 w-24 h-24 border-2 rounded-full animate-float"
          style={{ borderColor: `${colors.primary}40`, opacity: 0.25, animationDelay: '3s' }}
        />
      </div>

      {/* Top ambient gradient overlay */}
      <div className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none z-0">
        <div 
          className={`absolute inset-0 bg-gradient-to-b ${colors.orb1}`}
          style={{ opacity: 0.15 }}
        />
      </div>

      {/* Bottom ambient gradient overlay */}
      <div className="fixed bottom-0 left-0 right-0 h-[500px] pointer-events-none z-0">
        <div 
          className={`absolute inset-0 bg-gradient-to-t ${colors.orb2}`}
          style={{ opacity: 0.15 }}
        />
      </div>

      {/* Center subtle grid overlay for depth */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="centerGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={colors.primary} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#centerGrid)" />
        </svg>
      </div>
    </>
  )
}

// Hero-specific decorations for landing pages - IMPACTFUL
export function HeroDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Massive gradient orbs for impact */}
      <div className="absolute top-[-10%] -left-[20%] w-[600px] h-[600px] bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-full blur-[150px] animate-glow-pulse" />
      <div className="absolute top-[20%] -right-[15%] w-[700px] h-[700px] bg-gradient-to-l from-cyan-500/20 to-blue-500/20 rounded-full blur-[150px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] bg-gradient-to-r from-violet-500/15 to-purple-500/15 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '4s' }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      
      {/* Animated network nodes scattered across hero */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
        {/* Random connection lines */}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={i}
            x1={`${10 + Math.random() * 80}%`}
            y1={`${10 + Math.random() * 80}%`}
            x2={`${10 + Math.random() * 80}%`}
            y2={`${10 + Math.random() * 80}%`}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
        
        {/* Scattered nodes */}
        {Array.from({ length: 30 }).map((_, i) => (
          <circle
            key={i}
            cx={`${5 + Math.random() * 90}%`}
            cy={`${5 + Math.random() * 90}%`}
            r={2 + Math.random() * 4}
            fill="currentColor"
            className="animate-pulse"
            style={{ animationDelay: `${Math.random() * 5}s` }}
          />
        ))}
      </svg>

      {/* Floating geometric shapes */}
      <div className="absolute top-[15%] left-[10%] w-32 h-32 border border-primary/20 rounded-2xl rotate-45 animate-float" />
      <div className="absolute top-[60%] right-[15%] w-24 h-24 border border-cyan-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[20%] left-[20%] w-20 h-20 border border-violet-500/20 rounded-lg rotate-12 animate-float" style={{ animationDelay: '4s' }} />
    </div>
  )
}

// Dashboard-specific decorations with data visualization theme
export function DashboardDecorations() {
  return (
    <>
      <div className="fixed left-0 top-0 w-72 h-full pointer-events-none z-0 hidden 2xl:block overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-500/10 to-transparent blur-[80px]" />
        
        <svg viewBox="0 0 288 800" className="w-full h-full absolute inset-0" style={{ opacity: 0.12 }}>
          <defs>
            <linearGradient id="chartLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="chartGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated chart lines */}
          <polyline
            points="20,720 50,680 80,700 110,640 140,660 170,600 200,620 240,560"
            fill="none"
            stroke="url(#chartLine)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#chartGlow)"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0 1000;1000 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </polyline>
          
          <polyline
            points="20,520 50,500 80,540 110,480 140,510 170,450 200,480 240,420"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {/* Bar chart representation */}
          {[50, 75, 55, 90, 65, 80, 60, 95].map((h, i) => (
            <rect
              key={i}
              x={25 + i * 32}
              y={320 - h}
              width="24"
              height={h}
              fill="url(#chartLine)"
              opacity="0.5"
              rx="4"
              filter="url(#chartGlow)"
            >
              <animate
                attributeName="height"
                values={`0;${h};${h}`}
                dur="1.5s"
                begin={`${i * 0.1}s`}
                fill="freeze"
              />
            </rect>
          ))}
          
          {/* Gauge/meter arcs */}
          <g transform="translate(144, 180)">
            <path d="M -60,0 A 60 60 0 0 1 60,0" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
            <path d="M -45,0 A 45 45 0 0 1 45,0" fill="none" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
            {/* Gauge needle */}
            <line 
              x1="0" y1="0" x2="0" y2="-50" 
              stroke="#f59e0b" 
              strokeWidth="3" 
              strokeLinecap="round"
              opacity="0.8"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="-40;40;-40"
                dur="4s"
                repeatCount="indefinite"
              />
            </line>
          </g>
        </svg>
      </div>
      
      <div className="fixed right-0 top-0 w-72 h-full pointer-events-none z-0 hidden 2xl:block overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-violet-500/10 to-transparent blur-[80px]" />
        
        <svg viewBox="0 0 288 800" className="w-full h-full absolute inset-0" style={{ opacity: 0.12 }}>
          {/* Pie chart segments */}
          <g transform="translate(144, 200)">
            {[
              { start: 0, end: 90, color: '#10b981', opacity: 0.8 },
              { start: 90, end: 180, color: '#06b6d4', opacity: 0.65 },
              { start: 180, end: 270, color: '#8b5cf6', opacity: 0.5 },
              { start: 270, end: 360, color: '#f59e0b', opacity: 0.35 },
            ].map((seg, i) => {
              const startRad = (seg.start * Math.PI) / 180
              const endRad = (seg.end * Math.PI) / 180
              const largeArc = seg.end - seg.start > 180 ? 1 : 0
              const x1 = 70 * Math.cos(startRad)
              const y1 = 70 * Math.sin(startRad)
              const x2 = 70 * Math.cos(endRad)
              const y2 = 70 * Math.sin(endRad)
              
              return (
                <path
                  key={i}
                  d={`M 0 0 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={seg.color}
                  opacity={seg.opacity}
                >
                  <animate
                    attributeName="opacity"
                    values={`0;${seg.opacity};${seg.opacity}`}
                    dur="1s"
                    begin={`${i * 0.15}s`}
                    fill="freeze"
                  />
                </path>
              )
            })}
            
            {/* Center circle */}
            <circle r="35" fill="#0a1628" opacity="0.5" />
            <text y="5" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">100%</text>
          </g>
          
          {/* Scatter plot dots */}
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={i}
              cx={30 + Math.random() * 228}
              cy={380 + Math.random() * 180}
              r={3 + Math.random() * 5}
              fill={['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)]}
              opacity={0.4 + Math.random() * 0.4}
              className="animate-pulse"
              style={{ animationDelay: `${Math.random() * 3}s` }}
            />
          ))}
          
          {/* Trend line */}
          <polyline
            points="30,680 70,650 110,670 150,620 190,640 230,590 260,610"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0 1000;1000 0"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </polyline>
          
          {/* Area under trend line */}
          <polygon
            points="30,680 70,650 110,670 150,620 190,640 230,590 260,610 260,750 30,750"
            fill="url(#chartLine)"
            opacity="0.1"
          />
        </svg>
      </div>
    </>
  )
}
