import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const CategoryTutorials = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { headers: { 'x-auth-token': token } };
        const res = await axios.get(
          `/api/tutorials/category/${categoryId}`,
          headers,
        );
        setTutorials(res.data);

        if (res.data.length > 0 && res.data[0].categoryId) {
          setCategoryName(res.data[0].categoryId.name || 'Tutorials');
        }
      } catch (err) {
        console.error('Gagal fetch kategori tutorial', err);
      }
    };
    fetchCategoryData();
  }, [categoryId]);

  return (
    <div className='flex bg-[#F7FAFC] min-h-screen'>
      <Sidebar />

      <main className='flex-1 ml-64'>
        {/* Header Area */}
        <div className='bg-[#2D3748] p-10 pb-16 text-white'>
          <button
            onClick={() => navigate('/home')}
            className='text-sm text-gray-400 hover:text-white flex items-center gap-2 mb-6 transition'
          >
            ← Back to Home
          </button>

          <h2 className='text-4xl font-bold mb-2'>
            {categoryName || 'Loading...'}
          </h2>
          <p className='text-gray-400'>
            {tutorials.length} tutorials available
          </p>
        </div>

        {/* Video Grid Section */}
        <section className='p-10 -mt-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {tutorials.map((tut) => (
              <div
                key={tut._id}
                onClick={() => navigate(`/detail/${tut._id}`)}
                className='bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-50'
              >
                <img
                  src={tut.thumbnail}
                  className='w-full h-56 object-cover'
                  alt={tut.title}
                />
                <div className='p-8'>
                  <h4 className='font-bold text-2xl text-[#2D3748] mb-4'>
                    {tut.title}
                  </h4>
                  <div className='flex items-center gap-4 text-gray-400 font-medium'>
                    <div className='flex items-center gap-2'>
                      <img
                        src='/src/assets/hours_Icon.png'
                        className='w-4 h-4 opacity-50'
                        alt='time'
                      />
                      <span>{tut.duration}</span>
                    </div>
                    <span className='w-1.5 h-1.5 bg-gray-300 rounded-full'></span>
                    <span>{tut.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {tutorials.length === 0 && (
            <div className='text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200'>
              <p className='text-gray-400 font-medium text-lg'>
                Belum ada tutorial untuk kategori ini.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CategoryTutorials;
