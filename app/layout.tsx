import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunny Bharne",
  description: "Personal website of Sunny Bharne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Directly use the variable property from the imported font objects
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-anime-bg antialiased">
        {children}
      </body>
    </html>
  );
}
