import type { Order, ProductionTask, StockItem, Payroll } from "@/lib/types";

export const orders: Order[] = [
  { id: 'INV-20240521-001', customerName: 'Budi Santoso', product: 'Cetakan A', quantity: 2, total: 250000, status: 'Dalam Produksi', paymentStatus: 'Lunas', source: 'Shopee', date: '2024-05-21' },
  { id: 'INV-20240521-002', customerName: 'Siti Aminah', product: 'Cetakan B', quantity: 1, total: 150000, status: 'Siap Dikirim', paymentStatus: 'Lunas', source: 'TikTok', date: '2024-05-21' },
  { id: 'INV-20240520-003', customerName: 'Eko Wijoyo', product: 'Cetakan C', quantity: 5, total: 500000, status: 'Terkirim', paymentStatus: 'Lunas', source: 'WhatsApp', date: '2024-05-20' },
  { id: 'INV-20240520-004', customerName: 'Rina Marlina', product: 'Cetakan A', quantity: 3, total: 375000, status: 'Tertunda', paymentStatus: 'Belum Lunas', source: 'Shopee', date: '2024-05-20' },
  { id: 'INV-20240519-005', customerName: 'Agus Salim', product: 'Cetakan D', quantity: 1, total: 175000, status: 'Terkirim', paymentStatus: 'COD', source: 'TikTok', date: '2024-05-19' },
  { id: 'INV-20240519-006', customerName: 'Dewi Lestari', product: 'Cetakan B', quantity: 2, total: 300000, status: 'Dalam Produksi', paymentStatus: 'Lunas', source: 'WhatsApp', date: '2024-05-19' },
];

export const productionTasks: ProductionTask[] = [
  { id: 'PROD-001', orderId: 'INV-20240521-001', product: 'Cetakan A', assignedTo: 'Pekerja 1', status: 'Sedang Berjalan', targetDate: '2024-06-04', output: 1 },
  { id: 'PROD-002', orderId: 'INV-20240519-006', product: 'Cetakan B', assignedTo: 'Pekerja 2', status: 'Selesai', targetDate: '2024-06-02', output: 2 },
  { id: 'PROD-003', orderId: 'INV-20240520-004', product: 'Cetakan A', assignedTo: 'Pekerja 3', status: 'Belum Dimulai', targetDate: '2024-06-05', output: 0 },
  { id: 'PROD-004', orderId: 'INV-20240521-002', product: 'Cetakan B', assignedTo: 'Pekerja 1', status: 'Pemeriksaan Kualitas', targetDate: '2024-05-28', output: 1 },
];

export const stockItems: StockItem[] = [
  { id: 'STK-001', sku: 'CF-A', name: 'Cetakan Fiber A', quantity: 15, status: 'Tersedia', threshold: 10 },
  { id: 'STK-002', sku: 'CF-B', name: 'Cetakan Fiber B', quantity: 8, status: 'Tersedia', threshold: 10 },
  { id: 'STK-003', sku: 'CF-C', name: 'Cetakan Fiber C', quantity: 25, status: 'Tersedia', threshold: 15 },
  { id: 'STK-004', sku: 'RM-001', name: 'Resin', quantity: 5, status: 'Tersedia', threshold: 20 },
  { id: 'STK-005', sku: 'RM-002', name: 'Katalis', quantity: 22, status: 'Tersedia', threshold: 25 },
  { id: 'STK-006', sku: 'RM-003', name: 'Fiberglass Mat', quantity: 12, status: 'Tersedia', threshold: 10 },
];

export const payrolls: Payroll[] = [
    { id: 'PAY-001', workerName: 'Pekerja 1', period: '1-15 Mei 2024', totalPieceRate: 2500000, bonus: 100000, deductions: 50000, netPay: 2550000, status: 'Lunas' },
    { id: 'PAY-002', workerName: 'Pekerja 2', period: '1-15 Mei 2024', totalPieceRate: 2350000, bonus: 0, deductions: 100000, netPay: 2250000, status: 'Lunas' },
    { id: 'PAY-003', workerName: 'Pekerja 3', period: '1-15 Mei 2024', totalPieceRate: 2700000, bonus: 150000, deductions: 0, netPay: 2850000, status: 'Lunas' },
    { id: 'PAY-004', workerName: 'Admin 1', period: 'Mei 2024', totalPieceRate: 4000000, bonus: 200000, deductions: 150000, netPay: 4050000, status: 'Tertunda' },
];

export const exampleOrderInput = `[
  { "orderId": "ORD-001", "deadline": "2024-06-10T10:00:00Z", "customerPriority": "High", "deliveryLocation": "Jakarta Pusat" },
  { "orderId": "ORD-002", "deadline": "2024-06-12T15:00:00Z", "customerPriority": "Medium", "deliveryLocation": "Surabaya" },
  { "orderId": "ORD-003", "deadline": "2024-06-10T12:00:00Z", "customerPriority": "Medium", "deliveryLocation": "Jakarta Barat" },
  { "orderId": "ORD-004", "deadline": "2024-06-11T18:00:00Z", "customerPriority": "High", "deliveryLocation": "Bandung" },
  { "orderId": "ORD-005", "deadline": "2024-06-12T11:00:00Z", "customerPriority": "Low", "deliveryLocation": "Bekasi" }
]`;
