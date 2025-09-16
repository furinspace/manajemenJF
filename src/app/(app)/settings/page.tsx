import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan</CardTitle>
        <CardDescription>
          Kelola pengaturan aplikasi dan preferensi pengguna. Halaman ini adalah placeholder untuk fitur di masa mendatang.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-64 items-center justify-center rounded-md border-2 border-dashed">
            <p className="text-muted-foreground">Konten pengaturan akan muncul di sini.</p>
        </div>
      </CardContent>
    </Card>
  );
}
