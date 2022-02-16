import { Box, Button, Grid, IconButton, Toolbar } from "@mui/material";
import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  getFirestore,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { HeaderBar } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { firebaseApp, firestore } from "../../util/firebaseConnection";
import { dao, UserDataContext, userDataType } from "../../util/types";
import styles from "../../styles/Home.module.css";
import Iframe from "react-iframe";
import { style } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { useWindowDimensions } from "../../components/Hooks";
const Daodetail = (props: { userData: userDataType }) => {
  const router = useRouter();
  const { daoid } = router.query;
  const [dao, setDao] = useState({} as dao);
  const [initializing, setInitializing] = useState(true);
  const [disableJoin, setDisableJoin] = useState(false);
  const { user } = useMoralis();

  const [daoJoined, setDaoJoined] = useState(
    props.userData &&
      dao &&
      props.userData.joinedDAOs &&
      props.userData.joinedDAOs.findIndex((tmp) => tmp == dao.id) > -1
  );
  async function toggleDAOjoined() {
    setDisableJoin(true);
    setDaoJoined(!daoJoined);
    await runTransaction(firestore, async (transaction) => {
      const docRef = doc(
        firestore,
        "users",
        props.userData ? props.userData.id : ""
      );
      const snapshot = (await transaction.get(docRef)).data() as userDataType;
      let joinedDAOlist: string[];
      if (
        !snapshot ||
        !snapshot.joinedDAOs ||
        snapshot.joinedDAOs!.indexOf(dao.id) == -1
      )
        joinedDAOlist = snapshot.joinedDAOs
          ? [...snapshot.joinedDAOs, dao.id]
          : [dao.id];
      else joinedDAOlist = snapshot.joinedDAOs.filter((tmp) => tmp != dao.id);
      transaction.update(docRef, { joinedDAOs: joinedDAOlist });
    });
    setDisableJoin(false);
  }
  function onDAOUpdate(doc: DocumentSnapshot) {
    const thisDAO = doc.data()! as dao;
    setDao(thisDAO);
    setInitializing(false);
    setDaoJoined(
      props.userData &&
        thisDAO &&
        props.userData.joinedDAOs &&
        props.userData.joinedDAOs.findIndex((tmp) => tmp == thisDAO.id) > -1
    );
  }
  useEffect(() => {
    if (daoid)
      return onSnapshot(
        // @ts-ignore
        doc(getFirestore(firebaseApp), "daos", daoid!),
        onDAOUpdate
      );
  }, [daoid]);

  if (!initializing) {
    return (
      <Box
        component="div"
        sx={{
          flexDirection: "column",
          display: "flex",
          flex: 1,
          width: "100%",
        }}
      >
        <HeaderBar
          userId={props.userData && props.userData.id}
          userData={props.userData}
          topLeft={() =>
            dao && (
              <Box sx={{ backgroundColor: "secondary.main", width: 250 }}>
                <Box
                  sx={{
                    paddingLeft: 1,
                    paddingBottom: 0,
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h2 color="black">{!initializing && dao.name}</h2>
                  {/*<IconButton href={"/"}>
                    <CloseIcon />
                  </IconButton>*/}
                </Box>
                {props.userData &&
                  props.userData.id &&
                  (!daoJoined ? (
                    <Button
                      variant="contained"
                      sx={{ width: 230, margin: 1 }}
                      onClick={toggleDAOjoined}
                      disabled={disableJoin}
                    >
                      Join DAO
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{ width: 230, margin: 1 }}
                      onClick={toggleDAOjoined}
                      disabled={disableJoin}
                    >
                      Leave DAO
                    </Button>
                  ))}
              </Box>
            )
          }
        />
        <Box
          component="div"
          sx={{
            flexDirection: "row",
            display: "flex",
            flex: 1,
            position: "relative",
            marginTop: 6,
          }}
        >
          {!initializing && Content(dao)}
        </Box>
      </Box>
    );
  } else return null;
};
export default Daodetail;
const Content = (dao: dao) => {
  if (dao) {
    return (
      <Box
        component="div"
        sx={{
          loading: "lazy",
          backgroundImage:
            "url(https://ipfs.io/ipfs/" + dao.avatar.slice(7) + ")",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            marginTop: 3,
            marginLeft: 15,
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            className={styles.daodetailtext}
            sx={{ maxWidth: 500, display: "flex" }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  dao.description.split(".")[0] + dao.description.split(".")[1],
              }}
            />
          </Box>
        </Box>
        <Grid container sx={{ marginTop: 7 }}>
          <Grid item xs={6} sm={4} md={4} className={styles.daodetailtext}>
            <Button
              variant="contained"
              sx={{ flex: 1, display: "flex", margin: 1 }}
              href={dao.links.blockchain_site[0]}
              target="_blank"
              disabled={
                !dao.links.blockchain_site[0] ||
                dao.links.blockchain_site[0] == ""
              }
            >
              Token
            </Button>
          </Grid>
          {/*<Grid item xs={6} sm={4} md={3} className={styles.daodetailtext}>
            <Button
              variant="contained"
              sx={{ flex: 1, display: "flex", margin: 1 }}
              href={dao.links.homepage[0]}
              target="_blank"
              disabled={!dao.links.homepage[0] || dao.links.homepage[0] == ""}
            >
              Website
            </Button>
          </Grid>*/}
          <Grid item xs={6} sm={4} md={4} className={styles.daodetailtext}>
            <Button
              variant="contained"
              sx={{ flex: 1, display: "flex", margin: 1 }}
              href={"https://twitter.com/" + dao.links.twitter_screen_name}
              target="_blank"
              disabled={
                !dao.links.twitter_screen_name ||
                dao.links.twitter_screen_name == ""
              }
            >
              Twitter
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={4} className={styles.daodetailtext}>
            <Button
              variant="contained"
              sx={{ flex: 1, display: "flex", margin: 1 }}
              href={dao.links.chat_url[0] || "a"}
              target="_blank"
              disabled={!dao.links.chat_url[0] || dao.links.chat_url[0] == ""}
            >
              Discord
            </Button>
          </Grid>
        </Grid>
        {dao.links.homepage[0] && (
          <Iframe
            url={dao.links.homepage[0]}
            className={styles.frame}
            frameBorder={0}
            width="100%"
            overflow="hidden"
            height="450px"
          />
        )}
      </Box>
    );
  } else {
    return (
      <Box
        component="div"
        sx={{
          loading: "lazy",
          width: "100%",
          flex: 1,
          display: "flex",
        }}
      >
        This DAO is not available.
      </Box>
    );
  }
};
