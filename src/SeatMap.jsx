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

  //   const rows = [];

  //   for (let i = 0; i < seats.length; i += 8) {
  //     const row = (
  //       <Row key={i}>
  //         {seats.slice(i, i + 8).map((seat) => (
  //           <Seat key={seat.id} id={seat.id} seat={seat} toggleSelect={toggleSelect} seatsPerRow={seatsPerRow} />
  //         ))}
  //       </Row>
  //     );
  //     rows.push(row);
  //   }

  //   return <Container>{rows}</Container>;
  // }

  // without only one row

  return (
    <Container>
      <h2>Select your seats</h2>
      <Row className="justify-content-end flex-row-reverse">
        {seats.map((seat) => (
          // <Col key={seat.id} xs={seatsPerRow === "8" ? 2 : 3} className="box">
          <Seat //
            key={seat.id}
            id={seat.id}
            seat={seat}
            toggleSelect={toggleSelect}
            seatsPerRow={seatsPerRow}
          />
          // </Col>
        ))}
      </Row>
    </Container>
  );
}
