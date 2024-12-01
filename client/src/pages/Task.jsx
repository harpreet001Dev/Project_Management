import React from 'react'
import Table from '../components/Table';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const Task = () => {
  const headers = [
    { label: 'Project Name', key: 'name' },
    { label: 'Assigned to', key: 'assigned' },
    { label: 'Team Leader', key: 'teamleader' },
    { label: 'Priority', key: 'priority' },
    { label: 'Status', key: 'status' },
    { label: 'Action', key: 'action' },
  ];

  // Define data
  const data = [
    {
      id: 1,
      name: "Project A",
      assigned: [
        "https://einfosoft.com/templates/admin/kuber/source/dark/assets/images/user/admin.jpg",
        "https://workload.dexignlab.com/xhtml/images/user.jpg",
      ],
      teamleader: "Rahul Sharma",
      priority: "High",
      status: "In Progress",
      action: [<FaEdit key="edit1" />, <MdDelete key="delete1" />],
    },
    {
      id: 2,
      name: "Project B",
      assigned: [
        "https://einfosoft.com/templates/admin/kuber/source/dark/assets/images/user/admin.jpg",
      ],
      teamleader: "Joe Bartan",
      priority: "Medium",
      status: "Completed",
      action: [<FaEdit key="edit2" />, <MdDelete key="delete2" />],
    },
    {
      id: 3,
      name: "Project C",
      assigned: [
        "https://einfosoft.com/templates/admin/kuber/source/dark/assets/images/user/admin.jpg",
      ],
      teamleader: "Frankin",
      priority: "Low",
      status: "Pending",
      action: [<FaEdit key="edit3" />, <MdDelete key="delete3" />],
    },
  ];
  
  // Define renderCell for custom cell content
  const renderCell = (row, key) => {
    if (key === "priority") {
      const priorityClasses = {
        High: "bg-red-500 text-white",
        Medium: "bg-yellow-500 text-white",
        Low: "bg-green-500 text-white",
      };
      return (
        <span className={`px-2 py-1 rounded ${priorityClasses[row[key]]}`}>
          {row[key]}
        </span>
      );
    }
  
    if (key === "assigned") {
      return (
        <div className="flex space-x-2">
          {row[key]?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Assigned Member"
              className="w-8 h-8 rounded-full border"
            />
          ))}
        </div>
      );
    }
  
    if (key === "action") {
      return (
        <div className="flex space-x-2">
          {row[key].map((icon, index) => (
            <span key={index}>{icon}</span>
          ))}
        </div>
      );
    }
  
    return row[key];
  };
  

  return (
    <div className="container  p-4 bg-[#202020] my-5 mx-5">
      <h1 className="text-2xl font-bold mb-4 text-white">Projects</h1>
      <Table headers={headers} data={data} renderCell={renderCell} rowKey="id" />
    </div>
  );
}

export default Task