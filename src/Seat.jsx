import React from "react";
// import { useState } from "react";

export default function Seat({
  //
  id,
  seat,
  toggleSelect,
}) {
  //I need a extra function!!! Can not directly call toggleSelect!
  function handleSelectClick() {
    toggleSelect(id);
  }

  return (
    <div //
      className={`seat ${seat.occupied ? "occupied" : ""} ${seat.selected ? "selected" : ""}`}
      onClick={handleSelectClick}
    >
      {id}
    </div>
  );
}
