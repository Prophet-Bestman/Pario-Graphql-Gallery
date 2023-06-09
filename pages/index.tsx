import Head from "next/head";
import { GridItem } from "@/components/gallery";
import { useGetGalley } from "@/api";

export default function Home({}) {
  const { data: galleryResp, isLoading } = useGetGalley();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" h-full">
        <h2 className="text-center text-3xl mb-12 font-medium">
          Public Gallery
        </h2>
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
    </>
  );
}

// Home.auth = true;
