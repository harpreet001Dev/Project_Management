import React from 'react';
import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { Link } from 'react-router';


const linkData = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <MdDashboard />,
    },
    {
        label: "Tasks",
        link: "tasks",
        icon: <FaTasks />,
    },
    {
        label: "Completed",
        link: "completed/completed",
        icon: <MdTaskAlt />,
    },
    {
        label: "In Progress",
        link: "in-progress/in progress",
        icon: <MdOutlinePendingActions />,
    },
    {
        label: "To Do",
        link: "todo/todo",
        icon: <MdOutlinePendingActions />,
    },
    {
        label: "Team",
        link: "team",
        icon: <FaUsers />,
    },
    {
        label: "Trash",
        link: "trashed",
        icon: <FaTrashAlt />,
    },
];

const Navlink = ({el})=>{
    return(

<Link to={el.link} className='text-white flex items-center gap-3 px-4'>{el.icon}
<span>{el.label}</span>
</Link>
    )
}


const Sidebar = () => {
    return (
        <div>
            <div className='flex items-center justify-center py-3 gap-3'>
                <img className='rounded-full' height={60} width={60} src="https://tse3.mm.bing.net/th?id=OIP.fnFIpedyvGpxaVgcZrAw6AAAAA&pid=Api&P=0&h=220" alt="" />
                <div>
                    <h2 className='text-white font-bold text-lg'>Workaholic</h2>
                    <span className='text-white text-sm'>Project Management tool</span>
                </div>
            </div>
            <div className='flex flex-col gap-y-5 py-8'>
                {
                   linkData.map((item,index)=>{
                    return <Navlink el={item} key={index}/>
                   })
                }
            </div>
        </div>
    )
}

export default Sidebar