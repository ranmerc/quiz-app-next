import style from '../styles/Question.module.css';
import QuestionOption from './QuestionOption';
import { decode } from 'html-entities';
import { useState } from 'react';

export default function Question({ children, answers }) {
  let [jumbledAnswers, setJumbledAnswers] = useState(() => {
    const length = answers.length;
    return answers
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  });

  const alphabetMap = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
  };
  return (
    <li>
      <div className={style.questionText}>{decode(children)}</div>
      <div className={style.table}>
        {jumbledAnswers.map((a, i) => {
          return (
            <QuestionOption
              key={i}
              uniq={
                children.substring(0, 4) +
                children.substring(children.length - 10)
              }
            >
              {alphabetMap[i]}. {a}
            </QuestionOption>
          );
        })}
      </div>
    </li>
  );
}
