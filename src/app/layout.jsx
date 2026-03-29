import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthSession from "@/provider/NextAuthSession";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ThemeProvider from "@/provider/ThemeProvider";


const poppins = Poppins({
  weight: ['100', '200', '300', '400', '400', '500', '600']
})

export const metadata = {
  title: "Our Services - Care Bangladesh",
  description: "Explore all home care services: Elderly Care, Nursing, Patient Care, Housekeeping, and more. Book now!",
  keywords: ["elderly care", "nursing", "patient care", "home services", "caregiver Bangladesh"],
  openGraph: {
    title: "Browse Professional Care Services",
    description: "Find the right care service for your loved ones.",
    images: [{ url: "https://i.ibb.co/n81DtD36/image.png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <NextAuthSession>
      <html lang="en" data-theme="carelight">

        <body
          className={`${poppins.className} antialiased`}
        >
          <ThemeProvider></ThemeProvider>
          <header className="w-11/12 mx-auto p-2">
            <Navbar></Navbar>
          </header>
          <main className="w-11/12 mx-auto p-2">
            {children}
          </main>
          <footer >
            <Footer></Footer>
          </footer>
        </body>
      </html>
    </NextAuthSession>
  );
}
