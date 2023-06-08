"use client"
import { useEffect } from 'react'
import { logout } from '../../services/auth.service'
import { useRouter } from 'next/navigation';
import Loading from '../loading';

const Logout = () => {
  const { push } = useRouter();
  useEffect(() => {
    logout('user')
    push('/login')
  }, [])

  return <Loading />;
}

export default Logout
