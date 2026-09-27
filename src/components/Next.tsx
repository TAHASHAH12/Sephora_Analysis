const STEPS = [
  {
    n: "01", title: "Find out why the carousels are missing Sephora", effort: "Days",
    detail:
      "Absence from a shopping carousel on a product Sephora demonstrably stocks is a feed or markup problem, not a ranking problem. It is diagnosable quickly and it is the finding with money directly attached.",
  },
  {
    n: "02", title: "Audit the product pages properly", effort: "One to two weeks",
    detail:
      "With access, read every product page's structured data and measure coverage, validity and richness across the catalogue. This is the part that could not be done from outside and it is where the carousel answer probably lives.",
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
