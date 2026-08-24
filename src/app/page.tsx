'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Shield, Activity, Brain, LineChart, AlertTriangle, CheckCircle2, 
  Search, Filter, TrendingUp, TrendingDown, Minus, Eye, MessageSquare,
  BarChart3, PieChart, Zap, Globe, Lock, Bot, Users, Target,
  ArrowRight, Play, Pause, RefreshCw, Download, Settings, Bell,
  ChevronRight, ChevronDown, ChevronUp, Star, Clock, MapPin, Building2,
  Package, Truck, Factory, Database, Cpu, Wifi, Radio, Mail, Phone,
  Send, X, Plus, Edit3, Trash2, Save, Calendar, FileText, Scale,
  Gavel, ClipboardCheck, Fingerprint, ShieldCheck, AlertCircle,
  Info, ExternalLink, Maximize2, Minimize2, HelpCircle, UserCheck,
  Building, MapPinned, CreditCard, DollarSign, Percent, Hash,
  Link2, Unlock, LockKeyhole, BadgeCheck, Certificate, Award,
  Thermometer, Droplets, Leaf, Recycle, Wind, Sun, Battery,
  WifiOff, Server, Cloud, CloudRain, Snowflake, Flame,
  Heart, Stethoscope, Pill, Syringe, TestTubes, Microscope,
  Car, Plane, Ship, Train, Bike, Rocket,
  Coffee, Wheat, Apple, Fish, Beef, Milk, Egg,
  Shirt, Gem, Hammer, Wrench, Paintbrush,
  BookOpen, GraduationCap, Briefcase, Handshake,
  ChevronLeft, MoreVertical, Copy, Share2, Printer,
  Upload, FolderOpen, Archive, Tag, Tags,
  Camera, Mic, Video, FileUp, Image,
  Key, EyeOff, UserPlus, UserMinus,
  ThumbsUp, ThumbsDown, Flag, Bookmark,
  RefreshCccw, RotateCcw, History, Clock4,
  LayoutGrid, List, Kanban, Table2,
  ScanLine, Radar, Satellite, Telescope,
  GitBranch, Merge, Fork, PullRequest,
  Terminal, Code, Brackets, FileCode,
  Layers, Box, PackageOpen, ShoppingCart,
  Receipt, Invoice, Calculator, Abacus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'
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
// TYPES (Simplified for file size)
// ============================================

interface Supplier {
  id: string; name: string; region: string; tier: number;
  riskScore: number; riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  category: string; onTimeDelivery: number; financialHealth: number;
  complianceScore: number; trend: 'up' | 'down' | 'stable';
  legalName: string; registrationNumber: string; taxId: string;
  foundedDate: string; companyType: string; address: string;
  city: string; country: string; postalCode: string;
  contactName: string; contactEmail: string; contactPhone: string;
  annualRevenue: number; employeeCount: number; creditRating: string;
  status: 'active' | 'inactive' | 'under-review' | 'suspended';
}

interface RiskAlert {
  id: string; severity: 'critical' | 'high' | 'medium' | 'low';
  supplier: string; category: string; title: string;
  message: string; timestamp: Date; acknowledged: boolean;
  status: string; probability: number; confidence: number;
  impact: string; mitigationActions: Array<{action: string; owner: string; dueDate: string; status: string}>;
}

interface DemandForecast {
  id: string; product: string; sku: string; period: string;
  actual: number | null; forecast: number; lowerBound: number; upperBound: number;
  confidence: number; trend: string; anomaly?: string;
}

interface ComplianceItem {
  framework: string; acronym: string; score: number;
  status: 'compliant' | 'partial' | 'non-compliant'; lastAudit: string;
  nextAudit: string; requirements: Array<{title: string; status: string; severity: string}>;
  upcomingDeadlines: Array<{date: string; requirement: string; priority: string}>;
}

interface ChatMessage {
  id: string; role: 'user' | 'assistant'; content: string; timestamp: Date;
}

// ============================================
// MOCK DATA
// ============================================

const suppliersData: Supplier[] = [
  { id: 'SUP-001', name: 'TechComponents Ltd', region: 'Taiwan', tier: 1, riskScore: 12, riskLevel: 'LOW', category: 'Semiconductors', onTimeDelivery: 98.5, financialHealth: 92, complianceScore: 95, trend: 'stable', legalName: 'TechComponents International Ltd', registrationNumber: 'TW-2020-08847', taxId: 'TW-987654321', foundedDate: '2015-03-15', companyType: 'Public Ltd', address: '123 Science Park Road', city: 'Hsinchu', country: 'Taiwan', postalCode: '30093', contactName: 'David Chen', contactEmail: 'david.chen@techcomp.com', contactPhone: '+886-3-567-8901', annualRevenue: 850000000, employeeCount: 4500, creditRating: 'A+', status: 'active' },
  { id: 'SUP-002', name: 'GlobalLogistics Corp', region: 'Singapore', tier: 1, riskScore: 28, riskLevel: 'MEDIUM', category: 'Logistics', onTimeDelivery: 94.2, financialHealth: 88, complianceScore: 91, trend: 'up', legalName: 'Global Logistics Pte Ltd', registrationNumber: 'SG-202109456H', taxId: 'SG-987654321X', foundedDate: '2008-07-22', companyType: 'Private Ltd', address: '500 HarbourFront Ave', city: 'Singapore', country: 'Singapore', postalCode: '098543', contactName: 'Rachel Tan', contactEmail: 'rachel.tan@globallog.com', contactPhone: '+65-6234-5678', annualRevenue: 320000000, employeeCount: 2800, creditRating: 'A', status: 'active' },
  { id: 'SUP-003', name: 'PrecisionParts Vietnam', region: 'Vietnam', tier: 2, riskScore: 45, riskLevel: 'MEDIUM', category: 'Manufacturing', onTimeDelivery: 89.7, financialHealth: 75, complianceScore: 82, trend: 'down', legalName: 'Precision Parts VN JSC', registrationNumber: 'VN-0100345678', taxId: 'VN-010034567-001', foundedDate: '2018-09-10', companyType: 'Joint Stock', address: 'Lot B3 VSIP II', city: 'Binh Duong', country: 'Vietnam', postalCode: '700000', contactName: 'Nguyen Van Minh', contactEmail: 'minh.nguyen@precision.vn', contactPhone: '+84-274-222-8888', annualRevenue: 45000000, employeeCount: 850, creditRating: 'BBB+', status: 'active' },
  { id: 'SUP-004', name: 'Shanghai Electronics', region: 'China', tier: 1, riskScore: 67, riskLevel: 'HIGH', category: 'Electronics', onTimeDelivery: 82.3, financialHealth: 68, complianceScore: 71, trend: 'down', legalName: 'Shanghai Electronics Co Ltd', registrationNumber: 'SH-310115002345678', taxId: '91310115MA1K2L3M4N', foundedDate: '2010-05-20', companyType: 'LLC', address: '88 Zhangjiang High Tech Park', city: 'Shanghai', country: 'China', postalCode: '201203', contactName: 'Li Wei', contactEmail: 'li.wei@shanghaielec.cn', contactPhone: '+86-21-5876-5432', annualRevenue: 180000000, employeeCount: 5200, creditRating: 'BBB', status: 'under-review' },
  { id: 'SUP-005', name: 'EuroMaterials GmbH', region: 'Germany', tier: 1, riskScore: 8, riskLevel: 'LOW', category: 'Raw Materials', onTimeDelivery: 99.1, financialHealth: 96, complianceScore: 98, trend: 'stable', legalName: 'EuroMaterials GmbH', registrationNumber: 'DE-HRB-123456', taxId: 'DE-123456789', foundedDate: '1995-04-12', companyType: 'GmbH', address: 'Industriestraße 42', city: 'Stuttgart', country: 'Germany', postalCode: '70499', contactName: 'Dr. Hans Mueller', contactEmail: 'hans.mueller@euromat.de', contactPhone: '+49-711-987-6543', annualRevenue: 420000000, employeeCount: 3200, creditRating: 'AAA', status: 'active' }
]

const alertsData: RiskAlert[] = [
  { id: 'ALT-001', severity: 'critical', supplier: 'Shanghai Electronics', category: 'Compliance', title: 'UFLPA Review Required', message: 'Incomplete traceability documentation for Xinjiang-sourced materials', timestamp: new Date(Date.now() - 1000 * 60 * 5), acknowledged: false, status: 'open', probability: 85, confidence: 92, impact: '$2.5M inventory at risk, production stoppage possible', mitigationActions: [{action: 'Request full traceability docs', owner: 'Amy Chen', dueDate: '2025-03-20', status: 'pending'}, {action: 'Engage UFLPA auditor', owner: 'Legal', dueDate: '2025-03-25', status: 'pending'}] },
  { id: 'ALT-002', severity: 'high', supplier: 'PrecisionParts Vietnam', category: 'Operational', title: 'Capacity Constraints', message: 'Lead time increased 45% due to capacity issues at 91% utilization', timestamp: new Date(Date.now() - 1000 * 60 * 23), acknowledged: false, status: 'investigating', probability: 75, confidence: 88, impact: '$180K revenue impact if unresolved in 4 weeks', mitigationActions: [{action: 'Emergency supplier meeting', owner: 'Amy Chen', dueDate: '2025-03-17', status: 'in-progress'}] },
  { id: 'ALT-003', severity: 'high', supplier: 'GlobalLogistics Corp', category: 'Geopolitical', title: 'New EU Trade Regulations', message: 'New customs requirements affecting Singapore-EU routes effective April 1', timestamp: new Date(Date.now() - 1000 * 60 * 45), acknowledged: true, status: 'mitigating', probability: 95, confidence: 98, impact: '2-3 day delay on EU shipments, €15-25 additional cost/shipment', mitigationActions: [{action: 'Update shipping templates', owner: 'GlobalLogistics', dueDate: '2025-03-20', status: 'completed'}] },
  { id: 'ALT-004', severity: 'medium', supplier: 'BrazilMetals SA', category: 'Environmental', title: 'EUDR Documentation Pending', message: 'EUDR compliance deadline in 14 days - documentation missing', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), acknowledged: false, status: 'open', probability: 60, confidence: 85, impact: 'Potential shipment rejection at EU customs ($450K value)', mitigationActions: [] },
  { id: 'ALT-005', severity: 'medium', supplier: 'IndiaTech Solutions', category: 'Cybersecurity', title: 'Outdated Encryption Protocols', message: 'TLS 1.0/1.1 detected in legacy systems - security audit finding', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), acknowledged: true, status: 'investigating', probability: 35, confidence: 90, impact: 'Data breach risk, PCI-DSS compliance issue', mitigationActions: [] },
  { id: 'ALT-006', severity: 'low', supplier: 'MexicoAssembly Inc', category: 'Quality', title: 'Minor Quality Deviation', message: 'Dimensional tolerance deviation in batch #4521 (±0.02mm)', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), acknowledged: true, status: 'resolved', probability: 15, confidence: 95, impact: 'Minor rework $2,200, no production impact', mitigationActions: [] }
]

const forecastData: DemandForecast[] = [
  { id: 'DF-001', product: 'TC-7000 Series MCU', sku: 'TC-MCU-7000', period: 'W12', actual: 12500, forecast: 12100, lowerBound: 11200, upperBound: 13000, confidence: 89, trend: 'increasing' },
  { id: 'DF-002', product: 'TC-8000 Memory Module', sku: 'TC-MEM-8000', period: 'W12', actual: 3800, forecast: 3950, lowerBound: 3600, upperBound: 4300, confidence: 87, trend: 'stable' },
  { id: 'DF-003', product: 'Aluminum Housing PP-100', sku: 'PP-AH-100', period: 'W12', actual: 18500, forecast: 18200, lowerBound: 17000, upperBound: 19400, confidence: 92, trend: 'increasing' },
  { id: 'DF-004', product: 'EuroPoly EM-100', sku: 'EP-POLY-100', period: 'March', actual: 420, forecast: 435, lowerBound: 400, upperBound: 470, confidence: 94, trend: 'stable' },
  { id: 'DF-005', product: 'PCBA Assembly SE-500', sku: 'SE-PCBA-500', period: 'W12', actual: null, forecast: 8500, lowerBound: 7200, upperBound: 9800, confidence: 78, trend: 'volatile', anomaly: 'High uncertainty due to China trade situation' }
]

const complianceData: ComplianceItem[] = [
  { framework: 'Uyghur Forced Labor Prevention Act', acronym: 'UFLPA', score: 94, status: 'compliant', lastAudit: '2025-02-15', nextAudit: '2025-08-15', requirements: [
    {title: 'Supply Chain Traceability', status: 'compliant', severity: 'mandatory'},
    {title: 'Forced Labor Attestation', status: 'compliant', severity: 'mandatory'},
    {title: 'Xinjiang Region Exclusion', status: 'partial', severity: 'mandatory'},
    {title: 'CBP Entry Documentation', status: 'compliant', severity: 'required'}
  ], upcomingDeadlines: [
    {date: '2025-04-15', requirement: 'Tier 2 traceability completion', priority: 'high'},
    {date: '2025-06-30', requirement: 'Annual recertification', priority: 'medium'}
  ]},
  { framework: 'EU Deforestation Regulation', acronym: 'EUDR', score: 87, status: 'partial', lastAudit: '2025-01-20', nextAudit: '2026-01-20', requirements: [
    {title: 'Geolocation Data Collection', status: 'compliant', severity: 'mandatory'},
    {title: 'Due Diligence Statement', status: 'compliant', severity: 'mandatory'},
    {title: 'Deforestation-Free Certification', status: 'compliant', severity: 'mandatory'},
    {title: 'Risk Assessment', status: 'partial', severity: 'required'}
  ], upcomingDeadlines: [
    {date: '2025-04-30', requirement: 'Complex product assessment', priority: 'high'},
    {date: '2025-12-29', requirement: 'Operator compliance deadline', priority: 'high'}
  ]},
  { framework: 'CSDDD', acronym: 'CSDDD', score: 91, status: 'compliant', lastAudit: '2025-01-28', nextAudit: '2026-01-28', requirements: [
    {title: 'Human Rights Due Diligence', status: 'compliant', severity: 'mandatory'},
    {title: 'Environmental Due Diligence', status: 'compliant', severity: 'mandatory'},
    {title: 'Climate Transition Plan', status: 'partial', severity: 'required'},
    {title: 'Stakeholder Engagement', status: 'compliant', severity: 'required'}
  ], upcomingDeadlines: [
    {date: '2025-06-30', requirement: 'Climate plan adoption', priority: 'high'}
  ]},
  { framework: 'SOX', acronym: 'SOX', score: 98, status: 'compliant', lastAudit: '2025-03-01', nextAudit: '2025-06-01', requirements: [
    {title: 'CEO/CFO Certification', status: 'compliant', severity: 'mandatory'},
    {title: 'Internal Control (404)', status: 'compliant', severity: 'mandatory'},
    {title: 'Real-Time Disclosure', status: 'compliant', severity: 'required'},
    {title: 'Whistleblower Protection', status: 'compliant', severity: 'required'}
  ], upcomingDeadlines: []},
  { framework: 'GDPR', acronym: 'GDPR', score: 96, status: 'compliant', lastAudit: '2025-02-10', nextAudit: '2025-05-10', requirements: [
    {title: 'Lawful Basis Documentation', status: 'compliant', severity: 'mandatory'},
    {title: 'Data Subject Rights', status: 'compliant', severity: 'mandatory'},
    {title: 'DPIA Process', status: 'compliant', severity: 'required'},
    {title: 'Breach Notification (72hr)', status: 'compliant', severity: 'mandatory'},
    {title: 'International Transfers', status: 'compliant', severity: 'required'}
  ], upcomingDeadlines: []},
  { framework: 'REACH', acronym: 'REACH', score: 89, status: 'partial', lastAudit: '2025-03-05', nextAudit: '2026-03-05', requirements: [
    {title: 'Substance Registration', status: 'compliant', severity: 'mandatory'},
    {title: 'SVHC Communication', status: 'compliant', severity: 'required'},
    {title: 'Authorization Process', status: 'compliant', severity: 'mandatory'},
    {title: 'Restriction Compliance', status: 'partial', severity: 'mandatory'}
  ], upcomingDeadlines: [
    {date: '2025-05-28', requirement: 'Restriction gap closure', priority: 'high'}
  ]}
]

const riskTrendData = Array.from({length: 12}, (_, i) => ({
  date: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  score: 30 + Math.random() * 20,
  threshold: 60
}))

const regionRiskData = [
  {region: 'Asia-Pacific', value: 42, critical: 18, high: 45, medium: 52},
  {region: 'Europe', value: 18, critical: 5, high: 18, medium: 32},
  {region: 'North America', value: 12, critical: 2, high: 10, medium: 22},
  {region: 'Latin America', value: 18, critical: 4, high: 12, medium: 18}
]

// ============================================
// REUSABLE COMPONENTS
// ============================================

function ExpandableText({ content, maxLength = 150 }: { content: string; maxLength?: number }) {
  const [expanded, setExpanded] = useState(false)
  if (content.length <= maxLength) return <span className="text-sm">{content}</span>
  return (
    <span className="text-sm">
      {!expanded ? `${content.substring(0, maxLength)}...` : content}
      <button onClick={() => setExpanded(!expanded)} className="ml-1 text-primary hover:underline text-xs font-medium">
        {expanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  )
}

function AccordionSection({ title, children, defaultOpen = false, icon, badge }: {title: string; children: React.ReactNode; defaultOpen?: boolean; icon?: React.ReactNode; badge?: string}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors text-left">
        <div className="flex items-center gap-2">
          {icon}<span className="font-medium text-sm">{title}</span>
          {badge && <Badge variant="outline" className="text-xs">{badge}</Badge>}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="p-4 border-t bg-muted/20">{children}</div>}
    </div>
  )
}

function FieldLabel({ label, required, tooltip }: {label: string; required?: boolean; tooltip?: string}) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <Label className="text-sm font-medium">{label}{required && <span className="text-destructive ml-0.5">*</span>}</Label>
      {tooltip && <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help" title={tooltip} />}
    </div>
  )
}

function ChatWidget({ context, title }: {context: string; title: string}) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {id: '1', role: 'assistant', content: `Hello! I'm your ${title} AI assistant. How can I help?`, timestamp: new Date()}
  ])
  const [input, setInput] = useState('')
  
  const sendMsg = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, {id: String(Date.now()), role: 'user', content: input, timestamp: new Date()}])
    setTimeout(() => {
      setMessages(prev => [...prev, {id: String(Date.now()+1), role: 'assistant', content: `Regarding "${input}": I can help analyze data, generate reports, or provide recommendations. What would you like to explore?`, timestamp: new Date()}])
    }, 600)
    setInput('')
  }
  
  return (
    <>
      <Button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-lg bg-primary text-primary-foreground">
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </Button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-96 glass rounded-xl shadow-2xl overflow-hidden flex flex-col" style={{height: '480px'}}>
          <div className="p-4 border-b bg-gradient-to-r from-emerald-500/10 to-cyan-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Bot className="w-5 h-5 text-primary" /><div><h4 className="font-semibold text-sm">{title}</h4><p className="text-xs text-muted-foreground">AI Assistant</p></div></div>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="h-8 w-8 p-0"><X className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{m.content}</div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <div className="flex gap-2"><Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Ask me anything..." /><Button onClick={sendMsg} size="icon" disabled={!input.trim()}><Send className="w-4 h-4" /></Button></div>
          </div>
        </div>
      )}
    </>
  )
}

function QuickContact({ section }: {section: string}) {
  const [show, setShow] = useState(false)
  const emails: Record<string, string> = {'supply-directory': 'supplier.mgmt@company.com', 'risk-intelligence': 'risk.team@company.com', 'demand-forecasting': 'demand.plan@company.com', 'compliance': 'compliance@company.com'}
  return (
    <>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogTrigger asChild><Button variant="outline" size="sm" className="gap-1.5"><Mail className="w-3.5 h-3.5" />Email</Button></DialogTrigger>
        <DialogContent><DialogHeader><DialogTitle>Contact Team</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <FieldLabel label="To" required /><Input defaultValue={emails[section] || 'support@company.com'} readOnly className="bg-muted" />
            <FieldLabel label="Subject" required /><Input />
            <FieldLabel label="Message" required /><Textarea rows={4} placeholder="Your message..." />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShow(false)}>Cancel</Button>
            <Button onClick={() => setShow(false)}><Send className="w-4 h-4 mr-2" />Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button variant="outline" size="sm" className="gap-1.5"><Phone className="w-3.5 h-3.5" />Call</Button>
    </>
  )
}

function StatusBadge({ status}: {status: string}) {
  const colors: Record<string, string> = {active: 'default', inactive: 'secondary', 'under-review': 'outline', suspended: 'destructive', compliant: 'default', 'non-compliant': 'destructive', partial: 'outline', open: 'destructive', investigating: 'outline', mitigating: 'default', resolved: 'secondary'}
  return <Badge variant={(colors[status] as any) || 'secondary'} className="capitalize">{status.replace(/-/g, ' ')}</Badge>
}

function SeverityBadge({severity}: {severity: string}) {
  const colors: Record<string, string> = {critical: 'bg-red-500 text-white', high: 'bg-orange-500 text-white', medium: 'bg-yellow-500 text-black', low: 'bg-blue-500 text-white'}
  return <Badge className={`${colors[severity]} capitalize`}>{severity}</Badge>
}

function RiskGauge({score, level}: {score: number; level: string}) {
  const colors: Record<string, string> = {LOW: 'text-emerald-500', MEDIUM: 'text-yellow-500', HIGH: 'text-orange-500'}
  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-bold ${colors[level] || 'text-gray-500'}`}>{level}</span>
      <Progress value={score} className="w-16 h-1.5" />
      <span className="text-xs text-muted-foreground">{score}%</span>
    </div>
  )
}

// ============================================
// PORTAL COMPONENTS
// ============================================

function SupplyDirectoryPortal() {
  const [search, setSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState('all')
  const [tierFilter, setTierFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const [selected, setSelected] = useState<Supplier | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const { toast } = useToast()
  
  const filtered = suppliersData.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
    const matchRegion = regionFilter === 'all' || s.region === regionFilter
    const matchTier = tierFilter === 'all' || s.tier.toString() === tierFilter
    const matchRisk = riskFilter === 'all' || s.riskLevel === riskFilter
    return matchSearch && matchRegion && matchTier && matchRisk
  })
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Building2 className="w-7 h-7 text-primary" />Supply Directory</h2>
        <p className="text-muted-foreground mt-1">Complete supplier profiles with risk metrics & compliance</p></div>
        <div className="flex items-center gap-2"><QuickContact section="supply-directory" /><Button onClick={() => setShowAddForm(true)} className="gap-1"><Plus className="w-4 h-4" />Add Supplier</Button></div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {[{l: 'Total', v: suppliersData.length, i: Building2, c: 'text-blue-500'}, {l: 'Active', v: suppliersData.filter(s=>s.status==='active').length, i: CheckCircle2, c: 'text-emerald-500'}, {l: 'Under Review', v: suppliersData.filter(s=>s.status==='under-review').length, i: AlertTriangle, c: 'text-yellow-500'}, {l: 'High Risk', v: suppliersData.filter(s=>s.riskLevel==='HIGH').length, i: Shield, c: 'text-red-500'}, {l: 'Avg Risk', v: Math.round(suppliersData.reduce((a,s)=>a+s.riskScore,0)/suppliersData.length)+'%', i: Activity, c: 'text-orange-500'}, {l: 'Tier 1', v: suppliersData.filter(s=>s.tier===1).length, i: Star, c: 'text-violet-500'}].map((s,i) => (<Card key={i} className="p-3"><div className="flex items-center gap-2 mb-1"><s.i className={`w-4 h-4 ${s.c}`} /><span className="text-xs text-muted-foreground">{s.l}</span></div><p className="text-xl font-bold">{s.v}</p></Card>))}</div>
      
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search suppliers..." value={search} onChange={e=>setSearch(e.target.value)} className="pl-10" /></div>
          <Select value={regionFilter} onValueChange={setRegionFilter}><SelectTrigger className="w-40"><SelectValue placeholder="Region"/></SelectTrigger><SelectContent>{['all','Asia-Pacific','Europe','North America','Latin America'].map(r=><SelectItem key={r} value={r}>{r==='all'?'All Regions':r}</SelectItem>)}</SelectContent></Select>
          <Select value={tierFilter} onValueChange={setTierFilter}><SelectTrigger className="w-32"><SelectValue placeholder="Tier"/></SelectTrigger><SelectContent>{['all','1','2','3','4'].map(t=><SelectItem key={t} value={t}>{t==='all'?'All Tiers':`Tier ${t}`}</SelectItem>)}</SelectContent></Select>
          <Select value={riskFilter} onValueChange={setRiskFilter}><SelectTrigger className="w-36"><SelectValue placeholder="Risk"/></SelectTrigger><SelectContent>{['all','LOW','MEDIUM','HIGH'].map(r=><SelectItem key={r} value={r}>{r==='all'?'All Levels':r}</SelectItem>)}</SelectContent></Select>
        </div>
      </Card>
      
      {/* Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Supplier</TableHead><TableHead>ID</TableHead><TableHead>Region</TableHead><TableHead>Tier</TableHead><TableHead>Category</TableHead><TableHead>Risk</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
          <TableBody>{filtered.map(s => (<TableRow key={s.id} className="cursor-pointer hover:bg-accent/50" onClick={()=>setSelected(s)}>
            <TableCell><div><p className="font-medium">{s.name}</p><p className="text-xs text-muted-foreground">{s.category}</p></div></TableCell>
            <TableCell><code className="text-xs bg-muted px-1.5 py-0.5 rounded">{s.id}</code></TableCell>
            <TableCell><div className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-muted-foreground"/>{s.region}</div></TableCell>
            <TableCell><Badge variant={s.tier===1?'default':'secondary'}>Tier {s.tier}</Badge></TableCell>
            <TableCell className="text-sm">{s.category}</TableCell>
            <TableCell><RiskGauge score={s.riskScore} level={s.riskLevel}/></TableCell>
            <TableCell><StatusBadge status={s.status}/></TableCell>
            <TableCell><div className="flex gap-1" onClick={e=>e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4"/></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Mail className="w-4 h-4"/></Button>
            </div></TableCell>
          </TableRow>))}</TableBody>
        </Table>
      </Card>
      
      {/* Detail Sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selected && (<>
            <SheetHeader><SheetTitle className="flex items-center gap-2"><Building2 className="w-5 h-5"/>{selected.name}</SheetTitle>
            <SheetDescription>{selected.legalName} • ID: {selected.id}</SheetDescription></SheetHeader>
            
            <div className="mt-6 space-y-4">
              <AccordionSection title="Overview & Risk Metrics" defaultOpen icon={<BarChart3 className="w-4 h-4"/>} badge={`${selected.riskLevel} RISK`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Key Metrics</p>
                    <div className="space-y-1.5 text-sm"><div className="flex justify-between"><span>Risk Score</span><RiskGauge score={selected.riskScore} level={selected.riskLevel}/></div>
                    <div className="flex justify-between"><span>On-Time Delivery</span><span className="font-medium">{selected.onTimeDelivery}%</span></div>
                    <div className="flex justify-between"><span>Financial Health</span><span className="font-medium">{selected.financialHealth}/100</span></div>
                    <div className="flex justify-between"><span>Compliance Score</span><span className="font-medium">{selected.complianceScore}/100</span></div>
                    <div className="flex justify-between"><span>Trend</span><Badge variant={selected.trend==='up'?'default':selected.trend==='down'?'destructive':'secondary'} className="text-xs">{selected.trend}</Badge></div></div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Company Details</p>
                    <div className="space-y-1.5 text-sm"><div className="flex justify-between"><span>Type</span><span>{selected.companyType}</span></div>
                    <div className="flex justify-between"><span>Founded</span><span>{selected.foundedDate}</span></div>
                    <div className="flex justify-between"><span>Employees</span><span>{selected.employeeCount.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Revenue</span><span>${(selected.annualRevenue/1e6).toFixed(0)}M</span></div>
                    <div className="flex justify-between"><span>Credit Rating</span><span className="font-medium">{selected.creditRating}</span></div></div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium flex items-center gap-2 mb-2"><Brain className="w-4 h-4 text-primary"/>AI Risk Factors</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span>Geopolitical Exposure ({selected.region})</span><Badge variant="outline" className="text-xs">{selected.region==='China'?'High':'Low'}</Badge></div>
                    <div className="flex justify-between"><span>Financial Stability</span><Badge variant={selected.financialHealth>80?'default':'destructive'} className="text-xs">{selected.financialHealth>80?'Strong':'Weak'}</Badge></div>
                    <div className="flex justify-between"><span>Concentration Risk</span><Badge variant="outline" className="text-xs">Medium</Badge></div>
                  </div>
                </div>
              </AccordionSection>
              
              <AccordionSection title="Contact Information" icon={<Users className="w-4 h-4"/>}>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-sm">{selected.contactName}</p>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <p><Mail className="w-3 h-3 inline mr-1"/><a href={`mailto:${selected.contactEmail}`} className="text-primary hover:underline">{selected.contactEmail}</a></p>
                      <p><Phone className="w-3 h-3 inline mr-1"/>{selected.contactPhone}</p>
                      <p><MapPin className="w-3 h-3 inline mr-1"/>{selected.address}, {selected.city}, {selected.country} {selected.postalCode}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <QuickContact section="supply-directory"/>
                    <Button variant="outline" size="sm" className="gap-1"><ExternalLink className="w-3.5 h-3.5"/>Website</Button>
                  </div>
                </div>
              </AccordionSection>
              
              <AccordionSection title="Compliance & Certifications" icon={<ShieldCheck className="w-4 h-4"/>} badge={`${selected.complianceScore}%`}>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {['ISO 9001:2015','ISO 14001:2015','IATF 16949','SOC 2 Type II','ISO 27001'].map(cert => (
                      <div key={cert} className="flex items-center gap-2 p-2 border rounded"><CheckCircle2 className="w-4 h-4 text-emerald-500"/><span className="text-sm">{cert}</span></div>
                    ))}
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <p className="text-sm font-medium mb-2">Regulatory Frameworks</p>
                    <div className="flex flex-wrap gap-1">
                      {['UFLPA ✅','EUDR ✅','CSDDD ✅','GDPR ✅','REACH ⚠️','SOX ✅'].map(f => (
                        <Badge key={f} variant={f.includes('⚠️')?'outline':'default'} className="text-xs">{f}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionSection>
              
              <AccordionSection title="Relationship & Financial" icon={<DollarSign className="w-4 h-4"/>}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-muted/50 rounded"><p className="text-muted-foreground">Annual Revenue</p><p className="text-lg font-bold">${(selected.annualRevenue/1e6).toFixed(0)}M USD</p></div>
                  <div className="p-3 bg-muted/50 rounded"><p className="text-muted-foreground">Employee Count</p><p className="text-lg font-bold">{selected.employeeCount.toLocaleString()}</p></div>
                  <div className="p-3 bg-muted/50 rounded"><p className="text-muted-foreground">Credit Rating</p><p className="text-lg font-bold">{selected.creditRating}</p></div>
                  <div className="p-3 bg-muted/50 rounded"><p className="text-muted-foreground">Registration #</p><p className="text-sm font-mono">{selected.registrationNumber}</p></div>
                </div>
              </AccordionSection>
              
              <AccordionSection title="Notes & Audit Trail" icon={<FileText className="w-4 h-4"/>}>
                <div className="space-y-2">
                  <div className="p-3 border-l-2 border-primary bg-muted/30">
                    <p className="text-sm"><ExpandableText content={`Q3 capacity expansion planned - 20% increase expected. Key contact available M-F 9am-6pm SGT. Strategic supplier for semiconductor components.`} maxLength={100}/></p>
                    <p className="text-xs text-muted-foreground mt-1">Updated: March 10, 2025 by Procurement Team</p>
                  </div>
                </div>
              </AccordionSection>
            </div>
          </>)}
        </SheetContent>
      </Sheet>
      
      {/* Add Supplier Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add New Supplier</DialogTitle><DialogDescription>Complete all required fields (*) marked in red</DialogDescription></DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-primary">Basic Information</h4>
              <div><FieldLabel label="Company Name" required tooltip="Legal business name"/><Input placeholder="Acme Corp"/></div>
              <div><FieldLabel label="Legal Name" required/><Input placeholder="Acme Corporation LLC"/></div>
              <div><FieldLabel label="Registration Number" required/><Input placeholder="Gov registration ID"/></div>
              <div><FieldLabel label="Tax ID/VAT" required/><Input placeholder="Tax identification"/></div>
              <div><FieldLabel label="D-U-N-S Number"/><Input placeholder="Optional - D&B number"/></div>
              <div><FieldLabel label="Company Type" required/>
                <Select><SelectTrigger><SelectValue placeholder="Select type"/></SelectTrigger><SelectContent>
                  {['LLC','Corporation','PLC','GmbH','Joint Stock','Partnership','Sole Proprietorship'].map(t=><SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent></Select></div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-primary">Address & Contact</h4>
              <div><FieldLabel label="Street Address" required/><Input placeholder="123 Main St"/></div>
              <div className="grid grid-cols-2 gap-2"><div><FieldLabel label="City" required/><Input/></div><div><FieldLabel label="Postal Code" required/><Input/></div></div>
              <div><FieldLabel label="Country" required/>
                <Select><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>
                  {['United States','China','Germany','Japan','South Korea','Taiwan','Singapore','Vietnam','India','Mexico','Brazil','UK','Poland','Other'].map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent></Select></div>
              <div><FieldLabel label="Primary Contact Name" required/><Input placeholder="Full name"/></div>
              <div><FieldLabel label="Contact Email" required type="email"/><Input placeholder="email@company.com"/></div>
              <div><FieldLabel label="Contact Phone" required type="tel"/><Input placeholder="+1-234-567-8900"/></div>
            </div>
            <div className="space-y-3 md:col-span-2">
              <h4 className="font-semibold text-sm text-primary">Classification & Financial</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div><FieldLabel label="Supplier Tier" required tooltip="Based on spend volume"/>
                  <Select><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>
                    {['Tier 1 - Strategic','Tier 2 - Approved','Tier 3 - Qualified','Tier 4 - Provisional'].map((t,i)=><SelectItem key={i} value={String(i+1)}>{t}</SelectItem>)}
                  </SelectContent></Select></div>
                <div><FieldLabel label="Category" required/>
                  <Select><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>
                    {['Semiconductors','Electronics','Manufacturing','Raw Materials','Logistics','Software','Packaging','Other'].map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent></Select></div>
                <div><FieldLabel label="Annual Revenue (USD)"/><Input type="number" placeholder="0"/></div>
                <div><FieldLabel label="Employee Count"/><Input type="number" placeholder="0"/></div>
              </div>
              <div><FieldLabel label="Payment Terms"/>
                <Select><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>
                  {['Net 15','Net 30','Net 45','Net 60','Net 90','COD','Other'].map(t=><SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent></Select></div>
              <div><FieldLabel label="Additional Notes"/><Textarea placeholder="Any relevant information about this supplier..." rows={3}/></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={() => {setShowAddForm(false); toast({title: 'Supplier added', description: 'New supplier profile created successfully'})}}><Save className="w-4 h-4 mr-2"/>Save Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ChatWidget context="supply-directory" title="Supply Directory" />
    </div>
  )
}

function RiskIntelligencePortal() {
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null)
  
  const filtered = alertsData.filter(a => {
    const matchSev = filterSeverity === 'all' || a.severity === filterSeverity
    const matchSt = filterStatus === 'all' || a.status === filterStatus
    return matchSev && matchSt
  })
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><AlertTriangle className="w-7 h-7 text-orange-500" />Risk Intelligence</h2>
        <p className="text-muted-foreground mt-1">Real-time risk monitoring, alerting & mitigation tracking</p></div>
        <QuickContact section="risk-intelligence" />
      </div>
      
      {/* Alert Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[{l: 'Critical', v: alertsData.filter(a=>a.severity==='critical').length, c: 'bg-red-500/10 text-red-500 border-red-500/20'},
          {l: 'High', v: alertsData.filter(a=>a.severity==='high').length, c: 'bg-orange-500/10 text-orange-500 border-orange-500/20'},
          {l: 'Medium', v: alertsData.filter(a=>a.severity==='medium').length, c: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'},
          {l: 'Low', v: alertsData.filter(a=>a.severity==='low').length, c: 'bg-blue-500/10 text-blue-500 border-blue-500/20'},
          {l: 'Open', v: alertsData.filter(a=>!a.acknowledged).length, c: 'bg-purple-500/10 text-purple-500 border-purple-500/20'}
        ].map((s,i) => (<Card key={i} className={`p-3 border ${s.c}`}><p className="text-xs opacity-70">{s.l}</p><p className="text-2xl font-bold">{s.v}</p></Card>))}</div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4"><h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4"/>Risk Trend (12 Months)</h3>
          <ResponsiveContainer width="100%" height={200}><RechartsLineChart data={riskTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee"/><XAxis dataKey="date" fontSize={11}/><YAxis domain={[0,100]} fontSize={11}/>
            <Tooltip/><Legend/>
            <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} name="Risk Score %"/>
            <Line type="monotone" dataKey="threshold" stroke="#ef4444" strokeDasharray="5 5" name="Threshold"/>
          </RechartsLineChart></ResponsiveContainer>
        </Card>
        <Card className="p-4"><h3 className="font-semibold mb-4 flex items-center gap-2"><Globe className="w-4 h-4"/>Risk by Region</h3>
          <ResponsiveContainer width="100%" height={200}><RechartsBarChart data={regionRiskData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee"/><XAxis dataKey="region" fontSize={11}/><YAxis fontSize={11}/>
            <Tooltip/><Legend/>
            <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical"/>
            <Bar dataKey="high" stackId="a" fill="#f97316" name="High"/>
            <Bar dataKey="medium" stackId="a" fill="#eab308" name="Medium"/>
          </RechartsBarChart></ResponsiveContainer>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={filterSeverity} onValueChange={setFilterSeverity}><SelectTrigger className="w-40"><SelectValue placeholder="Severity"/></SelectTrigger><SelectContent>{['all','critical','high','medium','low'].map(s=><SelectItem key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</SelectItem>)}</SelectContent></Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}><SelectTrigger className="w-40"><SelectValue placeholder="Status"/></SelectTrigger><SelectContent>{['all','open','investigating','mitigating','resolved'].map(s=><SelectItem key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</SelectItem>)}</SelectContent></Select>
          <div className="flex-1"></div>
          <Button variant="outline" className="gap-1"><RefreshCw className="w-4 h-4"/>Refresh</Button>
        </div>
      </Card>
      
      {/* Alerts List */}
      <div className="space-y-3">
        {filtered.map(alert => (
          <Card key={alert.id} className={`p-4 cursor-pointer transition-all hover:border-primary/50 ${!alert.acknowledged ? 'border-l-4 border-l-red-500' : ''}`} onClick={() => setSelectedAlert(alert)}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <SeverityBadge severity={alert.severity}/>
                  <StatusBadge status={alert.status}/>
                  {!alert.acknowledged && <Badge variant="destructive" className="text-xs">NEW</Badge>}
                </div>
                <h4 className="font-semibold">{alert.title}</h4>
                <p className="text-sm text-muted-foreground mt-1"><ExpandableText content={alert.message} maxLength={120}/></p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Building2 className="w-3 h-3"/>{alert.supplier}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{alert.timestamp.toLocaleString()}</span>
                  <span>Confidence: {alert.confidence}%</span>
                  <span>Probability: {alert.probability}%</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={e => {e.stopPropagation(); setSelectedAlert(alert)}}>Details</Button>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Alert Detail Modal */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedAlert && (<>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><SeverityBadge severity={selectedAlert.severity}/> {selectedAlert.title}</DialogTitle>
              <DialogDescription>{selectedAlert.supplier} • {selectedAlert.category} • {selectedAlert.timestamp.toLocaleString()}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <AccordionSection title="Impact Assessment" defaultOpen icon={<AlertCircle className="w-4 h-4"/>}>
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                  <p className="font-medium text-red-800 dark:text-red-300 mb-2">Business Impact</p>
                  <ExpandableText content={selectedAlert.impact} maxLength={200}/>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-muted/50 rounded"><p className="text-sm text-muted-foreground">Probability</p><p className="text-xl font-bold">{selectedAlert.probability}%</p></div>
                  <div className="p-3 bg-muted/50 rounded"><p className="text-sm text-muted-foreground">Confidence</p><p className="text-xl font-bold">{selectedAlert.confidence}%</p></div>
                </div>
              </AccordionSection>
              
              <AccordionSection title="Mitigation Actions" icon={<ShieldCheck className="w-4 h-4"/>} badge={`${selectedAlert.mitigationActions.length} actions`}>
                <div className="space-y-3">
                  {selectedAlert.mitigationActions.map((ma, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                      <StatusBadge status={ma.status}/>
                      <div className="flex-1"><p className="font-medium text-sm">{ma.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">Owner: {ma.owner} • Due: {ma.dueDate}</p></div>
                    </div>
                  ))}
                  {selectedAlert.mitigationActions.length === 0 && <p className="text-sm text-muted-foreground">No mitigation actions defined yet.</p>}
                  <Button variant="outline" size="sm" className="gap-1"><Plus className="w-4 h-4"/>Add Action</Button>
                </div>
              </AccordionSection>
              
              <AccordionSection title="Communication Log" icon={<MessageSquare className="w-4 h-4"/>}>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-muted/50 rounded"><p className="font-medium">System Generated</p><p className="text-xs text-muted-foreground">Alert created based on AI detection: Regulatory intelligence feed + document analysis</p></div>
                </div>
              </AccordionSection>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedAlert(null)}>Close</Button>
              <Button><Send className="w-4 h-4 mr-2"/>Escalate</Button>
            </DialogFooter>
          </>)}
        </DialogContent>
      </Dialog>
      
      <ChatWidget context="risk-intelligence" title="Risk Intelligence" />
    </div>
  )
}

function DemandForecastingPortal() {
  const [periodFilter, setPeriodFilter] = useState('all')
  const [showScenario, setShowScenario] = useState(false)
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><LineChart className="w-7 h-7 text-cyan-500" />Demand Forecasting</h2>
        <p className="text-muted-foreground mt-1">AI-powered demand prediction with confidence intervals</p></div>
        <div className="flex items-center gap-2"><QuickContact section="demand-forecasting"/><Button variant="outline" className="gap-1" onClick={() => setShowScenario(true)}><Brain className="w-4 h-4"/>Scenarios</Button></div>
      </div>
      
      {/* Forecast Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{l: 'Products Tracked', v: forecastData.length, i: Package, c: 'text-blue-500'},
          {l: 'Avg Confidence', v: Math.round(forecastData.reduce((a,f)=>a+f.confidence,0)/forecastData.length)+'%', i: Target, c: 'text-emerald-500'},
          {l: 'Increasing Trend', v: forecastData.filter(f=>f.trend==='increasing').length, i: TrendingUp, c: 'text-green-500'},
          {l: 'Needs Attention', v: forecastData.filter(f=>f.confidence<80||f.trend==='volatile').length, i: AlertTriangle, c: 'text-orange-500'}
        ].map((s,i) => (<Card key={i} className="p-3"><div className="flex items-center gap-2 mb-1"><s.i className={`w-4 h-4 ${s.c}`}/><span className="text-xs text-muted-foreground">{s.l}</span></div><p className="text-xl font-bold">{s.v}</p></Card>))}</div>
      
      {/* Main Chart */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2"><BarChart3 className="w-4 h-4"/>Demand Forecast vs Actual</h3>
          <Select value={periodFilter} onValueChange={setPeriodFilter}><SelectTrigger className="w-32"><SelectValue/></SelectTrigger><SelectContent>{['all','weekly','monthly'].map(p=><SelectItem key={p} value={p}>{p.charAt(0).toUpperCase()+p.slice(1)}</SelectItem>)}</SelectContent></Select>
        </div>
        <ResponsiveContainer width="100%" height={300}><ComposedChart data={forecastData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee"/><XAxis dataKey="product" fontSize={11} angle={-30} textAnchor="end" height={70}/><YAxis fontSize={11}/>
          <Tooltip formatter={(value: any, name: string) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}/>
          <Legend/>
          <Bar dataKey="actual" fill="#10b981" name="Actual" radius={[4,4,0,0]}/>
          <Bar dataKey="forecast" fill="#3b82f6" name="Forecast" radius={[4,4,0,0]}/>
          <Line type="monotone" dataKey="upperBound" stroke="#f97316" strokeDasharray="5 5" dot={false} name="Upper Bound"/>
          <Line type="monotone" dataKey="lowerBound" stroke="#f97316" strokeDasharray="5 5" dot={false} name="Lower Bound"/>
        </ComposedChart></ResponsiveContainer>
      </Card>
      
      {/* Forecast Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Product</TableHead><TableHead>SKU</TableHead><TableHead>Period</TableHead><TableHead>Actual</TableHead><TableHead>Forecast</TableHead><TableHead>Range</TableHead><TableHead>Confidence</TableHead><TableHead>Trend</TableHead><TableHead>Anomaly</TableHead></TableRow></TableHeader>
          <TableBody>{forecastData.map(f => (
            <TableRow key={f.id}>
              <TableCell className="font-medium">{f.product}</TableCell>
              <TableCell><code className="text-xs bg-muted px-1 py-0.5 rounded">{f.sku}</code></TableCell>
              <TableCell>{f.period}</TableCell>
              <TableCell>{f.actual?.toLocaleString() || '-'}</TableCell>
              <TableCell>{f.forecast.toLocaleString()}</TableCell>
              <TableCell className="text-xs">{f.lowerBound.toLocaleString()} - {f.upperBound.toLocaleString()}</TableCell>
              <TableCell><Progress value={f.confidence} className="w-12 h-1.5"/><span className="ml-1 text-xs">{f.confidence}%</span></TableCell>
              <TableCell><Badge variant={f.trend==='increasing'?'default':f.trend==='volatile'?'destructive':'secondary'} className="text-xs">{f.trend}</Badge></TableCell>
              <TableCell>{f.anomaly ? <Badge variant="outline" className="text-xs text-orange-500">⚠️</Badge> : <CheckCircle2 className="w-4 h-4 text-emerald-500"/>}</TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </Card>
      
      {/* Scenario Planning Dialog */}
      <Dialog open={showScenario} onOpenChange={setShowScenario}>
        <DialogContent><DialogHeader><DialogTitle>Scenario Planning</DialogTitle><DialogDescription>Create what-if scenarios for demand forecasting</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div><FieldLabel label="Scenario Name" required/><Input placeholder="Q4 Surge Scenario"/></div>
            <div className="grid grid-cols-2 gap-3">
              <div><FieldLabel label="Base Product"/><Select><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{forecastData.map(f=><SelectItem key={f.id} value={f.id}>{f.product}</SelectItem>)}</SelectContent></Select></div>
              <div><FieldLabel label="Scenario Type"/><Select><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{['Optimistic','Pessimistic','Disruption','Market Shift','Seasonal Peak'].map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div><FieldLabel label="Assumptions"/><Textarea placeholder="Describe scenario assumptions..." rows={3}/></div>
            <div className="grid grid-cols-2 gap-3">
              <div><FieldLabel label="Demand Adjustment (%)"/><Input type="number" placeholder="+/- percentage"/></div>
              <div><FieldLabel label="Time Horizon"/><Select><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{['30 days','60 days','90 days','6 months','1 year'].map(h=><SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent></Select></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScenario(false)}>Cancel</Button>
            <Button onClick={() => setShowScenario(false)}><Brain className="w-4 h-4 mr-2"/>Run Scenario</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ChatWidget context="demand-forecasting" title="Demand Forecasting" />
    </div>
  )
}

function CompliancePortal() {
  const [selectedFramework, setSelectedFramework] = useState<ComplianceItem | null>(null)
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Scale className="w-7 h-7 text-violet-500" />Compliance Center</h2>
        <p className="text-muted-foreground mt-1">Multi-framework regulatory compliance monitoring</p></div>
        <QuickContact section="compliance" />
      </div>
      
      {/* Framework Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complianceData.map(cf => (
          <Card key={cf.acronym} className={`p-4 cursor-pointer transition-all hover:border-primary/50 ${cf.status==='non-compliant'?'border-red-200 bg-red-50/50':''}`} onClick={() => setSelectedFramework(cf)}>
            <div className="flex items-start justify-between mb-3">
              <div><h3 className="font-bold">{cf.framework}</h3><p className="text-xs text-muted-foreground">{cf.acronym}</p></div>
              <StatusBadge status={cf.status}/>
            </div>
            <div className="mb-3"><div className="flex items-center justify-between text-sm mb-1"><span>Overall Score</span><span className="font-bold">{cf.score}%</span></div><Progress value={cf.score} className="h-2"/></div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>Last Audit: {cf.lastAudit}</div>
              <div>Next: {cf.nextAudit}</div>
            </div>
            {cf.upcomingDeadlines.length > 0 && (
              <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200">
                <p className="text-xs font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>Upcoming Deadline</p>
                <p className="text-xs mt-1">{cf.upcomingDeadlines[0].requirement} ({cf.upcomingDeadlines[0].date})</p>
              </div>
            )}
          </Card>
        ))}
      </div>
      
      {/* Framework Detail */}
      <Sheet open={!!selectedFramework} onOpenChange={() => setSelectedFramework(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedFramework && (<>
            <SheetHeader><SheetTitle className="flex items-center gap-2"><Scale className="w-5 h-5"/>{selectedFramework.framework}</SheetTitle>
            <SheetDescription>{selectedFramework.acronym} • Overall Score: {selectedFramework.score}%</SheetDescription></SheetHeader>
            
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded"><p className="text-sm text-muted-foreground">Last Audit</p><p className="font-medium">{selectedFramework.lastAudit}</p></div>
                <div className="p-3 bg-muted/50 rounded"><p className="text-sm text-muted-foreground">Next Audit</p><p className="font-medium">{selectedFramework.nextAudit}</p></div>
              </div>
              
              <AccordionSection title="Requirements Status" defaultOpen icon={<ClipboardCheck className="w-4 h-4"/>} badge={`${selectedFramework.requirements.length} items`}>
                <div className="space-y-2">
                  {selectedFramework.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1"><p className="font-medium text-sm">{req.title}</p>
                        <p className="text-xs text-muted-foreground">{req.severity}</p></div>
                      <StatusBadge status={req.status}/>
                    </div>
                  ))}
                </div>
              </AccordionSection>
              
              <AccordionSection title="Upcoming Deadlines" icon={<Clock className="w-4 h-4"/>} badge={`${selectedFramework.upcomingDeadlines.length} pending`}>
                <div className="space-y-2">
                  {selectedFramework.upcomingDeadlines.map((d, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200">
                      <div><p className="font-medium text-sm">{d.requirement}</p><p className="text-xs text-muted-foreground">{d.action}</p></div>
                      <Badge variant={d.priority==='high'?'destructive':'outline'}>{d.date}</Badge>
                    </div>
                  ))}
                  {selectedFramework.upcomingDeadlines.length === 0 && <p className="text-sm text-muted-foreground">No upcoming deadlines.</p>}
                </div>
              </AccordionSection>
              
              <AccordionSection title="Audit History" icon={<History className="w-4 h-4"/>}>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-muted/50 rounded"><span>Date: {selectedFramework.lastAudit}</span><Badge>Score: {selectedFramework.score}%</Badge></div>
                </div>
              </AccordionSection>
            </div>
          </>)}
        </SheetContent>
      </Sheet>
      
      {/* Compliance Summary Chart */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><PieChart className="w-4 h-4"/>Compliance Overview</h3>
        <ResponsiveContainer width="100%" height={250}><RechartsPieChart>
          <Pie data={complianceData.map(c=>({name:c.acronym, value:c.score}))} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label={({name, percent}) => `${name} ${(percent*100).toFixed(0)}%`}>
            {complianceData.map((_, idx) => <Cell key={idx} fill={['#10b981','#3b82f6','#8b5cf6','#f59e0b','#ec4899','#06b6d4'][idx]}/>)}
          </Pie>
          <Tooltip/><Legend/>
        </RechartsPieChart></ResponsiveContainer>
      </Card>
      
      <ChatWidget context="compliance" title="Compliance Center" />
    </div>
  )
}

// ============================================
// MAIN COMMAND CENTER COMPONENT
// ============================================

// Particle Background Component
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animId: number
    const particles: Array<{x: number; y: number; size: number; vx: number; vy: number; opacity: number; pulse: number}> = []
    
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    
    for (let i = 0; i < Math.min(Math.floor(window.innerWidth * 0.05), 60); i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3, opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2
      })
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) { p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity + Math.sin(p.pulse) * 0.12})`; ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{opacity: 0.5}} />
}

export default function CommandCenter() {
  const [activeTab, setActiveTab] = useState('supply-directory')
  
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleCanvas />
      
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-sm text-background">SC</div>
              <div>
                <h1 className="font-bold text-lg">Command Center</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">AI Supply Chain Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative"><Bell className="w-5 h-5"/><span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive rounded-full text-[10px] flex items-center justify-center text-white">3</span></Button>
              <Button variant="ghost" size="icon"><Settings className="w-5 h-5"/></Button>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><UserCheck className="w-4 h-4 text-primary"/></div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {label: 'Suppliers Monitored', value: '10,247', icon: Building2, change: '+2.4%'},
            {label: 'Active Alerts', value: '6', icon: AlertTriangle, change: '-12%'},
            {label: 'Avg Compliance', value: '92.5%', icon: ShieldCheck, change: '+1.2%'},
            {label: 'Prediction Accuracy', value: '99.2%', icon: Brain, change: '+0.3%'}
          ].map((stat, i) => (
            <Card key={i} className="p-4 glow-emerald">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-primary"/>
                <Badge variant="outline" className="text-xs text-emerald-500">{stat.change}</Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
        
        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="supply-directory" className="gap-1.5"><Building2 className="w-4 h-4"/>Supply Directory</TabsTrigger>
            <TabsTrigger value="risk-intelligence" className="gap-1.5"><AlertTriangle className="w-4 h-4"/>Risk Intel</TabsTrigger>
            <TabsTrigger value="demand-forecasting" className="gap-1.5"><LineChart className="w-4 h-4"/>Forecasting</TabsTrigger>
            <TabsTrigger value="compliance" className="gap-1.5"><Scale className="w-4 h-4"/>Compliance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="supply-directory"><SupplyDirectoryPortal /></TabsContent>
          <TabsContent value="risk-intelligence"><RiskIntelligencePortal /></TabsContent>
          <TabsContent value="demand-forecasting"><DemandForecastingPortal /></TabsContent>
          <TabsContent value="compliance"><CompliancePortal /></TabsContent>
        </Tabs>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>AI Supply Chain Risk Predictor • Command Center v2.0</p>
          <p className="mt-1">Real-time intelligence • Predictive analytics • Regulatory compliance</p>
        </footer>
      </main>
    </div>
  )
}
