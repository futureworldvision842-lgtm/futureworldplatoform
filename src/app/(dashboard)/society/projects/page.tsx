"use client";

import { FileText, Plus, Clock, CheckCircle, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const projects = [
  { title: "Solar Panel Installation", status: "IN_PROGRESS", progress: 65, budget: 15000, spent: 9750, lead: "Ali Hassan", members: 8, deadline: "2026-03-15" },
  { title: "Community Library", status: "COMPLETED", progress: 100, budget: 5000, spent: 4800, lead: "Fatima Shah", members: 5, deadline: "2026-01-30" },
  { title: "Youth Sports Program", status: "PLANNING", progress: 15, budget: 3000, spent: 450, lead: "Ibrahim Ali", members: 12, deadline: "2026-04-01" },
  { title: "Water Filtration System", status: "IN_PROGRESS", progress: 40, budget: 8000, spent: 3200, lead: "Usman Khan", members: 4, deadline: "2026-05-01" },
];

const statusColors: Record<string, string> = { IN_PROGRESS: "default", COMPLETED: "success", PLANNING: "warning" };

export default function SocietyProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Society Projects</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500"><Plus className="w-4 h-4 mr-2" /> New Project</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  <Badge variant={statusColors[project.status] as any} className="mt-1">{project.status.replace("_", " ")}</Badge>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 inline mr-1" />{new Date(project.deadline).toLocaleDateString()}
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span><span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.members}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${project.spent.toLocaleString()}/${project.budget.toLocaleString()}</span>
                <span>Lead: {project.lead}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
