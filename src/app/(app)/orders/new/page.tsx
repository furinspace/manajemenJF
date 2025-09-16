'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createOrderWithItems } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, PlusCircle } from 'lucide-react';
import Link from 'next/link';

// A single item row in our form
type OrderItem = {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full lg:w-auto">
      {pending ? 'Menyimpan...' : 'Simpan Pesanan'}
    </Button>
  );
}

export default function NewOrderPage() {
  const [items, setItems] = useState<OrderItem[]>([
    { id: 1, product_name: '', quantity: 1, price: 0 },
  ]);
  const [nextId, setNextId] = useState(2);

  const initialState = { message: null };
  const createOrderAction = createOrderWithItems.bind(null, JSON.stringify(items));
  const [state, dispatch] = useFormState(createOrderAction, initialState);

  const handleAddItem = () => {
    setItems([...items, { id: nextId, product_name: '', quantity: 1, price: 0 }]);
    setNextId(nextId + 1);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: number, field: keyof Omit<OrderItem, 'id'>, value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const orderSources = ["WA 1", "WA 2", "WA 3", "WA 4", "WA Pribadi", "Shopee 1", "Shopee 2", "Shopee 3", "Tiktok", "Tiktok JFO", "Affiliate"];

  return (
    <form action={dispatch}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Buat Pesanan Baru</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/">Batal</Link>
          </Button>
          <SubmitButton />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Side: Order Details */}
        <div className="lg:col-span-1 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Detail Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="customer-name">Nama Pelanggan</Label>
                        <Input id="customer-name" name="customer_name" placeholder="Contoh: Budi Santoso" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue="Antrian" required>
                          <SelectTrigger>
                              <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Antrian">Antrian</SelectItem>
                              <SelectItem value="Dalam Produksi">Dalam Produksi</SelectItem>
                              <SelectItem value="Siap Dikirim">Siap Dikirim</SelectItem>
                              <SelectItem value="Tertunda">Tertunda</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="source">Sumber Pesanan</Label>
                        <Select name="source" required>
                          <SelectTrigger>
                              <SelectValue placeholder="Pilih sumber pesanan" />
                          </SelectTrigger>
                          <SelectContent>
                            {orderSources.map(source => (
                              <SelectItem key={source} value={source}>{source}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Total</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAmount)}
                    </div>
                    <input type="hidden" name="total_amount" value={totalAmount} />
                </CardContent>
            </Card>
        </div>

        {/* Right Side: Order Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
                <CardTitle>Item Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Produk</TableHead>
                    <TableHead className="w-[120px]">Jumlah</TableHead>
                    <TableHead className="w-[150px]">Harga Satuan</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          placeholder="Contoh: Kaos Custom"
                          value={item.product_name}
                          onChange={(e) => handleItemChange(item.id, 'product_name', e.target.value)}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="50000"
                          value={item.price}
                          onChange={(e) => handleItemChange(item.id, 'price', parseInt(e.target.value) || 0)}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={items.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <input type="hidden" name="order_items" value={JSON.stringify(items)} />
            </CardContent>
            <CardFooter className="justify-start border-t p-4">
                <Button type="button" size="sm" variant="outline" onClick={handleAddItem}>
                    <PlusCircle className="h-4 w-4 mr-2"/>
                    Tambah Item
                </Button>
            </CardFooter>
          </Card>
           {state?.message && (
                <div className="text-red-500 text-sm mt-4">
                    {state.message}
                </div>
            )}
        </div>
      </div>
    </form>
  );
}
