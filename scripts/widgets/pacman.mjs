import { ArcadeRenderer } from 'pacman-contribution-graph';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const username = process.env.PROFILE_USERNAME || 'FlyingDoggy';
const token = process.env.METRICS_TOKEN || process.env.GH_TOKEN ||
  execFileSync('gh', ['auth', 'token', '--hostname', 'github.com'], { encoding: 'utf8' }).trim();
const output = fileURLToPath(new URL('../../assets/', import.meta.url));
await mkdir(output, { recursive: true });

for (const [theme, name] of [['github', 'light'], ['github-dark', 'dark']]) {
  let svg;
  const renderer = new ArcadeRenderer({
    game: 'pacman', platform: 'github', username,
    gameTheme: theme, showMonthLabels: true,
    githubSettings: { accessToken: token },
    svgCallback: result => { svg = result; },
  });
  await renderer.start();
  if (!svg?.includes('<svg') || !svg.includes('<animate')) {
    throw new Error(`Pac-Man ${name}: no animated SVG was generated`);
  }
  await writeFile(`${output}/pacman-${name}.svg`, svg.replace(/[\t ]+$/gm, ''));
  console.log(`Generated pacman-${name}.svg from ${username}'s contribution calendar`);
}
