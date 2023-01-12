import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Loading from './components/UI/Loading';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();

      const transformedData = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl
        };
      });
      setMovies(transformedData);
      setIsLoading(false);
    }
  

  return (
    <React.Fragment>
      {isLoading && <Loading/>}
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
