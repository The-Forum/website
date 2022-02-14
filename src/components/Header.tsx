import {
  AppBar,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  InputBase,
  Link,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "../styles/Home.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { dao, userMenuItems } from "../util/types";
import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { SearchBar, SearchIconWrapper } from "./SearchBar";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
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
}) {
  const router = useRouter();
  let refInput = useRef(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const { width, height } = useWindowDimensions();
  const { authenticate, Moralis } = useMoralis();
  //Initializes user state hook
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([] as dao[]);
  //Handler to open user menu. References the current item on the user menu
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  // Handler to close user menu. Set current item to null
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    async function getSearchResults() {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, "daos"),
          orderBy("name"),
          startAt(searchText),
          endAt(searchText + "~")
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
          {(!searchVisible || width > 500) && (
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
              onChange={(event, dao) => router.push("[daoid]", (dao as dao).id)}
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
                      display: !searchVisible && width <= 500 ? "none" : "flex",
                      ...(searchVisible &&
                        width <= 500 && {
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
                {width > 875 && (
                  <Box component="h5" sx={{ color: "black" }}>
                    Welcome, {props.userId}
                  </Box>
                )}
                {width <= 500 && !searchVisible && (
                  <SearchIcon
                    sx={{ color: "black", alignSelf: "center" }}
                    onClick={() => setSearchVisible(true)}
                  />
                )}
                <Tooltip title="Open User Menu">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ marginRight: 1 }}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userMenuItems.map((setting) => (
                    <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => setting.action(router, Moralis.User)}
                      >
                        {setting.text}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
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
