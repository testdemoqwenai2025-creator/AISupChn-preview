'use client'

import React, { useState } from 'react'
import {
  Shield, Check, X, Zap, Star, ArrowRight, Crown,
  Building2, Rocket, Users, Headphones, Database,
  Globe, Lock, BarChart3, Brain, Cpu, Sparkles,
  Package, Truck, FileText, Bell, Settings
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageDecorations } from '@/components/page-decorations'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Product Features
const productFeatures = [
  {
    icon: <Brain className="h-7 w-7 text-violet-500" />,
    title: 'AI Risk Prediction',
    description: 'Machine learning models that predict supply chain disruptions 30 days in advance with 94%+ accuracy',
    color: 'from-violet-500/20 to-purple-500/20',
    features: ['Predictive Analytics', 'Anomaly Detection', 'Pattern Recognition', 'Auto-Remediation']
  },
  {
    icon: <Globe className="h-7 w-7 text-cyan-500" />,
    title: 'Global Supplier Mapping',
    description: 'Multi-tier supplier visibility across 190+ countries with real-time relationship mapping',
    color: 'from-cyan-500/20 to-blue-500/20',
    features: ['Tier 1-4 Mapping', 'Dependency Analysis', 'Sub-tier Discovery', 'Geographic Risk']
  },
  {
    icon: <Shield className="h-7 w-7 text-emerald-500" />,
    title: 'Compliance Automation',
    description: 'Automated compliance monitoring for UFLPA, EUDR, CSDDD, GDPR, and 40+ regulatory frameworks',
    color: 'from-emerald-500/20 to-green-500/20',
    features: ['UFLPA Screening', 'EUDR Due Diligence', 'CSDDD Reporting', 'Audit Trails']
  },
  {
    icon: <BarChart3 className="h-7 w-7 text-amber-500" />,
    title: 'Demand Forecasting',
    description: 'AI-powered demand prediction with scenario modeling and confidence intervals for planning',
    color: 'from-amber-500/20 to-orange-500/20',
    features: ['ML Forecasting', 'What-if Scenarios', 'Seasonality Adjust', 'S&OP Integration']
  },
  {
    icon: <Bell className="h-7 w-7 text-rose-500" />,
    title: 'Real-Time Alerts',
    description: 'Intelligent alert system with smart escalation, mobile push, and workflow integration',
    color: 'from-rose-500/20 to-pink-500/20',
    features: ['Smart Escalation', 'Mobile Push', 'Email Digests', 'Slack/Teams']
  },
  {
    icon: <Lock className="h-7 w-7 text-primary" />,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified platform with AES-256 encryption, SSO, and role-based access control',
    color: 'from-primary/20 to-emerald-500/20',
    features: ['SSO/SAML', 'RBAC', 'Audit Logs', 'Data Residency']
  },
]

// Pricing Tiers
const pricingTiers = [
  {
    name: 'Starter',
    price: '$499',
    period: '/month',
    description: 'Perfect for small teams getting started with supply chain visibility',
    icon: <Rocket className="h-6 w-6" />,
    popular: false,
    cta: 'Start Free Trial',
    features: [
      { name: 'Up to 100 suppliers', included: true },
      { name: 'Basic risk scoring', included: true },
      { name: 'Email alerts', included: true },
      { name: 'Standard reports', included: true },
      { name: '5 user seats', included: true },
      { name: 'API access (1K calls/day)', included: true },
      { name: 'AI predictions', included: false },
      { name: 'Custom integrations', included: false },
      { name: 'Dedicated support', included: false },
      { name: 'SLA guarantee', included: false },
    ]
  },
  {
    name: 'Professional',
    price: '$1,999',
    period: '/month',
    description: 'For growing companies needing advanced AI-powered insights',
    icon: <Zap className="h-6 w-6" />,
    popular: true,
    cta: 'Start Free Trial',
    features: [
      { name: 'Up to 1,000 suppliers', included: true },
      { name: 'Advanced AI risk scoring', included: true },
      { name: 'Multi-channel alerts', included: true },
      { name: 'Custom dashboards', included: true },
      { name: '25 user seats', included: true },
      { name: 'API access (50K calls/day)', included: true },
      { name: 'AI predictions & forecasts', included: true },
      { name: 'Standard integrations', included: true },
      { name: 'Priority support', included: true },
      { name: '99.9% SLA', included: true },
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations requiring full-scale supply chain intelligence',
    icon: <Crown className="h-6 w-6" />,
    popular: false,
    cta: 'Contact Sales',
    features: [
      { name: 'Unlimited suppliers', included: true },
      { name: 'Enterprise AI suite', included: true },
      { name: 'Intelligent alert routing', included: true },
      { name: 'White-label reports', included: true },
      { name: 'Unlimited users', included: true },
      { name: 'Unlimited API access', included: true },
      { name: 'Full AI/ML capabilities', included: true },
      { name: 'Custom integrations & APIs', included: true },
      { name: 'Dedicated success manager', included: true },
      { name: '99.99% SLA + uptime credit', included: true },
    ]
  },
]

// Feature Comparison Data
const featureComparison = [
  {
    category: 'Core Features',
    items: [
      { feature: 'Supplier Management', starter: '100 suppliers', professional: '1,000 suppliers', enterprise: 'Unlimited' },
      { feature: 'Risk Scoring Engine', starter: 'Basic', professional: 'AI-Powered', enterprise: 'Enterprise ML' },
      { feature: 'Alert System', starter: 'Email only', professional: 'Multi-channel', enterprise: 'Intelligent Routing' },
      { feature: 'Dashboard Customization', starter: 'Limited', professional: 'Full', enterprise: 'White-label' },
      { feature: 'Reports & Analytics', starter: 'Standard', professional: 'Advanced', enterprise: 'Custom + API' },
    ]
  },
  {
    category: 'AI & Intelligence',
    items: [
      { feature: 'Predictive Analytics', starter: '—', professional: 'Included', enterprise: 'Advanced' },
      { feature: 'Demand Forecasting', starter: '—', professional: 'Basic', enterprise: 'Full Suite' },
      { feature: 'NLP Document Analysis', starter: '—', professional: '—', enterprise: 'Included' },
      { feature: 'SHAP Explainability', starter: '—', professional: 'Basic', enterprise: 'Full' },
      { feature: 'Custom Model Training', starter: '—', professional: '—', enterprise: 'Included' },
    ]
  },
  {
    category: 'Integration & API',
    items: [
      { feature: 'API Access', starter: '1K calls/day', professional: '50K calls/day', enterprise: 'Unlimited' },
      { feature: 'ERP Integrations', starter: '—', professional: 'SAP, Oracle', enterprise: 'All + Custom' },
      { feature: 'Webhooks', starter: '—', professional: 'Included', enterprise: 'Advanced' },
      { feature: 'Data Export', starter: 'CSV', professional: 'CSV, API', enterprise: 'All Formats' },
      { feature: 'SSO / SAML', starter: '—', professional: 'Included', enterprise: 'Advanced SSO' },
    ]
  },
  {
    category: 'Support & Security',
    items: [
      { feature: 'Support Level', starter: 'Email', professional: 'Priority', enterprise: '24/7 Dedicated' },
      { feature: 'SLA Guarantee', starter: '99%', professional: '99.9%', enterprise: '99.99%' },
      { feature: 'Training & Onboarding', starter: 'Self-serve', professional: 'Guided', enterprise: 'Dedicated CSM' },
      { feature: 'Compliance Certifications', starter: 'SOC 2', professional: 'SOC 2 + GDPR', enterprise: 'Full Suite' },
      { feature: 'Data Residency Options', starter: '—', professional: 'US/EU', enterprise: 'Global' },
    ]
  },
]

export default function ProductPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  return (
    <div className="min-h-screen bg-background relative">
      <PageDecorations theme="technology" variant="subtle" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 gap-2 border-primary/50">
              <Package className="h-4 w-4" />
              Product Suite
            </Badge>

            <h1 className="text-5xl font-bold mb-6">
              Complete Supply Chain{' '}
              <span className="gradient-text">Intelligence Platform</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Everything you need to monitor, predict, and protect your global supply chain.
              From AI-powered risk detection to automated compliance — all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8">
                <Sparkles className="h-5 w-5" />
                Start 14-Day Free Trial
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8">
                Watch Demo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Star className="h-4 w-4" /> Powerful Features
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Built for Enterprise Scale</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Six integrated modules delivering end-to-end supply chain intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productFeatures.map((feature, idx) => (
              <Card key={idx} className="group glass hover:scale-[1.02] transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>

                  <div className="space-y-2">
                    {feature.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Cpu className="h-4 w-4" /> Pricing Plans
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Transparent, Scalable Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1 glass rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  billingCycle === 'annual' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Annual
                <Badge className="bg-emerald-500 text-white text-xs px-1.5 py-0">Save 20%</Badge>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, idx) => (
              <Card key={idx} className={`glass relative ${tier.popular ? 'border-primary shadow-xl scale-105' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-cyan-500 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" /> Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      tier.popular ? 'bg-gradient-to-br from-primary/20 to-cyan-500/20 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      {tier.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Button className={`w-full ${tier.popular ? '' : 'variant-outline'}`} size="lg">
                    {tier.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
                <CardFooter className="flex-col">
                  <div className="w-full space-y-3 pt-4 border-t">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-muted-foreground/60'}>{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 gap-2">
              <BarChart3 className="h-4 w-4" /> Compare Plans
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Detailed Feature Comparison</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="space-y-12">
            {featureComparison.map((category, catIdx) => (
              <div key={catIdx}>
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  {category.category}
                </h3>
                <Card className="glass overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-left p-4 font-semibold">Feature</th>
                          <th className="text-center p-4 font-semibold min-w-[150px]">Starter</th>
                          <th className="text-center p-4 font-semibold min-w-[150px] bg-primary/5">Professional</th>
                          <th className="text-center p-4 font-semibold min-w-[150px]">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, itemIdx) => (
                          <tr key={itemIdx} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                            <td className="p-4 font-medium text-sm">{item.feature}</td>
                            <td className="p-4 text-center text-sm">
                              {item.starter === '—' ? (
                                <span className="text-muted-foreground/40">—</span>
                              ) : (
                                <span>{item.starter}</span>
                              )}
                            </td>
                            <td className="p-4 text-center text-sm bg-primary/5">
                              <span className="font-medium text-primary">{item.professional}</span>
                            </td>
                            <td className="p-4 text-center text-sm">
                              <span className="font-medium">{item.enterprise}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 500+ enterprises already using our platform to protect and optimize their supply chains
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {['Fortune 500 Manufacturing', 'Global Retail Chain', 'Tech Giant', 'Automotive Leader', 
              'Pharma Corporation', 'Energy Company', 'Logistics Provider', 'Financial Institution'].map((company, i) => (
              <div key={i} className="glass p-4 rounded-lg text-center">
                <Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <div className="text-xs font-medium text-muted-foreground">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="glass glow-emerald p-12">
            <Rocket className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Start your 14-day free trial today. No credit card required. Full access to all Professional features.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8">
                <Headphones className="h-5 w-5" />
                Talk to Sales
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
