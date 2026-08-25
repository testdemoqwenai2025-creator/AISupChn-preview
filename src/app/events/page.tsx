'use client'

import React, { useState } from 'react'
import {
  Calendar, MapPin, Clock, Users, Video, Building2,
  ArrowRight, ExternalLink, Mic, Trophy, Globe,
  Ticket, Star, ChevronRight, Briefcase, Sparkles
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageDecorations } from '@/components/page-decorations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Event Types
type EventType = 'webinar' | 'conference' | 'workshop' | 'summit' | 'meetup'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: EventType
  status: 'upcoming' | 'live' | 'past' | 'recording'
  attendees?: number
  speakers?: string[]
  topics?: string[]
  registrationUrl?: string
}

// Upcoming Events & Webinars
const upcomingEvents: Event[] = [
  {
    id: 'evt-001',
    title: 'AI-Powered Supply Chain Risk Management',
    description: 'Learn how Fortune 500 companies are leveraging AI to predict and prevent supply chain disruptions before they happen.',
    date: 'March 15, 2025',
    time: '11:00 AM - 12:30 PM EST',
    location: 'Virtual (Zoom)',
    type: 'webinar',
    status: 'upcoming',
    attendees: 847,
    speakers: ['Dr. Sarah Chen', 'Michael Rodriguez'],
    topics: ['AI/ML', 'Risk Prediction', 'Case Studies'],
    registrationUrl: '#'
  },
  {
    id: 'evt-002',
    title: 'UFLPA Compliance Masterclass',
    description: 'Deep dive into Uyghur Forced Labor Prevention Act compliance requirements and best practices for importers.',
    date: 'March 22, 2025',
    time: '2:00 PM - 4:00 PM EST',
    location: 'Virtual (Teams)',
    type: 'workshop',
    status: 'upcoming',
    attendees: 523,
    speakers: ['Jennifer Walsh, Esq.', 'James Park'],
    topics: ['UFLPA', 'Compliance', 'Legal'],
    registrationUrl: '#'
  },
  {
    id: 'evt-003',
    title: 'Supply Chain Digital Summit 2025',
    description: 'The premier global event for supply chain leaders featuring keynotes, panels, and networking with 2000+ professionals.',
    date: 'April 8-10, 2025',
    time: '9:00 AM - 6:00 PM CDT',
    location: 'Austin Convention Center, Texas',
    type: 'summit',
    status: 'upcoming',
    attendees: 2100,
    speakers: ['Industry Leaders', 'Tech Innovators', 'Policy Makers'],
    topics: ['Digital Transformation', 'AI', 'Sustainability', 'Resilience'],
    registrationUrl: '#'
  },
  {
    id: 'evt-004',
    title: 'EUDR Due Diligence Implementation Workshop',
    description: 'Hands-on workshop for implementing EU Deforestation Regulation due diligence processes in your supply chain.',
    date: 'April 18, 2025',
    time: '10:00 AM - 1:00 PM CET',
    location: 'Virtual + Brussels (Hybrid)',
    type: 'workshop',
    status: 'upcoming',
    attendees: 312,
    speakers: ['Dr. Hans Mueller', 'Marie Dubois'],
    topics: ['EUDR', 'Due Diligence', 'Sustainability'],
    registrationUrl: '#'
  },
  {
    id: 'evt-005',
    title: 'Gartner Supply Chain Symposium',
    description: 'Join us at Gartner\'s flagship supply chain event where we\'ll be showcasing our latest AI innovations.',
    date: 'June 2-4, 2025',
    time: 'All Day',
    location: 'Orlando, Florida',
    type: 'conference',
    status: 'upcoming',
    attendees: 3500,
    speakers: ['Gartner Analysts', 'Enterprise Leaders'],
    topics: ['Strategy', 'Technology', 'Innovation'],
    registrationUrl: '#'
  },
  {
    id: 'evt-006',
    title: 'Monthly Product Update: Q1 2025 Release',
    description: 'Discover new features including enhanced SHAP explainability, improved forecasting models, and new integrations.',
    date: 'March 28, 2025',
    time: '12:00 PM - 1:00 PM EST',
    location: 'Virtual (YouTube Live)',
    type: 'webinar',
    status: 'upcoming',
    attendees: 1200,
    speakers: ['Product Team', 'Engineering Leads'],
    topics: ['Product Updates', 'New Features', 'Roadmap'],
    registrationUrl: '#'
  },
]

// Past Events / Recordings
const pastEvents: Event[] = [
  {
    id: 'past-001',
    title: 'CSDDD Preparation Guide for Enterprises',
    description: 'Essential preparation strategies for the Corporate Sustainability Due Diligence Directive.',
    date: 'February 20, 2025',
    time: 'Recording Available',
    location: 'Virtual',
    type: 'webinar',
    status: 'recording',
    attendees: 1156,
    topics: ['CSDDD', 'Sustainability', 'EU Regulation']
  },
  {
    id: 'past-002',
    title: 'Predictive Analytics in Supply Chain',
    description: 'How machine learning is transforming demand forecasting and inventory optimization.',
    date: 'February 8, 2025',
    time: 'Recording Available',
    location: 'Virtual',
    type: 'webinar',
    status: 'recording',
    attendees: 934,
    topics: ['ML/AI', 'Forecasting', 'Analytics']
  },
  {
    id: 'past-003',
    title: 'World Supply Chain Forum 2024',
    description: 'Our keynote presentation on "The Future of AI in Global Supply Chains" at WSCF Dubai.',
    date: 'November 12-14, 2024',
    time: 'Event Concluded',
    location: 'Dubai World Trade Centre',
    type: 'conference',
    status: 'past',
    attendees: 4500,
    topics: ['Keynote', 'Global Trends', 'AI']
  },
]

// Conference Participation
const conferenceParticipation = [
  {
    name: 'Gartner Supply Chain Symposium/Xpo™ 2025',
    location: 'Orlando, FL',
    date: 'June 2-4, 2025',
    role: 'Exhibitor & Speaker',
    booth: 'Booth #412'
  },
  {
    name: 'ISM World 2025',
    location: 'Phoenix, AZ',
    date: 'May 18-21, 2025',
    role: 'Gold Sponsor',
    booth: 'Booth #208'
  },
  {
    name: 'Procurement Excellence Network Summit',
    location: 'London, UK',
    date: 'September 15-17, 2025',
    role: 'Platinum Sponsor & Keynote',
    booth: 'Main Stage'
  },
  {
    name: 'APICS 2025 Conference',
    location: 'Nashville, TN',
    date: 'October 5-8, 2025',
    role: 'Exhibitor',
    booth: 'Booth #156'
  },
]

const getEventTypeConfig = (type: EventType) => {
  switch (type) {
    case 'webinar':
      return { icon: <Video className="h-5 w-5" />, color: 'text-violet-500', bg: 'bg-violet-500/10', label: 'Webinar' }
    case 'conference':
      return { icon: <Building2 className="h-5 w-5" />, color: 'text-cyan-500', bg: 'bg-cyan-500/10', label: 'Conference' }
    case 'workshop':
      return { icon: <Briefcase className="h-5 w-5" />, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Workshop' }
    case 'summit':
      return { icon: <Trophy className="h-5 w-5" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Summit' }
    case 'meetup':
      return { icon: <Users className="h-5 w-5" />, color: 'text-rose-500', bg: 'bg-rose-500/10', label: 'Meetup' }
  }
}

const getStatusBadge = (status: Event['status']) => {
  switch (status) {
    case 'live':
      return <Badge className="bg-rose-500 text-white animate-pulse gap-1"><span className="w-2 h-2 rounded-full bg-white" /> Live Now</Badge>
    case 'upcoming':
      return <Badge variant="outline" className="gap-1"><Calendar className="h-3 w-3" /> Upcoming</Badge>
    case 'recording':
      return <Badge variant="secondary" className="gap-1"><Video className="h-3 w-3" /> Recording</Badge>
    case 'past':
      return <Badge variant="secondary">Past Event</Badge>
  }
}

export default function EventsPage() {
  const [filter, setFilter] = useState<EventType | 'all'>('all')

  const filteredEvents = filter === 'all' ? upcomingEvents : upcomingEvents.filter(e => e.type === filter)

  return (
    <div className="min-h-screen bg-background relative">
      <PageDecorations theme="default" variant="subtle" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 gap-2">
              <Calendar className="h-4 w-4" />
              Events & Learning
            </Badge>

            <h1 className="text-5xl font-bold mb-6">
              Events, Webinars &{' '}
              <span className="gradient-text">Conferences</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join our community of supply chain professionals. Learn from experts,
              discover best practices, and connect with industry leaders.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { value: '50+', label: 'Events Yearly', icon: Calendar },
                { value: '25K+', label: 'Attendees', icon: Users },
                { value: '100+', label: 'Expert Speakers', icon: Mic },
                { value: '15', label: 'Countries', icon: Globe },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-xl px-6 py-4 text-center">
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground mr-2">Filter by:</span>
            {(['all', 'webinar', 'conference', 'workshop', 'summit'] as const).map((type) => (
              <Button
                key={type}
                variant={filter === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(type)}
                className="capitalize"
              >
                {type === 'all' ? 'All Events' : type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Upcoming Events
              </h2>
              <p className="text-muted-foreground mt-1">{filteredEvents.length} events found</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const typeConfig = getEventTypeConfig(event.type)
              return (
                <Card key={event.id} className="group glass hover:scale-[1.02] transition-all cursor-pointer overflow-hidden">
                  {/* Event Type Header */}
                  <div className={`p-4 flex items-center justify-between ${typeConfig.bg}`}>
                    <div className={`flex items-center gap-2 ${typeConfig.color}`}>
                      {typeConfig.icon}
                      <span className="font-medium text-sm">{typeConfig.label}</span>
                    </div>
                    {getStatusBadge(event.status)}
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {event.attendees && (
                      <div className="flex items-center gap-2 text-sm pt-2 border-t">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{event.attendees.toLocaleString()} registered</span>
                      </div>
                    )}

                    {event.topics && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {event.topics.map((topic, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{topic}</Badge>
                        ))}
                      </div>
                    )}

                    <Button className="w-full mt-4 gap-2" size="sm">
                      {event.status === 'recording' ? (
                        <>
                          <Video className="h-4 w-4" /> Watch Recording
                        </>
                      ) : (
                        <>
                          <Ticket className="h-4 w-4" /> Register Now
                        </>
                      )}
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Past Events / Recordings */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            Past Events & Recordings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event) => {
              const typeConfig = getEventTypeConfig(event.type)
              return (
                <Card key={event.id} className="glass hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 ${typeConfig.color}`}>
                        {typeConfig.icon}
                        <span className="text-sm font-medium">{typeConfig.label}</span>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>

                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>

                    {event.attendees && (
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-muted-foreground">{event.attendees.toLocaleString()} attended</span>
                        <Button variant="ghost" size="sm" className="gap-1 text-xs">
                          <ExternalLink className="h-3 w-3" /> Watch
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Conference Participation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Globe className="h-4 w-4" /> Global Presence
            </Badge>
            <h2 className="text-3xl font-bold">Conference Participation</h2>
            <p className="text-muted-foreground mt-2">Meet us at these upcoming industry events</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {conferenceParticipation.map((conf, idx) => (
              <Card key={idx} className="glass group hover:scale-[1.01] transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{conf.name}</h3>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{conf.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{conf.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">{conf.role}</Badge>
                        <Badge variant="secondary" className="text-xs">{conf.booth}</Badge>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="glass p-10">
            <Mic className="h-14 w-14 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter to receive updates about upcoming events,
              webinars, and industry insights directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="gap-2">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
