import React from 'react';
import { RiMenu2Line } from "react-icons/ri";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className='w-full bg-[#202020] justify-between flex items-center p-5'>
            <div className='flex gap-4 items-center'>

                <RiMenu2Line style={{ color: "white" }} size={24} />
                <h1 className='text-white text-xl font-bold'>Dashboard</h1>
            </div>
            <div className='flex gap-6 items-center'>
                <FaBell style={{ color: "white" }} size={24} />
                <div className='flex gap-2'>
                    <img className='rounded-full' src='https://workload.dexignlab.com/xhtml/images/user.jpg' alt='profile' />
                    <div>

                        <p className='text-white'>Franklin Jr.</p>
                        <span className='text-white text-sm'>demo@gmail.com</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar