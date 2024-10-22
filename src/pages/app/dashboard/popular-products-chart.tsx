import { getPopularProducts } from "@/api/get-popular-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "lucide-react";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import colors from "tailwindcss/colors";

const data = [
  { product: "Pizza Calabresa", amount: 10 },
  { product: "Pizza Portuguesa", amount: 20 },
  { product: "Empada de Frango", amount: 5 },
  { product: "Coxinha a Moda da Casa", amount: 50 },
  { product: "Mingau de Munguzá", amount: 10 },
  { product: "Banana Frita", amount: 15 },
];

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
  colors.fuchsia[500],
];

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryKey: ["metrics", "popular-products"],
    queryFn: getPopularProducts,
  });
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos Populares
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {popularProducts && (
          <>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart data={popularProducts} style={{ fontSize: 12 }}>
                <Pie
                  data={popularProducts}
                  dataKey="amount"
                  nameKey="product"
                  cx="50%"
                  cy="50%"
                  outerRadius={86}
                  innerRadius={64}
                  strokeWidth={8}
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius =
                      12 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        className="fill-muted-foreground text-xs"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {popularProducts[index].product.length > 12
                          ? popularProducts[index].product
                              .substring(0, 12)
                              .concat("...")
                          : popularProducts[index].product}{" "}
                        ({value})
                      </text>
                    );
                  }}
                >
                  {popularProducts.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                      className="stroke-background hover:opacity-80"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}