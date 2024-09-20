import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Beranda = () => {
    const [karya, setKarya] = useState([]);
    const [error, setError] = useState(null);
    const [authToken, setAuthToken] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);

        const fetchKarya = async () => {
            try {
                const response = await fetch('https://api-karyasiswa.wokaproject.id/api/v1/index/karya', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': token ? `Bearer ${token}` : '',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched data:', data);
                setKarya(data);
            } catch (error) {
                console.error('Error:', error);
                setError('Terjadi kesalahan saat memuat data');
            }
        };

        fetchKarya();
    }, [authToken]);

  
    const truncateText = (text, length = 100) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };

   
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = karya.slice(indexOfFirstItem, indexOfLastItem);


    const totalPages = Math.ceil(karya.length / itemsPerPage);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

   
    const renderPagination = () => {
        const pageNumbers = [];
        const maxPagesToShow = 6;

 
        if (totalPages > maxPagesToShow) {
            const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
            const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

       
            if (endPage < totalPages) {
                pageNumbers.push('next');
            }
        } else {
     
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers.map((page, index) =>
            page === 'next' ? (
                <li
                    key={index}
                    className="px-4 py-2 bg-gray-200 cursor-pointer rounded-md"
                    onClick={nextPage}
                >
                    &gt;
                </li>
            ) : (
                <li
                    key={page}
                    className={`px-4 py-2 ${
                        currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'
                    } cursor-pointer rounded-md`}
                    onClick={() => paginate(page)}
                >
                    {page}
                </li>
            )
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/admin/login">
                        <img 
                            src="logo_smk.png" 
                            alt="Logo SMK NEGERI 3 METRO" 
                            className="w-16 h-16 object-contain"
                        />
                    </Link>
                    <div className="flex space-x-4">
                        <Link 
                            to="/login" 
                            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition no-underline"
                        >
                            Sign In
                        </Link>
                        <Link 
                            to="/register" 
                            className="bg-gray-600 text-white py-2 px-4 rounded-md shadow hover:bg-gray-700 transition no-underline"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </header>
            
            <div className="container mx-auto px-4 py-6">
                <div className="relative">
                    <img
                        src="bannerweb.png"
                        alt="Banner"
                        className="object-cover w-full h-full rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-6 flex-grow">
                {error && (
                    <div className="bg-red-100 text-red-800 border border-red-300 rounded-md p-4 mb-4">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentItems.map((item) => (
                        <div className="bg-white shadow-lg rounded-md overflow-hidden" key={item.id}>
                            <img 
                                src={`https://api-karyasiswa.wokaproject.id${item.foto}`} 
                                alt={item.judul} 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.judul}</h3>
                                <p className="text-gray-700 mb-2">{truncateText(item.deskripsi, 100)}</p>
                                <p className="text-gray-600"><strong>Nama Siswa:</strong> {item.nama_siswa}</p>
                                <p className="text-gray-600"><strong>Jurusan:</strong> {item.jurusan}</p>
                                <p className="text-gray-600"><strong>Kelas:</strong> {item.kelas}</p>
                                <p className="text-gray-500 text-sm mt-2"><small>Tanggal: {item.tanggal}</small></p>
                                <Link 
                                    to={`/detail/${item.id}`} 
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition mt-4 block text-center no-underline"
                                >
                                    Selengkapnya
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    <ul className="flex space-x-2">
                        {renderPagination()}
                    </ul>
                </div>
            </main>

            <footer className="bg-gray-200 text-black text-center py-4 mt-6">
                <p className="mb-0 text-sm font-bold">&copy; 2024 Mutia Pegi Intanswari. All rights reserved. </p>
            </footer>
        </div>
    );
};

export default Beranda;
