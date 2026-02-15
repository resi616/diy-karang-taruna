import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://diy-karang-taruna.vercel.app/api/users/profile',
          {
            headers: { 'x-auth-token': token },
          },
        );
        setUser(res.data);
      } catch (err) {
        console.error('Gagal memuat profil', err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const formatDate = (dateString) => {
    const options = { month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (!user)
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );

  return (
    <div className='flex bg-[#F7FAFC] min-h-screen'>
      <Sidebar />

      <main className='flex-1 ml-64'>
        {/* Header Profile Section  */}
        <div className='bg-[#2D3748] p-12 text-white flex items-center gap-8'>
          {/* Initial Avatar */}
          <div className='w-24 h-24 bg-[#8B5E3C] rounded-full flex items-center justify-center text-4xl font-bold shadow-xl border-4 border-[#3A4658]'>
            {getInitial(user.name)}
          </div>

          <div>
            <h2 className='text-4xl font-bold'>{user.name}</h2>
            <p className='text-gray-400'>
              Member since {formatDate(user.createdAt)}
            </p>
          </div>
        </div>

        <div className='p-10 space-y-10'>
          {/* Settings & Notifications (Static) */}
          <div className='flex gap-6'>
            <div className='bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 w-64 border border-gray-100 cursor-pointer hover:bg-gray-50'>
              <div className='w-12 h-12 rounded-full flex items-center justify-center bg-[#8B5E3C]/10'>
                <img
                  src='/setting_Icon.png'
                  className='w-6 h-6 object-contain'
                  alt='Settings'
                />
              </div>
              <span className='font-bold text-gray-700'>Settings</span>
            </div>
            <div className='bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 w-64 border border-gray-100 cursor-pointer hover:bg-gray-50'>
              <div className='w-12 h-12 rounded-full flex items-center justify-center bg-[#8B5E3C]/10'>
                <img
                  src='/notifIcon.png'
                  className='w-6 h-6 object-contain'
                  alt='Settings'
                />
              </div>
              <span className='font-bold text-gray-700'>Notifications</span>
            </div>
          </div>

          {/* My Progress  */}
          <section>
            <h3 className='text-xl font-bold text-gray-800 mb-6'>
              My Progress
            </h3>
            <div className='grid grid-cols-3 gap-6'>
              <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6'>
                <div className='w-16 h-16 rounded-2xl flex items-center justify-center bg-[#8B5E3C]/10'>
                  <img
                    src='/tutorialscompleted_icon.png'
                    className='w-8 h-8 object-contain'
                    alt='Completed'
                  />
                </div>
                <div>
                  <p className='text-3xl font-bold text-gray-800'>
                    {user.completed_tutorials?.length || 0}
                  </p>
                  <p className='text-sm text-gray-400 font-medium'>
                    Tutorials Completed
                  </p>
                </div>
              </div>
              {/* Static Data */}
              <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6'>
                <div className='w-16 h-16 rounded-2xl flex items-center justify-center bg-[#8B5E3C]/10'>
                  <img
                    src='/hours_Icon.png'
                    className='w-8 h-8 object-contain'
                    alt='Hours'
                  />
                </div>
                <div>
                  <p className='text-3xl font-bold text-gray-800'>8.5</p>
                  <p className='text-sm text-gray-400 font-medium'>
                    Hours Learned
                  </p>
                </div>
              </div>
              <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6'>
                <div className='w-16 h-16 rounded-2xl flex items-center justify-center bg-[#8B5E3C]/10'>
                  <img
                    src='/certificates_icon.png'
                    className='w-8 h-8 object-contain'
                    alt='Certificates'
                  />
                </div>
                <div>
                  <p className='text-3xl font-bold text-gray-800'>3</p>
                  <p className='text-sm text-gray-400 font-medium'>
                    Certificates Earned
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Achievements  */}
          <section>
            <h3 className='text-xl font-bold text-gray-800 mb-6'>
              Achievements
            </h3>
            <div className='grid grid-cols-2 gap-6'>
              <div className='bg-white p-6 rounded-2xl flex items-center gap-5 border border-gray-100'>
                <div className='w-12 h-12 bg-[#8B5E3C] rounded-full flex items-center justify-center text-white'>
                  🏆
                </div>
                <div>
                  <p className='font-bold text-gray-800'>First Steps</p>
                  <p className='text-xs text-gray-400'>
                    Completed your first tutorial
                  </p>
                </div>
              </div>
              <div className='bg-white p-6 rounded-2xl flex items-center gap-5 border border-gray-100 opacity-50 grayscale'>
                <div className='w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white'>
                  🏆
                </div>
                <div>
                  <p className='font-bold text-gray-800'>Door Master</p>
                  <p className='text-xs text-gray-400'>
                    Complete all door repair tutorials
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className='w-full max-w-xs border-2 border-red-200 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-50 transition flex items-center justify-center gap-2'
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
