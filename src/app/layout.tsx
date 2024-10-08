import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "../styles/globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'], // Adjust the weights as per your design
});

export const metadata: Metadata = {
  title: "PetSoft -Pet daycare software",
  description: "Take care of people's pets responsibly with PetSoft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`${poppins.className} antialiased bg-zinc-50  min-h-screen text-sm  `}>
        {children}
        <Toaster  richColors closeButton duration={2000}       />
      </body>
    </html>
  );
}
