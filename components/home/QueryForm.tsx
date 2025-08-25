import React, { useEffect } from "react";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { createCta } from "@/actions/home";
import { toast as Toast } from 'react-toastify';
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  course: z.string({
    required_error: "Please select a course.",
  }),
  mobileNumber: z
    .string({ required_error: "Mobile Number is Required." })
    .min(10, {
      message: "Mobile number must be 10 digits.",
    })
    .max(10, {
      message: "Mobile number must be 10 digits.",
    })
    .regex(/^[6-9]\d{9}$/, {
      message: "Please enter a valid Indian mobile number.",
    }),
});

function QueryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      course: "",
      mobileNumber: "",
    },
  });

  const { loading, data: queryFormResponse, fn: fnSubmitQueryForm } = useFetch(createCta);
  const [ctaMessage, setCtaMessage] = React.useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setCtaMessage(null);
    const Payload = {
      fullName: values.username,
      phoneNumber: values.mobileNumber,
      msg: "rtyty",
      utm_campaign: "direct_search",
      standard: "",
      utm_source:
        "https://www.sdcampus.com/school-entrance-exams/jnv-exam-complete-live-foundation-batch-2025-27-two-year-program-for-class-6th",
      utm_medium: "direct_search",
    };
    await fnSubmitQueryForm(Payload);
  }


  useEffect(() => {
    console.log(queryFormResponse);
    if (queryFormResponse) {
      Toast.dismiss();
      Toast(queryFormResponse?.msg)
    }
  }, [queryFormResponse])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md mx-auto p-1 rounded-lg"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
                />
              </FormControl>
              <FormMessage className="text-red-600 mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500">
                    <SelectValue placeholder="Select a Course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-w-full w-auto min-w-full z-50">
                  <SelectItem value="Sainik-6">
                    Sainik School - Class 6
                  </SelectItem>
                  <SelectItem value="Sainik-9">
                    Sainik School - Class 9
                  </SelectItem>
                  <SelectItem value="JNV-6">
                    JNV School - Class 6
                  </SelectItem>
                  <SelectItem value="JNV-9">
                    JNV School - Class 9
                  </SelectItem>
                  <SelectItem value="tuition-9">
                    Tuition - Class 9
                  </SelectItem>
                  <SelectItem value="tuition-10">
                    Tuition - Class 10
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-600 mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Mobile No."
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
                  maxLength={10}
                  inputMode="tel"
                />
              </FormControl>
              <FormMessage className="text-red-600 mt-1" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition cursor-pointer"
          disabled={!!loading}
        >
          {loading ? 'Booking...' : 'BOOK A DEMO'}
        </Button>

        {ctaMessage && (
          <div className="w-full text-center mt-2 text-base font-medium text-green-600 bg-green-50 border border-green-200 rounded p-2">
            {ctaMessage}
          </div>
        )}
      </form>
    </Form>
  );
}

export default QueryForm;
