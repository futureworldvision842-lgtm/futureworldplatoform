"use client";
import { MapPin, Users, Building, DollarSign, Search, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const cities = [
  { name: "Islamabad", population: "1.2M", societies: 45, fund: "$2.3M", satisfaction: 92, admin: "Dr. Ahmed Khan" },
  { name: "Lahore", population: "11.1M", societies: 120, fund: "$8.5M", satisfaction: 85, admin: "Maryam Ali" },
  { name: "Karachi", population: "14.9M", societies: 200, fund: "$12.1M", satisfaction: 78, admin: "Zain Abbas" },
  { name: "Peshawar", population: "2.0M", societies: 65, fund: "$3.2M", satisfaction: 81, admin: "Khan Wali" },
  { name: "Quetta", population: "1.0M", societies: 35, fund: "$1.8M", satisfaction: 76, admin: "Baloch Khan" },
  { name: "Multan", population: "1.9M", societies: 55, fund: "$2.8M", satisfaction: 83, admin: "Sajid Hussain" },
  { name: "Faisalabad", population: "3.2M", societies: 80, fund: "$4.1M", satisfaction: 80, admin: "Rana Bilal" },
  { name: "Rawalpindi", population: "2.1M", societies: 50, fund: "$2.5M", satisfaction: 87, admin: "Col. Rashid" },
];

export default function CountryCitiesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cities of Pakistan</h1>
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search cities..." className="pl-10" /></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((c) => (
          <Card key={c.name} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold mb-1">{c.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">Admin: {c.admin}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="flex items-center gap-1 text-muted-foreground"><Users className="w-3 h-3" />Population</span><span>{c.population}</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1 text-muted-foreground"><Building className="w-3 h-3" />Societies</span><span>{c.societies}</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1 text-muted-foreground"><DollarSign className="w-3 h-3" />Fund</span><span>{c.fund}</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1 text-muted-foreground"><Star className="w-3 h-3" />Satisfaction</span><span className="text-green-600 font-semibold">{c.satisfaction}%</span></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
