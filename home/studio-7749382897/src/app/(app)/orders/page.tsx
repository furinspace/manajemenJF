import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { orders } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle, File, ListFilter } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { OrderStatus } from "@/lib/types";
import { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

export default function OrdersPage() {

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

      const getPaymentStatusVariant = (status: string) => {
        switch (status) {
            case 'Lunas': return 'default';
            case 'Belum Lunas': return 'destructive';
            case 'COD': return 'secondary';
            default: return 'outline';
        }
      }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <div>
                <CardTitle>Pesanan</CardTitle>
                <CardDescription>Kelola dan lacak semua pesanan pelanggan.</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                        </span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter berdasarkan</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                        Aktif
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draf</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                        Diarsipkan
                    </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Ekspor
                    </span>
                </Button>
                <Button size="sm" className="h-8 gap-1" asChild>
                  <Link href="/orders/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Tambah Pesanan
                    </span>
                  </Link>
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Pesanan</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pembayaran</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-sm text-muted-foreground">{order.source}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell>
                    <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>{order.paymentStatus}</Badge>
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
