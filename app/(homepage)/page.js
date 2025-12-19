"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/core/store/hooks";
import HomepagePeserta from "@/views/homepage/HomepagePeserta";
import Link from "next/link";
import HomePagePenpos from "@/views/homepage/HomepagePenpos";
import HomePageAdmin from "@/views/homepage/HomePageAdmin";

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const role = useAppSelector((state) => state.role.role);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <HomepagePeserta />
    </>
  );
}
