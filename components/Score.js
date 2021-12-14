import style from '../styles/Score.module.css';
import { forwardRef } from 'react';
import router from 'next/router';
import Button from './Button';

const Score = forwardRef((props, ref) => {
  const redirect = () => {
    router.replace('/');
  };
  const minutes = Math.floor(props.time / 60000);
  const seconds = Math.floor(props.time / 1000 - 60 * minutes);
  return (
    <div className={style.container} ref={ref}>
      <div className={style.score}>Score - {props.score}</div>
      <Button click={redirect}>Take Another Quiz</Button>
      <div className={style.timeTaken}>
        Time Taken -{' '}
        <div>
          {`${minutes ? `${minutes} Minutes` : ''} ${
            seconds ? `${seconds} Seconds` : ''
          }`}
        </div>
      </div>
    </div>
  );
});

export default Score;
