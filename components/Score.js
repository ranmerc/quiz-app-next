import style from '../styles/Score.module.css';
import Button from './Button';
import router from 'next/router';
import { forwardRef } from 'react';

const Score = forwardRef((props, ref) => {
  const redirect = () => {
    router.back();
  };
  return (
    <div className={style.container} ref={ref}>
      <div className={style.score}>Score - {props.score}</div>
      <Button click={redirect}>Take Another Quiz</Button>
      <div className={style.timeTaken}>
        Time Taken - <div>{props.time}</div>
      </div>
    </div>
  );
});

export default Score;
