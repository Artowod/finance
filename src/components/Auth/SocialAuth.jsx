import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '@mui/icons-material/Facebook';
import s from './SocialAuth.module.css';



export const FacebookAuth = ({onSubmit}) => {
  
  const responseFacebook = (response) => {
    const { email, id, name} = response;
    const { url } = response.picture.data;
  
  onSubmit(email, id, url, name)
}

  return (
 <FacebookLogin
    appId="1085906475561984"
    autoLoad={false}
      fields="name,email,picture"
      textButton='Facebook'
      icon={<FacebookIcon className={s.fbIcon}/>}
      cssClass={s.fb}
    callback={responseFacebook} /> 
  )

}