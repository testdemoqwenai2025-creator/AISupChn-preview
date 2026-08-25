'use client'

import React, { useState, useEffect } from 'react'
import { Newspaper, ExternalLink, Clock, TrendingUp, AlertTriangle, Globe, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface NewsItem {
  id: string
  title: string
  source: string
  time: string
  category: 'risk' | 'market' | 'technology' | 'regulation'
  summary: string
  impact: 'high' | 'medium' | 'low'
}

const generateNewsData = (): NewsItem[] => [
  {
    id: '1',
    title: 'Taiwan Strait Tensions Impact Semiconductor Supply Chains',
    source: 'Reuters',
    time: '2 hours ago',
    category: 'risk',
    summary: 'Geopolitical tensions in the Taiwan Strait are causing major tech companies to reassess their supplier networks and consider diversification strategies.',
    impact: 'high'
  },
  {
    id: '2',
    title: 'New EU Supply Chain Due Diligence Law Takes Effect',
    source: 'Bloomberg',
    time: '5 hours ago',
    category: 'regulation',
    summary: 'Companies must now conduct thorough due diligence on their supply chains or face significant penalties under the new European Union regulations.',
    impact: 'high'
  },
  {
    id: '3',
    title: 'AI-Powered Demand Forecasting Reduces Inventory Costs by 23%',
    source: 'WSJ',
    time: '8 hours ago',
    category: 'technology',
    summary: 'Major retailers report significant cost savings after implementing machine learning algorithms for demand prediction and inventory optimization.',
    impact: 'medium'
  },
  {
    id: '4',
    title: 'Panama Canal Drought Forces Shipping Route Changes',
    source: 'Financial Times',
    time: '12 hours ago',
    category: 'risk',
    summary: 'Ongoing drought conditions continue to affect canal operations, forcing logistics companies to seek alternative routes and adjust delivery timelines.',
    impact: 'high'
  },
  {
    id: '5',
    title: 'Global Container Rates Stabilize After Volatile Q2',
    source: 'Journal of Commerce',
    time: '1 day ago',
    category: 'market',
    summary: 'Shipping rates show signs of stabilization as capacity increases and demand normalizes following the post-pandemic surge.',
    impact: 'medium'
  },
]

export function EnhancedNewsIntelligenceFeed() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    // Simulate RSS feed fetch
    setTimeout(() => {
      setNews(generateNewsData())
      setIsLoading(false)
    }, 1000)
  }, [])

  const categories = [
    { id: 'all', label: 'All News' },
    { id: 'risk', label: 'Risk Alerts' },
    { id: 'market', label: 'Market' },
    { id: 'technology', label: 'Technology' },
    { id: 'regulation', label: 'Regulation' },
  ]

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'risk': return 'bg-red-500/10 text-red-400 border-red-500/30'
      case 'market': return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      case 'technology': return 'bg-violet-500/10 text-violet-400 border-violet-500/30'
      case 'regulation': return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high': return <Badge className="bg-red-500/20 text-red-400">High Impact</Badge>
      case 'medium': return <Badge className="bg-amber-500/20 text-amber-400">Medium</Badge>
      default: return <Badge variant="secondary">Low</Badge>
    }
  }

  const refreshFeed = () => {
    setIsLoading(true)
    setTimeout(() => {
      setNews(generateNewsData())
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 gap-2">
            <Newspaper className="h-4 w-4 text-primary" />
            Real-Time Intelligence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Supply Chain News & Risk Alerts
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Aggregated intelligence from Reuters, Bloomberg, WSJ, and industry sources.
            Stay ahead of disruptions with AI-curated news feeds.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 border border-border hover:border-primary/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <Button variant="ghost" size="sm" onClick={refreshFeed} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-muted rounded w-full mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredNews.map(item => (
              <Card key={item.id} className="group hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors leading-tight">
                          {item.title}
                        </h3>
                        {getImpactBadge(item.impact)}
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{item.summary}</p>

                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className={`px-2 py-1 rounded-full border text-xs ${getCategoryColor(item.category)}`}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Newspaper className="h-3.5 w-3.5" />
                          {item.source}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {item.time}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <Button variant="outline" size="sm" className="gap-2 flex-shrink-0">
                      <ExternalLink className="h-4 w-4" />
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="inline-block glass border-primary/30">
            <CardContent className="p-8">
              <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Need Deeper Intelligence?</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Upgrade to Professional for real-time alerts, custom feeds, and AI-powered risk analysis
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="gap-2">
                  Upgrade to Pro
                  <TrendingUp className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  View All Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Simpler version for embedding
export function NewsIntelligenceFeed() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Latest Supply Chain Intelligence</h2>
          <p className="text-muted-foreground">Real-time updates from global sources</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className={
                    i === 1 ? 'bg-red-500/10 text-red-400' :
                    i === 2 ? 'bg-blue-500/10 text-blue-400' : 
                    'bg-violet-500/10 text-violet-400'
                  }>
                    {i === 1 ? 'Risk Alert' : i === 2 ? 'Market Update' : 'Technology'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{i * 2}h ago</span>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">
                  {i === 1 ? 'Supply chain disruption detected in Asia Pacific region' :
                   i === 2 ? 'Global shipping rates show stabilization trends' :
                   'New AI tools revolutionize demand forecasting'}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Latest intelligence from industry sources about emerging risks and opportunities...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
