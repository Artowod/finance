import s from './IncomesAndExpensesListItem.module.css';
import sprite from '../../../img/sprite.svg';

const IncomesAndExpensesListItem = ({
  itemProps: { date, description, category, amount, _id },
  modalHandler,
  transactionsType,
  operationSign,
}) => {
  const showModal = id => {
    modalHandler(id);
  };

  return (
    <>
      <li className={s.listItem}>
        <div className={s.changeFlow}>
          <span className={s.date}>{date}</span>
          <span className={s.description}>{description}</span>
        </div>
        <span className={s.category}>{category}</span>
        <div className={s.flex}>
          <span className={transactionsType}>
            {operationSign}
            {parseFloat(amount).toFixed(2)}
          </span>
          <span>
            <button type="button" className={s.delete} onClick={() => showModal(_id)}>
              <svg className={s.deleteIcon}>
                <use href={sprite + '#icon-del'}></use>
              </svg>
            </button>
          </span>
        </div>
      </li>
    </>
  );
};

export default IncomesAndExpensesListItem;

/* вопросы */
/* 1) динамический класс с модулем? */
/* 2) позиционирование модалки? */
/* 3) пробрасывать класс и знак минуса в пропсах или сделать иначе? */
