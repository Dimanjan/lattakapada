import { useEffect } from 'react';

type SeoProps = {
  title: string;
  description: string;
  image?: string;
};

export function Seo({ title, description, image = '/formal_pant2.webp' }: SeoProps) {
  useEffect(() => {
    document.title = title;

    updateMeta('name', 'description', description);
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:image', image);
    updateMeta('property', 'twitter:card', 'summary_large_image');
  }, [description, image, title]);

  return null;
}

function updateMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}
