// Runs the data checks on data/ (or a directory given as the first argument).
// Exits 1 if there is any error, so CI and the deploy stop before building.

import { readTables } from '../src/lib/tables.ts';
import { formatIssue, validate } from '../src/lib/validate.ts';
import { buildSiteData } from '../src/lib/load-data.ts';

const dir = process.argv[2];
const { tables, headers } = readTables(dir);
const issues = validate(tables, headers);
const errors = issues.filter((i) => i.severity === 'error');
const warnings = issues.filter((i) => i.severity === 'warning');

for (const issue of [...errors, ...warnings]) console.log(formatIssue(issue));

if (errors.length > 0) {
  console.error(`\nData validation failed: ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}

// Summary (data-validation.md §5). Informational only.
const data = buildSiteData(tables);
const active = data.cafes.filter((c) => c.status === 'active');
console.log(`Data OK: ${errors.length} errors, ${warnings.length} warnings.`);
for (const s of data.stations) {
  const here = active.filter((c) => c.stationId === s.id);
  const independent = here.filter((c) => !c.chainId).length;
  console.log(`  ${s.id}: ${independent} independent cafe(s), ${here.length - independent} chain store(s)`);
}
const byStatus = { espresso_semi: 0, espresso_auto: 0, espresso_none: 0 } as Record<string, number>;
for (const c of active.filter((c) => !c.chainId)) {
  for (const m of c.methods) if (m.code in byStatus) byStatus[m.code]++;
}
console.log(`  independent cafes by espresso status: ${JSON.stringify(byStatus)}`);
