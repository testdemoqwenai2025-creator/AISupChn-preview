'use client'

import React, { useState } from 'react'
import {
  LifeBuoy, BookOpen, MessageSquare, Phone, Mail,
  Search, ChevronDown, ChevronUp, ExternalLink, ArrowRight,
  HelpCircle, FileText, Video, Settings, Users, ShieldCheck,
  Clock, Send, CheckCircle2, Zap, Globe, HeadphonesIcon,
  AlertCircle, Wrench, Database, Key, Bug
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageDecorations } from '@/components/page-decorations'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

// Help Categories
const helpCategories = [
  {
    icon: <Settings className="h-7 w-7 text-cyan-500" />,
    title: 'Getting Started',
    description: 'Setup guides, onboarding resources, and first steps',
    articles: 45,
    color: 'from-cyan-500/20 to-blue-500/20',
    topics: ['Account Setup', 'First Dashboard', 'Data Import', 'Team Invites']
  },
  {
    icon: <ShieldCheck className="h-7 w-7 text-emerald-500" />,
    title: 'Compliance & Security',
    description: 'UFLPA, EUDR, GDPR compliance guides and security best practices',
    articles: 67,
    color: 'from-emerald-500/20 to-green-500/20',
    topics: ['UFLPA Screening', 'EUDR Due Diligence', 'GDPR Data', 'SSO Setup']
  },
  {
    icon: <Database className="h-7 w-7 text-violet-500" />,
    title: 'Data & Integrations',
    description: 'API documentation, ERP connectors, and data management',
    articles: 89,
    color: 'from-violet-500/20 to-purple-500/20',
    topics: ['REST API', 'SAP Integration', 'Webhooks', 'Data Export']
  },
  {
    icon: <Zap className="h-7 w-7 text-amber-500" />,
    title: 'AI & Analytics',
    description: 'Understanding AI predictions, models, and analytics features',
    articles: 52,
    color: 'from-amber-500/20 to-orange-500/20',
    topics: ['Risk Scores', 'SHAP Explainer', 'Forecasting', 'Alerts']
  },
  {
    icon: <Users className="h-7 w-7 text-rose-500" />,
    title: 'User Management',
    description: 'Roles, permissions, and team administration',
    articles: 34,
    color: 'from-rose-500/20 to-pink-500/20',
    topics: ['RBAC', 'User Roles', 'Audit Logs', 'Access Control']
  },
  {
    icon: <Wrench className="h-7 w-7 text-primary" />,
    title: 'Troubleshooting',
    description: 'Common issues, error codes, and problem resolution',
    articles: 78,
    color: 'from-primary/20 to-emerald-500/20',
    topics: ['Error Codes', 'Performance', 'Sync Issues', 'Login Problems']
  },
]

// FAQ Data
interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    question: 'How do I get started with the platform?',
    answer: 'Getting started is easy! After signing up, you\'ll be guided through our interactive onboarding wizard. We recommend starting with our "Quick Start" guide which takes about 15 minutes. You can also schedule a personalized onboarding session with our success team at no extra cost.',
    category: 'Getting Started'
  },
  {
    question: 'What data sources does the platform integrate with?',
    answer: 'We integrate with 50+ enterprise systems including SAP, Oracle, Salesforce, Workday, Coupa, Kinaxis, Blue Yonder, and many more. Our REST API also allows custom integrations with any system that exposes data via API. We support file imports (CSV, Excel, JSON) for one-time data loads.',
    category: 'Integrations'
  },
  {
    question: 'How accurate are the AI risk predictions?',
    answer: 'Our AI models achieve 94.2% average accuracy across all prediction types, validated against historical data. Accuracy varies by use case: supply disruption prediction (93%), demand forecasting (92%), compliance risk detection (96%). All predictions include confidence intervals and SHAP explainability.',
    category: 'AI & Analytics'
  },
  {
    question: 'How does UFLPA compliance screening work?',
    answer: 'Our UFLPA screening combines multiple data sources including entity databases, news analysis, shipment tracking, and document verification. We screen suppliers against the Entity List, monitor for forced labor indicators, and provide audit-ready documentation. The system automatically flags high-risk entities and provides remediation guidance.',
    category: 'Compliance'
  },
  {
    question: 'What security certifications do you have?',
    answer: 'We maintain SOC 2 Type II certification, ISO 27001, GDPR compliance, and are working on FedRAMP authorization. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We offer data residency options in US, EU, and APAC regions. Regular third-party penetration testing is conducted quarterly.',
    category: 'Security'
  },
  {
    question: 'Can I customize dashboards and reports?',
    answer: 'Yes! Professional and Enterprise plans include full dashboard customization. You can create custom widgets, filter views by role, build automated report schedules, and even white-label reports with your company branding. Our API also allows programmatic access to all data for custom reporting tools.',
    category: 'Features'
  },
  {
    question: 'What support options are available?',
    answer: 'We offer multi-tiered support: Starter plan gets email support with 24-hour response; Professional includes priority email, chat, and phone during business hours; Enterprise customers get 24/7 dedicated support with a named success manager, <1 hour critical issue response, and optional on-site support.',
    category: 'Support'
  },
  {
    question: 'How do I add or remove suppliers from monitoring?',
    answer: 'You can manage suppliers through multiple methods: manual entry via the UI, bulk CSV import, API integration, or automatic discovery through our network mapping feature. Suppliers can be organized into groups, tagged by region/category, and assigned to specific team members for ownership.',
    category: 'User Management'
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer: 'We provide generous headroom (typically 10% overage) before any action is needed. If you consistently exceed limits, we\'ll reach out to discuss upgrading. We never cut off service unexpectedly — you\'ll always have advance notice and options to adjust your plan.',
    category: 'Billing'
  },
  {
    question: 'How often is supplier data updated?',
    answer: 'Data freshness varies by source type: financial data updates daily, news/social sentiment updates every 15 minutes, compliance databases sync weekly, and trade/sanctions lists update in real-time as changes occur. Premium data sources can be configured for near-real-time updates.',
    category: 'Data'
  },
]

// Documentation Links
const docLinks = [
  { title: 'Quick Start Guide', desc: 'Get up and running in 15 minutes', icon: <BookOpen className="h-5 w-5" />, url: '#' },
  { title: 'API Reference', desc: 'Complete REST API documentation', icon: <FileText className="h-5 w-5" />, url: '#' },
  { title: 'Video Tutorials', desc: 'Step-by-step video walkthroughs', icon: <Video className="h-5 w-5" />, url: '#' },
  { title: 'Integration Guides', desc: 'Connect your existing systems', icon: <Database className="h-5 w-5" />, url: '#' },
  { title: 'Compliance Playbooks', desc: 'UFLPA, EUDR, CSDDD guides', icon: <ShieldCheck className="h-5 w-5" />, url: '#' },
  { title: 'Best Practices', desc: 'Tips from our customer success team', icon: <Zap className="h-5 w-5" />, url: '#' },
  { title: 'Security Whitepaper', desc: 'Detailed security architecture', icon: <Key className="h-5 w-5" />, url: '#' },
  { title: 'Release Notes', desc: 'Latest features and improvements', icon: <Bug className="h-5 w-5" />, url: '#' },
]

// Contact Options
const contactOptions = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    availability: 'Available 24/7 for Enterprise',
    action: 'Start Chat',
    primary: true
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email Support',
    description: 'support@aisupplychain.com',
    availability: 'Response within 4 hours',
    action: 'Send Email',
    primary: false
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Phone Support',
    description: '+1 (888) 555-SUPP',
    availability: 'Mon-Fri 9AM-6PM EST',
    action: 'Call Now',
    primary: false
  },
  {
    icon: <Video className="h-6 w-6" />,
    title: 'Schedule a Call',
    description: 'Book time with a solutions engineer',
    availability: 'Available within 24 hours',
    action: 'Book Now',
    primary: false
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background relative">
      <PageDecorations theme="security" variant="subtle" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-rose-500/10 to-red-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 gap-2 border-rose-500/50 text-rose-500">
              <LifeBuoy className="h-4 w-4" />
              Help & Support
            </Badge>

            <h1 className="text-5xl font-bold mb-6">
              How Can We{' '}
              <span className="gradient-text" style={{
                background: 'linear-gradient(135deg, #f43f5e, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Help?</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find answers, access documentation, or get in touch with our support team.
              We're here to ensure your success.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for answers... (e.g., UFLPA setup, API integration)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl glass border focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg"
              />
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { value: '500+', label: 'Help Articles', icon: BookOpen },
                { value: '< 4hr', label: 'Avg Response Time', icon: Clock },
                { value: '98%', label: 'Resolution Rate', icon: CheckCircle2 },
                { value: '24/7', label: 'Enterprise Support', icon: HeadphonesIcon },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <span className="font-bold">{stat.value}</span>
                  <span className="text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, idx) => (
              <Card key={idx} className="glass group hover:scale-[1.02] transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                    <Badge variant="secondary" className="text-xs">{category.articles} articles</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {category.topics.map((topic, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{topic}</Badge>
                    ))}
                  </div>

                  <Button variant="ghost" size="sm" className="w-full mt-4 gap-2 group-hover:text-primary">
                    Browse Articles
                    <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 gap-2 border-rose-500/50 text-rose-500">
              <HelpCircle className="h-4 w-4" /> FAQ
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Quick answers to common questions. Can't find what you're looking for? Contact us below.
            </p>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className={`glass overflow-hidden transition-all ${openFaq === index ? 'border-primary/30' : ''}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 flex items-start justify-between text-left hover:bg-primary/5 transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 border-t pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    <Badge variant="secondary" className="mt-3 text-xs">{faq.category}</Badge>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              <Button variant="outline" size="sm" className="mt-4 gap-2" onClick={() => setSearchQuery('')}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Documentation & Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Documentation & Resources</h2>
            <p className="text-muted-foreground mt-2">In-depth guides and technical documentation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {docLinks.map((doc, i) => (
              <a key={i} href={doc.url} className="group">
                <Card className="glass-hover p-5 h-full group-hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                      {doc.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{doc.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{doc.desc}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Badge variant="outline" className="mb-4 gap-2 border-rose-500/50 text-rose-500">
                <Mail className="h-4 w-4" /> Contact Us
              </Badge>
              <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Have a question that's not covered in our FAQs? Fill out the form below and we'll get back to you promptly.
              </p>

              <Card className="glass">
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Work Email *</label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="glass"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Input
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="glass"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg glass border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent"
                    >
                      <option value="">Select a topic...</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="integration">Integration Help</option>
                      <option value="compliance">Compliance Inquiry</option>
                      <option value="enterprise">Enterprise Sales</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message *</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your question or issue in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg glass border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent resize-none"
                    />
                  </div>

                  <Button className="w-full gap-2" size="lg">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to our Privacy Policy. We typically respond within 4 business hours.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Options */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Other Ways to Reach Us</h2>
              <p className="text-muted-foreground mb-8">
                Choose the contact method that works best for you.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {contactOptions.map((option, i) => (
                  <Card key={i} className={`glass group hover:scale-[1.02] transition-all cursor-pointer ${option.primary ? 'border-primary/30' : ''}`}>
                    <CardContent className="p-5 text-center space-y-3">
                      <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center ${
                        option.primary ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      } group-hover:bg-primary/10 group-hover:text-primary transition-colors`}>
                        {option.icon}
                      </div>
                      <h3 className="font-semibold">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                      <p className="text-xs text-primary">{option.availability}</p>
                      <Button variant={option.primary ? 'default' : 'outline'} size="sm" className="w-full">
                        {option.action}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Status Page */}
              <Card className="glass">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <div className="font-semibold text-sm">All Systems Operational</div>
                        <div className="text-xs text-muted-foreground">Last incident: 14 days ago</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Status Page
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Community */}
              <Card className="glass mt-4">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-primary" />
                    <div>
                      <div className="font-semibold text-sm">Join Our Community</div>
                      <div className="text-xs text-muted-foreground">Connect with other users, share tips, and get advice</div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto gap-1">
                      Community Forum
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
