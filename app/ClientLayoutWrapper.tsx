"use client";

import { usePathname } from "next/navigation";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if we are on a portal page
  const isPortal =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/login");

  return (
    <>
      {!isPortal && <header />}
      {children}
      {!isPortal && <footer />}
    </>
  );
}
