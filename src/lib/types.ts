import type { LucideIcon } from "lucide-react";
import { ROLES } from "@/lib/constants";

export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: Role[];
}

export type OrderStatus = 'Tertunda' | 'Dalam Produksi' | 'Siap Dikirim' | 'Terkirim' | 'Dibatalkan';

export interface Order {
  id: string;
  customerName: string;
  product: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  paymentStatus: 'Lunas' | 'Belum Lunas' | 'COD';
  source: 'Shopee' | 'TikTok' | 'WhatsApp';
  date: string;
}

export type ProductionStatus = 'Belum Dimulai' | 'Sedang Berjalan' | 'Pemeriksaan Kualitas' | 'Selesai';

export interface ProductionTask {
  id: string;
  orderId: string;
  product: string;
  assignedTo: string;
  status: ProductionStatus;
  targetDate: string;
  output: number;
}

export interface StockItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  status: 'Tersedia' | 'Dipesan' | 'Rusak';
  threshold: number;
}

export interface Payroll {
  id: string;
  workerName: string;
  period: string;
  totalPieceRate: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: 'Tertunda' | 'Lunas';
}

export interface OrderItem {
    productName: string;
    quantity: number;
    price: number;
}
