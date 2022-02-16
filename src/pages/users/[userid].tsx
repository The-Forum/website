import { Avatar, Box, Button, Grid, IconButton, Toolbar } from "@mui/material";
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
const UserDetail = (props: { userData: userDataType }) => {
  const router = useRouter();
  const { userId } = router.query;
  const [dao, setDao] = useState({} as dao);
  const [initializing, setInitializing] = useState(true);
  const [disableJoin, setDisableJoin] = useState(false);
  const { user } = useMoralis();
  const [displayedUser, setDisplayedUser] = useState({} as userDataType);

  useEffect(() => {
    if (userId && userId != props.userData.id)
      return onSnapshot(
        // @ts-ignore
        doc(getFirestore(firebaseApp), "users", userId!),
        (userData) => {
          setDisplayedUser(userData.data() as userDataType);
          setInitializing(false);
        }
      );
    else {
      setInitializing(false);
    }
  }, [userId]);

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
        <HeaderBar userId={props.userData && props.userData.id} />
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
          {!initializing && (
            <Box
              component="div"
              sx={{
                loading: "lazy",
                backgroundSize: "cover",
                width: "100%",
                backgroundPosition: "center",
                marginTop: 4,
                marginLeft: 2,
              }}
            >
              <Avatar
                src={props.userData && props.userData.avatar}
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    );
  } else return null;
};
export default UserDetail;
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
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginTop: 15,
            minHeight: "70vh",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Grid container sx={{ flex: 1, display: "flex" }}>
            <Grid item xs={0} sm={2} md={3} />
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              className={styles.daodetailtext}
              sx={{ display: "flex" }}
            >
              <Box sx={{ flex: 1, display: "flex", margin: 1 }}>
                <div dangerouslySetInnerHTML={{ __html: dao.description }} />
              </Box>
            </Grid>
            <Grid item xs={0} sm={2} md={3} />
          </Grid>
          <Grid container>
            <Grid item xs={0} sm={2} md={3} />
            <Grid item xs={6} sm={4} md={3} className={styles.daodetailtext}>
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
            <Grid item xs={6} sm={4} md={3} className={styles.daodetailtext}>
              <Button
                variant="contained"
                sx={{ flex: 1, display: "flex", margin: 1 }}
                href={dao.links.homepage[0]}
                target="_blank"
                disabled={!dao.links.homepage[0] || dao.links.homepage[0] == ""}
              >
                Website
              </Button>
            </Grid>
            <Grid item xs={0} sm={2} md={3} />
            <Grid item xs={0} sm={2} md={3} />
            <Grid item xs={6} sm={4} md={3} className={styles.daodetailtext}>
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
            <Grid item xs={6} sm={4} md={3} className={styles.daodetailtext}>
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
            <Grid item xs={0} sm={2} md={3} />
          </Grid>
        </Box>
        {/*<Iframe
          url="https://shinedao.finance/"
          className={styles.frame}
          frameBorder={0}
          width="100%"
          overflow="hidden"
          height="100%"
        />*/}
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
