import React from "react";
import { Link } from "react-router-dom";

function GotToBooking() {
  return <h1>Another Page</h1>;
}

export default function Movie(props) {
  // Destructure props into separate variables
  let { title, description, screeningTime, auditorium, screeningId } = props; // destructure "title" and "description" from props
  let { posterImage } = description; //desctructure "posterImage" attribute from description

  // Add the correct domain to the image path
  posterImage = "https://cinema-rest.nodehill.se/" + posterImage;

  return (
    <>
      <Link to="/booking" state={{ screeningId: screeningId }}>
        <div className="movie">
          {TimeDisplay(screeningTime)}
          <p>Title: {title}</p>
          <p>Cinema: {auditorium}</p>
          <img src={posterImage} />
        </div>
      </Link>
    </>
  );
}

// function TimeDisplay(timeCode) {
//   const date = new Date(timeCode);
//   const formattedDate = date.toISOString().replace("T", " ").slice(0, -1);
//   return <h2>{formattedDate}</h2>
// }

function TimeDisplay(timeCode) {
  const date = new Date(timeCode);
  return date.toLocaleString();
}

// <Movie key={id}
// title = { title }
// description = { description }
// screeningTime = { screeningTime }
// auditorium = { auditorium } />
