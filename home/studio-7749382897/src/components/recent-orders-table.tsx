import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { orders } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OrderStatus } from "@/lib/types";
import { VariantProps } from "class-variance-authority";

export function RecentOrdersTable() {
  const recentOrders = orders.slice(0, 5);

  const getStatusVariant = (status: OrderStatus): VariantProps<typeof badgeVariants>["variant"] => {
    switch (status) {
      case 'Dalam Produksi': return 'default';
      case 'Siap Dikirim': return 'secondary';
      case 'Terkirim': return 'outline';
      case 'Tertunda': return 'destructive';
      case 'Dibatalkan': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
            <CardTitle>Pesanan Terbaru</CardTitle>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/orders">
            Lihat Semua
            <ArrowUpRight className="h-4 w-4" />
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Produk</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-sm text-muted-foreground">{order.source}</div>
                </TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
