import React, { useState, useContext } from 'react'

import Footer from './Components/MainComponents/Footer';
import Info from './Components/MainComponents/Info';
import Navbar from './Components/MainComponents/Navbar';
import Options from './Components/ListedComponents/Options';
import SearchList from './Components/ListedComponents/SearchList';
import Recomend from './Components/Personals/Recomend';

import { SearchContextWrapper } from "./Context/SearchContext"

class App extends React.Component {
  //In this app, we will use Spotify's API to help users expand their
  //Taste in the music world, it should be two sections, a slider to find new
  //Ideas and a search based application to find specific stuff, maybe a trending sectuon two
  constructor(){
    super();
  }

  render() {
    return (
      <>
        <SearchContextWrapper>
          <Navbar />

          <Options />
          <Info innerText="Based On Your Search We Recommend:"/>
          <SearchList />

          <Info innerText="Based on Your Music, You may like:"/>
          <Recomend />
          <Footer />
        </SearchContextWrapper>
      </>
      )
    }
  }

export default App
