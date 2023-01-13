import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loading from "./components/UI/Loading";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const cancelHandler = () => {
    setError(null);
    setIsLoading(false);
  };

  const fetchMoviesHandler = useCallback( async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('inside try')
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong... Retrying");
      }
      const data = await response.json();

      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      // setTimeout(() => {
      //   let intervalId = setInterval(async () => {
      //     const response = fetch("https://swapi.dev/api/film/");
      //     if(response.ok) {
      //       clearInterval(intervalId);
      //       setError(null);
      //     }
      //   }, 5000)
      // }, 5000);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && error && <button onClick={cancelHandler}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
