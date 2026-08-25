'use client'

import React, { useState } from 'react'
import { CheckCircle2, Star, Zap, Rocket, Crown, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface Tier {
  id: string
  name: string
  price: string
  period: string
  description: string
  icon: React.ElementType
  gradient: string
  features: string[]
  limits: {
    predictions: string | number
    apiCalls: string | number
    suppliers: string | number
    users: string | number
  }
  cta: string
  popular?: boolean
}

const tiers: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for exploring the platform',
    icon: Zap,
    gradient: 'from-gray-500 to-slate-600',
    features: [
      'Basic risk predictions',
      'Community support',
      '3 supplier profiles',
      'Standard analytics',
      'Email updates',
      'API access (limited)'
    ],
    limits: { predictions: 100, apiCalls: 100, suppliers: 3, users: 1 },
    cta: 'Get Started Free'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'For growing businesses that need more',
    icon: Rocket,
    gradient: 'from-primary to-cyan-500',
    features: [
      'Advanced AI predictions (1,000/mo)',
      'Priority support',
      '50 supplier profiles',
      'Real-time alerts',
      'Custom integrations',
      'Full API access',
      'Advanced analytics',
      'Team collaboration (5 users)'
    ],
    limits: { predictions: 1000, apiCalls: 500, suppliers: 50, users: 5 },
    cta: 'Start 14-Day Trial',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with custom needs',
    icon: Crown,
    gradient: 'from-violet-600 to-purple-700',
    features: [
      'Unlimited everything',
      'Dedicated account manager',
      'Unlimited suppliers & users',
      'White-label solution',
      'SLA guarantee (99.99%)',
      'On-premise deployment option',
      'Custom AI model training',
      '24/7 phone support'
    ],
    limits: { predictions: 'Unlimited', apiCalls: 'Unlimited', suppliers: 'Unlimited', users: 'Unlimited' },
    cta: 'Contact Sales'
  }
]

export function FreemiumSubscription() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const handleUpgrade = (tierId: string) => {
    setSelectedTier(tierId)
    setShowUpgradeModal(true)
  }

  return (
    <section className="py-20 relative" id="pricing">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 gap-2">
            <Star className="h-4 w-4 text-primary" />
            Flexible Pricing for Every Scale
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Intelligence Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, scale as you grow. All plans include core AI risk prediction capabilities.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tiers.map(tier => (
            <Card 
              key={tier.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                tier.popular ? 'border-primary shadow-lg shadow-primary/20' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-cyan-500 text-white text-center py-2 text-sm font-medium">
                  ⭐ Most Popular Choice
                </div>
              )}
              
              <CardHeader className={tier.popular ? 'pt-14' : ''}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-4`}>
                  <tier.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Limits */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Predictions</div>
                    <div className="font-semibold text-sm">{tier.limits.predictions}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">API Calls</div>
                    <div className="font-semibold text-sm">{tier.limits.apiCalls}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Suppliers</div>
                    <div className="font-semibold text-sm">{tier.limits.suppliers}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Users</div>
                    <div className="font-semibold text-sm">{tier.limits.users}</div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`w-full ${tier.popular ? '' : 'variant-outline'}`}
                  onClick={() => handleUpgrade(tier.id)}
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <Card className="glass border-border/50">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Feature Comparison</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Starter</th>
                    <th className="text-center py-3 px-4 bg-primary/10 rounded-t-lg">Professional</th>
                    <th className="text-center py-3 px-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'AI Risk Predictions', starter: '100/mo', pro: '1,000/mo', enterprise: '∞' },
                    { feature: 'Real-time Alerts', starter: '❌', pro: '✅', enterprise: '✅' },
                    { feature: 'API Access', starter: 'Limited', pro: 'Full', enterprise: 'Full + Custom' },
                    { feature: 'Support Level', starter: 'Community', pro: 'Priority', enterprise: '24/7 Dedicated' },
                    { feature: 'Custom Integrations', starter: '❌', pro: '✅', enterprise: '✅ + White-label' },
                    { feature: 'SLA Guarantee', starter: '❌', pro: '99.9%', enterprise: '99.99%' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-3 px-4 text-sm">{row.feature}</td>
                      <td className="py-3 px-4 text-center text-sm">{row.starter}</td>
                      <td className="py-3 px-4 text-center text-sm bg-primary/5 font-medium">{row.pro}</td>
                      <td className="py-3 px-4 text-center text-sm">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Enterprise CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? Our enterprise team can build exactly what you need.
          </p>
          <Button size="lg" variant="outline" className="gap-2">
            Schedule Enterprise Demo
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ready to Upgrade?</DialogTitle>
            <DialogDescription>
              You're about to upgrade to the {tiers.find(t => t.id === selectedTier)?.name} plan
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-medium">{tiers.find(t => t.id === selectedTier)?.name} Plan</p>
              <p className="text-2xl font-bold mt-2">
                {tiers.find(t => t.id === selectedTier)?.price}
                <span className="text-base font-normal text-muted-foreground ml-1">
                  {tiers.find(t => t.id === selectedTier)?.period}
                </span>
              </p>
            </div>
            
            <form className="space-y-3">
              <input type="email" placeholder="Work email" className="w-full px-3 py-2 border border-input rounded-md" />
              <input type="text" placeholder="Company name" className="w-full px-3 py-2 border border-input rounded-md" />
              <Button className="w-full">
                Start {tiers.find(t => t.id === selectedTier)?.id === 'starter' ? 'Free Trial' : 'Subscription'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

// Upgrade prompt component for friction points
export function UpgradePrompt({ feature }: { feature: string }) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-5">
      <Card className="glass border-primary/30 shadow-lg">
        <CardContent className="p-4">
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="flex items-start gap-3 pr-4">
            <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm mb-1">Unlock {feature}</p>
              <p className="text-xs text-muted-foreground mb-3">
                Upgrade to Professional for unlimited access
              </p>
              <Button size="sm" className="w-full text-xs">
                View Plans
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Usage limit display component
export function UsageLimits({ current, limit, type }: { current: number; limit: number; type: string }) {
  const percentage = Math.min((current / limit) * 100, 100)
  const isNearLimit = percentage > 80

  return (
    <div className={`p-3 rounded-lg border ${
      isNearLimit ? 'bg-amber-500/10 border-amber-500/30' : 'bg-muted/50 border-border/50'
    }`}>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
        <span className={isNearLimit ? 'text-amber-400' : 'text-muted-foreground'}>
          {current.toLocaleString()} / {limit === -1 ? '∞' : limit.toLocaleString()}
        </span>
      </div>
      
      {limit !== -1 && (
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              isNearLimit ? 'bg-amber-500' : percentage > 60 ? 'bg-blue-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
      
      {isNearLimit && (
        <p className="text-xs text-amber-400 mt-2">
          ⚠️ You're approaching your limit. Consider upgrading.
        </p>
      )}
    </div>
  )
}
