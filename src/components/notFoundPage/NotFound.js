import React from 'react';
import styles from'./notFound.module.css';
import { Link } from 'react-router-dom';

function NotFound(){
  
  return(
     <div className={styles.notFoundContainer}>
        <div className={styles.notFoundMessage}>
           <h2>SORRY, THE PAGE YOU REQUESTED DOESN'T EXIST</h2>
           <Link to="/">Back to home</Link>
        </div>
     </div>
  )
}

export default NotFound;
