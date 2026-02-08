"use client";

import { Shield, Users, Globe2, Building, Vote, DollarSign, Brain, BarChart3, Activity, Server, Database, Zap, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const systemStats = [
  { label: "Total Users", value: "2,547,823", icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: "+12.5%" },
  { label: "Active Societies", value: "52,340", icon: Building, color: "text-green-600", bg: "bg-green-50", change: "+8.3%" },
  { label: "Votes Cast", value: "15.2M", icon: Vote, color: "text-purple-600", bg: "bg-purple-50", change: "+45.1%" },
  { label: "Funds Tracked", value: "$2.1B", icon: DollarSign, color: "text-orange-600", bg: "bg-orange-50", change: "+22.7%" },
];

const systemHealth = [
  { name: "API Server", status: "Healthy", uptime: "99.97%", icon: Server },
  { name: "Database", status: "Healthy", uptime: "99.99%", icon: Database },
  { name: "AI Service", status: "Healthy", uptime: "99.95%", icon: Brain },
  { name: "Blockchain", status: "Healthy", uptime: "100%", icon: Shield },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Platform Super Admin</h1>
          <p className="text-muted-foreground">G.A.I.G.S. System Administration</p>
        </div>
        <Badge className="bg-red-100 text-red-800 py-1 px-3"><Shield className="w-4 h-4 mr-1" /> Super Admin</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bg}`}><stat.icon className={`w-5 h-5 ${stat.color}`} /></div>
                <span className="text-xs text-green-600 flex items-center"><TrendingUp className="w-3 h-3 mr-1" />{stat.change}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">System Health</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {systemHealth.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <s.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{s.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Uptime: {s.uptime}</span>
                  <Badge variant="success">{s.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Platform Metrics</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Daily Active Users", value: 125000, max: 200000 },
              { label: "API Requests (24h)", value: 4500000, max: 5000000 },
              { label: "Storage Used", value: 340, max: 500 },
              { label: "Bandwidth (GB)", value: 120, max: 200 },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{m.label}</span>
                  <span className="text-muted-foreground">{m.value.toLocaleString()} / {m.max.toLocaleString()}</span>
                </div>
                <Progress value={(m.value / m.max) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "User Management", href: "/admin/users", icon: Users },
          { label: "Platform Analytics", href: "/admin/analytics", icon: BarChart3 },
          { label: "System Settings", href: "/admin/settings", icon: Zap },
          { label: "AI Monitoring", href: "/admin/analytics", icon: Brain },
        ].map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <action.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium">{action.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
