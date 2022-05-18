import React, { createContext, useState } from 'react'

export const SearchContext = createContext();

export const SearchContextWrapper = (props) => {
  const [ searchArray, setSearchArray ] = useState([]);

  return (
    <>
      <SearchContext.Provider value={{ searchArray, setSearchArray }}>
        {props.children}
      </SearchContext.Provider>
    </>
  )
}
