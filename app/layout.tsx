import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "../providers/ConvexClerkProvider";
import AudioProvider from "@/providers/AudioProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podster",
  description: "Generated a podcast using ai",
  icons: {
    icon: "/icons/icon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <ConvexClerkProvider>
    <html lang="en">
      <AudioProvider>
            <body className={`${manrope.className}`}>
                  {children}
              </body>
      </AudioProvider>

    </html>
        </ConvexClerkProvider>
  );
}
