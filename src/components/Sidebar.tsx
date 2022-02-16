import { Drawer, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Chat } from "./ChatBox";
//this one might be better as a chat component: https://www.npmjs.com/package/react-chat-widget

export const Sidebar = () => {
  //Added props.width
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
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { boxSizing: "border-box" },
        justifyContent: "flex-end",
      }}
    >
      <Toolbar />
      <Box sx={{ flex: 1, alignItems: "flex-end" }}>
        <Chat />
      </Box>
    </Drawer>
  );
};
