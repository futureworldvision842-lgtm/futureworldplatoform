"use client";

import { Building, Users, DollarSign, Star, MapPin, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const societies = [
  { name: "Masjid Nabvi Community G-11/4", type: "MOSQUE", members: 256, funds: 15430, rating: 4.9, location: "G-11/4", admin: "Muhammad Qureshi" },
  { name: "Church of Hope G-10", type: "CHURCH", members: 180, funds: 12200, rating: 4.7, location: "G-10/3", admin: "Pastor James" },
  { name: "Islamabad Tech Hub F-8", type: "COMMUNITY", members: 450, funds: 28000, rating: 4.8, location: "F-8/2", admin: "Sara Ahmed" },
  { name: "Green Valley Society G-9", type: "COMMUNITY", members: 320, funds: 19500, rating: 4.6, location: "G-9/1", admin: "Ali Hassan" },
  { name: "Mandir Shanti F-6", type: "TEMPLE", members: 150, funds: 8900, rating: 4.5, location: "F-6/4", admin: "Raj Kumar" },
  { name: "Blue Area Business Forum", type: "COMMUNITY", members: 560, funds: 45000, rating: 4.9, location: "Blue Area", admin: "Ayesha Khan" },
];

export default function CitySocietiesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Societies in Islamabad</h1>
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search societies..." className="pl-10" /></div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {societies.map((s) => (
          <Card key={s.name} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">{s.name}</h3>
              </div>
              <Badge variant="outline" className="mb-3">{s.type}</Badge>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{s.location}</div>
                <div className="flex items-center gap-1"><Users className="w-3 h-3" />{s.members} members</div>
                <div className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${s.funds.toLocaleString()} fund</div>
                <div className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" />{s.rating} rating</div>
                <div className="text-xs">Admin: {s.admin}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
