import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import TopMenu from "./components/TopMenu/TopMenu";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Callback from "./pages/Login/Callback";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import MoodForm from "./pages/MoodForm/MoodForm";
import Moods from "./pages/Moods/Moods"; // Agregado
import ProtectedRoute from "./hooks/protectedRoute";
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
          <Route path="/" element={<ProtectedRoute element={<MoodForm />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          {/* Nueva Ruta para Moods */}
          <Route path="/moods" element={<ProtectedRoute element={<Moods />} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
