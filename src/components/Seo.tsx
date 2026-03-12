import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title: string;
  description: string;
  image?: string;
};

export function Seo({ title, description, image = '/formal_pant2.webp' }: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
