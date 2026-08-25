'use client'

import React, { useState, useEffect } from 'react'
import { 
  AlertTriangle, Shield, TrendingUp, TrendingDown, Activity,
  Globe, Brain, Zap, Eye, ArrowUpRight, ArrowDownRight,
  Package, Truck, Factory
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { DashboardDecorations } from '@/components/page-decorations'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, ComposedChart
} from 'recharts'

// Mock Data - Visual Only
const riskTrendData = [
  { date: 'Jan', risk: 45, incidents: 3 },
  { date: 'Feb', risk: 52, incidents: 5 },
  { date: 'Mar', risk: 38, incidents: 2 },
  { date: 'Apr', risk: 65, incidents: 8 },
  { date: 'May', risk: 58, incidents: 6 },
  { date: 'Jun', risk: 42, incidents: 4 },
  { date: 'Jul', risk: 72, incidents: 10 },
]

const demandForecastData = [
  { month: 'Week 1', actual: 1200, forecast: 1150, lower: 1000, upper: 1300 },
  { month: 'Week 2', actual: 1350, forecast: 1280, lower: 1100, upper: 1450 },
  { month: 'Week 3', actual: 1100, forecast: 1180, lower: 1000, upper: 1350 },
  { month: 'Week 4', actual: 1400, forecast: 1350, lower: 1200, upper: 1500 },
]

const supplierRiskData = [
  { name: 'Low Risk', value: 45, color: '#10b981' },
  { name: 'Medium Risk', value: 30, color: '#f59e0b' },
  { name: 'High Risk', value: 15, color: '#f43f5e' },
  { name: 'Critical', value: 10, color: '#dc2626' },
]

const regionalData = [
  { region: 'APAC', risk: 62, suppliers: 340 },
  { region: 'EMEA', risk: 48, suppliers: 280 },
  { region: 'Americas', risk: 35, suppliers: 420 },
  { region: 'LATAM', risk: 55, suppliers: 150 },
]

const radarData = [
  { subject: 'Financial', A: 85, B: 70 },
  { subject: 'Operational', A: 75, B: 80 },
  { subject: 'Geopolitical', A: 90, B: 60 },
  { subject: 'Compliance', A: 80, B: 75 },
  { subject: 'Environmental', A: 70, B: 85 },
  { subject: 'Cyber', A: 88, B: 72 },
]

export default function DashboardPage() {
  const [liveData, setLiveData] = useState(riskTrendData)

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => prev.map(item => {
        const riskDelta = (Math.random() - 0.5) * 10
        const incidentDelta = Math.floor((Math.random() - 0.5) * 3)
        return {
          ...item,
          risk: Math.max(20, Math.min(95, item.risk + riskDelta)),
          incidents: Math.max(0, item.incidents + incidentDelta)
        }
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const kpiCards = [
    {
      title: 'Overall Risk Score',
      value: '58',
      change: '+5',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Active Suppliers',
      value: '1,190',
      change: '+12',
      trend: 'up',
      icon: Globe,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Open Alerts',
      value: '23',
      change: '-8',
      trend: 'down',
      icon: Activity,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
    },
    {
      title: 'AI Predictions',
      value: '94.2%',
      change: '+0.8%',
      trend: 'up',
      icon: Brain,
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10',
    },
  ]

  return (
    <div className="min-h-screen bg-background relative">
      <DashboardDecorations />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((kpi, i) => (
            <Card key={i} className="glass group hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                    <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <Badge variant={kpi.trend === 'up' ? 'default' : 'destructive'} className="gap-1">
                    {kpi.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {kpi.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{kpi.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Risk Trend Chart */}
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Risk Trend Analysis</h3>
                <Badge variant="outline" className="gap-1 pulse-dot">
                  <Eye className="h-3 w-3" />
                  Live
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={liveData}>
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(5, 150, 105, 0.1)" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid rgba(5, 150, 105, 0.2)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Area type="monotone" dataKey="risk" stroke="#059669" fillOpacity={1} fill="url(#riskGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Supplier Risk Distribution */}
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Supplier Risk Distribution</h3>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  View All
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={supplierRiskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {supplierRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {supplierRiskData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                    <span className="ml-auto font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Demand Forecast */}
          <Card className="glass lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Demand Forecast vs Actual</h3>
                <Badge variant="secondary" className="gap-1">
                  <Zap className="h-3 w-3" />
                  AI Powered
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={demandForecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(5, 150, 105, 0.1)" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="actual" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="forecast" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Regional Overview */}
          <Card className="glass">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-6">Regional Risk</h3>
              <div className="space-y-4">
                {regionalData.map((region, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{region.region}</span>
                      <span className="text-muted-foreground">{region.suppliers} suppliers</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          region.risk > 60 ? 'bg-gradient-to-r from-rose-500 to-red-500' :
                          region.risk > 50 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                          'bg-gradient-to-r from-emerald-500 to-green-500'
                        }`}
                        style={{ width: `${region.risk}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Alerts Feed */}
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Live Risk Alerts
              </h3>
              <Badge variant="outline" className="gap-1 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-primary current-color" />
                Real-time
              </Badge>
            </div>
            <div className="space-y-3">
              {[
                { type: 'critical', title: 'Typhoon approaching Vietnam coast', supplier: 'TechComp Ltd', time: '2 min ago', region: 'APAC' },
                { type: 'warning', title: 'Currency fluctuation detected - EUR/USD', supplier: 'EuroParts GmbH', time: '15 min ago', region: 'EMEA' },
                { type: 'info', title: 'New compliance regulation announced', supplier: 'Global Manufacturing Co', time: '1 hour ago', region: 'Americas' },
                { type: 'warning', title: 'Port congestion at Singapore', supplier: 'AsiaLogistics Pte', time: '2 hours ago', region: 'APAC' },
              ].map((alert, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:scale-[1.01] ${
                  alert.type === 'critical' ? 'bg-rose-500/5 border-rose-500/20' :
                  alert.type === 'warning' ? 'bg-amber-500/5 border-amber-500/20' :
                  'bg-cyan-500/5 border-cyan-500/20'
                }`}>
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'critical' ? 'bg-rose-500' :
                    alert.type === 'warning' ? 'bg-amber-500' :
                    'bg-cyan-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{alert.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {alert.supplier} • {alert.region}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
