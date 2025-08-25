"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { getItem } from "@/lib/storage";

export default function OrderSuccess() {

  const paymentData = JSON.parse(getItem("paymentData") as string);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-712270860/XsPOCMmuvvwaEIzI0dMC',
        value: paymentData?.amount || 0,
        currency: 'INR',
        transaction_id: paymentData?.orderId || '', // Pass order ID from paymentData
      });
    }
  }, [paymentData]);
  
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/learning/home");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful</h2>
        <p className="text-gray-600 mb-6">Thank you for your payment. Your transaction has been completed successfully.</p>
        <Link href="/learning/home">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
