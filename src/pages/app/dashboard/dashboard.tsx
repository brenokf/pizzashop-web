import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { MonthRevenueCard } from "./moth-revenue-card";
import { DayOrderAmountCard } from "./day-orders-amount-card";
import { MonthOrderAmountCard } from "./month-orders-amount-card";
import { MonthCanceledOrderAmountCard } from "./month-canceled-orders-amount-card";
import { RevenueChart } from "./revenue-chart";
import { PopularProductsChart } from "./popular-products-chart";

export function Dashboard() {
  return (
    <div>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrderAmountCard />
          <DayOrderAmountCard />
          <MonthCanceledOrderAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </div>
  );
}
