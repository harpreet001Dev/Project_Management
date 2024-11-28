import React from 'react'
import { IoIosClipboard } from "react-icons/io";
import Chart from '../components/Chart';
import clsx from 'clsx';

const UserDashboard = () => {
  const importantProjects = [
    { name: 'Project Phoenix', priority: 'High' },
    { name: 'Greenfield Initiative', priority: 'Medium' },
    { name: 'Digital Transformation', priority: 'High' },
    { name: 'Apollo Upgrade', priority: 'Low' },
    { name: 'Cloud Migration Strategy', priority: 'Medium' },
    { name: 'Blue Horizon Expansion', priority: 'Low' },
    { name: 'Beacon AI Implementation', priority: 'High' },
    { name: 'Quantum Leap Development', priority: 'Medium' },
    { name: 'Solaris Integration', priority: 'High' },
    { name: 'Vanguard Security Enhancement', priority: 'Low' },
  ]
  const priorityClasses = {
    High: 'bg-red-500 text-white',
    Medium: 'bg-orange-400 text-white',
    Low: 'bg-green-500 text-white'
  };

  return (
    <>
      <div className='w-full flex justify-between px-5 py-5'>
        <div className='bg-[#186dde] py-8 px-14 flex items-center justify-center gap-2'>
          <IoIosClipboard color='white' size={28} />
          <div>
            <p className='text-white'>Total Projects</p>
            <span className='text-red-600'>450</span>
          </div>
        </div>
        <div className='bg-[#0acc95] py-8 px-14 flex items-center justify-center gap-2'>
          <IoIosClipboard color='white' size={28} />
          <div>
            <p className='text-white'>Ongoing Projects</p>
            <span className='text-red-600'>450</span>
          </div>
        </div>
        <div className='bg-[#7460ee] py-8 px-14 flex items-center justify-center gap-2'>
          <IoIosClipboard color='white' size={28} />
          <div>
            <p className='text-white'>Completed</p>
            <span className='text-red-600'>450</span>
          </div>
        </div>
        <div className='bg-[#ef5350] py-8 px-14 flex items-center justify-center gap-2'>
          <IoIosClipboard color='white' size={28} />
          <div>
            <p className='text-white'>Total Projects</p>
            <span className='text-red-600'>450</span>
          </div>
        </div>
      </div>
      <div className='px-5 mt-4 w-full flex gap-5'>
        <div className='w-2/3 bg-[#202020]'>
          <Chart />
        </div>
        <div className='w-1/3 bg-[#202020] p-5 h-[398px] overflow-auto'>
          <h3 className='text-white'>Important Projects</h3>
          <div>
            <table className='w-full text-white  text-left border-gray-600 mt-3'>
              <thead>
                <tr className=''>
                  <th className='px-4 py-2'>Name</th>
                  <th className='px-4 py-2'>Priority</th>
                </tr>
              </thead>
              <tbody>
                {importantProjects.map((project, index) => (
                  <tr key={index} className='border-b border-gray-600 space-y-2'>
                    <td className='px-4 py-2'>{project.name}</td>
                    <td>
                      <p className={clsx(
                        'py-0.5  text-center rounded-full text-sm',
                        priorityClasses[project.priority]
                      )}>{project.priority}</p>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo officia sit non nihil veniam soluta modi sapiente tempore? Tempore perferendis quaerat inventore nemo eaque explicabo sed amet. Illo, dolores quae.</p>
      </div>
    </>

  )
}

export default UserDashboard;