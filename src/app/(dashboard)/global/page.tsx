"use client";

import { Globe2, MapPin, Users, DollarSign, AlertTriangle, Heart, Brain, BarChart3, TrendingUp, Shield, Vote, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const globalStats = [
  { label: "Countries", value: "195", icon: Globe2, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Total Societies", value: "50K+", icon: Building, color: "text-green-600", bg: "bg-green-50" },
  { label: "Global Citizens", value: "8B", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Funds Tracked", value: "$2.1B", icon: DollarSign, color: "text-orange-600", bg: "bg-orange-50" },
];

const countries = [
  { name: "Pakistan", flag: "🇵🇰", societies: 1234, citizens: "2.5M", score: 88 },
  { name: "Turkey", flag: "🇹🇷", societies: 890, citizens: "1.8M", score: 85 },
  { name: "Malaysia", flag: "🇲🇾", societies: 567, citizens: "1.2M", score: 91 },
  { name: "Indonesia", flag: "🇮🇩", societies: 1500, citizens: "3.2M", score: 82 },
  { name: "United Kingdom", flag: "🇬🇧", societies: 780, citizens: "1.5M", score: 93 },
  { name: "Canada", flag: "🇨🇦", societies: 650, citizens: "1.1M", score: 95 },
];

const globalIssues = [
  { title: "Earthquake in Turkey - Emergency Aid", severity: "CRITICAL", raised: 2500000, target: 5000000, donors: 45000 },
  { title: "Climate Action Fund", severity: "HIGH", raised: 12000000, target: 50000000, donors: 250000 },
  { title: "Global Education Access Initiative", severity: "MEDIUM", raised: 8000000, target: 20000000, donors: 180000 },
];

export default function GlobalDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Global Governance Dashboard</h1>
          <p className="text-muted-foreground">UN-Level Administration — Connecting all nations transparently</p>
        </div>
        <Badge className="bg-red-100 text-red-800 py-1 px-3"><Globe2 className="w-4 h-4 mr-1" /> Global Admin</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {globalStats.map((stat) => (
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
          <CardHeader><CardTitle className="text-lg">Top Participating Countries</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>{c.societies.toLocaleString()} societies</span>
                      <span>{c.citizens} citizens</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-semibold">{c.score}%</span>
                  <p className="text-xs text-muted-foreground">gov score</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <CardTitle className="text-lg">Active Global Issues</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {globalIssues.map((issue) => (
              <div key={issue.title} className="p-3 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">{issue.title}</h4>
                  <Badge variant={issue.severity === "CRITICAL" ? "destructive" : issue.severity === "HIGH" ? "warning" : "secondary"}>
                    {issue.severity}
                  </Badge>
                </div>
                <Progress value={(issue.raised / issue.target) * 100} className="h-2 mb-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${(issue.raised / 1000000).toFixed(1)}M / ${(issue.target / 1000000).toFixed(0)}M raised</span>
                  <span><Heart className="w-3 h-3 inline mr-1" />{(issue.donors / 1000).toFixed(0)}K donors</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "All Countries", href: "/global/countries", icon: MapPin },
          { label: "Global Issues", href: "/global/issues", icon: AlertTriangle },
          { label: "Donation Campaigns", href: "/global/donations", icon: Heart },
          { label: "Global Analytics", href: "/global/analytics", icon: BarChart3 },
        ].map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="hover:shadow-md transition-all hover:border-red-200 cursor-pointer">
              <CardContent className="p-4 text-center">
                <action.icon className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="font-medium">{action.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
