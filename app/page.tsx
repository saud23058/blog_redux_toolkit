
import Link from 'next/link'
import React from 'react'

const Home = async() => {

  
  return (
    <>
      <div className="w-full bg-pink-600 min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6;">
        <h1 className="w-max bg-black rounded-md text-3xl px-3 py-8 text-white font-extrabold">
          Create your post, Connect with other Developers
        </h1>
        <p className="mt-3 text-white">
          Submit your ideas, Solutions and Get Noticed in Virtual Competition
        </p>
        <Link href='/post/search-posts'>
          <button className="w-[200px] py-5 mt-4 bg-black text-white items-center font-bold text-xl rounded-2xl">Search Posts</button>
          
        </Link>
       
      </div>
      <ul className="mt-7 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
       
      </ul>
      
    </>
  );
}

export default Home
