import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopMenu from "./components/TopMenu/TopMenu";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Callback from "./pages/Login/Callback";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import MoodForm from "./pages/MoodForm/MoodForm";
import ProtectedRoute from "./hooks/protectedRoute";
import MyTracks from "./pages/MyTracks/MyTracks";

import { LoadingProvider } from "./context/LoadingContext/LoadingProvider";
import { FilteredTracksProvider } from "./context/FilteredTracksContext/FilteredTracksProvider";
import { useLoading } from "./context/LoadingContext/useLoading";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import "./styles/_global.scss";

// Función para analizar el estado de ánimo
const handleAnalyzeMood = (moodText: string, genres?: string[]) => {
    console.log("Mood", moodText);
    if (genres && genres.length > 0) {
        console.log("Géneros");
    }
};

// Función para obtener una playlist sorpresa
const handleGetSurprisePlaylist = () => {
    // Aquí podrías hacer una petición a tu backend para obtener una playlist aleatoria.
};

// Componente Layout
const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useLoading(); // ✅ Obtener el estado de carga global
    return (
        <>
            {isLoading && <LoadingSpinner />} {/* ✅ Capa de carga global */}
            <TopMenu />
            {children}
        </>
    );
};

// Contenido de la aplicación con rutas protegidas
const AppContent = () => {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute element={
                <MoodForm onAnalyzeMood={handleAnalyzeMood} onGetSurprisePlaylist={handleGetSurprisePlaylist} />
            } />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/my-tracks" element={<MyTracks />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
    );
};

// Componente principal de la aplicación
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
