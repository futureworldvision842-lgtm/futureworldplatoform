"use client";

import { useState } from "react";
import {
  Vote,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Shield,
  Brain,
  Filter,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const demoProposals = [
  {
    id: "1",
    title: "Community Solar Panel Installation Project",
    description: "Install solar panels on community center rooftop to reduce electricity costs by 60%. Budget: $15,000 from society fund.",
    level: "SOCIETY",
    status: "ACTIVE",
    author: "Amina Hassan",
    yesVotes: 145,
    noVotes: 32,
    abstainVotes: 8,
    totalVoters: 220,
    endDate: "2026-02-15",
    aiScore: 8.5,
    blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
  },
  {
    id: "2",
    title: "City Park Renovation and Green Space Expansion",
    description: "Renovate the central city park, add children's play area, jogging track, and plant 500 new trees. Estimated cost: $50,000.",
    level: "CITY",
    status: "ACTIVE",
    author: "Dr. Ahmed Khan",
    yesVotes: 2340,
    noVotes: 456,
    abstainVotes: 120,
    totalVoters: 5000,
    endDate: "2026-02-20",
    aiScore: 9.2,
    blockchainHash: "0x2b3c4d5e6f7890abcdef1234567890ab",
  },
  {
    id: "3",
    title: "National Free STEM Education Initiative",
    description: "Launch a nationwide free STEM education program for children aged 10-18 through community centers and online platforms.",
    level: "COUNTRY",
    status: "ACTIVE",
    author: "Ministry of Education",
    yesVotes: 45000,
    noVotes: 5600,
    abstainVotes: 2300,
    totalVoters: 100000,
    endDate: "2026-03-01",
    aiScore: 9.8,
    blockchainHash: "0x3c4d5e6f7890abcdef1234567890abcd",
  },
  {
    id: "4",
    title: "Global Climate Action Emergency Fund",
    description: "Create a transparent global fund for climate action, distributing resources based on AI-assessed priorities to vulnerable regions.",
    level: "GLOBAL",
    status: "ACTIVE",
    author: "G.A.I.G.S. Council",
    yesVotes: 1200000,
    noVotes: 180000,
    abstainVotes: 50000,
    totalVoters: 2000000,
    endDate: "2026-03-15",
    aiScore: 9.5,
    blockchainHash: "0x4d5e6f7890abcdef1234567890abcdef",
  },
];

const levelColors: Record<string, string> = {
  SOCIETY: "bg-green-100 text-green-800",
  CITY: "bg-blue-100 text-blue-800",
  COUNTRY: "bg-purple-100 text-purple-800",
  GLOBAL: "bg-orange-100 text-orange-800",
};

export default function VotingPage() {
  const [votedProposals, setVotedProposals] = useState<Record<string, string>>({});

  const handleVote = (proposalId: string, choice: string) => {
    setVotedProposals((prev) => ({ ...prev, [proposalId]: choice }));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Voting & Proposals</h1>
          <p className="text-muted-foreground">Cast your vote. Shape the future. Every vote is blockchain-verified.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
          <Plus className="w-4 h-4 mr-2" />
          Create Proposal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Vote className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Active Proposals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-2xl font-bold">2.1M</div>
            <p className="text-sm text-muted-foreground">Total Voters</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-2xl font-bold">100%</div>
            <p className="text-sm text-muted-foreground">Blockchain Verified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-2xl font-bold">AI</div>
            <p className="text-sm text-muted-foreground">Impact Analysis</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Levels</TabsTrigger>
          <TabsTrigger value="society">Society</TabsTrigger>
          <TabsTrigger value="city">City</TabsTrigger>
          <TabsTrigger value="country">Country</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Proposals */}
      <div className="space-y-4">
        {demoProposals.map((proposal) => {
          const totalVotes = proposal.yesVotes + proposal.noVotes + proposal.abstainVotes;
          const yesPercent = Math.round((proposal.yesVotes / totalVotes) * 100);
          const noPercent = Math.round((proposal.noVotes / totalVotes) * 100);
          const hasVoted = votedProposals[proposal.id];

          return (
            <Card key={proposal.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[proposal.level]}`}>
                        {proposal.level}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        Ends {new Date(proposal.endDate).toLocaleDateString()}
                      </Badge>
                      <div className="flex items-center gap-1 ml-auto">
                        <Brain className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium">AI Score: {proposal.aiScore}/10</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{proposal.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Proposed by: {proposal.author} | Hash: <code className="font-mono">{proposal.blockchainHash.substring(0, 16)}...</code>
                    </p>

                    {/* Vote Results */}
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 font-medium">
                          Yes: {formatNumber(proposal.yesVotes)} ({yesPercent}%)
                        </span>
                        <span className="text-red-600 font-medium">
                          No: {formatNumber(proposal.noVotes)} ({noPercent}%)
                        </span>
                      </div>
                      <div className="flex h-3 rounded-full overflow-hidden bg-muted">
                        <div
                          className="bg-green-500 transition-all"
                          style={{ width: `${yesPercent}%` }}
                        />
                        <div
                          className="bg-red-500 transition-all"
                          style={{ width: `${noPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        {formatNumber(totalVotes)} votes cast of {formatNumber(proposal.totalVoters)} eligible voters
                      </p>
                    </div>
                  </div>

                  {/* Vote Buttons */}
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    {hasVoted ? (
                      <div className="text-center p-4 rounded-lg bg-accent">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-sm font-medium">You voted: {hasVoted}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <Shield className="w-3 h-3 inline mr-1" />
                          Blockchain verified
                        </p>
                      </div>
                    ) : (
                      <>
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleVote(proposal.id, "YES")}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Vote Yes
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleVote(proposal.id, "NO")}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Vote No
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleVote(proposal.id, "ABSTAIN")}
                        >
                          Abstain
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
