export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterHashtags: string[];
}

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  author: string;
  authorLink: string;
  readTime: string;
  category: string;
  platformTags: string[];
  coverImage: string;
  coverImageAlt?: string;
  contentFile: string; // e.g. "app/insights/articles/how-to-scale-your-shopify-store-in-2025.md"
  ctaBookDemoLink: string;
  ctaWhatsAppLink: string;
  featured?: boolean;
  seo: BlogSEO;
}
