import { Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";

import StartPage from "./StartPage.jsx";
import MovieList from "./MovieList";
import Booking from "./Booking";
import Receipt from "./Receipt";
import AboutUs from "./AboutUs";

import Page404 from "./Page404.jsx";

export default function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* Add a 404 page last using path='*' */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
    </>
  );
}
