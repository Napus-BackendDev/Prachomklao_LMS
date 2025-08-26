import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontSans, fontThai } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={fontThai.className}>
      <head>
        <title> Prachomklao LMS</title>
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased overflow-x-hidden"
        )}
      >
        <div className="relative flex flex-col min-w-0">
          <Navbar />
          <main className="mx-auto flex-grow w-full max-w-screen-2xl min-w-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
