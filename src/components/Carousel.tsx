import type { Analysis } from "../types";
import data from "../data/analysis.json";

const a = data as unknown as Analysis;
const has = (sellers: string[]) => sellers.some((s) => s.toLowerCase().includes("sephora"));

export default function Carousel() {
  const q = a.serp.queries;
  return (
    <section className="section" id="carousel">
      <div className="container">
        <div className="eyebrow">Product carousels</div>
        <h2>Who Google lists when someone wants to buy</h2>
        <p className="lead">
          The shopping carousel sits above or beside the organic results and is where purchase intent
          actually lands. It appeared on all ten queries. Sephora is in six of them and absent from
          four &mdash; and the four are among the most commercially valuable, because three are Dior.
        </p>

        <div className="tbl-wrap" style={{ marginTop: 24 }}>
          <table>
            <thead>
              <tr>
                <th>Query</th>
                <th>Sephora in carousel</th>
                <th>Sephora organic</th>
                <th>Retailers Google lists instead</th>
              </tr>
            </thead>
            <tbody>
              {q.map((row) => {
                const inCar = has(row.pop_sellers);
                return (
                  <tr key={row.q}>
                    <td style={{ fontSize: 13.5 }}><strong>{row.q}</strong></td>
                    <td style={{
                      fontFamily: "var(--mono)", fontSize: 12,
                      color: inCar ? "var(--ok)" : "var(--warn)", fontWeight: 600,
                    }}>
                      {inCar ? "yes" : "NO"}
                    </td>
                    <td style={{ fontFamily: "var(--mono)", fontSize: 12 }}>
                      {row.sephora_pos ? `#${row.sephora_pos}` : "not in top 20"}
                    </td>
                    <td style={{ fontSize: 12.5, color: "var(--muted)" }}>
                      {row.pop_sellers.filter((s) => !s.toLowerCase().includes("sephora"))
                        .slice(0, 5).join(", ") || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="skyband" style={{ marginTop: 30 }}>
          <h2>The pattern underneath</h2>
          <p>
            On nine of the ten queries the brand&rsquo;s own site takes the top organic position, and
            Sephora sits below it. That is expected and not a problem in itself &mdash; a brand should
            rank for its own name.
          </p>
          <p style={{ marginBottom: 0 }}>
            The carousel is a different matter. It is populated from product data, not from pages, and
            being absent from it means Google does not have Sephora&rsquo;s offer for that product in
            a form it can use. Macy&rsquo;s, Ulta and Walmart do. So do two resellers on{" "}
            <code>dior sauvage</code> that nobody would choose over Sephora.
          </p>
        </div>

        <div className="grid2" style={{ marginTop: 28 }}>
          <div className="card">
            <h4>Where Sephora does appear, it looks strong</h4>
            <p style={{ marginBottom: 0 }}>
              Seven of the ten Sephora organic results carry a rating snippet, so their review markup
              is working and Google trusts it. The gap is on the commerce side, not the content side.
            </p>
          </div>
          <div className="card">
            <h4>Two queries where Sephora is nowhere</h4>
            <p style={{ marginBottom: 0 }}>
              On <code>guerlain perfume</code> Ulta takes the top organic result and Sephora is not in
              the top twenty. On <code>givenchy prisme libre</code> the first results are Harrods,
              eBay and Reddit. Both are LVMH-owned brands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
