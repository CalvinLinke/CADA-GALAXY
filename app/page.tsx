import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HomeSections } from "@/components/HomeSections";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";
import { GalaxyBackground } from "@/components/GalaxyBackground";

export default function Home() {
  return (
    <>
      <div className="space-bg" />
      <GalaxyBackground />
      <Header />
      <main>
        <Hero />
        <HomeSections />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
