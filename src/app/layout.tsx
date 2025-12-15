import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import { DisplayProvider } from "@/context/display-context";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-retro",
});

export const metadata: Metadata = {
  title: "Retro Sim",
  description: "A digital museum of computing history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${vt323.variable} antialiased bg-retro-dark text-retro-green h-screen w-screen overflow-hidden`}
      >
        <DisplayProvider>
            {children}
        </DisplayProvider>
      </body>
    </html>
  );
}
