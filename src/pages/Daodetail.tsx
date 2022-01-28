import { Box, Button, Grid, Toolbar } from "@mui/material";
import { doc, DocumentSnapshot, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HeaderBar } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { firestore } from "../util/firebaseConnection";
import { dao } from "../util/types";
import styles from '../styles/Home.module.css'
export function Daodetail(props: { daoID: string }) {
    const [dao, setDao] = useState({} as dao)
    const [initializing, setInitializing] = useState(true)
    function onDAOUpdate(doc: DocumentSnapshot) {
        setDao(doc.data()! as dao)
        setInitializing(false)
    }
    useEffect(() => {
        return onSnapshot(doc(firestore, "daos", props.daoID), onDAOUpdate)
    }, [])
    return (
        <Box component="div" sx={{ flexDirection: "column", display: "flex", flex: 1, width: "100%" }}>
            <HeaderBar />
            <Toolbar />
            <Box component="div" sx={{ flexDirection: "row", display: "flex", flex: 1, position: "relative" }}>
                {!initializing && Content(dao)}
                <Sidebar />
            </Box>
        </Box>
    );
}
const Content = (dao: dao) => {
    return (
        <Box component="div" sx={{ loading: "lazy", backgroundImage: "url(" + dao.backgroundImage + ")", width: "100%", flex: 1 }}>
            <Box sx={{ display: "flex", marginBottom: 0, marginTop: 30 }}>
                <Grid container sx={{ flex: 1, display: "flex" }}>
                    <Grid item xs={0} sm={2} md={3} />
                    <Grid item xs={12} sm={8} md={6} className={styles.daodetailtext}>
                        {dao.text}
                    </Grid>
                    <Grid item xs={0} sm={2} md={3} />
                    <Grid item xs={0} sm={2} md={3} />
                    <Grid item xs={6} sm={4} md={3} className={styles.daodetailtext} sx={{ display: "flex" }}>
                        <Button variant="contained" sx={{ flex: 1, display: "flex", margin: 1 }} href={dao.twitter_link}>Twitter Page</Button>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3} className={styles.daodetailtext}>
                        <Button variant="contained" sx={{ flex: 1, display: "flex", margin: 1 }} href={dao.discord_link}>Discord</Button>
                    </Grid>
                    <Grid item xs={0} sm={2} md={3} />
                </Grid>
            </Box>
        </Box>
    )
}