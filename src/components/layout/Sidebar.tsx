"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Wallet,
  Vote,
  ShoppingBag,
  Building2,
  Brain,
  Bell,
  Settings,
  Globe2,
  Users,
  BarChart3,
  Building,
  MapPin,
  FileText,
  DollarSign,
  AlertTriangle,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const userMenuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Groups & Teams", href: "/teams", icon: Users },
  { label: "Feed", href: "/feed", icon: MessageSquare },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Voting", href: "/voting", icon: Vote },
  { label: "Services", href: "/services", icon: ShoppingBag },
  { label: "Business", href: "/business", icon: Building2 },
  { label: "AI Assistant", href: "/ai-assistant", icon: Brain },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

const societyMenuItems = [
  { label: "Society Dashboard", href: "/society", icon: Building },
  { label: "Browse by Location", href: "/society/browse", icon: MapPin },
  { label: "Join Requests", href: "/society/join-requests", icon: Users },
  { label: "Members", href: "/society/members", icon: Users },
  { label: "Society Voting", href: "/society/voting", icon: Vote },
  { label: "Funds", href: "/society/funds", icon: DollarSign },
  { label: "Projects", href: "/society/projects", icon: FileText },
  { label: "Announcements", href: "/society/announcements", icon: Bell },
];

const cityMenuItems = [
  { label: "City Dashboard", href: "/city", icon: MapPin },
  { label: "Societies", href: "/city/societies", icon: Building },
  { label: "City Projects", href: "/city/projects", icon: FileText },
  { label: "City Budget", href: "/city/budget", icon: DollarSign },
  { label: "City Analytics", href: "/city/analytics", icon: BarChart3 },
];

const countryMenuItems = [
  { label: "Country Dashboard", href: "/country", icon: Globe2 },
  { label: "Cities", href: "/country/cities", icon: MapPin },
  { label: "Policies", href: "/country/policies", icon: FileText },
  { label: "National Budget", href: "/country/budget", icon: DollarSign },
  { label: "Analytics", href: "/country/analytics", icon: BarChart3 },
];

const globalMenuItems = [
  { label: "Global Dashboard", href: "/global", icon: Globe2 },
  { label: "Countries", href: "/global/countries", icon: MapPin },
  { label: "Global Issues", href: "/global/issues", icon: AlertTriangle },
  { label: "Donations", href: "/global/donations", icon: DollarSign },
  { label: "Global Analytics", href: "/global/analytics", icon: BarChart3 },
];

const adminMenuItems = [
  { label: "System Admin", href: "/admin", icon: Shield },
  { label: "User Management", href: "/admin/users", icon: Users },
  { label: "Platform Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "System Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  const renderMenuSection = (
    title: string,
    items: typeof userMenuItems
  ) => (
    <div className="mb-4">
      {isOpen && (
        <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn("flex-shrink-0", isOpen ? "w-4 h-4" : "w-5 h-5")} />
                {isOpen && <span>{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b">
        {isOpen ? (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold gradient-text">G.A.I.G.S.</span>
          </Link>
        ) : (
          <Link href="/" className="mx-auto">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-white" />
            </div>
          </Link>
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 z-50 h-6 w-6 rounded-full border bg-background shadow-sm"
        onClick={toggle}
      >
        {isOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </Button>

      {/* Menu */}
      <ScrollArea className="h-[calc(100vh-4rem)] py-4 px-2">
        {renderMenuSection("Main", userMenuItems)}
        <Separator className="my-3" />
        {renderMenuSection("Society", societyMenuItems)}
        <Separator className="my-3" />
        {renderMenuSection("City", cityMenuItems)}
        <Separator className="my-3" />
        {renderMenuSection("Country", countryMenuItems)}
        <Separator className="my-3" />
        {renderMenuSection("Global", globalMenuItems)}
        <Separator className="my-3" />
        {renderMenuSection("Admin", adminMenuItems)}
      </ScrollArea>
    </aside>
  );
}
