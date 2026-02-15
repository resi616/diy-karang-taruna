import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const TutorialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const getYouTubeID = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleMarkComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://diy-karang-taruna.vercel.app/api/tutorials/complete/${id}`,
        {},
        { headers: { 'x-auth-token': token } },
      );

      setIsCompleted(true);

      alert('Keren! Tutorial berhasil diselesaikan.');
    } catch (err) {
      console.error('Gagal update progres', err);
      alert('Gagal mengupdate progres.');
    }
  };

  useEffect(() => {
    const fetchDetailAndUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { headers: { 'x-auth-token': token } };

        const resTut = await axios.get(
          `https://diy-karang-taruna.vercel.app/api/tutorials/${id}`,
          headers,
        );
        setTutorial(resTut.data);

        const resUser = await axios.get(
          'https://diy-karang-taruna.vercel.app/api/users/profile',
          headers,
        );

        const alreadyDone = resUser.data.completed_tutorials.some(
          (doneId) => String(doneId) === String(id),
        );

        setIsCompleted(alreadyDone);
      } catch (err) {
        console.error('Gagal sinkronisasi status', err);
      }
    };
    fetchDetailAndUser();
  }, [id]);
  if (!tutorial)
    return (
      <div className='flex justify-center items-center h-screen ml-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5E3C]'></div>
      </div>
    );

  return (
    <div className='flex bg-white min-h-screen'>
      <Sidebar />

      <main className='flex-1 ml-64 overflow-y-auto'>
        {/* Video Player Section - Menggunakan Format Embed YouTube */}
        <div className='w-full h-[550px] bg-black shadow-2xl'>
          {getYouTubeID(tutorial.video_url) ? (
            <iframe
              className='w-full h-full'
              src={`https://www.youtube.com/embed/${getYouTubeID(tutorial.video_url)}?rel=0&modestbranding=1`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          ) : (
            <div className='flex flex-col items-center justify-center h-full text-gray-500'>
              <span className='text-5xl mb-4'>📺</span>
              <p>Video tidak dapat dimuat atau format link salah.</p>
            </div>
          )}
        </div>

        <div className='p-12 max-w-7xl mx-auto'>
          {/* Header Info */}
          <button
            onClick={() => navigate(-1)}
            className='text-gray-400 mb-8 flex items-center gap-2 hover:text-[#8B5E3C] transition-colors'
          >
            ← Back
          </button>

          <h1 className='text-5xl font-extrabold text-[#2D3748] mb-6'>
            {tutorial.title}
          </h1>

          <div className='flex items-center gap-6 text-gray-400 font-semibold mb-12 text-lg'>
            <div className='flex items-center gap-3'>
              <img
                src='/hours_Icon.png'
                className='w-5 h-5 opacity-60'
                alt='Duration'
              />
              <span>{tutorial.duration}</span>
            </div>
            <span className='w-2 h-2 bg-gray-300 rounded-full'></span>
            <span>{tutorial.level}</span>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-20'>
            {/* Left Column: Step-by-Step Guide */}
            <div className='lg:col-span-2 space-y-10'>
              <h3 className='text-3xl font-bold text-[#2D3748] border-b-4 border-[#8B5E3C] inline-block pb-2'>
                Step-by-Step Guide
              </h3>

              <div className='space-y-6'>
                {tutorial.steps?.map((step, index) => (
                  <div
                    key={index}
                    className='flex gap-8 bg-[#F7FAFC] p-10 rounded-[2.5rem] relative border border-gray-50 hover:border-gray-200 transition-colors shadow-sm'
                  >
                    <div className='w-12 h-12 bg-[#8B5E3C] rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg'>
                      {step.step_number}
                    </div>
                    <div>
                      <h4 className='font-bold text-2xl text-[#2D3748] mb-3'>
                        {step.title}
                      </h4>
                      <p className='text-gray-500 text-lg leading-relaxed'>
                        {step.description}
                      </p>
                    </div>
                    <div className='absolute right-10 top-10 w-8 h-8 border-2 border-gray-100 rounded-full flex items-center justify-center text-gray-200'>
                      ✓
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Materials & Action */}
            <aside className='space-y-10'>
              <div className='bg-[#F7FAFC] p-10 rounded-[2.5rem] border border-gray-50 shadow-sm'>
                <h3 className='text-2xl font-bold text-[#2D3748] mb-8 flex items-center gap-3'>
                  <span className='p-2 bg-[#8B5E3C]/10 rounded-xl'>🛠️</span>{' '}
                  Materials Needed
                </h3>
                <ul className='space-y-6'>
                  {tutorial.materials?.map((item, index) => (
                    <li
                      key={index}
                      className='flex items-start gap-4 text-gray-700 text-lg'
                    >
                      <span className='text-[#8B5E3C] text-2xl'>•</span>
                      <span>
                        <strong className='text-[#2D3748]'>{item.name}</strong>
                        <span className='text-gray-400 font-medium ml-2'>
                          ({item.quantity})
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mark as Complete / Done Button Logic */}
              {isCompleted ? (
                /* Tombol Kotak bertuliskan "Done" ketika sudah selesai */
                <div className='w-full bg-green-50 text-green-600 py-6 rounded-2xl font-bold border-2 border-green-100 flex items-center justify-center gap-3'>
                  <span className='text-2xl'>🎉</span>
                  <span className='text-xl'>Done</span>
                </div>
              ) : (
                <button
                  onClick={handleMarkComplete}
                  className='w-full bg-[#8B5E3C] text-white py-6 rounded-2xl text-xl font-bold shadow-xl hover:bg-[#6F4A2F] active:scale-95 transition-all flex items-center justify-center gap-3'
                >
                  <span>✓</span> Mark as Complete
                </button>
              )}
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorialDetail;
