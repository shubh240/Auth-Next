"use client"

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";

export default function ProfilePage() {

    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [data, setData] = useState(null);

    const logout = async () => {
        console.log("Logout Succesfully!!!");
        try {

            const response = await axios.get("/api/users/logout");

            console.log("Logout Success", response.data);


            toast.dismiss();
            toast.success(response.data.message, {
                duration: 3000,
                position: 'top-center',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });

            router.push("/login");
        } catch (error: any) {
            console.log("Logout Failed:", error.response.data.error);
            toast.dismiss();
            toast.error(error.response.data.error, {
                duration: 3000,
                position: 'top-center',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
        } finally {
            setSubmitted(false);
        }

    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/getuserdetails')
        console.log("get user details Frontend", res);

        if (res.data.code === 0) {
            router.push("/login");
        } else {
            setData(res.data.data._id);
        }
    }


    return (
        <main className="w-full min-h-screen py-1 flex justify-center items-center">
            <div className="p-2 md:p-4">
                <form className="space-y-4 md:space-y-6">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <div className="flex flex-row items-center space-y-5 sm:flex-row sm:space-y-0">
                            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Your Profile</h2>
                            <h2 className="pl-6 bg-gray-300 text-2xl font-bold sm:text-xl">{data ? <Link href={`/profile/${data}`}>{data}</Link> : "Nothing"}</h2>

                            <button type="button" onClick={logout}
                                className="mx-14 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                disabled={submitted ? true : false}
                            >
                                Logout
                            </button>

                            <button type="button" onClick={getUserDetails}
                                className="text-white bg-orange-300 hover:bg-orange-200 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm min-w-44 sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                disabled={submitted ? true : false}
                            >
                                Get Your Data
                            </button>

                        </div>

                        <div className="grid max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                                <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                    alt="Bordered avatar" />

                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <button type="button"
                                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                        Change picture
                                    </button>
                                    <button type="button"
                                        className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                        Delete picture
                                    </button>
                                </div>
                            </div>

                            <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                                <div
                                    className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label htmlFor="first_name"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                            first name</label>
                                        <input type="text" id="first_name"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                            placeholder="Your first name" defaultValue="Jane" required />
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="last_name"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                            last name</label>
                                        <input type="text" id="last_name"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                            placeholder="Your last name" defaultValue="Ferguson" required />
                                    </div>

                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                        email</label>
                                    <input type="email" id="email"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                        placeholder="your.email@mail.com" required />
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="profession"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Profession</label>
                                    <input type="text" id="profession"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                        placeholder="your profession" required />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Bio</label>
                                    <textarea id="message" rows={4}
                                        className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                                        placeholder="Write your bio here..."></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button type="submit"
                                        className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </main >
    )
}