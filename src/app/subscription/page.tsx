'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Star, Zap, Rocket, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'

export default function SubscriptionPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      icon: Zap,
      color: 'from-gray-500 to-slate-500',
      features: [
        '100 predictions/month',
        '100 API calls/day',
        'Basic analytics',
        'Email support',
        '3 supplier profiles',
        'Community access'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing businesses',
      icon: Rocket,
      color: 'from-primary to-cyan-500',
      features: [
        '1,000 predictions/month',
        '500 API calls/day',
        'Advanced analytics',
        'Priority support',
        '50 supplier profiles',
        'Custom integrations',
        'Real-time alerts',
        'API access'
      ],
      cta: 'Start 14-Day Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      icon: Crown,
      color: 'from-violet-600 to-purple-600',
      features: [
        'Unlimited predictions',
        'Unlimited API calls',
        'Custom analytics',
        '24/7 dedicated support',
        'Unlimited suppliers',
        'White-label solution',
        'SLA guarantee',
        'On-premise option'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 gap-2">
            <Star className="h-4 w-4 text-primary" />
            Flexible Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scale your supply chain intelligence with the right plan for your business
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`glass rounded-2xl p-6 border relative ${
                plan.popular ? 'border-primary shadow-lg shadow-primary/20 scale-105' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-cyan-500 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                <plan.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-cyan-500' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center glass rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-bold mb-2">Need a custom solution?</h2>
          <p className="text-muted-foreground mb-4">
            Our enterprise team can build a tailored plan for your organization
          </p>
          <Button size="lg" className="gap-2">
            Contact Sales
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Button>
        </div>
      </main>
    </div>
  )
}
