// components/Layout.tsx
import Head from 'next/head';
import Navbar from '@/components/shared/Navbar';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  children: React.ReactNode;
}

export default function Layout({
  title = 'AutoRentals',
  description = 'One stop shop for all your vehicle rentals',
  image = '/vehicles/images/no-image.png',
  children,
}: Props) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width" />
        <title>{title}</title>

        {/* Meta tags */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={title} />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Head>

      <Navbar />
      <main className="container m-auto max-w-5xl px-5 pt-24 pb-10">
        {children}
      </main>
    </>
  );
}
