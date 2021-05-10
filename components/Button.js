import style from '../styles/Button.module.css';

export default function Button({ children, type, click }) {
  if (type)
    return <input className={style.basic} type={type} value={children} />;
  else
    return (
      <button className={style.basic} onClick={click}>
        {children}
      </button>
    );
}
