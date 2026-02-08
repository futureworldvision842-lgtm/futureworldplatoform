"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, MapPin, Users, Vote, DollarSign, Search } from "lucide-react";
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
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    const url = cityFilter ? `/api/societies?city=${encodeURIComponent(cityFilter)}` : "/api/societies";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSocieties(data.societies || []))
      .finally(() => setLoading(false));
  }, [cityFilter]);

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
                      <Link href={`/society?societyId=${society.id}`} className="inline-block mt-3">
                        <Button size="sm" variant="outline">View Dashboard</Button>
                      </Link>
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
