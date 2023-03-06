import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SeatMap from "./SeatMap";

export default function Booking() {
  //Get screeningID from location object
  const location = useLocation();
  const screeningId = location.state?.screeningId;
  let pickedAuditorum = "";

  if (!screeningId) {
    return <div>No data found</div>;
  }

  const [s, setS] = useState({
    occupiedSeats: [],
    seats: [],
  });

  let copyOfS = { ...s };
  const set = (key, value) => {
    copyOfS[key] = value;
    setS({ ...copyOfS });
  };

  // useEffect gets only triggerd once (hard page reload) because trigger is empty []
  useEffect(() => {
    fetchOccupiedSeats();
    fetchSeats();
    console.log("useEffect called!");
  }, []);

  ////////////  fetchOccupiedSeats
  const fetchOccupiedSeats = async () => {
    const response = await fetch("/api/occupied_seats");
    const data = await response.json();
    set("occupiedSeats", data);
    let occupiedSeatsArray = data[screeningId].occupiedSeats.split(",").map(Number);
    set("occupiedSeatsView", occupiedSeatsArray);
    console.log("occupiedSeatsArray: ", occupiedSeatsArray);
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

  const pickedMovie = s.occupiedSeats.find((obj) => obj.screeningId === screeningId) || [];
  if (pickedMovie.auditorium === "Lilla Salongen") {
    pickedAuditorum = 2;
  }
  if (pickedMovie.auditorium === "Stora Salongen") {
    pickedAuditorum = 1;
  }
  //////////// fetchSeats
  const fetchSeats = async () => {
    const response = await fetch("/api/seats");
    const seats = await response.json();
    console.log("seats: ", seats);
    //filter all seats by picked auditorium...
    const filteredSeats = seats.filter((seat) => seat.auditorium === pickedAuditorum);
    console.log("filteredSeats: ", filteredSeats);
    console.log("filteredSeats: ", filteredSeats);

    set("seats", filteredSeats);
    console.log("filteredSeats: ", filteredSeats);
    modifySeats();
    console.log("modifySeats s.seats: ", s.seats);
  };

  const modifySeats = () => {
    const copySeats = [...s.seats]; // always make a copy if you wanna change sth
    copySeats.map((obj) => {
      if (pickedMovie.occupiedSeats.includes(obj.rowNumber * obj.seatNumber)) {
        obj = { ...obj, occupied: true, selected: false };
      }
      obj = { ...obj, occupied: false, selected: false };
    });
    set("seats", copySeats);
  };

  // {
  //   "id": 1,
  //   "rowNumber": 1,
  //   "seatNumber": 1,
  //   "auditoriumId": 1
  // },

  // Render the seat table
  return (
    <div>
      <SeatMap seats={s.seats} />
    </div>
  );
}
