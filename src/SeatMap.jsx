import React from "react";
import { useState } from "react";
import Seat from "./Seat";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SeatMap({
  //
  seats,
  toggleSelect,
  seatsPerRow,
}) {
  console.log("seatsPerRow", seatsPerRow);

  // return (
  //   <Container>
  //     <h2>Select your seats</h2>
  //     <Row>
  //       {seats.map((seat) => (
  //         // <Col key={seat.id} xs={seatsPerRow === "8" ? 2 : 3} className="box">
  //         <Seat //
  //           id={seat.id}
  //           seat={seat}
  //           toggleSelect={toggleSelect}
  //           seatsPerRow={seatsPerRow}
  //         />
  //         // </Col>
  //       ))}
  //     </Row>
  //   </Container>
  // );
  // }

  return (
    <Container>
      {seats.map((seat, index) => {
        if (index % seatsPerRow === 0) {
          // start a new row after every 8 seats
          return (
            <Row key={index}>
              <Seat //
                id={seat.id}
                seat={seat}
                toggleSelect={toggleSelect}
                seatsPerRow={seatsPerRow}
              />
            </Row>
          );
        }
        return <Col key={index}>{seat}</Col>;
      })}
    </Container>
  );
}
