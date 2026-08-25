'use client'

import React from 'react'
import { 
  Shield, Brain, Zap, Globe, Lock, Cloud, Cpu, 
  Database, Network, Plug, BarChart3, Settings,
  ArrowRight, CheckCircle2, Layers, Box
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageDecorations } from '@/components/page-decorations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const platformFeatures = [
  {
    icon: <Brain className="h-8 w-8 text-violet-500" />,
    title: 'AI Risk Engine',
    description: 'Machine learning models trained on global supply chain data',
    capabilities: ['Predictive Analytics', 'Pattern Recognition', 'Anomaly Detection', 'SHAP Explainability'],
    color: 'from-violet-500/20 to-purple-500/20'
  },
  {
    icon: <Shield className="h-8 w-8 text-emerald-500" />,
    title: 'Risk Intelligence',
    description: 'Real-time monitoring across all risk dimensions',
    capabilities: ['Geopolitical Tracking', 'Financial Health Monitoring', 'Environmental Scanning', 'Compliance Checks'],
    color: 'from-emerald-500/20 to-green-500/20'
  },
  {
    icon: <Globe className="h-8 w-8 text-cyan-500" />,
    title: 'Global Visibility',
    description: 'Multi-tier supplier mapping across 190+ countries',
    capabilities: ['Supplier Directory', 'Tier Mapping', 'Regional Dashboards', 'Dependency Analysis'],
    color: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    icon: <Zap className="h-8 w-8 text-amber-500" />,
    title: 'Real-Time Alerts',
    description: 'Instant notifications when risks materialize',
    capabilities: ['WebSocket Streaming', 'Smart Escalations', 'Mobile Push', 'Email Digests'],
    color: 'from-amber-500/20 to-orange-500/20'
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-rose-500" />,
    title: 'Demand Forecasting',
    description: 'AI-powered demand prediction with scenario modeling',
    capabilities: ['ML Forecasting', 'Scenario Planning', 'Confidence Intervals', 'Trend Analysis'],
    color: 'from-rose-500/20 to-pink-500/20'
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: 'Compliance Hub',
    description: 'Regulatory framework tracking and gap analysis',
    capabilities: ['UFLPA', 'EUDR', 'CSDDD', 'GDPR', 'SOX', 'REACH'],
    color: 'from-primary/20 to-emerald-500/20'
  }
]

const integrations = [
  { name: 'SAP', category: 'ERP' },
  { name: 'Oracle', category: 'ERP' },
  { name: 'Salesforce', category: 'CRM' },
  { name: 'ServiceNow', category: 'ITSM' },
  { name: 'Workday', category: 'HCM' },
  { name: 'Kinaxis', category: 'SCM' },
  { name: 'Blue Yonder', category: 'SCM' },
  { name: 'Coupa', category: 'Spend' }
]

const architecture = [
  { layer: 'Data Ingestion', components: ['API Connectors', 'Web Scrapers', 'IoT Sensors', 'File Imports'] },
  { layer: 'Processing Engine', components: ['Stream Processing', 'Batch ETL', 'ML Pipeline', 'Event Router'] },
  { layer: 'AI/ML Layer', components: ['Risk Models', 'Forecast Models', 'NLP Engine', 'SHAP Explainer'] },
  { layer: 'Application Layer', components: ['Dashboard', 'Alerts', 'Reports', 'API Gateway'] }
]

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <PageDecorations theme="technology" />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 gap-2">
              <Cpu className="h-4 w-4" />
              Platform Architecture
            </Badge>
            
            <h1 className="text-5xl font-bold mb-6">
              Enterprise-Grade <span className="gradient-text">AI Infrastructure</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Built for scale. Designed for resilience. Powered by explainable AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8">
                View Architecture
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8">
                API Documentation
                <Plug className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Six integrated modules powering intelligent supply chain operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, idx) => (
              <Card key={idx} className="group glass hover:scale-[1.02] transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Stack */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Modern Stack Architecture</h2>
              <p className="text-muted-foreground mb-8">
                Cloud-native microservices architecture designed for enterprise reliability and scalability.
              </p>
              
              <div className="space-y-6">
                {architecture.map((layer, idx) => (
                  <div key={idx} className="glass rounded-lg p-4">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      {layer.layer}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {layer.components.map((comp, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {comp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Architecture Diagram */}
            <Card className="glass p-8">
              <div className="space-y-4">
                {['Presentation Layer', 'Application Services', 'AI/ML Engine', 'Data Layer'].map((layer, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-lg border-2 transition-all hover:border-primary/50 ${
                      idx === 2 ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border-primary/30' : 'bg-card'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{layer}</span>
                      {idx === 2 && <Badge>AI Core</Badge>}
                    </div>
                    {idx === 2 && (
                      <div className="mt-3 flex gap-2">
                        <Badge variant="outline" className="text-xs">PyTorch</Badge>
                        <Badge variant="outline" className="text-xs">TensorFlow</Badge>
                        <Badge variant="outline" className="text-xs">SHAP</Badge>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Infrastructure</span>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1"><Cloud className="h-4 w-4" /> AWS/Azure/GCP</span>
                      <span className="flex items-center gap-1"><Database className="h-4 w-4" /> PostgreSQL</span>
                      <span className="flex items-center gap-1"><Network className="h-4 w-4" /> Redis</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Enterprise Integrations</h2>
            <p className="text-muted-foreground">Connect with your existing technology stack</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrations.map((integration, idx) => (
              <Card key={idx} className="glass-hover p-6 text-center group cursor-pointer">
                <div className="h-12 w-12 mx-auto mb-3 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Box className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="font-medium">{integration.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{integration.category}</div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" className="gap-2">
              <Plug className="h-4 w-4" />
              View All 50+ Integrations
            </Button>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Enterprise Security</h2>
              <p className="text-muted-foreground mb-8">
                Bank-grade security with compliance certifications for regulated industries.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: 'SOC 2 Type II', desc: 'Annual audit completed' },
                  { title: 'GDPR Compliant', desc: 'EU data protection ready' },
                  { title: 'ISO 27001', desc: 'Information security certified' },
                  { title: 'Encryption', desc: 'AES-256 at rest & in transit' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 glass rounded-lg">
                    <Shield className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="glass p-8">
              <h3 className="text-xl font-semibold mb-6">Performance Metrics</h3>
              
              <div className="space-y-6">
                {[
                  { label: 'API Response Time', value: '< 100ms', percentage: 95 },
                  { label: 'System Uptime', value: '99.99%', percentage: 99.99 },
                  { label: 'Data Freshness', value: '< 5 min', percentage: 98 },
                  { label: 'Prediction Accuracy', value: '94.2%', percentage: 94.2 }
                ].map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{metric.label}</span>
                      <span className="font-bold text-primary">{metric.value}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full"
                        style={{ width: `${metric.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="glass glow-emerald p-12">
            <Settings className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Integrate?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get started with our REST APIs or explore pre-built connectors for your stack.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8">
                Start Integration
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8">
                Contact Sales
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
