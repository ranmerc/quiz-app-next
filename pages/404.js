import { useEffect, useState } from 'react';
import style from '../styles/404.module.css';
import Link from 'next/link';

export default function Custom404({ cookies }) {
  const [cookieExists, setCookieExists] = useState(false);

  useEffect(() => {
    if (document.cookie) setCookieExists(!cookieExists);
  }, []);

  return (
    <>
      {cookieExists ? (
        <div className={style.errorContainer}>
          <div>
            <h1>That Didn’t Work</h1>
            <div>
              <Link href="/">
                <a>Try Again </a>
              </Link>
              with different set of options
            </div>
          </div>
          <div>
            If you continue seeing this maybe the{' '}
            <Link href="https://opentdb.com/">API</Link> is down.
          </div>
        </div>
      ) : (
        <div className={style.notStartedContainer}>
          <h1>Quiz Not Yet Started</h1>
          <div>
            <Link href="/">
              <a>Click here </a>
            </Link>
            to start a new quiz
          </div>
        </div>
      )}
    </>
  );
}
