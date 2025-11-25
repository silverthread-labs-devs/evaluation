"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut, UserRound, Sun, Moon } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constant";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const initials = useMemo(() => {
    const source = session?.user?.name || session?.user?.email || "";
    if (!source) return "FL";
    return source
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [session?.user?.email, session?.user?.name]);

  const handleNavigateDashboard = () => {
    // close dropdown then navigate
    setMenuOpen(false);
    router.push("/dashboard");
  };

  const handleLogout = async () => {
    if (isSigningOut) return;
    try {
      setIsSigningOut(true);
      // close dropdown immediately for better UX
      setMenuOpen(false);
      await authClient.signOut();
      router.push("/");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-canvas-border bg-canvas-base/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            FL
          </div>
          <div className="leading-tight">
            <p className="font-semibold tracking-tight">{BRAND.name}</p>
            <p className="text-xs text-muted-foreground">{BRAND.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-canvas-text-contrast"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div>
            <button
              type="button"
              className="rounded-md p-2 hover:bg-primary-bg/50"
              aria-label="Toggle theme"
              onClick={() => {
                if (!mounted) return;
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
              }}
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              ) : (
                <Sun className="h-4 w-4 opacity-0" />
              )}
            </button>
          </div>
          <Separator
            orientation="vertical"
            className="hidden h-6 md:block"
            decorative
          />
          {session?.user ? (
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative rounded-full border p-0"
                >
                  <Avatar className="h-9 w-9">
                    {session.user.image ? (
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user.name ?? "User avatar"}
                      />
                    ) : null}
                    <AvatarFallback className="bg-muted text-xs font-semibold uppercase">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className=" bg-canvas-on-canvas">
                <DropdownMenuLabel>
                  <div className=" border-b border-canvas-border py-2 space-y-0.5">
                    <p className="text-sm font-semibold leading-tight">
                      {session.user.name ?? "Authenticated user"}
                    </p>
                    <p className="text-xs font-normal text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(event) => {
                    event.preventDefault();
                    handleNavigateDashboard();
                  }}
                  className="cursor-pointer hover:bg-canvas-bg-subtle"
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(event) => {
                    event.preventDefault();
                    handleLogout();

                  }}
                  className={cn(
                    "cursor-pointer hover:bg-canvas-bg-subtle",
                    isSigningOut && "opacity-70"
                  )}
                  disabled={isSigningOut}
                  variant="destructive"
                >
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          )}
          {!session?.user && (
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              asChild
            >
              <Link href="/auth/sign-in" aria-label="Open sign-in">
                <UserRound className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
