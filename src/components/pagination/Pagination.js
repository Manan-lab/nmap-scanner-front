import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import styles from './pagination.module.css';

function PaginationContainer(props) {
  
  const onPrevPage = () => {
     const { currentPage, onPageChange } = props;
     const newPage = currentPage - 1;
    
     if (currentPage === 1) {
       return;
     }
    
     onPageChange(newPage);
  }
  
  const onNextPage = () => {
     const { currentPage, onPageChange } = props;
     const newPage = currentPage + 1;
     onPageChange(newPage);
  }
  
  const { pageCount, currentPage } = props;
  
  return (
     <Pagination className={styles.pagination}>
        {
           currentPage > 1 && (
              <Pagination.First onClick={onPrevPage} />
           )
        }
        <Pagination.Item> {props.currentPage} </Pagination.Item>
        {
           currentPage !== pageCount && (
              <Pagination.Last onClick={onNextPage} />
           )
        }
     </Pagination>
  )
}

export default PaginationContainer;
