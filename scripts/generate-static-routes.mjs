import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const siteUrl = "https://ghadertourism.com";
const distDir = new URL("../dist/", import.meta.url);
const source = await readFile(new URL("index.html", distDir), "utf8");

const pages = {
  transfers: {
    title: "VIP Airport Transfer Beirut & Private Taxi Lebanon | Ghader Tourism",
    description: "Reserve a private Beirut airport transfer with meet and greet, flight monitoring, and comfortable vehicles for destinations across Lebanon.",
  },
  tours: {
    title: "Private Lebanon Day Trips with Car & Driver | Ghader Tourism",
    description: "Explore Jeita, Byblos, Batroun, Baalbek, Beirut, Chouf and more with a private vehicle and professional local driver.",
  },
  fleet: {
    title: "Private Chauffeur Fleet in Lebanon | Ghader Tourism",
    description: "Choose an executive sedan, SUV, family minivan or group vehicle for airport transfers, private drivers and Lebanon tours.",
  },
  about: {
    title: "About Ghader Tourism | Private Transport in Lebanon",
    description: "Meet Ghader Tourism, a family-operated private transportation and tour service built around reliable Lebanese hospitality.",
  },
  reviews: {
    title: "Guest Reviews | Ghader Tourism Lebanon",
    description: "Read guest feedback about Ghader Tourism private airport transfers, chauffeur services and tours across Lebanon.",
  },
  contact: {
    title: "Contact Ghader Tourism | Book on WhatsApp",
    description: "Contact Ghader Tourism for Beirut airport transfers, private drivers, custom tours and clear trip quotes via WhatsApp, phone or email.",
  },
};

const escapeAttribute = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

for (const [route, page] of Object.entries(pages)) {
  const canonical = `${siteUrl}/${route}`;
  let html = source
    .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeAttribute(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeAttribute(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeAttribute(page.description)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`);

  const targetDir = join(fileURLToPath(distDir), route);
  await mkdir(targetDir, { recursive: true });
  await writeFile(join(targetDir, "index.html"), html);
}

console.log(`Generated metadata entry points for ${Object.keys(pages).length} routes.`);
