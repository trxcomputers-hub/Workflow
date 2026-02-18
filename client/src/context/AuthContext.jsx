import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Get API URL from env or fallback to local for dev
const API_URL = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5000`;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        // Setup axios base URL
        axios.defaults.baseURL = API_URL;

        if (token && userData) {
            setUser(JSON.parse(userData));
            axios.defaults.headers.common['x-auth-token'] = token;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            console.log('Attempting login to:', axios.defaults.baseURL);
            const res = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            console.error('Login Error details:', err);
            const errorMsg = err.response?.data?.msg || (err.message === 'Network Error' ? 'Cannot connect to Server. Check API URL.' : 'Login failed');
            return { success: false, msg: errorMsg };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const res = await axios.post('/api/auth/register', { name, email, password, role });
            return { success: true };
        } catch (err) {
            return { success: false, msg: err.response?.data?.msg || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['x-auth-token'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
