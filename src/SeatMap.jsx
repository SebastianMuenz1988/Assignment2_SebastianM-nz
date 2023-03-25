import React from "react";
import Seat from "./Seat";
// import { Container, Row } from "react-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function SeatMap({
  //
  seats,
  toggleSelect,
  seatsPerRow,
}) {
  //----------------Return-----------------------

  const rows = [...new Set(seats.map((seat) => seat.row))];

  return (
    <Container>
      {rows.map((row) => (
        <Row id="seatrow" key={row} className="justify-content-center flex-row-reverse">
          {seats
            .filter((seat) => seat.row === row)
            .map((seat) => (
              <Col key={seat.id} xs={1}>
                <Seat //
                  key={seat.id}
                  id={seat.id}
                  seat={seat}
                  toggleSelect={toggleSelect}
                  seatsPerRow={seatsPerRow}
                />
              </Col>
            ))}
        </Row>
      ))}
    </Container>
  );
}
