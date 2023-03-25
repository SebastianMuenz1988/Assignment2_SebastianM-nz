import React from "react";
import { useState, useEffect } from "react";
import SeatMap from "./SeatMap";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { generateBookingNumber } from "./utilities/generate-booking-number";

export default function Booking() {
  // read the id param from the url
  const { id: screeningId } = useParams();
  const bookingNo = generateBookingNumber();

  if (!screeningId) {
    return <div>No data found</div>;
  }

  const [pickedMovie, setPickedMovie] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    fetchPickedMovieOccupiedSeats();
    console.log("useEffect called!");
  }, []);

  useEffect(() => {
    createSeats();
  }, [pickedMovie]);

  useEffect(() => {
    updateSelected();
  }, [seats]);

  useEffect(() => {
    getTotal();
  }, [selectedSeats]);

  //----------------Fetching-----------------------

  const fetchPickedMovieOccupiedSeats = async () => {
    console.log("call fetchOccupiedSeats");
    const response = await fetch("/api/occupied_seats?screeningId=" + screeningId);
    const data = await response.json();
    const pickedM = data[0];
    console.log("response: ", pickedM.occupiedSeats);
    setPickedMovie(pickedM);

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
  };

  //----------------Seats-----------------------

  const createSeats = () => {
    const seats = [];
    if (!pickedMovie) {
      return <div>Loading...</div>;
    }
    for (let i = 0; i <= pickedMovie.total; i++) {
      const occupiedSeatsArray = pickedMovie.occupiedSeats.split(",").map(Number);
      const seat = {
        id: i + 1,
        occupied: occupiedSeatsArray.includes(i),
        selected: false,
        seatType: "Adult",
      };
      seats.push(seat);
    }
    setSeats(seats);
    console.log("seats: ", seats);
    console.log("s.pickedMovie: ", pickedMovie);
  };

  // If state variable: "seats" is updated -> Update selected seats
  const updateSelected = () => {
    console.log("call updateSelected");

    const selectedFromSeats = seats.filter((seat) => seat.selected);
    // console.log("selectedFromSeats", selectedFromSeats[0].id);
    const selSeats = [];

    for (let i = 0; i < selectedFromSeats.length; i++) {
      const seat = {
        id: selectedFromSeats[i].id,
        seatType: selectedFromSeats[i].seatType,
        price: getPrice(selectedFromSeats[i].id),
      };
      selSeats.push(seat);
    }
    setSelectedSeats(selSeats);
    // getTotal(selectedSeats); //pass on receipt because selected seat
  };

  // If state variable: "selectedSeats" is updated -> Update selected seats
  const getTotal = () => {
    let varTotal = 0;
    for (let i = 0; i < selectedSeats.length; i++) {
      varTotal += selectedSeats[i].price;
    }
    // varTotal = selectedSeats.reduce((acc, obj) => acc + obj.price, 0);
    console.log("varTotal: ", varTotal);
    setTotal(varTotal);
  };

  //----------------Functions-----------------------
  const seatsPerRow = () => {
    // let pM = pickedMovie || [];
    console.log("pM.auditorium booking", pickedMovie.auditorium);
    return pickedMovie.auditorium === "Stora Salongen" ? "8" : "6";
  };

  const setSeatType = (event) => {
    console.log("call setSeatType");
    const selectedType = event.target.value;
    const id = event.target.id;
    const copySeats = [...seats]; // always make a copy if you wanna change sth
    const selectedSeat = copySeats.find((seat) => {
      return seat.id.toString() === id;
    });

    selectedSeat.seatType = selectedType; //
    setSeats(copySeats);
  };

  const toggleSelect = (id) => {
    console.log("call toggleSelect");
    const copySeats = [...seats]; // always make a copy if you wanna change sth
    const seat = copySeats.find((seat) => seat.id === id); // find object
    console.log("seat.id: ", seat.id);

    if (
      !selectedSeats.some((sseat) => sseat.id == seat.id) && //not already selected
      selectedSeats.length != 0 && //not the thirst one
      !selectedSeats.some((sseat) => sseat.id + 1 == seat.id) && // not adjacent (right)
      !selectedSeats.some((sseat) => sseat.id - 1 == seat.id) // not adjacent (left)
    ) {
      console.log("Only adjacent seats!");
      return;
    }

    if (
      selectedSeats.some((sseat) => sseat.id + 1 == seat.id) && //  adjacent (right)
      selectedSeats.some((sseat) => sseat.id - 1 == seat.id) //  adjacent (left)
    ) {
      console.log("Not allowed! First deselct the outer seats!");
      return;
    }

    if (
      (seat.id % seatsPerRow() == 1 && selectedSeats.some((sseat) => sseat.id % seatsPerRow() == 0)) || //
      (seat.id % seatsPerRow() == 0 && selectedSeats.some((sseat) => sseat.id % seatsPerRow() == 1))
    ) {
      console.log("Only in the same row!");
      return;
    }

    if (!seat.occupied) seat.selected = !seat.selected; //

    setSeats(copySeats);
  };

  // Functions used in DOM
  const getPrice = (id) => {
    console.log("call getPrice");
    // const id = event.target.id;
    if (seats[id].seatType === "Adult") {
      return 110;
    }
    if (seats[id].seatType === "Child") {
      return 75;
    }
    if (seats[id].seatType === "Senior") {
      return 85;
    }
  };

  function GetTimeDisplay(timeCode) {
    const date = new Date(timeCode);
    return date.toLocaleString();
  }

  // console.log("selectedSeats", selectedSeats);
  // console.log("total", total);

  //----------------Return-----------------------

  return (
    <Container>
      <h1 className="text-center my-5">Seat Booking System</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h2>You picked the movie: {pickedMovie.movie}</h2>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>
                  <strong>When:</strong> {GetTimeDisplay(pickedMovie.screeningTime)}
                </li>
                <li>
                  <strong>Where:</strong> Auditorium {pickedMovie.auditorium}
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h2>Seats in the Auditorium {pickedMovie.auditorium}</h2>
            </Card.Header>
            <Card.Body>
              <SeatMap //
                seats={seats}
                toggleSelect={toggleSelect}
                setSeatType={setSeatType}
                seatsPerRow={seatsPerRow()}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <h2>Selected Seats</h2>
            </Card.Header>
            <Card.Body>
              <ul>
                {selectedSeats.map((selectedSeat) => (
                  <li key={selectedSeat.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4>{`Seat No: ${selectedSeat.id}`}</h4>
                      <select //
                        id={selectedSeat.id}
                        value={seats[selectedSeat.id].seatType}
                        onChange={setSeatType}
                      >
                        <option>Child</option>
                        <option>Adult</option>
                        <option>Senior</option>
                      </select>
                    </div>
                    <p>Price: {getPrice(selectedSeat.id)}</p>
                  </li>
                ))}
              </ul>
              <hr />
              <h4 className="text-center mb-4">Total: {total}</h4>
            </Card.Body>
            <Card.Footer>
              {selectedSeats.length > 0 && (
                <Button //
                  as={Link}
                  to="/receipt"
                  state={{ pickedMovie, selectedSeats, total, bookingNo }}
                  variant="primary"
                  className="w-100"
                >
                  Book Now!
                </Button>
              )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
