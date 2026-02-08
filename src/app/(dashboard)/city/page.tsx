"use client";

import { MapPin, Building, Users, DollarSign, Vote, FileText, TrendingUp, Brain, BarChart3, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const cityStats = [
  { label: "Societies", value: "45", icon: Building, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Citizens", value: "125K", icon: Users, color: "text-green-600", bg: "bg-green-50" },
  { label: "City Fund", value: "$2.3M", icon: DollarSign, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Active Projects", value: "12", icon: FileText, color: "text-orange-600", bg: "bg-orange-50" },
];

const topSocieties = [
  { name: "Masjid Nabvi Community G-11/4", type: "MOSQUE", members: 256, funds: 15430, satisfaction: 94 },
  { name: "Church of Hope G-10", type: "CHURCH", members: 180, funds: 12200, satisfaction: 91 },
  { name: "Islamabad Tech Hub F-8", type: "COMMUNITY", members: 450, funds: 28000, satisfaction: 88 },
  { name: "Green Valley Society G-9", type: "COMMUNITY", members: 320, funds: 19500, satisfaction: 92 },
];

const cityProjects = [
  { title: "Metro Bus Extension to G-11", budget: 500000, spent: 320000, progress: 64, status: "IN_PROGRESS" },
  { title: "City Parks Renovation", budget: 100000, spent: 85000, progress: 85, status: "IN_PROGRESS" },
  { title: "Smart Street Lighting", budget: 200000, spent: 45000, progress: 22, status: "PLANNING" },
];

export default function CityDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Islamabad City Dashboard</h1>
          <p className="text-muted-foreground">City Admin — Transparent governance for all citizens</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800 py-1 px-3"><MapPin className="w-4 h-4 mr-1" /> City Admin</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cityStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className={`p-2 rounded-lg ${stat.bg} w-fit mb-2`}><stat.icon className={`w-5 h-5 ${stat.color}`} /></div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Top Societies</CardTitle><CardDescription>Highest performing communities</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {topSocieties.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50">
                <div>
                  <p className="font-medium text-sm">{s.name}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                    <span><Users className="w-3 h-3 inline mr-1" />{s.members}</span>
                    <span><DollarSign className="w-3 h-3 inline mr-1" />${s.funds.toLocaleString()}</span>
                    <Badge variant="outline" className="text-[10px]">{s.type}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-semibold">{s.satisfaction}%</span>
                  <p className="text-xs text-muted-foreground">satisfaction</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">City Projects</CardTitle><CardDescription>Funded by society contributions</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {cityProjects.map((p) => (
              <div key={p.title} className="p-3 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">{p.title}</h4>
                  <Badge variant={p.status === "IN_PROGRESS" ? "default" : "warning"}>{p.status.replace("_", " ")}</Badge>
                </div>
                <Progress value={p.progress} className="h-2 mb-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{p.progress}% complete</span>
                  <span>${p.spent.toLocaleString()} / ${p.budget.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "View Societies", href: "/city/societies", icon: Building },
          { label: "City Projects", href: "/city/projects", icon: FileText },
          { label: "Budget Tracking", href: "/city/budget", icon: DollarSign },
          { label: "City Analytics", href: "/city/analytics", icon: BarChart3 },
        ].map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="hover:shadow-md transition-all hover:border-purple-200 cursor-pointer">
              <CardContent className="p-4 text-center">
                <action.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium">{action.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
