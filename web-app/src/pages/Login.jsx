import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://diy-karang-taruna.vercel.app/api/auth/login',
        formData,
      );
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Login failed. Check your credentials.',
      );
    }
  };

  return (
    <div className='flex h-screen w-full font-sans'>
      <div className='relative hidden w-1/2 lg:block bg-[#4A5565]'>
        <img
          src='/src/assets/Image_background.png'
          alt='Background'
          className='h-full w-full object-cover opacity-10'
        />

        <div className='absolute inset-0 flex flex-col justify-center items-center text-white p-12 text-center'>
          <img src='/src/assets/logo.png' alt='Logo' className='w-20 mb-6' />
          <h1 className='text-5xl font-bold mb-4'>DIY Carpentry</h1>
          <p className='text-xl mb-8'>
            Learn carpentry skills from the Karang Taruna community
          </p>

          <div className='flex gap-8 border-t border-gray-400 pt-8'>
            <div className='text-center'>
              <p className='text-2xl font-bold'>500+</p>
              <p className='text-xs text-gray-300'>Tutorials</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold'>1,200+</p>
              <p className='text-xs text-gray-300'>Members</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold'>50+</p>
              <p className='text-xs text-gray-300'>Instructors</p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50'>
        <div className='w-full max-w-md'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>
            Welcome Back
          </h2>
          <p className='text-gray-500 mb-8'>
            Sign in to continue your learning journey
          </p>

          {error && (
            <div className='bg-red-100 text-red-600 p-3 rounded mb-4 text-sm'>
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={onChange}
                placeholder='your@email.com'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={onChange}
                placeholder='••••••••'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none'
                required
              />
            </div>

            <button
              type='submit'
              className='w-full bg-[#8B5E3C] text-white p-3 rounded-lg font-bold hover:bg-[#6F4A30] transition shadow-lg'
            >
              Sign In
            </button>
          </form>

          <button
            onClick={() => navigate('/register')}
            className='w-full mt-4 border border-[#8B5E3C] text-[#8B5E3C] p-3 rounded-lg font-bold hover:bg-orange-50 transition'
          >
            Join as Member
          </button>

          <p className='text-center text-xs text-gray-400 mt-12'>
            Learn carpentry skills from the community
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
