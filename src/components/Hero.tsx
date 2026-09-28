import type { Analysis, Industry, Markup } from "../types";
import data from "../data/analysis.json";
import ind from "../data/industry.json";
import mk from "../data/markup.json";
import ScoreCard from "./ScoreCard";

const a = data as unknown as Analysis;
const i = ind as unknown as Industry;
const m = mk as unknown as Markup;

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
        <p className="lead" style={{ marginTop: 0 }}>
          Widening to {i.keywords} keywords across the whole category tells us this is not a blanket
          absence &mdash; Sephora holds {i.sephoraCarousel} of{" "}
          {i.carouselTotal.toLocaleString()} carousel listings, third behind Target and Ulta. The
          gaps are concentrated, and they are concentrated on the maisons.
        </p>

        <p className="lead" style={{ marginTop: 0 }}>
          And it is not a markup problem. We read their product pages: every required property
          complete, zero invalid blocks, variants modelled properly. What is missing is the{" "}
          <code>GTIN</code> &mdash; the identifier that tells Google their Rouge Dior is the same
          product Macy&rsquo;s is selling. Not one page we read carries one.
        </p>

        <div className="scorecards" style={{ marginTop: 30 }}>
          <ScoreCard value={`${s.carouselAbsent.length}/${s.n}`} warn
            label="Queries where Sephora is absent from the product carousel"
            sub="carousels appeared on all ten" />
          <ScoreCard value={`${Math.round((i.sephoraAi / i.aiKeywords) * 100)}%`} warn
            label="AI overviews citing Sephora"
            sub={`${i.sephoraAi} of ${i.aiKeywords} — AI answers on ${i.aiPct}% of queries`} />
          <ScoreCard value={`${b.pctLo}–${b.pctHi}%`} warn
            label="Brands Sephora sells that have a Wikidata entity"
            sub={`${b.resolved} of ${b.total} confirmed`} />
          <ScoreCard value={`${a.lvmh.resolved}/${a.lvmh.total}`}
            label="LVMH beauty brands with an entity"
            sub={`across ${a.lvmh.products} products on the site`} />
          <ScoreCard value={`${Math.round((i.sephoraCarousel / i.carouselTotal) * 100)}%`}
            label="Share of all shopping-carousel listings"
            sub={`${i.sephoraCarousel} of ${i.carouselTotal.toLocaleString()}, behind Target and Ulta`} />
          <ScoreCard value={`${m.gtin}/${m.n}`} warn label="Product pages carrying a GTIN"
            sub="required markup is otherwise 100% complete" />
        </div>

        <p style={{ marginTop: 26, fontSize: 13.5, color: "var(--muted)" }}>
          A short pre-call read, not an audit. Everything here is from live search results and the
          public catalogue, gathered without access to anything of Sephora&rsquo;s.
        </p>
      </div>
    </header>
  );
}
