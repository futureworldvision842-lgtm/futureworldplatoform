"use client";

import { FileText, Plus, Clock, Users, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const projects = [
  { title: "Metro Bus Extension to G-11", budget: 500000, spent: 320000, progress: 64, status: "IN_PROGRESS", societies: 12, deadline: "2026-06-01" },
  { title: "City Parks Renovation", budget: 100000, spent: 85000, progress: 85, status: "IN_PROGRESS", societies: 8, deadline: "2026-03-15" },
  { title: "Smart Street Lighting", budget: 200000, spent: 45000, progress: 22, status: "PLANNING", societies: 15, deadline: "2026-09-01" },
  { title: "Clean Water Initiative", budget: 300000, spent: 120000, progress: 40, status: "IN_PROGRESS", societies: 20, deadline: "2026-07-01" },
  { title: "Free WiFi Zones", budget: 80000, spent: 60000, progress: 75, status: "IN_PROGRESS", societies: 10, deadline: "2026-04-01" },
];

export default function CityProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">City Projects</h1>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600"><Plus className="w-4 h-4 mr-2" /> New Project</Button>
      </div>

      <div className="space-y-4">
        {projects.map((p) => (
          <Card key={p.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <Badge variant={p.status === "IN_PROGRESS" ? "default" : "warning"} className="mt-1">{p.status.replace("_", " ")}</Badge>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 inline mr-1" />{new Date(p.deadline).toLocaleDateString()}
                </div>
              </div>
              <Progress value={p.progress} className="h-2 mb-2" />
              <div className="flex gap-6 text-sm text-muted-foreground">
                <span>{p.progress}% complete</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{p.societies} societies</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${p.spent.toLocaleString()} / ${p.budget.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
