"use client";
import { Heart, Plus, Shield, Eye, DollarSign, Users, Globe2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const campaigns = [
  { title: "Turkey Earthquake Emergency", target: 5000000, raised: 2500000, donors: 45000, status: "ACTIVE", level: "GLOBAL" },
  { title: "Global Climate Action", target: 50000000, raised: 12000000, donors: 250000, status: "ACTIVE", level: "GLOBAL" },
  { title: "African Drought Relief", target: 15000000, raised: 8500000, donors: 180000, status: "ACTIVE", level: "GLOBAL" },
  { title: "Children Education Fund", target: 10000000, raised: 7200000, donors: 120000, status: "ACTIVE", level: "GLOBAL" },
  { title: "Clean Water for All", target: 20000000, raised: 15600000, donors: 200000, status: "ACTIVE", level: "GLOBAL" },
];

const totalRaised = campaigns.reduce((a, b) => a + b.raised, 0);
const totalDonors = campaigns.reduce((a, b) => a + b.donors, 0);

export default function GlobalDonationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Global Donation Campaigns</h1>
        <Button className="bg-gradient-to-r from-pink-500 to-red-500"><Plus className="w-4 h-4 mr-2" /> Create Campaign</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-pink-500 to-red-500 text-white">
          <CardContent className="p-5"><p className="text-pink-100 text-sm">Total Raised</p><p className="text-3xl font-bold">${(totalRaised / 1000000).toFixed(1)}M</p></CardContent>
        </Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Donors</p><p className="text-2xl font-bold">{(totalDonors / 1000).toFixed(0)}K</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Active Campaigns</p><p className="text-2xl font-bold">{campaigns.length}</p></CardContent></Card>
      </div>

      <div className="space-y-4">
        {campaigns.map((c) => (
          <Card key={c.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <div className="flex items-center gap-2 mt-1"><Badge variant="success">{c.status}</Badge><Badge variant="outline">{c.level}</Badge></div>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-pink-500 to-red-500"><Heart className="w-4 h-4 mr-1" /> Donate</Button>
              </div>
              <Progress value={(c.raised / c.target) * 100} className="h-3 mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${(c.raised / 1000000).toFixed(1)}M / ${(c.target / 1000000).toFixed(0)}M ({Math.round((c.raised/c.target)*100)}%)</span>
                <span><Users className="w-3 h-3 inline mr-1" />{(c.donors / 1000).toFixed(0)}K donors</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" />Verified</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
