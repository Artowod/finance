import React from 'react';
import s from './Background.module.css';

const Background = ({ children }) => {
  return (
    <div className={s.backgroundImage}>
      <div className={s.backgroundContainer}></div>
      {children}
    </div>
  );
};

export default Background;