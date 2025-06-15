import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
import './ProfileSettings.css';

const ProfileSettings = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || ''
    });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                bio: user.bio || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            });
            await axios.patch('http://localhost:8000/api/auth/profile/', data, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="profile-settings">
            <h2>Profile Settings</h2>
            <form onSubmit={handleSubmit} className="settings-form">
                <div className="avatar-section">
                    <img 
                        src={preview || user?.avatar || '/default-avatar.png'} 
                        alt="Profile" 
                        className="avatar-preview"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setFormData({...formData, avatar: e.target.files[0]});
                            setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                    ></textarea>
                </div>
                <button type="submit" className="save-button">Save Changes</button>
            </form>
        </div>
    );
};

export default ProfileSettings;