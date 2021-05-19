import Layout from '../components/Layout';
import Heading from '../components/Heading';
import { useEffect, useState } from 'react';
import Form from '../components/Form';
import style from '../styles/index.module.css';
import Button from '../components/Button';
import router from 'next/router';

export default function Home() {
  const [noOfQuestions, setNoOfQuestions] = useState(10);
  const [category, setCategory] = useState(['any', 'Random Topic']);
  const [difficulty, setDifficulty] = useState(['any', 'Random']);
  const [type, setType] = useState(['any', 'Random']);

  useEffect(() => {
    document.cookie
      .split(';')
      .map((c) => {
        return c.split('=')[0];
      })
      .forEach((c) => {
        document.cookie = `${c}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      });
    router.prefetch('/quiz');
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    document.cookie = `noOfQuestions=${JSON.stringify(noOfQuestions)}`;
    document.cookie = `category=${JSON.stringify(category)}`;
    document.cookie = `difficulty=${JSON.stringify(difficulty)}`;
    document.cookie = `type=${JSON.stringify(type)}`;
    router.replace('/quiz');
  };

  return (
    <Layout title="Quiz App">
      <div className={style.container}>
        <Heading place="frontPage">Quiz App</Heading>
        <Form submit={formSubmit}>
          <div className={style.formElement}>
            <label htmlFor="noOfQuestions" className={style.label}>
              Number Of Questions
            </label>
            <input
              type="number"
              id="noOfQuestions"
              min="1"
              max="50"
              value={noOfQuestions}
              required
              onInput={(e) => {
                setNoOfQuestions(e.target.value);
              }}
              className={style.input}
            />
          </div>
          <div className={style.formElement}>
            <label htmlFor="category" className={style.label}>
              Category
            </label>
            <select
              id="category"
              className={style.input}
              onChange={(e) => {
                setCategory([
                  e.target.value,
                  e.target[e.target.selectedIndex].text,
                ]);
              }}
            >
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">
                Entertainment: Japanese Anime &amp; Manga
              </option>
              <option value="32">
                Entertainment: Cartoon &amp; Animations
              </option>
            </select>
          </div>
          <div className={style.formElement}>
            <label htmlFor="difficulty" className={style.label}>
              Difficulty
            </label>
            <select
              id="difficulty"
              className={style.input}
              onChange={(e) => {
                setDifficulty([
                  e.target.value,
                  e.target[e.target.selectedIndex].text,
                ]);
              }}
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className={style.formElement}>
            <label htmlFor="type" className={style.label}>
              Type
            </label>
            <select
              id="type"
              className={style.input}
              onChange={(e) => {
                setType([
                  e.target.value,
                  e.target[e.target.selectedIndex].text,
                ]);
              }}
            >
              <option value="any">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>
          <Button type="submit">Start Quiz</Button>
        </Form>
      </div>
    </Layout>
  );
}
