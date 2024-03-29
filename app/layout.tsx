import "./globals.css";
import "animate.css/animate.min.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShipStack",
  description: "ShipStack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='bg-[#F0F2F5]'>
      <body className={inter.className}>
        {children}        
      </body>
    </html>
  );
}
