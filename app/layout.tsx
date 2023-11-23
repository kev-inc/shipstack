import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";

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
    <html lang="en">
      <body className={inter.className}>
        <div className="flex p-4 bg-slate-100 text-gray-700 border-b font-semibold">
          ShipStack
        </div>
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
