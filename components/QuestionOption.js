import style from '../styles/QuestionOption.module.css';
import { decode } from 'html-entities';

export default function QuestionOption({ children, uniq, onCheck }) {
  children = children.map((child) => decode(child));
  return (
    <label className={style.basic}>
      <input type="radio" value={children[2]} name={uniq} onChange={onCheck} />
      <span>{children}</span>
    </label>
  );
}
