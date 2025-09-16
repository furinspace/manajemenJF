'use server';

import { supabase } from '@/lib/supabase-client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type OrderItem = {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
};

/**
 * Server Action to create a new order with its corresponding items.
 * This is a transactional process: if one part fails, nothing should be committed.
 */
export async function createOrderWithItems(prevState: any, formData: FormData) {
  // 1. Extract and Validate Order Data
  const customerName = formData.get('customer_name') as string;
  const status = formData.get('status') as string;
  const source = formData.get('source') as string;
  const totalAmount = Number(formData.get('total_amount'));

  if (!customerName || !status || !source || !totalAmount) {
    return { message: 'Detail pelanggan, status, dan sumber pesanan tidak boleh kosong.' };
  }

  // 2. Extract and Validate Order Items Data
  const itemsString = formData.get('order_items') as string;
  if (!itemsString) {
    return { message: 'Pesanan harus memiliki setidaknya satu item.' };
  }

  const items: OrderItem[] = JSON.parse(itemsString);
  if (items.some(item => !item.product_name || item.quantity <= 0 || item.price < 0)) {
      return { message: 'Setiap item harus memiliki nama, jumlah, dan harga yang valid.' };
  }

  // 3. --- Database Transaction ---
  try {
    // Step A: Insert the main order and get its ID
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customerName,
        total: totalAmount,
        status: status,
        source: source, // Add the new source field
      })
      .select('id')
      .single(); // Use .single() to get a single object back, not an array

    if (orderError) throw new Error(`Gagal membuat pesanan: ${orderError.message}`);
    if (!orderData) throw new Error('Gagal mendapatkan ID pesanan yang baru dibuat.');

    const orderId = orderData.id;

    // Step B: Prepare the items for insertion, linking them to the new order ID
    const itemsToInsert = items.map(item => ({
      order_id: orderId,
      product_name: item.product_name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Step C: Insert all items into the 'order_items' table
    const { error: itemsError } = await supabase.from('order_items').insert(itemsToInsert);

    if (itemsError) {
      // IMPORTANT: If item insertion fails, we should ideally delete the order
      // we just created to avoid orphaned data. This makes the action transactional.
      await supabase.from('orders').delete().match({ id: orderId });
      throw new Error(`Gagal menyimpan item pesanan: ${itemsError.message}`);
    }

  } catch (error: any) {
    console.error('Transactional Error:', error);
    // Return a generic error message to the user
    return { message: error.message || 'Terjadi kesalahan saat menyimpan pesanan.' };
  }

  // 4. On Success: Revalidate paths and redirect
  revalidatePath('/');
  revalidatePath('/orders');
  redirect('/');
}
