import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunny Bharne",
  description: "Personal website of Sunny Bharne",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: {
      url: "/apple-icon.png",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-anime-bg antialiased">
        {children}
      </body>
    </html>
  );
}
