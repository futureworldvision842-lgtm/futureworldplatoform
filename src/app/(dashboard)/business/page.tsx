"use client";

import {
  Building2, Plus, Star, Users, DollarSign, TrendingUp, Package, BarChart3, Edit2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const demoBusinesses = [
  { id: "1", name: "TechVision Solutions", category: "Technology", rating: 4.8, employees: 5, revenue: 12500, status: "Active", services: 8 },
  { id: "2", name: "Green Energy Consulting", category: "Energy", rating: 4.9, employees: 3, revenue: 8200, status: "Active", services: 4 },
];

export default function BusinessPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Business Management</h1>
          <p className="text-muted-foreground">Register and manage your businesses on the platform</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
          <Plus className="w-4 h-4 mr-2" /> Register Business
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$20,700", icon: DollarSign, color: "text-green-600" },
          { label: "Employees", value: "8", icon: Users, color: "text-blue-600" },
          { label: "Active Services", value: "12", icon: Package, color: "text-purple-600" },
          { label: "Growth", value: "+24%", icon: TrendingUp, color: "text-orange-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {demoBusinesses.map((biz) => (
          <Card key={biz.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{biz.name}</h3>
                    <Badge variant="success">{biz.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{biz.category}</p>
                  <div className="flex gap-6 text-sm">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> {biz.rating}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {biz.employees} employees</span>
                    <span className="flex items-center gap-1"><Package className="w-4 h-4" /> {biz.services} services</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-green-600" /> ${biz.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm"><Edit2 className="w-4 h-4 mr-1" /> Manage</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
