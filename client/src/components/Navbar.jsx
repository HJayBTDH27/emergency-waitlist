import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar_link">
        <NavLink to="/">Patient Registration</NavLink>
        <NavLink to="/wait">Wait Times</NavLink>
        <NavLink to="/admin">Triage Admin</NavLink>
      </nav>
    </div>
  );
}