import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthCanceledOrderAmountCard() {
  const { data: monthCanceledOrderAmount } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ["metrics", "month-canceled-orders-amount"],
  });
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {monthCanceledOrderAmount >= 0 ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrderAmount.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              {" "}
              {monthCanceledOrderAmount.diffFromLastMonth <= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthCanceledOrderAmount.diffFromLastMonth}
                  </span>{" "}
                  em relação a mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthCanceledOrderAmount.diffFromLastMonth}
                  </span>{" "}
                  em relação a mês passado
                </>
              )}
            </p>
          </>
        ) : (
          <>
            <MetricCardSkeleton />
          </>
        )}
      </CardContent>
    </Card>
  );
}
