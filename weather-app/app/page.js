"use client"
import React, { useState } from 'react';
import background from '../public/wether-app-bg.webp'
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import Image from 'next/image';
import Weather from '@/components/Weather';

import Spinner from '@/components/Spinner';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);

      setWeather(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
      setError('Error fetching weather data. Please try again.');
    }
  };

  

  if (loading) {
    console.log(loading);
    return <div><Spinner/>
    
    </div> ;
  }else{
    return (
      <div>
        {/* Overlay */}
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/10 z-[1]' />
        <Image
            src='https://wallpaperboat.com/wp-content/uploads/2020/10/10/56443/anime-clouds-01.jpg'
            layout='fill'
            className='object-cover'
            alt='backgroung url'
          />
        
        {/* Search */}
        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10'>
          <form
            onSubmit={fetchWeather}
            className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-white-300 text-white rounded-2xl'
          >
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                className='bg-transparent border-none text-white focus:outline-none text-2xl'
                type='text'
                placeholder='Search city'
              />
            </div>
            <button type='submit'>
              <BsSearch size={20} />
            </button>
          </form>
          
        </div>
        
        
        {/* Weather */}
        {weather.main ? (
          <Weather data={weather} />
        ) : (
          <div>
        {!weather.main && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-size:30px'>SEARCH YOUR CITY...</div> }
        </div>
        )}
      </div>
    );
  }

  
}
