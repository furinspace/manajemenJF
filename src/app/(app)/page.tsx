
import { DashboardStats } from "@/components/dashboard-stats";
import { RecentOrdersTable } from "@/components/recent-orders-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Selamat Datang di FiberFlow</h1>
        <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/orders/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Pesanan
              </Link>
            </Button>
        </div>
      </div>
      
      <DashboardStats />
      <RecentOrdersTable />
    </div>
  );
}
