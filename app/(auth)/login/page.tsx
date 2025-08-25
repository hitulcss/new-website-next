"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import login from "@/assets/login-img/login.png";
import { signup } from "@/actions/home";
import Cookies from 'js-cookie';
import { setItem } from "@/lib/storage";
export default function Login() {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!mobile) {
      setError("Mobile number is required.");
      return;
    }

    setError("");
    console.log("Sending OTP to:", mobile);
    const data = {
      user_phone: mobile,
      utm_campaign: "direct",
      utm_medium: "signup",
      utm_source: "sdcampusweb",
      platform: "website",
    };
    const signupRes = await signup(data);
    setItem("authToken", signupRes?.data);
    Cookies.set('authToken', signupRes?.data, { expires: 7, path: '/' });
    // console.log(signupRes);
    router.push("/otp");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-[20px] shadow-md flex flex-col md:flex-row items-center p-8 gap-8">
        {/* Left-side Image */}
        <div className="hidden md:block w-1/2">
          <Image
            src={login}
            width={500}
            height={500}
            alt="Login"
            className="object-contain"
          />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full md:w-1/2 max-w-sm"
        >
          {/* Logo Centered */}
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="SD Campus Logo"
              width={100}
              height={100}
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl text-gray-500 mb-6 font-bold text-center">
            Welcome To <br />
            <span className="text-2xl font-bold text-black">SD Campus</span>
          </h2>

          {/* Input Field */}
          <div className="mb-4">
            <input
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={mobile}
              placeholder="Enter Mobile No"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {/* Submit Button */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-button py-3 hover:shadow-xl shadow text-lg cursor-pointer"
            >
              SEND OTP
            </button>
          </div>

          {/* Terms & Privacy */}
          <div>
            <p className="text-l py-2 text-center">
              By continuing, you agree to our{" "}
              <a href="https://www.sdcampus.com/privacy-policy">
                <span className="text-primary">Privacy Policy</span>
              </a>{" "}
              and{" "}
              <a href="https://www.sdcampus.com/terms-and-conditions">
                <span className="text-primary">Terms & Conditions</span>
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
