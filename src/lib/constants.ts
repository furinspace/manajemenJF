import {
  LayoutDashboard,
  Package,
  Factory,
  Warehouse,
  Truck,
  CircleDollarSign,
  Settings,
} from "lucide-react";

import type { NavLink, Role } from "./types";

export const ROLES = {
  OWNER: "Pemilik",
  ADMIN: "Admin",
  WORKER: "Pekerja",
} as const;

export const ALL_ROLES = Object.values(ROLES);

export const NAV_LINKS: NavLink[] = [
  {
    href: "/",
    label: "Dasbor",
    icon: LayoutDashboard,
    roles: ALL_ROLES,
  },
  {
    href: "/orders",
    label: "Pesanan",
    icon: Package,
    roles: [ROLES.OWNER, ROLES.ADMIN],
  },
  {
    href: "/production",
    label: "Produksi",
    icon: Factory,
    roles: ALL_ROLES,
  },
  {
    href: "/stock",
    label: "Stok",
    icon: Warehouse,
    roles: [ROLES.OWNER, ROLES.ADMIN],
  },
  {
    href: "/delivery",
    label: "Pengiriman",
    icon: Truck,
    roles: [ROLES.OWNER, ROLES.ADMIN],
  },
  {
    href: "/payroll",
    label: "Gaji",
    icon: CircleDollarSign,
    roles: [ROLES.OWNER, ROLES.ADMIN, ROLES.WORKER],
  },
  {
    href: "/settings",
    label: "Pengaturan",
    icon: Settings,
    roles: [ROLES.OWNER],
  },
];
