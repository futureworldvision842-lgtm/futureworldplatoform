"use client";

import { Users, Plus, Search, MoreHorizontal, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type MemberRow = {
  id: string;
  role: string;
  joinedAt: string;
  votesCast: number;
  user: { id: string; name: string; email: string; avatar: string | null; location: string | null };
};

export default function SocietyMembersPage() {
  const searchParams = useSearchParams();
  const societyId = searchParams.get("societyId");
  const { data: session, status } = useSession();
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [societyName, setSocietyName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!societyId) {
      setLoading(false);
      return;
    }
    Promise.all([
      fetch(`/api/societies/${societyId}`).then((r) => r.json()),
      fetch(`/api/societies/${societyId}/members`).then((r) => r.json()),
    ])
      .then(([socRes, memRes]) => {
        setSocietyName(socRes.society?.name ?? "Society");
        setMembers(memRes.members ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [societyId]);

  const filtered = search.trim()
    ? members.filter(
        (m) =>
          m.user.name.toLowerCase().includes(search.toLowerCase()) ||
          m.user.email.toLowerCase().includes(search.toLowerCase())
      )
    : members;

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground">Loading members...</p>
      </div>
    );
  }

  if (!societyId) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Society Members</h1>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Select a society from the dashboard.</p>
            <Link href="/society">
              <Button variant="outline" className="mt-4">Go to Society Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Society Members</h1>
          <p className="text-muted-foreground">{societyName}</p>
        </div>
        <Link href={`/society?societyId=${societyId}`}>
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium">Member</th>
                  <th className="text-left p-4 text-sm font-medium">Role</th>
                  <th className="text-left p-4 text-sm font-medium">Joined</th>
                  <th className="text-left p-4 text-sm font-medium">Votes Cast</th>
                  <th className="text-left p-4 text-sm font-medium">Status</th>
                  <th className="text-left p-4 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No members found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((member) => (
                    <tr key={member.id} className="border-t hover:bg-accent/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs">
                              {member.user.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.user.name}</p>
                            <p className="text-xs text-muted-foreground">{member.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            member.role === "ADMIN" ? "default" : member.role === "MODERATOR" ? "secondary" : "outline"
                          }
                        >
                          {member.role === "ADMIN" && <Shield className="w-3 h-3 mr-1" />}
                          {member.role}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(member.joinedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm font-medium">{member.votesCast}</td>
                      <td className="p-4">
                        <Badge variant="success">Active</Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
