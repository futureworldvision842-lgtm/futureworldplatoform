"use client";
import { DollarSign, TrendingUp, Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const categories = [
  { name: "Education", allocated: 12000000, spent: 8400000 },
  { name: "Healthcare", allocated: 10000000, spent: 7200000 },
  { name: "Infrastructure", allocated: 8000000, spent: 5600000 },
  { name: "Defense", allocated: 6000000, spent: 4800000 },
  { name: "Technology", allocated: 4000000, spent: 2000000 },
  { name: "Social Welfare", allocated: 3000000, spent: 1800000 },
  { name: "Emergency Fund", allocated: 2000000, spent: 200000 },
];

export default function CountryBudgetPage() {
  const total = categories.reduce((a, b) => a + b.allocated, 0);
  const spent = categories.reduce((a, b) => a + b.spent, 0);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">National Budget</h1><p className="text-muted-foreground flex items-center gap-1"><Eye className="w-4 h-4" /> 100% transparent to all citizens</p></div>
        <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white"><CardContent className="p-5"><p className="text-orange-100 text-sm">Total National Budget</p><p className="text-3xl font-bold">${(total / 1000000).toFixed(0)}M</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Allocated</p><p className="text-2xl font-bold">${(total / 1000000).toFixed(0)}M</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Spent ({Math.round((spent/total)*100)}%)</p><p className="text-2xl font-bold">${(spent / 1000000).toFixed(1)}M</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Budget Breakdown</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {categories.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium">{c.name}</span><span className="text-muted-foreground">${(c.spent/1000000).toFixed(1)}M / ${(c.allocated/1000000).toFixed(0)}M</span></div>
              <Progress value={(c.spent/c.allocated)*100} className="h-3" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
