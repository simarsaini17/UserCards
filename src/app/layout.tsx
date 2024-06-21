import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HyperCare",
  description: "HyperCare:All-in-one Health Care Coordination Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
