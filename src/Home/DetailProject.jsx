import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetailProject = () => {
    const { id } = useParams(); 
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`https://api-karyasiswa.wokaproject.id/api/index/karya/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
  
                console.log('Project data:', data);
               
                data.foto = `https://api-karyasiswa.wokaproject.id${data.foto}`;
                setProject(data);
            } catch (error) {
                setError('Terjadi kesalahan saat memuat data');
            }
        };

        fetchProject();
    }, [id]);

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!project) return <div class="text-center font-sans font-bold">Loading...</div>;

    return (
        <div className="container mt-5 font-sans"> 
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <button 
                        className="btn btn-primary mb-4"
                        onClick={() => navigate('/')} 
                    >
                        Kembali ke Beranda
                    </button>
                    <h1 className="mb-4 font-bold">{project.judul}</h1>
                    <img 
                        src={project.foto} 
                        alt={project.judul} 
                        className="img-fluid rounded mb-4"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <div className="card p-4 shadow-sm">
                        <p><strong>Nama Siswa:</strong> {project.nama_siswa}</p>
                        <p><strong>Jurusan:</strong> {project.jurusan}</p>
                        <p><strong>Kelas:</strong> {project.kelas}</p>
                        <p><strong>Deskripsi:</strong> {project.deskripsi}</p>
                        <p><strong>Tanggal:</strong> {project.tanggal}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProject;
