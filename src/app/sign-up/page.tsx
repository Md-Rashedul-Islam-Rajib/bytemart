import { useRouter } from "next/router";
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
  Input,
  Button,
} from "shadcn/ui";
import { useForm } from "react-hook-form";

const signUpSchema = z.object({
  name: z
    .string()
    .min(3, {
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
  const router = useRouter();

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
    }

  return 
  <div className="flex justify-center items-center h-screen">

    <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white shadow-md rounded"
        >
            <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

        </form>
    </Form>



  </div>;
};

export default SignUp;
