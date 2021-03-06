import React from 'react';
import styles from './loading.module.css';

export default function Spinner() {
  
  return (
     <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
           <div />
           <div />
           <div />
           <div />
           <div />
           <div />
           <div />
           <div />
           <div />
           <div />
           <div />
           <div />
        </div>
     </div>
  )
}
