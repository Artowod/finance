import { NavLink } from 'react-router-dom';
import sprite from '../../img/sprite.svg';
import s from './GoHome.module.css';

const GoHome = () => {
  let width = window.innerWidth;

  return (
    <>
      <NavLink className={s.btn} exact to="/">
        <svg className={s.svgBtn} width="18" height="12">
          <use href={sprite + '#icon-toHome'}></use>
        </svg>
        <span className={s.text}> Вернуться на главную</span>
      </NavLink>
    </>
  );
};

export default GoHome;
