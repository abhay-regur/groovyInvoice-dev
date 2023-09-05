'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import styles from '@/styles/error.module.scss';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={`${styles.companyMainErrorWrapper} container d-flex justify-content-center align-items-center`}>


      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <h2>Something went wrong!</h2>
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <button className='btn btn-primary' onClick={() => reset()}>
            Try again
          </button>
        </div>
      </div>

    </div>
  );
}