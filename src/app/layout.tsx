import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ReactToastProvider from "@/providers/ReactToastProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Night",
  description:
    "Movie discovery web app built with Next.js, TypeScript, Tailwind CSS, and Supabase. Browse trending movies, search instantly, explore detailed movie pages, and enjoy a modern responsive UI inspired by streaming platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${roboto.variable} antialiased`}
    >
      <body>
        <ReactToastProvider>
          <Header />

          {children}

          <Footer />

          <ScrollToTop />
        </ReactToastProvider>
      </body>
    </html>
  );
}
