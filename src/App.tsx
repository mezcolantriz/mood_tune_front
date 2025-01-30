import "./styles/_global.scss"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./pages/Login/useAuth";
import TopMenu from "./components/TopMenu/TopMenu";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Callback from "./pages/Login/Callback";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    return user ? element : <Navigate to="/login" replace />;
};

function App() {
    return (
        <Router>
            <TopMenu />
            <Routes>
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<Callback />} />
            </Routes>
        </Router>
    );
}

export default App;
