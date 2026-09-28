export interface SerpQuery {
  q: string;
  sephora_pos: number | null;
  sephora_rating: boolean;
  top3: string[];
  pop_sellers: string[];
  has_ai: boolean;
  ai_refs: string[];
  features: string[];
}

export interface LvmhBrand {
  slug: string;
  name: string;
  resolved: boolean;
  qid: string;
  label: string;
  sitelinks: number;
  desc: string;
}

export interface MissingBrand {
  name: string;
  products: number;
  near: string;
}

export interface Analysis {
  site: {
    products: number;
    brands: number;
    categories: number;
    homepageTypes: string[];
  };
  brandCoverage: {
    resolved: number;
    total: number;
    pctLo: number;
    pctHi: number;
    recall: number;
    controlN: number;
    controlOk: number;
    controlMiss: string[];
    missingBig: MissingBrand[];
  };
  lvmh: {
    brands: LvmhBrand[];
    resolved: number;
    total: number;
    products: number;
  };
  serp: {
    queries: SerpQuery[];
    features: Record<string, number>;
    n: number;
    carouselAbsent: string[];
    aiQueries: number;
    aiCitesSephora: number;
  };
}

export interface Industry {
  keywords: number;
  volume: number;
  urls: number;
  read: number;
  domains: number;
  aiKeywords: number;
  aiPct: number;
  aiTop: { domain: string; n: number }[];
  sephoraAi: number;
  carouselKeywords: number;
  carouselPct: number;
  carouselSellers: { seller: string; n: number }[];
  sephoraCarousel: number;
  carouselTotal: number;
  pageTypes: Record<string, number>;
  byKind: Record<string, number>;
  pdpByKind: Record<string, { n: number; product: number; offer: number }>;
  pdpRows: { domain: string; kind: string; n: number; product: number; offer: number; rating: number }[];
  types: Record<string, number>;
  unread: number;
}

export interface Markup {
  n: number;
  from: string;
  to: string;
  invalid: number;
  types: { type: string; pages: number; pct: number }[];
  required: { prop: string; pages: number; pct: number; on: string }[];
  recommended: { prop: string; pages: number; pct: number; note: string }[];
  gtin: number;
}
