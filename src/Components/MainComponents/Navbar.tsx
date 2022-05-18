import React from 'react'
import styles from '../../Styling/styles.module.css'
import AuthenButton from "../SpotifyAPI/AuthenticationSpotify"


export const Navbar = () => {
  return (
    <div className={styles.NavBar}>
        <h1 className={styles.textBig}>Suggest A Song</h1>
      <AuthenButton />
    </div>
  )
}

export default Navbar;
