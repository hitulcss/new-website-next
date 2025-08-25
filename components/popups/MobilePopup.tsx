"use client";

import React, { useEffect,useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import loginPopupImg from "@/assets/login-img/login-popup-img.png";
import { signup } from "@/actions/home";
import { verifyOtp, resendOtp } from "@/actions/home";
import Cookies from "js-cookie";
import { removeItem, setItem } from "@/lib/storage";
import { removeCookie, setCookie } from "@/services/cookies";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const MobilePopup = ({ isOpen, onClose, children }: Props) => {

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);


  // Handle mobile submit (Send OTP)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === "mobile") {
      if (!mobile.trim()) {
        setError("Mobile number is required.");
        return;
      }
      try {
        setError("");
        const data = {
          user_phone: mobile,
          utm_campaign: "direct",
          utm_medium: "signup",
          utm_source: "sdcampusweb",
          platform: "website",
        };
        const signupRes = await signup(data);
        // localStorage.setItem("authToken", signupRes?.data);
        setItem("authToken", signupRes?.data);
        Cookies.set('authToken', signupRes?.data, { expires: 7, path: '/' });
        setStep("otp");
      } catch (err) {
        setError("Failed to send OTP. Try again.");
      }
    } else if (step === "otp") {
      if (!otp.trim()) {
        setError("OTP is required.");
        return;
      }
      setError("");
      setIsVerifying(true);
      try {
        // Most APIs expect both mobile and otp for verification
        const verifyOtpRes = await verifyOtp({ otp, mobile });
        if (verifyOtpRes?.status) {
          const token = verifyOtpRes?.data?.token;
          const responseInfo = verifyOtpRes?.data;
          setItem("authToken", token);
          if (responseInfo) {
            setItem(
              "userProfile",
              JSON.stringify({
                name: responseInfo?.name,
                email: responseInfo?.email,
                mobile: responseInfo?.mobileNumber ?? "",
                profilePhoto: responseInfo?.profilePhoto ?? "",
              })
            );
          }
          setCookie("authUser", {
            token: token,
            profile: {
              name: responseInfo?.name,
              email: responseInfo?.email,
              mobile: responseInfo?.mobileNumber ?? "",
              profilePhoto: responseInfo?.profilePhoto ?? "",
              enrollId: responseInfo?.enrollId ?? "",
            },
          });
          setIsVerifying(false);
          onClose();
          window.location.reload();
        } else {
          removeItem("authToken");
          removeItem("userProfile");
          removeCookie("authUser");
          setError("Invalid OTP. Please try again.");
          setIsVerifying(false);
        }
      } catch (err) {
        setError("Failed to verify OTP. Try again.");
        setIsVerifying(false);
      }
    }
  };


  // Don't show popup if user is logged in (CSR/SSR safe)


  // Prevent popup flash for logged-in users on refresh (SSR/CSR safe)
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('authToken'));
      setShouldRender(true);
    }
  }, [isOpen]);
  if (!shouldRender) return null;
  if (isLoggedIn || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Popup Image */}
        <Image
          src={loginPopupImg}
          alt="Login"
          width={180}
          height={180}
          className="mx-auto mb-4 rounded-full"
        />


        <form onSubmit={handleSubmit}>
          {/* Heading */}
          <h1 className="text-2xl font-bold flex justify-center mb-1">
            Welcome to&nbsp;
            <span className="text-orange-500"> 
             SD Campus! 
            </span>
          </h1>
          <p className="mb-4 text-gray-600 text-sm flex justify-center">
            {step === "mobile"
              ? "Please enter your mobile number to Login"
              : `OTP sent to +91-${mobile}`}
          </p>

          {/* Mobile Input */}
          {step === "mobile" && (
            <input
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          )}

          {/* OTP Input */}
          {step === "otp" && (
            <>
              <input
                type="text"
                pattern="[0-9]{4,6}"
                maxLength={6}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                className="w-full bg-gray-200 text-orange-500 py-2 rounded-md hover:bg-gray-300 transition cursor-pointer mb-2"
                disabled={isResending}
                onClick={async () => {
                  setIsResending(true);
                  setError("");
                  try {
                    await resendOtp();
                  } catch {
                    setError("Failed to resend OTP. Try again.");
                  }
                  setIsResending(false);
                }}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            </>
          )}

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition cursor-pointer"
            disabled={isVerifying}
          >
            {step === "mobile" ? "Send OTP" : isVerifying ? "Verifying..." : "Submit OTP"}
          </button>
        </form>

        {/* Privacy & Terms */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          By continuing, you agree to our{" "}
          <a href="https://www.sdcampus.com/privacy-policy" className="text-orange-500 underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="https://www.sdcampus.com/terms-and-conditions" className="text-orange-500 underline">
            Terms & Conditions
          </a>
        </p>
      </div>
    </div>
  );
};

export default MobilePopup;
