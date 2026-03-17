import { Helmet } from 'react-helmet-async'
import { pageMetadata, getStructuredData } from '../utils/seoConfig'
import HeroCarousel from '../components/HeroCarousel'
import TrustBar from '../components/TrustBar'
import FeaturedCollections from '../components/FeaturedCollections'
import SocialProof from '../components/SocialProof'
import PageTransition from '../components/PageTransition'

export default function Home() {
  const metadata = pageMetadata.home
  const structuredData = getStructuredData('organization')

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.canonical} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <PageTransition>
        <main>
          <HeroCarousel />
          <TrustBar />
          <FeaturedCollections />
          <SocialProof />
        </main>
      </PageTransition>
    </>
  )
}
