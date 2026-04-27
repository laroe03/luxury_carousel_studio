import type { Metadata } from "next";
import "./globals.css";
import { StudioProvider } from "@/context/StudioContext";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Luxury Carousel Studio",
  description: "AI-powered Instagram carousel builder for luxury brands.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StudioProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </StudioProvider>
      </body>
    </html>
  );
}
