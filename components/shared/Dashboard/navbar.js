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
} from "@/components/ui/dropdown-menu";
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

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isAuthPage = isLoginPage || isRegisterPage;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pre-event", label: "Pre Event" },
    { href: "/faq", label: "FAQ" },
  ];

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(logoutUser());
    router.push("/");
  };

  return (
    // bg-white dipaksa pekat agar tidak tembus warna gelap dari belakang/dark mode
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Asset/CEG HOMEPAGE.png"
              alt="CEG"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-black text-teal-950 uppercase">
              CEG 2026
            </span>
          </Link>

          {/* NAV LINKS (Hanya muncul jika bukan halaman login/register) */}
          <div className="hidden md:flex items-center gap-10">
            {!isAuthPage && navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-bold transition ${
                  pathname === link.href
                    ? "text-teal-600"
                    : "text-teal-950 hover:text-teal-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ACTION BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            {!isMounted ? null : token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-teal-950 font-bold border border-zinc-200">
                    {user?.name || "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={isLoginPage ? "/register" : "/login"}
                className="bg-teal-800 hover:bg-teal-900 text-white px-6 py-2 rounded-full font-bold transition shadow-md"
              >
                {isLoginPage ? "Register" : "Login"}
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <Button
            variant="ghost"
            className="md:hidden text-teal-950"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-6 space-y-4 shadow-xl">
          {!isAuthPage && navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-bold text-teal-950 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-zinc-100">
             {!token && (
                <Link 
                  href="/login" 
                  className="block w-full text-center bg-teal-800 text-white py-3 rounded-xl font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Register
                </Link>
             )}
          </div>
        </div>
      )}
    </nav>
  );
}