import { DeliveryPrioritizationClient } from "@/components/delivery-prioritization-client";

export const metadata = {
  title: "Prioritas Pengiriman",
  description: "Gunakan AI untuk memprioritaskan pengiriman untuk pengepakan.",
};

export default function DeliveryPage() {
  return (
    <div className="space-y-6">
      <DeliveryPrioritizationClient />
    </div>
  );
}
