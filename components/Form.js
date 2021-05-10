import style from '../styles/Form.module.css';

export default function Form({ submit, children }) {
  return (
    <>
      <form onSubmit={submit} className={style.form}>
        {children}
      </form>
    </>
  );
}
