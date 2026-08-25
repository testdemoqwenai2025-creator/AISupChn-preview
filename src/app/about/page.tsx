'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Target, Users, Globe, Award, Lightbulb, Heart, Eye, ArrowRight, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former VP of Supply Chain at TechCorp. 15+ years in enterprise risk management.",
    avatar: "SC"
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Ex-Google AI researcher. PhD in Machine Learning from Stanford.",
    avatar: "MR"
  },
  {
    name: "Emma Thompson",
    role: "VP of Product",
    bio: "Built supply chain products at SAP and Oracle. Industry thought leader.",
    avatar: "ET"
  },
  {
    name: "David Kim",
    role: "Head of AI Research",
    bio: "Published 30+ papers on predictive analytics. Former Amazon scientist.",
    avatar: "DK"
  }
]

const milestones = [
  { year: "2021", title: "Founded", description: "Started in San Francisco with a vision to democratize AI risk prediction" },
  { year: "2022", title: "Seed Funding", description: "Raised $5M led by Sequoia Capital" },
  { year: "2023", title: "Product Launch", description: "Launched v1.0 with 100 enterprise beta customers" },
  { year: "2024", title: "Series A", description: "Raised $25M to expand globally. Now serving 500+ enterprises" }
]

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We believe every company deserves access to world-class risk prediction technology."
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We invest heavily in R&D, publishing research and advancing the field."
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description: "Our customers' success is our success. We go above and beyond."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Building resilient supply chains across 190+ countries worldwide."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <Badge variant="secondary" className="mb-4 gap-2"><Shield className="h-4 w-4 text-primary" /> Our Story</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Predicting the Unpredictable</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make supply chains resilient using the power of artificial intelligence. 
              Founded by industry veterans who lived through major disruptions and decided to build the solution.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="glass border-primary/20 overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <Eye className="h-16 w-16 mx-auto mb-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  To empower every organization with AI-powered supply chain intelligence, 
                  enabling them to predict disruptions before they happen and build truly 
                  resilient global operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground">What drives us every day</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <Card key={i} className="hover:border-primary/50 transition-all text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-lg text-muted-foreground">Key milestones along the way</p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
              
              <div className="space-y-8">
                {milestones.map((milestone, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 border-4 border-background items-center justify-center">
                      <span className="font-bold text-primary">{milestone.year}</span>
                    </div>
                    <Card className="flex-1 hover:border-primary/50 transition-all">
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="md:hidden mb-2">{milestone.year}</Badge>
                        <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 gap-2"><Users className="h-4 w-4 text-primary" /> Leadership Team</Badge>
              <h2 className="text-3xl font-bold mb-4">Meet the Experts</h2>
              <p className="text-lg text-muted-foreground">Industry veterans building the future of supply chain intelligence</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <Card key={i} className="hover:border-primary/50 transition-all group">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform">
                      {member.avatar}
                    </div>
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex justify-center gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Us on This Journey</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented people who share our passion for innovation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/subscription">
                <Button size="lg" className="gap-2 px-10">
                  Get Started Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 px-10">
                View Open Positions
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
