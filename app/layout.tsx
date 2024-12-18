import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "গল্প বিডি | next.js",
  description: "ভাল বাংলা গল্প",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-around py-5">
          <Link className="link-primary" href="/">
            <span className="m-1 p-1">হোম পেজ</span>
          </Link>
          <Link className="link-primary" href="/posts">
            <span className="m-1 p-1">গল্প পড়ো</span>
          </Link>
          <Link className="link-primary" href="/create">
            <span className="m-1 p-1">গল্প লেখো</span>
          </Link>
        </div>
        <hr />
        {children}
      </body>
    </html>
  );
}
