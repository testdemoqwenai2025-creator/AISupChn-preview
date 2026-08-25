'use client'

import React from 'react'
import {
  Info, Target, Eye, Heart, Users, Globe, Award,
  Rocket, Lightbulb, ShieldCheck, Zap, Calendar,
  ArrowRight, CheckCircle2, Linkedin, Twitter,
  Building2, BookOpen, HandHeart, Leaf, Lock
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageDecorations } from '@/components/page-decorations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Company Values
const values = [
  {
    icon: <ShieldCheck className="h-7 w-7 text-emerald-500" />,
    title: 'Integrity First',
    description: 'We build trust through transparency. Our AI models are explainable, our data practices are ethical, and our commitments are kept.',
    color: 'from-emerald-500/20 to-green-500/20',
  },
  {
    icon: <Lightbulb className="h-7 w-7 text-amber-500" />,
    title: 'Innovation Driven',
    description: 'We push the boundaries of what\'s possible in supply chain AI. Continuous research and development keeps us at the cutting edge.',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: <Users className="h-7 w-7 text-violet-500" />,
    title: 'Customer Obsessed',
    description: 'Every decision starts with "what\'s best for our customers?" Your success is our success, and we measure ourselves by your outcomes.',
    color: 'from-violet-500/20 to-purple-500/20',
  },
  {
    icon: <Globe className="h-7 w-7 text-cyan-500" />,
    title: 'Global Impact',
    description: 'Supply chains connect the world. We believe in using technology to create more resilient, sustainable, and equitable global trade.',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: <Zap className="h-7 w-7 text-rose-500" />,
    title: 'Action Oriented',
    description: 'Insights without action are just noise. We focus on delivering actionable intelligence that drives real business decisions.',
    color: 'from-rose-500/20 to-pink-500/20',
  },
  {
    icon: <HandHeart className="h-7 w-7 text-primary" />,
    title: 'Collaborative Spirit',
    description: 'We work alongside our customers as partners. Together, we solve problems that neither could tackle alone.',
    color: 'from-primary/20 to-cyan-500/20',
  },
]

// Team Members (Placeholder)
const teamMembers = [
  {
    name: 'Dr. Alexandra Kim',
    role: 'CEO & Co-Founder',
    bio: 'Former VP at McKinsey. PhD in Operations Research from MIT. 15+ years in supply chain transformation.',
    initials: 'AK',
    color: 'from-violet-500 to-purple-500'
  },
  {
    name: 'Marcus Chen',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Google AI Lead. Built ML systems serving billions of users. Published researcher with 50+ papers.',
    initials: 'MC',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Dr. Sarah Patel',
    role: 'Chief Data Scientist',
    bio: 'Former Amazon Science. Expert in NLP and time-series prediction. Led AI teams at scale for 10+ years.',
    initials: 'SP',
    color: 'from-emerald-500 to-green-500'
  },
  {
    name: 'James Rodriguez',
    role: 'VP of Engineering',
    bio: 'Built platforms at Stripe and Airbnb. Specializes in distributed systems and real-time data processing.',
    initials: 'JR',
    color: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Emily Nakamura',
    role: 'VP of Product',
    bio: 'Product leader at Salesforce and Workday. Deep expertise in enterprise SaaS and UX design.',
    initials: 'EN',
    color: 'from-rose-500 to-pink-500'
  },
  {
    name: 'David Okafor',
    role: 'Chief Revenue Officer',
    bio: 'Scaled sales organizations at Oracle and SAP. Passionate about helping enterprises transform operations.',
    initials: 'DO',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Lisa Thompson',
    role: 'VP of Customer Success',
    bio: 'Built customer success teams at HubSpot and Zendesk. Obsessed with customer outcomes and retention.',
    initials: 'LT',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    name: 'Dr. Hans Mueller',
    role: 'Head of Compliance Research',
    bio: 'International trade law expert. Former WTO advisor. Leads our regulatory intelligence team.',
    initials: 'HM',
    color: 'from-fuchsia-500 to-pink-500'
  },
]

// Company Timeline / History
const timeline = [
  {
    year: '2019',
    title: 'Founded',
    description: 'Company founded by Dr. Alexandra Kim and Marcus Chen with a vision to bring AI to supply chain risk management.',
    milestone: true,
    icon: <Rocket className="h-5 w-5" />
  },
  {
    year: '2020',
    title: 'Seed Funding & First Product',
    description: 'Raised $5M seed round. Launched MVP with basic risk scoring for 50 pilot customers.',
    milestone: false,
    icon: <Target className="h-5 w-5" />
  },
  {
    year: '2021',
    title: 'Series A & AI Engine Launch',
    description: 'Raised $25M Series A. Released first AI-powered predictions with SHAP explainability.',
    milestone: true,
    icon: <BrainIcon className="h-5 w-5" />
  },
  {
    year: '2022',
    title: 'Enterprise Expansion',
    description: 'Reached 100+ enterprise customers. Added UFLPA compliance module. SOC 2 certified.',
    milestone: false,
    icon: <Building2 className="h-5 w-5" />
  },
  {
    year: '2023',
    title: 'Series B & Global Growth',
    description: 'Raised $75M Series B. Expanded to 40 countries. Launched EUDR and CSDDD modules.',
    milestone: true,
    icon: <Globe className="h-5 w-5" />
  },
  {
    year: '2024',
    title: 'AI Agent Platform',
    description: 'Launched autonomous AI agents. Reached 500+ customers. $2B+ in client savings generated.',
    milestone: false,
    icon: <Zap className="h-5 w-5" />
  },
  {
    year: '2025',
    title: 'Industry Leadership',
    description: 'Recognized as Gartner Cool Vendor. Expanding into new verticals and geographies.',
    milestone: true,
    icon: <Award className="h-5 w-5" />
  },
]

// Stats
const companyStats = [
  { value: '500+', label: 'Enterprise Customers', icon: Users },
  { value: '190+', label: 'Countries Covered', icon: Globe },
  { value: '$150M+', label: 'Total Funding', icon: Award },
  { value: '350+', label: 'Team Members', icon: Users },
  { value: '6', label: 'Years of Innovation', icon: Calendar },
  { value: '$2.4B+', label: 'Client Savings Generated', icon: Target },
]

// ESG Initiatives
const esgInitiatives = [
  {
    icon: <Leaf className="h-6 w-6 text-emerald-500" />,
    title: 'Environmental',
    items: ['Carbon-neutral operations since 2023', 'Green cloud infrastructure', 'Sustainable sourcing policies']
  },
  {
    icon: <Users className="h-6 w-6 text-violet-500" />,
    title: 'Social',
    items: ['Diverse workforce (52% underrepresented groups)', 'Global hiring across 30 countries', 'Employee volunteer program']
  },
  {
    icon: <Lock className="h-6 w-6 text-cyan-500" />,
    title: 'Governance',
    items: ['Independent board of directors', 'Ethics committee oversight', 'Transparent reporting']
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <PageDecorations theme="global" variant="subtle" />
      <Navbar />

      {/* Hero Section - Mission & Vision */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-tl from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 gap-2 border-blue-500/50 text-blue-500">
              <Info className="h-4 w-4" />
              About Us
            </Badge>

            <h1 className="text-5xl font-bold mb-6">
              Building the Future of{' '}
              <span className="gradient-text" style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Supply Chain Intelligence</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
              We're on a mission to make global supply chains more transparent, resilient, and sustainable
              through the power of artificial intelligence.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="glass glow-emerald">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower every organization with AI-driven supply chain intelligence that prevents disruptions,
                    ensures compliance, and enables sustainable growth — making global trade safer and more efficient for all.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass glow-cyan">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-6">
                    <Eye className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where every supply chain is fully visible, intelligently managed, and resilient to disruption —
                    where businesses can operate with confidence knowing their supply chains are protected by AI.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companyStats.map((stat, i) => (
              <div key={i} className="text-center group">
                <stat.icon className="h-6 w-6 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Heart className="h-4 w-4" /> Our Values
            </Badge>
            <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do — from product decisions to how we treat each other
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <Card key={idx} className="glass group hover:scale-[1.02] transition-all">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Users className="h-4 w-4" /> Leadership Team
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Meet Our Leaders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A world-class team of experts in AI, supply chain, and enterprise software
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <Card key={idx} className="glass group hover:scale-[1.02] transition-all text-center">
                <CardContent className="p-6 space-y-4">
                  {/* Avatar Placeholder */}
                  <div className={`w-20 h-20 rounded-full mx-auto bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white">{member.initials}</span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>

                  <div className="flex justify-center gap-2 pt-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="gap-2">
              View All Team Members
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline / History Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 gap-2 border-blue-500/50 text-blue-500">
              <Calendar className="h-4 w-4" /> Our Journey
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Company History</h2>
            <p className="text-muted-foreground">
              From a bold idea to an industry-leading platform
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <div key={idx} className={`flex gap-6 md:gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Icon */}
                  <div className="hidden md:flex flex-col items-center flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      item.milestone ? 'bg-gradient-to-br from-primary to-cyan-500 text-white' : 'glass'
                    }`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 glass rounded-xl p-6 ${item.milestone ? 'border-primary/30' : ''}`}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant={item.milestone ? 'default' : 'secondary'} className="font-mono">
                            {item.year}
                          </Badge>
                          {item.milestone && (
                            <Badge className="bg-amber-500 text-white text-xs">Milestone</Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                      </div>
                      <div className="md:hidden">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.milestone ? 'bg-gradient-to-br from-primary to-cyan-500 text-white' : 'glass'
                        }`}>
                          {item.icon}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ESG Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Leaf className="h-4 w-4" /> ESG Commitment
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Environmental, Social & Governance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in building a responsible business that creates positive impact beyond profits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {esgInitiatives.map((initiative, idx) => (
              <Card key={idx} className="glass">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {initiative.icon}
                    <CardTitle className="text-lg">{initiative.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {initiative.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="glass p-12">
            <Rocket className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We're always looking for talented people who share our passion for innovation and impact.
              Check out our open positions and help us shape the future of supply chains.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8">
                View Open Positions
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8">
                Learn About Culture
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Remote-first culture</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>350+ team members globally</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>4.8/5 Glassdoor rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>$10K learning budget</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

// Brain icon component
function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54"/>
    </svg>
  )
}
