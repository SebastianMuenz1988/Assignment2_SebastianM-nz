import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Seat({
  //
  id,
  seat,
  toggleSelect,
  seatsPerRow,
}) {
  //I need a extra function!!! Can not directly call toggleSelect!
  function handleSelectClick() {
    toggleSelect(id);
  }

  // return (
  //   <div //
  //     className={`seat ${seat.occupied ? "occupied" : ""} ${seat.selected ? "selected" : ""}`}
  //     onClick={handleSelectClick}
  //   >
  //     {id}
  //   </div>
  // );
  const getWidth = () => (18 / 8) * 100;

  return (
    <Col //
      key={seat.id}
      style={{ width: 100 / seatsPerRow + "%" }}
      xs={seatsPerRow === "8" ? 1 : 2}
      className={`seat ${seat.occupied ? "occupied" : ""} ${seat.selected ? "selected" : ""}`}
      onClick={handleSelectClick}
    >
      {id}
    </Col>
  );
}
