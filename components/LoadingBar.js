import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function LoadingBar() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let interval = '';
    const handleStart = () => {
      setOpacity(1);
      // increase progress every 500ms
      interval = setInterval(() => {
        // ieee 754
        setProgress((progress) => progress + 0.05);
      }, 500);
    };
    const handleStop = () => {
      // after navigation is complete remove bar after 100ms
      setTimeout(() => {
        setProgress(0);
        setOpacity(0);
      }, 100);
      // clear interval after navigation is done
      interval = clearInterval(interval);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
      // clear interval on unmount, in case any errors happen
      clearInterval(interval);
    };
  }, [router]);
  return (
    <>
      <div role="progressbar" id="progressbar" title="Loading page"></div>
      <style jsx>{`
        div {
          position: fixed;
          top: 0;
          width: 95vw;
          transform: scaleX(${progress});
          transform-origin: left;
          height: 10px;
          background-color: var(--teal9);
          transition: transform 500ms;
          opacity: ${opacity};
        }
      `}</style>
    </>
  );
}
