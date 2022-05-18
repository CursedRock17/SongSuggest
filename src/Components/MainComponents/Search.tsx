import React, { useState, useEffect, useContext } from 'react'
import styles from '../../Styling/styles.module.css'
import { SearchContext } from "../../Context/SearchContext"
import { getToken } from '../SpotifyAPI/GetToken'

export const Search = (props) => {

  const [ clientInput, setClientInput ] = useState("");
  const [ itemsList, setItemsList ] = useState([]);
  const [ prevTarget, setPrevTarget ] = useState("");

  const { searchArray, setSearchArray } = useContext(SearchContext)

  function loopItems(items) {
    /*This allows us to go through all the queried elements and add them
    to a list, we can make itemsList an array object to add pics and authors
    */
    if(itemsList.length < items.length){
      items.forEach(element => {
      setItemsList(oldArray => [...oldArray, element]);
      });
    }
  }

  //GetArtist specifically takes in an artist's id, a base-62 set of numbers and letters
  const getArtistName = async(token, name) => {
    //This function will find us the name of an artist we get from an id
    //We use GET because we're fetching from spotify, then just return the name
    const result = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    })

    const data = await result.json();

    loopItems(data.artists.items);

    return itemsList;
  }

  const getArtistId = async(token, name) => {
    //This function will find us the id of an artist
    const result = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    })

    const data = await result.json();

    return data.artists.items[0].id
  }


  const getAlbum = async(token, id) => {
    //Name has to be the specific id, pry for their database
    const limit = 20;

    const result = await fetch(`https://api.spotify.com/v1/artists/${id}/albums?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    })

    const data = await result.json();

    loopItems(data.items)

    return data.items;
  }



  const getAlbumId = async(token, name) => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=album`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    })

    const data = await result.json();

    const items = data.albums.items

    loopItems(items)

    return data.albums.items
  }


  const getSongId = async(token, name) => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=track`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    })

    const data = await result.json();

    const items = data.tracks.items

    loopItems(items)

    return data.tracks.items
  }

  const getPlaylistId = async(token, name) => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=playlist`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    })

    const data = await result.json();

    const items = data.playlists.items

    loopItems(items)

    return data.playlists.items
  }


  const getStyle = async(token, name) => {
    //Can't use style, but we can use this for recommendations
    const result = await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    })

    const data = await result.json();
    const items = data.genres

    loopItems(items)

    return data.genres
  }


  //Go through and select what we need from the set of searchfilters
  //This is what we will display, and we check the case based on the button clicked

    function clearItemsList() {
      setItemsList([]);
    }

    useEffect(() => {
      getList();
      setSearchArray(itemsList);
    },[itemsList])

   const getList = async(check) => {
     const token = await getToken();
     const target = props.searchName

     //We have to reset the array everytime we switch up what we're looking for
     if(prevTarget != clientInput){
        clearItemsList();
        setPrevTarget(clientInput);
     }

     if(target == "Artist"){
       const newArtist = await getArtistName(token, clientInput);

     }

     else if(target == "Artist's Albums"){
       const token = await getToken();

      const newArtistID = await getArtistId(token, clientInput);
      const newAlbum = await getAlbum(token, newArtistID);
     }

     else if(target == "Search Specific Albums"){
       const token = await getToken();

       const realAlbumID = await getAlbumId(token, clientInput);
     }

     else if(target == "Song"){
       const token = await getToken();

       const songId = await getSongId(token, clientInput);
     }

     else if(target == "Playlist"){
       const token = await getToken();

       const playlistId = await getPlaylistId(token, clientInput)
     }

     else if(target == "Style"){
        const token = await getToken();

        //const styleType = await getStyle(token, clientInput)
     }

     else if(target == "Select A Type" && check == "p") {
       window.alert("No Type Selected")
     }
   }

   function addArtist(val){
     setClientInput(val);
   }

  return (
  <div className={styles.middle}>
    <div className={styles.searchBox}>
      <input
      placeholder={props.searchName}
      onChange={(val) => addArtist(val.target.value)}
      >
      </input>
      <button
      onClick={() => getList("p")}
      >
        Search
      </button>
    </div>
  </div>
  )
}

export default Search;
