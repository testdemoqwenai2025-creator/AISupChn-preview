'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'

export default function Page() {
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

        <div className="glass rounded-2xl p-8 border border-primary/20 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 capitalize">$page</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This page is being built. Check back soon for updates!
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/dashboard.html">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                Go to Dashboard
              </button>
            </Link>
            <Link href="/subscription.html">
              <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10">
                View Plans
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
