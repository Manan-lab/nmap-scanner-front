import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ip-addresses/ipAdresses.module.css';

function InfoTooltip(tooltipProps) {
  return (
          <OverlayTrigger
             placement="bottom"
             overlay={
                (props) => (
                   <Tooltip
                      {...props}
                      id="button-tooltip"
                   >
                      <strong>
                        {tooltipProps.text}
                      </strong>
                   </Tooltip>
                )
             }
          >
              <span className={styles.icon}>
                 <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
          </OverlayTrigger>
  )
}

export default InfoTooltip;
