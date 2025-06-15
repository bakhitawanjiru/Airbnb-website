import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import HostDashboard from './components/Dashboard/HostDashboard';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import GuestDashboard from './components/Dashboard/GuestDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/toast.css';
import ProtectedHostRoute from './components/Auth/ProtectedHostRoute';
import Dashboard from './components/Dashboard/Dashboard';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Dashboard/AdminDashboard';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <GuestDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/host-dashboard"
                            element={
                                <ProtectedRoute userType="host">
                                    <HostDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route
                            path="/admin-dashboard"
                            element={
                                <ProtectedRoute userType="admin">
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;

