import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://diy-karang-taruna.vercel.app/api/tutorials/categories',
          {
            headers: { 'x-auth-token': token },
          },
        );

        setCategories(res.data);
      } catch (err) {
        console.error('Gagal ambil data kategori', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className='flex bg-[#F7FAFC] min-h-screen'>
      <Sidebar />

      <main className='flex-1 ml-64'>
        {/* Header & Search Bar Area */}
        <div className='bg-[#2D3748] p-10 pb-16 text-white'>
          <header className='flex justify-between items-center mb-10'>
            <div>
              <h2 className='text-3xl font-bold'>Welcome Back!</h2>
              <p className='text-gray-400'>Continue your carpentry journey</p>
            </div>
          </header>

          {/* Search Bar */}
          <div className='relative max-w-4xl'>
            <span className='absolute left-5 top-4 text-gray-400 text-lg'>
              🔍
            </span>
            <input
              type='text'
              placeholder='Search tutorials...'
              className='w-full p-4 pl-14 rounded-2xl bg-[#3A4658] border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#8B5E3C] outline-none shadow-inner'
            />
          </div>
        </div>

        {/* Content Area */}
        <section className='p-10 -mt-8'>
          <div className='flex justify-between items-center mb-8'>
            <h3 className='text-2xl font-bold text-gray-800'>
              Browse Categories
            </h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => navigate(`/category/${cat._id}`)}
                className='bg-white p-5 rounded-[2rem] shadow-sm flex gap-6 border border-gray-100 cursor-pointer active:scale-95 transition-transform'
              >
                <img
                  src={cat.image || '/background.png'}
                  className='w-44 h-44 object-cover rounded-3xl'
                  alt={cat.name}
                />
                <div className='flex flex-col justify-center'>
                  <h4 className='text-2xl font-bold text-gray-800 mb-1'>
                    {cat.name}
                  </h4>
                  <p className='text-gray-500 mb-5'>
                    {cat.count} tutorials available
                  </p>

                  <button className='flex items-center gap-2 text-[#8B5E3C] font-extrabold'>
                    <img
                      src='/hammer_icon.png'
                      alt='Hammer'
                      className='w-6 h-6 object-contain'
                    />
                    <span>Start Learning</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
