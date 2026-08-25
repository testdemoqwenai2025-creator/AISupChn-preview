"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Shield, LayoutDashboard, Command, Cpu, Brain,
  Calendar, Building2, Users, LifeBuoy, Info,
  LogIn, Rocket, MessageSquare, Bot, Menu, X
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const mainNavItems = [
    { href: '/', label: 'Home', icon: Shield },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/command-center', label: 'Command Center', icon: Command },
  ]

  const productNavItems = [
    { href: '/platform', label: 'Platform', icon: Cpu },
    { href: '/intelligence', label: 'AI/ML Engine', icon: Brain },
    { href: '/product', label: 'Product Suite', icon: Shield },
  ]

  const companyNavItems = [
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/industries', label: 'Industries', icon: Building2 },
    { href: '/customers', label: 'Customers', icon: Users },
    { href: '/support', label: 'Support', icon: LifeBuoy },
    { href: '/about', label: 'About', icon: Info },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="relative">
                <Shield className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-bold text-lg hidden sm:block">AI Supply Chain</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Main Nav */}
              {mainNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`gap-2 ${isActive ? '' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )
              })}

              {/* Divider */}
              <div className="w-px h-6 bg-border mx-2" />

              {/* Product Dropdown */}
              <div className="relative group">
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                  Product
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </Button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="glass rounded-xl border shadow-xl p-2 mt-1">
                    {productNavItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link key={item.href} href={item.href} className="block">
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            size="sm"
                            className={`w-full justify-start gap-2 ${isActive ? '' : 'text-muted-foreground hover:text-foreground'}`}
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Company Dropdown */}
              <div className="relative group">
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                  Company
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </Button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="glass rounded-xl border shadow-xl p-2 mt-1">
                    {companyNavItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link key={item.href} href={item.href} className="block">
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            size="sm"
                            className={`w-full justify-start gap-2 ${isActive ? '' : 'text-muted-foreground hover:text-foreground'}`}
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Login Button */}
              <Button variant="ghost" size="sm" className="hidden md:flex gap-1.5">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>

              {/* Get Started Button */}
              <Button size="sm" className="hidden sm:flex gap-1.5 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90">
                <Rocket className="h-4 w-4" />
                <span>Get Started</span>
              </Button>

              {/* Contact Button */}
              <Button variant="outline" size="sm" className="hidden lg:flex gap-1.5">
                <MessageSquare className="h-4 w-4" />
                <span>Contact</span>
              </Button>

              {/* AI Agent Chat Button */}
              <Button 
                size="sm" 
                onClick={() => setChatOpen(true)}
                className="gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              >
                <Bot className="h-4 w-4" />
                <span className="hidden xl:inline">AI Expert</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t py-4 space-y-2 max-h-[80vh] overflow-y-auto">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Main</p>
                {[...mainNavItems, ...productNavItems].map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start gap-2 ${isActive ? '' : 'text-muted-foreground'}`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
              </div>
              
              <div className="space-y-1 pt-2 border-t">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Company</p>
                {companyNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={`w-full justify-start gap-2 ${isActive ? '' : 'text-muted-foreground'}`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t px-3">
                <Button variant="outline" className="w-full gap-2"><LogIn className="h-4 w-4" />Login</Button>
                <Button className="w-full gap-2"><Rocket className="h-4 w-4" />Get Started</Button>
                <Button variant="outline" className="w-full gap-2"><MessageSquare className="h-4 w-4" />Contact</Button>
                <Button 
                  variant="secondary" 
                  className="w-full gap-2 bg-violet-600 hover:bg-violet-700"
                  onClick={() => {setChatOpen(true); setMobileMenuOpen(false)}}
                >
                  <Bot className="h-4 w-4" />Supply Chain AI Expert
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* AI Agent Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-[100] w-96 h-[500px] glass rounded-2xl shadow-2xl border flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-violet-600 to-purple-600 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">Supply Chain Expert</div>
                <div className="text-xs text-white/80">AI Assistant • Online</div>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="glass rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                <p className="text-sm">Hello! I'm your Supply Chain AI Expert. I can help you with:</p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Risk assessment & mitigation</li>
                  <li>• Supplier evaluation</li>
                  <li>• Compliance guidance</li>
                  <li>• Demand forecasting</li>
                </ul>
                <p className="text-sm mt-2">How can I assist you today?</p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask about supply chain risks..."
                className="flex-1 px-4 py-2 rounded-xl bg-muted border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              <Button size="icon" className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
