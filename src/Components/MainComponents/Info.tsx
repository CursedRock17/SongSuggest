import React from 'react'
import styles from '../../Styling/styles.module.css'

export const Info = (props) => {
  return (
    <div className={styles.NavBar}>
      <p className={styles.normalGreenText}>
        {props.innerText}
      </p>
    </div>
  )
}

export default Info;
