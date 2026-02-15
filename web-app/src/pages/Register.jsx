import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password, idNumber, phoneNumber } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://diy-karang-taruna.vercel.app/api/auth/register',
        {
          name,
          email,
          password,
        },
      );

      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Registration failed. Please try again.',
      );
    }
  };

  return (
    <div className='flex h-screen w-full font-sans bg-white'>
      <div className='relative hidden w-1/2 lg:block bg-[#4A5565]'>
        <img
          src='/Image_Background.png'
          alt='Background'
          className='h-full w-full object-cover opacity-10'
        />
        <div className='absolute inset-0 flex flex-col justify-center items-center text-white p-12 text-center'>
          <img src='/logo.png' alt='DIY Logo' className='w-24 mb-8' />
          <h1 className='text-5xl font-bold mb-4'>Join Our Community</h1>
          <p className='text-xl max-w-md'>
            Become a member of Karang Taruna and start your carpentry journey
            today
          </p>
        </div>
      </div>

      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-8 overflow-y-auto'>
        <div className='w-full max-w-md'>
          <button
            onClick={() => navigate('/')}
            className='flex items-center text-gray-500 hover:text-gray-700 mt-16 transition'
          >
            <span className='mr-2'>←</span> Back to Login
          </button>

          <h2 className='text-4xl font-bold text-gray-800 mb-2'>
            Create Account
          </h2>
          <p className='text-gray-500 mb-8'>
            Fill in your details to join Karang Taruna
          </p>

          {error && (
            <div className='bg-red-100 text-red-600 p-3 rounded mb-4 text-sm font-medium'>
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className='space-y-5'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1'>
                Full Name
              </label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                placeholder='Enter your full name'
                className='w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none transition'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={onChange}
                placeholder='your@email.com'
                className='w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none transition'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1'>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={onChange}
                placeholder='Create a password'
                className='w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none transition'
                required
              />
            </div>

            <button
              type='submit'
              className='w-full bg-[#8B5E3C] text-white p-4 rounded-xl font-bold hover:bg-[#6F4A30] transform active:scale-95 transition shadow-lg mt-4'
            >
              Create Account
            </button>
          </form>

          <p className='text-center text-xs text-gray-400 mt-8'>
            By joining, you agree to our community guidelines
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
