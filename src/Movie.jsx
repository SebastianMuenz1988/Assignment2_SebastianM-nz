import React from "react";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import "./style.css";

export default function Movie({
  // if (!movie||!screening) {
  //   return <div>Loading...</div>;
  // }
  screening: { screeningId, screeningTime, auditorium },
  movie: {
    id,
    title,
    description: { length, categories, posterImage },
  },
}) {
  posterImage = "https://cinema-rest.nodehill.se/" + posterImage;

  function GetTimeDisplay(timeCode) {
    const date = new Date(timeCode);
    return date.toLocaleString();
  }

  return (
    <Link to={`/booking/${id}`} className="movie-link">
      <Card className="movie-card">
        <Card.Img variant="top" src={posterImage} alt={title} />
        <Card.Body>
          <Card.Title className="movie-title">{title}</Card.Title>
          <Card.Text className="movie-info">
            <span className="movie-time">{GetTimeDisplay(screeningTime)}</span>
            <span className="movie-length">{length} min</span>
          </Card.Text>
          <div className="movie-categories">
            {categories.map((category) => (
              <Badge key={category} variant="primary" className="movie-category">
                {category}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

// function TimeDisplay(timeCode) {
//   const date = new Date(timeCode);
//   const formattedDate = date.toISOString().replace("T", " ").slice(0, -1);
//   return <h2>{formattedDate}</h2>
// }

// return (
//   <>
//     <Link //
//       to={"/booking/" + id}

//       // state={{ screeningId: screeningId }}
//     >
//       <div className="movie">
//         <h2>{GetTimeDisplay(screeningTime)}</h2>
//         <p>Title: {title}</p>
//         <p>Lenght: {length}</p>
//         <img src={posterImage} />
//         {categories.map((categorie) => (
//           <p key={categorie}> {categorie} </p>
//         ))}
//       </div>
//     </Link>
//   </>
// );
