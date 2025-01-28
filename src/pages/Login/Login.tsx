import React from 'react';
import styles from './Login.module.scss';

const Login: React.FC = () => {
    const handleLogin = () => {
        window.location.href = "http://127.0.0.1:5000/login";
    };

    return (
        <div className={styles.login}>
        <h1>Login with Spotify</h1>
        <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
