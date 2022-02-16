import {
  AppBar,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Grid,
  Grow,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  InputBase,
  Link,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "../styles/Home.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  dao,
  UserDataContext,
  userDataType,
  userMenuItems,
} from "../util/types";
import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { SearchBar, SearchIconWrapper } from "./SearchBar";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import {
  collection,
  doc,
  endAt,
  getDocs,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
} from "firebase/firestore";
import { firestore } from "../util/firebaseConnection";
import { InputUnstyled } from "@mui/base";
import { useWindowDimensions } from "./Hooks";

// To-do
//Add menu on the header bar
//Fix container display on the DaoListHeader -> text should be visible on all screen sizes

/*
Component displays a responsive app bar on the Homepage
*/
export function HeaderBar(props: {
  topLeft?: () => ReactNode;
  userId?: string;
  userData?: userDataType;
}) {
  const router = useRouter();
  let refInput = useRef(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const { width, height } = useWindowDimensions();
  const { authenticate, Moralis, user } = useMoralis();
  //Initializes user state hook

  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([] as dao[]);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    async function getSearchResults() {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, "daos"),
          orderBy("name"),
          startAt(searchText[0].toUpperCase() + searchText.slice(1)),
          endAt(searchText[0].toUpperCase() + searchText.slice(1) + "~")
        )
      );
      const listDao = [] as dao[];
      querySnapshot.forEach((daoItem) => {
        listDao.push(daoItem.data() as dao);
      });

      setResults(listDao);
    }
    if (searchText.length == 2) {
      getSearchResults();
    }
  }, [searchText]);
  console.log("userr", props.userData);
  return (
    <Box sx={{ flexgrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "secondary.main",
            minHeight: 50,
          }}
        >
          {(!searchVisible || width! > 500) && (
            <img
              src="/Forum_transparentBG.gif"
              loading="lazy"
              className={styles.logo}
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
          )}
          <Grid item sx={{ display: "flex", width: 1000 }}>
            {/* <SearchBar
              sx={{
                border: 2,
                borderRadius: 5,
                borderColor: "primary.main",
                flexGrow: 1,
              }}
            >
            <SearchIconWrapper
              sx={{
                height: "100%",
                position: "absolute",
                display: "flex",
                alignItems: "center",
                color: "primary.main",
              }}
            >
              {" "}
              
            </SearchIconWrapper>*/}
            <Autocomplete
              options={results}
              onChange={(event, dao) =>
                router.push("/daos/[daoid]", "/daos/" + (dao as dao).id)
              }
              loading={results.length == 0}
              sx={{
                border: 0,
                flex: 1,
                display: "flex",
                zIndex: (theme) => theme.zIndex.drawer + 5,
              }}
              onBlur={() => setResults([])}
              open={results.length > 0}
              getOptionLabel={(option) => option.name}
              /*renderOption={(_props, option) => {
                  
                  return (
                    <Box sx={{ width: "100%", height: 20 }}>
                      {option.image != "" && (
                        <img
                          src={`${option.image}`}
                          className={styles.image}
                          width="20"
                          height="20"
                          alt={option.name}
                          loading="lazy"
                        />
                      )}
                      {option.name}
                    </Box>
                  );
                }}*/
              renderInput={(params) => (
                <Fragment>
                  <TextField
                    placeholder="Discover DAOs on The Forum"
                    sx={{
                      border: 0,
                      display:
                        !searchVisible && width! <= 500 ? "none" : "flex",
                      ...(searchVisible &&
                        width! <= 500 && {
                          width: "80%",
                          position: "absolute",
                          alignSelf: "center",
                          left: 5,
                          top: 5,
                        }),
                    }}
                    variant="outlined"
                    inputMode="search"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    {...params}
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon onClick={() => setSearchVisible(true)} />
                        </InputAdornment>
                      ),
                      endAdornment: null,
                    }}
                  />
                </Fragment>
              )}
            />{" "}
            {/*</SearchBar>*/}
          </Grid>

          <Grid item sx={{ display: "flex", flexShrink: 0, marginLeft: 2 }}>
            {props.userId ? (
              <Fragment>
                {width! > 875 && (
                  <Box component="h5" sx={{ color: "black" }}>
                    Welcome, {props.userId}
                  </Box>
                )}
                {width! <= 500 && !searchVisible && (
                  <SearchIcon
                    sx={{ color: "black", alignSelf: "center" }}
                    onClick={() => setSearchVisible(true)}
                  />
                )}
                <IconButton
                  ref={anchorRef}
                  sx={{ marginRight: 1 }}
                  onClick={handleToggle}
                >
                  <SettingsIcon />
                </IconButton>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            {userMenuItems.map((setting) => (
                              <MenuItem key={setting.text}>
                                <Typography
                                  textAlign="center"
                                  onClick={(event) => {
                                    if (setting.text == "Change Preferences")
                                      setDoc(
                                        doc(
                                          firestore,
                                          "users",
                                          user!.attributes.ethAddress
                                        ),
                                        {
                                          joinedDAOs:
                                            props.userData &&
                                            props.userData.joinedDAOs
                                              ? props.userData.joinedDAOs
                                              : [],
                                          id:
                                            props.userData && props.userData.id,
                                          preferences: "",
                                        }
                                      ).then(() => router.push("/"));
                                    else {
                                      Moralis.User.logOut().then(() =>
                                        router.push("/")
                                      );
                                      console.log("lol");
                                    }
                                    handleClose(event);
                                  }}
                                >
                                  {setting.text}
                                </Typography>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Fragment>
            ) : (
              <Button onClick={() => authenticate()} variant="contained">
                Connect Wallet
              </Button>
            )}
          </Grid>
        </Grid>
        <Box
          sx={{
            zIndex: (theme) => theme.zIndex.drawer,
            position: "fixed",
            marginTop: 6,
            boxShadow: 1,
            color: "black",
          }}
        >
          {props.topLeft && props.topLeft()}
        </Box>
      </AppBar>
    </Box>
  );
}
