import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.lacquerandivory.com";
  const staticRoutes = ["", "/shop", "/art-prints", "/mahjong", "/about", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })
  );
  const productRoutes = getAllProducts().map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...productRoutes];
}
