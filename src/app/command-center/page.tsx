'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Activity, Brain, AlertTriangle, TrendingUp, Globe, CheckCircle2, XCircle, Clock, FileText, Scale, Building2, Lock, RefreshCw, Eye, Download, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'

const complianceRegulations = [
  {
    id: 'gdpr',
    name: 'GDPR',
    fullName: 'General Data Protection Regulation',
    status: 'compliant',
    score: 98,
    lastChecked: '2024-08-25',
    nextReview: '2024-11-25',
    description: 'EU data protection regulation for personal data processing in supply chains',
    requirements: [
      { text: 'Data Processing Agreements', met: true },
      { text: 'Privacy Impact Assessments', met: true },
      { text: 'Data Subject Rights', met: true },
      { text: 'Breach Notification Procedures', met: true },
    ]
  },
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    fullName: 'Service Organization Control 2',
    status: 'compliant',
    score: 96,
    lastChecked: '2024-08-20',
    nextReview: '2025-02-20',
    description: 'Security controls for service organizations handling supplier data',
    requirements: [
      { text: 'Access Controls', met: true },
      { text: 'Encryption Standards', met: true },
      { text: 'Change Management', met: true },
      { text: 'Incident Response', met: true },
    ]
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    fullName: 'Information Security Management',
    status: 'compliant',
    score: 99,
    lastChecked: '2024-08-22',
    nextReview: '2025-02-22',
    description: 'International standard for information security management systems',
    requirements: [
      { text: 'Information Security Policy', met: true },
      { text: 'Asset Management', met: true },
      { text: 'Risk Assessment', met: true },
      { text: 'Business Continuity', met: true },
    ]
  },
  {
    id: 'supplychain',
    name: 'Supply Chain Act',
    fullName: 'German Supply Chain Due Diligence Act',
    status: 'review',
    score: 82,
    lastChecked: '2024-08-18',
    nextReview: '2024-09-18',
    description: 'German law requiring human rights and environmental due diligence',
    requirements: [
      { text: 'Risk Analysis Completed', met: true },
      { text: 'Preventive Measures', met: true },
      { text: 'Grievance Mechanism', met: false },
      { text: 'Documentation & Reporting', met: true },
    ]
  },
  {
    id: 'conflictminerals',
    name: 'Conflict Minerals Rule',
    fullName: 'Dodd-Frank Section 1502',
    status: 'compliant',
    score: 94,
    lastChecked: '2024-08-15',
    nextReview: '2025-01-15',
    description: 'SEC rule requiring disclosure of conflict minerals in supply chain',
    requirements: [
      { text: 'RCOI Conducted', met: true },
      { text: 'Due Diligence Process', met: true },
      { text: 'Supplier Certifications', met: true },
      { text: 'Annual Reporting', met: true },
    ]
  },
  {
    id: 'slavery',
    name: 'Modern Slavery Act',
    fullName: 'UK Modern Slavery Act 2015',
    status: 'compliant',
    score: 97,
    lastChecked: '2024-08-10',
    nextReview: '2025-03-31',
    description: 'UK legislation requiring transparency in supply chains regarding slavery',
    requirements: [
      { text: 'Annual Statement Published', met: true },
      { text: 'Supply Chain Mapping', met: true },
      { text: 'Due Diligence Policies', met: true },
      { text: 'Training Programs', met: true },
    ]
  }
]

const operationalMetrics = [
  { label: 'Suppliers Audited', value: '1,247', target: '1,500', progress: 83 },
  { label: 'Compliance Rate', value: '97.8%', target: '99%', progress: 99 },
  { label: 'Open Findings', value: '12', target: '<5', progress: 42 },
  { label: 'Avg Resolution Time', value: '4.2 days', target: '<7 days', progress: 100 },
]

export default function CommandCenterPage() {
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredRegulations = complianceRegulations.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || reg.status === filterStatus
    return matchesSearch && matchesFilter
  })

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
              <Shield className="h-8 w-8 text-primary" />
              Compliance Command Center
            </h1>
            <p className="text-lg text-muted-foreground">
              Real-time regulatory compliance monitoring and management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Run All Checks
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Operational Metrics */}
        <section id="compliance" className="mb-8 scroll-mt-20">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Operational Overview
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {operationalMetrics.map((metric, i) => (
              <Card key={i} className="hover:border-primary/50 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <Badge variant={metric.progress >= 100 ? "default" : metric.progress >= 80 ? "secondary" : "destructive"} 
                           className={metric.progress >= 100 ? "bg-emerald-500/20 text-emerald-400" : ""}>
                      {metric.progress}%
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">Target: {metric.target}</div>
                  <div className="w-full bg-border rounded-full h-1.5 mt-2">
                    <div 
                      className={`h-1.5 rounded-full transition-all ${
                        metric.progress >= 100 ? 'bg-emerald-500' : 
                        metric.progress >= 80 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(metric.progress, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search regulations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'compliant', 'review'].map(status => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regulations Grid */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Regulatory Framework ({filteredRegulations.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRegulations.map((reg) => (
              <Card 
                key={reg.id}
                className={`cursor-pointer transition-all hover:border-primary/50 ${
                  selectedRegulation === reg.id ? 'ring-2 ring-primary' : ''
                } ${reg.status === 'review' ? 'border-amber-500/30' : ''}`}
                onClick={() => setSelectedRegulation(selectedRegulation === reg.id ? null : reg.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${reg.status === 'compliant' ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                        <Lock className={`h-5 w-5 ${reg.status === 'compliant' ? 'text-emerald-400' : 'text-amber-400'}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{reg.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{reg.fullName}</p>
                      </div>
                    </div>
                    <Badge className={
                      reg.status === 'compliant' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-amber-500/20 text-amber-400'
                    }>
                      {reg.status === 'compliant' ? 'COMPLIANT' : 'REVIEW'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Score */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Compliance Score</span>
                    <span className={`font-bold text-lg ${
                      reg.score >= 95 ? 'text-emerald-400' : 
                      reg.score >= 85 ? 'text-blue-400' : 'text-amber-400'
                    }`}>
                      {reg.score}%
                    </span>
                  </div>

                  {selectedRegulation === reg.id && (
                    <>
                      <p className="text-sm text-muted-foreground">{reg.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Requirements Status:</h4>
                        {reg.requirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            {req.met ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                            )}
                            <span>{req.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                        <span>Last checked: {reg.lastChecked}</span>
                        <span>Next review: {reg.nextReview}</span>
                      </div>

                      <Button size="sm" className="w-full gap-2">
                        <Eye className="h-4 w-4" />
                        View Full Details
                      </Button>
                    </>
                  )}

                  {!selectedRegulation && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last checked: {reg.lastChecked}</span>
                      <Clock className="h-3 w-3" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card className="border-violet-500/20">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-violet-400" />
              <h3 className="font-semibold mb-2">Generate Report</h3>
              <p className="text-sm text-muted-foreground mb-4">Create comprehensive compliance report for stakeholders</p>
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Generate PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/20">
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 mx-auto mb-4 text-cyan-400" />
              <h3 className="font-semibold mb-2">AI Audit Assistant</h3>
              <p className="text-sm text-muted-foreground mb-4">Use AI to identify potential compliance gaps</p>
              <Button variant="outline" className="w-full gap-2">
                <Activity className="h-4 w-4" />
                Start AI Audit
              </Button>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20">
            <CardContent className="p-6 text-center">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-emerald-400" />
              <h3 className="font-semibold mb-2">Supplier Portal</h3>
              <p className="text-sm text-muted-foreground mb-4">Manage supplier certifications and documents</p>
              <Button variant="outline" className="w-full gap-2">
                <Globe className="h-4 w-4" />
                Open Portal
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
