import { Button } from "@/components";
import Input from "@/components/Input";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/schemas";
import { useRouter } from "next/router";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const router = useRouter();
  const submitForm = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white  px-6 sm:px-12 md:px-16 py-16 rounded-xl w-[450px] min-h-[400px]">
        <h3 className="text-2xl font-bold text-gray-700 mb-7">
          Create New Account
        </h3>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="grid gap-6 sm:gap-8"
        >
          {/* <Input
            name="username"
            label="Username"
            placeholder="New User"
            register={register}
            error={errors?.username?.message}
          /> */}
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="user@email.com"
            register={register}
            error={errors?.email?.message}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="********"
            register={register}
            error={errors?.password?.message}
          />
          <Input
            name="confirm_password"
            type="password"
            label="Confirm Password"
            placeholder="********"
            register={register}
            error={errors?.confirm_password?.message}
          />

          <div>
            <Button type="submit" variant="solid" className="w-full">
              Sign Up
            </Button>
            <div className="text-center ">
              {`Already have an account?`}
              <Link href="/auth/signin">
                <Button className="px-2" variant="link">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
