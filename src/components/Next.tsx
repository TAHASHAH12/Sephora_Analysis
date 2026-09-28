const STEPS = [
  {
    n: "01", title: "Close the GTIN gap", effort: "Days to scope",
    detail:
      "Not one product page we read carries a GTIN. It is how Google matches a retailer's offer to the same product elsewhere, and the two retailers ahead of Sephora in the carousels are GTIN-complete feed merchants. Fastest route to the carousel positions they are missing.",
  },
  {
    n: "02", title: "Add GTINs, then measure coverage across the catalogue", effort: "One to two weeks",
    detail:
      "The template is already right; the identifier that matches their offer to the product is missing. Add GTIN, then with access confirm how many of the 9,841 products actually carry the full template rather than the sample we could read.",
  },
  {
    n: "03", title: "Build the brand entity layer", effort: "Ongoing",
    detail:
      "Create and enrich entities for the maisons that have none or are thinly described, starting with the house label and the fastest-growing brands, and connect them to the products that carry them. Anything created has to be submitted with a paid-contribution disclosure.",
  },
  {
    n: "04", title: "Measure against AI answers, not just rankings", effort: "Ongoing",
    detail:
      "Track which assistants and AI overviews cite Sephora for buying questions, by brand and category. That is the surface where the loss is quietest and the reporting today does not cover it.",
  },
];

export default function Next() {
  return (
    <section className="section" id="next">
      <div className="container">
        <div className="eyebrow">What we would do</div>
        <h2>Where we would start</h2>
        <p className="lead">
          Ordered by how quickly the answer arrives, not by size. The first one is a few days of work
          against a question with revenue attached.
        </p>

        <div className="responsive-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 16, marginTop: 26,
        }}>
          {STEPS.map((s) => (
            <div className="card" key={s.n}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 22, fontWeight: 600, color: "var(--ink-mute)" }}>
                  {s.n}
                </span>
                <span className="classchip">{s.effort}</span>
              </div>
              <h3>{s.title}</h3>
              <p style={{ fontSize: 13.5, marginBottom: 0 }}>{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
