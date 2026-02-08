"use client";

import { Globe2, MapPin, Users, DollarSign, Building, Vote, FileText, BarChart3, AlertTriangle, Brain, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const countryStats = [
  { label: "Cities", value: "15", icon: MapPin, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Total Societies", value: "1,234", icon: Building, color: "text-green-600", bg: "bg-green-50" },
  { label: "Citizens", value: "2.5M", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "National Fund", value: "$45M", icon: DollarSign, color: "text-orange-600", bg: "bg-orange-50" },
];

const cities = [
  { name: "Islamabad", societies: 45, population: "1.2M", fund: "$2.3M", satisfaction: 92 },
  { name: "Lahore", societies: 120, population: "11.1M", fund: "$8.5M", satisfaction: 85 },
  { name: "Karachi", societies: 200, population: "14.9M", fund: "$12.1M", satisfaction: 78 },
  { name: "Peshawar", societies: 65, population: "2.0M", fund: "$3.2M", satisfaction: 81 },
  { name: "Quetta", societies: 35, population: "1.0M", fund: "$1.8M", satisfaction: 76 },
];

const nationalPolicies = [
  { title: "Free STEM Education for All", votes: "1.2M", status: "ACTIVE", approval: 85 },
  { title: "National Clean Water Initiative", votes: "980K", status: "APPROVED", approval: 92 },
  { title: "Digital Pakistan 2030", votes: "750K", status: "ACTIVE", approval: 78 },
];

export default function CountryDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pakistan - National Dashboard</h1>
          <p className="text-muted-foreground">Country Admin — Transparent governance at national level</p>
        </div>
        <Badge className="bg-orange-100 text-orange-800 py-1 px-3"><Globe2 className="w-4 h-4 mr-1" /> Country Admin</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {countryStats.map((stat) => (
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
          <CardHeader><CardTitle className="text-lg">Cities Overview</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {cities.map((c) => (
              <div key={c.name} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50">
                <div>
                  <p className="font-medium">{c.name}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                    <span><Building className="w-3 h-3 inline mr-1" />{c.societies} societies</span>
                    <span><Users className="w-3 h-3 inline mr-1" />{c.population}</span>
                    <span><DollarSign className="w-3 h-3 inline mr-1" />{c.fund}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-semibold">{c.satisfaction}%</span>
                  <p className="text-xs text-muted-foreground">satisfaction</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">National Policies</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {nationalPolicies.map((p) => (
              <div key={p.title} className="p-3 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">{p.title}</h4>
                  <Badge variant={p.status === "APPROVED" ? "success" : "default"}>{p.status}</Badge>
                </div>
                <Progress value={p.approval} className="h-2 mb-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{p.approval}% approval</span><span>{p.votes} votes</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "View Cities", href: "/country/cities", icon: MapPin },
          { label: "National Policies", href: "/country/policies", icon: FileText },
          { label: "National Budget", href: "/country/budget", icon: DollarSign },
          { label: "Analytics", href: "/country/analytics", icon: BarChart3 },
        ].map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="hover:shadow-md transition-all hover:border-orange-200 cursor-pointer">
              <CardContent className="p-4 text-center">
                <action.icon className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="font-medium">{action.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
