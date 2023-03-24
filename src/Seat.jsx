import React from "react";
import { Col } from "react-bootstrap";

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
