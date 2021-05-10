import style from '../styles/Toast.module.css';

export default function Toast({ children }) {
  return (
    <>
      <div className={style.toast}>{children}</div>
    </>
  );
}
