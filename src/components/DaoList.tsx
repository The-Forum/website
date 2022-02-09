import { Box,ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { dao } from "../util/types";
import { firestore } from "../util/firebaseConnection";
import { collection, query ,onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from "react";


export let financeDao: dao[] = [
    {
        id: "shineDao",
        name: "ShineDAO",
        backgroundImage: "https://shinedao.finance/static/shineAnimatedRocket-5d92da631e0a8da4c2ea248696a76eb4.gif",
        text: "This DAO rocks !",
        discord_link: "https://discord.com/invite/QkhbP7bZrj",
        twitter_link: "https://twitter.com/ShineDAO_/",
        categories: ["finance"],


    },
    {
        id: "shineDao",
        name: "ShineDAO",
        backgroundImage: "https://shinedao.finance/static/shineAnimatedRocket-5d92da631e0a8da4c2ea248696a76eb4.gif",
        text: "This DAO rocks !",
        discord_link: "https://discord.com/invite/QkhbP7bZrj",
        twitter_link: "https://twitter.com/ShineDAO_/",
        categories: []

    },
    {
        id: "shineDao",
        name: "ShineDAO",
        backgroundImage: "https://shinedao.finance/static/shineAnimatedRocket-5d92da631e0a8da4c2ea248696a76eb4.gif",
        text: "This DAO rocks !",
        discord_link: "https://discord.com/invite/QkhbP7bZrj",
        twitter_link: "https://twitter.com/ShineDAO_/",
        categories: []
    },
    {
        id: "shineDao",
        name: "ShineDAO",
        backgroundImage: "https://shinedao.finance/static/shineAnimatedRocket-5d92da631e0a8da4c2ea248696a76eb4.gif",
        text: "This DAO rocks !",
        discord_link: "https://discord.com/invite/QkhbP7bZrj",
        twitter_link: "https://twitter.com/ShineDAO_/",
        categories: []


    },
    {
        id: "shineDao",
        name: "ShineDAO",
        backgroundImage: "https://shinedao.finance/static/shineAnimatedRocket-5d92da631e0a8da4c2ea248696a76eb4.gif",
        text: "This DAO rocks !",
        discord_link: "https://discord.com/invite/QkhbP7bZrj",
        twitter_link: "https://twitter.com/ShineDAO_/",
        categories: []
    }

];

/*
Displays a list of DAO whose categories match user preferences
To-do : connect firebase database, read "users/:walletId" collection, store topics on a data structure
Query our backend to get DAO where "categories" key matches user preferences


To-do
When clicking on the image, you should be redirected to the dao detail page
Construct dynamic api routes
*/
function UserPreferencesDao() {
}


/*
Displays a list of DAO under "DAO made for you" container
@param daoCategory : dao[], an array of DAO objects
Returns a container that horizontally displays the DAO information : image, title and discord hyperlink

// TODO
Write a query that gets all DAO based on user preferences
    Retrieve userId that is currently signed in
    Retrieve user preferences
    Query firestore to retrieve and display all DAO that have in categories[] the user preferenc

*/
export function DaoListHeader(props: { daoList: dao[] }) {
    let selectedDao = props.daoList;
    const [daos, setDaos] = useState([]);
    useEffect(() => {
        const listDao : object[] = [];
        const getDaos = query(collection(firestore,"daos"));
        const dao = onSnapshot(getDaos,(querySnapshot) => {
            querySnapshot.forEach((daoItem) => {
                listDao.push(daoItem.data());
                setDaos(listDao);
            });
        })
        //Clean up funcion
        return () => dao();
    }, []);
    
    return(
        <Box sx={{ paddingLeft: 2, marginTop: 8 }}>
            <Typography variant="h4" gutterBottom component="div" color="primary.main">
                DAO made for you
            </Typography>
            <ImageList sx={{ display: "flex", flexDirection: "row", width: 1200}} rowHeight={300}>
                {selectedDao.map((dao) => (
                    <Link href={"/daodetail/" + dao.id}>
                        <ImageListItem key={dao.backgroundImage}>
                            <img src={`${dao.backgroundImage}?fit=crop&auto=format`}
                                alt={dao.name}
                                loading="lazy" />
                            <ImageListItemBar title={dao.name} subtitle={<Link href={dao.discord_link} underline="hover" color="primary.main">Discord</Link>} position="below" />
                        </ImageListItem>
                    </Link>
                ))}
            </ImageList>
            <Typography variant="h4" gutterBottom component="div" color="primary.main">
                DAO CATEGORY HERE : {financeDao.length}
            </Typography>
            <ImageList sx={{ display: "flex", flexDirection: "row", width: 1200}} rowHeight={300}>
                {financeDao.map((dao) => (
                    <ImageListItem key={dao.backgroundImage}>
                        <img src={`${dao.backgroundImage}?fit=crop&auto=format`}
                            alt={dao.name}
                            loading="lazy" />
                        <ImageListItemBar title={dao.name} subtitle={<Link href={dao.discord_link} underline="hover" color="primary.main">Discord</Link>} position="below" />
                    </ImageListItem>
                ))}
            </ImageList>
            <Typography variant="h4" gutterBottom component="div" color="primary.main">
                DAOs
                <ImageList sx={{ display: "flex", flexDirection: "row", width: 1200}} rowHeight={300}>
                {daos.map((dao) => (
                    <ImageListItem key={dao.image}>
                        <img src={`${dao.image}?fit=crop&auto=format`}
                            alt={dao.name}
                            loading="lazy"/>
                        <ImageListItemBar title={dao.name} subtitle={<Link href={dao.discord_link} underline="hover" color="primary.main">Discord</Link>} position="below" />
                    </ImageListItem>
                ))}
            </ImageList>
            </Typography>
        </Box>
    )
}