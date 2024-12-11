import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar_link">
        <NavLink to="/">Patient Registration</NavLink>
        <NavLink className="navbar_link" to="/wait">Wait Times</NavLink>
      </nav>
    </div>
  );
}