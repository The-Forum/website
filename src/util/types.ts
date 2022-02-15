import { doc, Firestore, setDoc } from "firebase/firestore";
import Moralis from "moralis/types";
import { NextRouter } from "next/router";
import { createContext } from "react";
import { firestore } from "./firebaseConnection";

export const preferences = [
  "Cryptocurrencies",
  "Investing",
  "Venture Capital",
  "Sports",
  "Gaming",
  "Culture",
  "Art",
  "Food",
  "Community",
  "Climate Change",
  "Blockchain",
  "Web3.0"
];
export const userMenuItems = [
  {
    text: "Change Preferences",
  },
  {
    text: "Logout",
  },
];
export type topic = typeof preferences[number];
export interface userDataType {
  preferences?: {
    topic: topic;
    value: number;
  }[];
  joinedDAOs?: string[];
  id: string;
}
export interface message {
  text: string;
  id: number;
  sender: {
    name: string;
    uid: string;
    avatar: string;
  };
}
export interface dao {
  avatar: string;
  categories: string[];
  description: string;
  ensName: string;
  followersCount: number;
  id: string;
  image: string;
  links: {
    chat_url: string[];
    blockchain_site: string[];
    homepage: string[];
    repos_url: {
      github: string[];
    };
    subreddit_url: string;
    twitter_screen_name: string;
  };
  name: string;
}
export const UserDataContext = createContext(<userDataType | undefined>{});
