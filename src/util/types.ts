import Moralis from "moralis/types";
import { createContext } from "react";

export const preferences = [
  "Cryptocurrencies",
  "Investing",
  "Start-Ups",
  "Venture Capital",
  "Sports",
  "Gaming",
  "Culture",
  "Art",
  "Food",
  "Social Media",
  "Community",
  "Feminism",
  "Person of Color",
  "Social Justice",
  "Climate Change",
  "Education",
  "Innovation",
  "Software",
  "Technology",
  "Blockchain",
  "Web3.0",
];
export const userMenuItems = [
  {
    text: "Profile",
    action: (_user: Moralis.UserConstructor) => {
      console.log("Profile");
    },
  },
  {
    text: "Logout",
    action: (user: Moralis.UserConstructor) => {
      user.logOut().then(() => console.log("loggedouts"));
    },
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
