import React from "react";
import { useState } from "react";
import Seat from "./Seat";

export default function SeatMap({ seats }) {
  // descructure seats from props
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (id, isSelected) => {
    if (isSelected) {
      setSelectedSeats([...selectedSeats, id]);
    } else {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== id));
    }
  };

  return (
    <div className="seat-map">
      {seats.map(
        (
          seat //Map through seats array and pass every seat object to my Seat component
        ) => (
          <Seat seat={seat} onSelect={handleSeatSelect} />
        )
      )}
    </div>
  );
}
