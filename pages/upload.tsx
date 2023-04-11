import React, { useCallback, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { usePostToGallery } from "@/api";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadSchema } from "@/schemas";
import { Button } from "@/components";
import { useSession } from "next-auth/react";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileError, setFileError] = useState(null);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(uploadSchema) });

  const { mutate: postToGallery, isLoading } = usePostToGallery();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 1) {
      setFileError("You can only choose 1 file");
    } else if (acceptedFiles[0]?.size > 2097152) {
      setFileError("Max file size accepted is 2MB");
    } else {
      setFile(acceptedFiles[0]);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(acceptedFiles[0]);
      fileReader.onload = (event) => {
        setFilePreview(event.target.result);
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const handleUploadImg = (data) => {
    const formData = new FormData();
    formData.append("fileUpload", file);
    postToGallery({
      data: { ...data, author: session?.user?.email },
      img: formData,
    });
  };

  return (
    <div className=" pb-12 flex flex-col justify-center  items-center ">
      <h2 className="text-2xl mb-12 font-bold text-gray-800">
        Upload A Photo to the Gallery
      </h2>

      {file ? (
        <div className="bg-white px-6 sm:px-12 md:px-16 py-16 rounded-xl w-[450px] flex flex-col  gap-8">
          <img
            src={filePreview}
            alt=""
            className="w-full h-[200px] object-cover"
          />

          <Input
            name="title"
            register={register}
            error={errors?.title?.message}
            placeholder="Title"
            label="Title"
            maxLength={30}
          />
          <Input
            type="textArea"
            name="caption"
            register={register}
            error={errors?.caption?.message}
            placeholder="Some caption"
            label="Caption"
            maxLength={50}
          />

          <Button onClick={handleSubmit(handleUploadImg)} className="w-full">
            {isLoading ? "Loading..." : "Upload"}
          </Button>
        </div>
      ) : (
        <div
          className=" flex flex-col justify-center items-center cursor-pointer"
          {...getRootProps()}
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <AiOutlineCloudUpload fontSize={"50px"} />
          )}
          <input multiple={false} {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop some files here, or click to select files</p>
          )}

          {!!fileError && (
            <p className="text-sm font-medium text-red-500">{fileError}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadPage;

UploadPage.auth = true;
