import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// The school already uses Plus Jakarta Sans on smktelkom-sda.sch.id, so this
// keeps the landing page typographically identical to the real site.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMK Telkom Sidoarjo | Sekolah Vokasi ICT",
  description:
    "SMK Telkom Sidoarjo adalah sekolah menengah kejuruan di bawah naungan Yayasan Pendidikan Telkom. Menyediakan program keahlian Teknik Komputer dan Jaringan, Rekayasa Perangkat Lunak, dan Teknik Audio Video. Akreditasi A dengan standar ISO 21001:2018.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
