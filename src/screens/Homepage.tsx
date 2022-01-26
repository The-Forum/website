import { Avatar, Box, Button, Drawer, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import styles from '../styles/Home.module.css'
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import { userMenuItems } from "../util/types";
import {Search, SearchIconWrapper, StyledInputBase} from "../components/Search";
import { useState } from "react";



export function Homepage() {
    return (
        <Box component="div">
            <h1>Welcome to the The Forum !</h1>
            <Chat/>
            <Header/>
            <DaoTable/>
        </Box>
    );  
}


export function Header(){
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
      <Grid container sx={{display:"flex", flexDirection:"row"}}>
          <Grid item sm>
          <Drawer variant="permanent" anchor="left" sx={{flexShrink:0,
          '& .MuiDrawer-paper' : {width:1/4, boxSizing: "border-box"}}}>Placeholder for Chat</Drawer>
          </Grid>
          <Grid item sm={3}>
          <Search sx={{alignSelf:"flex-start", border:1, borderRadius: 5, width:1}}>
              <SearchIconWrapper sx={{height: '100%', position:'absolute', display: 'flex', alignItems: 'center'}}>
                  <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase  placeholder="Search for DAO on The Forum" inputProps={{ 'aria-label': 'search' }}/>
          </Search>
          </Grid>
          <Grid item sm={3} sx={{display:"flex", flexDirection:"row", columnGap:2}}>
              <Button variant="contained" className={styles.walletButton}>My List</Button>
              <Button variant="contained" className={styles.walletButton}>Add DAO</Button>        
          </Grid>
          <Grid item sm={3} sx={{display:"flex", flexDirection:"row", justifyContent:"flex-end", pr:3}}>
          <Tooltip title="Open User Menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>Welcome<Avatar/>
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
  );
}

export function Chat(){
    return (
      <Box>This is the Chat</Box>
    )
}

export function DaoTable(props: any){
    return (
        <div>
            <DaoListHeader/>
            <DaoList/>
        </div>
    )
}

function DaoListHeader(){
    return (
        <div>
            <h1>This is the Dao Header!</h1>
        </div>
    )
}

function DaoList(){
    return (
        <div>
            <h1>This is the DaoList!</h1>
        </div>
    )
}
