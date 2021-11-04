import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ipAdresses.module.css';

const API_URL = process.env.REACT_APP_API_HOST;

function IpAddresses(props) {
  const id = props.match.params.id;
  const [ data, setData ] = useState([]);
  
  useEffect(() => {
    onSendRequest();
  });
  
  
  const onSendRequest = () => {
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
                  <th>IP</th>
                  <th>
                    Hostname
                    <OverlayTrigger
                            placement="bottom"
                            overlay={
                              (props) => (
                                      <Tooltip {...props}
                                               id="button-tooltip"
                                      >
                                        <strong>
                                          aaaaaaaaaaaaaaaaaaaaaaaaassssssssssssss
                                        </strong>
                                      </Tooltip>
                              )
                            }
                    >
                          <span className={styles.icon}>
                            <FontAwesomeIcon icon={faQuestionCircle}/>
                          </span>
                    </OverlayTrigger>
                  </th>
                  <th>Mac</th>
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
