import React, { useEffect, useState } from 'react'
import Table from '../components/Table';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import TextBox from '../components/TextBox';
import Popup from '../components/Popup';
import { useForm, Controller } from 'react-hook-form';
import Multiselect from 'multiselect-react-dropdown';

import { Button } from '../components/Button';
import axios from 'axios';

import {io} from 'socket.io-client';
import { useSelector } from 'react-redux';




const Task = () => {

  const uri = import.meta.env.VITE_API_URL;
  const [members,Setmembers] = useState([]);
  const [socket,setsocket] =useState(null);
  const user = useSelector((state) => state.auth.user);

 

  const [notifications, setNotifications] = useState([]);

  useEffect(()=>{

    
    const newSocket = io(uri);
    setsocket(newSocket);


    newSocket.connect('connect',()=>{
      console.log('connected to socket server');
    });



    newSocket.on('task-created', (data) => {
      console.log('Notification received:', data.message);
      
      // Store the notification in the state (you can customize how you want to display it)
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.message,
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  },[uri,members])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${uri}/api/users/getusers`);
        Setmembers(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [uri]);



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

  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const AddProject = async (data) => {
    // console.log(data,"dtaa");
    if (data.members) {
      // Emit 'join-room' for each selected member
      data.members.forEach((member) => {
        console.log(member);
        
        if (socket) {
          socket.emit('join-room', member._id); // Pass the member ID to join the room
        }
      });
    }
    
      try {
        const response = await axios.post(`${uri}/api/users/addproject`,data);
        console.log(response,"response");
        if(response.status ===201){
          setIsPopupOpen(false);
          alert("Project is created sucessfully!");
          if (socket) {
            socket.emit('task-created', {
              project: data.project,
              members: data.members, // Pass assigned members
            });
          }
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          // Access the error message from the backend
          alert(`Error: ${error.response.data.message}`); // Display the error message in the UI
        } else {
          alert("An unknown error occurred.");
        }
      }
  }


  return (
    <>

<div>
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className='mt-5 flex justify-end mr-5'>
          <button onClick={() => setIsPopupOpen(true)} className='text-white bg-blue-600 py-2 px-4 rounded-md'>Add New Project</button>
        </div>


        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
          <h2 className='text-lg font-bold'>Add New Project</h2>
          <div>
            <form onSubmit={handleSubmit(AddProject)}>
              <TextBox
                placeholder="Project name"
                name="project" id="project"
                type="text"
                register={register("project", { required: "project name is required!" })}
                error={errors.project ? errors.project.message : ""}
              />
            
               <div>

               <Controller
  name="owner"
  control={control}
  defaultValue=""
  rules={{ required: "This field is required" }}
  render={({ field }) => (
    <select {...field} id="owner" className="border p-2 rounded w-full my-2">
      <option value="">Select Project owner</option>
      {members.map((member, index) => (
        <option key={index} value={member.id}> {/* Use member.id as value */}
          {member.name} {/* Display member name */}
        </option>
      ))}
    </select>
  )}
/>
{errors.owner && <p className="text-red-500">{errors.owner.message}</p>} 


</div>
              <div className='flex gap-2 w-full justify-between'>

                <TextBox
                  placeholder="Start date"
                  name="startdate"
                  id="startdate"
                  type="date"
                  register={register("startdate", { required: "Start date is required!" })}
                  error={errors.start ? errors.start.message : ""}
                />
                <TextBox
                  placeholder="Due date"
                  name="enddate"
                  id="enddate"
                  type="date"
                  register={register("enddate", { required: "Due date is required!" })}
                  error={errors.duedate ? errors.duedate.message : ""}
                />
              </div>

              <div>

                <Controller

                  name="priority"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <select {...field} id="priority" className="border p-2 rounded w-full my-2">
                      <option value="">Select an Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  )}
                />
                {errors.option && <p className="text-red-500">{errors.option.message}</p>}
              </div>
              <Controller
                name="members"
                control={control}
                defaultValue={[]}
                rules={{ required: "Please select at least one member" }}
                render={({ field }) => (
                  <Multiselect
                    className="my-2"
                    options={members}
                    displayValue="name"
                    placeholder="Add members"
                    selectedValues={field.value}
                    onSelect={(selectedList) => field.onChange(selectedList)}
                    onRemove={(selectedList) => field.onChange(selectedList)}
                    style={{
                      multiselectContainer: { border: "1px solid #ccc", borderRadius: "5px" },
                      searchBox: { padding: "10px" },
                      chips: { background: "#007bff", color: "white" },
                    }}
                  />
                )}
              />
              {errors.members && <p className="text-red-500">{errors.members.message}</p>}


              <TextBox
                placeholder="Description"
                name="description"
                id="description"
                type="textarea"
                rows="4"
                cols="3"
                register={register("description", { required: "Description is required!" })}
                error={errors.description ? errors.description.message : ""}
              />

              <Button label="Add Project" type="submit" />
            </form>
          </div>



        </Popup>
      </div>

      <div className="container  p-4 bg-[#202020] my-5 mx-5">
        <h1 className="text-2xl font-bold mb-4 text-white">Projects</h1>
        <Table headers={headers} data={data} renderCell={renderCell} rowKey="id" />
      </div>
    </>
  );
}

export default Task