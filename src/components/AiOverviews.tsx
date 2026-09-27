import type { Analysis } from "../types";
import data from "../data/analysis.json";
import ScoreCard from "./ScoreCard";

const a = data as unknown as Analysis;

export default function AiOverviews() {
  const withAi = a.serp.queries.filter((q) => q.has_ai);
  return (
    <section className="section" id="ai">
      <div className="container">
        <div className="eyebrow">AI overviews</div>
        <h2>The answer above the results</h2>
        <p className="lead">
          Google generated an AI overview on {a.serp.aiQueries} of the ten queries. It cites its
          sources, and those citations are the new front page. Sephora is cited in{" "}
          <span className="u-lm">{a.serp.aiCitesSephora} of the {a.serp.aiQueries}</span>.
        </p>

        <div className="scorecards" style={{ marginTop: 26 }}>
          <ScoreCard value={`${a.serp.aiQueries}/${a.serp.n}`} label="Queries with an AI overview"
            sub="generated above the organic results" />
          <ScoreCard value={`${a.serp.aiCitesSephora}`} label="Of those, citing Sephora" warn
            sub={`${a.serp.aiQueries - a.serp.aiCitesSephora} do not`} />
          <ScoreCard value={`${a.serp.features["people_also_ask"] ?? 0}/${a.serp.n}`}
            label="Queries with People Also Ask" sub="more answer surface above the result" />
          <ScoreCard value={`${a.serp.features["knowledge_graph"] ?? 0}/${a.serp.n}`}
            label="Queries with a knowledge panel" sub="entity-driven, not page-driven" />
        </div>

        <div className="tbl-wrap" style={{ marginTop: 28 }}>
          <table>
            <thead>
              <tr><th>Query</th><th>Sephora cited</th><th>Who the AI answer cites</th></tr>
            </thead>
            <tbody>
              {withAi.map((q) => {
                const cited = q.ai_refs.some((d) => d.includes("sephora"));
                return (
                  <tr key={q.q}>
                    <td style={{ fontSize: 13.5 }}><strong>{q.q}</strong></td>
                    <td style={{ fontFamily: "var(--mono)", fontSize: 12,
                      color: cited ? "var(--ok)" : "var(--warn)", fontWeight: 600 }}>
                      {cited ? "yes" : "no"}
                    </td>
                    <td style={{ fontSize: 12.5, color: "var(--muted)" }}>
                      {q.ai_refs.join(", ") || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="skyband" style={{ marginTop: 30 }}>
          <h2>Why this connects to the entity work</h2>
          <p>
            An AI answer is assembled from sources a model can identify and trust. Knowledge panels
            appeared on seven of the ten queries, which means Google already holds an entity for most
            of these brands and is answering from it.
          </p>
          <p style={{ marginBottom: 0 }}>
            The question worth asking is whose entity it is, and how well described. That is the next
            section, and it is where the position is weaker than it looks.
          </p>
        </div>
      </div>
    </section>
  );
}
