import React from 'react'
import styles from '../../Styling/styles.module.css'

export const PlaylistAdd = (props) => {

  const addToPlaylist = async(token, playlistId, song) => {

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${song}`, {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: {
        "name": "Updated Playlist Name",
        "description": "Updated playlist description",
        "public": true
      }
    });

    if(result.status == 201 || result.status == 200){
      console.log(result.status)

      const data = await result.json()


      window.alert("Added to playlist");

      return data;
    }
    else {
      window.alert("Please Choose a Valid Playlist")
    }
  }

  const addSong = async() => {
    const token = localStorage.getItem("token")
    const playlistId = await props.currentList;

    const add = await addToPlaylist(token, playlistId.current, props.songURI)
  }

  return (
    <div className={styles.upThirty}>
      <button
      className={styles.plusButton}
      onClick={() => addSong()}
      >
      <p> + </p>
      </button>
    </div>
  )
}

export default PlaylistAdd;
//72ppfMgCGFcTr51jpljCQJ
//spotify:track:6HZILIRieu8S0iqY8kIKhj
//spotify:track:6HZILIRieu8S0iqY8kIKhj
//spotify:track:57bgtoPSgt236HzfBOd8kj
//https://api.spotify.com/v1/playlists/[object%20Object]/tracks?uri=spotify:track:68cEOMVXAmc2YhKwnr6TBN
