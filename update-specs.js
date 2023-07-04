import fetch from 'node-fetch';
import { load } from 'cheerio';
import { unlinkSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const commentsInSource = [
  ' Requires trust option',
  'TeX (strict) syntax',
  'non-strict syntax',
  ' KaTeX supports A-Za-z',
  ' KaTeX supports A-Z k',
  ' KaTeX supports A-Z & k',
  'KaTeX supports A-Z & k',
  'KaTeX supports A-Z',
  ' supports A-Z & k',
  ' Must enable trust and disable strict option'
];
const specsToIgnore = [
  '\\url',
  '\\mathclap',
  '\\hspace',
  '\\endgroup',
  '\\begingroup',
  '\\angln',
  '\\angl',
  '\\}',
  '\\{',
  '\\vcenter',
  '\\raisebox',
  '\\mathscr',
  '\\mathnormal',
  '\\mathit',
  '\\mathfrak',
  '\\mathbb',
  '\\dotsm',
  '\\$'
];

async function updateSpecs() {
  const specsFile = resolve('./spec/specs.json');
  try {
    unlinkSync(specsFile);
  } catch (ex) {
    // no file exists
  }
  try {
    const res = await fetch('https://katex.org/docs/support_table.html');
    const html = await res.text();
    const $ = load(html);
    const specs = [];
    $('table').each((i, table) => {
      const title = $('thead th', table).text().trim();
      if (title !== 'Symbol/FunctionRenderedSource or Comment') {
        return;
      }

      $('tbody tr', table).each((i, row) => {
        const tds = $('td', row);
        const name = $(tds[0]).text()?.trim();
        const rendered = $(tds[1]).html()?.trim();
        let source = $(tds[2]).text()?.trim();
        if (specsToIgnore.includes(name)) {
          return;
        }
        if (!rendered || rendered.includes('Not supported')) {
          return;
        }
        if (source.includes('Requires an extension')) {
          return;
        }
        let trust = source.includes('Requires trust option');
        let strict;
        if (source.includes('Must enable trust and disable strict option')) {
          trust = true;
          strict = false;
        }
        for (const comment of commentsInSource) {
          source = source.replace(comment, '');
        }
        specs.push({
          name,
          rendered,
          source: source || name,
          options: {
            displayMode: !!rendered?.includes('katex-display'),
            trust,
            strict
          }
        });
      });
    });
    writeFileSync(specsFile, JSON.stringify(specs, null, 2).replace(/\u00a0+/g, '\\n') + '\n');
    console.log('Saved specs.');
  } catch (ex) {
    console.log(ex);
  }
}

await updateSpecs();
