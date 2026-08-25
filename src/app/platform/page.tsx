'use client'

import React, { useState, useEffect } from 'react'
import { 
  Shield, Brain, Zap, Globe, Lock, Cloud, Cpu, 
  Database, Network, Plug, BarChart3, Settings,
  ArrowRight, CheckCircle2, Layers, Box, Play,
  Rocket, Sparkles, Terminal, Code2, Server,
  Workflow, Puzzle, Gauge, Activity, TrendingUp,
  ChevronRight, Star, ArrowUpRight, ExternalLink
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageDecorations } from '@/components/page-decorations'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  
  return count
}

// Animated gradient orb component
function AnimatedOrb({ className, delay = 0 }: { className?: string, delay?: number }) {
  return (
    <div 
      className={`absolute rounded-full blur-3xl animate-pulse ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  )
}

// Floating card component for 3D effect
function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <div 
      className={`group relative animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative glass rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
        {children}
      </div>
    </div>
  )
}

// Tech stack icon component
function TechIcon({ name, icon: Icon, color }: { name: string, icon: React.ComponentType<{ className?: string }>, color: string }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="text-sm font-medium text-center">{name}</div>
      {isHovered && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary text-white text-xs rounded whitespace-nowrap animate-fade-in">
          Click to learn more
        </div>
      )}
    </div>
  )
}

export default function PlatformPage() {
  const [activeLayer, setActiveLayer] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Counter hooks for animated stats
  const apiResponse = useCounter(99, 2000)
  const uptime = useCounter(99, 2500)
  const accuracy = useCounter(94, 2200)
  const requests = useCounter(50, 1800)

  const architectureLayers = [
    {
      name: 'Edge Layer',
      description: 'Global CDN & Edge Computing',
      tech: ['Cloudflare', 'Fastly', 'Akamai'],
      icon: Globe,
      color: 'from-cyan-400 to-blue-500',
      stats: '< 50ms global latency'
    },
    {
      name: 'API Gateway',
      description: 'Rate Limiting & Authentication',
      tech: ['Kong', 'AWS API Gateway', 'GraphQL'],
      icon: Shield,
      color: 'from-emerald-400 to-green-500',
      stats: '1M+ requests/second'
    },
    {
      name: 'Microservices',
      description: 'Containerized Business Logic',
      tech: ['Kubernetes', 'Docker', 'gRPC'],
      icon: Server,
      color: 'from-violet-400 to-purple-500',
      stats: '150+ microservices'
    },
    {
      name: 'AI/ML Engine',
      description: 'Deep Learning & Predictions',
      tech: ['PyTorch', 'TensorFlow', 'SHAP'],
      icon: Brain,
      color: 'from-rose-400 to-pink-500',
      stats: '94.2% accuracy'
    },
    {
      name: 'Data Lake',
      description: 'Real-time Analytics & Storage',
      tech: ['Snowflake', 'Databricks', 'Redis'],
      icon: Database,
      color: 'from-amber-400 to-orange-500',
      stats: '50TB+ processed daily'
    }
  ]

  const capabilities = [
    {
      title: 'Neural Risk Prediction',
      subtitle: 'Deep learning models that learn from 10M+ historical disruptions',
      icon: Brain,
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      features: ['Transformer architecture', 'Attention mechanisms', 'Ensemble methods', 'Real-time inference'],
      stat: { value: '94.2%', label: 'Prediction Accuracy' },
      cta: 'Explore AI Models'
    },
    {
      title: 'Global Sensor Network',
      subtitle: '50,000+ data sources monitoring supply chains in real-time',
      icon: Globe,
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      features: ['Satellite imagery', 'IoT sensors', 'News APIs', 'Weather feeds'],
      stat: { value: '190+', label: 'Countries Covered' },
      cta: 'View Coverage Map'
    },
    {
      title: 'Quantum-Ready Security',
      subtitle: 'Post-quantum cryptography with zero-trust architecture',
      icon: Lock,
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      features: ['AES-256 encryption', 'Zero-knowledge proofs', 'Biometric auth', 'Audit trails'],
      stat: { value: '99.99%', label: 'Uptime SLA' },
      cta: 'Security Whitepaper'
    }
  ]

  const integrations = [
    { name: 'SAP S/4HANA', category: 'ERP', logo: '🏢', status: 'Certified Partner' },
    { name: 'Oracle Cloud', category: 'ERP', logo: '☁️', status: 'Premier Integration' },
    { name: 'Salesforce', category: 'CRM', logo: '💡', status: 'AppExchange Certified' },
    { name: 'ServiceNow', category: 'ITSM', logo: '🔧', status: 'Store App Available' },
    { name: 'Microsoft Dynamics', category: 'ERP', logo: '📊', status: 'Co-Sell Partner' },
    { name: 'Workday', category: 'HCM', logo: '👥', status: 'Adaptive Integration' },
    { name: 'Kinaxis', category: 'SCM', logo: '🔗', status: 'Native Connector' },
    { name: 'Blue Yonder', category: 'SCM', logo: '📦', status: 'API Integration' },
    { name: 'Coupa', category: 'Spend', logo: '💰', status: 'Certified Connect' },
    { name: 'Snowflake', category: 'Data', logo: '❄️', status: 'Data Share Partner' },
    { name: 'Databricks', category: 'AI', logo: '🧠', status: 'MLflow Compatible' },
    { name: 'Slack', category: 'Comms', logo: '💬', status: 'App Directory Listed' },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced decorations */}
      <PageDecorations theme="technology" />
      
      {/* Additional ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedOrb className="w-[600px] h-[600px] bg-primary/5 top-0 -left-48" delay={0} />
        <AnimatedOrb className="w-[500px] h-[500px] bg-cyan-500/5 bottom-0 right-0" delay={2} />
        <AnimatedOrb className="w-[400px] h-[400px] bg-violet-500/5 top-1/2 left-1/3" delay={4} />
      </div>

      <Navbar />

      {/* HERO SECTION - Completely Redesigned */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Next-Gen AI Infrastructure</span>
                <Badge variant="secondary" className="text-xs">v4.0</Badge>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Enterprise Platform
                <span className="block mt-2 bg-gradient-to-r from-primary via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                The most advanced AI-powered supply chain infrastructure ever built. 
                Process <span className="text-primary font-semibold">50TB+ of data daily</span> across 
                <span className="text-cyan-500 font-semibold"> 190+ countries</span> with 
                <span className="text-violet-500 font-semibold"> quantum-ready security</span>.
              </p>

              {/* Live Stats Row */}
              <div className="grid grid-cols-3 gap-6 p-6 glass rounded-2xl border border-white/10">
                {[
                  { value: `${apiResponse}%`, label: 'API Uptime', icon: Activity },
                  { value: `<${requests}ms`, label: 'Response Time', icon: Zap },
                  { value: `${accuracy}%`, label: 'Accuracy', icon: Target },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="gap-2 px-8 h-14 text-lg bg-gradient-to-r from-primary via-emerald-500 to-cyan-500 hover:shadow-2xl hover:shadow-primary/25 hover:scale-105 transition-all duration-300">
                  <Rocket className="h-5 w-5" />
                  Launch Platform
                  <ArrowRight className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="lg" className="gap-2 px-8 h-14 text-lg border-2 hover:bg-muted hover:scale-105 transition-all duration-300">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </Button>

                <Button variant="ghost" size="lg" className="gap-2 hover:text-primary">
                  View Documentation
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground">4.9/5 Gartner Rating</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <span className="text-sm text-muted-foreground">SOC 2 Type II Certified</span>
              </div>
            </div>

            {/* Right Side - Interactive Architecture Visualization */}
            <div className="relative">
              <FloatingCard className="p-8" delay={0}>
                <div className="space-y-4">
                  {/* Architecture Layers */}
                  {architectureLayers.map((layer, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveLayer(idx)}
                      className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                        activeLayer === idx 
                          ? `bg-gradient-to-r ${layer.color} text-white scale-[1.02] shadow-lg` 
                          : 'bg-card/50 hover:bg-card border border-transparent hover:border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <layer.icon className={`h-6 w-6 ${activeLayer === idx ? 'text-white' : 'text-primary'}`} />
                          <div>
                            <div className={`font-semibold ${activeLayer === idx ? 'text-white' : ''}`}>
                              {layer.name}
                            </div>
                            <div className={`text-sm ${activeLayer === idx ? 'text-white/80' : 'text-muted-foreground'}`}>
                              {layer.description}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className={`h-5 w-5 transition-transform ${activeLayer === idx ? 'rotate-90 text-white' : 'text-muted-foreground'}`} />
                      </div>
                      
                      {activeLayer === idx && (
                        <div className="mt-4 pt-4 border-t border-white/20 animate-fade-in">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {layer.tech.map((tech, i) => (
                              <Badge key={i} variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm font-medium text-white/90">
                            ⚡ {layer.stats}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Live indicator */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">System Status: Operational</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="gap-2"
                    >
                      <Play className={`h-4 w-4 ${isPlaying ? 'text-primary' : ''}`} />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </FloatingCard>

              {/* Floating elements around the main card */}
              <div className="absolute -top-8 -right-8 glass p-4 rounded-xl animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                <Terminal className="h-8 w-8 text-primary" />
                <div className="text-xs font-medium mt-2">CLI Access</div>
              </div>

              <div className="absolute -bottom-4 -left-8 glass p-4 rounded-xl animate-float shadow-lg" style={{ animationDelay: '2s' }}>
                <Code2 className="h-8 w-8 text-cyan-500" />
                <div className="text-xs font-medium mt-2">REST API</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION - Enhanced */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 gap-2">
              <Zap className="h-4 w-4" />
              Core Capabilities
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Built for{' '}
              <span className="gradient-text">Enterprise Scale</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three foundational pillars that power the world's most resilient supply chains
            </p>
          </div>

          {/* Capability Cards */}
          <div className="space-y-24">
            {capabilities.map((capability, idx) => (
              <div key={idx} className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <FloatingCard delay={idx * 0.5}>
                    <CardContent className="p-8">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center mb-6`}>
                        <capability.icon className="h-10 w-10 text-white" />
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-4">{capability.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {capability.subtitle}
                      </p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {capability.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-card/50">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stat & CTA */}
                      <div className="flex items-center justify-between p-4 glass rounded-xl">
                        <div>
                          <div className="text-2xl font-bold gradient-text">{capability.stat.value}</div>
                          <div className="text-sm text-muted-foreground">{capability.stat.label}</div>
                        </div>
                        <Button variant="outline" className="gap-2">
                          {capability.cta}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </FloatingCard>
                </div>

                <div className={`${idx % 2 !== 0 ? 'lg:order-1' : ''} space-y-6`}>
                  <div className="glass p-6 rounded-2xl">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Real-Time Performance
                    </h4>
                    <div className="space-y-4">
                      {[
                        { metric: 'Inference Latency', value: 15, unit: 'ms', percentage: 95 },
                        { metric: 'Throughput', value: '1.2M', unit: 'req/s', percentage: 88 },
                        { metric: 'Model Accuracy', value: 94.2, unit: '%', percentage: 94.2 },
                        { metric: 'Data Freshness', value: 45, unit: 'sec', percentage: 92 },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{item.metric}</span>
                            <span className="font-mono font-bold text-primary">{item.value}{item.unit}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full transition-all duration-1000"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-xl text-center">
                      <Gauge className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                      <div className="text-2xl font-bold">99.99%</div>
                      <div className="text-xs text-muted-foreground">Uptime SLA</div>
                    </div>
                    <div className="glass p-4 rounded-xl text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-violet-500" />
                      <div className="text-2xl font-bold">2.3x</div>
                      <div className="text-xs text-muted-foreground">ROI Increase</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS SECTION - Premium Design */}
      <section className="py-32 relative bg-muted/20">
        <div className="absolute inset-0 grid-bg opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 gap-2">
              <Plug className="h-4 w-4" />
              Ecosystem
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Seamless{' '}
              <span className="gradient-text">Integrations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with your existing stack in minutes, not months
            </p>
          </div>

          {/* Integration Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {integrations.map((integration, idx) => (
              <FloatingCard key={idx} delay={idx * 0.1}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{integration.logo}</div>
                  <div className="font-semibold text-sm mb-1">{integration.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">{integration.category}</div>
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                    {integration.status}
                  </Badge>
                </CardContent>
              </FloatingCard>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 glass rounded-2xl">
              <div className="text-left">
                <div className="font-semibold text-lg mb-1">Need a custom integration?</div>
                <div className="text-muted-foreground text-sm">Our API supports 200+ endpoints</div>
              </div>
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-cyan-500">
                <Puzzle className="h-5 w-5" />
                Explore API Docs
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY & COMPLIANCE - Trust Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Security Features */}
            <div>
              <Badge variant="outline" className="mb-4 gap-2">
                <Shield className="h-4 w-4" />
                Enterprise Security
              </Badge>
              
              <h2 className="text-4xl font-bold mb-6">
                Bank-Grade Security
                <span className="block text-2xl font-normal text-muted-foreground mt-2">
                  You can bet your business on it
                </span>
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: 'Zero Trust Architecture',
                    desc: 'Every request authenticated and authorized, regardless of origin',
                    icon: Lock,
                    features: ['mTLS everywhere', 'JWT tokens', 'RBAC + ABAC']
                  },
                  {
                    title: 'Data Sovereignty',
                    desc: 'Your data stays where you want it, encrypted at rest and in transit',
                    icon: Globe,
                    features: ['GDPR compliant', 'Data residency', 'Encryption keys']
                  },
                  {
                    title: 'Continuous Compliance',
                    desc: 'Automated audits and real-time compliance monitoring',
                    icon: CheckCircle2,
                    features: ['SOC 2 Type II', 'ISO 27001', 'PCI DSS']
                  }
                ].map((item, idx) => (
                  <FloatingCard key={idx} delay={idx * 0.2}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{item.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.features.map((feature, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </FloatingCard>
                ))}
              </div>
            </div>

            {/* Right - Certifications & Metrics */}
            <div className="space-y-8">
              {/* Certifications Grid */}
              <FloatingCard>
                <CardContent className="p-8">
                  <h3 className="font-semibold text-xl mb-6 text-center">Certifications & Standards</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'SOC 2 Type II', status: '✅ Certified' },
                      { name: 'ISO 27001', status: '✅ Certified' },
                      { name: 'GDPR', status: '✅ Compliant' },
                      { name: 'HIPAA', status: '✅ Ready' },
                      { name: 'PCI DSS', status: '✅ Level 1' },
                      { name: 'CSA STAR', status: '✅ Level 2' },
                      { name: 'FedRAMP', status: '⏳ In Process' },
                      { name: 'SOX', status: '✅ Compliant' },
                    ].map((cert, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-card/50 text-center">
                        <div className="font-medium text-sm">{cert.name}</div>
                        <div className="text-xs text-primary mt-1">{cert.status}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </FloatingCard>

              {/* Performance SLAs */}
              <FloatingCard delay={0.5}>
                <CardContent className="p-8">
                  <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                    <Gauge className="h-6 w-6 text-primary" />
                    Service Level Agreements
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      { metric: 'Platform Uptime', target: '99.99%', actual: '99.997%', met: true },
                      { metric: 'API Response (P95)', target: '< 200ms', actual: '87ms', met: true },
                      { metric: 'Data Loss Prevention', target: '0 incidents', actual: '0', met: true },
                      { metric: 'Security Incidents', target: '0 critical', actual: '0', met: true },
                      { metric: 'Recovery Time Objective', target: '< 1 hour', actual: '23 min', met: true },
                      { metric: 'Backup Frequency', target: 'Every 15 min', actual: 'Real-time', met: true },
                    ].map((sla, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{sla.metric}</span>
                          <span className="font-mono font-medium text-primary">{sla.actual}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full w-full" />
                          </div>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </FloatingCard>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - Epic Finish */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
        <div className="absolute inset-0 grid-bg opacity-10" />
        
        {/* Background orbs */}
        <AnimatedOrb className="w-[800px] h-[800px] bg-primary/10 -bottom-40 -left-40" delay={0} />
        <AnimatedOrb className="w-[600px] h-[600px] bg-cyan-500/10 -top-20 -right-20" delay={2} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FloatingCard>
            <CardContent className="p-16">
              <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary via-emerald-500 to-cyan-500 flex items-center justify-center animate-pulse">
                <Rocket className="h-12 w-12 text-white" />
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your
                <span className="gradient-text block">Supply Chain Intelligence?</span>
              </h2>

              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Join 500+ Fortune 500 companies already using our platform to predict risks, 
                optimize operations, and build resilient supply chains.
              </p>

              {/* Final CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button size="lg" className="gap-2 px-12 h-16 text-lg bg-gradient-to-r from-primary via-emerald-500 to-cyan-500 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2 px-12 h-16 text-lg border-2 hover:scale-105 transition-all duration-300">
                  Schedule Demo
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  14-day free trial
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Cancel anytime
                </div>
              </div>
            </CardContent>
          </FloatingCard>
        </div>
      </section>
    </div>
  )
}

// Missing import for Target icon
function Target({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
      <circle cx="12" cy="12" r="6" strokeWidth="2"/>
      <circle cx="12" cy="12" r="2" strokeWidth="2"/>
    </svg>
  )
}
