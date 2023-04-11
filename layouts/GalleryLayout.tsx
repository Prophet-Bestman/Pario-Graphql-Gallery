import { Button } from "@/components";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import config from "@/utils/config";
const inter = Inter({ subsets: ["latin"] });

const GalleryLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  return (
    <div
      className={inter.className + " h-[100vh] overflow-y-auto bg-[#efefef]"}
    >
      <div className="bg-white px-5 md:px-8 lg:px-12 py-4 flex justify-between items-center ">
        <Link href="/" className="font-bold text-lg">
          GALLERY App
        </Link>
        {status === "authenticated" ? (
          <div className="flex items-center gap-3">
            <Link href="/my-gallery">
              <Button>My Gallery</Button>
            </Link>

            <Button onClick={() => signOut()} variant="link">
              Log Out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button
                onClick={() => {
                  localStorage.setItem(config.key.redirect, router.asPath);
                }}
              >
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="px-8 sm:px-16 lg:px-28 py-10 h-full">{children}</div>
    </div>
  );
};

export default GalleryLayout;
