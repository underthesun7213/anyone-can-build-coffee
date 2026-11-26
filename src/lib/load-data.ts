// Turns validated tables into what the pages show. No Astro imports (ADR-0005).

import { isEspresso, methodOrder, type MethodCode, type SourceCode, type StatusCode } from './codes.ts';
import { distanceMeters } from './geo.ts';
import { readTables, type Tables } from './tables.ts';
import { formatIssue, validate } from './validate.ts';

export interface Method {
  code: MethodCode;
  source: SourceCode;
  sourceUrl: string;
  sourceUrl2: string;
  checkedAt: string;
}

export interface Station {
  id: string;
  name: { en: string; ja: string };
  lat: number;
  lng: number;
}

export interface Chain {
  id: string;
  name: { en: string; ja: string };
  siteUrl: string;
  note: { en: string; ja: string };
  methods: Method[];
}

export interface Cafe {
  id: string;
  name: { en: string; ja: string };
  address: { en: string; ja: string };
  lat: number;
  lng: number;
  stationId: string;
  status: StatusCode;
  movedTo: string;
  chainId: string;
  cafeUrl: string;
  socialUrl: string;
  /** Own methods, or the chain's for a chain store (PRD v0.6 §8 F3). Espresso first. */
  methods: Method[];
}

export interface SiteData {
  cafes: Cafe[];
  chains: Chain[];
  stations: Station[];
  /** Latest checked_at across all methods. */
  lastUpdated: string;
}

function sortMethods(methods: Method[]): Method[] {
  return [...methods].sort((a, b) => methodOrder(a.code) - methodOrder(b.code));
}

export function nearestStationId(lat: number, lng: number, stations: Station[]): string {
  let best = '';
  let bestDist = Infinity;
  for (const s of stations) {
    const d = distanceMeters(lat, lng, s.lat, s.lng);
    if (d < bestDist) {
      bestDist = d;
      best = s.id;
    }
  }
  return best;
}

export function buildSiteData(tables: Tables): SiteData {
  const toMethod = (m: Record<string, string>): Method => ({
    code: m.method as MethodCode,
    source: m.source_type as SourceCode,
    sourceUrl: m.source_url,
    sourceUrl2: m.source_url_2,
    checkedAt: m.checked_at,
  });

  const stations: Station[] = tables.stations.map((s) => ({
    id: s.id,
    name: { en: s.name_en, ja: s.name_ja },
    lat: Number(s.lat),
    lng: Number(s.lng),
  }));

  const chains: Chain[] = tables.chains.map((c) => ({
    id: c.id,
    name: { en: c.name_en, ja: c.name_ja },
    siteUrl: c.site_url,
    note: { en: c.note_en, ja: c.note_ja },
    methods: sortMethods(tables.methods.filter((m) => m.chain_id === c.id).map(toMethod)),
  }));
  const chainById = new Map(chains.map((c) => [c.id, c]));

  const cafes: Cafe[] = tables.cafes.map((c) => {
    const lat = Number(c.lat);
    const lng = Number(c.lng);
    const own = tables.methods.filter((m) => m.cafe_id === c.id).map(toMethod);
    return {
      id: c.id,
      name: { en: c.name_en, ja: c.name_ja },
      address: { en: c.address_en, ja: c.address_ja },
      lat,
      lng,
      // Computed at build time is the source of truth (data-validation.md Q2).
      stationId: nearestStationId(lat, lng, stations),
      status: c.status as StatusCode,
      movedTo: c.moved_to,
      chainId: c.chain_id,
      cafeUrl: c.cafe_url,
      socialUrl: c.social_url,
      methods: c.chain_id ? (chainById.get(c.chain_id)?.methods ?? []) : sortMethods(own),
    };
  });

  const lastUpdated = tables.methods.map((m) => m.checked_at).filter(Boolean).sort().at(-1) ?? '';

  return { cafes, chains, stations, lastUpdated };
}

export function espressoMethods(cafe: Cafe): Method[] {
  return cafe.methods.filter((m) => isEspresso(m.code));
}

export function otherMethods(cafe: Cafe): Method[] {
  return cafe.methods.filter((m) => !isEspresso(m.code));
}

let cache: SiteData | undefined;

/** Reads `data/`, validates and builds. Throws if validation finds errors, so a broken build never deploys. */
export function loadSiteData(dir?: string): SiteData {
  if (cache && !dir) return cache;
  const { tables, headers } = readTables(dir);
  const errors = validate(tables, headers).filter((i) => i.severity === 'error');
  if (errors.length > 0) {
    throw new Error(`Data validation failed:\n${errors.map(formatIssue).join('\n')}`);
  }
  const data = buildSiteData(tables);
  if (!dir) cache = data;
  return data;
}
