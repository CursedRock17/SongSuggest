import React, { useState, useEffect } from 'react'
import styles from '../../Styling/styles.module.css'
import RecommendationCard from './RecommendationCard'
import { getToken } from '../SpotifyAPI/GetToken'

const fetchTop = async(token) => {
  /*
This file needs a scoped token in which we can access the specific user's
top seen tracks, we then return the list of items which represents the top tracks
  */
  const type = "tracks"

  const response = await fetch(`https://api.spotify.com/v1/me/top/${type}`, {
    method: 'GET',
    headers: {
    'Authorization' : 'Bearer ' + token,
    'Content-Type' : 'application/json'
   }
 })

 const data = await response.json()

  //console.log(data.items[0].id);

 return data.items;

  }

  const getArtistGenre = async(token, artistId) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: 'GET',
      headers: {
      'Authorization' : 'Bearer ' + token,
      'Content-Type' : 'application/json'
     }
    })

    /*
      This async function will take the artistId we got from fetchTop and a normal GetToken
      in order to fetch the genres that the certain artist follows we can use these for the recommendations
      We need to stringify otherwise it returns a promise instead of a stirng
    */

    const result = await response.json();

    const data = JSON.stringify(result.genres[0])

    return data;
  }

  const getFinalRecommendation = async(token, list) => {
                                          //    0       1        2-4
/*
After fetching all the important information we can give the user some recommendations
We need at least one songId, artistId, and genre then we can have two more mixed in
I chose genre for right now
*/

    const response = await fetch(`https://api.spotify.com/v1/recommendations/?seed_artists=${list}`, {
      method: 'GET',
      headers: {
      'Authorization' : 'Bearer ' + token,
      'Content-Type' : 'application/json'
     }
    })

    const result = await response.json()


    return result;
  }


export const Recomend = () => {

  //This component will hold both the logic for recommendations and the subsection

  const [ finalList, setFinalList ] = useState([]);
  const token = window.localStorage.getItem("token");

  const grabRecommendation = async(artistList) => {
      const type = await getFinalRecommendation(token, artistList);
      setFinalList(prevList => type.tracks);

      console.log(type.tracks)
      return type.tracks;
  }


  const getRecommendation = async() => {
//First we need to fetch our global variable of a token and reset our recommendations list
    const listy = [];
    const recommend = await fetchTop(token);


    //3 genres, a track, and a artist
    /*
We just have space for 5 sections, so we'll pull the user's top 5 tracks
From there we just need to break up the sections into what iD we need
Then we use the spread operator to insert the item in our list we will
break up in order to finally fetch the recommendations, these will Then
give us a result where we can pass information as props to the cards
    */
    for(let i = 0; i < 5; i++){
      const id = recommend[i].artists[0].id

        const songName = await fetchTop(token);

        const nameId = songName[i].artists[0].id

        listy.push(nameId);
    }

    console.log(listy)

    await grabRecommendation(listy);


  /*
After getting all the tracks based on artists, I can map out a card held in this container,
for every new song, we'll put picture, href, title, and artist, maybe genre too
  */
}

  useEffect(() => {
    getRecommendation();
  },[])


const mappedRecommendations = finalList.map((song) =>
  <div>
      <RecommendationCard
      name={song.name}
      artist={song.artists[0].name}
      link={song.id}
      image={song.album.images[0].url}
      />
  </div>
)


  return (
    <div>
      <div>
      </div>
      <div className={styles.recommend}>
        <ul className={styles.mappedList}>
          {mappedRecommendations}
        </ul>
        </div>
    </div>
  )
}

export default Recomend;
