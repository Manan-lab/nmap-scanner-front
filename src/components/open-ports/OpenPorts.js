import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import styles from './openPorts.module.css';

const API_URL = process.env.REACT_APP_API_HOST;

function OpenPorts(props) {
  const uuid = props.match.params.uuid;
  const ipsUuid = props.match.params.ipsUuid;
  const [ portsData, setPortsData ] = useState([]);
  
  useEffect(() => {
    getOpenPorts();
  }, []);
  
  const getOpenPorts = () => {
    axios.get(`${API_URL}/scans/${uuid}/ips/${ipsUuid}`)
    .then(response => {
      setPortsData(response.data[0]);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
  let num = 1;
  
  return (
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
              portsData && (
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
              )
           }
        </tbody>
     </Table>
  )
}

export default OpenPorts;
