import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Button from '../components/Button';
import style from '../styles/quiz.module.css';
import { useEffect, useCallback, useState } from 'react';
import Question from '../components/Question';
import { ToastContainer, toast } from 'react-toastify';
import Score from '../components/Score';

export default function Quiz({ quizData, quizParams }) {
  const [selectedOption, setSelectedOption] = useState(
    Array.from({ length: quizData.length })
  );

  const [score, setScore] = useState(null);
  const [time, setTime] = useState(null);
  const scoreRef = useCallback((node) => {
    if (node !== null) node.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setTime(new Date());
  }, []);

  const [showButtons, setShowButtons] = useState(true);

  const changeSelection = (index, value) => {
    setSelectedOption(
      selectedOption.map((option, i) => {
        return i === index ? value : option;
      })
    );
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const result = selectedOption.every((option) => option !== undefined);

    const highlightAnswers = () => {
      const nameSet = new Set(
        Array.from(document.querySelectorAll(`input[type='radio']`)).map(
          (e) => e.name
        )
      );
      let i = 0;
      nameSet.forEach((name) => {
        const options = Array.from(document.getElementsByName(name));
        options.forEach((o) => {
          o.setAttribute('disabled', 'disabled');
          if (
            quizData[i].correct_answer ===
            o.nextElementSibling.innerText.split(/[ABCD]\.\s/)[1]
          ) {
            o.nextElementSibling.style.backgroundColor = '#0CCA4A';
            o.nextElementSibling.style.outline = '2px solid #0CCA4A';
            o.nextElementSibling.style.color = 'black';
          }
          if (o.checked) {
            if (
              quizData[i].correct_answer !==
              o.nextElementSibling.innerText.split(/[ABCD]\.\s/)[1]
            ) {
              o.nextElementSibling.style.backgroundColor = '#ED254E';
              o.nextElementSibling.style.outline = '2px solid #ED254E';
              o.nextElementSibling.style.color = 'black';
            }
          }
        });
        i++;
      });
    };

    if (!result) toast('Form Incomplete');
    else {
      let score = selectedOption.reduce(
        (a, b, i) => (a += b === quizData[i].correct_answer ? 1 : 0),
        0
      );
      setScore(score);
      setTime(() => {
        const now = new Date();
        const minutes = Math.floor((now - time) / 60000);
        const seconds = Math.floor((now - time) / 1000 - 60 * minutes);
        return `${minutes ? `${minutes} Minutes` : ''} ${
          seconds ? `${seconds} Seconds` : ''
        }`;
      });
      setShowButtons(!showButtons);
      highlightAnswers();
    }
  };

  const formReset = () => {
    setSelectedOption(Array.from({ length: quizData.length }));
  };

  return (
    <Layout title="Quiz">
      <div className={style.container}>
        <div className={style.headerContainer}>
          <Heading place="quizScreen" className={style.test}>
            Quiz On {quizParams.category[1]}
          </Heading>
          <div className={style.difficulty}>{quizParams.difficulty[1]}</div>
          <div className={style.type}>{quizParams.type[1]}</div>
        </div>
        {score !== null && (
          <Score
            ref={scoreRef}
            score={`${score}/${quizData.length}`}
            time={`${time}`}
          />
        )}
        <form className={style.form} onSubmit={formSubmit} onReset={formReset}>
          <ol className={style.questionList}>
            {quizData.map((data, i) => {
              return (
                <Question
                  answers={[...data.incorrect_answers, data.correct_answer]}
                  onChange={(value) => {
                    changeSelection(i, value);
                  }}
                  key={i}
                >
                  {data.question}
                </Question>
              );
            })}
          </ol>

          {showButtons && (
            <div className={style.submit}>
              <Button type="reset">Reset</Button>
              <Button type="submit">Submit</Button>
            </div>
          )}
        </form>
        <ToastContainer
          position="bottom-center"
          hideProgressBar={true}
          className={style.toast}
          autoClose={2000}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookieStringToObject = (cookieString) => {
    if (!cookieString) return {};
    return cookieString
      .replace(/=/g, ':')
      .split(';')
      .map((s) => {
        return JSON.parse(`{${s.replace(/\w+(?=\:)/, `"$&"`)}}`);
      })
      .reduce((a, b) => {
        return { ...b, ...a };
      }, {});
  };

  const quizParams = cookieStringToObject(context.req.headers.cookie);

  if (!quizParams.category) {
    return {
      notFound: true,
    };
  }

  const params = `amount=${quizParams.noOfQuestions}${
    quizParams.category[0] === 'any'
      ? ''
      : `&category=${quizParams.category[0]}`
  }${
    quizParams.difficulty[0] === 'any'
      ? ''
      : `&difficulty=${quizParams.difficulty[0]}`
  }${quizParams.type[0] === 'any' ? '' : `&type=${quizParams.type[0]}`}`;

  const res = await fetch(`https://opentdb.com/api.php?${params}`);
  let quizData = await res.json();

  if (!res.ok || quizData.response_code) {
    return {
      notFound: true,
    };
  }

  quizData = quizData.results;
  return {
    props: { quizData, quizParams },
  };
}
