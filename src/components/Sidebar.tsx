import { Drawer, Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import styles from '../styles/Home.module.css'
import { Chat } from "./ChatBox"
//this one might be better as a chat component: https://www.npmjs.com/package/react-chat-widget
export const Sidebar = () => {
    return (
        <Drawer anchor="left" variant="permanent"
            sx={{
                width: 300,
                height: "100%",
                flexShrink: 0,
                position: "relative",
                [`& .MuiDrawer-paper`]: {
                    width: 300, boxSizing: 'border-box'
                },
            }}
        >
            <Toolbar />
            <Box sx={{ height: 200, maxHeight: 500, marginBottom: 0, display: "flex", flexDirection: "column" }}>
                <Chat />
            </Box>
        </Drawer >
    )
}/*        <Box component="div" sx={{
            backgroundColor: "secondary.main",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            width: 300,
        }}>*/