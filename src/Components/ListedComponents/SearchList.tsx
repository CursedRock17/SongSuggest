import React, { useEffect, useContext, useState, useRef } from 'react'
import styles from '../../Styling/styles.module.css'
import { SearchContext } from "../../Context/SearchContext"
import PlaylistAdd from './PlaylistAdd'
import TargetPlaylist from '../DRYComps/TargetPlaylist'

export const SearchList = () => {
  const { searchArray, setSearchArray } = useContext(SearchContext);

  const curPlaylist = useRef("")

  const startList = (first) => {
    curPlaylist.current = first;
    console.log("First:", first);
  }
  //Allows us to map array, based on names, we also need the externalurl, which
  //can then swap with the href in the anchor tag

  const grabPlaylist = (choice) => {
    curPlaylist.current = choice
  }

  const mappedSearch = searchArray.map((id) =>
    <div>
      <li className={styles.even}>
      {
        id.type == "track" || id.type == "album" ?
        <>
        <a href={id.external_urls.spotify}>
          {id.name} - {id.artists[0].name}
        </a>
        {id.type == "track" ?
          <PlaylistAdd currentList={curPlaylist} songURI={id.uri}/> :
              <></>
            }
          </> :
          <>
          <a href={id.external_urls.spotify}>
            {id.name}
          </a>
          </>
        }
      </li>
    </div>
    )

  return (
    <div className={styles.mainList}>
    <TargetPlaylist startList={(first) => startList(first)} grabList={(choice) => grabPlaylist(choice)}/>
      <ul>
        {mappedSearch}
      </ul>
    </div>
  )
}

export default SearchList;
