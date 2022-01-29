import { Drawer, Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import styles from '../styles/Home.module.css'
import { Chat } from "./ChatBox"
//this one might be better as a chat component: https://www.npmjs.com/package/react-chat-widget
export const Sidebar = () => {
    return (
        <Drawer anchor="right" variant="permanent"
            PaperProps={{
                style: {
                    marginTop: 50,
                    position: "fixed",
                    height: "90%",
                    paddingBottom: 0
                }
            }}
            sx={{
                width: 300,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: 300, boxSizing: 'border-box'
                },
            }}
        >
            <Box sx={{
                marginBottom: 0, height: "50", flexDirection: "column"
            }}>
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