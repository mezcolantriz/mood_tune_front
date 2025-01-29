import { useAuth } from "./pages/Login/useAuth";
import { useNavigate } from "react-router-dom";

function App() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            {user ? (
                <div>
                    <h1>¡Hola, {user.display_name}!</h1>
                    <img src={user.images?.[0]?.url} alt="Avatar" />
                    <button onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                    }}>
                        Cerrar sesión
                    </button>
                </div>
            ) : (
                <div>
                    <h1>Por favor, inicia sesión</h1>
                    <button onClick={() => navigate("/login")}>Ir al Login</button>
                </div>
            )}
        </div>
    );
}

export default App;
