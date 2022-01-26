export const preferences = ["Cryptocurrencies", "Investing", "Start-Ups", "Venture Capital", "Sports", "Gaming", "Culture", "Art", "Food", "Social Media", "Community", "Feminism", "Person of Color", "Social Justice", "Climate Change", "Education", "Innovation", "Software", "Technology", "Blockchain", "Web3.0"]
export const userMenuItems = ["Profile", "Account", "Logout"];
export type preference = typeof preferences[number];
export interface userData {
    preferences?: preference[]
}
