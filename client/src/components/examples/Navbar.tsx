import Navbar from "../Navbar";
import { ThemeProvider } from "../ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function NavbarExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
