"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
import { LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constant";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

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
    router.push("/dashboard");
  };

  const handleLogout = async () => {
    if (isSigningOut) return;
    try {
      setIsSigningOut(true);
      await authClient.signOut();
      router.push("/");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
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
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Separator
            orientation="vertical"
            className="hidden h-6 md:block"
            decorative
          />
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-11 w-11 rounded-full border p-0"
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
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="space-y-0.5">
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
                  className="cursor-pointer"
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
                    "cursor-pointer",
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
