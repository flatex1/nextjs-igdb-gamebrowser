import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { SearchBar } from "@/components/search-bar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Gamepad2 className="h-6 w-6" />
          <span className="font-bold text-xl">GameDiscover</span>
        </Link>
        <SearchBar />
      </div>
    </header>
  );
}