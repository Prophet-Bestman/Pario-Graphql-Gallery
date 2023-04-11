import { useGetAuthorGalley } from "@/api";
import { Button } from "@/components";
import { GridItem } from "@/components/gallery";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

const MyGallery = () => {
  const { data: session } = useSession();

  const { data: galleryResp, isLoading } = useGetAuthorGalley(
    session.user.email
  );

  return (
    <main className=" h-full">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-xl font-medium">My Gallery</h3>

        <Link href="/upload">
          <Button>Upload</Button>
        </Link>
      </div>
      {isLoading ? (
        <div className="h-full flex justify-center items-center text-xl font-bold ">
          <h2>Fetching...</h2>
        </div>
      ) : galleryResp?.galleries?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryResp?.galleries?.map((photo) => (
            <GridItem photo={photo} key={photo?.id} />
          ))}
        </div>
      ) : (
        <p className="text-3xl text-gray-400 font-bold uppercase text-center">
          No item in the gallery
        </p>
      )}
    </main>
  );
};

export default MyGallery;

MyGallery.auth = true;
