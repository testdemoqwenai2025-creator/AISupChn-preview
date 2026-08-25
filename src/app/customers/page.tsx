'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Building2, Star, Quote, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'

const customerLogos = [
  "TechCorp Global", "ManufacturePlus", "RetailMax Inc.", 
  "PharmaHealth", "AutoParts Co.", "EnergyFirst",
  "FoodChain Ltd", "LogiTech Solutions"
]

const testimonials = [
  {
    quote: "We avoided a $2M disruption thanks to the early warning system. The ROI was visible within the first month of implementation.",
    author: "Sarah Chen",
    role: "VP Supply Chain Operations",
    company: "TechCorp Global",
    avatar: "SC",
    results: ["$2M disruption avoided", "94% prediction accuracy", "ROI in 30 days"]
  },
  {
    quote: "The compliance automation alone saved our team 40 hours per month. It's like having a dedicated analyst working around the clock.",
    author: "Michael Rodriguez",
    role: "Chief Procurement Officer",
    company: "ManufacturePlus",
    avatar: "MR",
    results: ["40+ hours saved/month", "100% audit ready", "Zero compliance violations"]
  },
  {
    quote: "The AI predictions are remarkably accurate. We've reduced our safety stock by 23% while actually improving our service levels to customers.",
    author: "Emma Thompson",
    role: "Director of Operations",
    company: "RetailMax Inc.",
    avatar: "ET",
    results: ["23% less inventory", "+5% service levels", "$1.2M cost savings"]
  },
  {
    quote: "Implementation was seamless and the support team went above and beyond. We were fully operational in just 3 weeks.",
    author: "David Kim",
    role: "VP of Logistics",
    company: "PharmaHealth",
    avatar: "DK",
    results: ["3-week deployment", "190 countries covered", "24/7 monitoring"]
  },
  {
    quote: "Finally, a platform that gives us visibility into Tier 2 and Tier 3 suppliers. This was impossible before AI Supply Chain.",
    author: "Lisa Wang",
    role: "Chief Risk Officer",
    company: "AutoParts Co.",
    avatar: "LW",
    results: ["Full tier visibility", "Risk reduced by 67%", "Real-time alerts"]
  },
  {
    quote: "The global mapping feature is incredible. We can see our entire supply network on one screen and identify risks instantly.",
    author: "James Miller",
    role: "SVP Supply Chain",
    company: "EnergyFirst",
    avatar: "JM",
    results: ["Single pane of glass", "Instant risk ID", "Proactive management"]
  }
]

const caseStudies = [
  {
    title: "Semiconductor Supply Chain Resilience",
    company: "TechCorp Global",
    challenge: "Heavy reliance on Taiwan-sourced semiconductors with no visibility into disruption risks",
    solution: "Implemented AI-powered risk prediction with alternative supplier identification",
    results: [
      { metric: "Risk Reduction", value: "73%" },
      { metric: "Alternative Suppliers Identified", value: "12" },
      { metric: "Response Time Improvement", value: "85%" }
    ]
  },
  {
    title: "Regulatory Compliance Automation",
    company: "PharmaHealth",
    challenge: "Manual compliance tracking across 50+ suppliers in highly regulated industry",
    solution: "Deployed automated compliance monitoring for GDPR, FDA, and ISO standards",
    results: [
      { metric: "Audit Preparation Time", value: "-90%" },
      { metric: "Compliance Score", value: "99.2%" },
      { metric: "Manual Effort Saved", value: "500 hrs/yr" }
    ]
  }
]

export default function CustomersPage() {
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
            
            <Badge variant="secondary" className="mb-4 gap-2"><Star className="h-4 w-4 text-primary" /> Customer Success</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Industry Leaders</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Over 500 enterprises worldwide rely on AI Supply Chain to predict disruptions 
              and build resilient operations.
            </p>
          </div>
        </section>

        {/* Customer Logos */}
        <section className="py-12 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground mb-8">Companies that trust us</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {customerLogos.map((company, i) => (
                <div key={i} className="flex items-center justify-center p-4 glass rounded-lg hover:border-primary/30 transition-all">
                  <Building2 className="h-6 w-6 text-muted-foreground mr-2" />
                  <span className="font-semibold text-sm text-muted-foreground">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "500+", label: "Enterprise Clients" },
                { value: "94%", label: "Customer Satisfaction" },
                { value: "$12B+", label: "Risk Mitigated" },
                { value: "99.9%", label: "Platform Uptime" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 gap-2"><Quote className="h-4 w-4 text-primary" /> Customer Stories</Badge>
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <Card key={i} className="hover:border-primary/50 transition-all h-full flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-6 flex-1 italic">"{testimonial.quote}"</blockquote>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{testimonial.author}</div>
                          <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                          <div className="text-xs text-primary">{testimonial.company}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border/50">
                      {testimonial.results.map((result, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
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

        {/* Case Studies */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 gap-2"><Shield className="h-4 w-4 text-primary" /> Case Studies</Badge>
              <h2 className="text-3xl font-bold mb-4">Real Results, Real Impact</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, i) => (
                <Card key={i} className="overflow-hidden hover:border-primary/50 transition-all">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-primary/20 to-cyan-500/20 p-6">
                      <Badge variant="secondary" className="mb-2">Case Study</Badge>
                      <h3 className="text-xl font-bold mb-1">{study.title}</h3>
                      <p className="text-sm text-muted-foreground">{study.company}</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Challenge</h4>
                        <p className="text-sm text-muted-foreground">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Solution</h4>
                        <p className="text-sm text-muted-foreground">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Results</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {study.results.map((result, j) => (
                            <div key={j} className="text-center p-2 bg-muted/50 rounded-lg">
                              <div className="text-lg font-bold text-primary">{result.value}</div>
                              <div className="text-[10px] text-muted-foreground">{result.metric}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full gap-2 mt-2">
                        Read Full Case Study
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join These Success Stories</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your free trial today and see why 500+ enterprises trust AI Supply Chain.
            </p>
            <Link href="/subscription">
              <Button size="lg" className="gap-2 px-10 h-14">
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
