import React from "react";
import { useState } from "react";
import Seat from "./Seat";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function SeatMap({
  //
  seats,
  toggleSelect,
  seatsPerRow,
}) {
  console.log("seatsPerRow", seatsPerRow);

  return (
    <Container>
      <h2>Select your seats</h2>
      <Row className="justify-content-end flex-row-reverse">
        {seats.map((seat) => (
          <Seat //
            key={seat.id}
            id={seat.id}
            seat={seat}
            toggleSelect={toggleSelect}
            seatsPerRow={seatsPerRow}
          />
        ))}
      </Row>
    </Container>
  );
}
