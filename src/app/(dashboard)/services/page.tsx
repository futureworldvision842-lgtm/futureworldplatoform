"use client";

import {
  ShoppingBag,
  Plus,
  Star,
  MapPin,
  DollarSign,
  Search,
  Filter,
  Briefcase,
  Wrench,
  Truck,
  GraduationCap,
  Heart,
  Code,
  ChefHat,
  Car,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { name: "Technology", icon: Code, count: 234 },
  { name: "Education", icon: GraduationCap, count: 156 },
  { name: "Healthcare", icon: Heart, count: 89 },
  { name: "Transportation", icon: Car, count: 178 },
  { name: "Food & Delivery", icon: ChefHat, count: 267 },
  { name: "Maintenance", icon: Wrench, count: 145 },
  { name: "Logistics", icon: Truck, count: 92 },
  { name: "Business", icon: Briefcase, count: 198 },
];

const demoServices = [
  {
    id: "1",
    title: "Full Stack Web Development",
    provider: "Ali Hassan",
    avatar: "AH",
    rating: 4.9,
    reviews: 48,
    price: 50,
    priceUnit: "/hr",
    location: "Islamabad",
    category: "Technology",
    description: "Expert in React, Next.js, Node.js. I build scalable web applications with modern tech stack.",
  },
  {
    id: "2",
    title: "Home Tutoring - Mathematics & Physics",
    provider: "Dr. Fatima Shah",
    avatar: "FS",
    rating: 4.8,
    reviews: 92,
    price: 30,
    priceUnit: "/hr",
    location: "Islamabad, G-11",
    category: "Education",
    description: "PhD in Physics. 10+ years teaching experience. O-Level to University level.",
  },
  {
    id: "3",
    title: "Ride Service - City Travel",
    provider: "Usman Khan",
    avatar: "UK",
    rating: 4.7,
    reviews: 256,
    price: 15,
    priceUnit: "/trip",
    location: "Islamabad & Rawalpindi",
    category: "Transportation",
    description: "Clean, comfortable car. Punctual service. Available 24/7 for city rides.",
  },
  {
    id: "4",
    title: "Home Cooked Meals Delivery",
    provider: "Amna Bibi",
    avatar: "AB",
    rating: 5.0,
    reviews: 134,
    price: 8,
    priceUnit: "/meal",
    location: "G-11, G-10, G-9",
    category: "Food & Delivery",
    description: "Fresh, hygienic home-cooked Pakistani meals. Daily menu available. Family recipes!",
  },
  {
    id: "5",
    title: "Plumbing & Electrical Services",
    provider: "Muhammad Aslam",
    avatar: "MA",
    rating: 4.6,
    reviews: 67,
    price: 25,
    priceUnit: "/visit",
    location: "Islamabad",
    category: "Maintenance",
    description: "Licensed plumber and electrician. Emergency services available. 20 years experience.",
  },
  {
    id: "6",
    title: "AI & Blockchain Consulting",
    provider: "Sara Ahmed",
    avatar: "SA",
    rating: 4.9,
    reviews: 23,
    price: 100,
    priceUnit: "/hr",
    location: "Remote / Islamabad",
    category: "Technology",
    description: "AI strategy, blockchain integration, and digital transformation consulting for businesses.",
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Service Marketplace</h1>
          <p className="text-muted-foreground">Find services or offer your skills — like Uber + Upwork in one</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ShoppingBag className="w-4 h-4 mr-2" />
            My Orders
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            Offer Service
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search services..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className="p-3 rounded-xl border hover:bg-accent hover:border-blue-200 transition-all text-center"
          >
            <cat.icon className="w-6 h-6 mx-auto mb-1 text-blue-600" />
            <p className="text-xs font-medium">{cat.name}</p>
            <p className="text-[10px] text-muted-foreground">{cat.count} services</p>
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-sm">
                    {service.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.provider}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <div className="flex items-center gap-3 mb-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{service.rating}</span>
                  <span className="text-muted-foreground">({service.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {service.location}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-blue-600">${service.price}</span>
                  <span className="text-sm text-muted-foreground">{service.priceUnit}</span>
                </div>
                <Button size="sm">Hire Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
