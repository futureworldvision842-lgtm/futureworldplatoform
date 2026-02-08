"use client";
import { BarChart3, Globe2, Brain, TrendingUp, Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const globalMetrics = [
  { label: "Global Participation", value: 65, target: 80 },
  { label: "Average Gov Score", value: 84, target: 90 },
  { label: "Transparency Index", value: 92, target: 100 },
  { label: "Corruption Reduction", value: 73, target: 90 },
  { label: "Fund Accountability", value: 97, target: 100 },
  { label: "Citizen Satisfaction", value: 81, target: 90 },
];

export default function GlobalAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Global Analytics</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {globalMetrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-5">
              <h4 className="text-sm text-muted-foreground mb-2">{m.label}</h4>
              <div className="text-3xl font-bold mb-2">{m.value}%</div>
              <Progress value={m.value} className="h-2 mb-1" />
              <p className="text-xs text-muted-foreground">Target: {m.target}%</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Brain className="w-5 h-5 text-purple-500" /> AI Global Insights</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            "Global participation has increased 15% since G.A.I.G.S. launch across 195 countries",
            "Transparent fund tracking has reduced corruption indicators by 73% in participating nations",
            "Education and healthcare budgets show highest citizen satisfaction scores globally",
            "Blockchain-verified voting has increased trust in democratic processes by 45%",
            "AI governance scoring helps identify and address governance gaps proactively",
            "Donation transparency has increased charitable giving by 200% on the platform",
          ].map((insight, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border">
              <Globe2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
              <p className="text-sm">{insight}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
