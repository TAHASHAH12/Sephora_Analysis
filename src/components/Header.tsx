import WldmLogo from "./WldmLogo";

const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "carousel", label: "Product carousels" },
  { id: "ai", label: "AI overviews" },
  { id: "markup", label: "Markup audit" },
  { id: "industry", label: "Industry snapshot" },
  { id: "entities", label: "Brand entities" },
  { id: "lvmh", label: "LVMH brands" },
  { id: "scale", label: "Catalogue" },
  { id: "method", label: "Method" },
  { id: "next", label: "What we would do" },
];

export default function Header() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="container">
        <div className="brandhead">
          <a href="https://wldm.io" target="_blank" rel="noreferrer" aria-label="WLDM">
            <WldmLogo height={32} />
          </a>
          <div className="brandtag">
            Product visibility &amp; entity analysis &middot; sephora.com
            <br />
            Prepared for 2 October 2026
          </div>
        </div>
      </div>
      <nav className="navchips" aria-label="Section navigation">
        <div className="container row">
          {LINKS.map((l) => (
            <button key={l.id} className="navchip" onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
