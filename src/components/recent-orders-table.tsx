
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OrderStatus } from "@/lib/types";
import { VariantProps } from "class-variance-authority";
import { supabase } from "@/lib/supabase-client";

const getStatusVariant = (status: OrderStatus): VariantProps<typeof badgeVariants>["variant"] => {
    switch (status) {
      case 'Dalam Produksi': return 'default';
      case 'Siap Dikirim': return 'secondary';
      case 'Terkirim': return 'outline';
      case 'Tertunda': return 'destructive';
      case 'Dibatalkan': return 'destructive';
      case 'Antrian': return 'default'; // Added new status
      default: return 'default';
    }
};

export async function RecentOrdersTable() {
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      id,
      customer_name,
      status,
      total,
      order_items ( product_name )
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching recent orders:", error);
    return <p>Gagal memuat pesanan terbaru. Error: {error.message}</p>;
  }

  if (!orders || orders.length === 0) {
    return (
        <Card>
            <CardHeader><CardTitle>Pesanan Terbaru</CardTitle></CardHeader>
            <CardContent><p>Belum ada pesanan.</p></CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Pesanan Terbaru</CardTitle>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/orders">Lihat Semua<ArrowUpRight className="h-4 w-4" /></Link>
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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.customer_name}</div>
                </TableCell>
                <TableCell>
                  {order.order_items?.[0]?.product_name || 'N/A'}
                  {order.order_items?.length > 1 && 
                    <span className='text-xs text-muted-foreground'> +{order.order_items.length - 1} lainnya</span>
                  }
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={getStatusVariant(order.status as OrderStatus)}>{order.status}</Badge>
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
