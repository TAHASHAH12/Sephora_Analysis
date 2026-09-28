import type { Markup } from "../types";
import mk from "../data/markup.json";
import ScoreCard from "./ScoreCard";

const m = mk as unknown as Markup;
const d = (s: string) => `${s.slice(0, 4)}-${s.slice(4, 6)}`;

export default function MarkupAudit() {
  const core = m.types.filter((t) => t.pct >= 50);
  return (
    <section className="section" id="markup">
      <div className="container">
        <div className="eyebrow">Schema markup audit</div>
        <h2>Their product markup is genuinely good. That is the problem.</h2>
        <p className="lead">
          We read the structured data on Sephora&rsquo;s product pages directly. The result is not
          what we expected, and it reframes everything above: this is{" "}
          <span className="u-lm">better product markup than most retailers ship</span>, and better
          than anything we found on a competitor in this category.
        </p>
        <p className="lead" style={{ marginTop: 0 }}>
          Every required property is complete on every page. Not one block of invalid JSON-LD. They
          use <code>ProductGroup</code> to model variants, which is advanced and rare, and{" "}
          <code>VideoObject</code> on more than half. So the visibility gap is not a markup quality
          problem &mdash; which means most agencies would look here, find nothing wrong, and stop.
        </p>

        <div className="scorecards" style={{ marginTop: 28 }}>
          <ScoreCard value="100%" good label="Required properties complete"
            sub="name, image, offers, price, currency, availability" />
          <ScoreCard value={String(m.invalid)} good label="Invalid JSON-LD blocks"
            sub={`across ${m.n} product pages`} />
          <ScoreCard value="86%" good label="Use ProductGroup for variants"
            sub="shade and size handled properly" />
          <ScoreCard value={`${m.gtin}/${m.n}`} warn label="Carry a GTIN"
            sub="the identifier that matches their offer to the product" />
        </div>

        <div className="skyband" style={{ marginTop: 32 }}>
          <h2>The missing piece is the identifier, not the markup</h2>
          <p>
            A GTIN is the barcode number. It is how Google knows that Sephora&rsquo;s Rouge Dior and
            Macy&rsquo;s Rouge Dior are the same product, and therefore that both belong in the same
            comparison. Sephora ships <strong>none</strong> on the pages we read. What they do ship
            is an internal SKU, on 86% of pages &mdash; an identifier only Sephora can resolve.
          </p>
          <p style={{ marginBottom: 0 }}>
            Target and Walmart are feed-driven merchants with GTIN-complete catalogues, and they are
            the two retailers ahead of Sephora in the shopping carousels. That is not a coincidence
            worth ignoring.
          </p>
        </div>

        <h3 style={{ margin: "34px 0 10px" }}>Required properties</h3>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Property</th><th>On</th><th>Pages</th><th>Coverage</th></tr></thead>
            <tbody>
              {m.required.map((r) => (
                <tr key={r.prop}>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{r.prop}</td>
                  <td style={{ fontSize: 12.5, color: "var(--muted)" }}>{r.on}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{r.pages}/{m.n}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--ok)", fontWeight: 600 }}>
                    {r.pct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: "30px 0 10px" }}>Recommended properties &mdash; where the gap is</h3>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Property</th><th>Pages</th><th>Coverage</th><th>What it does</th></tr></thead>
            <tbody>
              {m.recommended.map((r) => (
                <tr key={r.prop}>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{r.prop}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{r.pages}/{m.n}</td>
                  <td style={{
                    fontFamily: "var(--mono)", fontSize: 12.5, fontWeight: 600,
                    color: r.pct >= 80 ? "var(--ok)" : r.pct === 0 ? "var(--warn)" : undefined,
                  }}>
                    {r.pct}%
                  </td>
                  <td style={{ fontSize: 12.5, color: "var(--muted)" }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: "30px 0 10px" }}>Types on a product page</h3>
        <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
          {core.map((t) => (
            <span key={t.type} className="classchip" style={{ background: "var(--bl)" }}>
              {t.type} &middot; {t.pct}%
            </span>
          ))}
        </div>

        <p style={{ marginTop: 26, fontSize: 13, color: "var(--muted)" }}>
          Based on {m.n} product pages, read from stored copies dated {d(m.from)} to {d(m.to)}. The
          live site refuses automated requests, including from commercial rendering services, so
          these are point-in-time readings rather than a live crawl and the sample is small. The
          consistency across it is high &mdash; every page carried the same template &mdash; but a
          full audit needs access, and that is the first thing an engagement should unlock.
        </p>
      </div>
    </section>
  );
}
