
import { EB_Garamond , Inter } from '@next/font/google';
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  weight: ['400', '700'], 
  subsets: ['latin'],
 display: 'swap'
});
const inter = Inter({
  variable: "--font-inter",
  weight: ['400', '500', '700'], 
  subsets: ['latin'],           
  display: 'swap'
});

export const metadata = {
  title: "Vinci Hotel",
  description: "A hotel website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
