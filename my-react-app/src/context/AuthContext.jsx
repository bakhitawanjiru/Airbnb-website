import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register/', userData);
            if (response.data) {
                return { 
                    success: true,
                    data: response.data 
                };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/auth/login/',
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                
                toast.success('Login successful!');
                
                return {
                    success: true,
                    isAdmin: response.data.user.isAdmin,
                    userType: response.data.user.user_type
                };
            }

            toast.error('Invalid response from server');
            return {
                success: false,
                error: 'Invalid response from server'
            };
            
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'Login failed';
            toast.error(errorMessage);
            
            return {
                success: false,
                error: errorMessage
            };
        }
    };

    const adminLogin = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/admin-login/', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isAdmin', 'true');
                setUser({ ...response.data.user, isAdmin: true });
                return { success: true };
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || 'Admin login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/api/auth/user/', {
                headers: { Authorization: `Token ${token}` }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(() => {
                localStorage.removeItem('token');
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            register,
            login,
            logout,
            adminLogin
        }}>
            {children}
        </AuthContext.Provider>
    );
};