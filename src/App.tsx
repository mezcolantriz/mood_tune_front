import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import TopMenu from "./components/TopMenu/TopMenu";
import Login from "./pages/Login/Login";
import Callback from "./pages/Login/Callback";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import MoodForm from "./pages/MoodForm/MoodForm";
import ProtectedRoute from "./hooks/protectedRoute";
import MyPlaylists from "./pages/MyPlaylists/MyPlaylists";
import MyTracks from "./pages/MyTracks/MyTracks";
import WelcomeScreen from "./pages/WelcomeScreen/WelcomeScreen";

import { LoadingProvider } from "./context/LoadingContext/LoadingProvider";
import { FilteredTracksProvider } from "./context/FilteredTracksContext/FilteredTracksProvider";
import { useLoading } from "./context/LoadingContext/useLoading";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import "./styles/_global.scss";

const handleAnalyzeMood = (moodText: string, genres?: string[]) => {
    console.log("Mood", moodText);
    if (genres && genres.length > 0) {
        console.log("Géneros");
    }
};

const handleGetSurprisePlaylist = () => {
    // Aquí podrías hacer una petición a tu backend para obtener una playlist aleatoria.
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useLoading();
    const location = useLocation();
    const hideTopMenu = location.pathname === "/welcome" || location.pathname === "/login";

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {!hideTopMenu && <TopMenu />}
            {children}
        </>
    );
};

const AppContent = () => {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute element={
                <MoodForm onAnalyzeMood={handleAnalyzeMood} onGetSurprisePlaylist={handleGetSurprisePlaylist} />
            } />} />
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/my-playlists" element={<MyPlaylists />} />
            <Route path="/my-tracks" element={<MyTracks />} />
            <Route path="/welcome" element={<ProtectedRoute element={<WelcomeScreen />} />} /> {/* ✅ Nueva ruta */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
    );
};

const App = () => {
    return (
        <Router>
            <LoadingProvider>
                <FilteredTracksProvider>
                    <Layout>
                        <AppContent />
                    </Layout>
                </FilteredTracksProvider>
            </LoadingProvider>
        </Router>
    );
};

export default App;
