import "./globals.css";
import Nav from "@/components/nav/Nav";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
import Footer from "@/components/footer/Footer";

export const alpinaCondensed = localFont({
  src: [
    {
      path: "./fonts/GT-Alpina-Condensed-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GT-Alpina-Condensed-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-alpina-condensed",
});

export const alpinaTypewriter = localFont({
  src: [
    {
      path: "./fonts/GT-Alpina-Typewriter-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GT-Alpina-Typewriter-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GT-Alpina-Typewriter-Medium.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-alpina-typewriter",
});

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${alpinaCondensed.variable} ${alpinaTypewriter.variable}`}
    >
      <body>
        <Providers>
          <Nav />

          <main className="content">
            {children}
          </main>

          {modal}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}