import { Header } from "./Header";
import { SiteFooter } from "./SiteFooter";
import { GalaxyBackground } from "./GalaxyBackground";

export function SubpageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="space-bg" />
      <GalaxyBackground immediate />
      <Header />
      <main
        className="subpage-main"
        style={{
          paddingTop: "clamp(100px, 14vh, 140px)",
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
