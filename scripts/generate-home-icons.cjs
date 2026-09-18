const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const outputDir = path.join(process.cwd(), "public", "icons");
const green = "#18E58C";

const svg = (body, size = 128) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" stroke="${green}" stroke-width="${size === 64 ? 7 : 7}" stroke-linecap="round" stroke-linejoin="round">
  ${body}
</svg>`;

const icons = {
  "icon-for-you.webp": svg(`
    <path d="M64 18l4.8 14.2L83 37l-14.2 4.8L64 56l-4.8-14.2L45 37l14.2-4.8L64 18Z" />
    <path d="M98 54l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9Z" />
    <path d="M31 71l2.7 8.3L42 82l-8.3 2.7L31 93l-2.7-8.3L20 82l8.3-2.7L31 71Z" />
  `),
  "icon-because-you-read.webp": svg(`
    <path d="M18 31h32c7.7 0 14 6.3 14 14v55c-4.1-4.7-9.2-7-15.5-7H18V31Z" />
    <path d="M110 31H78c-7.7 0-14 6.3-14 14v55c4.1-4.7 9.2-7 15.5-7H110V31Z" />
    <path d="M94 17l3.5 10.5L108 31l-10.5 3.5L94 45l-3.5-10.5L80 31l10.5-3.5L94 17Z" />
  `),
  "icon-you-may-like.webp": svg(`
    <path d="M64 105S23 81 23 51c0-13 10-23 23-23 8 0 15 4 18 11 3-7 10-11 18-11 13 0 23 10 23 23 0 30-41 54-41 54Z" />
    <path d="M97 18l2.8 8.2L108 29l-8.2 2.8L97 40l-2.8-8.2L86 29l8.2-2.8L97 18Z" />
  `),
  "icon-continue-reading.webp": svg(`
    <path d="M17 31h31c8.8 0 16 7.2 16 16v51c-4.5-4.3-9.8-6.5-16-6.5H17V31Z" />
    <path d="M111 31H80c-8.8 0-16 7.2-16 16v51c4.5-4.3 9.8-6.5 16-6.5h31V31Z" />
    <path d="M82 63h28M98 51l12 12-12 12" />
  `),
  "icon-reading-stats.webp": svg(`
    <path d="M24 97V70h20v27M54 97V52h20v45M84 97V34h20v63" />
    <path d="M20 103h88" />
  `),
  "icon-bookshelf.webp": svg(`
    <path d="M24 32h80M24 96h80" />
    <path d="M36 32v64M64 32v64M92 32v64" />
  `),
  "icon-arn-news.webp": svg(`
    <path d="M29 24h62l10 10v70H29z" />
    <path d="M91 24v12h10M43 52h42M43 70h42M43 88h28" />
  `),
  "icon-community.webp": svg(`
    <path d="M22 39c0-10 8-18 18-18h48c10 0 18 8 18 18v23c0 10-8 18-18 18H56L39 94V80h1c-10 0-18-8-18-18V39Z" />
    <path d="M45 51h.1M64 51h.1M83 51h.1" />
  `),
  "icon-continue-from-where.webp": svg(`
    <path d="M17 31h31c8.8 0 16 7.2 16 16v51c-4.5-4.3-9.8-6.5-16-6.5H17V31Z" />
    <path d="M111 31H80c-8.8 0-16 7.2-16 16v51c4.5-4.3 9.8-6.5 16-6.5h31V31Z" />
    <path d="M91 53a15 15 0 1 0 8 13M99 53v8h-8" />
  `),
  "icon-reading-updates.webp": svg(`
    <path d="M18 32h30c8.8 0 16 7.2 16 16v51c-4.3-4.5-9.6-6.8-15.8-6.8H18V32Z" />
    <path d="M110 32H80c-8.8 0-16 7.2-16 16v51c4.3-4.5 9.6-6.8 15.8-6.8H110V32Z" />
    <path d="M94 18l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9Z" />
  `),
  "icon-near-completion.webp": svg(`
    <path d="M28 18h72v92l-36-20-36 20V18Z" />
    <path d="m43 62 13 13 29-31" />
  `),
  "icon-return-favorite.webp": svg(`
    <path d="M64 101S25 78 25 50c0-12 9-21 21-21 8 0 15 4 18 11 3-7 10-11 18-11 12 0 21 9 21 21 0 28-39 51-39 51Z" />
    <path d="M20 91c-2-9 1-17 8-22M28 69h-9M28 69v9" />
  `),
  "icon-bookmark.webp": svg(`
    <path d="M35 22.5h50c4.1 0 7.5 3.4 7.5 7.5v65l-32.5-19-32.5 19V30c0-4.1 3.4-7.5 7.5-7.5Z" />
  `),
  "icon-followed-writers.webp": svg(`
    <circle cx="48" cy="43" r="12" />
    <circle cx="80" cy="43" r="12" />
    <path d="M25 99c2-18 12-29 25-29s23 11 25 29M53 99c2-15 10-24 23-24s21 9 23 24" />
  `),
  "icon-followed-stories.webp": svg(`
    <path d="M29 103V30h27v73" />
    <path d="M67 103V20h30v83" />
    <path d="M24 103h80" />
  `),
};

const sidebarIcons = {
  "sidebar-stats.webp": svg(`
    <path d="M19 43V33M32 43V25M45 43V17" />
  `, 64),
  "sidebar-library.webp": svg(`
    <path d="M20 46V20h11v26ZM35 46V14h12v32Z" />
  `, 64),
  "sidebar-community.webp": svg(`
    <circle cx="25" cy="24" r="6" />
    <circle cx="39" cy="24" r="6" />
    <path d="M14 45c1-7 5-11 11-11 4 0 7 2 9 5M30 39c2-3 5-5 9-5 6 0 10 4 11 11" />
  `, 64),
  "sidebar-news.webp": svg(`
    <rect x="16" y="13" width="32" height="38" rx="4" />
    <path d="M25 28h14M25 37h14" />
  `, 64),
  "sidebar-reading-status.webp": svg(`
    <path d="M19 43V33M32 43V25M45 43V17" />
  `, 64),
  "sidebar-latest-reading.webp": svg(`
    <circle cx="32" cy="32" r="18" />
    <path d="M32 21v12l8 5" />
  `, 64),
  "sidebar-new-episodes.webp": svg(`
    <rect x="17" y="13" width="30" height="38" rx="4" />
    <path d="M25 32h14M32 25v14" />
  `, 64),
  "sidebar-reading-notes.webp": svg(`
    <path d="M18 13h28v38H18z" />
    <path d="M25 26h14M25 36h14" />
  `, 64),
  "sidebar-trending-writers.webp": svg(`
    <circle cx="25" cy="23" r="6" />
    <path d="M14 45c1-7 5-11 11-11 5 0 9 3 11 8M38 42l9-9M40 33h7v7" />
  `, 64),
  "sidebar-following-activity.webp": svg(`
    <path d="M32 13c-7 0-12 5-12 12v8l-5 7h34l-5-7v-8c0-7-5-12-12-12Z" />
    <path d="M27 45c1 3 3 5 5 5s4-2 5-5" />
  `, 64),
  "sidebar-following-management.webp": svg(`
    <circle cx="32" cy="32" r="7" />
    <path d="m32 13 2 5 5 1 4-3 4 4-3 4 1 5 5 2v5l-5 2-1 5 3 4-4 4-4-3-5 1-2 5h-5l-2-5-5-1-4 3-4-4 3-4-1-5-5-2v-5l5-2 1-5-3-4 4-4 4 3 5-1 2-5h5Z" />
  `, 64),
  "sidebar-following-updates.webp": svg(`
    <path d="M17 45V28M27 45V20M37 45V12M47 45H13" />
  `, 64),
};

fs.mkdirSync(outputDir, { recursive: true });

Promise.all(
  Object.entries(icons).map(async ([filename, markup]) => {
    await sharp(Buffer.from(markup)).resize(128, 128).webp({ quality: 100 }).toFile(path.join(outputDir, filename));
  }).concat(Object.entries(sidebarIcons).map(async ([filename, markup]) => {
    await sharp(Buffer.from(markup)).resize(64, 64).webp({ quality: 100 }).toFile(path.join(outputDir, filename));
  })),
).then(() => {
  console.log(`Generated ${Object.keys(icons).length + Object.keys(sidebarIcons).length} homepage icons in ${outputDir}`);
}).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
