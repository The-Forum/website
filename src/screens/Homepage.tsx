import { AppBar, Avatar, Box, Button, Drawer, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import styles from '../styles/Home.module.css'
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import { userMenuItems } from "../util/types";
import { Search, SearchIconWrapper, StyledInputBase } from "../components/Search";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";

export function Homepage() {
    return (
        <Box component="div" sx={{ flexDirection: "column", display: "flex", flex: 1, width: "100%" }}>
            <HeaderBar />
            <Box component="div" sx={{ flexDirection: "column", display: "flex", flex: 1 }}>
                <Sidebar />
                <DaoListHeader />
            </Box>
        </Box>
    );
}

//comment from Justin: would move MainContent to separate file, as we will be using it on different pages
//todo
export function HeaderBar() {
    //Initializes user state hook
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    //Handler to open user menu. References the current item on the user menu
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    // Handler to close user menu. Set current item to null
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar variant="dense">
                <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                    <Grid item sm={1}>
                        <img src="Forum_transparentBG.gif" loading="lazy" className={styles.logo} />
                    </Grid>
                    <Grid item sm={3}>
                        <Search sx={{ alignSelf: "flex-start", border: 1, borderRadius: 5, width: 1 }}>
                            <SearchIconWrapper sx={{ height: '100%', position: 'absolute', display: 'flex', alignItems: 'center' }}>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search for DAO on The Forum" inputProps={{ 'aria-label': 'search' }} />
                        </Search>
                    </Grid>
                    <Grid item sm={3} sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
                        <Button variant="contained" className={styles.walletButton}>My List</Button>
                        <Button variant="contained" className={styles.walletButton}>Add DAO</Button>
                    </Grid>
                    <Grid item sm={3} sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", pr: 3 }}>
                        <Tooltip title="Open User Menu">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>Welcome<Avatar />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {userMenuItems.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}


export function DaoTable(props: any) {
    return (
        <div>
            <DaoListHeader />
            <DaoList />
        </div>
    )
}

function DaoListHeader() {
    return (
        <div>
            <Toolbar />
            <h1>This is the Dao Header!</h1>
        </div>
    )
}

function DaoList() {
    return (
        <div>
            <h1>This is the DaoList!</h1>
        </div>
    )
}
