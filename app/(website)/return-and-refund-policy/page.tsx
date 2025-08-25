import React from "react";
import { FaPhone } from "react-icons/fa";
// export async function generateMetadata() {
//   return {
//     title: "return-and-refund-policy",
//     description: "return-and-refund-policy",
//     alternates: {
//       canonical: "return-and-refund-policy/",
//     },
//   };
// }
function page() {
  return (
    <div className="container flex flex-col h-full bg-gray-200">
      <div className=" text-black px-5 py-3">
        <h1 className="text-3xl font-bold">
          Refund and Batch Extension Policy
        </h1>
        <hr className="border-1 border-gray-500"></hr>
        <p>
          Thank you for buying SD campus courses. We aim for the best user
          experience when anyone purchases our courses. Courses are
          non-refundable, and the refund policy mentioned here applies to all
          the products from the SD campus.
        </p>
      </div>
      <div className="container flex flex-col h-full  text-black px-5 py-3">
        <h1 className="text-3xl font-bold">Refund Policy</h1>
        <p>
          All SD Campus courses are non-refundable, unless otherwise stated. SD
          campus reserves the right to cancel a batch due to technical or other
          reasons. A refund will be initiated only for cancelled batches by the
          SD campus. In that case 100% refund will be processed within 15 days
          from the date of cancellation. Formal communication will be done for
          the same in advance.
        </p>
      </div>
      <div className="container flex flex-col h-full  text-black px-5 py-3">
        <h1 className="text-3xl font-bold">Batch Extension</h1>
        <p>
          Course/batch extension requests will be considered only within a set
          time duration:
        </p>
        <ul>
          <ol>Within 30 days of payments</ol>
          <ol>
            No further request, this will be considered for batch extension,
            given any circumstances.
          </ol>
        </ul>
      </div>
      <div className="container flex flex-col h-full  text-black px-5 py-3">
        <h1 className="text-3xl font-bold">Batch Validity </h1>
        <p>
          A batch validity is the duration of the course availability. At the SD
          campus, the batch validity starts right from the date of payment.
          Validity is not affected by the following:
        </p>
        <li>
          <ul>
            The batch validity starts regardless of the student’s access to the
            course.{" "}
          </ul>
          <ul>If students have never accessed the course.</ul>
        </li>
      </div>
      <div className="container flex flex-col h-full  text-black px-5 py-3">
        <h1 className="text-3xl font-bold">Batch Validity </h1>
        <p>
          Reach out to the SD campus Student Support Team via call or WhatsApp:
        </p>
        <span className="text-primary">
          <FaPhone size={18} />
          7428394519
        </span>
      </div>
    </div>
  );
}

export default page;
