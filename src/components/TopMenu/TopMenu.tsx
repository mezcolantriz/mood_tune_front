import { Link, useLocation, useNavigate } from "react-router-dom";
import UserImage from "../UserImage/UserImage";
import "./TopMenu.scss";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const TopMenu: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");

        navigate("/login"); 
    };

    return (
        <nav className="topmenu">
            <ul className="nav-links">
                <li className={`topmenu__link topmenu__main-link ${location.pathname === "/" ? "selected" : ""}`}>
                    <Link to="/">{t('navbar.mood-form')}</Link>
                </li>
                <li className={`topmenu__link ${location.pathname === "/my-playlists" ? "selected" : ""}`}>
                    <Link to="/my-playlists">{t('navbar.playlists')}</Link>
                </li>
                <li className={`topmenu__link ${location.pathname === "/stats" ? "selected" : ""}`}>
                    <Link to="/stats">{t('navbar.stats')}</Link>
                </li>
                <li className={`topmenu__link ${location.pathname === "/moods" ? "selected" : ""}`}>
                    <Link to="/moods">{t('navbar.moods')}</Link>
                </li>
                <li className={`topmenu__link ${location.pathname === "/my-tracks" ? "selected" : ""}`}>
                    <Link to="/my-tracks">{t('navbar.fav-songs')}</Link>
                </li>
            </ul>
            <div className="topmenu__settings">
                <LanguageSwitcher />
                <UserImage size="sm" />
                <button className="logout-button" onClick={handleLogout}>{t('navbar.logout')}</button>
            </div>
        </nav>
    );
};

export default TopMenu;
