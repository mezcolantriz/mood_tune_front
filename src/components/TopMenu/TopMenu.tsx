import { Link } from "react-router-dom";
import UserImage from "../UserImage/UserImage";
import "./TopMenu.scss";

const TopMenu: React.FC = () => {
    return (
        <nav className="topmenu">
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <UserImage size="sm" />
                </li>
            </ul>
        </nav>
    );
};

export default TopMenu;
