import { api } from "@/lib/axios";

export type GetPopularProductsResponse = {
  product: string;
  amount: number;
}[];

export async function getPopularProducts() {
  const response = await api.get<GetPopularProductsResponse>(
    "/metrics/popular-products",
  );
  console.log(response.data);
  return response.data;
}
