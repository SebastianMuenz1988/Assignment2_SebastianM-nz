import React from "react";
import { useState, useEffect } from "react";
// import our Movie component
import Movie from "./Movie";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import "./style.css";

// It's important to note that calling the update function does not
// immediately update the state variable. Instead, React will queue up
// the state update and apply it during the next re - render.
// This allows React to batch multiple state updates together for better performance.

export default function App() {
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);
  // const [fetchStatus, setFetchStatus] = useState("loading");
  const [uniqueDates, setdUniqueDates] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchMovies();
    fetchScreeningsOverview();
  }, []);

  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  const fetchMovies = async () => {
    // console.log("categoryFilter", categoryFilter);
    const response = await fetch("/api/movies");
    const data = await response.json();
    // add a slug to be used in url routes to each movie
    // for (let movie of data) {
    //   movie.slug = kebabify(movie.title);
    // }
    setMovies(data);
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

    const formattedData = data.map((item) => {
      const date = new Date(item.screeningTime);
      const formattedDate = date.toLocaleDateString("en-US", { dateStyle: "long" });
      const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
      return { ...item, formattedDate, weekday };
    });

    setScreenings(formattedData);
    // console.log("formattedData", formattedData);

    const uniqueDates = [...new Set(formattedData.map((item) => item.formattedDate))].sort();

    const uniqueDatesSorted = uniqueDates.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    setdUniqueDates(uniqueDatesSorted);
    // console.log("uniqueDates", uniqueDates);
  };
  // formattedData:
  // auditorium:"Stora Salongen"
  // formattedDate:"5/1/23"
  // movie:"Crocodile Dundee"
  // screeningId:1
  // screeningTime:"2023-05-01T16:00:00.000Z"
  // weekday:"Monday"

  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data);
  };
  // "id": 1,
  // "title": "Adventure",
  // "description": "This is the Adventure category."

  //------------------------------------------------------------------------
  const getWeekday = (date) => {
    // console.log(date);
    const data = new Date(date);
    const weekday = data.toLocaleDateString("en-US", { weekday: "long" });
    return weekday;
  };

  const findMovie = (movieTitle) => {
    if (movieTitle) {
      return movies.find((movie) => movie.title == movieTitle);
    }
    return [];
  };

  const handleDropdownChange = (eventKey, event) => {
    setCategoryFilter(eventKey);
  };
  console.log("movies: ", movies);
  console.log("screenings: ", screenings);
  // are movies and screenings fetched?
  // if (movies === [] || screenings === []) {

  return (
    <div className="App">
      <Row>
        <Col>
          <DropdownButton id="dropdown-basic-button" title="Select Value" onSelect={handleDropdownChange}>
            {categories.map((categorie) => (
              <Dropdown.Item key={categorie.title} eventKey={categorie.title}>
                {categorie.title}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
      <Row className="Heading-row">
        <Col>
          <h1>The Screenings:</h1>
        </Col>
      </Row>
      {uniqueDates.map((date) => (
        <React.Fragment key={date}>
          <Row className="weekday-row">
            <Col className="weekday-col">
              <h1>
                {getWeekday(date)} {date}
              </h1>
            </Col>
          </Row>
          <Row className="movie-row g-4">
            {screenings
              .filter((obj) => date.includes(obj.formattedDate))
              .map((screening) => {
                const movie = findMovie(screening.movie);

                if (!categoryFilter || movie.description.categories.includes(categoryFilter)) {
                  return (
                    <Col className="movie-col" xs={12} sm={6} md={4} lg={3} key={screening.screeningId}>
                      <Movie screening={screening} movie={movie} />
                    </Col>
                  );
                }
                return null;
              })}
          </Row>
        </React.Fragment>
      ))}
    </div>
  );

  // if (movies === undefined) {
  //   return <div className="loading">loading</div>;
  // } else {
  //   return (
  //     <div className="App">
  //       <DropdownButton id="dropdown-basic-button" title="Select Value" onSelect={handleDropdownChange}>
  //         {categories.map((categorie) => (
  //           <Dropdown.Item key={categorie.title} eventKey={categorie.title}>
  //             {categorie.title}
  //           </Dropdown.Item>
  //         ))}
  //       </DropdownButton>
  //       <h1>screenings</h1>
  //       {uniqueDates.map((date) => (
  //         <div key={date}>
  //           <h1>
  //             {getWeekday(date)} {date}
  //           </h1>

  //           {screenings
  //             .filter((obj) => date.includes(obj.formattedDate))
  //             .map((screening) => {
  //               const movie = findMovie(screening.movie);
  //               // console.log("movie.description.categories", movie.description.categories);
  //               // console.log("categoryFilter", categoryFilter);
  //               if (!categoryFilter || movie.description.categories.includes(categoryFilter)) {
  //                 return (
  //                   <Movie //
  //                     key={screening.screeningId}
  //                     screening={screening}
  //                     movie={movie}
  //                   />
  //                 );
  //               }
  //               return null;
  //             })}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }
}
