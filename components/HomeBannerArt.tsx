import { getImageProps } from "next/image";

export type BannerArtSources = {
  desktop: string;
  tablet: string;
  mobile: string;
};

export default function HomeBannerArt({ id, alt, className, eager = false, sources }: {
  id: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sources?: BannerArtSources;
}) {
  const common = {
    alt,
    sizes: "(min-width: 1536px) 1536px, 100vw",
    loading: eager ? "eager" as const : "lazy" as const,
    fetchPriority: eager ? "high" as const : "auto" as const,
  };
  const desktop = getImageProps({ ...common, src: sources?.desktop ?? `/images/home-banners/${id}-pc-lettered.webp`, width: 1536, height: 512 }).props;
  const tablet = getImageProps({ ...common, src: sources?.tablet ?? `/images/home-banners/${id}-tablet-lettered.webp`, width: 1024, height: 512 }).props;
  const mobile = getImageProps({ ...common, src: sources?.mobile ?? `/images/home-banners/${id}-mobile-lettered.webp`, width: 768, height: 960 }).props;

  return (
    <picture>
      <source media="(min-width: 1280px)" srcSet={desktop.srcSet} sizes={desktop.sizes} width={1536} height={512} />
      <source media="(min-width: 768px)" srcSet={tablet.srcSet} sizes={tablet.sizes} width={1024} height={512} />
      <img {...mobile} className={className} />
    </picture>
  );
}
