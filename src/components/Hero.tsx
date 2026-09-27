import type { Analysis } from "../types";
import data from "../data/analysis.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const a = data as unknown as Analysis;

export default function Hero() {
  const s = a.serp;
  const b = a.brandCoverage;
  return (
    <header className="hero" id="overview">
      <div className="container">
        <div className="eyebrow">Product visibility &amp; entity analysis</div>
        <h1>
          On LVMH&rsquo;s own brands, LVMH&rsquo;s own retailer is <em>losing the shelf</em>.
        </h1>
        <p className="lead">
          We took ten commercial queries for products Sephora sells &mdash; most of them LVMH-owned
          brands &mdash; and pulled the live US results. Google showed a shopping carousel on{" "}
          <span className="u-lm">every one of the ten</span>. Sephora is missing from four of those
          carousels, including three Dior products.
        </p>
        <p className="lead" style={{ marginTop: 0 }}>
          On <code>dior sauvage</code>, the retailers Google lists are FragranceNet, Macy&rsquo;s,
          Ulta, Walmart and two resellers. Not Sephora. On a Dior product. Both companies are LVMH.
        </p>

        <div className="scorecards" style={{ marginTop: 30 }}>
          <ScoreCard value={`${s.carouselAbsent.length}/${s.n}`} warn
            label="Queries where Sephora is absent from the product carousel"
            sub="carousels appeared on all ten" />
          <ScoreCard value={`${s.aiCitesSephora}/${s.aiQueries}`} warn
            label="AI overviews citing Sephora"
            sub={`AI answers appeared on ${s.aiQueries} of ${s.n} queries`} />
          <ScoreCard value={`${b.pctLo}–${b.pctHi}%`} warn
            label="Brands Sephora sells that have a Wikidata entity"
            sub={`${b.resolved} of ${b.total} confirmed`} />
          <ScoreCard value={`${a.lvmh.resolved}/${a.lvmh.total}`}
            label="LVMH beauty brands with an entity"
            sub={`across ${a.lvmh.products} products on the site`} />
          <ScoreCard value={fmtInt(a.site.products)} label="Products in the catalogue"
            sub={`${a.site.brands} brands, ${a.site.categories} categories`} />
          <ScoreCard value="0" good label="Identifiers taken on trust"
            sub="every one resolved against the live Wikidata API" />
        </div>

        <p style={{ marginTop: 26, fontSize: 13.5, color: "var(--muted)" }}>
          A short pre-call read, not an audit. Everything here is from live search results and the
          public catalogue, gathered without access to anything of Sephora&rsquo;s.
        </p>
      </div>
    </header>
  );
}
