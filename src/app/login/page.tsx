"use client"

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

interface SigninForm {
    email: string;
    password: string;
}

export default function LoginPage() {

    const router = useRouter();

    const { register, formState: { errors, touchedFields, isSubmitted }, watch, setValue, handleSubmit } = useForm<SigninForm>({
        mode: "all",
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const [submitted, setSubmitted] = useState(false);


    console.log(errors, watch("email"), watch("password"), "Form Errors");

    const onSubmit: SubmitHandler<SigninForm> = async (data) => {
        console.log(data, "signin data");
        try {
            setSubmitted(true);

            
            const response = await axios.post("/api/users/login", data);
            
            console.log("Signin Success", response.data);
            
            
            toast.dismiss();
            toast.success(response.data.message, {
                duration: 3000,
                position: 'top-center',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });

            router.push("/profile");


        } catch (error: any) {
            toast.dismiss();
            toast.error(error.response.data.error, {
                duration: 3000,
                position: 'top-center',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
            console.log("Signin Failed:", error.response.data.error);

        } finally {
            setSubmitted(false);
        }
    };

    const getInputBorderColor = (fieldName: keyof SigninForm) => {
        // If the form is submitted or the field is touched, apply styles based on errors
        if (touchedFields[fieldName] || isSubmitted) {
            return errors[fieldName] ? 'border-red-500' : 'border-green-500';
        } else {
            return 'border-gray-300'; // Default gray color before interaction
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex items-center justify-center space-x-2">
                    <img
                        alt="Your Company"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        className="h-10 w-auto"
                    />
                    <span className="text-lg font-bold">Flowbite</span>
                </div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form method="POST" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font- 
                        medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="text"
                                autoComplete="email"
                                className={`block w-full rounded-md border py-1.5 ${getInputBorderColor('email')} text-gray-900 shadow-sm ring-1 
                                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                            focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                {
                                ...register("email", {
                                    required: "Email is required",
                                })
                                }
                                aria-invalid={errors.email ? "false" : "true"}
                            />
                            {errors?.email && (
                                <p role="alert" className="text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                className={`block w-full rounded-md border py-1.5 ${getInputBorderColor("password")} text-gray-900 shadow-sm 
                                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                            focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                {
                                ...register("password", {
                                    required: "Please enter your password",
                                })
                                }
                                aria-invalid={errors.password ? "false" : "true"}
                            />
                            {errors?.password && (
                                <p role="alert" className="text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`flex w-full justify-center rounded-md${!submitted ? ` bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600` : ` bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm`}`}
                            disabled={submitted ? true : false}
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not have any account?{' '}
                    <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    )
}