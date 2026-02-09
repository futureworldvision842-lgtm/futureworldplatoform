"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Wrench, Check, ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  approvedBySociety: boolean;
  provider: { id: string; name: string; email: string; avatar: string | null };
};

function SocietyServicesContent() {
  const searchParams = useSearchParams();
  const societyId = searchParams.get("societyId");
  const [pending, setPending] = useState<Service[]>([]);
  const [approved, setApproved] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);

  useEffect(() => {
    if (!societyId) {
      setLoading(false);
      return;
    }
    Promise.all([
      fetch(`/api/societies/${societyId}/services?pendingOnly=true`).then((r) => r.json()),
      fetch(`/api/societies/${societyId}/services`).then((r) => r.json()),
    ])
      .then(([pendingData, allData]) => {
        setPending(pendingData.services || []);
        setApproved((allData.services || []).filter((s: Service) => s.approvedBySociety));
      })
      .catch(() => { setPending([]); setApproved([]); })
      .finally(() => setLoading(false));
  }, [societyId]);

  const handleApprove = async (serviceId: string) => {
    setActingId(serviceId);
    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approvedBySociety: true }),
      });
      if (res.ok) {
        const data = await res.json();
        setPending((prev) => prev.filter((s) => s.id !== serviceId));
        setApproved((prev) => [...prev, data.service]);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to approve");
      }
    } catch {
      alert("Failed");
    } finally {
      setActingId(null);
    }
  };

  if (!societyId) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Service Providers</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Select a society from the dashboard to manage service providers.</p>
            <Link href="/society" className="inline-block mt-4">
              <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Society Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Service Providers</h1>
          <p className="text-muted-foreground">Approve providers to list their services in your society.</p>
        </div>
        <Link href={`/society?societyId=${societyId}`}>
          <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Pending approval
          </CardTitle>
          <CardDescription>Services requested for this society. Approve to make them visible to members.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">No services pending approval.</p>
          ) : (
            pending.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h4 className="font-medium">{s.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1">{s.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {s.provider.name} · {s.category} · ${s.price}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleApprove(s.id)}
                  disabled={!!actingId}
                >
                  {actingId === s.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
                  Approve
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Approved services</CardTitle>
          <CardDescription>Listed for society members.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {approved.length === 0 ? (
            <p className="text-sm text-muted-foreground">No approved services yet.</p>
          ) : (
            approved.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h4 className="font-medium">{s.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1">{s.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.provider.name} · ${s.price}</p>
                </div>
                <Badge variant="secondary">Approved</Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function SocietyServicesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]"><p className="text-muted-foreground">Loading...</p></div>}>
      <SocietyServicesContent />
    </Suspense>
  );
}
