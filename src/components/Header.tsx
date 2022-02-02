import { AppBar, Avatar, Box, Button, Grid, IconButton, InputBase, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import styles from '../styles/Home.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { userMenuItems } from "../util/types";
import React, { ReactNode, useState } from "react";
import { Search, SearchIconWrapper } from './Search';

// To-do
//Add menu on the header bar
//Fix container display on the DaoListHeader -> text should be visible on all screen sizes

/*
Component displays a responsive app bar on the Homepage
*/
export function HeaderBar(props: { topLeft?: () => ReactNode }) {
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
        <Box sx={{ flexgrow: 1 }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Grid sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "secondary.main" }}>
                    <img src="Forum_transparentBG.gif" loading="lazy" className={styles.logo} />
                    <Grid item sx={{ display: "flex", flexBasis: "500px" }}>
                        <Search sx={{ border: 2, borderRadius: 5, borderColor: "primary.main", flexGrow: 1 }}>
                            <SearchIconWrapper sx={{ height: '100%', position: 'absolute', display: "flex", alignItems: "center", color: "primary.main" }}>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <InputBase fullWidth placeholder="Discover DAO on The Forum" inputProps={{ 'aria-label': 'search' }} sx={{ paddingLeft: 6 }} />
                        </Search>
                    </Grid>
                    <Grid item sx={{ display: "flex", width: "400px", columnGap: 2 }}>
                        <Button variant="contained" sx={{ minWidth: 0, flexGrow: 1 }}>Add DAO</Button>
                        <Button variant="contained" sx={{ minWidth: 0, flexGrow: 1 }}>My List</Button>
                    </Grid>
                    <Grid item sx={{ display: "flex", flexShrink: 0 }}>
                        <Tooltip title="Open User Menu">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {userMenuItems.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>))}
                        </Menu>
                    </Grid>
                </Grid>
                <Box sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, position: "fixed", marginTop: 6, boxShadow: 1, color: "black" }}>
                    {props.topLeft && props.topLeft()}
                </Box>
            </AppBar>
        </Box>
    );
}
