import { NavLink } from "react-router-dom";

export default function MainMenu() {
  return (
    <nav>
      <NavLink to="/">Start</NavLink>
      <NavLink to="/movies">Movies</NavLink>
      <NavLink to="/about-us">About us</NavLink>
    </nav>
  );
}
