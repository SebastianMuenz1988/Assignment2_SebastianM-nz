import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SeatMap from "./SeatMap";

export default function Booking() {
  //Get screeningID from location object
  const location = useLocation();
  const screeningId = location.state?.screeningId;
  console.log("screeningId", screeningId);
  let pickedMovie = "";
  let total = "";

  if (!screeningId) {
    return <div>No data found</div>;
  }

  const [s, setS] = useState({
    occupiedSeats: [],
    seats: [],
    selectedSeats: [],
  });

  let copyOfS = { ...s };
  const set = (key, value) => {
    copyOfS[key] = value;
    setS({ ...copyOfS });
  };

  useEffect(() => {
    fetchOccupiedSeats();
    console.log("useEffect called!");
  }, []);

  ////////////  fetchOccupiedSeats
  const fetchOccupiedSeats = async () => {
    console.log("call fetchOccupiedSeats");
    const response = await fetch("/api/occupied_seats");
    const data = await response.json();
    set("occupiedSeats", data);
    let occupiedSeatsArray = data[screeningId].occupiedSeats.split(",").map(Number);
    set("occupiedSeatsView", occupiedSeatsArray);
    //   {
    //   "screeningId": 1,
    //   "screeningTime": "2023-05-01T16:00:00.000Z",
    //   "movie": "Crocodile Dundee",
    //   "auditorium": "Stora Salongen",
    //   "occupiedSeats": "2, 3, 12, 14, 15, ..., 76, 77",
    //   "occupied": 26,
    //   "total": 81,
    //   "occupiedPercent": "32"
    // }

    // get the selected movie
    pickedMovie = data.find((obj) => obj.screeningId === screeningId) || [];

    // create a new seat array from pickedMoive Object
    const seats = [];
    for (let i = 0; i <= pickedMovie.total; i++) {
      const occupiedSeatsArray = data[screeningId].occupiedSeats.split(",").map(Number);
      const seat = {
        id: i,
        occupied: occupiedSeatsArray.includes(i),
        selected: false,
        seatType: "Adult",
      };
      seats.push(seat);
    }
    set("seats", seats);
  };

  ////////////  functions

  const setSeatType = (event) => {
    console.log("call setSeatType");
    const selectedType = event.target.value;
    const id = event.target.id;
    const copySeats = [...s.seats]; // always make a copy if you wanna change sth
    const selectedSeat = copySeats.find((seat) => {
      return seat.id.toString() === id;
    });

    selectedSeat.seatType = selectedType; //
    // setTodos(s.seats);
    set("seats", copySeats);
    console.log(copySeats);

    updateSelected();
  };

  function toggleSelect(id) {
    console.log("call toggleSelect");
    const copySeats = [...s.seats]; // always make a copy if you wanna change sth
    const seat = copySeats.find((seat) => seat.id === id); // find object
    if (!seat.occupied) seat.selected = !seat.selected; //
    // setTodos(s.seats);
    set("seats", copySeats);

    updateSelected();
  }

  function updateSelected() {
    console.log("call updateSelected");
    
    const selectedSeats = s.seats.filter((seat) => seat.selected);
    // console.log("selectedSeats", selectedSeats[0].id);
    const receipt = [];

    for (let i = 0; i < selectedSeats.length; i++) {
      const seat = {
        id: selectedSeats[i].id,
        seatType: selectedSeats[i].seatType,
        price: getPrice(selectedSeats[i].id),
      };
      receipt.push(seat);
      set("selectedSeats", receipt);
    }
    getTotal();
  }

  // !! Why can't I select pickedMovie??

  const getPrice = (id) => {
    console.log("call getPrice");
    // const id = event.target.id;
    if (s.seats[id].seatType === "Adult") {
      return 110;
    }
    if (s.seats[id].seatType === "Child") {
      return 75;
    }
    if (s.seats[id].seatType === "Senior") {
      return 85;
    }
  };

  const getTotal = () => {
    console.log("call getTotal");
    console.log(selectedSeats);
    total = 0;
    for (let i = 0; i < s.selectedSeats.length; i++) {
      total += s.selectedSeats[i].price;
    }
    // total = s.selectedSeats.reduce((acc, obj) => acc + obj.price, 0);
    console.log("total: ", total);
  };

  return (
    <>
      <h1>You picked: </h1>
      <p>Please, select you seat!</p>
      <SeatMap //
        seats={s.seats}
        toggleSelect={toggleSelect}
        setSeatType={setSeatType}
      />
      <div>
        <h2>Selected Seats</h2>
        <ul>
          {s.selectedSeats.map((selectedSeat) => (
            <li key={selectedSeat.id}>
              {`Seat No:  ${selectedSeat.id} `}
              <select id={selectedSeat.id} value={s.seats[selectedSeat.id].seatType} onChange={setSeatType}>
                <option>Child</option>
                <option>Adult</option>
                <option>Senior</option>
              </select>
              <p id={selectedSeat.id}>Price: {getPrice(selectedSeat.id)}</p>
            </li>
          ))}
        </ul>
        <p>Total: {total}</p>
        <button>Take reservation</button>
      </div>
    </>
  );
}
