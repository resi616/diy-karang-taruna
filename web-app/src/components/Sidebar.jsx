import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/home', icon: '/src/assets/home_Icon.png' },

    { name: 'Profile', path: '/profile', icon: '/src/assets/profile_Icon.png' },
  ];

  return (
    <div className='w-64 bg-[#2D3748] h-screen flex flex-col p-6 text-white fixed border-r border-gray-700'>
      {/* Logo Section */}
      <div className='flex items-center gap-3 mb-10'>
        <img
          src='/src/assets/logo.png'
          alt='Logo'
          className='w-10 h-10 object-contain'
        />
        <div>
          <h1 className='font-bold text-lg leading-tight'>DIY Carpentry</h1>
          <p className='text-xs text-gray-400'>Karang Taruna</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-2'>
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? 'bg-[#8B5E3C] text-white shadow-lg'
                : 'hover:bg-gray-700 text-gray-400'
            }`}
          >
            <img
              src={item.icon}
              alt={item.name}
              className='w-5 h-5 object-contain'
            />
            <span className='font-medium'>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Help Card */}
      <div className='bg-gray-700/50 p-4 rounded-2xl text-xs text-gray-400 mt-auto border border-gray-600'>
        <p className='font-bold text-white mb-1'>Need help?</p>
        <p>Contact our community support for carpentry guides.</p>
      </div>
    </div>
  );
};

export default Sidebar;
