import { readFile, writeFile } from 'node:fs/promises';

// Keep the upstream Metrics layout and data; match GitHub's two text palettes.
export function palette(svg, theme) {
  const colors = theme === 'dark'
    ? ['#c9d1d9', '#58a6ff', '#8b949e']
    : ['#57606a', '#0969da', '#6e7781'];
  const css = `<style id="profile-palette">svg{color:${colors[0]}!important}h1,h2,h3{color:${colors[1]}!important}.field svg{fill:${colors[2]}!important}small{color:${colors[2]}!important}</style>`;
  return svg.replace(/<style id="profile-palette">[\s\S]*?<\/style>/g, '')
    .replace(/(<svg\b[^>]*>)/, `$1${css}`);
}

export async function writeThemes(stem, svg) {
  for (const theme of ['light', 'dark']) {
    const target = new URL(`../../assets/metrics-${stem}-${theme}.svg`, import.meta.url);
    await writeFile(target, palette(svg, theme));
  }
}

if (process.argv.includes('--from-action')) {
  for (const stem of ['overview', 'languages']) {
    const svg = await readFile(new URL(`../../assets/metrics-${stem}.svg`, import.meta.url), 'utf8');
    if (!svg.includes('<svg') || /Something went wrong|An error occurred/i.test(svg)) {
      throw new Error(`Metrics ${stem}: invalid output`);
    }
    await writeThemes(stem, svg);
  }
}
