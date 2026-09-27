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
