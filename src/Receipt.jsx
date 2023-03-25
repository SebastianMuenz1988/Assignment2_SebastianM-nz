import React from "react";

import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Receipt() {
  const location = useLocation();
  console.log("location: ", location);

  const { pickedMovie, selectedSeats, total, bookingNo } = location.state ? location.state : "null";

  const date = new Date();
  const timestamp = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour12: true })}`;

  function GetTimeDisplay(timeCode) {
    const date = new Date(timeCode);
    return date.toLocaleString();
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Booking Receipt</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Booking Details</Card.Title>
              <Card.Text>Booking Timestamp: {timestamp}</Card.Text>
              <Card.Text>Screening Time: {GetTimeDisplay(pickedMovie.screeningTime)}</Card.Text>
              <Card.Text>Booking Number: {bookingNo}</Card.Text>
              <Card.Text>
                Booked Seats:{" "}
                {selectedSeats.map((seat, index) => (
                  <span key={index}>
                    {index > 0 ? ", " : ""}
                    {seat.id}
                  </span>
                ))}
              </Card.Text>
              <Card.Text>Total Price: {total} kr</Card.Text>
              <Card.Text>Thank you for your booking!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
