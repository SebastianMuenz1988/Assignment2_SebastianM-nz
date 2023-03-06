import React from "react";
import { useState } from "react";

export default function Seat({ seat }) {
  //({ id, occupied, selected, onSelect })
  const [isOccupied, setIsOccupied] = useState(occupied);
  const [isSelected, setIsSelected] = useState(selected);

  //do i have to do this in seat map or booking??? and just pass this funktion along?
  const handleClick = () => {
    if (!isOccupied) {
      setIsSelected(!isSelected);
      onSelect(id, !isSelected);
    }
  };

  return (
    <div //
      className={`seat ${isOccupied ? "occupied" : ""} ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    ></div>
  );
}
