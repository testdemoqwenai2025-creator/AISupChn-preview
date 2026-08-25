'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, FileText, Database, AlertTriangle } from 'lucide-react'
import { Navbar } from '@/components/navbar'

export default function CommandCenterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Command Center</h1>
          <p className="text-lg text-muted-foreground">
            Centralized operations and compliance management
          </p>
        </div>

        {/* Compliance Section */}
        <section id="compliance" className="mb-12 scroll-mt-20">
          <div className="glass rounded-2xl p-6 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Compliance Automation</h2>
                <p className="text-muted-foreground">Real-time regulatory compliance monitoring</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'GDPR Compliance', status: 'Active', score: '98%', color: 'emerald' },
                { title: 'SOC 2 Type II', status: 'Certified', score: '100%', color: 'blue' },
                { title: 'ISO 27001', status: 'Compliant', score: '95%', color: 'violet' },
                { title: 'Supply Chain Act', status: 'Monitoring', score: '92%', color: 'cyan' },
                { title: 'ESG Reporting', status: 'Active', score: '88%', color: 'amber' },
                { title: 'Data Privacy', status: 'Secure', score: '99%', color: 'green' },
              ].map((item, i) => (
                <div key={i} className={`bg-${item.color}-500/10 rounded-lg p-4 border border-${item.color}-500/30`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{item.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-${item.color}-500/20 text-${item.color}-400`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">{item.score}</div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                    <div 
                      className={`bg-${item.color}-400 h-1.5 rounded-full`} 
                      style={{width: item.score}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6 border border-border">
            <FileText className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Generate Reports</h3>
            <p className="text-sm text-muted-foreground mb-4">Create compliance and risk assessment reports</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90">
              Generate Now
            </button>
          </div>

          <div className="glass rounded-xl p-6 border border-border">
            <Database className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Audit Logs</h3>
            <p className="text-sm text-muted-foreground mb-4">View complete audit trail and activity logs</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90">
              View Logs
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
