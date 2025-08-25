"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EnterOTPImg from "@/assets/login-img/Enter-OTP-Img.png";
import OTP2 from "@/assets/login-img/otp-2.png";
import { verifyOtp, resendOtp } from "@/actions/home";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { removeItem, setItem } from "@/lib/storage";
import { removeCookie, setCookie } from "@/services/cookies";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      setError("Otp is required.");
      return;
    }

    setError("");

    const verifyOtpRes = await verifyOtp({ otp });
    // console.log("verification response", verifyOtpRes);

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

      router.replace("/learning/home");
    } else {
      removeItem("authToken");
      removeItem("userProfile");
      removeCookie("authUser");
      setError("Invalid OTP. Please try again.");
      // router.push("/");
    }
  };

  const handleResend = async () => {
    setResending(true);
    const result = await resendOtp();
    console.log("Resend response:", result);
    setResendTimer(30); // reset countdown
    // Keep the button disabled until timer ends
    setTimeout(() => setResending(false), 30000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-[20px] shadow-md flex flex-col md:flex-row items-center p-8 gap-8">
        <div className="hidden md:block w-1/2">
          <Image
            src={EnterOTPImg}
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
              src={OTP2}
              width={150}
              height={150}
              alt="OTP"
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl text-black mb-6 text-center">Enter OTP</h2>
          <h6 className="text-center">
            OTP sent on your mobile number{" "}
            <span className="text-primary cursor-pointer">Change</span>
          </h6>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <div className="mb-4 py-4">
            <input
              type="tel"
              pattern="[0-9]{6}"
              maxLength={6}
              className="w-full px-4 py-2 border rounded-md border-orange-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={otp}
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-button py-3 hover:shadow-xl shadow text-lg rounded-lg"
              disabled={resending}
            >
              Proceed
            </button>
          </div>

          <div className="text-center mt-3">
            {resendTimer > 0 ? (
              <span className="text-gray-500 text-sm">
                Resend OTP in {resendTimer}s
              </span>
            ) : (
              <span
                onClick={handleResend}
                className="text-sm text-orange-600 font-medium cursor-pointer hover:underline"
              >
                {resending ? "Sending OTP..." : "Resend OTP"}
              </span>
            )}
          </div>

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
        </form>
      </div>
    </div>
  );
}
