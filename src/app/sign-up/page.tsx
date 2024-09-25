"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const signUpSchema = z.object({
  name: z.string().min(3, {message: "Name must be 3 or more characters long",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  image: z.any(),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
    const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: null,
    },
  });


  const uploadImage = async (file : File) => {
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset", "pzk6cmri"); //preset_name
    formData.append("cloud_name", "dbe3ewhey"); //cloud_name

    const res = await fetch("https://api.cloudinary.com/v1_1/dbe3ewhey/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  }

  //submit button func
  const onSubmit = async (data: SignUpFormValues) => {
    if(data.image){
      try {
        const imageUrl = await uploadImage(data.image);
        setImageUrl(imageUrl);
        console.log("uploaded image Url: ", imageUrl)
      } catch (error:any) {
        console.log("Error uploading image :",error)
      }
    }
    const userInfo = {...data,image:imageUrl};
      try {
        const res = await fetch("/sign-up/api",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(userInfo),
        });
        if(res.ok){
          const result = await res.json();
          console.log("User Created :" , result);
          router.push("/");
        }else{
          const error = await res.json();
          console.log("Error :", error.message);
        }
      } catch (error:unknown) {
        if(error instanceof Error){
          console.log("Error submitting form :", error);
        }
        console.log("unknown error occurred",error);
      }
  
  };

  return (
    <div className="flex bg-black text-white justify-center items-center py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md p-6 bg-black text-white shadow-md rounded"
        >
          <h1 className="text-2xl text-center font-bold mb-6">Sign Up</h1>

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2">Name</FormLabel>
                <FormControl>
                  <Input type="text"  placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2">Profile Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="mt-4">
            Sign Up
          </Button>

          {/* Display the uploaded image URL */}
          {/* {imageUrl && (
            <div className="mt-4">
              <p>Image uploaded successfully!</p>
              <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                {imageUrl}
              </a>
            </div>
          )} */}


        </form>
      </Form>
    </div>
  );
};

export default SignUp;
