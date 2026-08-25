'use client'

import React, { useState } from 'react'
import {
  Brain, Cpu, Sparkles, Zap, Target, Eye,
  ShieldCheck, TrendingUp, BarChart3, Layers,
  Bot, Network, Lightbulb, ArrowRight, CheckCircle2,
  Activity, Gauge, Database, Code2
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageDecorations } from '@/components/page-decorations'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, LineChart, Line
} from 'recharts'

// SHAP Explainability Data
const shapData = [
  { subject: 'Financial Health', current: 85, baseline: 65, fullMark: 100 },
  { subject: 'Geopolitical Risk', current: 72, baseline: 50, fullMark: 100 },
  { subject: 'Operational Stability', current: 90, baseline: 70, fullMark: 100 },
  { subject: 'Compliance Score', current: 78, baseline: 60, fullMark: 100 },
  { subject: 'Environmental Impact', current: 65, baseline: 45, fullMark: 100 },
  { subject: 'Cyber Resilience', current: 88, baseline: 55, fullMark: 100 },
]

// Model Performance Data
const modelPerformanceData = [
  { model: 'Risk Predictor', accuracy: 94.2, precision: 92.8, recall: 91.5, f1: 92.1 },
  { model: 'Demand Forecaster', accuracy: 91.7, precision: 89.4, recall: 90.2, f1: 89.8 },
  { model: 'Anomaly Detector', accuracy: 96.4, precision: 94.1, recall: 93.8, f1: 93.9 },
  { model: 'NLP Classifier', accuracy: 89.3, precision: 87.6, recall: 88.1, f1: 87.8 },
  { model: 'Sentiment Analyzer', accuracy: 92.1, precision: 90.5, recall: 89.7, f1: 90.1 },
]

// Training Timeline Data
const trainingTimeline = [
  { month: 'Jan', models: 12, accuracy: 89 },
  { month: 'Feb', models: 15, accuracy: 90.2 },
  { month: 'Mar', models: 18, accuracy: 91.5 },
  { month: 'Apr', models: 22, accuracy: 92.3 },
  { month: 'May', models: 26, accuracy: 93.1 },
  { month: 'Jun', models: 30, accuracy: 93.8 },
  { month: 'Jul', models: 34, accuracy: 94.2 },
]

// AI Capabilities
const aiCapabilities = [
  {
    icon: <Brain className="h-6 w-6 text-violet-500" />,
    title: 'Deep Learning Models',
    description: 'Transformer-based architectures for understanding complex supply chain patterns',
    features: ['BERT for NLP analysis', 'LSTM for time-series', 'Graph Neural Networks', 'Ensemble methods'],
    color: 'from-violet-500/20 to-purple-500/20',
    accent: 'violet'
  },
  {
    icon: <Eye className="h-6 w-6 text-cyan-500" />,
    title: 'Computer Vision',
    description: 'Automated inspection and document analysis using state-of-the-art vision models',
    features: ['Document OCR', 'Defect Detection', 'Facility Verification', 'Image Classification'],
    color: 'from-cyan-500/20 to-blue-500/20',
    accent: 'cyan'
  },
  {
    icon: <Zap className="h-6 w-6 text-amber-500" />,
    title: 'Real-Time Inference',
    description: 'Sub-200ms prediction latency with GPU-accelerated inference engines',
    features: ['GPU Clusters', 'Model Optimization', 'Edge Deployment', 'Batch Processing'],
    color: 'from-amber-500/20 to-orange-500/20',
    accent: 'amber'
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
    title: 'Explainable AI (XAI)',
    description: 'SHAP and LIME integration for transparent, auditable predictions',
    features: ['SHAP Values', 'Feature Importance', 'Decision Paths', 'Counterfactuals'],
    color: 'from-emerald-500/20 to-green-500/20',
    accent: 'emerald'
  },
]

// AI Agents
const aiAgents = [
  {
    name: 'Monitoring Agent',
    status: 'active',
    icon: <Activity className="h-8 w-8" />,
    description: '24/7 surveillance of supplier health metrics, news feeds, and external data sources',
    capabilities: ['Real-time scanning', 'Pattern recognition', 'Alert generation', 'Auto-escalation'],
    metrics: { scansPerDay: '2.4M', alertsGenerated: 347, accuracy: '98.2%' }
  },
  {
    name: 'Analysis Agent',
    status: 'active',
    icon: <BarChart3 className="h-8 w-8" />,
    description: 'Deep-dive analysis engine that correlates multi-source data to identify root causes',
    capabilities: ['Correlation analysis', 'Root cause detection', 'Trend identification', 'Scenario modeling'],
    metrics: { analysesPerDay: 12500, reportsGenerated: 89, insightsFound: 456 }
  },
  {
    name: 'Compliance Agent',
    status: 'active',
    icon: <ShieldCheck className="h-8 w-8" />,
    description: 'Automated regulatory monitoring and gap analysis across global compliance frameworks',
    capabilities: ['Regulation tracking', 'Gap analysis', 'Audit preparation', 'Remediation guidance'],
    metrics: { frameworksMonitored: 47, checksCompleted: '15K/day', violationsCaught: 23 }
  },
  {
    name: 'Forecasting Agent',
    status: 'active',
    icon: <TrendingUp className="h-8 w-8" />,
    description: 'AI-powered demand and risk forecasting with confidence intervals and scenario planning',
    capabilities: ['Demand prediction', 'Risk projection', 'What-if scenarios', 'Seasonality adjustment'],
    metrics: { forecastsDaily: 8500, avgAccuracy: '94.2%', horizonDays: 180 }
  },
]

// Technology Stack
const techStack = [
  { category: 'ML Frameworks', items: ['PyTorch 2.0', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'LightGBM'] },
  { category: 'NLP & LLMs', items: ['Transformers', 'spaCy', 'OpenAI API', 'Hugging Face', 'LangChain'] },
  { category: 'MLOps', items: ['MLflow', 'Kubeflow', 'Weights & Biases', 'DVC', 'Prometheus'] },
  { category: 'Infrastructure', items: ['NVIDIA A100', 'AWS SageMaker', 'Kubernetes', 'Redis', 'PostgreSQL'] },
]

export default function IntelligencePage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background relative">
      <PageDecorations theme="ai" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 gap-2 border-violet-500/50 text-violet-500">
              <Brain className="h-4 w-4" />
              AI/ML Engine
            </Badge>

            <h1 className="text-5xl font-bold mb-6">
              Intelligent Supply Chain{' '}
              <span className="gradient-text" style={{
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Predictions</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Powered by cutting-edge machine learning models trained on billions of data points.
              Explainable AI that you can trust for critical business decisions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                <Sparkles className="h-5 w-5" />
                Explore AI Capabilities
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8">
                <Code2 className="h-5 w-5" />
                API Documentation
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {[
                { value: '94.2%', label: 'Prediction Accuracy', icon: Target },
                { value: '<150ms', label: 'Inference Latency', icon: Zap },
                { value: '2.4B+', label: 'Data Points Trained', icon: Database },
                { value: '47', label: 'AI Models Deployed', icon: Cpu },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center">
                  <stat.icon className="h-6 w-6 text-violet-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Lightbulb className="h-4 w-4" /> Core Capabilities
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Advanced AI Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI engine combines multiple machine learning paradigms to deliver comprehensive supply chain intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiCapabilities.map((capability, idx) => (
              <Card key={idx} className={`group glass hover:scale-[1.02] transition-all cursor-pointer border-transparent hover:border-${capability.accent}-500/30`}>
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${capability.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {capability.icon}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{capability.description}</p>

                  <div className="grid grid-cols-2 gap-2">
                    {capability.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SHAP Explainability Demo */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 gap-2 border-violet-500/50 text-violet-500">
                <Eye className="h-4 w-4" /> Explainable AI
              </Badge>
              <h2 className="text-3xl font-bold mb-4">SHAP Explainability</h2>
              <p className="text-muted-foreground mb-6">
                Every prediction comes with full transparency. Our SHAP (SHapley Additive exPlanations)
                integration shows exactly which factors contributed to each risk score, enabling
                auditable and trustworthy AI decisions.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Feature Attribution', desc: 'Understand which variables drive each prediction' },
                  { title: 'Global Interpretability', desc: 'See overall model behavior across all predictions' },
                  { title: 'Local Explanations', desc: 'Get detailed breakdowns for individual decisions' },
                  { title: 'Regulatory Compliance', desc: 'Meet EU AI Act and other XAI requirements' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 glass rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SHAP Radar Chart */}
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Supplier Risk Attribution</h3>
                <Badge variant="secondary" className="gap-1">
                  <Brain className="h-3 w-3" /> Live Demo
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={shapData}>
                  <PolarGrid stroke="rgba(139, 92, 246, 0.2)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Radar
                    name="Baseline"
                    dataKey="baseline"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Current Analysis"
                    dataKey="current"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#94a3b8]" />
                  <span>Industry Baseline</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-violet-500" />
                  <span>Current Analysis</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Model Performance Metrics */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Gauge className="h-4 w-4" /> Performance Metrics
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Model Performance Dashboard</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Continuous monitoring and evaluation of all deployed ML models
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Table */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-base">Model Accuracy Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelPerformanceData.map((model, i) => (
                    <div key={i} className="p-4 rounded-lg border hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-sm">{model.model}</span>
                        <Badge variant="outline" className="text-xs">{model.accuracy}% accuracy</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: 'Precision', value: model.precision },
                          { label: 'Recall', value: model.recall },
                          { label: 'F1 Score', value: model.f1 },
                        ].map((metric, j) => (
                          <div key={j} className="text-center">
                            <div className="text-lg font-bold text-primary">{metric.value}%</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Progress Chart */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-base">Model Evolution Timeline</CardTitle>
                <CardDescription>Continuous improvement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={trainingTimeline}>
                    <defs>
                      <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} domain={[85, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="accuracy" stroke="#8b5cf6" fillOpacity={1} fill="url(#accuracyGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 gap-2 border-violet-500/50 text-violet-500">
              <Bot className="h-4 w-4" /> Autonomous Agents
            </Badge>
            <h2 className="text-3xl font-bold mb-4">AI-Powered Agents</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized autonomous agents working together to provide comprehensive supply chain intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiAgents.map((agent, idx) => (
              <Card key={idx} className="glass group hover:scale-[1.01] transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform">
                        {agent.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{agent.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs text-muted-foreground">Active • Autonomous</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.capabilities.map((cap, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{cap}</Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                    {Object.entries(agent.metrics).map(([key, value], i) => (
                      <div key={i} className="text-center">
                        <div className="text-sm font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Layers className="h-4 w-4" /> Tech Stack
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Built on Cutting-Edge Technology</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((category, idx) => (
              <Card key={idx} className="glass text-center">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-primary">{category.category}</h3>
                  <div className="space-y-2">
                    {category.items.map((item, i) => (
                      <div key={i} className="text-sm py-1.5 px-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="glass p-12 glow-violet">
            <Brain className="h-16 w-16 text-violet-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Harness AI Power?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Experience the future of supply chain management with our advanced AI/ML platform.
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8">
                Schedule Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
