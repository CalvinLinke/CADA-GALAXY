"use client";
import Link from "next/link";

interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
}

export function CtaLink({ href, children }: CtaLinkProps) {
  return (
    <Link href={href} className="cta-orbit-btn">
      {children}
      <span className="cta-arrow" />
    </Link>
  );
}
