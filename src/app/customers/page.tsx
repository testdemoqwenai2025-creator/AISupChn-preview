'use client'

import React from 'react'
import {
  Users, Star, Quote, Building2, Globe, TrendingUp,
  Award, CheckCircle2, ArrowRight, MessageSquare,
  ThumbsUp, Target, Zap, ShieldCheck, Heart
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageDecorations } from '@/components/page-decorations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Customer Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'VP of Supply Chain Operations',
    company: 'GlobalTech Manufacturing',
    logo: 'GT',
    quote: 'The AI predictions have been remarkably accurate. We prevented three major supply disruptions last quarter that would have cost us over $12M. The ROI was evident within the first 90 days.',
    rating: 5,
    results: ['$12M+ in savings', '3 disruptions prevented', '94% prediction accuracy'],
    industry: 'Manufacturing',
    image: null
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    title: 'Chief Procurement Officer',
    company: 'RetailMax Corporation',
    logo: 'RM',
    quote: 'Implementing this platform transformed our supplier risk management. We went from reactive firefighting to proactive risk mitigation. Our compliance team loves the automated UFLPA screening.',
    rating: 5,
    results: ['60% faster audits', '100% UFLPA compliance', '200+ suppliers monitored'],
    industry: 'Retail',
    image: null
  },
  {
    id: 3,
    name: 'Dr. Emma Wilkinson',
    title: 'Director of Quality Assurance',
    company: 'PharmaLife International',
    logo: 'PL',
    quote: 'In pharmaceuticals, supply chain integrity is non-negotiable. This platform gives us complete visibility into our cold chain and raw material sources. The regulatory compliance features are exceptional.',
    rating: 5,
    results: ['Zero compliance violations', '99.9% traceability', 'FDA audit ready'],
    industry: 'Healthcare',
    image: null
  },
  {
    id: 4,
    name: 'James Nakamura',
    title: 'VP of Global Sourcing',
    company: 'AutoParts Industries',
    logo: 'AP',
    quote: 'The semiconductor shortage early warning system alone paid for the entire platform. We secured alternative sources 45 days before our competitors even knew there was a problem.',
    rating: 5,
    results: ['$8M shortage costs avoided', '45-day advance warning', '15 alternative sources found'],
    industry: 'Automotive',
    image: null
  },
  {
    id: 5,
    name: 'Priya Sharma',
    title: 'Chief Sustainability Officer',
    company: 'EcoWear Fashion Group',
    logo: 'EW',
    quote: 'Sustainability compliance used to be a manual nightmare. Now we have real-time EUDR tracking and automated sustainability reporting. Our stakeholders are impressed with the transparency we can provide.',
    rating: 5,
    results: ['80% less manual work', '100% EUDR compliant', 'ESG score improved +25pts'],
    industry: 'Fashion/Retail',
    image: null
  },
  {
    id: 6,
    name: 'David Mueller',
    title: 'CTO',
    company: 'CloudScale Technologies',
    logo: 'CS',
    quote: 'As a tech company, we need component-level intelligence. The platform\'s ability to track individual chips and provide trade restriction alerts is unmatched. Essential for our global operations.',
    rating: 5,
    results: ['500K components tracked', '<5 min alert time', 'Zero trade violations'],
    industry: 'Technology',
    image: null
  },
]

// Case Studies
const caseStudies = [
  {
    id: 'cs-001',
    title: 'Fortune 100 Manufacturer Prevents $50M Production Stoppage',
    company: 'Global Automotive Corp',
    industry: 'Automotive',
    challenge: 'Facing potential line stoppage due to undetected Tier-3 semiconductor supplier risk',
    solution: 'Deployed AI-powered multi-tier monitoring with 60-day advance warning system',
    results: [
      { metric: '$50M+', label: 'Costs Avoided' },
      { metric: '0', label: 'Production Days Lost' },
      { metric: '45 days', label: 'Advance Warning' },
    ],
    timeline: '6 months',
    readTime: '8 min'
  },
  {
    id: 'cs-002',
    title: 'Global Retailer Achieves Full UFLPA Compliance',
    company: 'MegaRetail Inc',
    industry: 'Retail',
    challenge: 'Needed to screen 12,000+ suppliers across complex product categories for forced labor risks',
    solution: 'Implemented automated UFLPA screening with document analysis and continuous monitoring',
    results: [
      { metric: '12K+', label: 'Suppliers Screened' },
      { metric: '100%', label: 'Compliance Rate' },
      { metric: '85%', label: 'Time Reduction' },
    ],
    timeline: '4 months',
    readTime: '6 min'
  },
  {
    id: 'cs-003',
    title: 'Pharma Leader Secures Cold Chain Across 40 Countries',
    company: 'MediCare Global',
    industry: 'Healthcare',
    challenge: 'Maintaining temperature-controlled integrity for life-saving medications globally',
    solution: 'IoT-integrated cold chain monitoring with predictive anomaly detection',
    results: [
      { metric: '99.99%', label: 'Chain Integrity' },
      { metric: '40', label: 'Countries Covered' },
      { metric: '<0.1%', label: 'Excursion Rate' },
    ],
    timeline: '9 months',
    readTime: '10 min'
  },
  {
    id: 'cs-004',
    title: 'Tech Giant Reduces Component Lead Times by 35%',
    company: 'InnovateTech Systems',
    industry: 'Technology',
    challenge: 'Unpredictable lead times causing inventory and production planning issues',
    solution: 'AI demand forecasting combined with supplier health scoring and alternative sourcing',
    results: [
      { metric: '35%', label: 'Lead Time Reduction' },
      { metric: '$22M', label: 'Inventory Savings' },
      { metric: '92%', label: 'Forecast Accuracy' },
    ],
    timeline: '5 months',
    readTime: '7 min'
  },
]

// Customer Logos (Placeholder)
const customerLogos = [
  { name: 'Fortune 500 Manufacturer', abbr: 'F5M' },
  { name: 'Global Retail Chain', abbr: 'GRC' },
  { name: 'Tech Industry Leader', abbr: 'TIL' },
  { name: 'Pharmaceutical Giant', abbr: 'PG' },
  { name: 'Automotive Innovator', abbr: 'AI' },
  { name: 'Energy Corporation', abbr: 'EC' },
  { name: 'Financial Services Firm', abbr: 'FSF' },
  { name: 'Consumer Goods Company', abbr: 'CGC' },
  { name: 'Aerospace & Defense', abbr: 'A&D' },
  { name: 'Telecommunications', abbr: 'TC' },
  { name: 'Food & Beverage', abbr: 'F&B' },
  { name: 'Chemical Industries', abbr: 'CI' },
  { name: 'Logistics Provider', abbr: 'LP' },
  { name: 'Mining Conglomerate', abbr: 'MC' },
  { name: 'Government Agency', abbr: 'GA' },
  { name: 'Healthcare System', abbr: 'HS' },
  { name: 'E-commerce Platform', abbr: 'EP' },
  { name: 'Construction Group', abbr: 'CGx' },
  { name: 'Agriculture Co-op', abbr: 'AC' },
  { name: 'Media Conglomerate', abbr: 'MCx' },
]

// Stats
const customerStats = [
  { value: '500+', label: 'Enterprise Customers', icon: Users, description: 'Trust us worldwide' },
  { value: '40+', label: 'Countries', icon: Globe, description: 'Global presence' },
  { value: '98.7%', label: 'Retention Rate', icon: Heart, description: 'Customer satisfaction' },
  { value: '4.9/5', label: 'Average Rating', icon: Star, description: 'Based on 1,200+ reviews' },
  { value: '$2.4B+', label: 'Client Savings', icon: TrendingUp, description: 'Generated for customers' },
  { value: '24/7', label: 'Support Coverage', icon: ShieldCheck, description: 'Always available' },
]

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <PageDecorations theme="default" variant="subtle" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 gap-2">
              <Users className="h-4 w-4" />
              Our Customers
            </Badge>

            <h1 className="text-5xl font-bold mb-6">
              Trusted by Industry{' '}
              <span className="gradient-text">Leaders</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              From Fortune 500 companies to innovative startups, organizations worldwide rely on our platform
              to protect and optimize their supply chains.
            </p>

            {/* Main Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {customerStats.map((stat, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center group hover:scale-105 transition-transform">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm font-medium mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground hidden sm:block">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Logos Grid */}
      <section className="py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted by leading organizations worldwide
          </p>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {customerLogos.map((customer, i) => (
              <div
                key={i}
                className="glass-hover p-4 rounded-lg flex items-center justify-center aspect-square cursor-pointer group"
                title={customer.name}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-cyan-500/20 transition-colors">
                  <span className="font-bold text-sm text-primary/70 group-hover:text-primary transition-colors">{customer.abbr}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <MessageSquare className="h-4 w-4" /> Testimonials
            </Badge>
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear directly from supply chain leaders who have transformed their operations with our platform
            </p>
          </div>

          {/* Featured Testimonial */}
          <Card className="glass glow-emerald mb-12 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-12 w-12 text-primary/30 mb-6" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                "The AI predictions have been remarkably accurate. We prevented three major supply disruptions last quarter that would have cost us over $12M. The ROI was evident within the first 90 days."
              </blockquote>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center">
                    <span className="font-bold text-primary">SC</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">VP of Supply Chain Operations, GlobalTech Manufacturing</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(1).map((testimonial) => (
              <Card key={testimonial.id} className="glass group hover:scale-[1.02] transition-all">
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center font-bold text-primary text-sm">
                        {testimonial.logo}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">{testimonial.industry}</Badge>
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {/* Results */}
                  <div className="pt-3 border-t space-y-1.5">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Results</div>
                    {testimonial.results.map((result, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 gap-2">
              <Award className="h-4 w-4" /> Case Studies
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive deep into how leading organizations achieved transformative results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="glass group hover:scale-[1.01] transition-all overflow-hidden">
                {/* Color bar at top */}
                <div className={`h-1.5 bg-gradient-to-r ${
                  study.industry === 'Automotive' ? 'from-amber-500 to-orange-500' :
                  study.industry === 'Retail' ? 'from-violet-500 to-purple-500' :
                  study.industry === 'Healthcare' ? 'from-rose-500 to-pink-500' :
                  'from-cyan-500 to-blue-500'
                }`} />

                <CardContent className="p-6 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">{study.industry}</Badge>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{study.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{study.company}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Challenge</div>
                      <p className="text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Solution</div>
                      <p className="text-sm">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                    {study.results.map((result, i) => (
                      <div key={i} className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-lg font-bold text-primary">{result.metric}</div>
                        <div className="text-xs text-muted-foreground">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Timeline: {study.timeline}</span>
                      <span>Read time: {study.readTime}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Read Case Study
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 gap-2">
                <ThumbsUp className="h-4 w-4" /> Recognition
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Industry Recognition & Awards</h2>
              <p className="text-muted-foreground mb-8">
                Our commitment to innovation and customer success has been recognized by leading industry analysts and publications.
              </p>

              <div className="space-y-4">
                {[
                  { award: 'Gartner Cool Vendor in Supply Chain Risk Management', year: '2024', org: 'Gartner' },
                  { award: 'Best AI/ML Solution for Supply Chain', year: '2024', org: 'Supply Chain World Awards' },
                  { award: 'Top 10 Supply Chain Technology Providers', year: '2024', org: 'CIOReview' },
                  { award: 'Innovation Excellence Award', year: '2023', org: 'SCM World' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 glass rounded-lg">
                    <Award className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{item.award}</div>
                      <div className="text-xs text-muted-foreground">{item.org} • {item.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="glass p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">Customer Satisfaction Metrics</h3>
              <div className="space-y-6">
                {[
                  { label: 'Overall Satisfaction', value: 96, color: 'from-emerald-500 to-green-500' },
                  { label: 'Product Quality', value: 94, color: 'from-cyan-500 to-blue-500' },
                  { label: 'Customer Support', value: 97, color: 'from-violet-500 to-purple-500' },
                  { label: 'Value for Money', value: 92, color: 'from-amber-500 to-orange-500' },
                  { label: 'Likelihood to Recommend (NPS)', value: 88, color: 'from-rose-500 to-pink-500' },
                ].map((metric, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.label}</span>
                      <span className="font-bold text-primary">{metric.value}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t text-center">
                  <div className="text-4xl font-bold text-primary">78</div>
                  <div className="text-sm text-muted-foreground">Net Promoter Score (Industry avg: 32)</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="glass p-12">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Join 500+ Happy Customers</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              See why leading enterprises trust us for their supply chain intelligence needs.
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8">
                Talk to a Customer
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
