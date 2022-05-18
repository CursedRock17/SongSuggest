import React from 'react'
import styles from '../../Styling/styles.module.css'

export const RecommendationCard = (props) => {

  const url = `https://open.spotify.com/track/${props.link}`

  return (
    <div className={styles.recommendCard}>
      <a href={url} className={styles.recommendAnchor}> {props.name} </a>
      <br />
      <img src={props.image} height="128" width="128"></img>
      <br />
      {props.artist}
    </div>
  )
}

export default RecommendationCard;
