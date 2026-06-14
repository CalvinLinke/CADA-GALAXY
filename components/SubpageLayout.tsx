import { Header } from "./Header";
import { SiteFooter } from "./SiteFooter";

export function SubpageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="space-bg" />
      <Header />
      <main
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
