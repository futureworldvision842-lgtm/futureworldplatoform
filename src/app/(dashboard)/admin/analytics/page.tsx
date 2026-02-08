"use client";
import { BarChart3, Users, Vote, DollarSign, TrendingUp, Brain, Globe2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const platformMetrics = [
  { label: "User Growth (Monthly)", value: 15.2, unit: "%" },
  { label: "Society Growth (Monthly)", value: 8.7, unit: "%" },
  { label: "Votes Per Day (Avg)", value: 45000, unit: "" },
  { label: "Transaction Volume (24h)", value: 1250000, unit: "$" },
  { label: "AI Queries (24h)", value: 85000, unit: "" },
  { label: "Uptime", value: 99.97, unit: "%" },
];

const monthlyGrowth = [
  { month: "Sep 2025", users: 500000, societies: 10000 },
  { month: "Oct 2025", users: 750000, societies: 15000 },
  { month: "Nov 2025", users: 1100000, societies: 22000 },
  { month: "Dec 2025", users: 1500000, societies: 30000 },
  { month: "Jan 2026", users: 2000000, societies: 40000 },
  { month: "Feb 2026", users: 2547823, societies: 52340 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Platform Analytics</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platformMetrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-5">
              <h4 className="text-sm text-muted-foreground mb-2">{m.label}</h4>
              <div className="text-3xl font-bold">{m.unit === "$" ? "$" : ""}{typeof m.value === "number" && m.value > 1000 ? (m.value / 1000).toFixed(0) + "K" : m.value}{m.unit === "%" ? "%" : ""}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Growth Trajectory</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyGrowth.map((m) => (
              <div key={m.month} className="flex items-center gap-4">
                <span className="text-sm w-20 text-muted-foreground">{m.month.split(" ")[0]}</span>
                <div className="flex-1">
                  <div className="flex h-6 gap-1">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-full flex items-center justify-end pr-2" style={{ width: `${(m.users / 2600000) * 100}%` }}>
                      <span className="text-xs text-white font-medium">{(m.users / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
