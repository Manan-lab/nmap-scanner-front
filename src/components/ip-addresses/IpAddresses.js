import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import styles from './ipAdresses.module.css';
import InfoTooltip from '../InfoTooltip';
import Loading from "../loading/Loading";
import NoResult from "../no-result/NoResult";

const API_URL = process.env.REACT_APP_API_HOST;

function IpAddresses(props) {
  const uuid = props.match.params.uuid;
  const [ipData, setIpData] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    getIpAdresses();
  },[]);
  
  const getIpAdresses = () => {
     axios.get(`${API_URL}/scans/${uuid}`)
     .then(response => {
       setIpData(response.data[0]);
     })
     .catch(function (error) {
        setErrorMessage(error.message);
     })
     .finally(()=>{
        setLoading(false);
     })
  }
  
  const goToOpenPorts = (ipsUuid) => {
    props.history.push(`/scans/${uuid}/ips/${ipsUuid}`);
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
           { !ipData || ipData.length === 0 ?
              <NoResult />
              :
              <Table bordered hover>
                 <thead className={styles.tableHead}>
                    <tr>
                       <th>#</th>
                       <th>
                          IP Adress
                          <InfoTooltip text = {
                            `An IP address is a string of numbers separated by periods.
                            IP addresses are expressed as a set of four numbers — an example
                            address might be 192.158.1.38. Each number in the set can range from
                            0 to 255. So, the full IP addressing range goes
                            from 0.0.0.0 to 255.255.255.255.`}
                          />
                       </th>
                      <th>
                         Hostname
                         <InfoTooltip text = {
                            `A hostname is a label assigned to a device (a host) on a network.
                            It distinguishes one device from another on a specific network or over
                            the internet. The hostname for a computer on a home network may be
                            something like new laptop, Guest-Desktop, or FamilyPC.`}
                         />
                      </th>
                      <th>
                         Mac
                         <InfoTooltip text = {
                            `A media access control address (MAC address) is a unique identifier
                            assigned to a network interface controller (NIC) for use as a network
                            address in communications within a network segment. This use is common
                            in most IEEE 802 networking technologies, including Ethernet, Wi-Fi,
                            and Bluetooth.`}
                         />
                      </th>
                      <th>osNmap</th>
                      <th>Vendor</th>
                    </tr>
                 </thead>
                 <tbody>
                    {
                       ipData.map((item) => {
                          return [
                             <tr key={item.uuid}
                                 onClick={() => {
                                    goToOpenPorts(item.uuid)
                                 }}
                             >
                                <td>{num++}</td>
                                <td>
                                  {item.ip}
                                </td>
                                <td>
                                  {item.hostname}
                                </td>
                                <td>
                                  {item.mac}
                                </td>
                                <td>
                                  {item.osNmap}
                                </td>
                                <td>
                                  {item.vendor}
                                </td>
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

export default withRouter(IpAddresses);
