"use client";

import {
  Users,
  Vote,
  Wallet,
  Building2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Globe2,
  Shield,
  Activity,
  DollarSign,
  Sparkles,
  BookOpen,
  Zap,
  Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

const statsCards = [
  {
    title: "Wallet Balance",
    value: "$1,000.00",
    change: "+12.5%",
    trend: "up",
    icon: Wallet,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Proposals",
    value: "12",
    change: "+3 new",
    trend: "up",
    icon: Vote,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "My Societies",
    value: "3",
    change: "Active",
    trend: "up",
    icon: Building2,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Funds Tracked",
    value: "$52.3M",
    change: "Real-time",
    trend: "up",
    icon: Shield,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const recentActivity = [
  { type: "vote", message: "You voted YES on 'Community Park Renovation'", time: "2h ago", icon: Vote },
  { type: "transaction", message: "Received $50.00 from Society Fund", time: "4h ago", icon: DollarSign },
  { type: "ai", message: "AI generated insights for your society", time: "6h ago", icon: Brain },
  { type: "proposal", message: "New proposal: 'Solar Panel Installation'", time: "1d ago", icon: TrendingUp },
  { type: "society", message: "3 new members joined Masjid Nabvi Society", time: "2d ago", icon: Users },
];

const activeProposals = [
  {
    title: "Community Solar Panel Installation",
    level: "SOCIETY",
    yesVotes: 45,
    noVotes: 12,
    total: 65,
    endDate: "3 days left",
  },
  {
    title: "City Park Renovation Fund",
    level: "CITY",
    yesVotes: 230,
    noVotes: 45,
    total: 320,
    endDate: "5 days left",
  },
  {
    title: "National Education Reform",
    level: "COUNTRY",
    yesVotes: 15000,
    noVotes: 3200,
    total: 22000,
    endDate: "12 days left",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* A New Dawn for Humanity - Story & Cause */}
      <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/80">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">A New Dawn for Humanity</CardTitle>
              <CardDescription>Why the world needs this platform — and why you belong here</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[220px] pr-4">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">History&apos;s lesson:</strong> After World War II, a handful of victors built a new global financial and political order. That system still runs the world today — and it was never designed for 8 billion people, climate crisis, or AI.
              </p>
              <p>
                <strong className="text-foreground">Today&apos;s crisis:</strong> AI is changing everything. But the same powers that control money and weapons are now weaponizing AI — to surveil, to divide, to control. From Epstein files to Gaza, from Venezuela to mass surveillance, the old system keeps failing humanity.
              </p>
              <p>
                <strong className="text-foreground">Our answer:</strong> G.A.I.G.S. is the unified platform where AI and blockchain serve <em>everyone</em>. Transparent funds. Democratic votes. Your society, your city, your country — and one global system where humanity takes its own decisions and keeps its own control. No more business as usual.
              </p>
              <p>
                <strong className="text-foreground">Your role:</strong> Create your profile, add your skills, join your society, vote transparently, see every fund, and use one account for governance + wallet + services (like Facebook, Binance, and Uber in one). Investors: this is the AI-and-blockchain future the world is waiting for. Join us.
              </p>
            </div>
          </ScrollArea>
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <Link href="/profile">
              <Button size="sm" variant="outline"><Users className="w-3 h-3 mr-1" /> Complete Profile</Button>
            </Link>
            <Link href="/wallet">
              <Button size="sm" variant="outline"><Wallet className="w-3 h-3 mr-1" /> Your Blockchain Wallet</Button>
            </Link>
            <Link href="/society">
              <Button size="sm" variant="outline"><Building2 className="w-3 h-3 mr-1" /> Your Society</Button>
            </Link>
            <Link href="/voting">
              <Button size="sm" variant="outline"><Vote className="w-3 h-3 mr-1" /> Vote Transparently</Button>
            </Link>
            <Link href="/services">
              <Button size="sm" variant="outline"><Zap className="w-3 h-3 mr-1" /> Skills & Services</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Wallet, votes, society, and services — all in one place
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Link href="/ai-assistant">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Brain className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </Link>
          <Link href="/voting">
            <Button variant="outline">
              <Vote className="w-4 h-4 mr-2" />
              Vote Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex items-center text-sm">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Proposals */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Active Proposals</CardTitle>
                  <CardDescription>Vote on these proposals to shape governance</CardDescription>
                </div>
                <Link href="/voting">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeProposals.map((proposal) => (
                  <div
                    key={proposal.title}
                    className="p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{proposal.title}</h4>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {proposal.level}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{proposal.endDate}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">
                          Yes: {proposal.yesVotes} ({Math.round((proposal.yesVotes / proposal.total) * 100)}%)
                        </span>
                        <span className="text-red-600">
                          No: {proposal.noVotes} ({Math.round((proposal.noVotes / proposal.total) * 100)}%)
                        </span>
                      </div>
                      <Progress
                        value={(proposal.yesVotes / proposal.total) * 100}
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {proposal.total} total votes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Your latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-muted">
                    <activity.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Governance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Governance Hierarchy</CardTitle>
          <CardDescription>Navigate through different governance levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { level: "Individual", icon: Users, count: "8B+", href: "/profile", color: "from-blue-500 to-blue-600" },
              { level: "Society", icon: Building2, count: "1,234", href: "/society", color: "from-green-500 to-green-600" },
              { level: "City", icon: Activity, count: "567", href: "/city", color: "from-purple-500 to-purple-600" },
              { level: "Country", icon: Globe2, count: "195", href: "/country", color: "from-orange-500 to-orange-600" },
              { level: "Global", icon: Globe2, count: "1", href: "/global", color: "from-red-500 to-red-600" },
            ].map((item) => (
              <Link key={item.level} href={item.href}>
                <div className="p-4 rounded-xl border hover:shadow-md transition-all text-center group">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold">{item.level}</h4>
                  <p className="text-sm text-muted-foreground">{item.count} active</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
