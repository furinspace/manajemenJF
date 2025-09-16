"use client";

import { RoleProvider } from "@/contexts/role-context";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return <RoleProvider>{children}</RoleProvider>;
}
