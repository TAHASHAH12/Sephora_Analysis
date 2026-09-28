import type { Analysis } from "../types";
import data from "../data/analysis.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const a = data as unknown as Analysis;

export default function Scale() {
  return (
    <section className="section" id="scale">
      <div className="container">
        <div className="eyebrow">Catalogue</div>
        <h2>What the shelf actually looks like</h2>
        <p className="lead">
          Taken from Sephora&rsquo;s own published catalogue. It is a useful frame for the numbers
          above, because it sets how much is at stake per point of coverage.
        </p>

        <div className="scorecards" style={{ marginTop: 26 }}>
          <ScoreCard value={fmtInt(a.site.products)} label="Products published" />
          <ScoreCard value={fmtInt(a.site.brands)} label="Brands carried" />
          <ScoreCard value={fmtInt(a.site.categories)} label="Shopping categories" />
          <ScoreCard value={fmtInt(a.lvmh.products)} label="Products from LVMH beauty brands"
            sub={`${a.lvmh.total} maisons`} />
        </div>

        <div className="grid2" style={{ marginTop: 30 }}>
          <div className="card">
            <h4>What the site already does well</h4>
            <p>
              The homepage carries a well-formed organisation and website block, a search action, and
              a structured description of the Beauty Insider loyalty programme &mdash; which is a
              genuinely sophisticated thing to mark up and most retailers do not.
            </p>
            <p style={{ marginBottom: 0, fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--muted)" }}>
              {a.site.homepageTypes.join(" · ")}
            </p>
          </div>
          <div className="card">
            <h4>What we could and could not see</h4>
            <p>
              Product pages refuse automated requests, so the markup audit is built from stored
              copies rather than a live crawl. That was enough to establish the template &mdash; see
              the markup section &mdash; but not enough to measure coverage across the catalogue.
            </p>
            <p style={{ marginBottom: 0 }}>
              The open question is not what a Sephora product page looks like. It is how many of the
              9,841 look like the ones we read.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
