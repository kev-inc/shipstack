import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Appbar from "@/components/Appbar";

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
        <Appbar/>
        <div className='flex'>
          <div className='w-64 hidden lg:block'>
            <Sidebar />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
