import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router';
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
  
  useEffect(() => {
    getScans(currentPage);
  },[currentPage]);
  
  
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
  
  const goToIpAdresses = (id) => {
    props.history.push(`/scans/${id}`);
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
                  scansData.map((item, i) => {
                    return [
                      <tr key={item.id}
                          onClick={() => { goToIpAdresses(item.id) }}
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
                }
              </tbody>
            </Table>
            <PaginationContainer
                    currentPage = { currentPage }
                    onPageChange = { onPageChange }
                    pageCount = { pageCount }
            />
          </>
  )
}

export default withRouter(Scanner);
