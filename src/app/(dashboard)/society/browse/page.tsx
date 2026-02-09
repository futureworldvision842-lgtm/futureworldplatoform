"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MapPin, Users, Vote, DollarSign, Search, UserPlus, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Society {
  id: string;
  name: string;
  type: string;
  description: string;
  cityName: string;
  countryName: string;
  address: string;
  fundsBalance: number;
  admin: { id: string; name: string };
  _count: { members: number; proposals: number };
}

export default function BrowseSocietiesPage() {
  const { data: session, status } = useSession();
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("");
  const [memberIds, setMemberIds] = useState<Set<string>>(new Set());
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [requestingId, setRequestingId] = useState<string | null>(null);

  useEffect(() => {
    const url = cityFilter ? `/api/societies?city=${encodeURIComponent(cityFilter)}` : "/api/societies";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSocieties(data.societies || []))
      .finally(() => setLoading(false));
  }, [cityFilter]);

  const userId = (session?.user as { id?: string })?.id;
  useEffect(() => {
    if (status !== "authenticated" || !userId) return;
    fetch(`/api/users?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          const memberships = data.user.societyMemberships || [];
          const requests = data.user.societyJoinRequests || [];
          setMemberIds(new Set(memberships.map((m: { society: { id: string } }) => m.society.id)));
          setPendingIds(new Set(requests.map((r: { societyId: string }) => r.societyId)));
        }
      })
      .catch(() => {});
  }, [userId, status]);

  const handleRequestJoin = async (societyId: string) => {
    setRequestingId(societyId);
    try {
      const res = await fetch(`/api/societies/${societyId}/join-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ societyId, message: "" }),
      });
      const data = await res.json();
      if (res.ok) {
        setPendingIds((prev) => new Set(prev).add(societyId));
      } else {
        alert(data.error || "Request failed");
      }
    } catch {
      alert("Request failed");
    } finally {
      setRequestingId(null);
    }
  };

  const byCity = societies.reduce((acc, s) => {
    const key = `${s.cityName}, ${s.countryName}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {} as Record<string, Society[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Find Society by Location</h1>
        <p className="text-muted-foreground">
          Browse all societies. Create your profile with your location to find societies near you.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            placeholder="Filter by city (e.g. Islamabad, Lahore)"
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading societies...</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(byCity).map(([location, list]) => (
            <div key={location}>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                {location}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map((society) => (
                  <Card key={society.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{society.name}</h3>
                        <Badge variant="outline">{society.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{society.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{society._count.members} members</span>
                        <span className="flex items-center gap-1"><Vote className="w-3 h-3" />{society._count.proposals} proposals</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${society.fundsBalance.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Admin: {society.admin.name}</p>
                      <div className="mt-3 flex gap-2">
                        {memberIds.has(society.id) ? (
                          <Link href={`/society?societyId=${society.id}`}>
                            <Button size="sm" variant="outline">View Dashboard</Button>
                          </Link>
                        ) : pendingIds.has(society.id) ? (
                          <Button size="sm" variant="secondary" disabled>Pending approval</Button>
                        ) : status === "authenticated" ? (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleRequestJoin(society.id)}
                            disabled={requestingId === society.id}
                          >
                            {requestingId === society.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                            {requestingId === society.id ? "Requesting..." : "Request to join"}
                          </Button>
                        ) : (
                          <Link href="/login">
                            <Button size="sm">Sign in to join</Button>
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          {societies.length === 0 && (
            <p className="text-muted-foreground">No societies found. Try a different city or create one.</p>
          )}
        </div>
      )}
    </div>
  );
}
