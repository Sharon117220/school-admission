"use CLient";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bright Future School | Learn, Grow, Thrive",
    template: "%s | Bright Future School",
  },
  description:
    "Discover a welcoming learning community, explore our programs, and apply to Bright Future School.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
