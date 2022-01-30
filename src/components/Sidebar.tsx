import { Drawer, Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import { Chat } from "./ChatBox"
//this one might be better as a chat component: https://www.npmjs.com/package/react-chat-widget

export const Sidebar = (props: {width:number, chatBoxHeight:number}) => { //Added props.width
    const width : number = props.width;
    const chatBoxHeight: number = props.chatBoxHeight;
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
                width: width,
                height: "100%",
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
            }}>
            <Box sx={{ height: chatBoxHeight, maxHeight: 500, marginBottom: 0, display: "flex", flexDirection: "column" }}>

                <Chat />
            </Box>
        </Drawer >
    )
}