import React, { useEffect, useState, useContext } from 'react'
import styles from '../../Styling/styles.module.css'


export const TargetPlaylist = (props) => {

  const [ listPlay, setListPlay ] = useState([])

  const getUserId = async(token) => {

    const result = await fetch(`https://api.spotify.com/v1/me`, {
      method: 'GET',
      headers: {
      'Authorization' : 'Bearer ' + token,
      'Content-Type' : 'application/json'
     }
   })

    const data = await result.json();

    return data.id;
  }

  const getPlaylistId = async(token, user) => {
    const result = await fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
      method: 'GET',
      headers: {
      'Authorization' : 'Bearer ' + token,
      'Content-Type' : 'application/json'
     }
    })

    const data = await result.json();

    return data.items;
  }

  const grabPlaylist = async() => {
    setListPlay(oldArray => []);
    const token = window.localStorage.getItem("token");

    const user = await getUserId(token);
    const playLists = await getPlaylistId(token, user);

      playLists.forEach(element => {
      setListPlay(oldArray => [...oldArray, element]);
    });

    if(listPlay[0] != null){
      props.startList(listPlay[0].id);
    }

  }

  const mappedList = listPlay.map((index) =>
      <option value={index.id}>
        {index.name}
      </option>
    )


  return (
    <div className={styles.centerDropButton}>
      <button
      className={styles.roundButton}
      onClick={() => grabPlaylist()}
      >
         Fetch a Playlist - {listPlay.length}
      </button>

      <h1 className={styles.downFifteen}> Choose a Playlist </h1>

      <ul className={styles.leftThirty}>
        <select
        name="PLS"
        id="PLS"
        onChange={(choice) => props.grabList(choice.target.value)}
        >
          {mappedList}
        </select>
      </ul>

    </div>
  )
}

export default TargetPlaylist;
