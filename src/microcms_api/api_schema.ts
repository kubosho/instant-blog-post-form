type HeroImage = {
  url: string;
  width: number;
  height: number;
};

export type BlogPostApiSchema = {
  title: string;
  body: string;
  slug: string;
  categories?: string[];
  tags?: string[];
  excerpt?: string;
  heroImage?: HeroImage;
  originalCreatedAt?: number;
  originalRevisedAt?: number;
};
