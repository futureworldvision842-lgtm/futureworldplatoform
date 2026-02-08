"use client";

import Link from "next/link";
import {
  Globe2,
  Vote,
  Shield,
  Brain,
  Users,
  Gamepad2,
  TrendingUp,
  Eye,
  Wallet,
  Building2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Lock,
  BarChart3,
  Heart,
  Zap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Target Users", value: "8B+", icon: Users },
  { label: "Societies Connected", value: "1,000+", icon: Building2 },
  { label: "Transparent Votes", value: "100%", icon: Vote },
  { label: "Fund Tracking", value: "Real-time", icon: Eye },
];

const pillars = [
  {
    title: "Transparent Democracy",
    description:
      "Blockchain-based voting system with real-time tracking. Every vote is immutable, verifiable, and transparent. Direct democracy from society to global level.",
    icon: Vote,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Community Unity Hubs",
    description:
      "Connect every mosque, church, temple, and community center. Manage local affairs, elect leaders through voting, and coordinate resources transparently.",
    icon: Users,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Blockchain Transparency",
    description:
      "Every rupee, every dollar is traceable. Government spending tracked in real-time. No hidden contracts, no corruption. Complete financial transparency.",
    icon: Shield,
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Scientific Gamification",
    description:
      "Real-world physics-based games where playing means solving real problems. Turn 8 billion humans into potential scientists advancing space exploration.",
    icon: Gamepad2,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "AI-Assisted Governance",
    description:
      "AI monitors corruption, suggests solutions, analyzes policies, and ensures fair decision-making. Powered by advanced models with ethical oversight.",
    icon: Brain,
    color: "from-pink-500 to-rose-500",
  },
];

const governanceLevels = [
  {
    level: "Individual",
    description: "Personal profile, wallet, services, voting participation",
    icon: "👤",
  },
  {
    level: "Society",
    description: "Mosque, church, temple, community center governance",
    icon: "🏛️",
  },
  {
    level: "City",
    description: "City-wide projects, budgets, and transparent administration",
    icon: "🏙️",
  },
  {
    level: "Country",
    description: "National policies, disaster management, budget transparency",
    icon: "🗺️",
  },
  {
    level: "Global",
    description: "UN-level coordination, global issues, international aid",
    icon: "🌍",
  },
];

const features = [
  {
    title: "Social Networking",
    description: "Full profiles like Facebook & LinkedIn with skills and work history",
    icon: Users,
  },
  {
    title: "Integrated Banking",
    description: "Wallets for PayPal, Crypto, IBAN with live tracking",
    icon: Wallet,
  },
  {
    title: "Service Marketplace",
    description: "Like Uber + Upwork + Foodpanda in one platform",
    icon: Building2,
  },
  {
    title: "Transparent Voting",
    description: "Blockchain-verified votes at every governance level",
    icon: Vote,
  },
  {
    title: "AI Governance Support",
    description: "AI tracks issues and suggests data-driven solutions",
    icon: Brain,
  },
  {
    title: "Live Fund Tracking",
    description: "Every donation and tax rupee is transparently traceable",
    icon: Eye,
  },
  {
    title: "Corruption Detection",
    description: "AI algorithms monitor and flag suspicious activities",
    icon: Shield,
  },
  {
    title: "Global Disaster Response",
    description: "Instant worldwide notification and transparent aid collection",
    icon: Heart,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">G.A.I.G.S.</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#pillars" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Five Pillars
              </a>
              <a href="#governance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Governance
              </a>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: "4s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                The Future of Global Governance is Here
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="gradient-text">Global AI-Powered</span>
              <br />
              <span className="text-foreground">Governance System</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              A revolutionary decentralized platform combining AI, blockchain, and direct democracy
              to create transparent, corruption-free governance — from your local community to the
              entire world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25">
                  Join the Movement
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#pillars">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Explore the Vision
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border shadow-sm"
                >
                  <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Five Pillars */}
      <section id="pillars" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Five Pillars</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five foundational pillars that will transform how humanity governs itself
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <Card
                key={pillar.title}
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <pillar.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Hierarchy */}
      <section id="governance" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Multi-Level Governance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From individual citizens to the global stage — democracy at every level
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            {governanceLevels.map((level, index) => (
              <div key={level.level} className="w-full max-w-2xl">
                <div
                  className="flex items-center gap-4 p-5 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow"
                  style={{
                    marginLeft: `${index * 20}px`,
                    marginRight: `${(4 - index) * 20}px`,
                  }}
                >
                  <span className="text-3xl">{level.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{level.level} Level</h3>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                  {index < governanceLevels.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground rotate-90" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              One Platform, Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Social media + Banking + Governance + Marketplace + AI — all in one
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border bg-white hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Four simple steps to transform governance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Register & Connect",
                description: "Create your profile, join your local society, connect with your community",
                icon: Users,
              },
              {
                step: "02",
                title: "Participate & Vote",
                description: "Vote on proposals, discuss issues, contribute to decisions at every level",
                icon: Vote,
              },
              {
                step: "03",
                title: "Track & Verify",
                description: "Monitor all funds transparently, verify every transaction on the blockchain",
                icon: Eye,
              },
              {
                step: "04",
                title: "Grow & Innovate",
                description: "Build businesses, solve problems through games, advance science together",
                icon: TrendingUp,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="text-sm font-bold text-blue-200 mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powered by Cutting-Edge Technology
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border">
              <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Artificial Intelligence</h3>
              <p className="text-muted-foreground">
                Google Gemini Pro powers policy analysis, corruption detection, and smart
                governance suggestions with ethical oversight.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl border">
              <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
              <p className="text-muted-foreground">
                Every vote and every transaction is hashed and verified on an immutable
                blockchain ledger. No tampering possible.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl border">
              <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-muted-foreground">
                Live dashboards tracking funds, governance metrics, community health, and
                global impact in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About & Vision */}
      <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                A Vision for All Humanity
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Created by Muhammad Qureshi from Islamabad, Pakistan, G.A.I.G.S. is inspired by the
                vision of building governance systems that serve every human being — regardless of
                faith, nationality, or background.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                From the historic model of Masjid-e-Nabawi — where community, justice, and
                consultation formed the pillars of governance — to the cutting-edge AI era, this
                platform bridges tradition and innovation.
              </p>
              <div className="space-y-3">
                {[
                  "Corruption-free governance for every nation",
                  "Every child can become a scientist or leader",
                  "Resources protected and equitably distributed",
                  "Youth solving real-world problems through games",
                  "A peaceful alliance advancing space exploration",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">MQ</span>
                </div>
                <h3 className="text-xl font-bold">Muhammad Qureshi</h3>
                <p className="text-muted-foreground">Founder & Visionary</p>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Islamic Scholar, AI Enthusiast, and Systems Architect from Islamabad, Pakistan.
                </p>
                <p>
                  Son of Abdul Ghaffar Qureshi, founder of Jamia Masjid Nabvi Qureshi Hashmi,
                  G-11/4 Islamabad — built on the model of Masjid-e-Nabawi.
                </p>
                <p>
                  On a mission to create a just, transparent, and united world through technology.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t space-y-2 text-sm">
                <p className="text-muted-foreground">
                  Email: muhammadqureshi865@gmail.com
                </p>
                <p className="text-muted-foreground">
                  WhatsApp: +92 333 9214600
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join 8 Billion Humans in Building a Better World
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            This is not just a platform — it is a movement. A mission. A transformation of
            civilization itself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="text-lg px-10 bg-white text-blue-600 hover:bg-blue-50 shadow-xl"
              >
                <Zap className="mr-2 w-5 h-5" />
                Get Started Now
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 border-white text-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">G.A.I.G.S.</span>
              </div>
              <p className="text-sm">
                Global AI-Powered Governance System. For humanity, by humanity.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/register" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><a href="#pillars" className="hover:text-white transition-colors">Five Pillars</a></li>
                <li><a href="#governance" className="hover:text-white transition-colors">Governance</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Governance</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-white transition-colors cursor-default">Society Admin</span></li>
                <li><span className="hover:text-white transition-colors cursor-default">City Admin</span></li>
                <li><span className="hover:text-white transition-colors cursor-default">Country Admin</span></li>
                <li><span className="hover:text-white transition-colors cursor-default">Global Admin</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Muhammad Qureshi</li>
                <li>muhammadqureshi865@gmail.com</li>
                <li>+92 333 9214600</li>
                <li>Islamabad, Pakistan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} G.A.I.G.S. — Global AI-Powered Governance System. All rights reserved.</p>
            <p className="mt-2 text-xs text-slate-500">
              Built with the vision of &ldquo;The Great Convergence&rdquo; by Muhammad Qureshi
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
