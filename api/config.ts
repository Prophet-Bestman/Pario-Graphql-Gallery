import config from "@/utils/config";
import { GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_URL as string,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_ASSET_TOKEN}`,
    },
  }
);

export default graphQLClient;

export const getRedirectFromLocalStorage = () => {
  if (typeof window === "undefined") return null;
  if (!window.localStorage.getItem(config.key.redirect)) return null;

  return window.localStorage.getItem(config.key.redirect);
};
