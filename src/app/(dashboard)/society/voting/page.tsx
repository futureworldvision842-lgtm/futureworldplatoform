"use client";

import { Plus, Brain, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const proposals = [
  { title: "Solar Panel Installation", desc: "Install solar panels to reduce electricity costs by 60%", yes: 145, no: 32, abstain: 8, total: 256, status: "ACTIVE", days: 3, aiScore: 8.5 },
  { title: "Community Library Setup", desc: "Create a community library with 5000+ books and digital resources", yes: 220, no: 15, abstain: 5, total: 256, status: "APPROVED", days: 0, aiScore: 9.2 },
  { title: "Youth Sports Program", desc: "Weekly sports activities for youth aged 10-25", yes: 95, no: 20, abstain: 10, total: 256, status: "ACTIVE", days: 7, aiScore: 7.8 },
  { title: "Water Filtration System", desc: "Install clean water filtration for the community", yes: 200, no: 5, abstain: 2, total: 256, status: "APPROVED", days: 0, aiScore: 9.7 },
];

function SocietyVotingContent() {
  const searchParams = useSearchParams();
  const societyId = searchParams.get("societyId");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Society Proposals & Voting</h1>
          {societyId && (
            <Link href={`/society?societyId=${societyId}`} className="text-sm text-muted-foreground hover:underline">
              ← Back to Dashboard
            </Link>
          )}
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500"><Plus className="w-4 h-4 mr-2" /> Create Proposal</Button>
      </div>

      <div className="space-y-4">
        {proposals.map((p) => {
          const totalVotes = p.yes + p.no + p.abstain;
          const yesPercent = Math.round((p.yes / totalVotes) * 100);
          return (
            <Card key={p.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      <Badge variant={p.status === "APPROVED" ? "success" : "default"}>{p.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Brain className="w-4 h-4 text-purple-500" />
                    <span>AI: {p.aiScore}/10</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Yes: {p.yes} ({yesPercent}%)</span>
                    <span className="text-red-600">No: {p.no}</span>
                    <span className="text-gray-500">Abstain: {p.abstain}</span>
                  </div>
                  <Progress value={yesPercent} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span><Shield className="w-3 h-3 inline mr-1" />Blockchain verified</span>
                    <span>{totalVotes}/{p.total} voted • {p.days > 0 ? `${p.days} days left` : "Completed"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function SocietyVotingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]"><p className="text-muted-foreground">Loading...</p></div>}>
      <SocietyVotingContent />
    </Suspense>
  );
}
