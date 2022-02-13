import { Drawer, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Chat } from "./ChatBox";
//this one might be better as a chat component: https://www.npmjs.com/package/react-chat-widget

export const Sidebar = (props: { width: number; chatBoxHeight: number }) => {
  //Added props.width
  const width: number = props.width;
  const chatBoxHeight: number = props.chatBoxHeight;
  return (
    <Drawer
      anchor="right"
      variant="permanent"
      /*PaperProps={{
        style: {
          position: "relative",
          height: "90%",
          paddingBottom: 0,
        },
      }}*/
      sx={{
        width: 300,
        height: "100%",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: width, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          marginBottom: 0,
          display: "block",
        }}
      >
        <Chat />
      </Box>
    </Drawer>
  );
};
