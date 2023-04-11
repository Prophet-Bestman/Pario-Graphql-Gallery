import React from "react";
import { BsPerson } from "react-icons/bs";

import Button from "../Button";
import { useSession } from "next-auth/react";
import { useUpdateGalleryItem } from "@/api";

interface GridItemProps {
  photo: {
    imageUrl: string;
    caption: string;
    title: string;
    author: string;
    published?: boolean;
  };
}

const GridItem = ({ photo }: GridItemProps) => {
  const { imageUrl, caption, title, author } = photo;
  const { data: session } = useSession();

  const { mutate, isLoading } = useUpdateGalleryItem();
  const updatePhoto = () => mutate({ ...photo, published: !photo?.published });

  return (
    <div className="col-span-1 h-[350px] bg-white rounded-2xl shadow-sm hover:shadow-lg ease-in-out transition-all duration-500 ">
      <img
        src={imageUrl}
        className="h-[70%] w-full object-cover rounded-t-2xl"
        alt=""
      />

      <div className="h-[30%] flex flex-col px-4 py-3 text-sm text-gray-600 ">
        <div>
          <p className="text-xs font-bold">{title}</p>
          <p className="">{caption}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-xs font-semibold  gap-1 ">
            <BsPerson />
            <p>{author}</p>
          </div>
          {!!session && session?.user?.email === author && (
            <Button
              variant="link"
              onClick={updatePhoto}
              className="py-0 text-xs"
            >
              {isLoading
                ? !!photo.published
                  ? "Unpublishing..."
                  : "Publishing..."
                : !!photo.published
                ? "Unpublish"
                : "Publish"}
            </Button>
          )}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default GridItem;
