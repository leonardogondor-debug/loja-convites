import type { MetadataRoute } from 'next';
import { categorias, convites } from '@/lib/convites';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return [
    { url: site.url, lastModified: agora, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/convites`, lastModified: agora, changeFrequency: 'weekly', priority: 0.9 },
    ...categorias.map((c) => ({
      url: `${site.url}/categorias/${c.slug}`,
      lastModified: agora,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...convites.map((c) => ({
      url: `${site.url}/convites/${c.slug}`,
      lastModified: agora,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
