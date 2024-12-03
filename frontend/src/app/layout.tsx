import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReduxProvider } from "./redux/provider";
import dynamic from "next/dynamic";
import { VerificationBanner } from "@/components/verificationBaner";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";
import { Loader } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Escalator",
  description:
    "Elevate your university experience with course swaps, academic resources, alumni connections, and thesis group formation.",
};

const SidebarComponent = dynamic(() =>
  import("@/components/sidebar").then((mod) => mod.SidebarComponent)
);

const Navbar = dynamic(() =>
  import("@/components/navbar").then((mod) => mod.Navbar)
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Suspense fallback={<Loader />}>
          <ReduxProvider>
            <SidebarProvider>
              <div className="flex h-screen bg-background w-screen">
                <SidebarComponent />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Navbar />
                  <VerificationBanner />
                  <main className="flex-1 overflow-y-auto p-6">{children}</main>
                </div>
              </div>
            </SidebarProvider>
          </ReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}
