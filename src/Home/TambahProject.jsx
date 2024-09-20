import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TambahProject = () => {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [kelas, setKelas] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [foto, setFoto] = useState(null);
  const [namaSiswa, setNamaSiswa] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    setTanggal(today);

    const userName = localStorage.getItem('userName');
    if (userName) {
      setNamaSiswa(userName);
    } else {
      setNamaSiswa('');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Anda harus login terlebih dahulu');
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('deskripsi', deskripsi);
    formData.append('kelas', kelas);
    formData.append('tanggal', tanggal);
    formData.append('foto', foto);
    formData.append('nama_siswa', namaSiswa);
    formData.append('jurusan', jurusan);

    try {
      const response = await fetch('https://api-karyasiswa.wokaproject.id/api/v1/create/karya', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal menambah proyek');
      }

      const data = await response.json();
      console.log('Proyek berhasil ditambahkan:', data);
      navigate('/profile');
    } catch (error) {
      console.error('Error:', error.message);
      setError('Terjadi kesalahan saat menambah proyek');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl font-sans">
      <h1 className="text-2xl font-bold mb-6 ">Upload Project 🪤</h1>

      {error && <div className="bg-red-500 text-white p-4 rounded mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nama_siswa" className="block text-sm font-medium text-gray-700">Nama Siswa</label>
          <input
            type="text"
            id="nama_siswa"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3 font-poppins"
            value={namaSiswa}
            onChange={(e) => setNamaSiswa(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="jurusan" className="block text-sm font-medium text-gray-700">Jurusan</label>
          <select
            id="jurusan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3 font-poppins"
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            required
          >
            <option value="">Pilih Jurusan</option>
            <option value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</option>
          </select>
        </div>

        <div>
          <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul Proyek</label>
          <input
            type="text"
            id="judul"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3 font-poppins"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea
            id="deskripsi"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3 font-poppins"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="kelas" className="block text-sm font-medium text-gray-700">Kelas</label>
          <select
            id="kelas"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3 font-poppins"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            required
          >
            <option value="">Pilih Kelas</option>
            <option value="X RPL A">X RPL A</option>
            <option value="X RPL B">X RPL B</option>
            <option value="XI RPL A">XI RPL A</option>
            <option value="XI RPL B">XI RPL B</option>
            <option value="XII RPL A">XII RPL A</option>
            <option value="XII RPL B">XII RPL B</option>
          </select>
        </div>

        <div>
          <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">Tanggal</label>
          <input
            type="date"
            id="tanggal"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3 font-poppins"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
            readOnly
          />
        </div>

        <div>
          <label htmlFor="foto" className="block text-sm font-medium text-gray-700">Foto Proyek</label>
          <input
            type="file"
            id="foto"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3 font-poppins"
            onChange={(e) => setFoto(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-poppins">
          Upload
        </button>
      </form>
    </div>
  );
};

export default TambahProject;
