'use client'

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';

interface SignupForm {
    username: string;
    email: string;
    password: string;
    cpassword: string;
    isChecked: boolean;
}

export default function SignupPage() {

    const router = useRouter();
    const { register, formState: { errors, touchedFields, isSubmitted }, watch, setValue, handleSubmit } = useForm<SignupForm>({
        mode: "all",
        defaultValues: {
            username: "",
            email: "",
            password: "",
            cpassword: "",
            isChecked: false,
        }
    });


    const [submitted, setSubmitted] = useState(false);

    console.log(submitted, "Submitted");


    console.log(errors, watch("isChecked"), watch("cpassword"), "Form Errors");


    const onSubmit: SubmitHandler<SignupForm> = async (data) => {
        console.log(data, "signupn data");
        try {
            setSubmitted(true);

            const response = await axios.post("/api/users/signup", data);

            console.log("Signup Success", response.data);
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
            toast.dismiss();
            toast.error(error.response.data.error, {
                duration: 3000,
                position: 'top-center',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
            console.log("Signup Failed:", error);

        } finally {
            setSubmitted(false);
        }
    };

    const getInputBorderColor = (fieldName: keyof SignupForm) => {
        // If the form is submitted or the field is touched, apply styles based on errors
        if (touchedFields[fieldName] || isSubmitted) {
            return errors[fieldName] ? 'border-red-500' : 'border-green-500';
        } else {
            return 'border-gray-300'; // Default gray color before interaction
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className={`bg-gray-50 border ${getInputBorderColor('username')}
                                                text-gray-900 text-sm rounded-lg focus:ring-primary-600
                                                focus:border-primary-600 block w-full p-2.5 dark:bg-blue-700 dark:border-gray-600
                                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    placeholder="john_doe1"
                                    {
                                    ...register("username", {
                                        required: "Username is required",
                                        pattern: {
                                            value: /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/,
                                            message: "Enter valid username"
                                        },
                                    })
                                    }
                                    aria-invalid={errors.username ? "false" : "true"}
                                />
                                {errors?.username && (
                                    <p role="alert" className="text-sm text-red-500">{errors.username.message}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="text"
                                    id="email"
                                    className={`bg-gray-50 border ${getInputBorderColor('email')}
                                                text-gray-900 text-sm rounded-lg focus:ring-primary-600
                                                focus:border-primary-600 block w-full p-2.5 dark:bg-blue-700 dark:border-gray-600
                                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    placeholder="name@company.com"
                                    {
                                    ...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^(([^ <>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Enter valid email address"
                                        },
                                    })
                                    }
                                    aria-invalid={errors.email ? "false" : "true"}
                                />
                                {errors?.email && (
                                    <p role="alert" className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className={`bg-gray-50 border border-gray-300 ${getInputBorderColor('password')} 
                                            text-gray-900 text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    {
                                    ...register("password", {
                                        required: "Please enter your password",
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                                            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                        }
                                    })
                                    }
                                    aria-invalid={errors.password ? "false" : "true"}
                                />
                                {errors?.password && (
                                    <p role="alert" className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    id="cpassword"
                                    placeholder="••••••••"
                                    className={`bg-gray-50 border border-gray-300 ${getInputBorderColor('cpassword')} 
                                                text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                                                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    {
                                    ...register("cpassword", {
                                        required: "Please confirm your password",
                                        validate: (val) => val === watch("password") || "Passwords do not match",
                                    })
                                    }
                                    aria-invalid={errors.cpassword ? "true" : "false"}
                                />
                                {errors.cpassword && (
                                    <p role="alert" className="text-sm text-red-500">{errors.cpassword.message}</p>
                                )}
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="isChecked"
                                        aria-describedby="isChecked"
                                        type="checkbox"
                                        className={`w-4 h-4 border ${errors.isChecked ? 'border-red-500' : 'border-gray-300'} rounded bg-gray-50 
                                                    focus:ring-0`}
                                        {...register("isChecked", {
                                            required: "You must accept the Terms and Conditions",
                                        })}

                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the{' '}
                                        <a className="font-semibold text-indigo-600 dark:text-indigo-500" href="/terms-condition">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            {errors.isChecked && <p className="text-sm text-red-500">{errors.isChecked.message}</p>}

                            <button
                                type="submit"
                                className={`flex w-full justify-center rounded-md ${!submitted ? `bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
                                    text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                                    focus-visible:outline-offset-2 focus-visible:outline-indigo-600`: ` bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 
                                    text-white shadow-sm focus-visible:outline focus-visible:outline-2 
                                    focus-visible:outline-offset-2`} `}
                                disabled={submitted ? true : false}
                            >
                                {submitted ? "Processing....." : "Create an account"}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account ?{' '}
                                <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-500">
                                    Login here
                                </Link>
                            </p>
                        </form >
                    </div>
                </div>
            </div>
        </section>
    )
}