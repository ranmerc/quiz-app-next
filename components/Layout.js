import Head from 'next/head';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Quiz app built with next.js" />
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
}
