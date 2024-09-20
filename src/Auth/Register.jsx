import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [kelas, setKelas] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const jurusanOptions = [
    { value: '', label: 'Pilih Jurusan' },
    { value: 'RPL', label: 'Rekayasa Perangkat Lunak' },
  ];

  const kelasOptions = [
    { value: '', label: 'Pilih Kelas' },
    { value: 'X RPL A', label: 'X RPL A' },
    { value: 'X RPL B', label: 'X RPL B' },
    { value: 'XI RPL A', label: 'XI RPL A' },
    { value: 'XI RPL B', label: 'XI RPL B' },
    { value: 'XII RPL A', label: 'XII RPL A' },
    { value: 'XII RPL B', label: 'XII RPL B' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log({ name, email, password, jurusan, kelas }); // Log data yang akan dikirim
  
    try {
      const response = await fetch('https://api-karyasiswa.wokaproject.id/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, password, jurusan, kelas }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userName', name);
        setSuccess('Registration successful!');
        setError('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="jurusan">
              Jurusan
            </label>
            <select
              id="jurusan"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              required
            >
              {jurusanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="kelas">
              Kelas
            </label>
            <select
              id="kelas"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              required
            >
              {kelasOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
          <p className="mt-4 text-center text-gray-600">
            Sudah punya akun? <Link to="/login" className="text-blue-500 hover:underline">Silakan Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
