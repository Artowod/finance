import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import SwitchTheme from '../../shared/SwitchTheme/SwitchTheme';
import logo from '../../img/logo.svg';
import logout from '../../img/logout.svg';
import s from './NavBar.module.css';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import UnifiedModal from '../../shared/UnifiedModal';
import { StyledBadge } from './StyledBadge';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login, logOut } from '../../redux/auth/auth-operations';

import iconUser from '../../img/iconUser.svg';

import { setBalance, setIsSystemStarted } from '../../redux/actions';
import { NavLink } from 'react-router-dom';


const NavBar = ({ socialName, socialImg, isAuthFromSocial }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const socialAuth = useSelector(state => state.auth.socialAuth);

  const loginForm = useSelector(state => state.auth.user?.userData?.email);
  const loginNameFromGoogle = useSelector(state => state.auth?.user?.email)

   const [isModalShown, setIsModalShown] = useState(false);

  

  const loginName = loginForm || loginNameFromGoogle;

  const responseHandling = response => {
    setIsModalShown(false);
    console.log(response);
    if (response) {
      dispatch(setIsSystemStarted(null));
      dispatch(setBalance(null));
      dispatch(logOut());
    }
  }

  // console.log(loginName.length)
  const dispatch = useDispatch();

  // const loginFromEmail = () => {
  //   for (let i = 0; i <= loginName.length; i++) {

  //   }
  // }
  return (
    <>
      {isModalShown && <UnifiedModal title={'Вы уверены?'} response={responseHandling} />}
      <AppBar position="static" sx={{ background: 'white', boxShadow: 'none' }}>
        <Container maxWidth="axl">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{display: "flex"}}>
          <SwitchTheme />
            <NavLink to="/" >
            <Avatar
              alt="Logo"
              src={logo}
              id={s.logo}
              variant="square"
              style={{ width: 90 + 'px' }}
              />
            </NavLink>
            </div>

            {isLoggedIn && (
              <div className={s.wrapper}>
                <Stack direction="row" spacing={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{ mr: 2 }}
                  >
                    <Avatar
                      alt="user avatar"
                      // src={
                      //   isAuthFromSocial && socialAuth ? socialImg : '/static/images/avatar/1.jpg'
                      // }
                    >{loginName[0]}</Avatar>
                  </StyledBadge>
                </Stack>
                <Typography
                  noWrap
                  component="p"
                  sx={{
                    color: '#52555F',
                    fontFamily: 'Roboto',
                    fontSize: '12px',
                    cursor: 'default',
                  }}
                  className={s.visibility}
                >
                  {isAuthFromSocial && socialAuth ? socialName : loginName}
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    my: 0.2,
                    background: '#E0E5EB',
                    ml: 2,
                    mr: 2,
                  }}
                  className={s.visibility}
                />

                <div
                  onClick={() => {

                    // dispatch(logOut());
                    // dispatch(setIsSystemStarted(null));
                    // dispatch(setBalance(null));

                    setIsModalShown(true);
                    
                      
                    
                    

                  }}
                >

                  <Typography
                    variant="text"
                    sx={{
                      color: 'white',
                      textDecoration: 'underline',
                      textTransform: 'capitalize',
                      color: '#52555F',
                      fontFamily: 'Roboto',
                      padding: '10px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      '&:hover,&:focus': {
                        color: '#ff751d',
                      },
                    }}
                    className={s.visibility}
                  >
                    Выйти
                  </Typography>
                  <img className={s.logoutIcon} src={logout} />
                </div>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
