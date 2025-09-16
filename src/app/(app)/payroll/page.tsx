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
  import { payrolls } from "@/lib/data";
  
  export default function PayrollPage() {
  
      const getStatusVariant = (status: string) => {
          switch (status) {
            case 'Paid': return 'default';
            case 'Pending': return 'destructive';
            default: return 'outline';
          }
        };
  
    return (
      <Card>
        <CardHeader>
            <CardTitle>Daftar Gaji</CardTitle>
            <CardDescription>Kelola gaji borongan dan bulanan untuk semua pekerja.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pekerja</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead className="text-right">Borongan/Dasar</TableHead>
                <TableHead className="text-right">Bonus</TableHead>
                <TableHead className="text-right">Potongan</TableHead>
                <TableHead className="text-right">Gaji Bersih</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrolls.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell className="font-medium">{payroll.workerName}</TableCell>
                  <TableCell>{payroll.period}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(payroll.totalPieceRate)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(payroll.bonus)}
                  </TableCell>
                  <TableCell className="text-right text-destructive">
                    -{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(payroll.deductions)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(payroll.netPay)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(payroll.status)}>{payroll.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  