"use client";
import { Settings, Shield, Database, Globe2, Brain, Bell, Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">System Settings</h1>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Globe2 className="w-5 h-5" /> Platform Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Platform Name</Label><Input defaultValue="G.A.I.G.S. - Global AI-Powered Governance System" /></div>
          <div><Label>Platform URL</Label><Input defaultValue="https://gaigs.platform" /></div>
          <div className="flex items-center justify-between"><div><p className="font-medium">Maintenance Mode</p><p className="text-sm text-muted-foreground">Temporarily disable platform access</p></div><Badge variant="success">Off</Badge></div>
          <div className="flex items-center justify-between"><div><p className="font-medium">Registration</p><p className="text-sm text-muted-foreground">Allow new user registrations</p></div><Badge variant="success">Open</Badge></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Brain className="w-5 h-5" /> AI Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>AI Model</Label><Input defaultValue="Google Gemini Pro" disabled /></div>
          <div><Label>API Key Status</Label><Badge variant="success">Connected</Badge></div>
          <div className="flex items-center justify-between"><div><p className="font-medium">AI Policy Analysis</p><p className="text-sm text-muted-foreground">Enable AI analysis for all proposals</p></div><Badge variant="success">Enabled</Badge></div>
          <div className="flex items-center justify-between"><div><p className="font-medium">Corruption Detection</p><p className="text-sm text-muted-foreground">AI-powered anomaly detection</p></div><Badge variant="success">Active</Badge></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Shield className="w-5 h-5" /> Security Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><div><p className="font-medium">Two-Factor Authentication</p><p className="text-sm text-muted-foreground">Require 2FA for admin roles</p></div><Badge variant="success">Required</Badge></div>
          <div className="flex items-center justify-between"><div><p className="font-medium">Rate Limiting</p><p className="text-sm text-muted-foreground">API rate limiting per user</p></div><Badge variant="success">100/min</Badge></div>
          <div className="flex items-center justify-between"><div><p className="font-medium">Blockchain Verification</p><p className="text-sm text-muted-foreground">Verify all votes and transactions</p></div><Badge variant="success">Active</Badge></div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
