import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontThai = localFont({
  src: [
    {
      path: "../public/fonts/THSarabunNew.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/THSarabunNew Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-thai",
  display: "swap",
});
