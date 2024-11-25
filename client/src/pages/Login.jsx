import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextBox from '../components/TextBox';
import { Button } from '../components/Button';
import { Select } from '@headlessui/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoginClciked, setIsLoginClicked] = useState(false);
    const [role, setRole] = useState("user");


    const handleRole = (e) => {
        setRole(e.target.value);
    }




    const FormSubmit = async (data) => {
        let completedata = { ...data };
        // For login, send only email and password
        if (isLoginClciked) {
            completedata = {
                email: data.email,
                password: data.password
            };
        } else {
            // For registration, include role as well
            completedata = {
                ...data,
                role
            };
        }


        try {
            let response;
            if (isLoginClciked) {
                response = await axios.post('http://localhost:8000/api/users/login', completedata, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },)
                if (response && response.data) {
                    dispatch(login(response.data));
                    alert("Logged in sucessfully!")
                }
            }
            else {
                response = await axios.post('http://localhost:8000/api/users/register', completedata, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },)
                if (response && response.data) {

                    setIsLoginClicked(true);
                }
            }
        } catch (error) {
            if (error.response && error.response.message) {
                alert(error.response.message);
            }

        }


    }
    return (
        <div className='w-full min-h-screen flex bg-black items-center justify-center'>
            <div className='w-[400px] bg-white shadow-md rounded-md p-5'>
                <h1 className='text-black text-center font-bold text-lg'>Welcome, User</h1>
                <form onSubmit={handleSubmit(FormSubmit)}>
                    <div>

                        {
                            !isLoginClciked && (

                                <TextBox
                                    placeholder="Enter name"
                                    type="text"
                                    name="name"
                                    register={register("name", { required: "Name is required!" })}
                                    error={errors.name ? errors.name.message : ""}
                                />
                            )
                        }
                        <TextBox
                            placeholder="Enter email"
                            name="email"
                            type="email"
                            register={register("email", { required: "Email is required" })}
                            error={errors.email ? errors.email.message : ""}
                        />
                        {
                            !isLoginClciked && (
                                <div className='w-full'>

                                    <Select className="w-full py-2 px-4 border-b focus:outline-none focus:border-blue-500" name="status" aria-label="Project status" onChange={handleRole}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>

                                    </Select>
                                </div>
                            )
                        }

                        <TextBox
                            placeholder="Enter password"
                            name="password"
                            type="password"
                            register={register("password", { required: "Password is required!" })}
                            error={errors.password ? errors.password.message : ""}
                        />

                        <Button type="submit" label="submit" />

                    </div>

                </form>
                <div className='flex justify-end'>
                    <button onClick={() => setIsLoginClicked(!isLoginClciked)}>

                        <span>{!isLoginClciked ? "Signup" : "Login"}</span>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Login;