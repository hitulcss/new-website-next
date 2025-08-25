import React, { useState } from "react";
import Image from "next/image";
import { initiateCoursePayment, veryCoupon } from "@/actions/home";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { removeItem, setItem } from "@/lib/storage";
import { removeCookie, setCookie } from "@/services/cookies";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  batchDetails?: any;
  selectedValidity?: any;
  setSelectedValidity?: (validity: any) => void;
  selectedTab?: number | null;
};
const Enroll: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  batchDetails,
  selectedValidity,
}) => {
  const withBookPrice = 1500; // Price for the book
  const [withBook, setWithBook] = useState(false);
  // const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponId, setCouponId] = useState<string | null>(null);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  if (!isOpen) {
    return <></>;
  }
  console.log("batchDetails", batchDetails);
  const makePayment = async () => {
    let amount;
    if (selectedValidity?.salePrice) {
      amount = selectedValidity?.salePrice;
    } else {
      amount = selectedValidity?.regularPrice;
    }
    if (withBook) {
      amount += withBookPrice;
    }
    amount -= discountPrice; // Apply discount if any
    if (amount <= 0) {
      amount = 1; // Ensure amount is not negative
    }
    const course = batchDetails;
    const from = localStorage.getItem("from");
    const selectedPlan = localStorage.getItem("selectedPlan");
    const emiInstallment = localStorage.getItem("emiInstallment");
    const totalAmountOfInstallment = localStorage.getItem(
      "totalAmountOfInstallment"
    );
    // const CouponId = localStorage.getItem("CouponId");
    let dataForGenerate = {
      batchId: course?.id,
      amount: amount.toFixed(2),
      coins: 0,
      isEmi: from !== "emi" ? false : true,
      noOfInstallments: from !== "emi" ? "" : selectedPlan,
      eachInstallmentAmount: from !== "emi" ? "" : emiInstallment,
      fullAmount: from !== "emi" ? "" : totalAmountOfInstallment,
      utm_campaign: "",
      utm_medium: "",
      utm_source: "",
      platform: "website",
      couponId: couponId,
      withBook: withBook,
      withBookPrice: withBook ? withBookPrice : 0,
      validityId: "", // Added validityId to the object
    };
    if (selectedValidity?.id !== "" || selectedValidity?.validityId !== "") {
      dataForGenerate.validityId = selectedValidity?.id
        ? selectedValidity?.id
        : selectedValidity?.validityId;
    }

    console.log("dataForGenerate", dataForGenerate);
    const res = await initiateCoursePayment(dataForGenerate);
    console.log("res", res);
    // Store all payment-related data in a cookie
    const paymentData = {
      orderId: res?.orderId,
      batchId: course?.id,
      amount: amount.toFixed(2),
    };
    setCookie("paymentData", paymentData);
    setItem("paymentData", JSON.stringify(paymentData));
    window.location.href = res?.paymentUrl;
    // } else {
    //   freePurchaseCourses(course?.id);
    //   setTimeout(() => {
    //     localStorage.setItem('index', 1)
    //     navigate("/learning/my-courses");
    //   }, 1500);
    // }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto sm:overflow-y-block">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <button className="text-xl font-semibold" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Spacer */}

        <div className="py-3">
          <div className="flex flex-col gap-6 md:flex-row md:h-auto max-h-[calc(80vh-10px)]">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Card */}
              <div className="w-full md:w-1/2 border rounded-lg p-4 flex flex-col h-full sm:w-1/2">
                <div className="relative w-full h-[420px]">
                  <Image
                    src={batchDetails?.banner || "/default-banner.png"}
                    alt="Course Image"
                    fill
                    className="rounded-3xl lg:object-contain sm:object-fit"
                  />
                </div>
                <div className="mt-4 flex sm:flex-col justify-between items-center">
                  <h2 className="text-lg lg:text-sm sm:text-sm font-semibold text-gray-800">
                    {batchDetails?.batchName ?? ""}
                  </h2>
                  
                </div>
                <span className="text-lg font-semibold text-gray-800">
                    ₹{Math.round(selectedValidity?.salePrice || 0)}
                  </span>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <p>Till Exam</p>
                  <button className="text-orange-600 hover:underline">
                    Change Validity
                  </button>
                </div>
              </div>

              {/* Right Card */}
              <div className="w-full md:w-1/2 border rounded-lg p-4 flex flex-col justify-between h-full">
                <h2 className="text-lg font-semibold">Payment Summary</h2>
                <hr className="my-2" />
                <div className="text-sm space-y-2 flex-grow">
                  <div className="flex justify-between">
                    <span>Total Amount</span>
                    <span>
                      ₹{Math.round(selectedValidity?.regularPrice || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>
                      -₹
                      {Math.round(
                        (selectedValidity?.regularPrice || 0) -
                          (selectedValidity?.salePrice || 0)
                      )}{" "}
                      (
                      {Math.round(
                        (((selectedValidity?.regularPrice || 0) -
                          (selectedValidity?.salePrice || 0)) /
                          (selectedValidity?.regularPrice || 1)) *
                          100
                      )}
                      % OFF)
                    </span>
                  </div>

                  {/* Coupon Input */}
                  <div className="flex items-center border rounded px-2 py-1 justify-between min-h-[40px] w-full">
                    {/* {!showCouponInput ? (
                      <button
                        className="text-gray-500 w-full text-left hover:underline focus:outline-none"
                        type="button"
                        onClick={() => setShowCouponInput(true)}
                      >
                        Have Coupon code?
                      </button>
                    ) : ( */}
                    <div className="flex items-center gap-2 w-full ml-2">
                      <Input
                        className="h-8 text-sm w-50"
                        placeholder="Have Coupon code?"
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        // style={{ textTransform: "uppercase" }}
                      />
                      <Button
                        className="text-orange-200 hover:underline text-sm cursor-pointer"
                        type="button"
                        onClick={async () => {
                          setCouponError("");
                          setCouponSuccess("");

                          if (!couponCode.trim()) {
                            setCouponError("Please enter a coupon code.");
                            setAppliedCoupon(null);
                            setDiscountPrice(0);
                            setCouponId(null);
                            return;
                          }

                          try {
                            const couponData = await veryCoupon({
                              couponCode,
                              link: "batch",
                              linkWith: batchDetails?.id,
                            });

                            if (couponData) {
                              let discountAmount = 0;
                              const basePrice =
                                selectedValidity?.salePrice || 0;

                              if (couponData.couponType === "percentage") {
                                discountAmount = (
                                  (basePrice * (couponData.couponValue || 0)) /
                                    100
                                );
                              } else {
                                discountAmount = (
                                  couponData.couponValue || 0
                                );
                              }

                              setAppliedCoupon({
                                ...couponData,
                                discountAmount,
                              });
                              setCouponSuccess(
                                `Coupon applied! Discount: ₹${discountAmount}${
                                  couponData.couponType === "percentage"
                                    ? ` (${couponData.couponValue}% OFF)`
                                    : ""
                                }`
                              );
                              setCouponError("");
                              setCouponId(
                                couponData.id || couponData.couponId || ""
                              );
                              setDiscountPrice(discountAmount);
                            } else {
                              setCouponError("Invalid coupon code.");
                              setCouponSuccess("");
                              setAppliedCoupon(null);
                              setDiscountPrice(0);
                              setCouponId(null);
                            }
                          } catch (err) {
                            setCouponError("Invalid or expired coupon code.");
                            setCouponSuccess("");
                            setAppliedCoupon(null);
                            setDiscountPrice(0);
                            setCouponId(null);
                          }
                        }}
                      >
                        Apply
                      </Button>

                      {/* Coupon feedback */}
                    </div>
                    {/* ) } */}
                  </div>
                  {couponError && (
                    <div className="text-red-500 text-xs mt-1">
                      {couponError}
                    </div>
                  )}
                  {couponSuccess && (
                    <div className="text-green-600 text-xs mt-1">
                      {couponSuccess}
                    </div>
                  )}

                  <hr />
                  {/* <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                    <Checkbox
                      id="toggle-2"
                      checked={withBook}
                      onCheckedChange={(checked) => setWithBook(!!checked)}
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                    <div className="grid gap-1.5 font-normal">
                      <p className="text-sm leading-none font-medium">
                        With Book
                      </p>
                      <p className="text-muted-foreground text-sm">
                        If you need book then check the checkbox (+₹
                        {withBookPrice})
                      </p>
                    </div>
                  </Label> */}

                  <div className="flex justify-between font-semibold text-base">
                    <span>Payable Amount</span>
                    <span>
                      ₹
                      {(() => {
                        let base = selectedValidity?.salePrice || 0;
                        let discount = 0;
                        if (appliedCoupon && appliedCoupon.discountAmount) {
                          discount = appliedCoupon.discountAmount;
                        }
                        // Ensure discount does not exceed base
                        base = Math.max(0, base - discount);
                        return (
                          base + (withBook ? withBookPrice : 0)
                        );
                      })()}
                    </span>
                  </div>
                </div>
                <div className="mt-6 text-center py-12">
                  <Button
                    onClick={makePayment}
                    className="bg-orange-600 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-orange-700 w-full md:w-auto"
                  >
                    MAKE PAYMENT
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* MAKE PAYMENT button */}
        </div>
      </div>
    </div>
  );
};

export default Enroll;
