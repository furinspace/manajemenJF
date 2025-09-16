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
  import { stockItems } from "@/lib/data";
  import { AlertTriangle } from "lucide-react";
  
  export default function StockPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Manajemen Stok</CardTitle>
          <CardDescription>Pantau tingkat inventaris untuk produk dan bahan baku.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead className="text-right">Kuantitas</TableHead>
                <TableHead className="text-right">Ambang</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockItems.map((item) => {
                const isLowStock = item.quantity < item.threshold;
                return (
                  <TableRow key={item.id} className={isLowStock ? 'bg-destructive/10' : ''}>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className={`text-right font-bold ${isLowStock ? 'text-destructive' : ''}`}>{item.quantity}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{item.threshold}</TableCell>
                    <TableCell>
                      {isLowStock ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Stok Rendah
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Tersedia</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  