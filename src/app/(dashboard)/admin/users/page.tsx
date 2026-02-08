"use client";
import { Users, Search, Shield, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const users = [
  { name: "Muhammad Qureshi", email: "muhammadqureshi865@gmail.com", role: "SUPER_ADMIN", verified: true, joined: "2024-01-15", status: "Active" },
  { name: "Abdul Ghaffar", email: "ghaffar@email.com", role: "SOCIETY_ADMIN", verified: true, joined: "2024-01-15", status: "Active" },
  { name: "Dr. Ahmed Khan", email: "ahmed@email.com", role: "CITY_ADMIN", verified: true, joined: "2024-02-01", status: "Active" },
  { name: "Sara Ahmed", email: "sara@email.com", role: "COUNTRY_ADMIN", verified: true, joined: "2024-02-15", status: "Active" },
  { name: "Ali Hassan", email: "ali@email.com", role: "USER", verified: true, joined: "2024-03-20", status: "Active" },
  { name: "Fatima Shah", email: "fatima@email.com", role: "USER", verified: false, joined: "2024-04-10", status: "Pending" },
  { name: "John Smith", email: "john@email.com", role: "GLOBAL_ADMIN", verified: true, joined: "2024-01-20", status: "Active" },
  { name: "Usman Khan", email: "usman@email.com", role: "USER", verified: true, joined: "2024-05-15", status: "Active" },
];

const roleColors: Record<string, string> = {
  SUPER_ADMIN: "bg-red-100 text-red-800", GLOBAL_ADMIN: "bg-orange-100 text-orange-800",
  COUNTRY_ADMIN: "bg-yellow-100 text-yellow-800", CITY_ADMIN: "bg-purple-100 text-purple-800",
  SOCIETY_ADMIN: "bg-green-100 text-green-800", USER: "bg-blue-100 text-blue-800",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search users..." className="pl-10" /></div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium">User</th>
                  <th className="text-left p-4 text-sm font-medium">Role</th>
                  <th className="text-left p-4 text-sm font-medium">Verified</th>
                  <th className="text-left p-4 text-sm font-medium">Joined</th>
                  <th className="text-left p-4 text-sm font-medium">Status</th>
                  <th className="text-left p-4 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-t hover:bg-accent/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8"><AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs">{u.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                        <div><p className="font-medium text-sm">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
                      </div>
                    </td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[u.role]}`}>{u.role.replace("_", " ")}</span></td>
                    <td className="p-4">{u.verified ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}</td>
                    <td className="p-4 text-sm text-muted-foreground">{new Date(u.joined).toLocaleDateString()}</td>
                    <td className="p-4"><Badge variant={u.status === "Active" ? "success" : "warning"}>{u.status}</Badge></td>
                    <td className="p-4"><Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
