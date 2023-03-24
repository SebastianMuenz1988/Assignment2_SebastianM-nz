import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function AboutUs() {
  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <h2>About Our Movie Theater</h2>
          <p className="lead">Our movie theater is committed to providing our customers with the best movie-watching experience possible.</p>
          <p>We offer state-of-the-art theaters equipped with the latest technology, comfortable seating, and a variety of refreshments to enhance your movie-going experience.</p>
        </Col>
        <Col md={6}>
          <img src="/src/images/aboutus.jpg" alt="About Us" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
}
