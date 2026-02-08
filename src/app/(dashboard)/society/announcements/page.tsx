"use client";

import { Bell, Plus, Calendar, Pin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const announcements = [
  { title: "Monthly Community Meeting", content: "Join us this Saturday at 10 AM for our monthly community meeting. Agenda includes solar panel project update and new proposal discussions.", author: "Muhammad Qureshi", date: "2026-02-06", pinned: true, type: "EVENT" },
  { title: "Solar Panel Project Update", content: "Great news! The solar panel installation is 65% complete. Expected completion by March 15. Live tracking available on the project dashboard.", author: "Ali Hassan", date: "2026-02-04", pinned: false, type: "UPDATE" },
  { title: "New Members Welcome", content: "Please welcome 5 new members who joined our community this week. Let's make them feel at home!", author: "Abdul Ghaffar", date: "2026-02-02", pinned: false, type: "GENERAL" },
  { title: "Water Supply Disruption", content: "Water supply will be temporarily disrupted on Feb 10 from 10 AM - 4 PM due to maintenance. Please store water accordingly.", author: "Usman Khan", date: "2026-02-01", pinned: true, type: "URGENT" },
];

function SocietyAnnouncementsContent() {
  const searchParams = useSearchParams();
  const societyId = searchParams.get("societyId");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          {societyId && (
            <Link href={`/society?societyId=${societyId}`} className="text-sm text-muted-foreground hover:underline">
              ← Back to Dashboard
            </Link>
          )}
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500"><Plus className="w-4 h-4 mr-2" /> New Announcement</Button>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.title} className={`${ann.pinned ? "border-l-4 border-l-blue-500" : ""} hover:shadow-sm transition-shadow`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {ann.pinned && <Pin className="w-4 h-4 text-blue-500" />}
                  <h3 className="font-semibold">{ann.title}</h3>
                  <Badge variant={ann.type === "URGENT" ? "destructive" : ann.type === "EVENT" ? "default" : "secondary"}>{ann.type}</Badge>
                </div>
                <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(ann.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{ann.content}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Avatar className="w-5 h-5"><AvatarFallback className="bg-blue-100 text-blue-600 text-[8px]">{ann.author.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                {ann.author}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function SocietyAnnouncementsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]"><p className="text-muted-foreground">Loading...</p></div>}>
      <SocietyAnnouncementsContent />
    </Suspense>
  );
}
