'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Shield, Activity, Brain, LineChart, AlertTriangle, CheckCircle2, 
  Search, Filter, TrendingUp, TrendingDown, Minus, Eye, MessageSquare,
  BarChart3, PieChart, Zap, Globe, Lock, Bot, Users, Target,
  ArrowRight, Play, Pause, RefreshCw, Download, Settings, Bell,
  ChevronRight, ChevronDown, Star, Clock, MapPin, Building2,
  Package, Truck, Factory, Database, Cpu, Wifi, Radio
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'

// Recharts imports for interactive charts
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ComposedChart,
  Scatter
} from 'recharts'

// ============================================
// TYPES & INTERFACES
// ============================================

interface Supplier {
  id: string
  name: string
  region: string
  tier: number
  riskScore: number
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  category: string
  onTimeDelivery: number
  financialHealth: number
  complianceScore: number
  trend: 'up' | 'down' | 'stable'
}

interface Alert {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  supplier: string
  type: string
  message: string
  timestamp: Date
  acknowledged: boolean
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface RoadmapMilestone {
  phase: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'upcoming'
  date: string
  items: string[]
}

// ============================================
// MOCK DATA
// ============================================

const suppliersData: Supplier[] = [
  { id: '1', name: 'TechComponents Ltd', region: 'Taiwan', tier: 1, riskScore: 0.12, riskLevel: 'LOW', category: 'Semiconductors', onTimeDelivery: 98.5, financialHealth: 92, complianceScore: 95, trend: 'stable' },
  { id: '2', name: 'GlobalLogistics Corp', region: 'Singapore', tier: 1, riskScore: 0.28, riskLevel: 'MEDIUM', category: 'Logistics', onTimeDelivery: 94.2, financialHealth: 88, complianceScore: 91, trend: 'up' },
  { id: '3', name: 'PrecisionParts Vietnam', region: 'Vietnam', tier: 2, riskScore: 0.45, riskLevel: 'MEDIUM', category: 'Manufacturing', onTimeDelivery: 89.7, financialHealth: 75, complianceScore: 82, trend: 'down' },
  { id: '4', name: 'Shanghai Electronics', region: 'China', tier: 1, riskScore: 0.67, riskLevel: 'HIGH', category: 'Electronics', onTimeDelivery: 82.3, financialHealth: 68, complianceScore: 71, trend: 'down' },
  { id: '5', name: 'EuroMaterials GmbH', region: 'Germany', tier: 1, riskScore: 0.08, riskLevel: 'LOW', category: 'Raw Materials', onTimeDelivery: 99.1, financialHealth: 96, complianceScore: 98, trend: 'stable' },
  { id: '6', name: 'IndiaTech Solutions', region: 'India', tier: 2, riskScore: 0.35, riskLevel: 'MEDIUM', category: 'Software', onTimeDelivery: 91.5, financialHealth: 82, complianceScore: 88, trend: 'up' },
  { id: '7', name: 'BrazilMetals SA', region: 'Brazil', tier: 2, riskScore: 0.52, riskLevel: 'MEDIUM', category: 'Raw Materials', onTimeDelivery: 86.4, financialHealth: 71, complianceScore: 78, trend: 'stable' },
  { id: '8', name: 'KoreaDisplay Co', region: 'South Korea', tier: 1, riskScore: 0.19, riskLevel: 'LOW', category: 'Displays', onTimeDelivery: 96.8, financialHealth: 90, complianceScore: 93, trend: 'up' },
  { id: '9', name: 'MexicoAssembly Inc', region: 'Mexico', tier: 2, riskScore: 0.41, riskLevel: 'MEDIUM', category: 'Assembly', onTimeDelivery: 88.9, financialHealth: 78, complianceScore: 85, trend: 'stable' },
  { id: '10', name: 'JapanPrecision KK', region: 'Japan', tier: 1, riskScore: 0.05, riskLevel: 'LOW', category: 'Precision Parts', onTimeDelivery: 99.5, financialHealth: 98, complianceScore: 99, trend: 'stable' },
]

const alertsData: Alert[] = [
  { id: '1', severity: 'critical', supplier: 'Shanghai Electronics', type: 'Financial Risk', message: 'Credit rating downgraded by Moody\'s - immediate review required', timestamp: new Date(Date.now() - 1000 * 60 * 5), acknowledged: false },
  { id: '2', severity: 'high', supplier: 'PrecisionParts Vietnam', type: 'Operational', message: 'Lead time increased by 45% due to capacity constraints', timestamp: new Date(Date.now() - 1000 * 60 * 23), acknowledged: false },
  { id: '3', severity: 'high', supplier: 'GlobalLogistics Corp', type: 'Geopolitical', message: 'New trade regulations affecting Singapore-EU shipping routes', timestamp: new Date(Date.now() - 1000 * 60 * 45), acknowledged: true },
  { id: '4', severity: 'medium', supplier: 'BrazilMetals SA', type: 'Environmental', message: 'EUDR compliance documentation pending - deadline in 14 days', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), acknowledged: false },
  { id: '5', severity: 'medium', supplier: 'IndiaTech Solutions', type: 'Cybersecurity', message: 'Security audit flagged outdated encryption protocols', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), acknowledged: true },
  { id: '6', severity: 'low', supplier: 'MexicoAssembly Inc', type: 'Quality', message: 'Minor quality deviation detected in batch #4521', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), acknowledged: true },
]

const riskTrendData = [
  { date: 'Jan', score: 0.32, threshold: 0.6 },
  { date: 'Feb', score: 0.35, threshold: 0.6 },
  { date: 'Mar', score: 0.29, threshold: 0.6 },
  { date: 'Apr', score: 0.38, threshold: 0.6 },
  { date: 'May', score: 0.42, threshold: 0.6 },
  { date: 'Jun', score: 0.39, threshold: 0.6 },
  { date: 'Jul', score: 0.45, threshold: 0.6 },
  { date: 'Aug', score: 0.41, threshold: 0.6 },
  { date: 'Sep', score: 0.36, threshold: 0.6 },
  { date: 'Oct', score: 0.33, threshold: 0.6 },
  { date: 'Nov', score: 0.38, threshold: 0.6 },
  { date: 'Dec', score: 0.34, threshold: 0.6 },
]

const demandForecastData = [
  { week: 'W1', actual: 1200, forecast: 1180, lower: 1100, upper: 1260 },
  { week: 'W2', actual: 1350, forecast: 1320, lower: 1240, upper: 1400 },
  { week: 'W3', actual: 1280, forecast: 1300, lower: 1220, upper: 1380 },
  { week: 'W4', actual: 1420, forecast: 1400, lower: 1320, upper: 1480 },
  { week: 'W5', actual: null, forecast: 1450, lower: 1370, upper: 1530 },
  { week: 'W6', actual: null, forecast: 1520, lower: 1440, upper: 1600 },
  { week: 'W7', actual: null, forecast: 1480, lower: 1400, upper: 1560 },
  { week: 'W8', actual: null, forecast: 1550, lower: 1470, upper: 1630 },
  { week: 'W9', actual: null, forecast: 1600, lower: 1520, upper: 1680 },
  { week: 'W10', actual: null, forecast: 1580, lower: 1500, upper: 1660 },
  { week: 'W11', actual: null, forecast: 1650, lower: 1570, upper: 1730 },
  { week: 'W12', actual: null, forecast: 1700, lower: 1620, upper: 1780 },
]

const riskByRegionData = [
  { region: 'Asia-Pacific', value: 42, count: 156 },
  { region: 'Europe', value: 18, count: 89 },
  { region: 'North America', value: 12, count: 67 },
  { region: 'Latin America', value: 18, count: 45 },
  { region: 'Middle East', value: 10, count: 23 },
]

const riskRadarData = [
  { subject: 'Financial', A: 85, B: 72, fullMark: 100 },
  { subject: 'Operational', A: 78, B: 68, fullMark: 100 },
  { subject: 'Geopolitical', A: 65, B: 82, fullMark: 100 },
  { subject: 'Compliance', A: 92, B: 75, fullMark: 100 },
  { subject: 'Environmental', A: 70, B: 65, fullMark: 100 },
  { subject: 'Cyber', A: 88, B: 70, fullMark: 100 },
]

const complianceData = [
  { framework: 'UFLPA', score: 94, status: 'compliant', lastAudit: '2025-01-15' },
  { framework: 'EUDR', score: 87, status: 'review', lastAudit: '2025-02-20' },
  { framework: 'CSDDD', score: 91, status: 'compliant', lastAudit: '2025-01-28' },
  { framework: 'SOX', score: 98, status: 'compliant', lastAudit: '2025-03-01' },
  { framework: 'GDPR', score: 96, status: 'compliant', lastAudit: '2025-02-10' },
  { framework: 'REACH', score: 89, status: 'review', lastAudit: '2025-03-05' },
]

const roadmapData: RoadmapMilestone[] = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    description: 'Core platform infrastructure and ML pipeline setup',
    status: 'completed',
    date: 'Q1 2025',
    items: ['Data ingestion pipeline', 'ML model training framework', 'Basic dashboard UI', 'User authentication']
  },
  {
    phase: 'Phase 2',
    title: 'Intelligence Core',
    description: 'Advanced AI models and real-time processing',
    status: 'completed',
    date: 'Q2 2025',
    items: ['XGBoost risk models', 'SHAP explainability', 'WebSocket alert streaming', 'Supplier profiling']
  },
  {
    phase: 'Phase 3',
    title: 'Predictive Analytics',
    description: 'Demand forecasting and predictive capabilities',
    status: 'in-progress',
    date: 'Q3 2025',
    items: ['90-day demand forecasting', 'Drift detection system', 'Model versioning', 'Confidence intervals']
  },
  {
    phase: 'Phase 4',
    title: 'Autonomous Operations',
    description: 'Self-healing supply chain and autonomous responses',
    status: 'upcoming',
    date: 'Q4 2025',
    items: ['Auto-escalation workflows', 'Digital twin integration', 'AI advisor chatbot', 'M&A matching engine']
  },
]

const suggestedQuestions = [
  'Which Tier-2 suppliers have the highest risk increase this month?',
  'Show me demand forecast for Q4 2025',
  'What are my top compliance gaps?',
  'Identify single-source dependencies in Asia-Pacific'
]

// ============================================
// PARTICLE SYSTEM COMPONENT
// ============================================

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationId: number
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      pulse: number
    }> = []
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    const particleCount = Math.min(Math.floor(window.innerWidth * 0.06), 80)
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2
      })
    }
    
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.08
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        p.pulse += 0.02
        
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
        }
        
        const o = p.opacity + Math.sin(p.pulse) * 0.15
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${o})`
        ctx.fill()
      })
      
      drawConnections()
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

// ============================================
// NAVIGATION COMPONENT
// ============================================

function Navigation({ activeSection, setActiveSection }: { 
  activeSection: string
  setActiveSection: (section: string) => void 
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'suppliers', label: 'Suppliers' },
    { id: 'forecasting', label: 'Forecasting' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'advisor', label: 'AI Advisor' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'contact', label: 'Contact' },
  ]
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass border-b border-border/50 shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-sm text-background">
              SC
            </div>
            <span className="font-semibold text-lg hidden sm:block">AI Supply Chain</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span className={`block h-0.5 w-full bg-current transition-transform ${isMobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-full bg-current transition-opacity ${isMobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-current transition-transform ${isMobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <div className="grid grid-cols-2 gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsMobileOpen(false)
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${
                    activeSection === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary border-primary/20">
          <Zap className="w-3.5 h-3.5 mr-2" />
          AI-Powered Supply Chain Intelligence
        </Badge>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
          Predict Disruptions{' '}
          <span className="gradient-text">Before They Happen</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Real-time AI-powered supply chain risk intelligence platform. Forecast disruptions, 
          monitor suppliers, predict demand, and ensure compliance with explainable machine learning.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 h-12 text-base"
            onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-border/50 hover:border-primary/50 hover:bg-primary/5 px-8 h-12 text-base"
            onClick={() => document.getElementById('advisor')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Try AI Advisor
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '99.2%', label: 'Prediction Accuracy', icon: Target },
            { value: '< 5s', label: 'Alert Latency', icon: Zap },
            { value: '10K+', label: 'Suppliers Tracked', icon: Building2 },
            { value: '24/7', label: 'Monitoring', icon: Activity },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center glow-emerald">
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}

// ============================================
// DASHBOARD SECTION
// ============================================

function DashboardSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('12m')
  const [isLive, setIsLive] = useState(true)
  
  return (
    <section id="dashboard" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
            <BarChart3 className="w-3.5 h-3.5 mr-2" />
            Command Center
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Supply Chain Nervous System</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time KPIs, risk gauges, and trend charts in a unified view — no tab-switching, no delays.
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Badge variant={isLive ? "default" : "secondary"} className={isLive ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : ""}>
              <span className={`w-2 h-2 rounded-full mr-2 ${isLive ? 'bg-emerald-500 pulse-dot' : ''}`} />
              {isLive ? 'LIVE' : 'PAUSED'}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isLive ? 'Pause' : 'Resume'}
            </Button>
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 bg-card border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="12m">12 Months</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Portfolio Risk Score', value: '0.34', change: '-0.03', trend: 'down' as const, icon: Shield, color: 'emerald' },
            { title: 'High-Risk Suppliers', value: '12', change: '+2', trend: 'up' as const, icon: AlertTriangle, color: 'rose' },
            { title: 'On-Time Delivery', value: '94.2%', change: '+1.1%', trend: 'down' as const, icon: Truck, color: 'cyan' },
            { title: 'Active Alerts', value: '23', change: '-5', trend: 'down' as const, icon: Bell, color: 'amber' },
          ].map((kpi, i) => (
            <Card key={i} className="glass glass-hover border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-lg bg-${kpi.color === 'emerald' ? 'emerald' : kpi.color === 'rose' ? 'rose' : kpi.color === 'cyan' ? 'cyan' : 'amber'}-500/10`}>
                    <kpi.icon className={`w-5 h-5 text-${kpi.color === 'emerald' ? 'emerald' : kpi.color === 'rose' ? 'rose' : kpi.color === 'cyan' ? 'cyan' : 'amber'}-400`} />
                  </div>
                  <div className={`flex items-center text-sm ${kpi.trend === 'down' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {kpi.trend === 'down' ? <TrendingDown className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
                    {kpi.change}
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                <div className="text-sm text-muted-foreground">{kpi.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Risk Trend Chart */}
          <Card className="glass border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                Portfolio Risk Trend
              </CardTitle>
              <CardDescription>Monthly average risk score across all suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={riskTrendData}>
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="thresholdGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#8b9dc3" fontSize={12} />
                  <YAxis stroke="#8b9dc3" fontSize={12} domain={[0, 1]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 17, 40, 0.95)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '12px',
                      color: '#f0f4ff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="threshold"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    fill="url(#thresholdGradient)"
                    strokeDasharray="5 5"
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#riskGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Risk by Region */}
          <Card className="glass border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="w-5 h-5 text-cyan-400" />
                Risk Distribution by Region
              </CardTitle>
              <CardDescription>Supplier count and aggregate risk per region</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RechartsPieChart>
                  <Pie
                    data={riskByRegionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#f43f5e'].map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 17, 40, 0.95)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '12px',
                      color: '#f0f4ff'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ color: '#8b9dc3', fontSize: '12px' }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Risk Radar Chart */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Radio className="w-5 h-5 text-violet-400" />
              Multi-Dimensional Risk Profile
            </CardTitle>
            <CardDescription>Current portfolio vs. industry benchmark across risk dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={riskRadarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#8b9dc3" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8b9dc3" />
                <Radar
                  name="Your Portfolio"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="B"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Legend 
                  wrapperStyle={{ color: '#8b9dc3', fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 17, 40, 0.95)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px',
                    color: '#f0f4ff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// ============================================
// SUPPLIER INTELLIGENCE SECTION
// ============================================

function SupplierSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTier, setFilterTier] = useState<string>('all')
  const [filterRisk, setFilterRisk] = useState<string>('all')
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  
  const filteredSuppliers = suppliersData.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = filterTier === 'all' || supplier.tier.toString() === filterTier
    const matchesRisk = filterRisk === 'all' || supplier.riskLevel === filterRisk
    return matchesSearch && matchesTier && matchesRisk
  })
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      case 'MEDIUM': return 'bg-amber-500/15 text-amber-400 border-amber-500/30'
      case 'HIGH': return 'bg-rose-500/15 text-rose-400 border-rose-500/30'
      default: return ''
    }
  }
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-400" />
      case 'down': return <TrendingDown className="w-4 h-4 text-rose-400" />
      default: return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }
  
  return (
    <section id="suppliers" className="py-20 relative">
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
            <Building2 className="w-3.5 h-3.5 mr-2" />
            Supplier Intelligence
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Know Every Node in Your Network</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deep supplier profiles with ML-driven risk assessments. Click any supplier to see detailed SHAP analysis.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers or regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card/50 border-border/50"
            />
          </div>
          <Select value={filterTier} onValueChange={setFilterTier}>
            <SelectTrigger className="w-32 bg-card/50 border-border/50">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="1">Tier 1</SelectItem>
              <SelectItem value="2">Tier 2</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger className="w-36 bg-card/50 border-border/50">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="LOW">Low Risk</SelectItem>
              <SelectItem value="MEDIUM">Medium Risk</SelectItem>
              <SelectItem value="HIGH">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Supplier Table */}
        <Card className="glass border-border/50 mb-6">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead>Supplier</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>OTD %</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow 
                    key={supplier.id} 
                    className="border-border/20 cursor-pointer hover:bg-white/[0.02]"
                    onClick={() => setSelectedSupplier(supplier)}
                  >
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        {supplier.region}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-border/50">
                        T{supplier.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={supplier.riskScore * 100} 
                          className="w-16 h-2"
                        />
                        <span className="text-sm font-mono">{supplier.riskScore.toFixed(2)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRiskColor(supplier.riskLevel)}>
                        {supplier.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{supplier.onTimeDelivery}%</TableCell>
                    <TableCell>{getTrendIcon(supplier.trend)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Supplier Detail Modal */}
        {selectedSupplier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedSupplier(null)}>
            <Card className="glass border-border/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedSupplier.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedSupplier.category} · Tier {selectedSupplier.tier} · {selectedSupplier.region}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className={getRiskColor(selectedSupplier.riskLevel)}>
                    {selectedSupplier.riskLevel} RISK
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Risk Score', value: selectedSupplier.riskScore.toFixed(2), icon: Shield },
                    { label: 'On-Time Delivery', value: `${selectedSupplier.onTimeDelivery}%`, icon: Truck },
                    { label: 'Financial Health', value: `${selectedSupplier.financialHealth}%`, icon: TrendingUp },
                    { label: 'Compliance', value: `${selectedSupplier.complianceScore}%`, icon: CheckCircle2 },
                  ].map((metric, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-border/30">
                      <metric.icon className="w-4 h-4 text-muted-foreground mb-2" />
                      <div className="text-lg font-semibold">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* SHAP Explanation */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    SHAP Feature Attribution
                  </h4>
                  <div className="space-y-3">
                    {[
                      { feature: 'Lead Time Variance', impact: '+0.18', direction: 'increases' },
                      { feature: 'Financial Ratio Change', impact: '+0.12', direction: 'increases' },
                      { feature: 'Geographic Concentration', impact: '+0.08', direction: 'increases' },
                      { feature: 'Historical Performance', impact: '-0.15', direction: 'decreases' },
                      { feature: 'Compliance History', impact: '-0.09', direction: 'decreases' },
                    ].map((shap, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-44 truncate">{shap.feature}</span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${shap.direction === 'increases' ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.abs(parseFloat(shap.impact)) * 100}%` }}
                          />
                        </div>
                        <span className={`text-sm font-mono w-12 text-right ${shap.direction === 'increases' ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {shap.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setSelectedSupplier(null)}
                >
                  Close Detail View
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}

// ============================================
// DEMAND FORECASTING SECTION
// ============================================

function ForecastingSection() {
  const [selectedSku, setSelectedSku] = useState('all')
  const [confidenceLevel, setConfidenceLevel] = useState<'80' | '95'>('95')
  
  return (
    <section id="forecasting" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/20">
            <TrendingUp className="w-3.5 h-3.5 mr-2" />
            Demand Forecasting
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Foresee Demand. Quantify Uncertainty.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            90-day Prophet-style projections with confidence bands. Plan inventory with precision.
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8 justify-between">
          <Select value={selectedSku} onValueChange={setSelectedSku}>
            <SelectTrigger className="w-48 bg-card/50 border-border/50">
              <SelectValue placeholder="Product Line" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="mechanical">Mechanical Parts</SelectItem>
              <SelectItem value="raw-materials">Raw Materials</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Confidence:</span>
            <Tabs value={confidenceLevel} onValueChange={(v) => setConfidenceLevel(v as '80' | '95')}>
              <TabsList className="bg-card/50">
                <TabsTrigger value="80" className="text-xs">80%</TabsTrigger>
                <TabsTrigger value="95" className="text-xs">95%</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Forecast Chart */}
        <Card className="glass border-border/50 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <LineChart className="w-5 h-5 text-amber-400" />
              12-Week Demand Forecast
            </CardTitle>
            <CardDescription>
              Actuals (solid) vs Forecast (line) with {confidenceLevel}% confidence bands
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={demandForecastData}>
                <defs>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="#8b9dc3" fontSize={12} />
                <YAxis stroke="#8b9dc3" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 17, 40, 0.95)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px',
                    color: '#f0f4ff'
                  }}
                />
                <Legend 
                  wrapperStyle={{ color: '#8b9dc3', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="transparent"
                  fill="url(#forecastGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  stroke="#06b6d4"
                  fill="rgba(5, 8, 15, 1)"
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#10b981' }}
                  name="Actual"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Forecast"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Forecast Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Package className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-medium">Peak Week</span>
              </div>
              <div className="text-3xl font-bold gradient-text">Week 12</div>
              <p className="text-sm text-muted-foreground mt-1">Expected volume: 1,700 units</p>
            </CardContent>
          </Card>
          
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="font-medium">Avg Weekly Growth</span>
              </div>
              <div className="text-3xl font-bold gradient-text">+3.2%</div>
              <p className="text-sm text-muted-foreground mt-1">vs. previous quarter</p>
            </CardContent>
          </Card>
          
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <Brain className="w-5 h-5 text-violet-400" />
                </div>
                <span className="font-medium">Model Accuracy</span>
              </div>
              <div className="text-3xl font-bold gradient-text">94.8%</div>
              <p className="text-sm text-muted-foreground mt-1">MAPE over last 90 days</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// ============================================
// ALERT HUB SECTION
// ============================================

function AlertsSection() {
  const [alerts, setAlerts] = useState<Alert[]>(alertsData)
  const [filterSeverity, setFilterSeverity] = useState<string>('all')
  const { toast } = useToast()
  
  const filteredAlerts = alerts.filter(alert => 
    filterSeverity === 'all' || alert.severity === filterSeverity
  )
  
  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => 
      a.id === id ? { ...a, acknowledged: true } : a
    ))
    toast({
      title: "Alert Acknowledged",
      description: "The alert has been marked as acknowledged.",
    })
  }
  
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical': return {
        badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
        dot: 'bg-rose-500',
        icon: <AlertTriangle className="w-4 h-4" />
      }
      case 'high': return {
        badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
        dot: 'bg-orange-500',
        icon: <AlertTriangle className="w-4 h-4" />
      }
      case 'medium': return {
        badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        dot: 'bg-amber-500',
        icon: <Bell className="w-4 h-4" />
      }
      default: return {
        badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
        dot: 'bg-blue-500',
        icon: <Bell className="w-4 h-4" />
      }
    }
  }
  
  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length
  
  return (
    <section id="alerts" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-rose-500/10 text-rose-400 border-rose-500/20">
            <Bell className="w-3.5 h-3.5 mr-2" />
            Real-Time Alert Hub
            {unacknowledgedCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-rose-500 text-white rounded-full">
                {unacknowledgedCount}
              </span>
            )}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Never Be Caught Off Guard</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            WebSocket-powered streaming delivers alerts in &lt;5 seconds. Triage instantly with one-click actions.
          </p>
        </div>
        
        {/* Alert Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
              Live Streaming Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-36 bg-card/50 border-border/50">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Alerts List */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const styles = getSeverityStyles(alert.severity)
            const timeAgo = formatTimeAgo(alert.timestamp)
            
            return (
              <Card 
                key={alert.id} 
                className={`glass border-border/50 transition-all hover:border-border ${
                  !alert.acknowledged ? 'ring-1 ring-rose-500/20' : 'opacity-75'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 w-3 h-3 rounded-full ${styles.dot} ${!alert.acknowledged ? 'pulse-dot' : ''}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className={`text-xs ${styles.badge}`}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <span className="font-medium">{alert.supplier}</span>
                        <span className="text-xs text-muted-foreground">· {alert.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <span className="text-xs text-muted-foreground">{timeAgo}</span>
                    </div>
                    
                    {!alert.acknowledged && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="shrink-0"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Acknowledge
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {filteredAlerts.length === 0 && (
          <Card className="glass border-border/50">
            <CardContent className="p-12 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Alerts Match Your Filters</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your severity filter to see more alerts.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

// Helper function for time formatting
function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

// ============================================
// COMPLIANCE TRACKER SECTION
// ============================================

function ComplianceSection() {
  return (
    <section id="compliance" className="py-20 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            <Lock className="w-3.5 h-3.5 mr-2" />
            Compliance Command Center
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Six Frameworks. One Dashboard.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            UFLPA, EUDR, CSDDD, SOX, GDPR, REACH — tracked in parallel with automated gap analyses.
          </p>
        </div>
        
        {/* Compliance Table */}
        <Card className="glass border-border/50 mb-8">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead>Framework</TableHead>
                  <TableHead>Compliance Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Audit</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceData.map((item, i) => (
                  <TableRow key={i} className="border-border/20">
                    <TableCell className="font-medium">{item.framework}</TableCell>
                    <TableCell>
                      <span className={`font-mono font-semibold ${
                        item.score >= 95 ? 'text-emerald-400' : 
                        item.score >= 85 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {item.score}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        item.status === 'compliant' 
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      }>
                        {item.status === 'compliant' ? 'Compliant' : 'Review Needed'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-sm">
                      {item.lastAudit}
                    </TableCell>
                    <TableCell className="w-32">
                      <Progress value={item.score} className="h-2" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Compliance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold gradient-text mb-2">94.2%</div>
              <div className="text-sm text-muted-foreground">Average Compliance Score</div>
            </CardContent>
          </Card>
          <Card className="glass border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">4/6</div>
              <div className="text-sm text-muted-foreground">Fully Compliant</div>
            </CardContent>
          </Card>
          <Card className="glass border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">2</div>
              <div className="text-sm text-muted-foreground">Need Attention</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// ============================================
// AI ADVISOR CHATBOT SECTION
// ============================================

function AdvisorSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Supply Chain Risk Advisor. I can help you analyze supplier risks, forecast demand, check compliance status, and identify potential disruptions. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const sendMessage = async (content?: string) => {
    const messageText = content || input.trim()
    if (!messageText) return
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(messageText),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }
  
  const generateAIResponse = (query: string): string => {
    const q = query.toLowerCase()
    
    if (q.includes('tier-2') || q.includes('tier 2')) {
      return `Based on current data, **PrecisionParts Vietnam** shows the highest risk increase among Tier-2 suppliers this month (+0.12 points). Key drivers:\n\n• Lead time variance increased 45%\n• Financial health score declined 8 points\n• New environmental regulation exposure\n\nRecommendation: Schedule a supplier review meeting and activate backup sourcing options.`
    }
    
    if (q.includes('demand') || q.includes('forecast')) {
      return `Here's the **Q4 2025 demand outlook**:\n\n📈 **Overall Trend**: +3.2% WoW growth expected\n📦 **Peak Volume**: Week 12 at ~1,700 units\n🎯 **Confidence**: 94.8% model accuracy (MAPE)\n\n**Top 3 SKUs by growth:**\n1. Electronic Components (+8.2%)\n2. Precision Parts (+5.1%)\n3. Raw Materials (+2.8%)\n\nWould you like me to drill into any specific product line?`
    }
    
    if (q.includes('compliance') || q.includes('gap')) {
      return `**Current Compliance Status:**\n\n✅ **Fully Compliant (4/6)**:\n• UFLPA: 94%\n• CSDDD: 91%\n• SOX: 98%\n• GDPR: 96%\n\n⚠️ **Needs Review (2/6)**:\n• **EUDR**: 87% - Deforestation documentation pending\n• **REACH**: 89% - Chemical reporting update required\n\n**Recommended Actions:**\n1. Prioritize EUDR documentation collection (deadline: 14 days)\n2. Schedule REACH compliance review with legal team`
    }
    
    if (q.includes('asia') || q.includes('apac') || q.includes('single-source')) {
      return `**Asia-Pacific Single-Source Analysis:**\n\n🔴 **Critical Dependencies Identified:**\n\n1. **Semiconductors** - TechComponents Ltd (Taiwan)\n   • 78% of semiconductor sourcing\n   • Risk Score: 0.12 (LOW but concentrated)\n\n2. **Displays** - KoreaDisplay Co (South Korea)\n   • 65% of display components\n   • Risk Score: 0.19 (LOW)\n\n3. **Electronics Assembly** - Shanghai Electronics\n   • 52% of assembly capacity\n   • Risk Score: 0.67 (⚠️ HIGH)\n\n**Recommendation**: Diversify Shanghai Electronics dependency immediately. I've identified 3 qualified alternatives in Vietnam and Mexico.`
    }
    
    return `I understand you're asking about "${query}". Let me analyze that for you.\n\nBased on our supply chain intelligence platform, I can provide insights on:\n\n• 📊 **Risk Analysis** - Supplier scores, trends, SHAP explanations\n• 📈 **Demand Forecasting** - 90-day projections with confidence bands\n• 🔒 **Compliance Status** - All 6 regulatory frameworks\n• 🌍 **Geopolitical Risks** - Trade policy, sanctions, regional stability\n• 🏭 **Operational Metrics** - OTD, lead times, quality scores\n\nCould you be more specific about what aspect you'd like to explore?`
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }
  
  return (
    <section id="advisor" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
            <Bot className="w-3.5 h-3.5 mr-2" />
            AI Risk Advisor
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">An Advisor That Never Sleeps</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ask questions in plain language. Get answers grounded in live supply chain data.
          </p>
        </div>
        
        {/* Chat Interface */}
        <Card className="glass border-border/50 overflow-hidden">
          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary/20 text-foreground border border-primary/30'
                      : 'bg-white/[0.03] border border-border/50'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-violet-400" />
                      <span className="text-xs text-muted-foreground">AI Advisor</span>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/[0.03] border border-border/50 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-violet-400" />
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="text-xs text-muted-foreground mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1.5 px-3 border-border/50 hover:border-primary/30 hover:bg-primary/5"
                    onClick={() => sendMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <div className="border-t border-border/30 p-4">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about supplier risks, demand forecasts, compliance..."
                className="flex-1 min-h-[44px] max-h-32 resize-none bg-card/50 border-border/50"
                rows={1}
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white px-4"
              >
                <SendIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

// Send Icon Component
function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  )
}

// ============================================
// ROADMAP SECTION
// ============================================

function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
            <Clock className="w-3.5 h-3.5 mr-2" />
            Development Roadmap
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">From Prototype to Production</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four phases of development transforming vision into an autonomous supply chain intelligence platform.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-violet-500 transform md:-translate-x-1/2" />
          
          <div className="space-y-12">
            {roadmapData.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-background transform -translate-x-1/2 z-10 ${
                  milestone.status === 'completed' ? 'bg-emerald-500' :
                  milestone.status === 'in-progress' ? 'bg-amber-500 pulse-dot' :
                  'bg-muted-foreground'
                }`} />
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <Card className={`glass border-border/50 inline-block ${
                    milestone.status === 'in-progress' ? 'animated-border' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2 flex-wrap" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                        <Badge variant="outline" className={
                          milestone.status === 'completed' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                          milestone.status === 'in-progress' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
                          'bg-muted-foreground/15 text-muted-foreground border-muted-foreground/30'
                        }>
                          {milestone.phase}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {milestone.date}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{milestone.description}</p>
                      <ul className={`text-sm space-y-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        {milestone.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                            {milestone.status === 'completed' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : milestone.status === 'in-progress' ? (
                              <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-muted-foreground shrink-0" />
                            )}
                            <span className={milestone.status === 'completed' ? 'line-through text-muted-foreground' : ''}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// CONTACT FORM SECTION
// ============================================

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interest: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast({
      title: "Demo Request Received! 🎉",
      description: "We'll contact you within 24 hours to schedule your personalized demo.",
    })
    
    setFormData({ name: '', email: '', organization: '', interest: '', message: '' })
    setIsSubmitting(false)
  }
  
  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <MessageSquare className="w-3.5 h-3.5 mr-2" />
            Get Started
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Build the Future Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Request a personalized demo and see how explainable AI transforms supply chain risk management.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="glass border-border/50">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="bg-card/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="bg-card/50 border-border/50"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        placeholder="Acme Corp"
                        value={formData.organization}
                        onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                        className="bg-card/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interest">Interest</Label>
                      <Select value={formData.interest} onValueChange={(value) => setFormData(prev => ({ ...prev, interest: value }))}>
                        <SelectTrigger className="bg-card/50 border-border/50">
                          <SelectValue placeholder="Select your interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enterprise">Enterprise License</SelectItem>
                          <SelectItem value="investor">Investor Briefing</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="technical">Technical Deep-Dive</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your supply chain challenges..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="bg-card/50 border-border/50 resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white h-12"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Schedule Demo
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  What You'll See
                </h3>
                <ul className="space-y-3">
                  {[
                    'Live Command Center with real-time KPIs',
                    'SHAP-based explainable risk scoring',
                    'WebSocket alert streaming',
                    'AI-powered risk advisor chatbot',
                    '90-day demand forecasting',
                    'Multi-regulatory compliance tracking',
                    'Model operations dashboard'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <p className="text-xs text-muted-foreground">
                  Duration: 30 minutes · Platform: Web-based · No installation required
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Direct Access</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-xs text-muted-foreground">partnerships@aisupplychain.ai</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10">
                      <Users className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">LinkedIn</div>
                      <div className="text-xs text-muted-foreground">Connect for updates</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/10">
                      <Github className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">GitHub</div>
                      <div className="text-xs text-muted-foreground">View technical blog</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

// GitHub Icon
function Github({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

// ============================================
// FOOTER COMPONENT
// ============================================

function Footer() {
  return (
    <footer className="border-t border-border/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-xs text-background">
              SC
            </div>
            <span className="font-medium">AI Supply Chain Risk Predictor</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#home" className="hover:text-foreground transition-colors">Home</a>
            <a href="#dashboard" className="hover:text-foreground transition-colors">Dashboard</a>
            <a href="#suppliers" className="hover:text-foreground transition-colors">Suppliers</a>
            <a href="#forecasting" className="hover:text-foreground transition-colors">Forecasting</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-right">
            © 2025 AI Supply Chain Risk Predictor. All rights reserved.
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="text-center text-xs text-muted-foreground">
          Built with Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Recharts
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  
  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )
    
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <main className="min-h-screen relative">
      {/* Particle Background */}
      <ParticleCanvas />
      
      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none z-0" />
      
      {/* Navigation */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <DashboardSection />
        <SupplierSection />
        <ForecastingSection />
        <AlertsSection />
        <ComplianceSection />
        <AdvisorSection />
        <RoadmapSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
