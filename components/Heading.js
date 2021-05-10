import style from '../styles/Heading.module.css';

const Heading = ({ children, place }) => {
  const cName = {
    quizScreen: style.quizScreen,
    frontPage: style.frontPage,
  };
  return (
    <header>
      <h1 className={cName[place]}>{children}</h1>
    </header>
  );
};

export default Heading;
