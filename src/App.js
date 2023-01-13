import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loading from "./components/UI/Loading";
import InputForm from "./components/Form/InputForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelHandler = () => {
    setError(null);
    setIsLoading(false);
  };

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-api-integration-11967-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong... Retrying");
      }
      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }

      setMovies(loadedMovies);
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

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-api-integration-11967-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const deleteMovieHandler = async (id) => {
    const response = await fetch("https://react-api-integration-11967-default-rtdb.firebaseio.com/movies/"+`${id}.json`, {
      method: "DELETE"
    });
    if(response.ok) console.log("success")
  }

  return (
    <React.Fragment>
      <InputForm onAdd={addMovieHandler} />
      {isLoading && <Loading />}
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} onDelete={deleteMovieHandler}/>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && error && <button onClick={cancelHandler}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
