import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import TopMenu from "./components/TopMenu/TopMenu";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Callback from "./pages/Login/Callback";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import "./styles/_global.scss";
import MoodForm from "./pages/MoodForm/MoodForm";
import ProtectedRoute from "./hooks/protectedRoute";



const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const hideTopMenu = location.pathname === "/login";

    return (
        <>
            {!hideTopMenu && <TopMenu />}
            {children}
        </>
    );
};

const handleAnalyzeMood = (moodText: string, genres?: string[]) => {
    console.log("Analizando mood:", moodText);
    if (genres && genres.length > 0) {
      console.log("Géneros seleccionados:", genres.join(", "));
    }
    // Aquí podrías llamar a tu API o función para analizar sentimientos y devolver canciones.
};
  
const handleGetSurprisePlaylist = () => {
// Aquí podrías hacer una petición a tu backend para obtener una playlist aleatoria.
};

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<ProtectedRoute element={
                        <MoodForm onAnalyzeMood={handleAnalyzeMood} onGetSurprisePlaylist={handleGetSurprisePlaylist}
                    />} />} />
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/callback" element={<Callback />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
