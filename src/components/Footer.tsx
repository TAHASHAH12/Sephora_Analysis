export default function Footer() {
  return (
    <footer className="section" style={{ paddingBottom: 60 }}>
      <div className="container">
        <div className="eyebrow">Sources</div>
        <h2>Where the numbers come from</h2>
        <ul className="clean" style={{ marginTop: 14 }}>
          <li>Live United States search results, desktop, September 2026.</li>
          <li>Sephora&rsquo;s own published product, brand and category catalogue.</li>
          <li>
            The live Wikidata API, with every identifier screened on label, description and class
            membership before acceptance.
          </li>
        </ul>
        <p style={{ marginTop: 22, fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--muted)" }}>
          WLDM &middot; Product visibility &amp; entity analysis &middot; sephora.com &middot; September 2026
        </p>
      </div>
    </footer>
  );
}
