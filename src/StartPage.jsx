import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export default function StartPage() {
  return (
    <Container className="py-5">
      <h1>Welcome to Our Movie Theater!</h1>
      <p className="lead">Experience the latest blockbusters in state-of-the-art theaters.</p>
      <hr className="my-4" />
      <p>Explore our movie list and book tickets for your favorite movies.</p>
      <Link to="/movies">
        <Button variant="primary">View Movie List</Button>
      </Link>
    </Container>
  );
}
