"use client";
import { FileText, Plus, Brain, Shield, Vote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const policies = [
  { title: "Free STEM Education for All Children", desc: "Nationwide program providing free STEM education to children aged 10-18 through community centers and online platforms.", votes: "1.2M", totalVoters: "2.5M", approval: 85, status: "ACTIVE", aiScore: 9.8 },
  { title: "National Clean Water Initiative", desc: "Install water filtration systems in all districts. Budget: $20M from national fund.", votes: "980K", totalVoters: "2.5M", approval: 92, status: "APPROVED", aiScore: 9.5 },
  { title: "Digital Pakistan 2030", desc: "Comprehensive digital transformation strategy including free WiFi, e-governance, and digital literacy programs.", votes: "750K", totalVoters: "2.5M", approval: 78, status: "ACTIVE", aiScore: 8.9 },
  { title: "Renewable Energy Transition", desc: "30% renewable energy target by 2030. Solar and wind farm installations across the country.", votes: "620K", totalVoters: "2.5M", approval: 81, status: "ACTIVE", aiScore: 9.2 },
];

export default function CountryPoliciesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">National Policies</h1>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500"><Plus className="w-4 h-4 mr-2" /> Propose Policy</Button>
      </div>
      <div className="space-y-4">
        {policies.map((p) => (
          <Card key={p.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <Badge variant={p.status === "APPROVED" ? "success" : "default"}>{p.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-sm"><Brain className="w-4 h-4 text-purple-500" />AI: {p.aiScore}/10</div>
              </div>
              <Progress value={p.approval} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{p.approval}% approval</span><span>{p.votes} / {p.totalVoters} voted</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" />Blockchain verified</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
