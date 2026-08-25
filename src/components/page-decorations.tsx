'use client'

import React from 'react'

export function HeroDecorations() {
  return (
    <>
      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Ambient gradient orbs - positioned to avoid side panels */}
      <div className="fixed top-20 left-[15%] w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-40 right-[30%] w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-20 left-[25%] w-56 h-56 bg-violet-500/5 rounded-full blur-3xl pointer-events-none z-0" />
    </>
  )
}
