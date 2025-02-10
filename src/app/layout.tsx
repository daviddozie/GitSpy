import { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GitSpy",
  description: "GitSpy helps you find and explore GitHub profiles with ease. Get details about any GitHub user instantly!",
  keywords: ["GitHub", "GitSpy", "profile finder", "open-source", "developers"],
  authors: [{ name: "David Mgbede" }],
  openGraph: {
    title: "GitSpy",
    description: "Easily find and explore GitHub profiles. View followers, repositories, and more!",
    url: "https://david-mgbede.vercel.app",
    type: "website",
    images: [
      {
        url: "https://git--spy.vercel.app/_next/image?url=%2FLogo.jpg&w=640&q=75",
        width: 1200,
        height: 630,
        alt: "GitSpy Preview Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitSpy",
    description: "Discover GitHub profiles instantly using GitSpy.",
    images: ["https://git--spy.vercel.app/_next/image?url=%2FLogo.jpg&w=640&q=75"],
  },
  icons: {
    icon: "https://git--spy.vercel.app/_next/image?url=%2FLogo.jpg&w=640&q=75",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} antialiased bg-[#141C2F] w-full py-[20px]`}
      >
        {children}
      </body>
    </html>
  );
}
