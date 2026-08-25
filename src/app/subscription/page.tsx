'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, CheckCircle2, Star, Zap, Rocket, Crown, ArrowRight, HelpCircle, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { FreemiumSubscription } from '@/components/freemium-subscription'

const faqs = [
  {
    question: "Can I try before I buy?",
    answer: "Yes! All plans come with a 14-day free trial. No credit card required to start."
  },
  {
    question: "What happens when I hit my prediction limit?",
    answer: "You'll receive a notification and can either upgrade your plan or wait for your monthly reset. We never cut off access unexpectedly."
  },
  {
    question: "Can I change plans at any time?",
    answer: "Absolutely! You can upgrade or downgrade at any time. Changes take effect immediately with prorated billing."
  },
  {
    question: "Do you offer discounts for nonprofits?",
    answer: "Yes, we offer 50% discount for qualified nonprofit organizations. Contact our sales team for details."
  },
  {
    question: "What kind of support do you offer?",
    answer: "Starter gets community support, Professional gets priority email/chat, Enterprise gets dedicated account manager with 24/7 phone support."
  }
]

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Header */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <Badge variant="secondary" className="mb-4 gap-2"><Star className="h-4 w-4 text-primary" /> Simple, Transparent Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
        </section>

        {/* Full Pricing Component */}
        <FreemiumSubscription />

        {/* FAQ Section */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 gap-2"><HelpCircle className="h-4 w-4 text-primary" /> FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <Card key={i} className="hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground ml-7">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Button variant="outline" size="lg" className="gap-2">
                <HeadphonesIcon className="h-5 w-5" />
                Contact Sales Team
              </Button>
            </div>
          </div>
        </section>

        {/* Money Back Guarantee */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="glass border-emerald-500/30 overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-emerald-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">30-Day Money-Back Guarantee</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Not satisfied? Get a full refund within 30 days, no questions asked. 
                  We're confident you'll love our platform.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Cancel anytime
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    No long-term contracts
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Instant refund
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
