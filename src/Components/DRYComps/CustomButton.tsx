import React, { useState } from 'react'
import styles from '../../Styling/styles.module.css'

export const CustomButton = (props) => {
  return (
    <div>
     <div className={styles.downFifteen}>
      <button
      className={styles.roundButton}
      onClick={() => props.setSearchType()}
      >
      <p> {props.buttonName} </p>
      </button>
      </div>
    </div>
  )
}

export default CustomButton;
