"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Bell, Search, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/store";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

export default function Header() {
  const { data: session } = useSession();
  const { isOpen } = useSidebar();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-background/95 backdrop-blur-sm border-b flex items-center px-6 transition-all duration-300",
        isOpen ? "left-64" : "left-16"
      )}
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search proposals, services, users..."
            className="pl-10 bg-muted/50 border-none"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        </Link>

        {/* User Menu */}
        {session?.user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">{session.user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {((session.user as any).role || "USER").toLowerCase().replace("_", " ")}
              </p>
            </div>
            <Link href="/profile">
              <Avatar className="cursor-pointer">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-sm">
                  {getInitials(session.user.name || "U")}
                </AvatarFallback>
              </Avatar>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: "/" })}
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button size="sm">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
