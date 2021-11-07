import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom'
import queryString from 'query-string';
import styles from './scanner.module.css';
import PaginationContainer from '../pagination/Pagination';

const API_URL = process.env.REACT_APP_API_HOST;

function Scanner(props) {
  const [ currentPage, setCurrentPage ] = useState(
          +queryString.parse(window.location.search).page || 1
  );
  const [ scansData, setScansData ] = useState([]);
  const [ pageCount, setPageCount ] = useState(0);
  const [ locationKeys, setLocationKeys ] = useState([]);
  const history = useHistory();
  
  useEffect(() => {
     getScans(currentPage);
  },[currentPage]);
  
  useEffect(() => {
    
     return history.listen(location => {
        if (history.action === 'PUSH') {
           setLocationKeys([ location.key ]);
        }
        
        if (history.action === 'POP') {
           if (locationKeys[1] === location.key) {
              setLocationKeys(([ _, ...keys ]) => keys);
              getScans(+queryString.parse(window.location.search).page);
           } else {
              setLocationKeys((keys) => [ location.key, ...keys ]);
              getScans(+queryString.parse(window.location.search).page);
           }
        }
     })
  }, [ locationKeys, history]);
  
  const buildPageQuery = (page) => {
     const {search, pathname} = props.location;
     const queryParams = new URLSearchParams(search);
     queryParams.delete('page');
     queryParams.append('page', page);
     
     return pathname + '?' + queryParams.toString();
  }
  
  const getScans = (page) => {
     axios.get(`${API_URL}/scans?page=${page}`)
     .then(response => {
        setScansData(response.data.data);
        setPageCount(response.data.pageCount);
        setCurrentPage(response.data.page);
     })
     .catch(function (error) {
        console.log(error);
     })
  }
  
  const onPageChange = (newPage) => {
     const url = buildPageQuery(newPage);
     props.history.push(url);
     setCurrentPage(newPage);
  }
  
  const goToIpAdresses = (uuid) => {
     props.history.push(`/scans/${uuid}`);
  }
  
  let num = 1;
  
  return (
     <>
        <Table bordered hover>
           <thead className={styles.tableHead}>
              <tr>
                 <th>#</th>
                 <th>Range</th>
                 <th>Status</th>
                 <th>Period</th>
                 <th>Created_at</th>
              </tr>
           </thead>
           <tbody>
              {
                 scansData && (
                    scansData.map((item, i) => {
                            
                       return [
                          <tr key={item.uuid}
                              onClick={() => { goToIpAdresses(item.uuid) }}
                          >
                             <td>{num++}</td>
                             <td>
                                {item.range}
                             </td>
                             <td>
                                {item.status}
                             </td>
                             <td>
                                {item.period}
                             </td>
                             <td>
                                {item.created_at}
                             </td>
                          </tr>
                       ]
                    })
                 )
              }
           </tbody>
        </Table>
        {
           pageCount > 1 && (
              <PaginationContainer
                  currentPage = { currentPage }
                  onPageChange = { onPageChange }
                  pageCount = { pageCount }
              />
           )
        }
     </>
  )
}

export default withRouter(Scanner);
