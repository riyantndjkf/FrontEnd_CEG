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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <span className="relative text-2xl font-bold tracking-tight text-white">
                CEG
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-cyan-400 ${isActive(link.href) ? "text-cyan-400" : "text-zinc-400"
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-[21px] left-0 h-0.5 w-full bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden items-center space-x-3 md:flex">
            {!isMounted ? (
              <div className="h-10 w-32 animate-pulse bg-zinc-800/50 rounded" />
            ) : token ? (
              <>
                <Button
                  asChild
                  className="w-auto text-zinc-300 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/rally">
                    Rally
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-zinc-300 hover:bg-white/10 hover:text-white">
                      {user || "Profile"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{user}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Nama peserta1</DropdownMenuItem>
                    <DropdownMenuItem>Nama Peserta2</DropdownMenuItem>
                    <DropdownMenuItem>Nama Peserta3</DropdownMenuItem>
                    <DropdownMenuItem>Status</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="text-zinc-300 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/register">Daftar</Link>
                </Button>
                <Button
                  asChild
                  className="border-cyan-500/50 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {!isMounted ? (
              <div className="h-7 w-10 animate-pulse bg-zinc-800/50 rounded" />
            ) : token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-zinc-300 hover:bg-white/10 hover:text-white">
                    {user || "Profile"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Nama peserta1</DropdownMenuItem>
                  <DropdownMenuItem>Nama Peserta2</DropdownMenuItem>
                  <DropdownMenuItem>Nama Peserta3</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            <div className="flex items-center gap-4">
              {!token && (
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    className="text-zinc-300 hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      Daftar
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="border-cyan-500/50 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                  >
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                </div>
              )}
              <Button
                className="md:hidden text-zinc-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${isActive(link.href)
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {token && (
              <Link
                className="block rounded-lg px-3 py-2 text-base font-medium transition-colors text-zinc-400 hover:bg-white/5 hover:text-white"
                href="/rally"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rally
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
