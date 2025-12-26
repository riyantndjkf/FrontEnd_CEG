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
    <nav className="sticky top-0 z-50 w-full bg-white/20 backdrop-blur-md border-b border-white/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Asset/CEG HOMEPAGE.png"
              alt="CEG"
              width={45}
              height={45}
            />
            <span className="text-2xl font-black text-teal-900">
              CEG 2026
            </span>
          </Link>

          {/* NAV LINKS (HILANG DI LOGIN & REGISTER) */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-bold transition ${
                    pathname === link.href
                      ? "text-teal-800"
                      : "text-teal-900/70 hover:text-teal-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* ACTION BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            {!isMounted ? null : token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">{user}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isLoginPage ? (
              <Link
                href="/register"
                className="bg-teal-800 text-white px-6 py-2 rounded-full font-bold"
              >
                Register
              </Link>
            ) : isRegisterPage ? (
              <Link
                href="/login"
                className="bg-teal-800 text-white px-6 py-2 rounded-full font-bold"
              >
                Login
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-teal-800 text-white px-6 py-2 rounded-full font-bold"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4">
          {!isAuthPage &&
            navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

          {!token && isLoginPage && (
            <Link href="/register" className="block font-bold text-teal-800">
              Register
            </Link>
          )}

          {!token && isRegisterPage && (
            <Link href="/login" className="block font-bold text-teal-800">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
