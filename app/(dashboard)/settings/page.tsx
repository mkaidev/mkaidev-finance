"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Halaman pengaturan
          </CardTitle>
        </CardHeader>
        <CardContent>
          segera hadir..! halaman ini memang dipersiapkan untuk proses
          pengembangan😂🙏
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
