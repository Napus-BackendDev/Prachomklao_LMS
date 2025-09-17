import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontThai } from "@/config/fonts";
import Footer from "@/components/footer";
import ConditionalNavbar from "@/components/conditinalNavbar";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/logo.png",
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
          "flex flex-col text-foreground bg-[#F5FAFF] font-sans antialiased overflow-x-hidden"
        )}
      >
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
