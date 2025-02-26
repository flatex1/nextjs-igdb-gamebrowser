import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { Suspense } from "react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="font-bold text-lg sm:text-xl">GameDiscover</span>
        </Link>
        <div className="max-w-[50%] sm:max-w-[60%] md:max-w-[70%]">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </div>
    </header>
  );
}