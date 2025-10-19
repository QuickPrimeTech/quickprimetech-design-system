// @/layouts/navbar
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";
import { Calendar, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavbarProps = {
  className?: string;
};

export const Navbar = ({ className }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const primaryLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservations", path: "/reservations" },
    { name: "Private Events", path: "/private-events" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav
      className={cn(
        `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-md border-b border-border shadow-lg"
            : "bg-transparent border-b border-primary/20"
        }`,
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Name */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-serif font-bold text-primary hover:text-primary-glow transition-colors"
          >
            <Image
              src="/logo.svg"
              alt="Li's Chinese Restaurant Logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] sm:max-w-[300px]">
              Sample Restaurant
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {primaryLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "hover:text-primary text-foreground transition-colors  font-medium relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm",
                  pathname === "/" // ✅ Only apply homepage-specific behavior
                    ? isScrolled
                      ? "text-foreground"
                      : "text-white"
                    : "text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="default" size="lg">
              <Link href="/reservations">
                <Calendar />
                Reservations
              </Link>
            </Button>
          </div>

          {/* Mobile Menu (Sheet) */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="text-primary"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background backdrop-blur-xl border-r border-border/50 text-foreground">
                <SheetClose asChild>
                  <SheetHeader className="flex flex-row items-center space-x-3 pb-6 border-b border-border">
                    <Image
                      src="/logo.svg"
                      alt="Li's Chinese Restaurant Logo"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <SheetTitle className="line-clamp-1 text-xl font-serif font-bold text-primary">
                      Sample Restaurant
                    </SheetTitle>
                  </SheetHeader>
                </SheetClose>

                <div className="flex px-6 flex-col mt-6 space-y-5">
                  {primaryLinks.map((item) => (
                    <SheetClose key={item.name} asChild>
                      <Link
                        href={item.path}
                        className="text-lg font-medium hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button variant="default" size="lg" asChild>
                      <Link href="/reservations">
                        <Calendar />
                        Reservations
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
