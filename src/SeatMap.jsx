import React from "react";
import { useState } from "react";
import Seat from "./Seat";

export default function SeatMap({
  //
  seats,
  toggleSelect,
}) {
  return (
    <>
      <div className="seat-map">
        {seats.map((seat) => (
          <Seat //
            key={seat.id}
            id={seat.id}
            seat={seat}
            toggleSelect={toggleSelect}
          />
        ))}
      </div>
    </>
  );

  //   return seats.map((seat) => {
  //     return <Seat key={seat.id} id={seat.id} seat={seat} toggleSelect={toggleSelect} />;
  //   });
}
