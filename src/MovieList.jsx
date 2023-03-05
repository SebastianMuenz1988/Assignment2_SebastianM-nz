import React from "react";
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
  const [s, setS] = useState({
    movies: [],
    screening: [],
  });

  // Make a copy of the state
  // so that changes to that copy
  // can be used immediately
  // (the state itself first changes on next call/render)
  // Advantage: We can call set several times during
  // the same 'cycle'... and store all changes correctly in
  // in our single state variable 's'
  let copyOfS = { ...s };
  const set = (key, value) => {
    copyOfS[key] = value;
    setS({ ...copyOfS });
  };

  // useEffect triggered by gjrd reload of the page
  // Self-executing asyncronous anonomyous function (()=>{})
  // because fetch needs async, but react doesn't like useEffect() getting a
  // async function so i wrap asyc function in another function

  useEffect(() => {
    fetchMovies();
    fetchScreeningsOverview();
    fetchCategories();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch("/api/movies");
    const data = await response.json();
    set("movies", data);
  };
  // {
  //+   "id": 1,
  //+   "title": "Crocodile Dundee",
  //+   "description": {
  //     "length": 89,
  //     "categories": [
  //       "Adventure",
  //       "Comedy"
  //     ],
  //+    "posterImage": "/images/posters/tt0090555.jpg"
  //   }

  const fetchScreeningsOverview = async () => {
    const response = await fetch("/api/screenings_overview");
    const data = await response.json();
    set("screening", data);
  };
  // {
  //   "screeningId": 1,
  //+  "screeningTime": "2023-05-01T16:00:00.000Z",
  //   "movie": "Crocodile Dundee",
  //+   "auditorium": "Stora Salongen"
  // }

  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    set("fetchCategories", data);
  };
  // {
  //   "id": 1,
  //   "title": "Adventure",
  //   "description": "This is the Adventure category."
  // }
  console.log(s.movies);
  console.log(s.screening);
  // merge the two arrays by id
  const mergedObjects = s.movies.map((object1) => {
    const object2 = s.screening.find((obj) => obj.screeningId === object1.id);
    return { ...object1, ...object2 };
  });

  const sortedItems = [...mergedObjects].sort((a, b) => {
    const dateA = new Date(a.screeningTime);
    const dateB = new Date(b.screeningTime);
    return dateA - dateB;
  });

  // ChildComponent "<Movie" GETS id , title and description FROM state variable "movies"
  return (
    <div className="App">
      <h1>Available Movies</h1>
      {sortedItems.map(({ id, title, description, screeningTime, auditorium, screeningId }) => (
        <Movie key={id} title={title} description={description} screeningTime={screeningTime} auditorium={auditorium} screeningId={screeningId} />
      ))}
    </div>
  );
}
