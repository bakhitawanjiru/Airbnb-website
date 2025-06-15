import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import './AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { adminLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await adminLogin({ username, password });
            if (result.success) {
                toast.success('Admin login successful');
                navigate('/admin-dashboard');
            } else {
                toast.error(result.error || 'Invalid credentials');
            }
        } catch (error) {
            toast.error('Login failed');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="admin-login-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;