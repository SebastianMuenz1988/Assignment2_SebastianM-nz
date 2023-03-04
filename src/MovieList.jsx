import React from "react";
import ReactDOM from "react-dom/client";

import { useState, useEffect } from "react";
// import our Movie component
import Movie from "./Movie";

// It's important to note that calling the update function does not
// immediately update the state variable. Instead, React will queue up
// the state update and apply it during the next re - render.
// This allows React to batch multiple state updates together for better performance.

export default function App() {
  // useState() hook returns an array of 2 variables [state variable, update function]
  // destructring and assign names to these values + assign empty array to state variable
  // setMovies funciton will re-render the component
  const [movies, setMovies] = useState([]);

  // useEffect triggered by gjrd reload of the page
  // Self-executing asyncronous anonomyous function (()=>{})
  // because fetch needs async, but react doesn't like useEffect() getting a
  // async function so i wrap asyc function in another function

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch("/api/movies");
    const data = await response.json();
    setMovies(data);
    console.log(data[0]);
  };

  return (
    <div className="App">
      <h1>Available Movies</h1>
      {movies.map(({ id, title, description }) => (
        <Movie key={id} title={title} description={description} />
      ))}
    </div>
  );
}
