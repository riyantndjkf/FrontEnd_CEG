"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Swords,
  User,
  Circle,
  Gamepad2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

// Assuming you have these Shadcn UI components installed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function RallyPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Mock API Call
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock Data matching schema
      const mockData = [
        { id: 1, name_pos: "Cyber Archery", tipe: "Single", status: "KOSONG" },
        {
          id: 2,
          name_pos: "Neon Showdown",
          tipe: "Battle",
          status: "MENUNGGU",
        },
        {
          id: 3,
          name_pos: "Logic Gate Run",
          tipe: "Single",
          status: "BERMAIN",
        },
        { id: 4, name_pos: "Binary Brawl", tipe: "Battle", status: "KOSONG" },
        { id: 5, name_pos: "Quantum Chess", tipe: "Battle", status: "BERMAIN" },
        { id: 6, name_pos: "Syntax Sniper", tipe: "Single", status: "KOSONG" },
        {
          id: 7,
          name_pos: "Data Stream Duel",
          tipe: "Battle",
          status: "MENUNGGU",
        },
        { id: 8, name_pos: "Pixel Puzzle", tipe: "Single", status: "KOSONG" },
      ];

      setPosts(mockData);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // 2. Filter Logic
  const filteredPosts = posts.filter((post) =>
    post.name_pos.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 3. Helper for Status UI
  const getStatusConfig = (status) => {
    switch (status) {
      case "KOSONG":
        return {
          color: "text-emerald-400",
          badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          label: "Available",
          interactive: true,
        };
      case "MENUNGGU":
        return {
          color: "text-amber-400",
          badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          label: "Looking for Opponent",
          interactive: true,
        };
      case "BERMAIN":
        return {
          color: "text-red-500",
          badge: "bg-red-500/10 text-red-500 border-red-500/20",
          label: "In Progress",
          interactive: false,
        };
      default:
        return {
          color: "text-zinc-500",
          badge: "bg-zinc-500/10 text-zinc-400",
          label: "Unknown",
          interactive: false,
        };
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Rally Arena
            </h1>
            <p className="text-zinc-400 mt-1">
              Select a game post to start your challenge.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search game post..."
              className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20 text-zinc-100 placeholder:text-zinc-600 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <RefreshCw className="h-8 w-8 text-indigo-500 animate-spin" />
            <p className="text-zinc-500">Scanning frequency...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
            <Gamepad2 className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-500">
              No game posts found matching your signal.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const statusConfig = getStatusConfig(post.status);
              const isBattle = post.tipe === "Battle";
              const isInteractive = statusConfig.interactive;

              // Dynamic Styles based on Type
              const typeGlow = isBattle
                ? "hover:shadow-[0_0_30px_-5px_rgba(129,140,248,0.3)] hover:border-indigo-500/50" // Battle: Indigo/Purple
                : "hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.3)] hover:border-emerald-500/50"; // Single: Emerald/Cyan

              const iconColor = isBattle
                ? "text-indigo-400"
                : "text-emerald-400";
              const typeBorder = isBattle
                ? "border-indigo-500/20"
                : "border-emerald-500/20";

              return (
                <Card
                  key={post.id}
                  className={`
                    group relative overflow-hidden transition-all duration-300
                    bg-zinc-900/40 backdrop-blur-md border border-zinc-800
                    ${
                      isInteractive
                        ? `${typeGlow} cursor-pointer`
                        : "opacity-60 cursor-not-allowed grayscale-[0.5]"
                    }
                  `}
                >
                  {/* Subtle Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      isBattle ? "from-indigo-500/5" : "from-emerald-500/5"
                    } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <Badge
                      variant="outline"
                      className={`uppercase text-[10px] tracking-wider font-bold ${typeBorder} ${iconColor} bg-zinc-950/50`}
                    >
                      {isBattle ? (
                        <Swords className="w-3 h-3 mr-1" />
                      ) : (
                        <User className="w-3 h-3 mr-1" />
                      )}
                      {post.tipe}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Circle
                        className={`w-2 h-2 fill-current ${statusConfig.color}`}
                      />
                      <span
                        className={`text-xs font-medium ${statusConfig.color}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <CardTitle className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                      {post.name_pos}
                    </CardTitle>
                  </CardContent>

                  <CardFooter className="pt-4">
                    <Button
                      className={`w-full group/btn ${
                        isBattle
                          ? "hover:bg-indigo-600"
                          : "hover:bg-emerald-600"
                      }`}
                      variant={isInteractive ? "default" : "secondary"}
                      disabled={!isInteractive}
                    >
                      {isInteractive ? "Join" : "Playing..."}
                      {isInteractive && (
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
