import type { Analysis } from "../types";
import data from "../data/analysis.json";
import { fmtInt } from "../utils/format";

const a = data as unknown as Analysis;

export default function Lvmh() {
  const rows = [...a.lvmh.brands].sort((x, y) =>
    Number(y.resolved) - Number(x.resolved) || y.sitelinks - x.sitelinks);
  return (
    <section className="section" id="lvmh">
      <div className="container">
        <div className="eyebrow">LVMH brands</div>
        <h2>How well described are the maisons themselves</h2>
        <p className="lead">
          The LVMH beauty brands carried on Sephora, and how each one appears in the reference layer.
          Sitelinks are a rough proxy for how completely an entity is described &mdash; how many
          language editions of Wikipedia carry an article for it.
        </p>

        <div className="tbl-wrap" style={{ marginTop: 24 }}>
          <table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Entity</th>
                <th>Resolves to</th>
                <th>Sitelinks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug}>
                  <td style={{ fontSize: 13.5 }}><strong>{r.name}</strong></td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12,
                    color: r.resolved ? undefined : "var(--warn)", fontWeight: r.resolved ? 400 : 600 }}>
                    {r.qid || "none"}
                  </td>
                  <td style={{ fontSize: 12.5, color: "var(--muted)" }}>
                    {r.resolved ? `${r.label} — ${r.desc}`.slice(0, 68) : "—"}
                  </td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
                    {r.resolved ? r.sitelinks : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid2" style={{ marginTop: 28 }}>
          <div className="card">
            <h4>The heritage houses are well covered</h4>
            <p style={{ marginBottom: 0 }}>
              Dior resolves to Christian Dior with 56 sitelinks and Givenchy to 46. These are
              described in dozens of languages and Google has a great deal to work with. Nothing
              needs doing here.
            </p>
          </div>
          <div className="card">
            <h4>The newer names are thin or absent</h4>
            <p style={{ marginBottom: 0 }}>
              Sol de Janeiro and Patrick Ta each resolve to an entity with a single sitelink. Fresh,
              Marc Jacobs Beauty and Sephora Collection resolve to nothing. Those five are where the
              brand is growing fastest and described least.
            </p>
          </div>
        </div>

        <div className="skyband" style={{ marginTop: 30 }}>
          <h2>Why a retailer should care about its brands&rsquo; entities</h2>
          <p style={{ marginBottom: 0 }}>
            When an assistant is asked what to buy, it reasons over entities: this brand, this
            product type, this ingredient, this price. A brand with no entity cannot be reasoned
            about, only quoted from whichever page the model happens to have read. For{" "}
            {fmtInt(a.lvmh.products)} LVMH products on this site, that is decided by how well the
            maisons are described in a layer neither Sephora nor LVMH currently maintains.
          </p>
        </div>
      </div>
    </section>
  );
}
