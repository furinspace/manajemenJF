"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRole } from "@/contexts/role-context";
import { ROLES, ALL_ROLES } from "@/lib/constants";
import type { Role } from "@/lib/types";

export function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <div className="px-2">
      <Select value={role} onValueChange={(value) => setRole(value as Role)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih peran" />
        </SelectTrigger>
        <SelectContent>
          {ALL_ROLES.map((r) => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
