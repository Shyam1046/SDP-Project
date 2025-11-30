import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  GraduationCap, 
  DollarSign, 
  FileText, 
  BookOpen, 
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Award,
  Calendar,
  CreditCard,
  Receipt,
  TrendingUp,
  PieChart,
  ClipboardList,
  Target,
  Search,
  BookMarked,
  Newspaper,
  Coffee,
  Briefcase,
  Heart
} from 'lucide-react'

const links = [
  { 
    to: '/', 
    label: 'Dashboard', 
    icon: LayoutDashboard 
  },
  { 
    to: '/academics', 
    label: 'Academics', 
    icon: GraduationCap,
    subtopics: [
      { to: '/academics?tab=overview', label: 'Overview', icon: BookOpen },
      { to: '/academics?tab=attendance', label: 'Attendance', icon: UserCheck },
      { to: '/academics?tab=courses', label: 'Course Details', icon: FileText },
      { to: '/academics?tab=performance', label: 'Performance', icon: Award },
      { to: '/academics?tab=schedule', label: 'Schedule', icon: Calendar },
    ]
  },
  { 
    to: '/finance', 
    label: 'Finance', 
    icon: DollarSign,
    subtopics: [
      { to: '/finance?tab=overview', label: 'Overview', icon: PieChart },
      { to: '/finance?tab=fees', label: 'Fee Details', icon: CreditCard },
      { to: '/finance?tab=payments', label: 'Payment History', icon: Receipt },
      { to: '/finance?tab=pending', label: 'Pending Dues', icon: TrendingUp },
      { to: '/finance?tab=receipts', label: 'Receipts', icon: FileText },
    ]
  },
  { 
    to: '/exams', 
    label: 'Exams', 
    icon: FileText,
    subtopics: [
      { to: '/exams?tab=upcoming', label: 'Upcoming Exams', icon: Calendar },
      { to: '/exams?tab=results', label: 'Results', icon: Award },
      { to: '/exams?tab=schedule', label: 'Exam Schedule', icon: ClipboardList },
      { to: '/exams?tab=halltickets', label: 'Hall Tickets', icon: FileText },
      { to: '/exams?tab=grades', label: 'Grade History', icon: TrendingUp },
    ]
  },
  { 
    to: '/library', 
    label: 'Library', 
    icon: BookOpen,
    subtopics: [
      { to: '/library?tab=search', label: 'Search Books', icon: Search },
      { to: '/library?tab=issued', label: 'Issued Books', icon: BookMarked },
      { to: '/library?tab=history', label: 'History', icon: ClipboardList },
      { to: '/library?tab=fines', label: 'Fines', icon: Receipt },
      { to: '/library?tab=ebooks', label: 'E-Resources', icon: Newspaper },
    ]
  },
  { 
    to: '/studentlife', 
    label: 'Student Life', 
    icon: Users,
    subtopics: [
      { to: '/studentlife?tab=clubs', label: 'Clubs & Activities', icon: Users },
      { to: '/studentlife?tab=events', label: 'Events', icon: Calendar },
      { to: '/studentlife?tab=achievements', label: 'Achievements', icon: Award },
      { to: '/studentlife?tab=placements', label: 'Placements', icon: Briefcase },
      { to: '/studentlife?tab=wellness', label: 'Health & Wellness', icon: Heart },
    ]
  },
]

export default function Sidebar() {
  const [open, setOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState({})
  const location = useLocation()

  const toggleExpand = (path) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }))
  }

  // Check if current path matches or is a subtopic
  const isActive = (link) => {
    if (link.subtopics) {
      return location.pathname === link.to || 
             link.subtopics.some(sub => location.pathname + location.search === sub.to)
    }
    return location.pathname === link.to
  }

  // Auto-expand active sections
  React.useEffect(() => {
    links.forEach(link => {
      if (link.subtopics && isActive(link)) {
        setExpandedItems(prev => ({
          ...prev,
          [link.to]: true
        }))
      }
    })
  }, [location.pathname, location.search])

  return (
    <>
      {/* Floating toggle button - visible when sidebar is collapsed */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
        aria-hidden={open}
        className={`fixed left-3 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105 ${
          open ? 'opacity-0 pointer-events-none -translate-x-4' : 'opacity-100'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Sidebar */}
      <aside
        className={`h-screen bg-gradient-to-b from-indigo-600 to-violet-700 text-white transition-all duration-300 flex flex-col shadow-2xl ${
          open ? 'w-64' : 'w-20'
        }`}
        aria-label="Main navigation"
      >
        {/* Header Section */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className={`flex flex-col overflow-hidden transition-all duration-300 ${
              open ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            }`}>
              <h1 className="text-xl font-bold tracking-tight whitespace-nowrap">
                KLU ERP
              </h1>
              <p className="text-xs text-white/80 whitespace-nowrap">
                Student Portal
              </p>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 flex-shrink-0 group"
            >
              {open ? (
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              ) : (
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <ul className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon
              const active = isActive(link)
              const hasSubtopics = link.subtopics && link.subtopics.length > 0
              const isExpanded = expandedItems[link.to]

              return (
                <li key={link.to}>
                  <div className="relative">
                    {/* Main Link */}
                    <div className="flex items-center">
                      <NavLink
                        to={link.to}
                        title={!open ? link.label : undefined}
                        className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                          active 
                            ? 'bg-white/20 shadow-lg backdrop-blur-sm' 
                            : 'hover:bg-white/10'
                        } ${!open ? 'justify-center' : ''}`}
                      >
                        {/* Active indicator */}
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                        )}
                        
                        {/* Icon */}
                        <Icon 
                          className={`w-5 h-5 flex-shrink-0 transition-transform ${
                            !active && 'group-hover:scale-110'
                          }`} 
                        />
                        
                        {/* Label */}
                        <span className={`font-medium transition-all duration-300 whitespace-nowrap ${
                          open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'
                        }`}>
                          {link.label}
                        </span>
                      </NavLink>

                      {/* Expand/Collapse button for items with subtopics */}
                      {hasSubtopics && open && (
                        <button
                          onClick={() => toggleExpand(link.to)}
                          className="p-2 mr-1 hover:bg-white/10 rounded transition-colors"
                          aria-label={isExpanded ? `Collapse ${link.label}` : `Expand ${link.label}`}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Subtopics */}
                    {hasSubtopics && open && isExpanded && (
                      <ul className="mt-1 ml-4 space-y-1 border-l-2 border-white/20 pl-2">
                        {link.subtopics.map((subtopic) => {
                          const SubIcon = subtopic.icon
                          const subActive = location.pathname + location.search === subtopic.to
                          
                          return (
                            <li key={subtopic.to}>
                              <NavLink
                                to={subtopic.to}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                  subActive
                                    ? 'bg-white/15 text-white font-medium shadow-sm'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                              >
                                <SubIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="whitespace-nowrap truncate">{subtopic.label}</span>
                              </NavLink>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t border-white/10 transition-all duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}>
          <p className="text-xs text-white/70 text-center">
            © {new Date().getFullYear()} KLU University
          </p>
        </div>
      </aside>
    </>
  )
}