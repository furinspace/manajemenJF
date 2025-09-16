"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Factory, Truck, AlertTriangle, CircleDollarSign } from "lucide-react";
import { useRole } from "@/contexts/role-context";
import { ROLES } from "@/lib/constants";

const stats = [
  { title: "Pesanan Hari Ini", value: "12", icon: Package, role: [ROLES.OWNER, ROLES.ADMIN] },
  { title: "Dalam Produksi", value: "4", icon: Factory, role: [ROLES.OWNER, ROLES.ADMIN, ROLES.WORKER] },
  { title: "Siap Dikirim", value: "8", icon: Truck, role: [ROLES.OWNER, ROLES.ADMIN] },
  { title: "Gaji Tertunda", value: "Rp 4.050.000", icon: CircleDollarSign, role: [ROLES.OWNER, ROLES.ADMIN]},
  { title: "Tugas Saya", value: "2", icon: Factory, role: [ROLES.WORKER]},
  { title: "Pembayaran Berikutnya", value: "Rp 2.550.000", icon: CircleDollarSign, role: [ROLES.WORKER]},
  { title: "Peringatan Stok", value: "3", icon: AlertTriangle, className: "text-destructive", role: [ROLES.OWNER, ROLES.ADMIN]},
];

export function DashboardStats() {
    const { role } = useRole();
    const filteredStats = stats.filter(stat => stat.role.includes(role));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {filteredStats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.className || ''}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.className || ''}`}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
