"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReferFrnd from "@/assets/login-img/Refer-Frnd-Img.png";
import Refer2 from "@/assets/login-img/Refer-Earn-2.png";

export default function ReferCode() {
    const [mobile, setCode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!mobile) {
            setError("Mobile number is required.");
            return;
        }

        setError("");
        console.log("Sending OTP to:", mobile);
        router.push("/dashboard");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-6xl bg-white rounded-[20px] shadow-md flex flex-col md:flex-row items-center p-8 gap-8">
                <div className="hidden md:block w-1/2">
                    <Image
                        src={ReferFrnd}
                        width={500}
                        height={500}
                        alt="Login"
                        className="object-contain"
                    />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded shadow-md w-full md:w-1/2 max-w-sm"
                >
                    <div className="flex justify-center py-1">
                        <Image
                            src={Refer2}
                            width={250}
                            height={200}
                            alt="Login"
                        />

                    </div>
                    <div>
                        <h2 className="text-2xl text-black mb-6 text-center font-bold py-2">
                            Enter Referral Code
                        </h2>
                    </div>


                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    )}

                    <div className="mb-4 py-4">
                        <input
                            type="tel"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            className="w-full px-4 py-2 border rounded-md  border-orange-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={mobile}
                            placeholder="Enter Referral Code"
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col-2 gap-2">
                        <button
                            type="submit"
                            className="w-full bg-button py-3 hover:shadow-xl shadow text-lg rounded-lg text-white"
                        >
                            Verify
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-button py-3 border text-lg rounded-lg"
                        >
                            Skip
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
