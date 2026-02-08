"use client";

import { Bell, Vote, DollarSign, Brain, Users, AlertTriangle, CheckCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const notifications = [
  { id: "1", type: "VOTE", title: "New Proposal Available", message: "A new proposal 'Community Solar Panel Project' is open for voting.", time: "10 min ago", read: false, icon: Vote },
  { id: "2", type: "TRANSACTION", title: "Payment Received", message: "You received $500.00 from Society Fund. Blockchain verified.", time: "1 hour ago", read: false, icon: DollarSign },
  { id: "3", type: "AI_INSIGHT", title: "AI Governance Insight", message: "AI detected a 15% improvement in community participation this month.", time: "3 hours ago", read: false, icon: Brain },
  { id: "4", type: "ANNOUNCEMENT", title: "Society Meeting", message: "Monthly society meeting scheduled for Saturday at 10 AM.", time: "5 hours ago", read: true, icon: Users },
  { id: "5", type: "SYSTEM", title: "Vote Results Published", message: "'City Park Renovation' proposal approved with 82% yes votes.", time: "1 day ago", read: true, icon: CheckCircle },
  { id: "6", type: "DONATION", title: "Donation Campaign", message: "New donation campaign: 'Earthquake Relief Fund' — target $100,000.", time: "2 days ago", read: true, icon: AlertTriangle },
];

export default function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">{unread} unread notifications</p>
        </div>
        <Button variant="outline" size="sm">Mark All Read</Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} className={`${!notif.read ? "border-l-4 border-l-blue-500 bg-blue-50/50" : ""} hover:shadow-sm transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${!notif.read ? "bg-blue-100" : "bg-muted"}`}>
                  <notif.icon className={`w-4 h-4 ${!notif.read ? "text-blue-600" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{notif.title}</h4>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
