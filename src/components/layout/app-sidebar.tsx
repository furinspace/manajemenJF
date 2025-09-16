'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { NAV_LINKS } from "@/lib/constants";
import { useRole } from "@/contexts/role-context";
import { RoleSwitcher } from "@/components/role-switcher";
import { Waves } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = useRole();

  const filteredNavLinks = NAV_LINKS.filter((link) => link.roles.includes(role));

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Waves className="w-8 h-8 text-primary" />
          <span className="text-lg font-semibold">Manajemen JF</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {filteredNavLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={{
                    children: link.label,
                    className: "group-data-[collapsible=icon]:flex hidden",
                  }}
                  asChild
                >
                  <div>
                    <link.icon />
                    <span>{link.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2" />
        <RoleSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
