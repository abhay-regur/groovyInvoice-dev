import { useEffect } from 'react'
import { logout } from '../../services/auth.service'
import { useRouter } from 'next/navigation';

const Logout = () => {
  const { push } = useRouter();
  useEffect(() => {
    logout('user')
    push('/login')
  }, [])
  return 0;
}

export default Logout
