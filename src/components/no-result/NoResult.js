import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import styles from './noResult.module.css';

function NoResult(){
  return(
     <div className={styles.notResultContainer}>
        <FontAwesomeIcon icon={faBan} />
        <p>No results found</p>
     </div>
  )
}

export default NoResult;
