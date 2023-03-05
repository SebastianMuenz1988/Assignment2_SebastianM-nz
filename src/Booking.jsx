import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Booking() {
  const numRows = 10;
  const seatsPerRow = 10;
  const location = useLocation();
  const screeningId = location.state?.screeningId;
  console.log("state variable:", location.state.screeningId);

  if (!screeningId) {
    return <div>No data found</div>;
  }

  const [s, setS] = useState({
    bookings: [],
    occupiedSeats: [],
    seatingChart: Array(numRows)
      .fill()
      .map(() => Array(seatsPerRow).fill(false)),
  });

  let copyOfS = { ...s };
  const set = (key, value) => {
    copyOfS[key] = value;
    setS({ ...copyOfS });
  };

  // useEffect gets only triggerd once (hard page reload) because trigger is empty []
  useEffect(() => {
    fetchBookingsOverview();
    fetchOccupiedSeats();
  }, []);

  // total price, the date and time, all the seat numbers and booking number

  const fetchBookingsOverview = async () => {
    const response = await fetch("/api/bookings_overview");
    const data = await response.json();
    set("bookings", data);
  };
  //   {
  //   "email": "ddulanyb@yellowpages.com",
  //   "bookingNumber": "JKB018",
  //   "seats": "14, 15",
  //   "ticketTypes": "Child, Senior",
  //   "screeningId": 1,
  //   "screeningTime": "2023-05-01T16:00:00.000Z",
  //   "movie": "Crocodile Dundee",
  //   "auditorium": "Stora Salongen"
  // }

  const fetchOccupiedSeats = async () => {
    const response = await fetch("/api/occupied_seats");
    const data = await response.json();
    set("occupiedSeats", data);
  };

  //   {
  //   "screeningId": 1,
  //   "screeningTime": "2023-05-01T16:00:00.000Z",
  //   "movie": "Crocodile Dundee",
  //   "auditorium": "Stora Salongen",
  //   "occupiedSeats": "2, 3, 12, 14, 15, 23, 24, 25, 26, 27, 50, 51, 52, 53, 54, 55, 58, 59, 66, 67, 68, 69, 70, 71, 76, 77",
  //   "occupied": 26,
  //   "total": 81,
  //   "occupiedPercent": "32"
  // }

  return (
    <div>
      <h2>Seating Chart</h2>
      <table>
        <tbody>
          {s.seatingChart.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((seat, seatIndex) => (
                <td key={seatIndex} className={seat ? "reserved" : "available"} onClick={() => console.log(`Clicked seat ${rowIndex}-${seatIndex}`)}>
                  {rowIndex + 1}-{String.fromCharCode(65 + seatIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
