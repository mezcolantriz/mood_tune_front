import { Link, useLocation } from "react-router-dom";
import UserImage from "../UserImage/UserImage";
import "./TopMenu.scss";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const TopMenu: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation(); 

    return (
        <nav className="topmenu">
            <ul className="nav-links">
            <li className={`topmenu__link topmenu__main-link ${location.pathname === "/" ? "selected" : ""}`}>
                    <Link to="/">{t('navbar.mood-form')}</Link>
                </li>
                <li className={`topmenu__link ${location.pathname === "/playlists" ? "selected" : ""}`}>
                    <Link to="/playlists">{t('navbar.playlists')}</Link>
                </li>
                <li className={`topmenu__link ${location.pathname === "/stats" ? "selected" : ""}`}>
                    <Link to="/stats">{t('navbar.stats')}</Link>
                </li>
                <li className={`topmenu__link ${location.pathname === "/moods" ? "selected" : ""}`}>
                    <Link to="/moods">{t('navbar.moods')}</Link>
                </li>
                <li className={`topmenu__link ${location.pathname === "/fav-songs" ? "selected" : ""}`}>
                    <Link to="/fav-songs">{t('navbar.fav-songs')}</Link>
                </li>
                <li className={`topmenu__link fav-artists ${location.pathname === "/fav-artists" ? "selected" : ""}`}>
                    <Link to="/fav-artists">{t('navbar.fav-artists')}</Link>
                </li>
            </ul>
            <div className="topmenu__settings">
                <LanguageSwitcher/>
                <UserImage size="sm" />
            </div>
        </nav>
    );
};

export default TopMenu;
