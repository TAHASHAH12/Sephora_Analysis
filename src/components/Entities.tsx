import type { Analysis } from "../types";
import data from "../data/analysis.json";
import ScoreCard from "./ScoreCard";

const a = data as unknown as Analysis;
const b = a.brandCoverage;

export default function Entities() {
  return (
    <section className="section" id="entities">
      <div className="container">
        <div className="eyebrow">Brand entities</div>
        <h2>Three quarters of the brands on the shelf do not exist to a machine</h2>
        <p className="lead">
          Sephora carries {b.total} brands. We resolved every one against Wikidata, which is the
          reference layer Google&rsquo;s knowledge graph and most AI assistants read from.{" "}
          <span className="u-lm">
            {b.resolved} have an entity &mdash; between {b.pctLo}% and {b.pctHi}% of the shelf.
          </span>{" "}
          The rest are, to a machine, a string of text on a page.
        </p>

        <div className="scorecards" style={{ marginTop: 26 }}>
          <ScoreCard value={`${b.resolved}`} label="Brands with a confirmed entity"
            sub={`of ${b.total} carried`} />
          <ScoreCard value={`${b.total - b.resolved}`} warn label="Brands with none found"
            sub="a name on a page, nothing more" />
          <ScoreCard value={`${b.pctLo}–${b.pctHi}%`} label="True coverage range"
            sub={`method recall measured at ${b.recall}%`} />
          <ScoreCard value={`${b.controlOk}/${b.controlN}`} good label="Control-set accuracy"
            sub="known brands the method found" />
        </div>

        <h3 style={{ margin: "34px 0 10px" }}>The largest brands with no entity</h3>
        <p style={{ fontSize: 14, maxWidth: "70ch" }}>
          Ranked by how many products Sephora lists for them. These are not obscure lines &mdash;
          they are ranges with dozens of SKUs each, and nothing in the public reference layer
          describes them.
        </p>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr><th>Brand</th><th>Products on Sephora</th><th>Nearest thing found instead</th></tr>
            </thead>
            <tbody>
              {b.missingBig.map((m) => (
                <tr key={m.name}>
                  <td style={{ fontSize: 13.5 }}><strong>{m.name}</strong></td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{m.products}</td>
                  <td style={{ fontSize: 12.5, color: "var(--muted)" }}>{m.near || "nothing"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="skyband" style={{ marginTop: 32 }}>
          <h2>Sephora Collection is the sharpest example</h2>
          <p style={{ marginBottom: 0 }}>
            The house label &mdash; the one range where the margin is entirely LVMH&rsquo;s and the
            brand equity is entirely Sephora&rsquo;s &mdash; carries 73 products on the site and has
            no Wikidata entity at all. Every third-party brand on the shelf that does have one is,
            in machine terms, better described than the house brand.
          </p>
        </div>

        <p style={{ marginTop: 22, fontSize: 13, color: "var(--muted)" }}>
          Stated as a range because the method was measured rather than assumed: against a control
          set of {b.controlN} brands we know have entities, it found {b.controlOk}. The misses were{" "}
          {b.controlMiss.join(", ")} &mdash; brands whose names are ordinary words, which a search
          cannot disambiguate. The real figure sits between the two.
        </p>
      </div>
    </section>
  );
}
