'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, Activity, Brain, AlertTriangle, ArrowRight, Zap, Globe, TrendingUp, Target, Star, Sparkles, Rocket, Users, Building2, CheckCircle2, ArrowDown, Clock, Radio, BarChart3, Lock, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { AIRiskPredictionCard, GlobalSupplyMappingCard, ComplianceAutomationCard, BuildingInProgressCard } from '@/components/functional-cards-enhanced'
import { EnhancedNewsIntelligenceFeed } from '@/components/enhanced-news-feed'
import { FreemiumSubscription } from '@/components/freemium-subscription'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Simple Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <Shield className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-bold text-lg">AI Supply Chain</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm hover:text-primary">Dashboard</Link>
              <Link href="/command-center" className="text-sm hover:text-primary">Command Center</Link>
              <Link href="/subscription" className="text-sm hover:text-primary">Pricing</Link>
              <Button size="sm" variant="outline" className="gap-2">Login</Button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 grid-bg opacity-20" />
        
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            
            {/* LEFT SIDE - Content */}
            <div className="max-w-2xl text-center lg:text-left">
              <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2 bg-primary/10 border border-primary/20">
                <Zap className="h-4 w-4 text-primary animate-pulse" />
                AI-Powered Supply Chain Intelligence
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Predict Risks Before They
                <span className="gradient-text block mt-2">Disrupt Your Supply Chain</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Enterprise-grade AI platform with <span className="text-primary font-semibold">94% accuracy</span> across <span className="text-cyan-400 font-semibold">190+ countries</span>. Real-time risk prediction, compliance automation, and global supply mapping.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2 px-10 h-14 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 shadow-lg hover:shadow-xl group text-base w-full sm:w-auto">
                    Launch Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="gap-2 px-10 h-14 border-2 hover:bg-muted group text-base w-full sm:w-auto">
                    <Activity className="h-5 w-5" /> Explore Features
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0">
                {[
                  { value: '94%', label: 'Accuracy', icon: Target },
                  { value: '190+', label: 'Countries', icon: Globe },
                  { value: '<5min', label: 'Alert Time', icon: AlertTriangle },
                  { value: '$12B+', label: 'Mitigated', icon: TrendingUp },
                ].map((stat, i) => (
                  <div key={i} className="glass rounded-lg p-3 text-center group hover:scale-105 transition-all border border-transparent hover:border-primary/20">
                    <stat.icon className="h-4 w-4 mx-auto mb-1 text-primary" />
                    <div className="text-lg font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - Vertical Banner */}
            <div className="relative hidden lg:block flex-shrink-0">
              <div className="relative w-[280px] h-[600px]">
                <div className="absolute inset-0 glass rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col">
                  
                  <div className="bg-gradient-to-b from-violet-600 via-purple-600 to-cyan-600 p-6 flex-shrink-0">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Shield className="h-8 w-8 text-white" />
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">AI Command Center</div>
                        <div className="text-sm text-white/80">Live Risk Monitoring</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-white/90">Real-time Active</span>
                    </div>
                  </div>

                  <div className="flex-1 p-4 space-y-4 bg-slate-900/60 overflow-hidden">
                    <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl p-4 border border-amber-500/30">
                      <div className="text-xs text-white/60 mb-2 text-center">Global Risk Index</div>
                      <div className="text-3xl font-bold text-amber-400 text-center mb-1">MEDIUM</div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full" style={{width: '58%'}}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Suppliers', value: '2,847', color: 'text-emerald-400' },
                        { label: 'Alerts', value: '23', color: 'text-red-400' },
                        { label: 'Regions', value: '190+', color: 'text-blue-400' },
                        { label: 'Uptime', value: '99.9%', color: 'text-green-400' },
                      ].map((metric, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                          <div className="text-sm font-bold text-white">{metric.value}</div>
                          <div className="text-xs text-white/50">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {[
                        { type: 'critical', msg: 'Taiwan Strait delay risk', time: '2m ago' },
                        { type: 'warning', msg: 'Supplier risk elevated', time: '15m ago' },
                        { type: 'info', msg: 'New compliance rule active', time: '1h ago' },
                      ].map((alert, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded bg-white/5 text-xs">
                          <div className={`w-1.5 h-1.5 rounded-full ${alert.type === 'critical' ? 'bg-red-400' : alert.type === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}`}/>
                          <span className="text-white/70 truncate flex-1">{alert.msg}</span>
                          <span className="text-white/40">{alert.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute top-24 -left-6 glass rounded-lg px-3 py-2 shadow-lg animate-float border border-violet-500/30">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-violet-400" />
                      <div>
                        <div className="text-xs font-bold text-white">AI Engine</div>
                        <div className="text-xs text-emerald-400">94% Accurate</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-32 -right-6 glass rounded-lg px-3 py-2 shadow-lg animate-float border border-cyan-500/30" style={{animationDelay: '2s'}}>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">🌐</span>
                      <div>
                        <div className="text-xs font-bold text-white">190+</div>
                        <div className="text-xs text-blue-400">Countries</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-4 bg-gradient-to-b from-violet-500/20 via-cyan-500/10 to-blue-500/20 rounded-3xl blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Enterprise Clients', icon: Building2 },
              { value: '94%', label: 'Prediction Accuracy', icon: Star },
              { value: '$12B+', label: 'Risk Mitigated', icon: TrendingUp },
              { value: '190+', label: 'Countries Covered', icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED FUNCTIONAL FEATURES SECTION */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2"><Sparkles className="h-4 w-4 text-primary" /> Interactive AI Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Tools at Your Fingertips</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Real-time data integration with interactive controls. Try them now!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* AI Risk Prediction Card - FULL INTERACTIVE VERSION */}
            <AIRiskPredictionCard />
            
            {/* Global Supply Mapping Card - FULL INTERACTIVE VERSION */}
            <GlobalSupplyMappingCard />
            
            {/* Compliance Automation Card - FULL INTERACTIVE VERSION */}
            <ComplianceAutomationCard />
          </div>

          {/* Upcoming Features */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              <Badge variant="secondary" className="mr-2 gap-2"><Rocket className="h-4 w-4 text-primary" /> Coming Soon</Badge>
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <BuildingInProgressCard 
                title="RSS News Integration"
                description="Real-time feeds from Reuters, Bloomberg, WSJ with AI-powered sentiment analysis"
                icon={<Radio className="h-6 w-6 text-white" />}
                estimatedDate="Q4 2024"
                gradientClass="from-blue-500 to-indigo-600"
                features={[
                  'Reuters & Bloomberg integration',
                  'AI sentiment analysis',
                  'Custom keyword alerts',
                  'Risk impact scoring',
                  'Email digest delivery'
                ]}
              />
              <BuildingInProgressCard 
                title="Financial Data API"
                description="Connect to public financial databases for supplier risk scoring and health monitoring"
                icon={<BarChart3 className="h-6 w-6 text-white" />}
                estimatedDate="Q1 2025"
                gradientClass="from-emerald-500 to-teal-600"
                features={[
                  'SEC filings analysis',
                  'Credit score monitoring',
                  'Financial health indicators',
                  'Bankruptcy prediction',
                  'Market cap tracking'
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEWS INTELLIGENCE FEED - FULL VERSION */}
      <EnhancedNewsIntelligenceFeed />

      {/* FREEMIUM SUBSCRIPTION PRICING - FULL VERSION */}
      <FreemiumSubscription />

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2"><Zap className="h-4 w-4 text-primary" /> How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Three simple steps to supply chain resilience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect Your Suppliers',
                description: 'Upload your supplier list or integrate via API. Our AI maps relationships across 190+ countries automatically.',
                icon: Globe,
                features: ['CSV upload', 'API integration', 'Auto-discovery']
              },
              {
                step: '02',
                title: 'AI Analyzes Risks',
                description: 'Our machine learning models analyze weather, geopolitical, financial, and compliance data 24/7.',
                icon: Brain,
                features: ['Weather data', 'Geopolitical monitoring', 'Financial analysis']
              },
              {
                step: '03',
                title: 'Get Proactive Alerts',
                description: 'Receive actionable alerts before disruptions occur. Average warning time: under 5 minutes.',
                icon: AlertTriangle,
                features: ['Real-time alerts', 'Email/SMS/Slack', 'Action recommendations']
              }
            ].map((item, i) => (
              <Card key={i} className="relative overflow-hidden group hover:border-primary/50 transition-all">
                <CardContent className="p-8">
                  <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">{item.step}</div>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / SOCIAL PROOF */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2"><Users className="h-4 w-4 text-primary" /> Trusted by Industry Leaders</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "We avoided a $2M disruption thanks to the early warning system. The ROI was visible within the first month.",
                author: "Sarah Chen",
                role: "VP Supply Chain",
                company: "TechCorp Global",
                avatar: "SC"
              },
              {
                quote: "The compliance automation alone saved our team 40 hours per month. It's like having a dedicated analyst.",
                author: "Michael Rodriguez",
                role: "Chief Procurement Officer",
                company: "ManufacturePlus",
                avatar: "MR"
              },
              {
                quote: "The AI predictions are remarkably accurate. We've reduced our safety stock by 23% while improving service levels.",
                author: "Emma Thompson",
                role: "Director of Operations",
                company: "RetailMax Inc.",
                avatar: "ET"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS SECTION */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2"><Lock className="h-4 w-4 text-primary" /> Enterprise Integrations</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Connects With Your Stack</h2>
            <p className="text-xl text-muted-foreground">Seamless integration with your existing tools and workflows</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['SAP', 'Oracle', 'Salesforce', 'ServiceNow', 'Slack', 'Teams', 'Workday', 'Coupa', 'Jaggaer', 'GEP', 'Azure', 'AWS'].map((integration, i) => (
              <div key={i} className="glass rounded-xl p-4 flex items-center justify-center h-20 hover:border-primary/50 transition-all cursor-pointer group">
                <span className="font-semibold text-muted-foreground group-hover:text-primary transition-colors text-sm">{integration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Supply Chain?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join 500+ enterprises using AI to predict and prevent disruptions</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 px-10 h-14 bg-gradient-to-r from-primary to-cyan-500">
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/subscription">
              <Button size="lg" variant="outline" className="gap-2 px-10 h-14">
                View Pricing
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <HeadphonesIcon className="h-4 w-4 text-emerald-400" />
              Free onboarding support
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div><div className="flex items-center gap-2 mb-4"><Shield className="h-6 w-6 text-primary" /><span className="font-bold">AI Supply Chain</span></div><p className="text-sm text-muted-foreground">Enterprise-grade AI supply chain risk prediction platform.</p></div>
            <div><h4 className="font-semibold mb-4">Product</h4><ul className="space-y-2 text-sm text-muted-foreground"><li><Link href="/dashboard">Dashboard</Link></li><li><Link href="/command-center">Command Center</Link></li><li><Link href="/subscription">Pricing</Link></li><li><Link href="/intelligence">AI Intelligence</Link></li></ul></div>
            <div><h4 className="font-semibold mb-4">Company</h4><ul className="space-y-2 text-sm text-muted-foreground"><li><Link href="/about">About Us</Link></li><li><Link href="/customers">Customers</Link></li><li><Link href="/events">Events</Link></li><li><Link href="/support">Support</Link></li></ul></div>
            <div><h4 className="font-semibold mb-4">Resources</h4><ul className="space-y-2 text-sm text-muted-foreground"><li><Link href="/platform">Platform</Link></li><li><Link href="/industries">Industries</Link></li><li><a href="#">Documentation</a></li><li><a href="#">API Reference</a></li></ul></div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div>© 2024 AI Supply Chain Risk Predictor. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">GDPR</a>
              <a href="#" className="hover:text-primary">SOC 2</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
