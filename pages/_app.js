import '../styles/globals.css';
import LoadingBar from '../components/LoadingBar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LoadingBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
