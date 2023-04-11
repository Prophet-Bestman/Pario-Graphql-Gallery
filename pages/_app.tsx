import GalleryLayout from "@/layouts/GalleryLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/Providers/AuthProvider";
import { NextComponentType } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <GalleryLayout>
          {Component.auth ? (
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          ) : (
            <Component {...pageProps} />
          )}
        </GalleryLayout>
      </SessionProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}
