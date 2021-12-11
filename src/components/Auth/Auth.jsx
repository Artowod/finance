import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as yup from 'yup'
import YupPassword from 'yup-password'

import UnifiedModal from '../../shared/UnifiedModal';
import { register, login, loginFromGoogle, getUser } from '../../redux/auth/auth-operations';
import { FacebookAuth } from './SocialAuth';
import s from './Auth.module.css';
import RegisterModal from '../RegisterModal/';
import { useLocation } from 'react-router';
import google from '../../img/google.svg';
YupPassword(yup) // extend yup




const Authorization = ({ getDataFromSocial, getTypeOfAuth }) => {
  const isRegisterFullField = useSelector(state => state.auth.isRegisterFullField)
  
  const location = useLocation();
  
  const urlParams = new URLSearchParams(location.search);
  const accessToken = urlParams.get('accessToken');
  const refreshToken = urlParams.get('refreshToken');
  const sid = urlParams.get('sid');
  
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isLoginType, setIsLoginType] = useState(true);
  const [socialAuth, setSocialAuth] = useState(false)
  const [isModalShown, setIsModalShown] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
 
 const schemaEmail = yup.string().email().min(6).required()
    

  
  const schemaPassword = yup.string().password().min(3).required()
  
  
  useEffect(() => {
    if (!location?.search) return
    
    dispatch(getUser({ accessToken, refreshToken, sid }))
    
    
    
  }, [])

  useEffect(() => {
    if (isRegisterFullField) dispatch(login({ email, password, socialAuth }))
    setEmail('');
      setPassword('');

   }, [isRegisterFullField])
  

  
  // const blurHandler = e => {
  //   switch (e.target.name) {
  //     case 'email':
  //       setEmailDirty(true)
  //       break;
  //     case 'password':
  //       setPasswordDirty(true)
  //       break;
  //   }
  // }

  const handleOnChange = e => {
    const { name, value } = e.target;

     

    switch (name) {
     
      case 'email':
        console.log(value)
        setEmail(value)
        schemaEmail
        .isValid(value)
        .then(function (valid) {
          if (valid) {
            setEmailError('')
         }
         else {
           setEmailError('Введите данные в формате: somemail@email.com')
        } 
           
        });
        return
        
      case 'password':
        setPassword(value)
         schemaPassword
          .isValid(value)
       .then(function (valid) {
         if (valid) {
           setPasswordError('')
         }
         else {
           setPasswordError('Пароль должен содержать буквы в верхнем и нижнем регистре и спец. симолы')
        } 
           
        });
        
      default:
        return;
    }
  };



  const toggleIsLoginType = (e) => {
  
      isLoginType ? setIsLoginType(false) : setIsLoginType(true)

    
     
  }


  const togglePasswordVisability = (e) => {
    isPasswordVisible ? setIsPasswordVisible(false) : setIsPasswordVisible(true)
  }

  



  const handleOnSubmit = e => {

    e.preventDefault();
    if (!isLoginType) {
      setSocialAuth(false)
      dispatch(register({ email, password, socialAuth }))
      setIsLoginType(true)
      getTypeOfAuth(false)
      setIsModalShown(true)
    
      
      
    }
    else if (isLoginType) {
      setSocialAuth(false)
      dispatch(login({email, password, socialAuth }))
      console.log('Сабмит формы Логин')
      getTypeOfAuth(false)
      setEmail('');
      setPassword('');
    }
  }

  const handleAuthFromSocial = (authEmailFromSocial, authPasswordFromSocial, authImgFromSocial, authNameFromSocial) => {
  
    const img = authImgFromSocial;
    const email = authEmailFromSocial;
    const name = authNameFromSocial;
    const password = authPasswordFromSocial;
    
    if (!isLoginType) {
      setSocialAuth(true)
      dispatch(register({ email, password, socialAuth }));
      
      
    } else if (isLoginType) {
      setSocialAuth(true)
      dispatch(login({ email, password, socialAuth }));
      
    }
    getDataFromSocial({ img, name })
    getTypeOfAuth(true)
  }


  
  
  
  
  return (
    
    <div className={s.auth}>
     
     
      <div className={s.authWrapper}>
        <p className={s.authText}>Вы можете авторизоваться с помощью Google Account:</p>
        <div className={s.socialBtnsWrapper}>
          <a className={s.googleBtn} href="https://kapusta-backend.goit.global/auth/google">
            <img className={s.googleIcon} src={google} alt="Google" />
            Google</a>
        <FacebookAuth onSubmit={handleAuthFromSocial}/>
        </div>
          <p className={`${s.authText} ${s.text}`} >
          Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:
        </p>
        <form className={s.authForm} onSubmit={handleOnSubmit}>
          <div className={s.inputsWrapper}>
             
            <label htmlFor="authMail" className={s.inputTitle}>
              {' '}
              Электронная почта:
            </label>
            {/* <form className={s.passwordWrapper}> */}
            <input
              className={s.authInput}
              type="email"
              name="email"
              value={email}
              id="authMail"
              minLength="10"
              maxLength="63"
              placeholder="your@email.com"
              title="Введите данные в формате: somemail@email.com"
              required
              // onBlur={blurHandler}
              onChange={handleOnChange}
            />
            {/* {setEmailError && <div style={{color: 'red', position: "absolute",
  top: "55px",
  right: "0"}}>{emailError}</div>} */}
            {/* </form> */}
            <label htmlFor="authPassword" className={s.inputTitle}>
              {' '}
              Пароль:
            </label>
            <form className={s.passwordWrapper}>
            <input
              className={s.authInput}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={password}
                id="authPassword"
               
              // minLength='2'
              // maxLength='16'
              title='Пароль должен состоять из цифр, латинских букв и спец. символов'
                required
              // onBlur={blurHandler}
              onChange={handleOnChange}
              />
              {/* {passwordError && <div className={s.error} style={{color: 'red', position: "absolute",
  top: "55px",
  right: "0"}}>{passwordError}</div>} */}
            {isPasswordVisible ? <VisibilityIcon className={s.password} onClick={togglePasswordVisability} />
              : <VisibilityOffIcon className={s.password} onClick={togglePasswordVisability} />}
          </form>
          </div>
          {isLoginType ? <div className={s.authLoginBtnsWrapper}>
           
            <button className={s.authBtn + ' ' + s.authBtnActive} type="submit">Войти</button>
            <button className={s.authBtn} type="button" onClick={toggleIsLoginType} >Регистрация</button>

            </div> : <div className={s.authAuthBtnsWrapper}>
           
            <button className={s.authBtn + ' ' + s.authBtnActive} type="submit">Регистрация</button>
            <button className={s.authBtn} type="button" onClick={toggleIsLoginType} >Войти</button>

            </div>}
        </form>
        
      </div>
    </div>
  );
};

export default Authorization;



