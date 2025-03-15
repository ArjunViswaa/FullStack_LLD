import React from 'react';
import Banner from './Banner';
import Movies from './Movies';

function Home() {
  return (
    <div className='items-center flex flex-col justify-center'>
      <Banner />
      <Movies />
    </div>
  )
}

export default Home;