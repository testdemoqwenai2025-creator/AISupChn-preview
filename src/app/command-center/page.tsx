'use client'

import React, { useState } from 'react'
import {
  Command, LayoutDashboard, Users, Brain, TrendingUp,
  ShieldCheck, AlertTriangle, CheckCircle2, Clock, MapPin,
  Factory, Package, Truck, Globe, ArrowUpRight, ArrowDownRight,
  Eye, Activity, Zap, Target, FileText, BarChart3
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageDecorations } from '@/components/page-decorations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'

// Mock Supplier Data
const supplierData = [
  { id: 'SUP-001', name: 'TechComp Industries Ltd', region: 'APAC', country: 'Vietnam', riskScore: 72, tier: 1, status: 'Active', lastAudit: '2024-01-15' },
  { id: 'SUP-002', name: 'EuroParts Manufacturing GmbH', region: 'EMEA', country: 'Germany', riskScore: 28, tier: 1, status: 'Active', lastAudit: '2024-02-20' },
  { id: 'SUP-003', name: 'AsiaLogistics Solutions Pte', region: 'APAC', country: 'Singapore', riskScore: 45, tier: 2, status: 'Under Review', lastAudit: '2023-11-10' },
  { id: 'SUP-004', name: 'Global Components Inc', region: 'Americas', country: 'USA', riskScore: 18, tier: 1, status: 'Active', lastAudit: '2024-03-01' },
  { id: 'SUP-005', name: 'Shenzhen Electronics Co', region: 'APAC', country: 'China', riskScore: 85, tier: 2, status: 'Critical Review', lastAudit: '2023-09-22' },
  { id: 'SUP-006', name: 'Nordic Materials AB', region: 'EMEA', country: 'Sweden', riskScore: 12, tier: 1, status: 'Active', lastAudit: '2024-02-28' },
  { id: 'SUP-007', name: 'Brazil Steel Works SA', region: 'LATAM', country: 'Brazil', riskScore: 56, tier: 2, status: 'Active', lastAudit: '2023-12-15' },
  { id: 'SUP-008', name: 'India Tech Services Pvt', region: 'APAC', country: 'India', riskScore: 38, tier: 2, status: 'Active', lastAudit: '2024-01-08' },
]

// Compliance Tracking Data
const complianceData = [
  { framework: 'UFLPA', fullName: 'Uyghur Forced Labor Prevention Act', score: 87, status: 'Compliant', lastUpdate: '2 hours ago', items: 142, passed: 138 },
  { framework: 'EUDR', fullName: 'EU Deforestation Regulation', score: 92, status: 'Compliant', lastUpdate: '1 day ago', items: 89, passed: 82 },
  { framework: 'CSDDD', fullName: 'Corporate Sustainability Due Diligence', score: 74, status: 'In Progress', lastUpdate: '5 hours ago', items: 156, passed: 115 },
  { framework: 'GDPR', fullName: 'General Data Protection Regulation', score: 98, status: 'Compliant', lastUpdate: '3 days ago', items: 67, passed: 66 },
  { framework: 'SOX', fullName: 'Sarbanes-Oxley Act', score: 95, status: 'Compliant', lastUpdate: '1 week ago', items: 45, passed: 43 },
  { framework: 'REACH', fullName: 'Registration Evaluation Authorization', score: 81, status: 'Compliant', lastUpdate: '4 hours ago', items: 234, passed: 190 },
]

// Risk Intelligence Items
const riskIntelData = [
  { type: 'Geopolitical', severity: 'high', title: 'Trade tensions escalating in South China Sea', impact: '12 suppliers affected', time: '30 min ago', trend: 'up' },
  { type: 'Financial', severity: 'medium', title: 'Currency volatility in emerging markets', impact: '8 suppliers at risk', time: '2 hours ago', trend: 'stable' },
  { type: 'Environmental', severity: 'high', title: 'Drought conditions in Southeast Asia', impact: 'Manufacturing delays expected', time: '4 hours ago', trend: 'up' },
  { type: 'Cyber', severity: 'critical', title: 'Supply chain cyber attack pattern detected', impact: 'Immediate action required', time: '1 hour ago', trend: 'up' },
  { type: 'Regulatory', severity: 'medium', title: 'New EU import restrictions proposed', impact: '25 products affected', time: '6 hours ago', trend: 'stable' },
  { type: 'Operational', severity: 'low', title: 'Port congestion improving at Rotterdam', impact: 'Shipping times normalizing', time: '8 hours ago', trend: 'down' },
]

// Forecasting Data
const forecastData = [
  { category: 'Electronics Components', current: 12450, forecast: 13200, confidence: 89, trend: 'up' },
  { category: 'Raw Materials', current: 8900, forecast: 8500, confidence: 76, trend: 'down' },
  { category: 'Packaging', current: 3200, forecast: 3450, confidence: 92, trend: 'up' },
  { category: 'Logistics Services', current: 5600, forecast: 6100, confidence: 84, trend: 'up' },
  { category: 'Contract Manufacturing', current: 15800, forecast: 16200, confidence: 94, trend: 'up' },
]

// Dashboard KPIs
const dashboardKPIs = [
  { label: 'Total Suppliers Monitored', value: '1,247', change: '+23', icon: Users, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { label: 'Avg Risk Score', value: '42.3', change: '-3.2', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Active Alerts', value: '18', change: '+5', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Compliance Rate', value: '94.7%', change: '+1.2%', icon: CheckCircle2, color: 'text-violet-500', bg: 'bg-violet-500/10' },
]

export default function CommandCenterPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-rose-500 bg-rose-500/10'
    if (score >= 50) return 'text-amber-500 bg-amber-500/10'
    if (score >= 30) return 'text-cyan-500 bg-cyan-500/10'
    return 'text-emerald-500 bg-emerald-500/10'
  }

  const getRiskBadge = (score: number) => {
    if (score >= 70) return <Badge variant="destructive">High Risk</Badge>
    if (score >= 50) return <Badge className="bg-amber-500 text-white hover:bg-amber-600">Medium</Badge>
    if (score >= 30) return <Badge variant="secondary">Low</Badge>
    return <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Minimal</Badge>
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-rose-500/30 bg-rose-500/5'
      case 'high': return 'border-amber-500/30 bg-amber-500/5'
      case 'medium': return 'border-cyan-500/30 bg-cyan-500/5'
      default: return 'border-emerald-500/30 bg-emerald-500/5'
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return <Badge variant="destructive">Critical</Badge>
      case 'high': return <Badge className="bg-amber-500 text-white hover:bg-amber-600">High</Badge>
      case 'medium': return <Badge variant="outline">Medium</Badge>
      default: return <Badge variant="secondary">Low</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <PageDecorations theme="analytics" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Command className="h-8 w-8 text-primary" />
              Command Center
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time supply chain operations & risk management hub
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1 pulse-dot">
              <Eye className="h-3 w-3" />
              Live Monitoring
            </Badge>
            <Button size="sm" className="gap-2">
              <Zap className="h-4 w-4" />
              Run Analysis
            </Button>
          </div>
        </div>

        {/* Main Tabs Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Suppliers</span>
            </TabsTrigger>
            <TabsTrigger value="intel" className="gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Risk Intel</span>
            </TabsTrigger>
            <TabsTrigger value="forecasting" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Forecasting</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Compliance</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardKPIs.map((kpi, i) => (
                <Card key={i} className="glass group hover:scale-[1.02] transition-transform cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                        <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                      </div>
                      <Badge variant={kpi.change.startsWith('+') ? 'default' : 'secondary'} className="gap-1 text-xs">
                        {kpi.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {kpi.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{kpi.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Regional Distribution */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Globe className="h-5 w-5 text-primary" />
                    Regional Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { region: 'APAC', count: 487, percentage: 39, color: 'from-cyan-500 to-blue-500' },
                    { region: 'EMEA', count: 342, percentage: 27, color: 'from-violet-500 to-purple-500' },
                    { region: 'Americas', count: 298, percentage: 24, color: 'from-emerald-500 to-green-500' },
                    { region: 'LATAM', count: 120, percentage: 10, color: 'from-amber-500 to-orange-500' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.region}</span>
                        <span className="text-muted-foreground">{item.count} suppliers ({item.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Risk Overview */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Activity className="h-5 w-5 text-primary" />
                    Risk Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { level: 'Critical Risk', count: 23, color: 'bg-rose-500' },
                    { level: 'High Risk', count: 89, color: 'bg-amber-500' },
                    { level: 'Medium Risk', count: 245, color: 'bg-cyan-500' },
                    { level: 'Low Risk', count: 890, color: 'bg-emerald-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium">{item.level}</span>
                      </div>
                      <Badge variant="outline">{item.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { action: 'New supplier onboarded', detail: 'Nordic Materials AB', time: '10 min ago', type: 'success' },
                    { action: 'Risk alert triggered', detail: 'Shenzhen Electronics Co', time: '25 min ago', type: 'warning' },
                    { action: 'Compliance audit completed', detail: 'EuroParts GmbH - UFLPA', time: '1 hour ago', type: 'success' },
                    { action: 'Forecast updated', detail: 'Q2 Demand Analysis', time: '2 hours ago', type: 'info' },
                    { action: 'Supplier review due', detail: 'Brazil Steel Works SA', time: '3 hours ago', type: 'warning' },
                  ].map((activity, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${
                      activity.type === 'success' ? 'border-emerald-500/20 bg-emerald-500/5' :
                      activity.type === 'warning' ? 'border-amber-500/20 bg-amber-500/5' :
                      'border-cyan-500/20 bg-cyan-500/5'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'success' ? 'bg-emerald-500' :
                        activity.type === 'warning' ? 'bg-amber-500' : 'bg-cyan-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{activity.action}</div>
                        <div className="text-xs text-muted-foreground truncate">{activity.detail}</div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Supplier Registry
                    <Badge variant="secondary" className="ml-2">{supplierData.length} suppliers</Badge>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" /> Export
                    </Button>
                    <Button size="sm" className="gap-1">
                      <Users className="h-4 w-4" /> Add Supplier
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier ID</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Audit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supplierData.map((supplier) => (
                        <TableRow key={supplier.id} className="group hover:bg-primary/5">
                          <TableCell className="font-mono text-sm">{supplier.id}</TableCell>
                          <TableCell className="font-medium">{supplier.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">{supplier.region}</Badge>
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1 text-sm">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              {supplier.country}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${supplier.riskScore >= 70 ? 'text-rose-500' : supplier.riskScore >= 50 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                {supplier.riskScore}
                              </span>
                              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    supplier.riskScore >= 70 ? 'bg-rose-500' :
                                    supplier.riskScore >= 50 ? 'bg-amber-500' :
                                    supplier.riskScore >= 30 ? 'bg-cyan-500' : 'bg-emerald-500'
                                  }`}
                                  style={{ width: `${supplier.riskScore}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={supplier.tier === 1 ? 'default' : 'secondary'} className="text-xs">
                              Tier {supplier.tier}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getRiskBadge(supplier.riskScore)}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{supplier.lastAudit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Intelligence Tab */}
          <TabsContent value="intel" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="glass lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Intelligence Feed
                    <Badge variant="outline" className="gap-1 ml-2 animate-pulse">
                      <Eye className="h-3 w-3" /> Live
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {riskIntelData.map((item, i) => (
                    <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:scale-[1.01] ${getSeverityColor(item.severity)}`}>
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        item.severity === 'critical' ? 'bg-rose-500' :
                        item.severity === 'high' ? 'bg-amber-500' :
                        item.severity === 'medium' ? 'bg-cyan-500' : 'bg-emerald-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getSeverityBadge(item.severity)}
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        </div>
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{item.impact}</div>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                        {item.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-rose-500 mx-auto mt-1" />}
                        {item.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-emerald-500 mx-auto mt-1" />}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Target className="h-5 w-5 text-primary" />
                    Threat Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { category: 'Geopolitical', count: 47, trend: '+12%', icon: Globe, color: 'text-red-500' },
                    { category: 'Financial', count: 32, trend: '-5%', icon: BarChart3, color: 'text-amber-500' },
                    { category: 'Environmental', count: 28, trend: '+8%', icon: Factory, color: 'text-green-500' },
                    { category: 'Cyber Security', count: 19, trend: '+24%', icon: ShieldCheck, color: 'text-purple-500' },
                    { category: 'Regulatory', count: 35, trend: '+3%', icon: FileText, color: 'text-blue-500' },
                    { category: 'Operational', count: 41, trend: '-2%', icon: Truck, color: 'text-cyan-500' },
                  ].map((cat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <cat.icon className={`h-4 w-4 ${cat.color}`} />
                        <span className="text-sm font-medium">{cat.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{cat.count}</div>
                        <div className={`text-xs ${cat.trend.startsWith('+') ? 'text-rose-500' : 'text-emerald-500'}`}>{cat.trend}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forecasting Tab */}
          <TabsContent value="forecasting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Demand Forecast Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {forecastData.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl border bg-card space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{item.category}</span>
                        <div className="flex items-center gap-2">
                          {item.trend === 'up' ? <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : <ArrowDownRight className="h-4 w-4 text-rose-500" />}
                          <Badge variant="outline" className="text-xs">{Math.round(((item.forecast - item.current) / item.current) * 100)}%</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Current</div>
                          <div className="text-lg font-bold">{item.current.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Forecast</div>
                          <div className="text-lg font-bold text-primary">{item.forecast.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>AI Confidence</span>
                          <span className="font-medium">{item.confidence}%</span>
                        </div>
                        <Progress value={item.confidence} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    AI Model Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { metric: 'Prediction Accuracy', value: 94.2, unit: '%' },
                    { metric: 'False Positive Rate', value: 3.8, unit: '%' },
                    { metric: 'Mean Absolute Error', value: 4.2, unit: '%' },
                    { metric: 'Model Latency', value: 127, unit: 'ms' },
                    { metric: 'Data Coverage', value: 98.7, unit: '%' },
                  ].map((metric, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric.metric}</span>
                        <span className="font-bold text-primary">{metric.value}{metric.unit}</span>
                      </div>
                      <Progress value={typeof metric.value === 'number' && metric.unit === '%' ? metric.value : Math.max(0, 100 - metric.value)} className="h-2" />
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-violet-500" />
                        <span className="font-semibold text-sm">Model Status</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm text-muted-foreground">All models running • Last trained: 2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Compliance Framework Tracker
                    <Badge variant="secondary" className="ml-2">{complianceData.length} frameworks</Badge>
                  </CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" /> Generate Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData.map((framework, i) => (
                    <div key={i} className="p-5 rounded-xl border bg-card space-y-4 hover:border-primary/30 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                            framework.score >= 90 ? 'bg-emerald-500/10 text-emerald-500' :
                            framework.score >= 75 ? 'bg-cyan-500/10 text-cyan-500' :
                            'bg-amber-500/10 text-amber-500'
                          }`}>
                            {framework.score}
                          </div>
                          <div>
                            <div className="font-semibold flex items-center gap-2">
                              {framework.framework}
                              {framework.status === 'Compliant' ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <Clock className="h-4 w-4 text-amber-500" />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{framework.fullName}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={framework.status === 'Compliant' ? 'default' : 'secondary'}>
                            {framework.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{framework.lastUpdate}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Compliance Progress</span>
                          <span className="font-medium">{framework.passed}/{framework.items} requirements met</span>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              framework.score >= 90 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                              framework.score >= 75 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
                              'bg-gradient-to-r from-amber-500 to-orange-500'
                            }`}
                            style={{ width: `${framework.score}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="ghost" size="sm" className="gap-1 text-xs">
                          <Eye className="h-3 w-3" /> View Details
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1 text-xs">
                          <FileText className="h-3 w-3" /> Documentation
                        </Button>
                        {framework.status !== 'Compliant' && (
                          <Button size="sm" className="gap-1 text-xs">
                            <Zap className="h-3 w-3" /> Remediate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
