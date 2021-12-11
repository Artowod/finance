import s from './UnifiedModal.module.css';

const UnifiedModal = ({ title = 'Вы уверены?', response, }) => {
  const btnHandler = e => {
    e.target.name === 'yes' ? response(true) : response(false);
  };

  const closeBtnHandler = e => {
    response(false);
  };

  return (
    <div className={s.backdrop}>
      <div className={s.wrapper}>
        <span className={s.title}> {title} </span>
        <ul className={s.btnsBlock}>
        
          <li className={s.btnItem}>
            <button type="button" className={s.yesBtn} name="yes" onClick={btnHandler}>
              ДА
            </button>
          </li>
          <li className={s.btnItem}>
            <button type="button" className={s.noBtn} name="no" onClick={btnHandler}>
              НЕТ
            </button>
          </li>
        </ul>
        <button type="button" className={s.closeBtn} onClick={closeBtnHandler}>
          x
        </button>
      </div>
    </div>
  );
};

export default UnifiedModal;
