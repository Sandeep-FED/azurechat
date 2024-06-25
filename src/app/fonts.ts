import { Raleway } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

export const ralewaySans = Raleway({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

export const geistMono = GeistMono;
export const geistSans = GeistSans;
