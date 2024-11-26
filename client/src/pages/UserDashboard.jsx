import React from 'react'
import { IoIosClipboard } from "react-icons/io";

const UserDashboard = () => {
  return (
    <div className='w-full flex justify-between px-5 py-5'>
    <div className='bg-[#202020] py-8 px-14 flex items-center justify-center gap-2'>
      <IoIosClipboard color='white' size={28} />
      <div>
        <p className='text-white'>Total Projects</p>
        <span className='text-red-600'>450</span>
      </div>
    </div>
    <div className='bg-[#202020] py-8 px-14 flex items-center justify-center gap-2'>
      <IoIosClipboard color='white' size={28} />
      <div>
        <p className='text-white'>Ongoing Projects</p>
        <span className='text-red-600'>450</span>
      </div>
    </div>
    <div className='bg-[#202020] py-8 px-14 flex items-center justify-center gap-2'>
      <IoIosClipboard color='white' size={28} />
      <div>
        <p className='text-white'>Completed</p>
        <span className='text-red-600'>450</span>
      </div>
    </div>
    <div className='bg-[#202020] py-8 px-14 flex items-center justify-center gap-2'>
      <IoIosClipboard color='white' size={28} />
      <div>
        <p className='text-white'>Total Projects</p>
        <span className='text-red-600'>450</span>
      </div>
    </div>
  </div>
  
  )
}

export default UserDashboard;