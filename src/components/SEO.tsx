import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Songram | Music Creation & Social Platform for Artists',
  description = 'Songram is the ultimate social platform for music creators. Create beats, share songs, connect with artists, and go viral. Join the music revolution today.',
  keywords = 'music creation, beat maker, music social media, song sharing, music collaboration, music platform, artist community, music production, songwriting, music app',
  image = 'https://songram.app/songram_preview.png',
  url = 'https://songram.app',
  type = 'website',
  noindex = false,
}) => {
  const fullTitle = title.includes('Songram') ? title : `${title} | Songram`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
