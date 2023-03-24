import React from "react";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
export default function Movie({ screening, movie }) {
  if (!screening || !movie) {
    return <div>Error: Screening or Movie is undefined.</div>;
  }

  const { screeningId, screeningTime, auditorium } = screening;
  const { id, title, description } = movie;
  const { length, categories, posterImage } = description;

  let posterImageURL = "https://cinema-rest.nodehill.se/" + posterImage;

  function GetTimeDisplay(timeCode) {
    const date = new Date(timeCode);
    return date.toLocaleString();
  }

  return (
    <Link to={`/booking/${id}`} className="movie-link">
      <Card className="movie-card">
        <Card.Img variant="top" src={posterImageURL} alt={title} />
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
