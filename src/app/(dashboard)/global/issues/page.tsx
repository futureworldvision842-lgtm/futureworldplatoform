"use client";
import { AlertTriangle, Plus, Heart, Globe2, Shield, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const issues = [
  { title: "Turkey Earthquake Emergency Relief", desc: "7.8 magnitude earthquake affected 10M+ people. Urgent aid needed.", severity: "CRITICAL", raised: 2500000, target: 5000000, donors: 45000, countries: 42, date: "2026-01-15" },
  { title: "Global Climate Action Fund", desc: "Funding renewable energy and climate adaptation in vulnerable regions.", severity: "HIGH", raised: 12000000, target: 50000000, donors: 250000, countries: 120, date: "2026-01-01" },
  { title: "African Drought Relief", desc: "Severe drought affecting 20M+ people across East Africa.", severity: "CRITICAL", raised: 8500000, target: 15000000, donors: 180000, countries: 85, date: "2026-01-20" },
  { title: "Global Pandemic Preparedness", desc: "Building global health infrastructure for future pandemic readiness.", severity: "MEDIUM", raised: 5000000, target: 30000000, donors: 100000, countries: 95, date: "2025-12-01" },
];

export default function GlobalIssuesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Global Issues & Disasters</h1>
        <Button className="bg-gradient-to-r from-red-500 to-orange-500"><Plus className="w-4 h-4 mr-2" /> Report Issue</Button>
      </div>
      <div className="space-y-4">
        {issues.map((issue) => (
          <Card key={issue.title} className={`hover:shadow-md transition-shadow ${issue.severity === "CRITICAL" ? "border-l-4 border-l-red-500" : ""}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{issue.title}</h3>
                    <Badge variant={issue.severity === "CRITICAL" ? "destructive" : issue.severity === "HIGH" ? "warning" : "secondary"}>{issue.severity}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.desc}</p>
                </div>
                <Button className="bg-gradient-to-r from-red-500 to-pink-500"><Heart className="w-4 h-4 mr-2" /> Donate</Button>
              </div>
              <Progress value={(issue.raised / issue.target) * 100} className="h-3 mb-2" />
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>${(issue.raised / 1000000).toFixed(1)}M / ${(issue.target / 1000000).toFixed(0)}M raised</span>
                <span><Heart className="w-3 h-3 inline mr-1" />{(issue.donors / 1000).toFixed(0)}K donors</span>
                <span><Globe2 className="w-3 h-3 inline mr-1" />{issue.countries} countries contributing</span>
                <span><Shield className="w-3 h-3 inline mr-1" />All funds blockchain verified</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
