import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import styles from './openPorts.module.css';
import Loading from "../loading/Loading";
import NoResult from "../no-result/NoResult";

const API_URL = process.env.REACT_APP_API_HOST;

function OpenPorts(props) {
  const uuid = props.match.params.uuid;
  const ipsUuid = props.match.params.ipsUuid;
  const [ portsData, setPortsData ] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    getOpenPorts();
  }, []);
  
  const getOpenPorts = () => {
     axios.get(`${API_URL}/scans/${uuid}/ips/${ipsUuid}`)
     .then(response => {
        setPortsData(response.data[0]);
     })
     .catch(function (error) {
        setErrorMessage(error.message);
     })
     .finally(()=>{
        setLoading(false);
     })
  }
  
  let num = 1;
  
  if (loading) {
    
     return (
        <Loading />
     )
  
  } else if (errorMessage) {
  
     return(
        <div className={styles.errorContainer}>
           <FontAwesomeIcon icon={faExclamationTriangle} />
           <p>{errorMessage}</p>
        </div>
     )
  } else {
    
     return (
        <>
           { !portsData || portsData.length === 0 ?
              <NoResult />
              :
              <Table bordered hover>
                 <thead className={styles.tableHead}>
                    <tr>
                       <th>#</th>
                       <th>Port</th>
                       <th>Method</th>
                       <th>Protocol</th>
                       <th>Service</th>
                    </tr>
                 </thead>
                 <tbody>
                    {
                       portsData.map((item,i) => {
                          return [
                             <tr key={i}>
                                <td>{num++}</td>
                                <td>{item.port_port}</td>
                                <td>{item.port_method}</td>
                                <td>{item.port_protocol}</td>
                                <td>{item.port_service}</td>
                             </tr>
                          ]
                       })
                    }
                 </tbody>
              </Table>
           }
        </>
     )
  }
}

export default OpenPorts;
