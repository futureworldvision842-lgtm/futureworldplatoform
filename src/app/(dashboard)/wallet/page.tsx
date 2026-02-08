"use client";

import { useState } from "react";
import {
  Wallet,
  Send,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  CreditCard,
  DollarSign,
  TrendingUp,
  Shield,
  Copy,
  QrCode,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const demoTransactions = [
  { id: "1", type: "RECEIVED", from: "Society Fund", amount: 500, hash: "0x1a2b3c...4d5e", time: "2h ago", verified: true },
  { id: "2", type: "SENT", to: "Community Project", amount: 200, hash: "0x5f6g7h...8i9j", time: "5h ago", verified: true },
  { id: "3", type: "DONATION", to: "Earthquake Relief", amount: 100, hash: "0x2k3l4m...5n6o", time: "1d ago", verified: true },
  { id: "4", type: "RECEIVED", from: "Service Payment", amount: 350, hash: "0x7p8q9r...0s1t", time: "2d ago", verified: true },
  { id: "5", type: "SENT", to: "Education Fund", amount: 150, hash: "0x3u4v5w...6x7y", time: "3d ago", verified: true },
  { id: "6", type: "RECEIVED", from: "Monthly Salary", amount: 2000, hash: "0x8z9a0b...1c2d", time: "5d ago", verified: true },
];

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Wallet & Finance</h1>

      {/* Your blockchain identity */}
      <Card className="border-primary/30 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Your G.A.I.G.S. Blockchain Account</h3>
              <p className="text-sm text-muted-foreground">
                Every user has a single identity on our platform. Your wallet is your blockchain account: every payment, donation, and vote is recorded on the chain and is transparent and tamper-proof. You own your data and your voice — no central authority can alter it.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Wallet ID: 0xGAIGS... (linked to your profile). All transactions below are verified on-chain.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-blue-100 text-sm">Total Balance</p>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-4xl font-bold">
                    {showBalance ? "$3,400.00" : "••••••"}
                  </h2>
                  <button onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? (
                      <EyeOff className="w-5 h-5 text-blue-200" />
                    ) : (
                      <Eye className="w-5 h-5 text-blue-200" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <Shield className="w-4 h-4" />
                Blockchain Verified
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
              <Button className="bg-white/20 hover:bg-white/30 text-white">
                <Download className="w-4 h-4 mr-2" />
                Receive
              </Button>
              <Button className="bg-white/20 hover:bg-white/30 text-white">
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Income This Month</p>
                  <p className="text-xl font-bold text-green-600">+$2,850</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-50">
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Spent This Month</p>
                  <p className="text-xl font-bold text-red-600">-$450</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Transaction History</CardTitle>
              <CardDescription>All transactions are blockchain-verified and transparent</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {demoTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      tx.type === "RECEIVED"
                        ? "bg-green-50"
                        : tx.type === "DONATION"
                        ? "bg-purple-50"
                        : "bg-red-50"
                    }`}
                  >
                    {tx.type === "RECEIVED" ? (
                      <ArrowDownLeft className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {tx.type === "RECEIVED" ? `From: ${tx.from}` : `To: ${tx.to}`}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <code className="text-xs text-muted-foreground font-mono">{tx.hash}</code>
                      <Copy className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground" />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      tx.type === "RECEIVED" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type === "RECEIVED" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs text-muted-foreground">{tx.time}</span>
                    {tx.verified && (
                      <Shield className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
