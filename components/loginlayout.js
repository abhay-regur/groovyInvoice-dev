import Head from 'next/head';
import Image from 'next/image';
import LoginHeader from "./LoginHeader";


const LoginLayout = ({ children }) => {
  return (
    <div className='container-flex'>
      <LoginHeader />
      {children}
    </div>
  );
};

export default LoginLayout;