import React from "react";
import { useState, useEffect } from "react";
import SeatMap from "./SeatMap";
import { useParams } from "react-router-dom";
import { generateBookingNumber } from "./utilities/generate-booking-number";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function Receipt() {
  const location = useLocation();
  console.log("location: ", location);

  const { selectedSeats, total } = location.state ? location.state : "null";
  console.log("selectedSeats: ", selectedSeats);
  console.log("total: ", total);

  const currentDate = new Date().toLocaleDateString("en-US");
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const bookingNumber = generateBookingNumber();

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
              <Card.Text>Date: {currentDate}</Card.Text>
              <Card.Text>Time: {currentTime}</Card.Text>
              <Card.Text>Booking Number: {bookingNumber}</Card.Text>
              <Card.Text>
                Selected Seats:{" "}
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
