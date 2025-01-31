
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import TopMenu from "./components/TopMenu/TopMenu";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Callback from "./pages/Login/Callback";
import "./styles/_global.scss";

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

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Profile />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/callback" element={<Callback />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
