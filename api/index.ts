import { gql } from "graphql-request";
import { useMutation, useQuery, useQueryClient } from "react-query";

import api from "./config";
import axios, { GenericFormData } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// ====== GRAPHQL QUERIES ========

const GALLERY_QUERY = gql`
  query Galleries {
    galleries(where: { published: true }, stage: DRAFT) {
      author
      caption
      createdAt
      id
      published
      title
      updatedAt
      imageUrl
    }
  }
`;

const AUTHOR_GALLERY_QUERY = gql`
  query Galleries($author: String!) {
    galleries(where: { author: $author }, stage: DRAFT) {
      author
      caption
      createdAt
      id
      published
      title
      updatedAt
      imageUrl
    }
  }
`;

// ====== GRAPHQL MUTATIONS ========

const POST_TO_GALLERY = gql`
  mutation postToGallery(
    $title: String!
    $caption: String!
    $author: String!
    $imageUrl: String!
  ) {
    createGallery(
      data: {
        title: $title
        caption: $caption
        author: $author
        imageUrl: $imageUrl
      }
    ) {
      id
      title
      caption
      author
      imageUrl
    }
  }
`;

const UPDATE_GALLERY_ITEM = gql`
  mutation MyMutation(
    $id: ID!
    $title: String!
    $caption: String!
    $imageUrl: String!
    $author: String!
    $published: Boolean
  ) {
    updateGallery(
      data: {
        published: $published
        title: $title
        caption: $caption
        author: $author
        imageUrl: $imageUrl
      }
      where: { id: $id }
    ) {
      id
      published
    }
  }
`;

// ========= CUSTOM HOOKS =========

export const useGetGalley: any = () => {
  return useQuery(["gallery"], async () => {
    const data = await api.request(GALLERY_QUERY);
    return data;
  });
};

export const useGetAuthorGalley: any = (author: string) => {
  return useQuery(
    ["author-gallery", author],
    async () => {
      const data = await api.request(AUTHOR_GALLERY_QUERY, {
        author,
      });
      return data;
    },
    {
      enabled: !!author,
    }
  );
};

export const usePostToGallery = () => {
  const router = useRouter();
  return useMutation(
    async (data: any) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HYGRAPH_URL}/upload`,
        data.img,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_ASSET_TOKEN}`,
          },
        }
      );

      const uploadedPhoto = await api.request(POST_TO_GALLERY, {
        imageUrl: res.data?.url,
        ...data?.data,
      });
      return uploadedPhoto;
    },
    {
      onSuccess: () => {
        router.push("/my-gallery");
      },
    }
  );
};

export const useUpdateGalleryItem = () => {
  const queryClient = useQueryClient();
  const notify = () =>
    toast.success("Upldated Photo", {
      position: "top-right",
      autoClose: 1000,
    });

  return useMutation(
    async (data: any) => {
      const updatedItem = await api.request(UPDATE_GALLERY_ITEM, {
        ...data,
      });
      return updatedItem;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gallery");
        queryClient.invalidateQueries("author-gallery");
        notify();
      },
    }
  );
};
