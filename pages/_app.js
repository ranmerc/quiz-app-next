import '../styles/globals.css';
import '../styles/ReactToastify.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const loader = document.createElement('div');
    loader.classList.add('loading-bar');
    router.events.on('routeChangeStart', () => {
      document.body.appendChild(loader);
    });
    router.events.on('routeChangeComplete', () => {
      document.body.removeChild(loader);
    });
    router.events.on('routeChangeError', () => {
      document.body.removeChild(loader);
    });
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
