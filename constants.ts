import { LayoutDashboard, Building, Sliders, Bot, ShieldAlert, FileText, Users, Database, Router, Coins, Settings } from 'lucide-react';
import type { Role, Status, AlertSeverity, SubscriptionStatus, Permission } from './types';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';

type NavLink = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  permissions?: Permission[];
};

type NavSection = {
  title?: string;
  links: NavLink[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    links: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Sites & Towers', href: '/sites', icon: Building },
      { name: 'Equipment Control', href: '/control', icon: Sliders, permissions: ['control', 'control_limited'] },
      { name: 'Automation', href: '/automation', icon: Bot, permissions: ['edit_automation'] },
      { name: 'Monitoring & Alerts', href: '/monitoring', icon: ShieldAlert },
      { name: 'Reports', href: '/reports', icon: FileText },
    ],
  },
  {
    title: 'Admin',
    links: [
      { name: 'User Management', href: '/admin/users', icon: Users, permissions: ['edit_users'] },
      { name: 'Data Manager', href: '/admin/data-manager', icon: Database, permissions: ['manage_data'] },
      { name: 'IoT Configuration', href: '/admin/iot-config', icon: Router, permissions: ['manage_data'] },
      { name: 'Configurations', href: '/admin/configurations', icon: Settings, permissions: ['manage_data'] },
      { name: 'Billing & Costs', href: '/admin/billing', icon: Coins, permissions: ['manage_data'] },
    ],
  },
];

export const STATUS_COLORS: { [key in Status]: string } = {
  ON: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-500/20',
  OFF: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-500/20',
  FAULT: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 border-rose-500/20',
  OK: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 border-sky-500/20',
};

export const ROLE_COLORS: Record<Role, string> = {
  admin: 'bg-purple-600/80 text-white',
  operator: 'bg-blue-600/80 text-white',
  technician: 'bg-amber-600/80 text-white',
  viewer: 'bg-slate-600/80 text-white',
};

export const SEVERITY_COLORS: { [key in AlertSeverity]: { bg: string, text: string } } = {
    high: { bg: 'bg-rose-100 dark:bg-rose-500/20', text: 'text-rose-700 dark:text-rose-300' },
    medium: { bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-300' },
    low: { bg: 'bg-sky-100 dark:bg-sky-500/20', text: 'text-sky-700 dark:text-sky-300' },
};

export const SUBSCRIPTION_STATUS_COLORS: { [key in SubscriptionStatus]: string } = {
  Active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300',
  Expired: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300',
  Upcoming: 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300',
  Inactive: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
};


export const ROLE_PERMISSIONS_DEFAULT: Record<Role, Permission[]> = {
    admin: ['control', 'edit_users', 'edit_automation', 'manage_data'],
    operator: ['control', 'edit_automation'],
    technician: ['control_limited'],
    viewer: [],
};

export const ALL_PERMISSIONS: { id: Permission, label: string, description: string }[] = [
    { 
        id: 'control', 
        label: 'Full Equipment Control', 
        description: 'Allows turning equipment ON and OFF.' 
    },
    { 
        id: 'control_limited', 
        label: 'Limited Equipment Control', 
        description: 'Allows basic operations but may restrict critical equipment.' 
    },
    { 
        id: 'edit_automation', 
        label: 'Manage Automations & Alerts', 
        description: 'Allows creating, editing, and deleting automation rules and alert triggers.' 
    },
    { 
        id: 'edit_users', 
        label: 'User Management', 
        description: 'Allows creating, editing, and deleting users and managing their roles.' 
    },
    { 
        id: 'manage_data', 
        label: 'Data Manager Access', 
        description: 'Allows access to the data manager for adding/editing sites, towers, and equipment.' 
    },
];


export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_CODE = 'INR';

export const EQUIPMENT_CATEGORIES: Record<string, { label: string, types: string[] }> = {
    power: { label: 'Power Systems', types: ['dg', 'ups', 'transformer'] },
    water: { label: 'Water Systems', types: ['stp_pump', 'wtp_pump', 'water_flow_meter', 'rain_water_meter', 'pump', 'swimming_pool_pump', 'booster_pump', 'sump_pump'] },
    building: { label: 'Building Systems', types: ['lift', 'fire_panel'] },
    lighting: { label: 'Lighting', types: ['lighting_circuit', 'light'] },
    hvac: { label: 'HVAC', types: ['hvac'] },
    other: { label: 'Other', types: ['meter', 'valve', 'panel', 'sensor', 'other'] }
};