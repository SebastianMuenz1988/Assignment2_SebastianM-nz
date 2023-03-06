import React from "react";
import { useState } from "react";

export default function Seat({ id, occupied, selected, onSelect, type }) {
  //({ id, occupied, selected, onSelect })
  // const [isOccupied, setIsOccupied] = useState(occupied);
  const [isSelected, setIsSelected] = useState(selected);

  //do i have to do this in seat map or booking??? and just pass this funktion along?
  const handleClick = () => {
    console.log(occupied);
    if (!occupied) {
      setIsSelected(!isSelected);
      onSelect(id, !isSelected);
    }
  };

  return (
    <div //
      className={`seat ${occupied ? "occupied" : ""} ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    ></div>
  );
}
