import type { MetadataRoute } from "next";

const BASE_URL = "https://cada-galaxy.de";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0, changeFrequency: "monthly" },
    { url: `${BASE_URL}/leistungen`, lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/kontakt`, lastModified: new Date(), priority: 0.85, changeFrequency: "monthly" },
    { url: `${BASE_URL}/prozess`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/referenzen`, lastModified: new Date(), priority: 0.75, changeFrequency: "monthly" },
    { url: `${BASE_URL}/technologie`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), priority: 0.65, changeFrequency: "monthly" },
    { url: `${BASE_URL}/ueber-uns`, lastModified: new Date(), priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/impressum`, lastModified: new Date(), priority: 0.2, changeFrequency: "yearly" },
    { url: `${BASE_URL}/datenschutz`, lastModified: new Date(), priority: 0.2, changeFrequency: "yearly" },
  ];
}
