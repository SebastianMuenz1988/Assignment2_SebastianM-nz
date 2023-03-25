import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <Container className="text-center my-5">
      <Row>
        <Col>
          <h1>404 Page Not Found</h1>
          <p>The page you requested could not be found.</p>
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
