"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Users, Plus, Building2, User, LogIn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface Team {
  id: string;
  name: string;
  description: string;
  createdBy: { id: string; name: string };
  society?: { id: string; name: string; cityName: string } | null;
  _count: { members: number };
}

export default function TeamsPage() {
  const { data: session, status } = useSession();
  const [teams, setTeams] = useState<Team[]>([]);
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);

  const userId = (session?.user as any)?.id;

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setAllTeams(data.teams || []);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/teams?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setTeams(data.teams || []));
  }, [userId]);

  const handleCreate = async () => {
    if (!userId || !newName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          description: newDesc.trim(),
          createdById: userId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setTeams((prev) => [data.team, ...prev]);
        setAllTeams((prev) => [data.team, ...prev]);
        setCreateOpen(false);
        setNewName("");
        setNewDesc("");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleJoin = async (teamId: string) => {
    if (!userId) return;
    const res = await fetch(`/api/teams/${teamId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (res.ok) {
      const team = allTeams.find((t) => t.id === teamId);
      if (team) setTeams((prev) => [team, ...prev]);
    }
  };

  const myTeamIds = new Set(teams.map((t) => t.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Groups & Teams</h1>
          <p className="text-muted-foreground">
            Create or join teams to collaborate with your society and community
          </p>
        </div>
        {userId && (
          <Button onClick={() => setCreateOpen(true)} className="bg-gradient-to-r from-blue-600 to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        )}
      </div>

      {userId && teams.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Teams</CardTitle>
            <CardDescription>Teams you belong to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team) => (
                <Card key={team.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{team.name}</h3>
                        {team.society && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Building2 className="w-3 h-3" />
                            {team.society.name} {team.society.cityName && `· ${team.society.cityName}`}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{team.description || "No description"}</p>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {team._count.members} members
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Teams</CardTitle>
          <CardDescription>Browse and join teams</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : allTeams.length === 0 ? (
            <p className="text-muted-foreground">No teams yet. Create the first one!</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allTeams.map((team) => (
                <Card key={team.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{team.name}</h3>
                    {team.society && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Building2 className="w-3 h-3" />
                        {team.society.name} {team.society.cityName && `· ${team.society.cityName}`}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{team.description || "No description"}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {team._count.members} members
                      </span>
                      {userId && !myTeamIds.has(team.id) && (
                        <Button size="sm" variant="outline" onClick={() => handleJoin(team.id)}>
                          <LogIn className="w-3 h-3 mr-1" />
                          Join
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Team</DialogTitle>
            <DialogDescription>Add a name and description. You can link it to a society later.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Team name</Label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Youth Volunteers" />
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="What is this team for?" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!newName.trim() || creating}>
              {creating ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
