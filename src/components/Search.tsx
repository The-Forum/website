import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../util/firebaseConnection";
import { Autocomplete, Box, Grid, ImageList, ImageListItem, ImageListItemBar, InputBase, Link, Stack, TextField, Typography } from "@mui/material";
import { HeaderBar } from "./Header";
import { preferences } from "../util/types";


export const Search = () => {
    // Initialize state on the search bar 
    const [userInput, setUserInput] = useState("");
    
    //Initialize state on the preferences filter
    const [searchCategory, setsearchCategory] = useState<string | null>();

    //Initialize state on the search result
    //Variable is used store and dispay DAO on search by name or category
    const [searchResult, setSearchResult] = useState([]);

    /*
    @param searchValue : string, user input
    */
    const searchDaoByName = (searchValue: string) => {
        setUserInput(searchValue)
        const result = []
        const getDaoByUserInput = query(collection(firestore,"daos"),where("name","==", searchValue));
        const readDaoResult = onSnapshot(getDaoByUserInput, (querySnapshot) => {
            querySnapshot.forEach((daoItem) => {
                result.push(daoItem.data());
            });
            setSearchResult(result);
        })
    }

    /*
    @param searchCategory : string[], array of selected preferences
    */
    const getDaoByCategory = (searchCategory: string[]) => {
        if (searchCategory && searchCategory?.length > 0) {

            const firestoreCategories : string[] = []; //Array that stores translation from preferences to categories
            const tmp: object[] = []; //Temporarily stores daos that match constrained request

            getDoc(doc(firestore,"lookUp", "sE0YysJAsoFtox9h3Z0M")).then((doc) => {
                searchCategory.forEach((userSelectedPreference) => {
                    //Iterate over userSelectedPreference variable to extract strings 
                    doc.get(userSelectedPreference).forEach((firestoreCategory: string) => {
                        firestoreCategory !== "" ? firestoreCategories.push(firestoreCategory) : null
                        if (firestoreCategories.length > 1 ) {
                            const q = query(collection(firestore,"daos"), where("categories", "array-contains-any", firestoreCategories));
                            onSnapshot(q, (querySnapshot) => {
                                querySnapshot.forEach((dao) => {
                                    tmp.includes(dao) ? null : tmp.push(dao.data()); // Ensure no duplicate
                                })
                            });    
                        };
                        setSearchResult(tmp);
                    });
                });
            });
        }
        else {
            return null;
        };
    };

   if (searchResult) {
    return (
        <Box>
            <Grid container spacing={5} sx={{display:"flex"}}>
            <HeaderBar/>
            <Grid container sx={{display:"flex", flexDirection:"row"}} spacing={10}>
                <Grid item sx={{display:"flex", justifyContent:"center", marginLeft:50}} >
                    <InputBase fullWidth placeholder="Discover DAO on The Forum" inputProps={{ "aria-label": "search" }}
                    sx={{
                        border: 2,
                        borderRadius: 5,
                        borderColor: "primary.main",
                        flexGrow: 1}}
                        onChange={(e) => searchDaoByName(e.target.value)}/>
                </Grid>
                <Grid item>
                    <Stack sx={{width:400}}>
                        <Autocomplete
                        multiple
                        id="searchByCategory"
                        options={preferences}
                        onChange={(event:any, value: string | null) => {
                            getDaoByCategory(value);
                        }}
                        renderInput={(params) => (
                        <TextField {...params} variant="standard" label="Search By DAO Category" placeholder="Categories"/>)}/>
                    </Stack>
                </Grid>
            </Grid>
            <Grid item sx={{display:"flex"}}>
                <ImageList sx={{ display: "flex", flexDirection: "row", width: 1200, paddingLeft: 5}} rowHeight={300}>
                    {searchResult.map((dao) => (
                    <ImageListItem key={dao.image}>
                        <img src={`${dao.image}?fit=crop&auto=format`}
                        alt={dao.name}
                        loading="lazy" />
                        <ImageListItemBar title={dao.name} subtitle={<Link href={dao.chat_url} underline="hover" color="primary.main">Discord</Link>} position="below" />
                    </ImageListItem>))}
                </ImageList>
            </Grid>
        </Grid>
    </Box>
    ) 
   }
}