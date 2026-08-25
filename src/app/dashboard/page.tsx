'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Activity, Brain, AlertTriangle, TrendingUp, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Real-time supply chain risk monitoring and predictions
          </p>
        </div>

        {/* Risk Calculator Section */}
        <section id="risk-calculator" className="mb-12 scroll-mt-20">
          <div className="glass rounded-2xl p-6 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Risk Calculator</h2>
                <p className="text-muted-foreground">Predict supply chain disruptions before they happen</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl p-4 border border-amber-500/30">
                <div className="text-sm text-white/60 mb-1">Global Risk Index</div>
                <div className="text-3xl font-bold text-amber-400">MEDIUM</div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full" style={{width: '58%'}}></div>
                </div>
                <div className="text-xs text-white/40 mt-1">58/100</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl p-4 border border-emerald-500/30">
                <div className="text-sm text-white/60 mb-1">Supplier Health</div>
                <div className="text-3xl font-bold text-emerald-400">92%</div>
                <div className="text-xs text-emerald-300 mt-2">Excellent</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                <div className="text-sm text-white/60 mb-1">Compliance Score</div>
                <div className="text-3xl font-bold text-blue-400">98%</div>
                <div className="text-xs text-blue-300 mt-2">Fully Compliant</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Monitored Suppliers', value: '2,847', icon: Shield, color: 'text-violet-400' },
                { label: 'Active Alerts', value: '23', icon: AlertTriangle, color: 'text-red-400' },
                { label: 'Countries Covered', value: '190+', icon: Globe, color: 'text-cyan-400' },
                { label: 'Predictions Today', value: '1,247', icon: TrendingUp, color: 'text-emerald-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                  <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-6">
          <Link href="/command-center.html#compliance">
            <div className="glass rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer h-full">
              <Activity className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Command Center</h3>
              <p className="text-sm text-muted-foreground">Advanced compliance and operations management</p>
            </div>
          </Link>

          <Link href="/intelligence.html">
            <div className="glass rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer h-full">
              <Brain className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">AI Intelligence</h3>
              <p className="text-sm text-muted-foreground">Machine learning insights and predictions</p>
            </div>
          </Link>

          <Link href="/subscription.html">
            <div className="glass rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer h-full">
              <Shield className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Upgrade Plan</h3>
              <p className="text-sm text-muted-foreground">Unlock advanced features and higher limits</p>
            </div>
          </Link>
        </section>
      </main>
    </div>
  )
}
