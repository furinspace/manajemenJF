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
  import { productionTasks } from "@/lib/data";
  import { Progress } from "@/components/ui/progress";
  
  export default function ProductionPage() {
  
      const getStatusVariant = (status: string) => {
          switch (status) {
            case 'Sedang Berjalan': return 'default';
            case 'Selesai': return 'secondary';
            case 'Belum Dimulai': return 'outline';
            case 'Pemeriksaan Kualitas': return 'destructive'; // Using destructive to draw attention
            default: return 'default';
          }
        };
  
    return (
      <Card>
        <CardHeader>
            <CardTitle>Daftar Produksi</CardTitle>
            <CardDescription>Lacak semua tugas produksi yang sedang berjalan dan yang akan datang.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pesanan</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Ditugaskan Kepada</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Target</TableHead>
                <TableHead className="text-right">Hasil</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.orderId}</TableCell>
                  <TableCell>{task.product}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                  </TableCell>
                  <TableCell>{task.targetDate}</TableCell>
                  <TableCell className="text-right">{task.output}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  