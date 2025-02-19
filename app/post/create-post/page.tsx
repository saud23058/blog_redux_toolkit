
import CreatePostForm from '@/components/CreatePostForm'
import React from 'react'

const CreatePost = async() => {
  return (
    <section className='flex flex-col justify-center items-center '>
    <div className="w-full bg-pink-600 min-h-[230px] pattern flex justify-center items-center flex-col py-10  px-6">
      <h1 className="w-max bg-black text-3xl rounded-md px-3 py-8 text-white font-extrabold">
          Submit your post
        </h1>
      </div>
      <CreatePostForm />
    
      </section>
  )
}

export default CreatePost
