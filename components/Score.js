import style from '../styles/Score.module.css';
import Button from './Button';
import router from 'next/router';
import { forwardRef } from 'react';

const Score = forwardRef((props, ref) => {
  const redirect = () => {
    router.push('/');
  };
  return (
    <div className={style.container} ref={ref}>
      <div className={style.score}>Score - {props.score}</div>
      <Button click={redirect}>Take Another Quiz</Button>
      <div className={style.timeTaken}>Time Taken - {props.time}</div>
    </div>
  );
});

export default Score;
