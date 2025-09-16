"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "./user-nav";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export function AppHeader() {
  const pathname = usePathname();
  const pageTitle =
    NAV_LINKS.find((link) => link.href === pathname)?.label || "Dashboard";

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-lg font-semibold sm:text-xl">{pageTitle}</h1>
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
