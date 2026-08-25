'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Activity, Brain, AlertTriangle, TrendingUp, Globe, Zap, Clock, CheckCircle2, XCircle, RefreshCw, Eye, Download, Settings, Bell, Search, Filter, ChevronRight, BarChart3, PieChart, MapPin, Thermometer, Wind, Droplets, Users, Building2, Package, Truck, Ship } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { AIRiskPredictionCard, GlobalSupplyMappingCard, ComplianceAutomationCard } from '@/components/functional-cards-enhanced'

// Mock data for dashboard
const generateAlertData = () => [
  {
    id: 1,
    type: 'critical',
    title: 'Taiwan Strait Shipping Delay Risk',
    description: 'Geopolitical tensions causing potential delays in semiconductor supply chain',
    location: 'Taiwan Strait',
    time: '2 min ago',
    impact: 'High',
    suppliersAffected: 47
  },
  {
    id: 2,
    type: 'warning',
    title: 'Supplier Financial Health Declining',
    description: 'TechComponents Ltd showing 15% revenue decrease QoQ',
    location: 'Shenzhen, China',
    time: '15 min ago',
    impact: 'Medium',
    suppliersAffected: 1
  },
  {
    id: 3,
    type: 'info',
    title: 'New EU Compliance Regulation Active',
    description: 'Supply Chain Due Diligence Act now in effect for EU suppliers',
    location: 'European Union',
    time: '1 hour ago',
    impact: 'Informational',
    suppliersAffected: 234
  },
  {
    id: 4,
    type: 'critical',
    title: 'Panama Canal Drought Impact',
    description: 'Shipping delays expected due to canal restrictions',
    location: 'Panama Canal',
    time: '2 hours ago',
    impact: 'High',
    suppliersAffected: 89
  },
  {
    id: 5,
    type: 'warning',
    title: 'Weather Alert - Typhoon Approach',
    description: 'Typhoon may affect shipping routes in Southeast Asia',
    location: 'South China Sea',
    time: '3 hours ago',
    impact: 'Medium',
    suppliersAffected: 156
  }
]

const supplierMetrics = [
  { label: 'Total Suppliers', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-400' },
  { label: 'Active Alerts', value: '23', change: '+5', icon: AlertTriangle, color: 'text-red-400' },
  { label: 'At-Risk Suppliers', value: '34', change: '-3', icon: Shield, color: 'text-amber-400' },
  { label: 'Compliant Suppliers', value: '98.2%', change: '+0.5%', icon: CheckCircle2, color: 'text-emerald-400' }
]

const recentPredictions = [
  { date: '2024-08-25', accuracy: '94%', correct: true, prediction: 'Taiwan Strait Delay', actual: 'Delay occurred' },
  { date: '2024-08-24', accuracy: '87%', correct: true, prediction: 'Supplier Default Risk', actual: 'Credit downgrade' },
  { date: '2024-08-23', accuracy: '91%', correct: false, prediction: 'Port Congestion', actual: 'Resolved early' },
  { date: '2024-08-22', accuracy: '96%', correct: true, prediction: 'Weather Disruption', actual: 'Storm hit' },
]

export default function DashboardPage() {
  const [alerts, setAlerts] = useState(generateAlertData())
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const refreshAlerts = () => {
    setIsLoading(true)
    setTimeout(() => {
      setAlerts(generateAlertData())
      setIsLoading(false)
    }, 1000)
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500/10 border-red-500/30 text-red-400'
      case 'warning': return 'bg-amber-500/10 border-amber-500/30 text-amber-400'
      default: return 'bg-blue-500/10 border-blue-500/30 text-blue-400'
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'critical': return <Badge className="bg-red-500/20 text-red-400">CRITICAL</Badge>
      case 'warning': return <Badge className="bg-amber-500/20 text-amber-400">WARNING</Badge>
      default: return <Badge variant="secondary">INFO</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <Activity className="h-8 w-8 text-primary" />
              AI Command Center
            </h1>
            <p className="text-lg text-muted-foreground">
              Real-time supply chain risk monitoring and predictions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={refreshAlerts} disabled={isLoading} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Configure
            </Button>
          </div>
        </div>

        {/* Key Metrics Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {supplierMetrics.map((metric, i) => (
            <Card key={i} className="hover:border-primary/50 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <span className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-red-400' : metric.change.startsWith('-') ? 'text-emerald-400' : 'text-emerald-400'}`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Risk Calculator Section */}
        <section id="risk-calculator" className="mb-8 scroll-mt-20">
          <Card className="glass border-primary/20 overflow-hidden">
            <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Global Risk Index</CardTitle>
                    <p className="text-sm text-muted-foreground">AI-powered risk assessment</p>
                  </div>
                </div>
                <Badge className="bg-amber-500/20 text-amber-400 animate-pulse">LIVE</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl p-5 border border-amber-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white/70">Overall Risk Level</span>
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="text-4xl font-bold text-amber-400 mb-2">MEDIUM</div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all" style={{width: '58%'}}></div>
                  </div>
                  <div className="text-xs text-white/50 mt-2">58 / 100</div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl p-5 border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white/70">Supplier Health</span>
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="text-4xl font-bold text-emerald-400 mb-2">92%</div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-300 mt-2">Excellent</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-5 border border-blue-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white/70">Compliance Score</span>
                    <Shield className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-300 mt-2">Fully Compliant</div>
                </div>
              </div>

              {/* Sub-metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Monitored Suppliers', value: '2,847', icon: Building2, color: 'text-violet-400' },
                  { label: 'Active Alerts', value: '23', icon: AlertTriangle, color: 'text-red-400' },
                  { label: 'Countries Covered', value: '190+', icon: Globe, color: 'text-cyan-400' },
                  { label: 'Predictions Today', value: '1,247', icon: TrendingUp, color: 'text-emerald-400' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 text-center border border-white/10 hover:border-white/20 transition-all">
                    <stat.icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Feature Cards */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            AI Analysis Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <AIRiskPredictionCard />
            <GlobalSupplyMappingCard />
            <ComplianceAutomationCard />
          </div>
        </section>

        {/* Two Column Layout: Alerts + Predictions */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Live Alerts Feed */}
          <Card className="border-red-500/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-400" />
                  Live Alerts
                  <Badge variant="secondary" className="ml-2">{alerts.length} active</Badge>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={refreshAlerts}>
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedAlert === alert.id ? 'ring-2 ring-primary' : ''
                  } ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getAlertBadge(alert.type)}
                        <span className="text-xs opacity-70">{alert.time}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{alert.title}</h4>
                      <p className="text-xs opacity-80 line-clamp-2">{alert.description}</p>
                      
                      {selectedAlert === alert.id && (
                        <div className="mt-3 pt-3 border-t border-current/20 space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Building2 className="h-3 w-3" />
                            {alert.suppliersAffected} suppliers affected
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <TrendingUp className="h-3 w-3" />
                            Impact: {alert.impact}
                          </div>
                          <Button size="sm" variant="outline" className="w-full mt-2 gap-2">
                            <Eye className="h-3 w-3" />
                            View Full Details
                          </Button>
                        </div>
                      )}
                    </div>
                    <ChevronRight className={`h-4 w-4 flex-shrink-0 transition-transform ${selectedAlert === alert.id ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Predictions Accuracy */}
          <Card className="border-emerald-500/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-400" />
                Prediction Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Overall Accuracy */}
                <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl p-4 border border-emerald-500/30 text-center">
                  <div className="text-sm text-white/70 mb-1">30-Day Average Accuracy</div>
                  <div className="text-4xl font-bold text-emerald-400">94.2%</div>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-emerald-300">
                    <TrendingUp className="h-3 w-3" />
                    +2.1% from last month
                  </div>
                </div>

                {/* Recent Predictions List */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Recent Predictions</h4>
                  {recentPredictions.map((pred, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${pred.correct ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                        {pred.correct ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-amber-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{pred.prediction}</div>
                        <div className="text-xs text-muted-foreground">{pred.actual}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{pred.accuracy}</div>
                        <div className="text-xs text-muted-foreground">{pred.date.slice(5)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full gap-2">
                  View All Predictions
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-4 gap-4">
          {[
            { title: 'Run Risk Assessment', desc: 'Full supply chain analysis', icon: Brain, href: '#risk-calculator', color: 'from-violet-500 to-purple-600' },
            { title: 'View Compliance', desc: 'Regulatory status overview', icon: Shield, href: '/command-center#compliance', color: 'from-emerald-500 to-green-600' },
            { title: 'Export Report', desc: 'Download PDF/CSV report', icon: Download, href: '#', color: 'from-blue-500 to-cyan-600' },
            { title: 'Manage Alerts', desc: 'Configure notifications', icon: Bell, href: '#', color: 'from-amber-500 to-orange-600' },
          ].map((action, i) => (
            <Link key={i} href={action.href}>
              <Card className="hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer group h-full">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
