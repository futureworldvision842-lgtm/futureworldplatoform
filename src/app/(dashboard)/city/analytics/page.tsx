"use client";

import { BarChart3, Users, Vote, DollarSign, TrendingUp, Building, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const metrics = [
  { label: "Citizen Participation", value: 78, target: 90, unit: "%" },
  { label: "Fund Utilization", value: 65, target: 85, unit: "%" },
  { label: "Project Completion Rate", value: 82, target: 95, unit: "%" },
  { label: "Citizen Satisfaction", value: 88, target: 90, unit: "%" },
  { label: "Transparency Score", value: 96, target: 100, unit: "%" },
  { label: "AI Governance Score", value: 91, target: 95, unit: "%" },
];

export default function CityAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">City Analytics</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-5">
              <h4 className="text-sm text-muted-foreground mb-2">{m.label}</h4>
              <div className="text-3xl font-bold mb-2">{m.value}{m.unit}</div>
              <Progress value={m.value} className="h-2 mb-1" />
              <p className="text-xs text-muted-foreground">Target: {m.target}{m.unit}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Monthly Trends</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                <div key={month} className="flex items-center gap-3">
                  <span className="text-sm w-8">{month}</span>
                  <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full flex items-center justify-end pr-2" style={{ width: `${60 + i * 6}%` }}>
                      <span className="text-xs text-white font-medium">{60 + i * 6}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">AI Insights</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { insight: "Citizen participation increased 15% after transparent fund tracking launch", type: "positive" },
              { insight: "G-11 sector needs water infrastructure upgrade — 3 societies reported issues", type: "warning" },
              { insight: "Education fund utilization is above average — great community investment", type: "positive" },
              { insight: "Recommend expanding Smart Street Lighting to more sectors", type: "suggestion" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-lg border">
                <Brain className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.type === "positive" ? "text-green-500" : item.type === "warning" ? "text-yellow-500" : "text-blue-500"}`} />
                <p className="text-sm">{item.insight}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
