"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { getLecturesOfSubject } from "@/actions/home";

// Define form schema
const formSchema = z.object({
  subject: z.string().min(1, "Please select a subject"),
  lectureId: z.string().min(1, "Please select a lecture"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  // For file uploads, you'd typically handle separately but we'll include in schema
  attachment: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AskQuestionForm({
  onClose,
  subjects,
  batchSlug,
  onSubmit,
}: {
  onClose: () => void;
  subjects: any;
  batchSlug: string;
  onSubmit: (values: FormValues) => void;
}) {
  //useFetch hook to handle API calls getLectureDetailsByBatchSlugAndId
  const {
    loading,
    data: lectureDetails,
    fn: fnGetLectureDetails,
  } = useFetch(getLecturesOfSubject);
  const [lectureOptions, setLectureOptions] = React.useState<any[]>([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      lectureId: "",
      description: "",
    },
  });

  const handleSubjectChange = async (subjectId: string) => {
    if (!subjectId) return;

    const payload = {
      subjectId: subjectId,
      batchSlug: batchSlug,
    };

    await fnGetLectureDetails(payload);
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (1MB limit)
      if (file.size > 1024 * 1024) {
        form.setError("attachment", {
          type: "manual",
          message: "File size must be less than 1MB",
        });
        return;
      }
      form.setValue("attachment", file);
      form.clearErrors("attachment");
    }
  };
  useEffect(() => {
    if (lectureDetails) {
      const lectures = lectureDetails.map((lecture: any) => ({
        id: lecture?._id,
        title: lecture?.lectureTitle,
      }));
      setLectureOptions(lectures);
    }
  }, [lectureDetails]);

  return (
    <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl relative space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Create a Post</h1>
        <hr />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Subject Select */}
            <div className="w-full">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select Subject</FormLabel>
                    <Select
                      onValueChange={async (value) => {
                        field.onChange(value); // Update form value
                        await handleSubjectChange(value); // Fetch lectures
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        position="popper"
                        className="z-[1000] w-full"
                      >
                        {subjects.map((subject: any) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="lectureId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Lecture</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select a Lecture</option>
                      {lectureOptions.map((lecture: any) => (
                        <option key={lecture?.id} value={lecture?.id}>
                          {lecture?.title}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tell us more about the issue</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your issue here..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload */}
            <FormField
              control={form.control}
              name="attachment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attach Photos (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <label
                        htmlFor="attachment"
                        className="w-full h-36 border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center cursor-pointer hover:border-orange-500"
                      >
                        <span className="text-4xl text-gray-400">📷</span>
                        <p className="text-sm text-red-500 mt-2">
                          You can upload up to 1MB
                        </p>
                        {field.value?.name && (
                          <p className="text-xs mt-1 text-gray-600">
                            {field.value.name}
                          </p>
                        )}
                      </label>
                      <Input
                        id="attachment"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <hr />

            {/* Submit Button */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                className="hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>

        {/* Close Icon */}
        <Button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </Button>
      </div>
    </div>
  );
}
