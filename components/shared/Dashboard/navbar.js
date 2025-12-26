"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/core/store/hooks";
import { clearToken } from "@/core/feature/token/tokenSlice";
import { logout as logoutUser } from "@/core/feature/user/userSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

//GAMBAR
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const token = useAppSelector((state) => state.token.token);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pre-event", label: "Pre Event" },
    { href: "/faq", label: "FAQ" },
  ];

  const isActive = (path) => pathname === path;

  const handleLogout = () => {
    // Clear Redux state
    dispatch(clearToken());
    dispatch(logoutUser());
    // Redirect to homepage
    router.push('/');
  };

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isAuthPage = isLoginPage || isRegisterPage;


  return (
    // NAVBAR BACKGROUND: Transparan dengan backdrop blur sesuai gambar
    <nav className="sticky top-0 z-50 w-full bg-white/20 backdrop-blur-md border-b border-white/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* LOGO SECTION */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image 
              src="/Asset/CEG HOMEPAGE.png" 
              alt="CEG Logo" 
              width={45} 
              height={45} 
              className="transition-transform group-hover:scale-110"
            />
            <span className="text-2xl font-black tracking-tighter text-teal-900">
              CEG 2026
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center space-x-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wider transition-all hover:text-teal-600 ${
                  isActive(link.href) ? "text-teal-800" : "text-teal-900/70"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <div className="h-1 w-full bg-teal-800 rounded-full mt-0.5 animate-in slide-in-from-left-2" />
                )}
              </Link>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="hidden items-center space-x-4 md:flex">
            {!isMounted ? (
              <div className="h-10 w-24 animate-pulse bg-teal-800/10 rounded-full" />
            ) : token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full bg-teal-800/10 text-teal-900 hover:bg-teal-800/20 font-bold">
                    <UserIcon className="mr-2 h-4 w-4" />
                    {user || "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-lg border-teal-100">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="focus:bg-teal-50">Profile Peserta</DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-teal-50">Status Kelompok</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-600 focus:bg-red-50 font-bold"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="bg-teal-800 text-white px-8 py-2.5 rounded-full font-bold text-sm hover:bg-teal-700 transition-all shadow-md hover:shadow-teal-900/20 active:scale-95"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-teal-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-teal-100">
          <div className="space-y-2 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 text-lg font-bold ${
                  isActive(link.href) ? "text-teal-800" : "text-teal-900/60"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-teal-100 my-4" />
            {!token && (
              <Button asChild className="w-full bg-teal-800 rounded-xl py-6 text-lg">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
