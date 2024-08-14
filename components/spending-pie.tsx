import { useState } from "react";
import { PieChart, Target, Radar, FileSearch, Loader2 } from "lucide-react";

import { PieVariant } from "@/components/pie-variant";
import { RadarVariant } from "@/components/radar-variant";
import { RadialVariant } from "@/components/radial-variant";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "./ui/skeleton";

type Props = {
  data?: {
    value: number;
    name: string;
  }[];
};

enum ChartType {
  Pie = "pie",
  Radar = "radar",
  Radial = "radial",
}

export const SpendingPie = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState<ChartType>(ChartType.Pie);

  const onChangeType = (type: ChartType) => {
    setChartType(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Kategori</CardTitle>
        <Select defaultValue={chartType} onValueChange={onChangeType}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ChartType.Pie}>
              <div className="flex items-center">
                <PieChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Pie Chart</p>
              </div>
            </SelectItem>
            <SelectItem value={ChartType.Radar}>
              <div className="flex items-center">
                <Radar className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radar Chart</p>
              </div>
            </SelectItem>
            <SelectItem value={ChartType.Radial}>
              <div className="flex items-center">
                <Target className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radial Chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              Tidak ada data untuk periode ini
            </p>
          </div>
        ) : (
          <>
            {chartType === ChartType.Pie && <PieVariant data={data} />}
            {chartType === ChartType.Radar && <RadarVariant data={data} />}
            {chartType === ChartType.Radial && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const SpendingPieLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex lg:flex-row lg:items-center justify-between lg:space-y-0 space-y-2">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 lg:w-[120px] w-full" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex items-center justify-center">
          <Loader2 className="size-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};
