"use client";

import { DollarSign, TrendingUp, Shield, Download, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const budgetCategories = [
  { name: "Infrastructure", allocated: 800000, spent: 520000 },
  { name: "Education", allocated: 400000, spent: 280000 },
  { name: "Healthcare", allocated: 350000, spent: 200000 },
  { name: "Public Safety", allocated: 250000, spent: 180000 },
  { name: "Environment", allocated: 200000, spent: 120000 },
  { name: "Technology", allocated: 150000, spent: 80000 },
  { name: "Emergency Fund", allocated: 150000, spent: 0 },
];

export default function CityBudgetPage() {
  const total = budgetCategories.reduce((a, b) => a + b.allocated, 0);
  const spent = budgetCategories.reduce((a, b) => a + b.spent, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">City Budget</h1>
          <p className="text-muted-foreground flex items-center gap-1"><Eye className="w-4 h-4" /> 100% transparent — visible to all citizens</p>
        </div>
        <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <CardContent className="p-5">
            <p className="text-purple-100 text-sm">Total Budget</p>
            <p className="text-3xl font-bold">${(total / 1000000).toFixed(1)}M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-green-600 mb-1"><TrendingUp className="w-4 h-4" /><span className="text-sm">Allocated</span></div>
            <p className="text-2xl font-bold">${(total / 1000000).toFixed(2)}M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-blue-600 mb-1"><DollarSign className="w-4 h-4" /><span className="text-sm">Spent</span></div>
            <p className="text-2xl font-bold">${(spent / 1000000).toFixed(2)}M</p>
            <p className="text-xs text-muted-foreground">{Math.round((spent / total) * 100)}% utilized</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Budget by Category</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {budgetCategories.map((cat) => (
            <div key={cat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{cat.name}</span>
                <span className="text-muted-foreground">${(cat.spent / 1000).toFixed(0)}K / ${(cat.allocated / 1000).toFixed(0)}K ({Math.round((cat.spent / cat.allocated) * 100)}%)</span>
              </div>
              <Progress value={(cat.spent / cat.allocated) * 100} className="h-3" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
