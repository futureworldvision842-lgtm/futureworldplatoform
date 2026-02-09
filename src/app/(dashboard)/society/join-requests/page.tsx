"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserPlus, Check, X, ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type JoinRequest = {
  id: string;
  status: string;
  message: string;
  createdAt: string;
  user: { id: string; name: string; email: string; phone: string | null; address: string | null; cnic: string | null };
};

function JoinRequestsContent() {
  const searchParams = useSearchParams();
  const societyId = searchParams.get("societyId");
  const { data: session, status } = useSession();
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);

  useEffect(() => {
    if (!societyId || status !== "authenticated") {
      setLoading(false);
      return;
    }
    fetch(`/api/societies/${societyId}/join-request`)
      .then((res) => res.json())
      .then((data) => setRequests(data.requests || []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, [societyId, status]);

  const handleReview = async (requestId: string, approve: boolean) => {
    setActingId(requestId);
    try {
      const res = await fetch(`/api/societies/${societyId}/join-request/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: approve ? "APPROVED" : "REJECTED" }),
      });
      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r.id !== requestId));
      } else {
        const data = await res.json();
        alert(data.error || "Failed");
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
        <h1 className="text-2xl font-bold">Join Requests</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Select a society from the dashboard to view join requests.</p>
            <Link href="/society" className="inline-block mt-4">
              <Button variant="outline">← Society Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pending = requests.filter((r) => r.status === "PENDING");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UserPlus className="w-7 h-7" />
            Join Requests
          </h1>
          <p className="text-muted-foreground">Approve or reject members who want to join this society.</p>
        </div>
        <Link href={`/society?societyId=${societyId}`}>
          <Button variant="outline" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Back to Dashboard</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : pending.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No pending join requests.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pending.map((req) => (
            <Card key={req.id}>
              <CardContent className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{req.user.name}</p>
                    <p className="text-sm text-muted-foreground">{req.user.email}</p>
                    {req.user.phone && <p className="text-sm text-muted-foreground">{req.user.phone}</p>}
                    {req.user.address && <p className="text-sm text-muted-foreground">{req.user.address}</p>}
                    {req.user.cnic && (
                      <p className="text-xs text-muted-foreground mt-1">CNIC: {req.user.cnic}</p>
                    )}
                    {req.message && (
                      <p className="text-sm mt-2 italic">&ldquo;{req.message}&rdquo;</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Requested {new Date(req.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleReview(req.id, true)}
                      disabled={!!actingId}
                    >
                      {actingId === req.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReview(req.id, false)}
                      disabled={!!actingId}
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SocietyJoinRequestsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]"><p className="text-muted-foreground">Loading...</p></div>}>
      <JoinRequestsContent />
    </Suspense>
  );
}
