"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Edit2,
  Vote,
  Wallet,
  Building2,
  MessageSquare,
  DollarSign,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInitials } from "@/lib/utils";

function parseSkills(skills: string): string[] {
  try {
    const arr = JSON.parse(skills || "[]");
    return Array.isArray(arr) ? arr.filter((s: unknown) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (status !== "authenticated" || !userId) {
      setLoading(status === "loading");
      return;
    }
    fetch(`/api/users?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  const displayUser = user || {
    name: session?.user?.name || "User",
    email: (session?.user as any)?.email || "",
    bio: "",
    phone: "",
    location: "",
    skills: "[]",
    role: (session?.user as any)?.role || "USER",
    verified: false,
    createdAt: new Date().toISOString(),
    societyMemberships: [],
    teamMemberships: [],
    _count: { posts: 0, votes: 0, services: 0 },
  };

  const skillsList = parseSkills(displayUser.skills);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-3xl">
                {getInitials(displayUser.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{displayUser.name}</h1>
                {displayUser.verified && (
                  <Badge variant="success" className="text-xs">Verified</Badge>
                )}
                <Badge variant="secondary" className="capitalize">
                  {(displayUser.role || "USER").toLowerCase().replace("_", " ")}
                </Badge>
              </div>
              {displayUser.bio && <p className="text-muted-foreground mb-4">{displayUser.bio}</p>}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {displayUser.email}
                </div>
                {displayUser.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {displayUser.phone}
                  </div>
                )}
                {displayUser.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {displayUser.location}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(displayUser.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <Link href="/profile/edit">
              <Button variant="outline">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile & Skills
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Link href="/society">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium text-sm">My Society</p>
                <p className="text-xs text-muted-foreground">Location, members, decisions</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/teams">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-sm">Groups & Teams</p>
                <p className="text-xs text-muted-foreground">Create or join teams</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/feed">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-medium text-sm">Discussions</p>
                <p className="text-xs text-muted-foreground">Posts, ideas, announcements</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/voting">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <Vote className="w-8 h-8 text-orange-600" />
              <div>
                <p className="font-medium text-sm">Vote</p>
                <p className="text-xs text-muted-foreground">Blockchain-verified</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/wallet">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-cyan-600" />
              <div>
                <p className="font-medium text-sm">Transparent Funds</p>
                <p className="text-xs text-muted-foreground">See every transaction</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Proposals Created", value: displayUser._count?.proposals ?? 0, icon: Vote },
          { label: "Votes Cast", value: displayUser._count?.votes ?? 0, icon: Star },
          { label: "Posts", value: displayUser._count?.posts ?? 0, icon: MessageSquare },
          { label: "Societies", value: displayUser.societyMemberships?.length ?? 0, icon: Building2 },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="skills">
        <TabsList>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="societies">Societies</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              {skillsList.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No skills added yet. <Link href="/profile/edit" className="text-primary underline">Edit profile</Link> to add skills.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="societies">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Societies</CardTitle>
            </CardHeader>
            <CardContent>
              {displayUser.societyMemberships?.length > 0 ? (
                <div className="space-y-2">
                  {displayUser.societyMemberships.map((m: any) => (
                    <Link key={m.society.id} href="/society">
                      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50">
                        <div>
                          <p className="font-medium">{m.society.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {m.society.cityName && m.society.countryName
                              ? `${m.society.cityName}, ${m.society.countryName}`
                              : m.society.type}
                          </p>
                        </div>
                        <Badge variant="outline">{m.role}</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">You are not in a society yet. <Link href="/society" className="text-primary underline">Browse societies</Link> by location.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="teams">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Teams</CardTitle>
            </CardHeader>
            <CardContent>
              {displayUser.teamMemberships?.length > 0 ? (
                <div className="space-y-2">
                  {displayUser.teamMemberships.map((m: any) => (
                    <Link key={m.team.id} href="/teams">
                      <div className="p-3 rounded-lg border hover:bg-accent/50">
                        <p className="font-medium">{m.team.name}</p>
                        <p className="text-xs text-muted-foreground">Role: {m.role}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">You are not in any teams yet. <Link href="/teams" className="text-primary underline">Create or join a team</Link>.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Voted YES on 'Community Solar Panel Project'",
                  "Updated profile and skills",
                  "Joined a team",
                  "Viewed transparent funds",
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm">{activity}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{i + 1}d ago</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
