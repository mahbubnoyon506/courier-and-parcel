// components/dashboard/Header.tsx (Simplified Example)
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-white/40 backdrop-blur-sm px-4 md:px-6 dark:bg-gray-950/40 dark:border-gray-800">
      <div className="flex-1">
        {/* Could be a search bar or the current page title */}
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="w-full pl-8"
          />
        </div>
      </div>
      <UserNav />
    </header>
  );
}
