"use client";
import { BarChart3, Brain, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const metrics = [
  { label: "National Participation Rate", value: 72, target: 85 },
  { label: "Corruption Index (Lower = Better)", value: 15, target: 5 },
  { label: "Budget Transparency", value: 96, target: 100 },
  { label: "Policy Implementation Rate", value: 68, target: 80 },
  { label: "Citizen Satisfaction", value: 82, target: 90 },
  { label: "Government Efficiency", value: 74, target: 85 },
];

export default function CountryAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">National Analytics</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => (
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
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Brain className="w-5 h-5 text-purple-500" /> AI National Insights</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            "Education spending shows highest ROI among all budget categories — recommend 10% increase",
            "Karachi citizen satisfaction is below national average — targeted intervention recommended",
            "Digital infrastructure investment showing positive correlation with economic growth",
            "Renewable energy policy gaining momentum — 81% approval rate trending upward",
            "Corruption index improved 8 points since platform launch — transparent tracking working",
          ].map((insight, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border">
              <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
              <p className="text-sm">{insight}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
