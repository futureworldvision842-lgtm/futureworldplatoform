"use client";

import { useState } from "react";
import {
  MessageSquare,
  Heart,
  Share2,
  Send,
  MoreHorizontal,
  Image,
  Plus,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const demoPosts = [
  {
    id: "1",
    author: "Muhammad Qureshi",
    avatar: "MQ",
    role: "Platform Founder",
    type: "ANNOUNCEMENT",
    content:
      "Exciting news! G.A.I.G.S. platform is now live with blockchain-verified voting and AI-powered governance support. Join us in building transparent governance for all humanity. Together, we can create a corruption-free world!",
    likes: 234,
    comments: 45,
    time: "2 hours ago",
    society: "G.A.I.G.S. Global",
  },
  {
    id: "2",
    author: "Amina Hassan",
    avatar: "AH",
    role: "Society Admin",
    type: "DISCUSSION",
    content:
      "Our society just completed the solar panel installation project! Thanks to transparent fund tracking, every member can verify how the $12,000 budget was spent. This is democracy at work!",
    likes: 156,
    comments: 32,
    time: "5 hours ago",
    society: "Green Community Hub",
  },
  {
    id: "3",
    author: "Dr. Ahmed Khan",
    avatar: "AK",
    role: "City Admin",
    type: "ISSUE",
    content:
      "Attention Islamabad residents: Water supply issue reported in G-11 sector. I've created a proposal for emergency fund allocation. Please vote on it within the next 48 hours. AI analysis suggests this affects approximately 5,000 households.",
    likes: 89,
    comments: 67,
    time: "8 hours ago",
    society: "Islamabad City Council",
  },
  {
    id: "4",
    author: "Sarah Johnson",
    avatar: "SJ",
    role: "Scientist",
    type: "IDEA",
    content:
      "I've been working on a physics simulation in the G.A.I.G.S. science game and discovered a more efficient algorithm for water purification! The AI validated my approach. Can we get community funding to build a prototype?",
    likes: 312,
    comments: 98,
    time: "1 day ago",
    society: "Global Science Hub",
  },
  {
    id: "5",
    author: "Ibrahim Ali",
    avatar: "IA",
    role: "Community Member",
    type: "EVENT",
    content:
      "Reminder: Community cleanup drive this Saturday at 9 AM. All society members are invited. Let's make our neighborhood beautiful! Refreshments will be provided by the society fund (transparently tracked, of course).",
    likes: 45,
    comments: 12,
    time: "2 days ago",
    society: "Masjid Nabvi Community",
  },
];

const typeColors: Record<string, string> = {
  DISCUSSION: "secondary",
  ANNOUNCEMENT: "default",
  ISSUE: "destructive",
  IDEA: "success",
  EVENT: "warning",
};

export default function FeedPage() {
  const [newPost, setNewPost] = useState("");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Community Feed</h1>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Create Post */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                MQ
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your thoughts, ideas, or announcements with the community..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Image className="w-4 h-4 mr-1" />
                    Photo
                  </Button>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500"
                  disabled={!newPost.trim()}
                >
                  <Send className="w-4 h-4 mr-1" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Posts */}
      <div className="space-y-4">
        {demoPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-sm">
                    {post.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{post.author}</span>
                    <span className="text-xs text-muted-foreground">• {post.role}</span>
                    <Badge variant={typeColors[post.type] as any} className="text-[10px] ml-auto">
                      {post.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {post.society} • {post.time}
                  </p>
                  <p className="text-sm leading-relaxed mb-4">{post.content}</p>
                  <div className="flex items-center gap-6 text-muted-foreground">
                    <button className="flex items-center gap-1.5 text-sm hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm hover:text-blue-500 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm hover:text-green-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
