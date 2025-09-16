"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { prioritizeDeliveries } from "@/ai/flows/delivery-prioritization";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { exampleOrderInput } from "@/lib/data";

const FormSchema = z.object({
  orders: z.string().min(10, {
    message: "Data pesanan harus minimal 10 karakter.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

export function DeliveryPrioritizationClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      orders: exampleOrderInput,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await prioritizeDeliveries({ orders: data.orders });
      setResult(response.prioritizedShipments);
    } catch (error) {
      console.error("Gagal memprioritaskan pengiriman:", error);
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan",
        description: "Gagal memprioritaskan pengiriman. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Prioritaskan Pengiriman</CardTitle>
          <CardDescription>
            Masukkan daftar pesanan untuk mendapatkan daftar pengepakan yang diprioritaskan berdasarkan
            tenggat waktu, prioritas pelanggan, dan lokasi.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="orders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Pesanan (format JSON)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tempel data pesanan Anda di sini..."
                        className="h-72 font-code text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoading ? "Memprioritaskan..." : "Prioritaskan Pengiriman"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengiriman Terprioritas</CardTitle>
          <CardDescription>
            Pengiriman siap untuk dikemas, diurutkan berdasarkan prioritas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-72">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : result ? (
            <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap font-code">{result}</pre>
          ) : (
            <div className="flex items-center justify-center h-72 text-center text-muted-foreground">
              <p>Daftar pengiriman terprioritas Anda akan muncul di sini.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
