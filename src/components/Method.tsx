import type { Analysis } from "../types";
import data from "../data/analysis.json";

const a = data as unknown as Analysis;

export default function Method() {
  return (
    <section className="section" id="method">
      <div className="container">
        <div className="eyebrow">Method</div>
        <h2>How this was put together, and what it is not</h2>
        <p className="lead">
          This is a pre-call read assembled from public sources in a few hours. It is deliberately
          narrow, and the limits matter as much as the findings.
        </p>

        <div className="grid2" style={{ marginTop: 26 }}>
          <div className="card">
            <h4>What was measured</h4>
            <ul className="clean">
              <li>
                Live US search results across 63 keywords, captured with their SERP features,
                carousel sellers and AI citations.
              </li>
              <li>
                Product-page structured data on a sample of 21 pages, checked
                property by property against Google&rsquo;s merchant listing requirements.
              </li>
              <li>
                Every brand in Sephora&rsquo;s published catalogue resolved against the live Wikidata
                API and screened on label, description and class before being accepted.
              </li>
              <li>
                Catalogue counts read from the site&rsquo;s own published index.
              </li>
            </ul>
          </div>
          <div className="card">
            <h4>What it is not</h4>
            <ul className="clean">
              <li>
                Not a <em>full</em> markup audit. Product-page structured data was read, but from
                {" "}stored copies and on a sample of {21} pages, so it
                establishes the template rather than measuring coverage across 9,841 products.
              </li>
              <li>
                Not a full keyword study. Ten queries, chosen to concentrate on LVMH brands.
              </li>
              <li>
                Not a census of brand entities. {a.brandCoverage.resolved} of{" "}
                {a.brandCoverage.total} confirmed, with a measured recall of{" "}
                {a.brandCoverage.recall}%, which is why coverage is given as a range.
              </li>
            </ul>
          </div>
        </div>

        <div className="skyband" style={{ marginTop: 30 }}>
          <h2>On the identifiers</h2>
          <p style={{ marginBottom: 0 }}>
            Every Wikidata identifier here was resolved against the live API and screened before use.
            None came from a language model. That matters because a plausible identifier and a
            correct one look identical in a spreadsheet: searching Wikidata for these brands returns
            an Ottoman sultan for one, a Charles Trenet song for another, and a genus of molluscs for
            a third. Accepting the first result would have produced a confident and entirely wrong
            report.
          </p>
        </div>
      </div>
    </section>
  );
}
