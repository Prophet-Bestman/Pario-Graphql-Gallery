import config from "@/utils/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <p className="text-lg font-semibold">Loading Gallery...</p>
      </div>
    );
  } else if (status === "unauthenticated") {
    localStorage.setItem(config.key.redirect, router.asPath);
    router.push("/auth/signin");
  } else if (status === "authenticated") {
    return <>{children}</>;
  }
};

export default AuthProvider;
