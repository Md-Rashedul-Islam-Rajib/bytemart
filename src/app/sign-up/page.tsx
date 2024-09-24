"use client"
// import { useRouter } from "next/router";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"

const signUpSchema = z.object({
  name: z.string().min(3, {
    required_error: "Name is required",
    invalid_type_error: "Name must be 3 or more characters long",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  image: z.any(),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
//   const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: null,
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);
    // router.push("/");
  };

  return;
  <div className="flex justify-center items-center h-screen">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white shadow-md rounded"
      >
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>


        {/* email */}
        <FormField 
        control={form.control}
        name="email"
        render={({field})=> (
            <FormItem>
                <FormLabel>
                    Email
                </FormLabel>
                <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
        />


        {/* Password */}
        <FormField 
        control={form.control}
        name="password"
        render={({field})=> (
            <FormItem>
                <FormLabel>Password</FormLabel> 
                <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
        />

        {/* Image */}
        <FormField 
        control={form.control}
        name="image"
        render={({field}) => (
            <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
        />

        {/* Submit Button */}
        <Button type="submit" 
        className="mt-4">
            Sign Up
        </Button>
        
      </form>
    </Form>
  </div>;
};

export default SignUp;
