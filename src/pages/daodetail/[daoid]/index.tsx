import { Box, Button, Grid, IconButton, Toolbar } from "@mui/material";
import { doc, DocumentSnapshot, onSnapshot, runTransaction } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { HeaderBar } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { firestore } from "../../../util/firebaseConnection";
import { dao, UserDataContext, userDataType } from "../../../util/types";
import styles from '../../../styles/Home.module.css'
import Iframe from "react-iframe";
import { style } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router'
const Daodetail = () => {
    const router = useRouter()
    const { daoid } = router.query
    const [dao, setDao] = useState({} as dao)
    const [initializing, setInitializing] = useState(true)
    const userData = useContext(UserDataContext)
    const [daoJoined, setDaoJoined] = useState(userData && userData.joinedDAOs && userData.joinedDAOs!.findIndex(tmp => tmp = dao.id) > -1)
    async function toggleDAOjoined() {
        setDaoJoined(!daoJoined)
        await runTransaction(firestore, async transaction => {
            const docRef = doc(firestore, "users", userData ? userData.id : "")
            const snapshot = (await transaction.get(docRef)).data() as userDataType
            let joinedDAOlist: string[]
            if (!snapshot || !snapshot.joinedDAOs || snapshot.joinedDAOs!.indexOf(dao.id) == -1)
                joinedDAOlist = snapshot.joinedDAOs ? [...snapshot.joinedDAOs, dao.id] : [dao.id]
            else
                joinedDAOlist = snapshot.joinedDAOs.filter(tmp => tmp != dao.id)
            transaction.update(docRef, { joinedDAOs: joinedDAOlist })
        })
    }
    function onDAOUpdate(doc: DocumentSnapshot) {
        const thisDAO = doc.data()! as dao
        console.log(daoid)
        console.log(doc.data())
        setDao(thisDAO)
        setInitializing(false)
    }
    useEffect(() => {
        console.log("hiii")
        console.log(daoid)
        if (daoid)
            return onSnapshot(doc(firestore, "daos", daoid!), onDAOUpdate)
    }, [daoid])
    return (
        <Box component="div" sx={{ flexDirection: "column", display: "flex", flex: 1, width: "100%" }}>
            <HeaderBar topLeft={() =>
                <Box sx={{ backgroundColor: "secondary.main", width: 200 }}>
                    <Box sx={{ paddingLeft: 1, paddingBottom: 0.25, flexDirection: "row", display: "flex", justifyContent: "center", }}>
                        <h3 color="black">{!initializing && dao.name}</h3>
                        <IconButton ><CloseIcon /></IconButton>
                    </Box>
                    {daoJoined ?
                        <Button variant="contained" sx={{ width: 180, margin: 1 }} onClick={toggleDAOjoined}>Join DAO</Button>
                        :
                        <Button variant="outlined" sx={{ width: 180, margin: 1 }} onClick={toggleDAOjoined}>Leave DAO</Button>
                    }
                </Box>} />
            <Box component="div" sx={{ flexDirection: "row", display: "flex", flex: 1, position: "relative", marginTop: 6 }}>
                {!initializing && Content(dao)}
                <Sidebar width={300} chatBoxHeight={200} />
            </Box>
        </Box>
    );
}
export default Daodetail
const Content = (dao: dao) => {
    return (
        <Box component="div" sx={{ loading: "lazy", backgroundImage: "url(" + dao.backgroundImage + ")", width: "100%", flex: 1, display: "flex" }}>
            {/*<Iframe url="https://shinedao.finance/" className={styles.frame} frameBorder={0} />*/}
            <Box sx={{ display: "flex", marginBottom: 0, marginTop: "30vh", minHeight: "70vh", flexDirection: "column", position: "relative" }}>
                <Grid container sx={{ flex: 1, display: "flex" }}>
                    <Grid item xs={0} sm={2} md={3} />
                    <Grid item xs={12} sm={8} md={6} className={styles.daodetailtext} sx={{ display: "flex" }}>
                        <Box sx={{ flex: 1, display: "flex", margin: 1 }} > {dao.text}</Box>
                    </Grid>
                    <Grid item xs={0} sm={2} md={3} />
                </Grid>
                <Grid container>

                    <Grid item xs={0} sm={2} md={3} />
                    <Grid item xs={6} sm={4} md={3} className={styles.daodetailtext} >
                        <Button variant="contained" sx={{ flex: 1, display: "flex", margin: 1 }} href={dao.twitter_link}>Twitter Page</Button>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3} className={styles.daodetailtext}>
                        <Button variant="contained" sx={{ flex: 1, display: "flex", margin: 1 }} href={dao.discord_link}>Discord</Button>
                    </Grid>
                    <Grid item xs={0} sm={2} md={3} />
                </Grid>
            </Box>
        </Box >
    )
}