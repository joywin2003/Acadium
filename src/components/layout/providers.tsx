"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { GlobalContextProvider } from "~/context/store";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <GlobalContextProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <ReactQueryDevtools />
            </ThemeProvider>
          </GlobalContextProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
