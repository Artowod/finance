// import s from './RegisterModal.module.css';
// import Img from '../../img/done2.gif';
// import { useEffect, useState } from 'react';

// const RegisterModal = ({handleOnTimer}) => {
  
//   const [counter, setCounter] = useState(10);
  

//  useEffect(() => {
//     if (counter > 0) {
//       setTimeout(() => setCounter(counter - 1), 1000);
//     } else {
//       setCounter('BOOOOM!');
//       handleOnTimer(true)
//     }
//   }, );


//   return (

    
//     <div className={s.backdrop}>
//       <div className={s.wrapper}>
//         <span className={s.title}> Ваш аккаунт успешно зарегистрирован! </span>
//         <img src={Img} alt="Done" />
//         <span>{counter}</span>
//       </div>
//     </div>
//   );
// };

// export default RegisterModal;