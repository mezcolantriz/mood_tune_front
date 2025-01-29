import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/">🏠 Home</Link>
                </li>
                <li>
                    <Link to="/profile">👤 Profile</Link>
                </li>
                <li>
                    <Link to="/login">🔑 Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
