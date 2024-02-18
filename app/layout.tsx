import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: "Form",
  description: "Form validation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en" className="h-full w-full bg-white">
      <body >{children}</body>
    </html>
    </AuthProvider>
  );
}
