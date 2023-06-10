"use client"
import { useEffect, useContext } from 'react'
import { logout } from '../../../services/auth.service'
import { UserLoggedState } from '../../../context/UserState.context';
import { redirect } from 'next/navigation';
import Loading from '../../loading';

const Logout = () => {
  const { setUserLoggedState } = useContext(UserLoggedState);
  useEffect(() => {
    logout('user')
    setUserLoggedState(false);
    redirect('/login')
  }, [])

  return <Loading />;
}

export default Logout
