import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import styles from "./ip-addresses/ipAdresses.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

function SetTooltip(propsForText) {
  return (
          <OverlayTrigger
                  placement="bottom"
                  overlay={
                    (props) => (
                            <Tooltip {...props}
                                     id="button-tooltip"
                            >
                              <strong>
                                {propsForText.text}
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

export default SetTooltip;
