import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [newUser, setNewUser] = useState({ name: '', email: '', kelas: '', jurusan: '', password: '' });
    const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '', kelas: '', jurusan: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }

        const fetchUsers = async () => {
            try {
                const response = await fetch('https://api-karyasiswa.wokaproject.id/api/v1/admin/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`https://api-karyasiswa.wokaproject.id/api/v1/admin/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal menghapus pengguna.');
            }

            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDetail = async (id) => {
        try {
            const response = await fetch(`https://api-karyasiswa.wokaproject.id/api/v1/admin/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal memuat detail pengguna.');
            }

            const data = await response.json();
            setSelectedUser(data);
            setIsModalOpen(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddUser = async () => {
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch('https://api-karyasiswa.wokaproject.id/api/v1/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal menambah pengguna.');
            }
    
            const data = await response.json();
            setUsers([...users, data]);
            setNewUser({ name: '', email: '', password: '', kelas: '', jurusan: '' });
        } catch (error) {
            setError(error.message);
        }
    };
    
    const handleUpdateUser = async () => {
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`https://api-karyasiswa.wokaproject.id/api/v1/admin/users/${updateUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updateUser),
            });

            if (!response.ok) {
                throw new Error('Gagal mengupdate pengguna.');
            }

            const data = await response.json();
            setUsers(users.map(user => (user.id === data.id ? data : user)));
            setUpdateUser({ id: '', name: '', email: '', kelas: '', jurusan: '' });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userName');
        navigate('/admin/login');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="container mx-auto p-6 font-sans">
            <h2 className="text-2xl font-bold text-center mb-6">Dashboard Admin</h2>
            {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}
            
            <button 
                className="bg-blue-500 text-white py-2 px-4 rounded mb-6 hover:bg-blue-600" 
                onClick={handleLogout}
            >
                Logout
            </button>

            <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-4">Tambah Siswa Baru</h4>
                <input
                    type="text"
                    className="block w-full p-2 mb-3 border border-gray-300 rounded"
                    placeholder="Nama"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    className="block w-full p-2 mb-3 border border-gray-300 rounded"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <select
                    className="block w-full p-2 mb-3 border border-gray-300 rounded"
                    value={newUser.kelas}
                    onChange={(e) => setNewUser({ ...newUser, kelas: e.target.value })}
                >
                    <option value="">Pilih Kelas</option>
                    <option value="X RPL A">X RPL A</option>
                    <option value="X RPL B">X RPL B</option>
                    <option value="XI RPL A">XI RPL A</option>
                    <option value="XI RPL B">XI RPL B</option>
                    <option value="XII RPL A">XII RPL A</option>
                    <option value="XII RPL B">XII RPL B</option>
                </select>
                <select
                    className="block w-full p-2 mb-3 border border-gray-300 rounded"
                    value={newUser.jurusan}
                    onChange={(e) => setNewUser({ ...newUser, jurusan: e.target.value })}
                >
                    <option value="">Pilih Jurusan</option>
                    <option value="RPL">RPL</option>
                </select>
                <input
                    type="password"
                    className="block w-full p-2 mb-3 border border-gray-300 rounded"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <button 
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" 
                    onClick={handleAddUser}
                >
                    Tambah Siswa
                </button>
            </div>

            <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-4">Update Siswa</h4>
                <input
                    type="text"
                    className="block w-full p-2 mb-3 border border-gray-300 rounded"
                    placeholder="ID Siswa"
                    value={updateUser.id}
                    onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
                />
                <input
                    type="text"
                    className="block w-full p-2 mb-3 border border-gray-300 rounded"
                    placeholder="Nama"
                    value={updateUser.name}
                    onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
                />
                <input
                    type="email"
                    className="block w-full p-2 mb-3 border border-gray-300 rounded"
                    placeholder="Email"
                    value={updateUser.email}
                    onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                />
                <select
                    className="block w-full p-2 mb-3 border border-gray-300 rounded"
                    value={updateUser.kelas}
                    onChange={(e) => setUpdateUser({ ...updateUser, kelas: e.target.value })}
                >
                    <option value="">Pilih Kelas</option>
                    <option value="X RPL A">X RPL A</option>
                    <option value="X RPL B">X RPL B</option>
                    <option value="XI RPL A">XI RPL A</option>
                    <option value="XI RPL B">XI RPL B</option>
                    <option value="XII RPL A">XII RPL A</option>
                    <option value="XII RPL B">XII RPL B</option>
                </select>
                <select
                    className="block w-full p-2 mb-3 border border-gray-300 rounded"
                    value={updateUser.jurusan}
                    onChange={(e) => setUpdateUser({ ...updateUser, jurusan: e.target.value })}
                >
                    <option value="">Pilih Jurusan</option>
                    <option value="RPL">RPL</option>
                </select>
                <button 
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600" 
                    onClick={handleUpdateUser}
                >
                    Update Siswa
                </button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-4">Daftar Siswa</h4>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Nama</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Jurusan</th>
                            <th className="px-4 py-2 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b">
                                <td className="px-4 py-2">{user.id}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.jurusan}</td>
                                <td className="px-4 py-2">
                                    <button 
                                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mr-2"
                                        onClick={() => handleDetail(user.id)}
                                    >
                                        Detail
                                    </button>
                                    <button 
                                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h4 className="text-xl font-semibold mb-4">Detail Siswa</h4>
                        <p><strong>ID:</strong> {selectedUser.id}</p>
                        <p><strong>Nama:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Kelas:</strong> {selectedUser.kelas}</p>
                        <p><strong>Jurusan:</strong> {selectedUser.jurusan}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
