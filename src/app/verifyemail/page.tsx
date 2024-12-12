"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifytoken", { token });

            if (response.data.success === true) {
                setVerified(true);
                toast.dismiss();
                toast.success(response.data.message, {
                    duration: 3000,
                    position: 'top-center',
                    ariaProps: {
                        role: 'status',
                        'aria-live': 'polite',
                    },
                });
            }
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
            console.log("verification Failed:", error);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        token.length > 0 && verifyUserEmail();
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? token : "No Token"}</h2>

            {
                verified && (
                    <div>
                        <h2 className="p-2 bg-green-500 text-white">Email verified successfully!</h2>
                        <Link href={"/login"}>
                            Login
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
