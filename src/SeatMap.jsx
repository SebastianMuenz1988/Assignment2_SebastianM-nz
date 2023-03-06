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
    <>
      <div className="seat-map">
        {seats.map((seat) => (
          <Seat //
            key={seat.id}
            id={seat.id}
            occupied={seat.occupied}
            selected={seat.selected}
            onSelect={handleSeatSelect}
          />
        ))}
      </div>
      <div>
        <h2>Selected Seats</h2>
        <ul>
          {selectedSeats.map((seatId) => (
            <li key={seatId}>{`Seat ${seatId}`}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
