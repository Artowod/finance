import { NavLink } from 'react-router-dom';
import s from './Footer.module.css';
const style = {
  margin: '0 auto',
};
const Footer = () => {
  return (
    <div className={s.team}>
      <NavLink to="/team" activeStyle={style}>
        Наша команда &#128293;
      </NavLink>
    </div>
  );
};

export default Footer;
