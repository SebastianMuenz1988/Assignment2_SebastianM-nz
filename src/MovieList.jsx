import React from "react";
import { useState, useEffect } from "react";
import Movie from "./Movie";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";

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

  //----------------Fetching-----------------------

  const fetchMovies = async () => {
    // console.log("categoryFilter", categoryFilter);
    const response = await fetch("/api/movies");
    const data = await response.json();
    // I do not use slugs because I need the id for fetching
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

  //----------------Functions-----------------------

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

  // console.log("movies: ", movies);
  // console.log("screenings: ", screenings);

  //----------------Return-----------------------

  return (
    <div className="App">
      <Row className="Heading-row">
        <Col>
          <h1>The Screenings:</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DropdownButton id="categoryDropDown" title="Select Category" onSelect={handleDropdownChange}>
            {categories.map((categorie) => (
              <Dropdown.Item id="categoryDropDownItem" key={categorie.title} eventKey={categorie.title}>
                {categorie.title}
              </Dropdown.Item>
            ))}
          </DropdownButton>
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
                    <Col className="movie-col" xs={12} sm={6} md={6} lg={4} key={screening.screeningId}>
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
}
