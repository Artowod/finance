import Background from '../Background';
import s from './Container.module.css';

const Container = ({children}) => {
  return (
    <Background>
      <div className={s.container}>{children}</div>
    </Background>
  );
};

export default Container;
