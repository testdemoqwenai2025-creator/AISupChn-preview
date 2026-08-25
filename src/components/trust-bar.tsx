'use client'

import React from 'react'
import { Shield, Star, Users, Building2, Award, CheckCircle2, TrendingUp } from 'lucide-react'

export function TrustBar() {
  const stats = [
    { value: '500+', label: 'Enterprise Clients', icon: Building2 },
    { value: '94%', label: 'Prediction Accuracy', icon: Award },
    { value: '$12B+', label: 'Risk Mitigated', icon: TrendingUp },
    { value: '190+', label: 'Countries Covered', icon: Globe },
  ]

  return (
    <section className="py-12 border-y border-border/50 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Logos */}
        <div className="mt-10 pt-8 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground mb-6">Trusted by industry leaders worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Fortune 500', 'Global Logistics Co.', 'TechCorp Intl.', 'SupplyChain Pro', 'ManufacturePlus'].map((company, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function MiniTrustIndicator() {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {[
        { icon: Shield, label: 'SOC 2 Certified' },
        { icon: Star, label: 'G2 Leader' },
        { icon: Users, label: '500+ Enterprises' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <item.icon className="h-3.5 w-3.5 text-primary" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
