import Image from "next/image";
import login from "@/assets/login-img/login.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { signup } from "@/app/actions/auth";
const loginSchema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginCmp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginForm) => {
    console.log(values, "get values");

    const formData = {
      user_phone: values.mobile,
      utm_campaign: "direct",
      utm_medium: "signup",
      utm_source: "sdcampusweb",
      platform: "website",
    };
    signup(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-6xl flex flex-col md:flex-row items-center p-8 gap-8">
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
        <CardContent className="w-full md:w-1/2 max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Input
              type="tel"
              maxLength={10}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Mobile No"
              {...register("mobile")}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-button py-3 hover:shadow-xl shadow text-lg cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "SEND OTP"}
            </Button>
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
        </CardContent>
      </Card>
    </div>
  );
}
