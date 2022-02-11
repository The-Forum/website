import { Box,ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { dao } from "../util/types";
import { firestore } from "../util/firebaseConnection";
import { collection, query ,onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { financeDao } from '../util/dummy';


export function DaoListHeader(props: { daoList: dao[] }) {
    let selectedDao = props.daoList;
    const [daos, setDaos] = useState([]);

    //Read DAOs from firestore on component mount
    useEffect(() => {
        const listDao : object[] = [];
        const getDaos = query(collection(firestore,"daos"));
        const dao = onSnapshot(getDaos,(querySnapshot) => {
            querySnapshot.forEach((daoItem) => {
                listDao.push(daoItem.data());
            });
            setDaos(listDao);
        })
        //Clean up funcion
        return () => dao();
    }, []);  //empty dependencies --> executed once

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
        </Box>
    )
}