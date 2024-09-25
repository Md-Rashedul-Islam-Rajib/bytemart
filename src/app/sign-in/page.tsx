"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {signIn} from "next-auth/react"

// Define the form data type
type SignInFormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const router = useRouter();

  // Initialize form without validation
  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    console.log(data);
    const {email,password} = data;
    const response =await signIn("credentials",{
        email,
        password,
        redirect : false
    });
    console.log(response);
    // Simulate API call
    // try {
    //   const res = await fetch("/api/auth/signin", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (res.ok) {
    //     const result = await res.json();
    //     console.log("User signed in: ", result);
    //     router.push("/"); // Redirect on successful sign-in
    //   } else {
    //     const error = await res.json();
    //     console.log("Error: ", error.message);
    //   }
    // } catch (error) {
    //   console.log("Error submitting form: ", error);
    // }
  };

  return (
    <div className="flex bg-black text-white justify-center items-center py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md p-6 bg-black text-white shadow-md rounded"
        >
          <h1 className="text-2xl text-center font-bold mb-6">Sign In</h1>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
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
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="mt-4">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
