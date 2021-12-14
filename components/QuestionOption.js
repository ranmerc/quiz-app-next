import style from '../styles/QuestionOption.module.css';
import { decode } from 'html-entities';

export default function QuestionOption({ children, uniq }) {
  children = children.map((child) => decode(child));
  return (
    <label className={style.basic}>
      <input type="radio" value={children[2]} name={uniq} required="required" />
      <span>{children}</span>
    </label>
  );
}
