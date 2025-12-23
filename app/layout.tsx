import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YT-A2Z | YouTube Content Creation AI",
  description: "Advanced autonomous AI agent for end-to-end YouTube content creation and management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-youtube-dark text-white">
        {children}
      </body>
    </html>
  );
}
