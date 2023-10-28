import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home';
import TVShows from './components/TVShows';
import Errorr from './components/Errorr';
import MovieInfo from './components/MovieInfo';
import GenreInfo from './components/GenreInfo';
import SearchResults from './components/SearchResults';
1

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies/:id' element={<MovieInfo />} />

        <Route path='/genre/:genreid/:genreName' element={<GenreInfo />} />
        <Route path='/tvshows' element={<TVShows />} />
        <Route path='/movies' element={<TVShows />} />
        <Route path='/recentlyadded' element={<TVShows />} />

        <Route path='/search' element={<SearchResults />} />
        <Route path='/*' element={<Errorr />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
