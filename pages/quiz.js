import { useEffect, useState, createRef } from 'react';
import { useRouter } from 'next/router';
import style from '../styles/quiz.module.css';
import LoadingAnimation from '../components/LoadingAnimation';
import Question from '../components/Question';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Score from '../components/Score';
import Custom404 from './404';
import {
  quizCategory,
  quizType,
  quizDifficulty,
} from '../utils/param_resolver';
import { decode } from 'html-entities';

export default function Quiz() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const scoreCardRef = createRef();

  async function fetchQuizData(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Unable to fetch ${url}`);
      }
      const data = await res.json();
      if (data.response_code) {
        throw new Error('No questions found');
      }
      setQuizData(data.results);
    } catch (e) {
      console.error(e);
      /*
        if either api is down or no
        questions for given params
      */
      setError(true);
    }
  }

  // load quiz data on mount
  useEffect(() => {
    // using window object because router object not realiable
    const params = new URLSearchParams(window.location.search);
    if (params.get('amount') === null) {
      // go to index if invalid quiz url
      router.replace(`/`);
    }
    const url = new URL(`https://opentdb.com/api.php`);
    url.search = params;
    fetchQuizData(url);
  }, []);

  useEffect(() => {
    if (quizData.length) {
      setTime(Date.now());
    }
  }, [quizData]);

  const formSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    // stop timer
    const endTime = Date.now();
    setTime((time) => endTime - time);

    // select all options
    const options = e.target.querySelectorAll('input[type="radio"]');
    // make and array of correct answers
    const answerArray = quizData.reduce((answers, questionData) => {
      return answers.concat(decode(questionData.correct_answer));
    }, []);
    // disable radio buttons and color all correct answers green
    options.forEach((option) => {
      option.disabled = true;
      if (answerArray.includes(option.value)) {
        option.nextElementSibling.style.backgroundColor = '#0CCA4A';
        option.nextElementSibling.style.color = 'black';
      }
    });

    // select all selected options
    const selectedOptions = e.target.querySelectorAll(
      'input[type="radio"]:checked'
    );
    let formScore = 0;
    for (let i = 0; i < selectedOptions.length; ++i) {
      if (selectedOptions[i].value === decode(quizData[i].correct_answer)) {
        ++formScore;
      } else {
        // color all wrong answers red
        selectedOptions[i].nextElementSibling.style.backgroundColor = '#ED254E';
        selectedOptions[i].nextElementSibling.style.color = 'black';
      }
    }

    setScore(formScore);
  };

  useEffect(() => {
    if (submitted) {
      scoreCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scoreCardRef]);

  if (error) {
    return <Custom404 APIError />;
  }

  return (
    <Layout
      title={`Quiz on ${quizCategory[router.query.category] || 'Random'}`}
    >
      {quizData.length ? (
        <div className={style.container}>
          <div className={style.headerContainer}>
            <Heading place="quizScreen" className={style.test}>
              Quiz On {quizCategory[router.query.category] || 'Random'}
            </Heading>
            <div className={style.difficulty}>
              {quizDifficulty[router.query.difficulty] || 'Random'}
            </div>
            <div className={style.type}>
              {quizType[router.query.type] || 'Random'}
            </div>
          </div>
          {submitted && <Score score={score} time={time} ref={scoreCardRef} />}
          <form className={style.form} onSubmit={formSubmit}>
            <ol className={style.questionList}>
              {quizData.map((data, i) => {
                return (
                  <Question
                    answers={[...data.incorrect_answers, data.correct_answer]}
                    key={i}
                  >
                    {data.question}
                  </Question>
                );
              })}
            </ol>
            {!submitted && (
              <div className={style.submit}>
                <Button type="reset">Reset</Button>
                <Button type="submit">Submit</Button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </Layout>
  );
}
