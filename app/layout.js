import { Nunito, Poppins } from "next/font/google"
import localFont from "next/font/local";
import "./globals.css";
import { UserContextProvider } from "./components/UserContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const fonts = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

export const metadata = {
  title: "Airbnb | Holiday Booking",
  description: "Get your Now",
  // icons: {
  //   icon: "/faacon.svg", // Path to your SVG favicon
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ` + fonts.className}
      >
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
