import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Table } from 'react-bootstrap';
import styles from './ipAdresses.module.css';
import SetTooltip from "../setTooltip";

const API_URL = process.env.REACT_APP_API_HOST;

function IpAddresses(props) {
  const id = props.match.params.id;
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getIpAdresses();
  });
  
  const getIpAdresses = () => {
    axios.get(`${API_URL}/scans/${id}`)
    .then(response => {
      setData(response.data[0]);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
  let num = 1;
  
  return (
          <>
            <Table bordered hover>
              <thead className={styles.tableHead}>
              <tr>
                <th>#</th>
                <th>
                  IP Adress
                  <SetTooltip text = {
                      `An IP address is a string of numbers separated by periods.
                       IP addresses are expressed as a set of four numbers — an example
                       address might be 192.158.1.38. Each number in the set can range from
                       0 to 255. So, the full IP addressing range goes
                       from 0.0.0.0 to 255.255.255.255.`}
                  />
                </th>
                <th>
                  Hostname
                  <SetTooltip text = {
                    `A hostname is a label assigned to a device (a host) on a network.
                    It distinguishes one device from another on a specific network or over
                    the internet. The hostname for a computer on a home network may be
                    something like new laptop, Guest-Desktop, or FamilyPC.`}
                  />
                </th>
                <th>
                  Mac
                  <SetTooltip text = {
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
                data && (
                        data.map((item, i) => {
                          return [
                            <tr key={i}>
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
                )
              }
              </tbody>
            </Table>
          </>
  )
}

export default withRouter(IpAddresses);
