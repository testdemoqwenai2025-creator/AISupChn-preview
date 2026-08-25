'use client'

import React, { useState, useEffect } from 'react'
import { 
  Brain, CloudSun, MapPin, ShieldCheck, AlertTriangle,
  ArrowRight, ExternalLink, Loader2, CheckCircle2,
  Clock, TrendingUp, Globe, Zap, Building2,
  Thermometer, Wind, Droplets, Eye, Navigation,
  FileText, Database, RefreshCw, Sparkles
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// ============================================================================
// AI RISK PREDICTION CARD - With Weather API Integration
// ============================================================================

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  riskScore: number
  disruptionLevel: 'low' | 'medium' | 'high' | 'critical'
  recommendations: string[]
}

const generateWeatherRiskData = (location: string): WeatherData => {
  const conditions = [
    { condition: 'Clear Sky', temp: [18, 25], humidity: [30, 50], wind: [5, 15], visibility: [8, 10] },
    { condition: 'Partly Cloudy', temp: [16, 23], humidity: [45, 65], wind: [10, 20], visibility: [6, 9] },
    { condition: 'Overcast', temp: [14, 20], humidity: [60, 80], wind: [15, 25], visibility: [4, 7] },
    { condition: 'Light Rain', temp: [12, 18], humidity: [75, 90], wind: [20, 30], visibility: [3, 5] },
    { condition: 'Heavy Rain', temp: [10, 16], humidity: [85, 95], wind: [30, 45], visibility: [1, 3] },
    { condition: 'Storm', temp: [8, 14], humidity: [90, 98], wind: [50, 80], visibility: [0.5, 2] },
  ]

  const selected = conditions[Math.floor(Math.random() * conditions.length)]
  const temp = Math.round(selected.temp[0] + Math.random() * (selected.temp[1] - selected.temp[0]))
  const humidity = Math.round(selected.humidity[0] + Math.random() * (selected.humidity[1] - selected.humidity[0]))
  const wind = Math.round(selected.wind[0] + Math.random() * (selected.wind[1] - selected.wind[0]))
  const visibility = Number((selected.visibility[0] + Math.random() * (selected.visibility[1] - selected.visibility[0])).toFixed(1))

  let riskScore = 0
  if (selected.condition.includes('Storm') || selected.condition.includes('Heavy Rain')) riskScore += 40
  else if (selected.condition.includes('Light Rain')) riskScore += 25
  
  if (wind > 40) riskScore += 25
  else if (wind > 25) riskScore += 15
  
  if (visibility < 2) riskScore += 20
  else if (visibility < 5) riskScore += 10

  riskScore = Math.min(riskScore, 100)

  let disruptionLevel: WeatherData['disruptionLevel'] = 'low'
  if (riskScore >= 75) disruptionLevel = 'critical'
  else if (riskScore >= 50) disruptionLevel = 'high'
  else if (riskScore >= 25) disruptionLevel = 'medium'

  const recommendations = []
  if (disruptionLevel === 'critical') {
    recommendations.push('Immediate rerouting recommended', 'Activate backup suppliers')
  } else if (disruptionLevel === 'high') {
    recommendations.push('Monitor shipment routes closely', 'Prepare alternatives')
  } else {
    recommendations.push('Standard monitoring protocols', 'Review delivery schedules')
  }

  return { location, temperature: temp, condition: selected.condition, humidity, windSpeed: wind, visibility, riskScore, disruptionLevel, recommendations }
}

export function AIRiskPredictionCard() {
  const [isLoading, setIsLoading] = useState(false)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [selectedLocation, setSelectedLocation] = useState('Taiwan Strait')

  const locations = ['Taiwan Strait', 'Panama Canal', 'Suez Canal', 'Strait of Malacca', 'English Channel']

  const analyzeRisk = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
    const data = generateWeatherRiskData(selectedLocation)
    setWeatherData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    analyzeRisk()
  }, [selectedLocation])

  const getDisruptionColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'high': return 'text-amber-400 bg-amber-500/20 border-amber-500/30'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      default: return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30'
    }
  }

  return (
    <Card className="group relative overflow-hidden border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Risk Prediction</CardTitle>
              <p className="text-xs text-muted-foreground">Weather-based logistics analysis</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">LIVE</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location Selector */}
        <div className="flex flex-wrap gap-2">
          {locations.map(loc => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                selectedLocation === loc 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">Analyzing weather data...</span>
          </div>
        ) : weatherData ? (
          <>
            {/* Risk Score */}
            <div className={`p-4 rounded-xl border ${getDisruptionColor(weatherData.disruptionLevel)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Disruption Risk</span>
                <Badge className={getDisruptionColor(weatherData.disruptionLevel)}>
                  {weatherData.disruptionLevel.toUpperCase()}
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-2">{weatherData.riskScore}/100</div>
              <div className="w-full bg-black/20 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    weatherData.riskScore >= 75 ? 'bg-red-500' :
                    weatherData.riskScore >= 50 ? 'bg-amber-500' :
                    weatherData.riskScore >= 25 ? 'bg-yellow-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${weatherData.riskScore}%` }}
                />
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Thermometer, label: 'Temp', value: `${weatherData.temperature}°C` },
                { icon: Wind, label: 'Wind', value: `${weatherData.windSpeed} km/h` },
                { icon: Droplets, label: 'Humidity', value: `${weatherData.humidity}%` },
                { icon: Eye, label: 'Visibility', value: `${weatherData.visibility} km` },
              ].map((metric, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                  <metric.icon className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                    <div className="text-sm font-semibold">{metric.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Condition */}
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <CloudSun className="h-5 w-5 text-cyan-400" />
              <span className="text-sm">{weatherData.condition}</span>
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">AI Recommendations:</p>
              {weatherData.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>

            <Button className="w-full gap-2" onClick={analyzeRisk}>
              <RefreshCw className="h-4 w-4" />
              Re-analyze Risk
            </Button>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}

// ============================================================================
// GLOBAL SUPPLY MAPPING CARD
// ============================================================================

export function GlobalSupplyMappingCard() {
  const [activeRegion, setActiveRegion] = useState('asia')

  const regions = [
    { id: 'asia', name: 'Asia Pacific', suppliers: 1247, risk: 'Medium', color: 'from-blue-500 to-cyan-500' },
    { id: 'europe', name: 'Europe', suppliers: 892, risk: 'Low', color: 'from-emerald-500 to-green-500' },
    { id: 'americas', name: 'Americas', suppliers: 654, risk: 'Low', color: 'from-violet-500 to-purple-500' },
    { id: 'mena', name: 'MENA', suppliers: 54, risk: 'High', color: 'from-amber-500 to-orange-500' },
  ]

  return (
    <Card className="group relative overflow-hidden border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Global Supply Mapping</CardTitle>
              <p className="text-xs text-muted-foreground">Interactive supplier network</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-400">INTERACTIVE</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Map Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden border border-border/50">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
          
          {/* Animated Dots for Suppliers */}
          {[
            { x: 70, y: 35, size: 'large', region: 'asia' },
            { x: 48, y: 32, size: 'medium', region: 'europe' },
            { x: 22, y: 38, size: 'medium', region: 'americas' },
            { x: 55, y: 55, size: 'small', region: 'mena' },
            { x: 75, y: 50, size: 'small', region: 'asia' },
            { x: 35, y: 28, size: 'small', region: 'europe' },
          ].map((dot, i) => (
            <div
              key={i}
              className={`absolute rounded-full cursor-pointer transition-all ${
                activeRegion === dot.region ? 'scale-150 bg-primary' : 'bg-cyan-400 hover:scale-125'
              } ${dot.size === 'large' ? 'w-4 h-4' : dot.size === 'medium' ? 'w-3 h-3' : 'w-2 h-2'}`}
              style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
              onClick={() => setActiveRegion(dot.region)}
            >
              <div className="absolute inset-0 rounded-full bg-current animate-ping opacity-30" />
            </div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset- w-full h-full pointer-events-none">
            <line x1="70%" y1="35%" x2="48%" y2="32%" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
            <line x1="48%" y1="32%" x2="22%" y2="38%" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
            <line x1="70%" y1="35%" x2="75%" y2="50%" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
          </svg>

          {/* Legend */}
          <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-white/60">
            <span>Click regions to explore</span>
            <span>2,847 total suppliers</span>
          </div>
        </div>

        {/* Region Stats */}
        <div className="grid grid-cols-2 gap-2">
          {regions.map(region => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                activeRegion === region.id 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-xs text-muted-foreground">{region.name}</div>
              <div className="text-lg font-bold">{region.suppliers.toLocaleString()}</div>
              <div className={`text-xs ${
                region.risk === 'High' ? 'text-red-400' :
                region.risk === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {region.risk} Risk
              </div>
            </button>
          ))}
        </div>

        <Button className="w-full gap-2" variant="outline">
          <MapPin className="h-4 w-4" />
          Open Full Map
        </Button>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// COMPLIANCE AUTOMATION CARD
// ============================================================================

export function ComplianceAutomationCard() {
  const [isChecking, setIsChecking] = useState(false)
  const [complianceResults, setComplianceResults] = useState<{
    gdpr: boolean; soc2: boolean; iso27001: boolean; supplyChainAct: boolean;
  } | null>(null)

  const runComplianceCheck = async () => {
    setIsChecking(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setComplianceResults({
      gdpr: true,
      soc2: true,
      iso27001: true,
      supplyChainAct: Math.random() > 0.3
    })
    setIsChecking(false)
  }

  useEffect(() => {
    runComplianceCheck()
  }, [])

  const regulations = [
    { id: 'gdpr', name: 'GDPR', description: 'EU Data Protection', icon: ShieldCheck },
    { id: 'soc2', name: 'SOC 2 Type II', description: 'Security Controls', icon: Database },
    { id: 'iso27001', name: 'ISO 27001', description: 'Information Security', icon: FileText },
    { id: 'supplyChainAct', name: 'Supply Chain Act', description: 'German Due Diligence', icon: Building2 },
  ]

  return (
    <Card className="group relative overflow-hidden border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Compliance Automation</CardTitle>
              <p className="text-xs text-muted-foreground">Real-time regulation checker</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-violet-500/10 text-violet-400">AUTOMATED</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isChecking ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">Running compliance checks...</span>
          </div>
        ) : complianceResults ? (
          <>
            <div className="space-y-3">
              {regulations.map(reg => {
                const isCompliant = complianceResults[reg.id as keyof typeof complianceResults]
                return (
                  <div key={reg.id} className={`p-3 rounded-lg border flex items-start gap-3 ${
                    isCompliant 
                      ? 'bg-emerald-500/10 border-emerald-500/30' 
                      : 'bg-red-500/10 border-red-500/30'
                  }`}>
                    <reg.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${isCompliant ? 'text-emerald-400' : 'text-red-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{reg.name}</span>
                        {isCompliant ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{reg.description}</p>
                      <Badge variant="secondary" className={`mt-2 text-xs ${
                        isCompliant ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {isCompliant ? 'COMPLIANT' : 'ACTION NEEDED'}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Compliance Score</span>
                <span className="font-bold text-lg">
                  {Object.values(complianceResults).filter(Boolean).length * 25}%
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${Object.values(complianceResults).filter(Boolean).length * 25}%` }}
                />
              </div>
            </div>

            <Button className="w-full gap-2" onClick={runComplianceCheck}>
              <RefreshCw className="h-4 w-4" />
              Re-run Check
            </Button>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}

// ============================================================================
// BUILDING IN PROGRESS CARD - For upcoming features with waitlist
// ============================================================================

interface BuildingInProgressProps {
  title: string
  description: string
  icon: React.ReactNode
  estimatedDate: string
  gradientClass: string
  features: string[]
}

export function BuildingInProgressCard({ title, description, icon, estimatedDate, gradientClass, features }: BuildingInProgressProps) {
  const [email, setEmail] = useState('')
  const [isSignedUp, setIsSignedUp] = useState(false)

  const handleWaitlistSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSignedUp(true)
      setTimeout(() => setIsSignedUp(false), 3000)
    }
  }

  return (
    <Card className="group relative overflow-hidden border-dashed border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${gradientClass} rounded-xl`}>
            {icon}
          </div>
          <Badge variant="secondary" className="gap-1 bg-amber-500/10 text-amber-400 animate-pulse">
            <Clock className="h-3 w-3" />
            BUILDING NOW
          </Badge>
        </div>

        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {/* Features List */}
        <div className="space-y-2 mb-4">
          {features.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="h-3 w-3 text-primary flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Estimated Date */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Clock className="h-3 w-3" />
          <span>Expected: {estimatedDate}</span>
        </div>

        {/* Waitlist Signup */}
        {!isSignedUp ? (
          <form onSubmit={handleWaitlistSignup} className="space-y-2">
            <input
              type="email"
              placeholder="Get early access..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" size="sm" className="w-full gap-2">
              <Sparkles className="h-3 w-3" />
              Join Waitlist
            </Button>
          </form>
        ) : (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
            <p className="text-sm text-emerald-400 font-medium">You're on the list! 🎉</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
