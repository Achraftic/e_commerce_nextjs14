import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "../styles/globals.css";
import { Toaster } from "sonner";

// Importing the Poppins font from Google Fonts using next/font/google
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'], // These are correct weights
});

export const metadata: Metadata = {
  title: "ElectroHub",
  description: "ElectroHub is a dynamic and user-friendly e-commerce platform specializing in electronic products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` antialiased bg-zinc-50 min-h-screen !text-sm`}>
        {children}
        <Toaster richColors closeButton duration={2000} />
      </body>
    </html>
  );
}
