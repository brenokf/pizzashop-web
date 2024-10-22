import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function DayOrderAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ["metrics", "day-orders-amount"],
  });
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {dayOrdersAmount >= 0 ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {dayOrdersAmount.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{dayOrdersAmount.diffFromYesterday}{" "}
                  </span>
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {dayOrdersAmount.diffFromYesterday}{" "}
                  </span>
                  em relação a ontem
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
function userQuery(arg0: {}) {
  throw new Error("Function not implemented.");
}
