import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token tidak ditemukan, mengarahkan ke halaman login."); // respon kalau gk ada token yang kedeteksi
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('https://api-karyasiswa.wokaproject.id/api/v1/auth/logout', { // api logout
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // hapus token otw ke halaman login
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                // gagal logout
                throw new Error('Gagal logout');
            }
        } catch (error) {
            console.error('Error saat logout:', error.message);
        }
    };

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
