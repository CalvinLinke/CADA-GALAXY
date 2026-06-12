import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <div className="space-bg" />
      <Header />
      <main>
        <Hero />
        <Features />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
