"use client"
import { useEffect, useContext } from 'react'
import { logout } from '../../../services/auth.service'
import { UserLoggedState } from '../../../context/UserState.context';
import Loading from '../../loading';

const Logout = () => {
  const { userLoggedState, setUserLoggedState } = useContext(UserLoggedState);
  useEffect(() => {
    if (userLoggedState) {
      logout('user')
      setUserLoggedState(false);
    }
  }, [])

  return <Loading />;
}

export default Logout
