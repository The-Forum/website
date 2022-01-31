import { createContext } from "react";

export const preferences = ["Cryptocurrencies", "Investing", "Start-Ups", "Venture Capital", "Sports", "Gaming", "Culture", "Art", "Food", "Social Media", "Community", "Feminism", "Person of Color", "Social Justice", "Climate Change", "Education", "Innovation", "Software", "Technology", "Blockchain", "Web3.0"]
export const userMenuItems = ["Profile", "Account", "Logout"];
export type preference = typeof preferences[number];
export interface userDataType {
    preferences?: preference[],
    joinedDAOs?: string[],
    id: string
}

export interface message {
    "text": string,
    "id": number,
    "sender": {
        "name": string
        "uid": string
        "avatar": string
    },
}
export interface dao {
    backgroundImage: string,
    discord_link: string,
    id: string,
    name: string,
    text: string,
    twitter_link: string,
    categories: preference[],
}
export const UserDataContext = createContext(<userDataType>{})