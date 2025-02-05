import { Link } from "react-router-dom";
import UserImage from "../UserImage/UserImage";
import "./TopMenu.scss";
import { useTranslation } from "react-i18next";

const TopMenu: React.FC = () => {
    const { t } = useTranslation();

    return (
        <nav className="topmenu">
            <ul className="nav-links">
                <li className="topmenu__link topmenu__main-link">
                    <Link to="/">{t('navbar.mood-form')}</Link>
                </li>
                <li className="topmenu__link">
                    <Link to="#">{t('navbar.playlists')}</Link>
                </li>
                <li className="topmenu__link">
                    <Link to="#">{t('navbar.stats')}</Link>
                </li>
                <li className="topmenu__link">
                    <Link to="#">{t('navbar.moods')}</Link>
                </li>
                <li className="topmenu__link">
                    <Link to="#">{t('navbar.fav-songs')}</Link>
                </li>
                <li className="fav-artists">
                    <Link to="#">{t('navbar.fav-songs')}</Link>
                </li>
                <li className="topmenu__image-link">
                    <UserImage size="sm" />
                </li>
            </ul>
        </nav>
    );
};

export default TopMenu;
