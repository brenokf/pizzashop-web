import { RouterProvider } from "react-router-dom";
import { Router } from "./routes";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import "./global.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { queryClient } from "./lib/react-query";
export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizza-shop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
