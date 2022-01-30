import { Box, Grid, ImageList, ImageListItem, ImageListItemBar, Toolbar, Typography } from "@mui/material";
import  Link from "@mui/material/Link";
import { dao } from "../util/types";

/*
// Design
Layout:
According to Penpot, we would display DAO by categories that can be found on ../utils/types.tsx
On the viewport, we would have as much as there are categories.
We horizontally display DAO. Each DAO displays its name, image and objective or custom description
We should find a way to fetch DAO's information
    API? : https://docs.snapshot.org/graphql-api#endpoints

Infinte scroll library : react-infinite-scroll-component
DAO data model (see Justin's changes)

// To-do
Create backend on firebase with the dao information

*/
export let financeDao: dao[] = [
{
    id: "shineDao",
    name: "ShineDAO",
    backgroundImage: "https://shinedao.finance/static/shineAnimatedRocket-5d92da631e0a8da4c2ea248696a76eb4.gif",
    text:  "This DAO rocks !",
    discord_link: "https://discord.com/invite/QkhbP7bZrj",
    twitter_link: "https://twitter.com/ShineDAO_/",
    categories: ["finance"],


},
{
    id: "shineDao",
    name: "ShineDAO",
    backgroundImage: "https://shinedao.finance/static/shineAnimatedRocket-5d92da631e0a8da4c2ea248696a76eb4.gif",
    text:  "This DAO rocks !",
    discord_link: "https://discord.com/invite/QkhbP7bZrj",
    twitter_link: "https://twitter.com/ShineDAO_/",
    categories: []

},
{
    id: "shineDao",
    name: "ShineDAO",
    backgroundImage: "https://shinedao.finance/static/shineAnimatedRocket-5d92da631e0a8da4c2ea248696a76eb4.gif",
    text:  "This DAO rocks !",
    discord_link: "https://discord.com/invite/QkhbP7bZrj",
    twitter_link: "https://twitter.com/ShineDAO_/",
    categories: []
},
{
    id: "shineDao",
    name: "ShineDAO",
    backgroundImage: "https://shinedao.finance/static/shineAnimatedRocket-5d92da631e0a8da4c2ea248696a76eb4.gif",
    text:  "This DAO rocks !",
    discord_link: "https://discord.com/invite/QkhbP7bZrj",
    twitter_link: "https://twitter.com/ShineDAO_/",
    categories: []


},
{
    id: "shineDao",
    name: "ShineDAO",
    backgroundImage: "https://shinedao.finance/static/shineAnimatedRocket-5d92da631e0a8da4c2ea248696a76eb4.gif",
    text:  "This DAO rocks !",
    discord_link: "https://discord.com/invite/QkhbP7bZrj",
    twitter_link: "https://twitter.com/ShineDAO_/",
    categories: []
}

];

/*
Displays a list of DAO whose categories match user preferences
To-do : connect firebase database, read "users/:walletId" collection, store topics on a data structure
Query our backend to get DAO where "categories" key matches user preferences
*/
function UserPreferencesDao(){
}

/*
Displays a list of DAO under "DAO made for you" container
@param daoCategory : dao[], an array of DAO objects
Returns a container that horizontally displays the DAO information : image, title and discord hyperlink
*/
export function DaoListHeader(props : {daoList: dao[]}) {
    let selectedDao = props.daoList;
    return (
        <Box sx={{paddingLeft:2, marginTop:8}}>
            <Typography variant="h4" gutterBottom component="div" color="primary.main">
                DAO made for you
            </Typography>
            <ImageList sx={{display:"flex", flexDirection:"row", width:1200, height:300}}>
                {selectedDao.map((dao) => (
                <ImageListItem key={dao.backgroundImage}>
                    <img src={`${dao.backgroundImage}?fit=crop&auto=format`}
                         alt={dao.name}
                         loading="lazy"/>
                    <ImageListItemBar title={dao.name}subtitle={<Link href={dao.discord_link} underline="hover" color="primary.main">Discord</Link>} position="below"/>
                </ImageListItem>
                ))}
            </ImageList>

            <Typography variant="h4" gutterBottom component="div" color="primary.main">
                DAO CATEGORY HERE
            </Typography>
            <ImageList sx={{display:"flex", flexDirection:"row", width:1200, height:300}}>
                {financeDao.map((dao) => (
                <ImageListItem key={dao.backgroundImage}>
                    <img src={`${dao.backgroundImage}?fit=crop&auto=format`}
                         alt={dao.name}
                         loading="lazy"/>
                    <ImageListItemBar title={dao.name}subtitle={<Link href={dao.discord_link} underline="hover" color="primary.main">Discord</Link>} position="below"/>
                </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )
}