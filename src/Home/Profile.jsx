import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [projects, setProjects] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDataAndProjects = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login'); 
        return;
      }

      try {
        const userResponse = await fetch('https://api-karyasiswa.wokaproject.id/api/v1/user/details', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await userResponse.json();
        setUserDetails(userData.user);

        const projectsResponse = await fetch('https://api-karyasiswa.wokaproject.id/api/v1/user/projects', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!projectsResponse.ok) {
          throw new Error('Failed to fetch projects');
        }

        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error:', error.message);
        setError('Terjadi kesalahan saat memuat data');
      }
    };

    fetchUserDataAndProjects();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleAddProject = () => {
    navigate('/addproject');
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`https://api-karyasiswa.wokaproject.id/api/v1/del/karya/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Error:', error.message);
      setError('Terjadi kesalahan saat menghapus proyek');
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans"> 
      <h1 className="text-xxl font-bold mb-6">Profil Saya 📑</h1>

      {userDetails && (
        <div className="bg-white border w-full shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Detail Pengguna</h2>
          <p><strong>ID:</strong> {userDetails.id}</p>
          <p><strong>Nama:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Jurusan:</strong> {userDetails.jurusan}</p>
        </div>
      )}

      <div className="mb-6 flex gap-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleAddProject}>
          Upload Project
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="bg-red-500 text-white p-4 rounded mb-6">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((item) => (
          <div className="w-full border bg-white shadow-md rounded-lg overflow-hidden" key={item.id}>
            <img
              src={`https://api-karyasiswa.wokaproject.id/storage/images/${item.foto}`}
              alt={item.judul}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h5 className="text-lg font-semibold mb-2">{item.judul}</h5>
              <p className="text-gray-600 mb-2">{item.deskripsi}</p>
              <p className="text-gray-500 text-sm mb-2">Nama Siswa: {item.nama_siswa}</p>
              <p className="text-gray-500 text-sm mb-2">Kelas: {item.kelas}</p>
              <p className="text-gray-500 text-sm mb-4">Jurusan: {item.jurusan}</p>
              <p className="text-black-500 text-sm mb-4">Tanggal: {item.tanggal}</p>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={() => handleDelete(item.id)}
              >
                Hapus Proyek
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
