import {
  BarChart3, CalendarCheck, ClipboardList, FileText, FolderOpen, LayoutDashboard, MessageSquare, Settings, UserCircle2, UserPlus, Users,
} from 'lucide-react'

export const app = {
  name: 'StudentHub',
  tagline: 'Student Information System',
  logo: UserCircle2,
  user: { name: 'Ms. Priyanka Sen', role: 'Student Affairs Head' },
  searchPlaceholder: 'Search student, ID, guardian…',
}

// Items with `to` are implemented in this demo; others are locked (full version).
export const nav = [
  {
    title: 'Students',
    items: [
      { label: 'Dashboard', to: '/', icon: LayoutDashboard },
      { label: 'Student Directory', to: '/students', icon: Users },
      { label: 'Student 360° Profile', to: '/profile', icon: UserCircle2 },
    ],
  },
  {
    title: 'Records',
    items: [
      { label: 'Admissions & Enrolment', icon: UserPlus },
      { label: 'Attendance', icon: CalendarCheck },
      { label: 'Academic Records', icon: ClipboardList },
      { label: 'Documents', icon: FolderOpen },
      { label: 'Certificates (TC / Bonafide)', icon: FileText },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Parent Communication', icon: MessageSquare },
      { label: 'Reports', icon: BarChart3 },
      { label: 'Settings', icon: Settings },
    ],
  },
]
