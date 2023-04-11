import { getRedirectFromLocalStorage } from "@/api/config";
import { Button } from "@/components";
import Input from "@/components/Input";
import { signinSchema } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { status, data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinSchema) });

  const router = useRouter();

  const submitForm = async (data) => {
    setError(false);
    setLoading(true);
    const result = await signIn("credentials", { ...data, redirect: false });
    setLoading(false);

    if (result.error) {
      setError("Invalid Credentials entered");
    } else {
      toast.success("Successfully Signed In!", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        toast.dismiss();
      }, 1500);
    }
  };

  if (status === "loading") {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <p className="text-lg font-semibold">Loading Gallery...</p>
      </div>
    );
  } else if (status === "authenticated") {
    const redirect = getRedirectFromLocalStorage();
    router.push(redirect || "/my-gallery");
  } else if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="bg-white px-6 sm:px-12 md:px-16 py-16 rounded-xl w-[450px] min-h-[400px]">
          <h3 className="text-2xl font-bold text-gray-700 mb-7">
            Sign in to your gallery
          </h3>
          <form onSubmit={handleSubmit(submitForm)} className="grid gap-8">
            {!!error && <p className="text-xs text-red-500">{error}</p>}
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

            <div>
              <Button type="submit" variant="solid" className="w-full">
                {loading ? "Signing..." : "Sign Up"}
              </Button>

              <div className="text-center ">
                {`Don't have an account?`}
                <Link href="/auth/signup">
                  <Button className="px-2" variant="link">
                    {"Sign Up"}
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Signin;
