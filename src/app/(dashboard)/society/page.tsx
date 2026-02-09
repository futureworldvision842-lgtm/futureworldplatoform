"use client";

import {
  Building, Users, UserPlus, Vote, DollarSign, Bell, Shield, MessageSquare, Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type Society = {
  id: string;
  name: string;
  type: string;
  cityName: string;
  countryName: string;
  fundsBalance: number;
  admin: { id: string; name: string; email: string; avatar: string | null };
  _count: { members: number; proposals: number; posts: number; teams: number };
  proposals: Array<{
    id: string;
    title: string;
    status: string;
    yesVotes: number;
    noVotes: number;
    abstainVotes: number;
    endDate: string;
  }>;
  posts: Array<{
    id: string;
    content: string;
    type: string;
    likes: number;
    createdAt: string;
    author: { id: string; name: string; avatar: string | null };
  }>;
};

type UserSociety = { society: { id: string; name: string; type: string; cityName: string; countryName: string } };

function SocietyDashboardContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const societyIdParam = searchParams.get("societyId");

  const [userSocieties, setUserSocieties] = useState<UserSociety[]>([]);
  const [society, setSociety] = useState<Society | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(societyIdParam);

  useEffect(() => {
    setSelectedId(societyIdParam || null);
  }, [societyIdParam]);

  useEffect(() => {
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (status !== "authenticated" || !userId) {
      setLoading(false);
      return;
    }
    fetch(`/api/users?id=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        const list = data?.user?.societyMemberships ?? [];
        setUserSocieties(list);
        const firstId = list[0]?.society?.id ?? null;
        const toLoad = selectedId || societyIdParam || firstId;
        if (toLoad) setSelectedId(toLoad);
      })
      .catch(() => setLoading(false));
  }, [session, status]);

  useEffect(() => {
    if (!selectedId) {
      setSociety(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/societies/${selectedId}`)
      .then((r) => r.json())
      .then((data) => {
        setSociety(data.society ?? null);
      })
      .catch(() => setSociety(null))
      .finally(() => setLoading(false));
  }, [selectedId]);

  const isAdmin = society?.admin?.id === session?.user?.id;
  const totalMembers = society?._count?.members ?? 0;

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground">Loading society...</p>
      </div>
    );
  }

  if (!society && !selectedId && userSocieties.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Society Dashboard</h1>
        <Card>
          <CardContent className="p-8 text-center">
            <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">You are not a member of any society yet.</p>
            <Link href="/society/browse">
              <Button>Browse societies by location</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!society && selectedId) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Society not found</h1>
        <Link href="/society/browse">
          <Button variant="outline">Browse societies</Button>
        </Link>
      </div>
    );
  }

  const societyStats = [
    { label: "Total Members", value: String(totalMembers), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Proposals", value: String(society!._count.proposals), icon: Vote, color: "text-green-600", bg: "bg-green-50" },
    { label: "Society Fund", value: `$${society!.fundsBalance.toLocaleString()}`, icon: DollarSign, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Discussions", value: String(society!._count.posts), icon: MessageSquare, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold">{society!.name}</h1>
            <p className="text-muted-foreground">
              {society!.cityName && society!.countryName
                ? `${society!.cityName}, ${society!.countryName}`
                : "Society Dashboard"}
            </p>
          </div>
          {userSocieties.length > 1 && (
            <select
              className="h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm"
              value={selectedId ?? ""}
              onChange={(e) => {
                const v = e.target.value || null;
                setSelectedId(v);
                if (v) router.push(`/society?societyId=${v}`);
              }}
            >
              {userSocieties.map((ms) => (
                <option key={ms.society.id} value={ms.society.id}>
                  {ms.society.name} ({ms.society.cityName})
                </option>
              ))}
            </select>
          )}
        </div>
        {isAdmin && (
          <Badge variant="default" className="text-sm py-1 px-3">
            <Shield className="w-4 h-4 mr-1" /> Society Admin
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {societyStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className={`p-2 rounded-lg ${stat.bg} w-fit mb-2`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Proposals</CardTitle>
            <CardDescription>Community voting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {society!.proposals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No proposals yet.</p>
            ) : (
              society!.proposals.map((p) => {
                const total = p.yesVotes + p.noVotes + p.abstainVotes;
                const pct = total > 0 ? (p.yesVotes / total) * 100 : 0;
                return (
                  <div key={p.id} className="p-3 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{p.title}</h4>
                      <Badge variant={p.status === "APPROVED" ? "default" : "secondary"}>{p.status}</Badge>
                    </div>
                    <Progress value={pct} className="h-2 mb-1" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{p.yesVotes}/{total} votes</span>
                      <span>{new Date(p.endDate) > new Date() ? "Active" : "Ended"}</span>
                    </div>
                  </div>
                );
              })
            )}
            <Link href={`/society/voting?societyId=${society!.id}`}>
              <Button variant="outline" size="sm">View all & create</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Discussions</CardTitle>
            <CardDescription>Society feed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {society!.posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts yet.</p>
            ) : (
              society!.posts.map((post) => (
                <div key={post.id} className="p-3 rounded-lg border">
                  <p className="text-sm line-clamp-2">{post.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {post.author.name} · {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
            <Link href={`/feed?societyId=${society!.id}`}>
              <Button variant="outline" size="sm">View all discussions</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ...(isAdmin ? [{ label: "Join Requests", href: `/society/join-requests?societyId=${society!.id}`, icon: UserPlus }] : []),
          ...(isAdmin ? [{ label: "Service Providers", href: `/society/services?societyId=${society!.id}`, icon: Wrench }] : []),
          { label: "Manage Members", href: `/society/members?societyId=${society!.id}`, icon: Users },
          { label: "Voting & Proposals", href: `/society/voting?societyId=${society!.id}`, icon: Vote },
          { label: "View Funds", href: `/society/funds?societyId=${society!.id}`, icon: DollarSign },
          { label: "Announcements", href: `/society/announcements?societyId=${society!.id}`, icon: Bell },
        ].map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="hover:shadow-md transition-all hover:border-blue-200 cursor-pointer">
              <CardContent className="p-4 text-center">
                <action.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium">{action.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SocietyDashboard() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground">Loading society...</p>
      </div>
    }>
      <SocietyDashboardContent />
    </Suspense>
  );
}
