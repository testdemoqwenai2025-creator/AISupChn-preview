'use client'

import React from 'react'
import {
  Factory, ShoppingBag, Heart, Car, Laptop,
  Globe, TrendingUp, ShieldCheck, Users, ArrowRight,
  CheckCircle2, BarChart3, Zap, Target, Award,
  Building2, Truck, Package, FileText, Lightbulb
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageDecorations } from '@/components/page-decorations'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Industry Data
interface Industry {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  color: string
  gradient: string
  stats: { label: string; value: string }[]
  challenges: string[]
  solutions: string[]
  useCases: { title: string; description: string; metric: string }[]
  roi: { metric: string; value: string; description: string }
}

const industries: Industry[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: <Factory className="h-8 w-8" />,
    description: 'End-to-end supply chain visibility for complex multi-tier manufacturing operations with global supplier networks.',
    color: 'text-cyan-500',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    stats: [
      { label: 'Clients Served', value: '180+' },
      { label: 'Suppliers Monitored', value: '45K+' },
      { label: 'Risk Events Prevented', value: '2,400+' },
      { label: 'Avg. ROI', value: '340%' },
    ],
    challenges: [
      'Multi-tier supplier visibility gaps',
      'Component shortage prediction',
      'Quality control across regions',
      'Geopolitical disruption risks',
    ],
    solutions: [
      'Real-time tier mapping (1-N)',
      'AI-powered demand sensing',
      'Automated quality monitoring',
      'Geopolitical risk alerts',
    ],
    useCases: [
      { title: 'Tier-N Supplier Discovery', description: 'Map complete supplier chains down to raw materials', metric: '99% visibility' },
      { title: 'Shortage Prediction', description: 'Predict component shortages 60+ days in advance', metric: '92% accuracy' },
      { title: 'Quality Risk Scoring', description: 'Continuous quality risk assessment across all suppliers', metric: '85% reduction in defects' },
    ],
    roi: { metric: 'Average ROI', value: '340%', description: 'Within 12 months of deployment' }
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    icon: <ShoppingBag className="h-8 w-8" />,
    description: 'Optimize inventory, reduce stockouts, and ensure ethical sourcing for modern retail supply chains.',
    color: 'text-violet-500',
    gradient: 'from-violet-500/20 to-purple-500/20',
    stats: [
      { label: 'Retail Clients', value: '95+' },
      { label: 'SKUs Tracked', value: '2M+' },
      { label: 'Stockouts Prevented', value: '15K+/year' },
      { label: 'Cost Savings', value: '$45M+' },
    ],
    challenges: [
      'Demand volatility management',
      'Seasonal inventory optimization',
      'Fast fashion compliance',
      'Last-mile delivery risks',
    ],
    solutions: [
      'AI demand forecasting',
      'Dynamic inventory optimization',
      'EUDR/sustainability tracking',
      'Logistics risk monitoring',
    ],
    useCases: [
      { title: 'Demand Forecasting', description: 'ML models predict demand with 94% accuracy at SKU level', metric: '23% less overstock' },
      { title: 'Sustainability Compliance', description: 'Track and verify sustainable sourcing claims', metric: '100% audit ready' },
      { title: 'Omnichannel Inventory', description: 'Unified inventory visibility across all channels', metric: '40% faster fulfillment' },
    ],
    roi: { metric: 'Average ROI', value: '280%', description: 'Within 9 months of deployment' }
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Pharma',
    icon: <Heart className="h-8 w-8" />,
    description: 'Ensure drug safety, regulatory compliance, and supply continuity for life-critical healthcare products.',
    color: 'text-rose-500',
    gradient: 'from-rose-500/20 to-pink-500/20',
    stats: [
      { label: 'Pharma Clients', value: '65+' },
      { label: 'Drug Products Tracked', value: '50K+' },
      { label: 'Compliance Score', value: '99.7%' },
      { label: 'Supply Continuity', value: '99.9%' },
    ],
    challenges: [
      'Cold chain integrity monitoring',
      'Drug authenticity verification',
      'Regulatory compliance (FDA/EMA)',
      'Critical medicine availability',
    ],
    solutions: [
      'Cold chain IoT integration',
      'Serialization tracking',
      'Regulatory change monitoring',
      'Critical supplier prioritization',
    ],
    useCases: [
      { title: 'Cold Chain Monitoring', description: 'Real-time temperature and condition tracking globally', metric: '<0.1% excursions' },
      { title: 'Drug Supply Security', description: 'Detect counterfeit drugs and diversion risks', metric: '100% traceability' },
      { title: 'Regulatory Compliance', description: 'Automated FDA/EMA/GDPR compliance tracking', metric: 'Zero violations' },
    ],
    roi: { metric: 'Average ROI', value: '420%', description: 'Including avoided recalls' }
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: <Car className="h-8 w-8" />,
    description: 'Manage complex automotive supply chains with thousands of components and just-in-time requirements.',
    color: 'text-amber-500',
    gradient: 'from-amber-500/20 to-orange-500/20',
    stats: [
      { label: 'Auto Clients', value: '42+' },
      { label: 'Components Tracked', value: '120K+' },
      { line: 'Production Lines Protected', value: '380+' },
      { label: 'Line Stoppage Prevention', value: '98%' },
    ],
    challenges: [
      'Just-in-time dependency risks',
      'Semiconductor shortage exposure',
      'Multi-tier component sourcing',
      'EV transition supply chain',
    ],
    solutions: [
      'JIT risk modeling',
      'Chip shortage early warning',
      'Complete BOM mapping',
      'EV material tracking',
    ],
    useCases: [
      { title: 'JIT Risk Management', description: 'Predict and prevent production line stoppages', metric: '98% prevention rate' },
      { title: 'Semiconductor Tracking', description: 'Monitor chip supply health across all tiers', metric: '60-day advance warning' },
      { title: 'BOM Risk Analysis', description: 'Complete bill-of-materials risk assessment', metric: '100% component coverage' },
    ],
    roi: { metric: 'Average ROI', value: '510%', description: 'Including prevented line stoppages' }
  },
  {
    id: 'technology',
    name: 'Technology & Electronics',
    icon: <Laptop className="h-8 w-8" />,
    description: 'Navigate the fast-paced tech supply chain with real-time insights into component availability and geopolitical risks.',
    color: 'text-emerald-500',
    gradient: 'from-emerald-500/20 to-green-500/20',
    stats: [
      { label: 'Tech Clients', value: '120+' },
      { label: 'Components Monitored', value: '500K+' },
      { label: 'Lead Time Reduction', value: '35%' },
      { label: 'Supplier Diversification', value: '200%' },
    ],
    challenges: [
      'Semiconductor dependencies',
      'Rare earth material access',
      'Geopolitical trade restrictions',
      'Rapid product lifecycle changes',
    ],
    solutions: [
      'Component intelligence platform',
      'Trade restriction monitoring',
      'Alternative source identification',
      'Product lifecycle alignment',
    ],
    useCases: [
      { title: 'Component Intelligence', description: 'Real-time health scores for all electronic components', metric: '500K+ components tracked' },
      { title: 'Trade Alert System', description: 'Instant alerts on tariffs, sanctions, and export controls', metric: '<5 min alert time' },
      { title: 'Source Diversification', description: 'AI-recommended alternative suppliers for critical parts', metric: '200% more options' },
    ],
    roi: { metric: 'Average ROI', value: '290%', description: 'Within 6 months of deployment' }
  },
]

// Global Stats
const globalStats = [
  { value: '40+', label: 'Industries Served', icon: Building2 },
  { value: '$2.4B+', label: 'Client Savings Generated', icon: TrendingUp },
  { value: '190+', label: 'Countries Covered', icon: Globe },
  { value: '98.7%', label: 'Client Retention Rate', icon: Users },
]

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <PageDecorations theme="global" variant="subtle" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 gap-2 border-blue-500/50 text-blue-500">
              <Building2 className="h-4 w-4" />
              Industry Solutions
            </Badge>

            <h1 className="text-5xl font-bold mb-6">
              Solutions for Every{' '}
              <span className="gradient-text" style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Industry</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Tailored supply chain intelligence solutions designed for the unique challenges
              of each industry sector. From manufacturing to healthcare — we've got you covered.
            </p>

            {/* Global Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {globalStats.map((stat, i) => (
                <div key={i} className="glass rounded-xl p-5 text-center">
                  <stat.icon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Cards Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Target className="h-4 w-4" /> Industry Focus
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Specialized Solutions by Industry</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep domain expertise combined with cutting-edge AI technology
            </p>
          </div>

          {/* Industries Grid */}
          <div className="space-y-24">
            {industries.map((industry, idx) => (
              <div key={industry.id} id={industry.id} className={`grid lg:grid-cols-2 gap-12 items-start ${idx % 2 === 1 ? 'direction-rtl' : ''}`}>
                {/* Left Column - Info */}
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r ${industry.gradient} mb-6`}>
                    <div className={industry.color}>{industry.icon}</div>
                    <span className="font-semibold">{industry.name}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">Supply Chain Intelligence for {industry.name}</h3>
                  <p className="text-muted-foreground mb-8">{industry.description}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {industry.stats.map((stat, i) => (
                      <div key={i} className="glass rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-primary">{stat.value}</div>
                        <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" /> Key Challenges
                      </h4>
                      <ul className="space-y-2">
                        {industry.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" /> Our Solutions
                      </h4>
                      <ul className="space-y-2">
                        {industry.solutions.map((solution, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button className="gap-2">
                    Explore {industry.name} Solution
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Right Column - Use Cases */}
                <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="glass h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        Use Cases & Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {industry.useCases.map((useCase, i) => (
                        <div key={i} className="p-4 rounded-xl border hover:border-primary/30 transition-colors group">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{useCase.title}</h4>
                            <Badge variant="outline" className="text-xs font-bold text-primary">{useCase.metric}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{useCase.description}</p>
                        </div>
                      ))}

                      {/* ROI Highlight */}
                      <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-muted-foreground">{industry.roi.metric}</div>
                            <div className="text-3xl font-bold text-primary">{industry.roi.value}</div>
                          </div>
                          <Award className="h-10 w-10 text-primary/50" />
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">{industry.roi.description}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Industries CTA */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">More Industries We Serve</h2>
            <p className="text-muted-foreground">Our platform adapts to any industry's unique supply chain needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Aerospace & Defense', icon: <Plane className="h-6 w-6" /> },
              { name: 'Food & Beverage', icon: <UtensilsCrossed className="h-6 w-6" /> },
              { name: 'Energy & Utilities', icon: <Zap className="h-6 w-6" /> },
              { name: 'Chemicals', icon: <FlaskConical className="h-6 w-6" /> },
              { name: 'Logistics & 3PL', icon: <Truck className="h-6 w-6" /> },
              { name: 'Financial Services', icon: <Landmark className="h-6 w-6" /> },
              { name: 'Agriculture', icon: <Wheat className="h-6 w-6" /> },
              { name: 'Construction', icon: <HardHat className="h-6 w-6" /> },
              { name: 'Telecom', icon: <Radio className="h-6 w-6" /> },
              { name: 'Mining', icon: <Gem className="h-6 w-6" /> },
              { name: 'Consumer Goods', icon: <Package className="h-6 w-6" /> },
              { name: 'Government', icon: <FileText className="h-6 w-6" /> },
            ].map((industry, i) => (
              <Card key={i} className="glass-hover p-4 text-center cursor-pointer group">
                <div className="text-muted-foreground group-hover:text-primary transition-colors mb-2 flex justify-center">
                  {industry.icon}
                </div>
                <div className="text-xs font-medium">{industry.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="glass glow-emerald p-12">
            <Globe className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your Industry, Our Expertise</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Tell us about your industry-specific challenges and we'll show you how our AI platform can help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8">
                Schedule Industry Consultation
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8">
                Download Industry Report
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

// Additional icons used
function Plane(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
    </svg>
  )
}

function UtensilsCrossed(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m2 20 20-20"/><path d="M8.2 14.2 2 8"/><path d="m5.5 7.5 3 3"/><path d="M2 21h7.4c1.5 0 2.9-.6 3.9-1.6l7.2-7.2c.8-.8.8-2 0-2.8a2 2 0 0 0-2.8 0L12 14.9"/><path d="m18 4 2 2"/>
    </svg>
  )
}

function FlaskConical(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>
    </svg>
  )
}

function Landmark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="22" x2="2" y1="10" y2="10"/><path d="M12 2v8"/><path d="m2 10 10 10 10-10"/><path d="m6 14 6 6 6-6"/>
    </svg>
  )
}

function Wheat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M20 2v12"/><path d="M15 17h6"/><path d="M18 14v6"/>
    </svg>
  )
}

function HardHat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 18a2 2 0 0 0 0 4h20a2 2 0 0 0 0-4"/><path d="M20 18a8 8 0 1 0-16 0"/><path d="M12 2v4"/><path d="M8 6h8"/>
    </svg>
  )
}

function Radio(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>
    </svg>
  )
}

function Gem(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>
    </svg>
  )
}
