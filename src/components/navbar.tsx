'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Shield, LogIn, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Shield className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg">AI Supply Chain</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard.html" className="text-sm hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/command-center.html" className="text-sm hover:text-primary transition-colors">
              Command Center
            </Link>
            <Link href="/subscription.html" className="text-sm hover:text-primary transition-colors">
              Pricing
            </Link>
            <Button size="sm" variant="outline" className="gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <Link href="/dashboard.html" className="text-sm py-2 hover:text-primary">
                Dashboard
              </Link>
              <Link href="/command-center.html" className="text-sm py-2 hover:text-primary">
                Command Center
              </Link>
              <Link href="/subscription.html" className="text-sm py-2 hover:text-primary">
                Pricing
              </Link>
              <Button size="sm" variant="outline" className="w-full gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
