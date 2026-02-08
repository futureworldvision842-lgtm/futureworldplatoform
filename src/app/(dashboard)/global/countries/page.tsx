"use client";
import { Globe2, Users, Building, Search, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const countries = [
  { name: "Pakistan", flag: "🇵🇰", population: "231M", societies: 1234, score: 88 },
  { name: "Turkey", flag: "🇹🇷", population: "85M", societies: 890, score: 85 },
  { name: "Malaysia", flag: "🇲🇾", population: "33M", societies: 567, score: 91 },
  { name: "Indonesia", flag: "🇮🇩", population: "275M", societies: 1500, score: 82 },
  { name: "United Kingdom", flag: "🇬🇧", population: "67M", societies: 780, score: 93 },
  { name: "Canada", flag: "🇨🇦", population: "38M", societies: 650, score: 95 },
  { name: "Germany", flag: "🇩🇪", population: "83M", societies: 920, score: 94 },
  { name: "Japan", flag: "🇯🇵", population: "125M", societies: 1100, score: 96 },
  { name: "United States", flag: "🇺🇸", population: "331M", societies: 2500, score: 89 },
  { name: "Brazil", flag: "🇧🇷", population: "214M", societies: 1800, score: 79 },
  { name: "India", flag: "🇮🇳", population: "1.4B", societies: 5000, score: 75 },
  { name: "Nigeria", flag: "🇳🇬", population: "218M", societies: 800, score: 70 },
];

export default function GlobalCountriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Participating Countries</h1>
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search countries..." className="pl-10" /></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {countries.map((c) => (
          <Card key={c.name} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 text-center">
              <span className="text-4xl">{c.flag}</span>
              <h3 className="font-semibold mt-2">{c.name}</h3>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p><Users className="w-3 h-3 inline mr-1" />{c.population}</p>
                <p><Building className="w-3 h-3 inline mr-1" />{c.societies.toLocaleString()} societies</p>
              </div>
              <div className="mt-3">
                <Progress value={c.score} className="h-2 mb-1" />
                <p className="text-xs"><Star className="w-3 h-3 inline mr-1 text-yellow-500" />Gov Score: {c.score}%</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
