// app/RootLayout.js
import {Cormorant_Garamond, Inter} from "next/font/google";
import "./globals.css";
import SideBar from "../components/sidebar/index";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Hotel vinci",
  description: "Hotel Vinci Management App",
};

export default function RootLayout({children}) {
  return (
      <html
          lang="en"
          className={`${inter.variable} ${cormorantGaramond.variable}`}
      >
      <body><SideBar>{children}</SideBar></body>
      </html>
  );
}
