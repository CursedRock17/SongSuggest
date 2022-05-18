import React, { useEffect, useState } from 'react'
import styles from '../../Styling/styles.module.css'
import Search from '../MainComponents/Search';
import CustomButton from '../DRYComps/CustomButton'
/*We are going to use a grid of buttons in order to select a thing to search for (let index = 0; index < array.length; index++) {
We can update the placeholder and function call in the Search Component
*/
export const Options = () => {
  const [ searchType, setSearchType ] = useState("Select A Type");

  function beginSearch(name) {
    setSearchType(name)
  }

  return (
    <div className={styles.middle}>
      <Search searchName={searchType} />
      <div className={styles.mainGrid}>
        <CustomButton buttonName="Artist" setSearchType={() => beginSearch("Artist")}/>
        <CustomButton buttonName="Song" setSearchType={() => beginSearch("Song")}/>
        <CustomButton buttonName="Playlist" setSearchType={() => beginSearch("Playlist")}/>
        <CustomButton buttonName="Albums" setSearchType={() => beginSearch("Artist's Albums")}/>
        <CustomButton buttonName="Real Album" setSearchType={() => beginSearch("Search Specific Albums")}/>
      </div>
    </div>
  )
}

export default Options;
