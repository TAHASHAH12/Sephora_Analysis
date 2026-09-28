import type { Industry } from "../types";
import ind from "../data/industry.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const i = ind as unknown as Industry;

const KIND_NOTE: Record<string, string> = {
  "brand site": "the maisons and DTC brands themselves",
  retailer: "Sephora, Ulta, Amazon, Target, the department stores",
  "UGC / social": "Reddit, YouTube, Instagram, TikTok",
  "editorial / reference": "Allure, Byrdie, NYT Wirecutter, Fragrantica, Wikipedia",
};

export default function Industry_() {
  const kinds = Object.entries(i.byKind).sort((a, b) => b[1] - a[1]);
  const kindTotal = kinds.reduce((s, [, n]) => s + n, 0);
  const sellers = i.carouselSellers.slice(0, 10);
  const maxSeller = sellers[0]?.n || 1;

  return (
    <section className="section" id="industry">
      <div className="container">
        <div className="eyebrow">Industry snapshot</div>
        <h2>What the whole category looks like, not just Sephora</h2>
        <p className="lead">
          We widened the sample: {i.keywords} keywords spanning{" "}
          {fmtInt(i.volume)} monthly searches across fragrance, makeup, skincare, haircare, tools,
          brand terms and research queries. For each we took the top ten results, then read the
          structured data on every page that ranked &mdash;{" "}
          <span className="u-lm">{fmtInt(i.urls)} pages across {i.domains} domains</span>.
        </p>

        <div className="scorecards" style={{ marginTop: 28 }}>
          <ScoreCard value={fmtInt(i.urls)} label="Ranking pages read"
            sub={`${i.read} readable of ${i.urls}`} />
          <ScoreCard value={`${i.carouselPct}%`} label="Keywords showing a shopping carousel"
            sub={`${i.carouselKeywords} of ${i.keywords}`} />
          <ScoreCard value={`${i.aiPct}%`} label="Keywords with an AI overview"
            sub={`${i.aiKeywords} of ${i.keywords}`} />
          <ScoreCard value={`${Math.round((i.sephoraAi / i.aiKeywords) * 100)}%`} warn
            label="Of those AI answers citing Sephora"
            sub={`${i.sephoraAi} of ${i.aiKeywords}`} />
        </div>

        <h3 style={{ margin: "34px 0 10px" }}>Who holds the top ten</h3>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr><th>Type of site</th><th>Share of ranking pages</th><th>Who that is</th></tr>
            </thead>
            <tbody>
              {kinds.map(([k, n]) => (
                <tr key={k}>
                  <td style={{ fontSize: 13.5 }}><strong>{k}</strong></td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
                    {Math.round((n / kindTotal) * 100)}% &nbsp;({n})
                  </td>
                  <td style={{ fontSize: 12.5, color: "var(--muted)" }}>{KIND_NOTE[k]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="skyband" style={{ marginTop: 30 }}>
          <h2>Only {i.pageTypes["product page"]} of {fmtInt(i.urls)} ranking pages are product pages</h2>
          <p>
            {i.pageTypes["category / listing"]} are category or listing pages, and the rest are
            editorial, forum threads, brand landing pages and video. In a category worth eight
            million searches a month, the top ten is won by <em>content about products</em>, not by
            product listings.
          </p>
          <p style={{ marginBottom: 0 }}>
            That is the strategic point. Optimising product pages competes for a tenth of the
            available real estate. The other nine tenths is being taken by brands, publishers and
            Reddit.
          </p>
        </div>

        <h3 style={{ margin: "34px 0 10px" }}>Who Google lists in the shopping carousel</h3>
        <p style={{ fontSize: 14, maxWidth: "72ch" }}>
          Across {i.carouselKeywords} carousels there were {fmtInt(i.carouselTotal)} retailer
          listings. Sephora holds {i.sephoraCarousel} of them &mdash;{" "}
          {Math.round((i.sephoraCarousel / i.carouselTotal) * 100)}%, third behind Target and Ulta.
        </p>
        <div style={{ marginTop: 16 }}>
          {sellers.map((s) => {
            const mine = s.seller.toLowerCase().includes("sephora");
            return (
              <div key={s.seller} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 7 }}>
                <div style={{ width: 150, fontSize: 13, fontWeight: mine ? 700 : 400, flexShrink: 0 }}>
                  {s.seller}
                </div>
                <div style={{ flex: 1, background: "var(--line)", borderRadius: 4, height: 16, overflow: "hidden" }}>
                  <div style={{
                    width: `${(s.n / maxSeller) * 100}%`, height: "100%",
                    background: mine ? "var(--ny)" : "var(--bl)",
                  }} />
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, width: 40, textAlign: "right" }}>
                  {s.n}
                </div>
              </div>
            );
          })}
        </div>

        <h3 style={{ margin: "34px 0 10px" }}>Product markup, compared like for like</h3>
        <p style={{ fontSize: 14, maxWidth: "72ch" }}>
          Only counting actual product pages, because comparing a product page to a category page
          tells you nothing. The brands mark up their own products better than the retailers selling
          them do.
        </p>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr><th>Site type</th><th>Product pages read</th><th>Carry Product</th><th>Carry Offer</th></tr>
            </thead>
            <tbody>
              {Object.entries(i.pdpByKind).sort((a, b) => b[1].n - a[1].n).map(([k, v]) => (
                <tr key={k}>
                  <td style={{ fontSize: 13.5 }}>{k}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{v.n}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{v.product}%</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{v.offer}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: "34px 0 10px" }}>Who the AI answers cite</h3>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Domain</th><th>AI overviews citing it</th></tr></thead>
            <tbody>
              {i.aiTop.map((a) => (
                <tr key={a.domain}>
                  <td style={{ fontSize: 13.5, fontWeight: a.domain.includes("sephora") ? 700 : 400 }}>
                    {a.domain}
                  </td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{a.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 20, fontSize: 13, color: "var(--muted)" }}>
          {i.unread} of the {fmtInt(i.urls)} ranking pages could not be read &mdash; Reddit, Amazon
          and several brand sites block automated requests. Those are recorded as unread, not as
          pages without markup. Sephora&rsquo;s own pages are among them, which is why this section
          rates the category rather than Sephora&rsquo;s own templates.
        </p>
      </div>
    </section>
  );
}
