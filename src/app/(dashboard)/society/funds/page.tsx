"use client";

import { DollarSign, TrendingUp, TrendingDown, Shield, Download, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const budgetItems = [
  { category: "Infrastructure", allocated: 8000, spent: 5200, color: "bg-blue-500" },
  { category: "Education", allocated: 3000, spent: 2100, color: "bg-green-500" },
  { category: "Healthcare", allocated: 2000, spent: 800, color: "bg-purple-500" },
  { category: "Events", allocated: 1500, spent: 1200, color: "bg-orange-500" },
  { category: "Emergency Fund", allocated: 930, spent: 0, color: "bg-red-500" },
];

const transactions = [
  { desc: "Monthly dues - January", amount: 2560, type: "INCOME", hash: "0x1a2b3c...", date: "Jan 31" },
  { desc: "Solar panel deposit", amount: -5000, type: "EXPENSE", hash: "0x4d5e6f...", date: "Jan 28" },
  { desc: "Community donation", amount: 1200, type: "INCOME", hash: "0x7g8h9i...", date: "Jan 25" },
  { desc: "Library books purchase", amount: -800, type: "EXPENSE", hash: "0xab12cd...", date: "Jan 20" },
  { desc: "Event revenue", amount: 450, type: "INCOME", hash: "0xef34gh...", date: "Jan 15" },
  { desc: "Maintenance costs", amount: -350, type: "EXPENSE", hash: "0xij56kl...", date: "Jan 10" },
];

function SocietyFundsContent() {
  const searchParams = useSearchParams();
  const societyId = searchParams.get("societyId");
  const totalBudget = budgetItems.reduce((a, b) => a + b.allocated, 0);
  const totalSpent = budgetItems.reduce((a, b) => a + b.spent, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Society Funds</h1>
          <p className="text-muted-foreground flex items-center gap-1"><Shield className="w-4 h-4" /> All transactions are blockchain verified and publicly transparent</p>
          {societyId && (
            <Link href={`/society?societyId=${societyId}`} className="text-sm text-muted-foreground hover:underline inline-block mt-1">
              ← Back to Dashboard
            </Link>
          )}
        </div>
        <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export Report</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <CardContent className="p-5">
            <p className="text-blue-100 text-sm">Total Balance</p>
            <p className="text-3xl font-bold mt-1">$15,430</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-green-600 mb-1"><TrendingUp className="w-4 h-4" /><span className="text-sm">Total Income</span></div>
            <p className="text-2xl font-bold">+$4,210</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-red-600 mb-1"><TrendingDown className="w-4 h-4" /><span className="text-sm">Total Expenses</span></div>
            <p className="text-2xl font-bold">-$6,150</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Budget Allocation</CardTitle><CardDescription>Budget: ${totalBudget.toLocaleString()} | Spent: ${totalSpent.toLocaleString()}</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {budgetItems.map((item) => (
            <div key={item.category}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.category}</span>
                <span className="text-muted-foreground">${item.spent.toLocaleString()} / ${item.allocated.toLocaleString()}</span>
              </div>
              <Progress value={(item.spent / item.allocated) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Transaction Ledger</CardTitle><CardDescription>Complete transparent financial record</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${tx.type === "INCOME" ? "bg-green-50" : "bg-red-50"}`}>
                    {tx.type === "INCOME" ? <ArrowDownLeft className="w-4 h-4 text-green-600" /> : <ArrowUpRight className="w-4 h-4 text-red-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.desc}</p>
                    <code className="text-xs text-muted-foreground">{tx.hash}</code>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.type === "INCOME" ? "text-green-600" : "text-red-600"}`}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SocietyFundsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]"><p className="text-muted-foreground">Loading...</p></div>}>
      <SocietyFundsContent />
    </Suspense>
  );
}
