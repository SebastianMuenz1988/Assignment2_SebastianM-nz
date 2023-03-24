import React from "react";
import { useState, useEffect } from "react";
import SeatMap from "./SeatMap";
import { useParams } from "react-router-dom";
import { generateBookingNumber } from "./utilities/generate-booking-number";
import { Link } from "react-router-dom";
import { Container, Button, Form, ListGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Card, Badge } from "react-bootstrap";
import "./booking.css";

export default function Booking() {
  // read the id param from the url
  const { id: screeningId } = useParams();
  console.log("screeningId", screeningId);

  if (!screeningId) {
    return <div>No data found</div>;
  }

  const [pickedMovie, setPickedMovie] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [total, setTotal] = useState();
  const [bookingNo, setbookingNo] = useState([]);

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

  // fetchOccupiedSeats
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

  // If state variable: "pickedMoive" is updated -> Update selected seats
  const createSeats = () => {
    const seats = [];
    if (!pickedMovie) {
      return <div>Loading...</div>;
    }
    for (let i = 0; i <= pickedMovie.total; i++) {
      const occupiedSeatsArray = pickedMovie.occupiedSeats.split(",").map(Number);
      const seat = {
        id: i,
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

  // Functions that I pass to Seats
  const seatPerRow = () => {
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
      (seat.id % 8 == 7 && selectedSeats.some((sseat) => sseat.id % 8 == 0)) || //
      (seat.id % 8 == 0 && selectedSeats.some((sseat) => sseat.id % 8 == 7))
    )
      return;

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

  console.log("selectedSeats", selectedSeats);
  console.log("total", total);

  return (
    <Container>
      <h1 className="text-center my-5">Seat Booking System</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h2>You picked:</h2>
            </Card.Header>
            <Card.Body>
              <SeatMap seats={seats} toggleSelect={toggleSelect} setSeatType={setSeatType} seatsPerRow={seatPerRow()} />
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
                      <select id={selectedSeat.id} value={seats[selectedSeat.id].seatType} onChange={setSeatType}>
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
              <div className="text-center">
                <Button as={Link} to="/receipt" variant="primary" className="w-100">
                  Next Step
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
