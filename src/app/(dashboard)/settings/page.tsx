"use client";

import { Settings, User, Shield, Bell, Globe2, Moon, Sun, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><User className="w-5 h-5" /> Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Full Name</Label><Input defaultValue="Muhammad Qureshi" /></div>
            <div><Label>Email</Label><Input defaultValue="muhammadqureshi865@gmail.com" /></div>
            <div><Label>Phone</Label><Input defaultValue="+92 333 9214600" /></div>
            <div><Label>Location</Label><Input defaultValue="Islamabad, Pakistan" /></div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Shield className="w-5 h-5" /> Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Current Password</Label><Input type="password" /></div>
          <div><Label>New Password</Label><Input type="password" /></div>
          <div><Label>Confirm Password</Label><Input type="password" /></div>
          <Button>Update Password</Button>
          <Separator />
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Two-Factor Authentication</p><p className="text-sm text-muted-foreground">Add an extra layer of security</p></div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Bell className="w-5 h-5" /> Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Voting Alerts", "Transaction Updates", "Society Announcements", "AI Insights", "System Updates"].map((item) => (
            <div key={item} className="flex items-center justify-between py-2">
              <span className="text-sm">{item}</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Globe2 className="w-5 h-5" /> Language & Region</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Language</Label><Input defaultValue="English" /></div>
          <div><Label>Timezone</Label><Input defaultValue="Asia/Karachi (PKT)" /></div>
          <div><Label>Currency</Label><Input defaultValue="USD" /></div>
        </CardContent>
      </Card>
    </div>
  );
}
