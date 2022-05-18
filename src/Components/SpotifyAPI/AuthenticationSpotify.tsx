import React, { useState, useEffect } from 'react'
import styles from '../../Styling/styles.module.css'

export const AuthenButton = () => {

const CLIENT_ID = "Replace With Your Client Id"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const scope = [
  "playlist-modify",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-top-read"
]

const [token, setToken] = useState("")

useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

}, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    window.location.reload();
  }

  return (
    <>
    {token == null ?
    <>
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope.join("%20")}`}>Login
          to Spotify</a>
    </>
          :
        <>
        <div className={styles.pushDown}>
        <button
        className={styles.roundButton}
        onClick={() => logout()}
        >
      <p> Logout </p>
    </button>
    </div>
    </>
    }
    </>
  )
}

export default AuthenButton;
